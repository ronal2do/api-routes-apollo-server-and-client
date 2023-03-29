
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import QuestionsContainer from '../components/QuestionsContainer'
import { APP_KEYS } from '../utils/asyncStorage'
import Loading from '../components/Loading'
import { PROFILE_QUERY, RANDOM_QUESTION } from '../graphql/queries'
import { client } from '../services/apollo'
import Analytics from '../services/Analytics';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQuery } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { Question, User } from '@prisma/client'

export type Stages = 'info' | 'answer' | 'final' | 'error' | 'end' | 'end-season'

interface IQuestionInput {}

interface IQuestion extends Question {
  metadata: {
    hits: number
    misses: number
    views: number
  }
}

interface IQuestionData {
  randomQuestions: IQuestion
}

interface IuseGetQuestionsPayload {
  data: IQuestionData | undefined;
  loading: boolean;
  error: Error | undefined;
  refetch: any
}

export const useGetQuestions = (): IuseGetQuestionsPayload => {
  const { data, loading, error, refetch } = useQuery<
    IQuestionData, 
    IQuestionInput
  >(RANDOM_QUESTION);

  return {
    data,
    loading,
    error,
    refetch
  };
}


export default function QuizzScreen() {
  const navigation = useNavigation()
  const [me, setMe] = useState<User>()
  const [stage, setStage] = useState<Stages>('info')
  const [question, setQuestion] = useState<Question | null>(null)

  const  { data, loading, error, refetch }  = useGetQuestions()
  const { me: profile }: any = client.cache.readQuery({
    query: PROFILE_QUERY
  })

  if (loading) {
    console.log('@@ fetch questions loading', loading)
  }

  if (error) {
    console.log('@@ fetch questions error', error)
  }

  useEffect(() => {
    try {
      setMe(profile)
      if (data) {
        setQuestion(data.randomQuestions)
      }
    } catch (error) {
      Analytics.track(Analytics.events.ERROR, { path: 'Quizz.tsx', func: 'asyncBootstrap' , error });
    }
  }, [data?.randomQuestions.id])

  useEffect(() => {
    setStage('info')
  }, [data?.randomQuestions.id])

  const next = async (refetch: any) => {
    setStage('answer')
    await refetch()
  }

  const nextStage = (stage: Stages) => setStage(stage)

  const renderFunction = (loadNext: () => void) => {
    switch(stage) {
      case 'info':
        return nextStage('answer')
      case 'answer':
      case 'error':
      case 'final':
        return next(loadNext)
      case 'end':
        return navigation.goBack()
      default:
        return null
    }
  }

  if (!me?.id || !question) return (<Loading />)
  return (
    <QuestionRotation question={question} userId={me.id} renderFunction={renderFunction} stage={stage} setStage={setStage} refetch={refetch}/>
  )
}

const QuestionRotation = ({ renderFunction, stage, userId, setStage, question, refetch }: {
  renderFunction: (loadNext: () => void) => void,
  stage: Stages,
  userId: string,
  setStage: (stage: Stages) => void,
  question: any;
  refetch: any;
}) => {
    const loadNext = () => refetch()
    if (!question) <ActivityIndicator />
    return (
      <QuestionsContainer
        question={question}
        stage={stage}
        setStage={setStage}
        onPress={() => renderFunction(loadNext)}
        userId={userId}
      />
    )
}

const styles = StyleSheet.create({
  textStyle: { 
    padding: 40, 
    textAlign: 'center' 
  }
})
