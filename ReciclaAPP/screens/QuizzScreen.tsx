
import React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'

import LogoTitle from '../components/LogoTitle'
import AnswerButton from '../components/AnswerButton'
import Typography from '../components/Typography'
import QuestionsContainer from '../components/QuestionsContainer'
import InfoHeader from '../components/InfoHeader'
import QuestionHeader from '../components/QuestionHeader'
import Error from '../components/Error'
import ErrorHeader from '../components/ErrorHeader'
import SuccessHeader from '../components/SuccessHeader'
import Me from '../components/Me'
import { APP_KEYS } from '../utils/asyncStorage'
import Loading from '../components/Loading'
import EndHeader from '../components/EndHeader'
import EndSeasonHeader from '../components/EndSeasonHeader'

import { ANSWER_QUESTION, ADD_POINTS } from '../graphql/mutations'
import { PROFILE_QUERY, NEXT_QUESTION_2, QUESTION_COUNT } from '../graphql/queries'
import { client } from '../services/apollo'
import { getRulles } from '../utils'
import Analytics from '../services/Analytics';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQuery } from '@apollo/client'

export type Answers = 'info' | 'answer' | 'final' | 'error' | 'end' | 'end-season'

type QuizzScreenState = {
  answer?: number | null | undefined
  response?: number | null | undefined
  question: any
  stage: Answers
  sequence: number | null
  me: any,
  responses: Array<number>,
  isLoading: boolean,
  hasNextPage: boolean
}

const errorText = 'Oops!, Algo deu errado'

export default class QuizzScreen extends React.PureComponent {
  static navigationOptions = {
    drawerLabel: 'Quizz',
    headerTitle: <LogoTitle />,
    headerRight: <Me />
  }

  state: QuizzScreenState = {
    answer: null,
    response: null,
    question: 0,
    stage: 'answer',
    sequence: 4,
    me: null,
    isLoading: false,
    responses: [],
    hasNextPage: false,
  }

  componentDidMount() {
    this.getResponses()
    this.getTag()
    this.asyncBootstrap()
  }

  getResponses = async (): Promise<void> => {
    try {
      const resp = await AsyncStorage.getItem(APP_KEYS.LIST)
      if ( resp !== null) {
        console.log('@@ get list async', resp, JSON.parse(resp))
        this.setState({ responses: JSON.parse(resp) })
      }
    } catch (error) {
      Analytics.track(Analytics.events.ERROR, { path: 'Quizz.tsx', func: 'getResponses', error });
    }
  }

  getOneNumber = async (max: number): Promise<number> => {
    const n: number = await this.sortRandom(max)
    if ( this.state.responses.includes(n) ) {
      return this.getOneNumber(max)
    }
    Analytics.track(Analytics.events.QUESTION_SEQUENCE_NEW, { sequence: n });
    return n
  }

  sortRandom = async (max: number): Promise<number> => Math.floor(Math.random() * (max - 0)) + 1
 
  asyncBootstrap = async () => {
    try {
      const { me }: any = await client.cache.readQuery({
        query: PROFILE_QUERY
      })

      this.setState({ me })
    } catch (error) {
      Analytics.track(Analytics.events.ERROR, { path: 'Quizz.tsx', func: 'asyncBootstrap' , error });
    }
  }

  getTag = async () => {
    this.setState({ isLoading: true })
    try {
      const data: any = await client.query({
        query: QUESTION_COUNT
      })

      const numerOfQuestions = data.data.questions.count || 0
      // no questions
      if (numerOfQuestions === 0) {
        Analytics.track(Analytics.events.QUESTION_SEQUENCE_NO_QUESTIONS);
        return this.setState({ stage: 'end-season', isLoading: false })
      }
      const hasNextPage = Number(this.state.responses.length) !== Number(numerOfQuestions)
      this.setState({ hasNextPage })
      
      if (!hasNextPage) {
        Analytics.track(Analytics.events.QUESTION_SEQUENCE_END);
        return this.setState({ stage: 'end', isLoading: false })
      }

      this.getOneNumber(numerOfQuestions).then(sequence => this.setState({ sequence })) // set new number to next question
      return this.setState({ isLoading: false })
    } catch (error) {
      Analytics.track(Analytics.events.ERROR, { path: 'Quizz.tsx', func: 'getTag' , error });
    }
  }

  verify = (response: number, question: any) => {
    const { correctAnswer, _id, level } = question
    const userId = this.state.me._id
    const isCorrect: Boolean = Number(response) === Number(correctAnswer)

    this.setState({ 
      answer: Number(correctAnswer), 
      response: Number(response), 
      stage: !!isCorrect ? 'final' : 'error' 
    })
    Analytics.track(Analytics.events.QUESTION_RESPONSE, { ...question, userResponse: response, isCorrect });
    client
      .mutate({
        mutation: ANSWER_QUESTION,
        variables: {
          userId,
          questionId: _id ,
        },
      })
      .then(() => {
        !!isCorrect ?
        client
          .mutate({
            mutation: ADD_POINTS,
            variables: {
              userId,
              action: level,
            },
            refetchQueries: () => [
              {
                query: PROFILE_QUERY
              },
            ]
          }).then(console.log)
        : {}
      })
  }

  next = async (refetch: any, sequence: number) => {
    const isCorrect = this.state.answer != null && Number(this.state.answer) === Number(this.state.response) || false
    console.log('isCorrect', isCorrect, this.state.answer, this.state.response)
    let newArray = this.state.responses

    if (isCorrect) {
      newArray = [...new Set([...this.state.responses, sequence])]
      await AsyncStorage.setItem(APP_KEYS.LIST, JSON.stringify(newArray))  
    }
    
    this.setState({ 
      stage: 'answer', 
      answer: null, 
      response: null,
      responses: newArray
    })

    await this.getTag()
    await refetch()
  }

  finish = async () => {
    await AsyncStorage.setItem(APP_KEYS.NEXT_PAGE, 'finito')
    return this.setState({ stage: 'end' })
  }

  nextStage = (stage: Answers) => this.setState({ stage })
  
  renderHeader = (question: any) => {
    const { stage } = this.state
    switch(stage) {
      case 'info':
        return <InfoHeader points={getRulles(question.level)}/>
      case 'answer':
        return <QuestionHeader label={question.label} answer={question.correctAnswer} points={getRulles(question.level)}/>
      case 'error':
        return <ErrorHeader />
      case 'final':
        return <SuccessHeader points={getRulles(question.level)} />
      case 'end':
        return <EndHeader />
      case 'end-season':
        return <EndSeasonHeader />
      default:
        return null
    }
  }

  renderBody = (question: any) => {
    const { stage, response } = this.state
    switch(stage) {
      case 'info':
        return (
          <Typography kind="instructions" style={styles.textStyle}>
            {question.introduction}
          </Typography>
        )
      case 'answer':
      case 'error':
      case 'final':
        return question.answers.map((a: any, i: number) =>
          <AnswerButton
            key={i}
            value={i + 1}
            label={a}
            response={response}
            correct={question.correctAnswer}
            action={() => this.verify(i + 1, question)}
          />)
        
      case 'end':
        return (
          <Typography kind="instructions" style={styles.textStyle}>
           Você zerou essa fase de perguntas, mas fique ligado pois em breve teremos novidades.
          </Typography>
        )
      case 'end-season':
        return (
          <Typography kind="instructions" style={styles.textStyle}>
            Aguarde a abertura da nova temporada
          </Typography>
        )
      default:
        return <Error text={errorText} />
    }
  }

  renderFunction = (loadNext: () => void, sequence: any) => {
    const { stage } = this.state
    switch(stage) {
      case 'info':
        return this.nextStage('answer')
      case 'answer':
      case 'error':
      case 'final':
        return this.next(loadNext, sequence)
      case 'end':
        return this.props.navigation.goBack()
      default:
        return null
    }
  }

  render() {
    const { isLoading, sequence } = this.state
    if (isLoading) return (<Loading />)
    return (
      <QuestionRotation>
        <QuestionsContainer
            header={this.renderHeader(question && question)}
            body={this.renderBody(question && question)}
            label={this.state.stage === 'info' ? 'Responder' : this.state.stage === 'answer' ? 'Pular pergunta' :  this.state.stage === 'end' ? 'Voltar' :'Próxima pergunta' }
            onPress={() => this.renderFunction(loadNext, sequence)}
          />
      </QuestionRotation>
    )
  }
}

const QuestionRotation = ({ children }) => {
    const { data, refetch, loading, error } = useQuery(NEXT_QUESTION_2)
    if (loading) return  <Loading />
    if (!data) return <ActivityIndicator />
    if (error) return <Typography kind="welcome">Error</Typography>
    const { nextQuestion: { edges } } = data  
      console.log('edges', edges )      
    if (edges.count === 0) return <Typography kind="welcome">No more questions</Typography>
    const question = edges[0] && edges[0].node
    const loadNext = () => refetch()

    if (data) return (
      {children}
    )
}

const styles = StyleSheet.create({
  textStyle: { 
    padding: 40, 
    textAlign: 'center' 
  }
})
