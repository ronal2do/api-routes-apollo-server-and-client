
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ActivityIndicator, SafeAreaView, View, Platform } from 'react-native'
import QuestionsContainer from '../components/QuestionsContainer'
import Loading from '../components/Loading'
import { PROFILE_QUERY, RANDOM_QUESTION } from '../graphql/queries'
import { client } from '../services/apollo'
import Analytics from '../services/Analytics';
import { useQuery } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { Question, User } from '@prisma/client'
import { theme as color } from '../constants/Colors';
import Close from '../components/Close'
import { StackScreenProps } from '@react-navigation/stack'
import { MainStackParamList } from '../navigation/types'

export type Stages = 'info' | 'answer' | 'final' | 'error' | 'end' | 'end-season'

interface IQuestionInput { }

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

const QuizzScreen = ({navigation}: StackScreenProps<MainStackParamList>) => {
  const [me, setMe] = useState<User>()
  const [stage, setStage] = useState<Stages>('info')
  const [question, setQuestion] = useState<Question | null>(null)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  const { data, loading, error, refetch } = useGetQuestions()
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
        setStage('info')
        setQuestion(data.randomQuestions)
      }
    } catch (error) {
      Analytics.track(Analytics.events.ERROR, { path: 'Quizz.tsx', func: 'asyncBootstrap', error });
    }
  }, [data?.randomQuestions.id])

  const next = async (refetch: any) => {
    setStage('answer')
    await refetch()
  }

  const nextStage = (stage: Stages) => setStage(stage)

  const renderFunction = (loadNext: () => void) => {
    switch (stage) {
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
  if (!question) return (<ActivityIndicator />)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.BLUE }}>
      <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', padding: 2, paddingTop: Platform.OS === 'android' ? 12 : 0 }}>
        <Close />
      </View>
      <QuestionsContainer
        question={question}
        stage={stage}
        setStage={setStage}
        onPress={() => renderFunction(() => refetch())}
        userId={me.id}
      />
    </SafeAreaView>
  )
}

export default QuizzScreen