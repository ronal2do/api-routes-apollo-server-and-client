
import React, { useEffect, useState } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'

import LogoTitle from '../components/LogoTitle'
import Typography from '../components/Typography'
import QuestionsContainer from '../components/QuestionsContainer'
import { APP_KEYS } from '../utils/asyncStorage'
import Loading from '../components/Loading'
import { PROFILE_QUERY, NEXT_QUESTION_2, QUESTION_COUNT, NEXT_QUESTION } from '../graphql/queries'
import { client } from '../services/apollo'
import Analytics from '../services/Analytics';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQuery } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'

export type Stages = 'info' | 'answer' | 'final' | 'error' | 'end' | 'end-season'


interface IQuestionInput {}

interface IQuestion extends Question {
  metadata: {
    hits: number
    misses: number
    views: number
  }
}


interface Edge {
  cursor: string;
  node: IQuestion;
}

export interface IQuestions {
  count: number;
  edges: [Edge]
  pageInfo: {
    endCursor: string;
    hasNextPage: string;
  }
}

interface IQuestionData {
  questions: IQuestions
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
  >(NEXT_QUESTION, {
    variables: {
      first: 1
    }
  });

  return {
    data,
    loading,
    error,
    refetch
  };
}


export default function QuizzScreen() {
  const navigation = useNavigation()
  const [responses, setResponses] = useState([])
  const [me, setMe] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [answer, setAnswer] = useState()
  const [hasNextPage, setHasNextPage] = useState(false)
  const [sequence, setSequence] = useState(4)
  const [stage, setStage] = useState<Stages>('info')
  const [question, setQuestion] = useState<IQuestion | null>(null)
  const [response, setResponse] = useState<number>()

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
        console.log('@@ fetch questions me', me)
        console.log('@@ fetch questions data', data.questions.edges[0].node)
        setQuestion(data?.questions?.edges[0]?.node)
      }
    } catch (error) {
      Analytics.track(Analytics.events.ERROR, { path: 'Quizz.tsx', func: 'asyncBootstrap' , error });
    }
  }, [data])

  const getOneNumber = async (max: number): Promise<number> => {
    const n: number = await sortRandom(max)
    if ( responses.includes(n) ) {
      return getOneNumber(max)
    }
    Analytics.track(Analytics.events.QUESTION_SEQUENCE_NEW, { sequence: n });
    return n
  }

  const sortRandom = async (max: number): Promise<number> => Math.floor(Math.random() * (max - 0)) + 1
 
  const getTag = async () => {
    setIsLoading(true)
    try {
      const { data }: any = await client.query({
        query: QUESTION_COUNT
      })

      const numberOfQuestions = data.questions.count || 0
      // no questions
      if (numberOfQuestions === 0) {
        Analytics.track(Analytics.events.QUESTION_SEQUENCE_NO_QUESTIONS);
        setIsLoading(false)
        setStage('end-season')
        return setStage('end-season')
      }
      const hasNextPage = Number(responses.length) !== Number(numberOfQuestions)
      setHasNextPage(hasNextPage)

      if (!hasNextPage) {
        Analytics.track(Analytics.events.QUESTION_SEQUENCE_END);
        setIsLoading(false)
        return setStage('end')
      }

      getOneNumber(numberOfQuestions).then(sequence => setSequence(sequence)) // set new number to next question
      setIsLoading(false)
    } catch (error) {
      Analytics.track(Analytics.events.ERROR, { path: 'Quizz.tsx', func: 'getTag' , error });
    }
  }

  const next = async (refetch: any, sequence: number) => {
    const isCorrect = answer != null && Number(answer) === Number(response) || false
    console.log('isCorrect', isCorrect, answer, response)

    setStage('answer')
    // setState({ 
    //   stage: 'answer', 
    //   answer: null, 
    //   response: null,
    //   responses: newArray
    // })

    await refetch()
  }

  const finish = async () => {
    await AsyncStorage.setItem(APP_KEYS.NEXT_PAGE, 'finito')
    return setStage('end')
  }

  const nextStage = (stage: Stages) => setStage(stage)

  const renderFunction = (loadNext: () => void, sequence: any) => {
    switch(stage) {
      case 'info':
        return nextStage('answer')
      case 'answer':
      case 'error':
      case 'final':
        return next(loadNext, sequence)
      case 'end':
        return navigation.goBack()
      default:
        return null
    }
  }

  if (!me?.id) return (<Loading />)
  return (
    <QuestionRotation question={question} userId={me.id} renderFunction={renderFunction} sequence={sequence} stage={stage} setStage={setStage} refetch={refetch}/>
  )
}

const QuestionRotation = ({ renderFunction, sequence, stage, userId, setStage, question, refetch }: {
  renderFunction: (loadNext: () => void, sequence: any) => void,
  sequence: number,
  stage: Stages,
  userId: string,
  setStage: (stage: Stages) => void,
  question: any;
  refetch: any;
}) => {
    // const { data, refetch, loading, error } = useQuery(NEXT_QUESTION_2)

    // if (loading) return <Loading />
    // if (!data) return <ActivityIndicator />

    // if (error) return <Typography kind="welcome">Error</Typography>

    // const { nextQuestion: { edges } } = data  
    //   console.log('edges', edges )      

    // if (edges.count === 0) return <Typography kind="welcome">No more questions</Typography>

    // const question = edges[0] && edges[0].node
    const loadNext = () => refetch()

    if (question) return (
      <QuestionsContainer
        question={question}
        stage={stage}
        setStage={setStage}
        onPress={() => renderFunction(loadNext, sequence)}
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
