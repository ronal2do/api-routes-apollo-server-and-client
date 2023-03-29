
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Platform, ScrollView } from 'react-native';
import { theme as color } from '../constants/Colors';
import { ADD_POINTS, ANSWER_QUESTION } from '../graphql/mutations';
import { PROFILE_QUERY } from '../graphql/queries';
import { Stages } from '../screens/Quizz';
import Analytics from '../services/Analytics';
import { client } from '../services/apollo';
import { getRulles } from '../utils';
import AnswerButton from './AnswerButton';
import Button from './Button';
import EndHeader from './EndHeader';
import EndSeasonHeader from './EndSeasonHeader';
import Error from './Error';
import ErrorHeader from './ErrorHeader';
import InfoHeader from './InfoHeader';
import QuestionHeader from './QuestionHeader';
import SuccessHeader from './SuccessHeader';
import Typography from './Typography';

const QuestionHeaderSec = ({
  question, 
  stage
}: {
  question: any, 
  stage: Stages
}) => {
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

const errorText = 'Oops!, Algo deu errado'

type QuestiobBodyTypes = {question: any, stage: Stages, userId: string, setStage: (stage: Stages) => void}

export enum Rules {
  SOFT = 'SOFT',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  EXPERT = 'EXPERT',
  GOLD = 'GOLD',
}

const addPointsToTheUser = async ({ userId, action }:{ userId: string, action: Rules}) => {
  try {
    await client.mutate({
        mutation: ADD_POINTS,
        variables: { userId, action},
        refetchQueries: () => [{ query: PROFILE_QUERY }]
      }).then(() => {
          console.log("points addded")
      })
  } catch (error) {
      console.log('eerror to adicionar pontos', error)
  }
}

const QuestionBody = ({question, stage, userId, setStage}: QuestiobBodyTypes) => {

  const [response, setResponse] = useState(null)

  useEffect(() => {
    setResponse(null)
  }, [question])
  

  useEffect(() => {
    if (!response) return
    const { correctAnswer, id, level } = question
    const result: Boolean = Number(response) === Number(correctAnswer)
    setStage(!!result ? 'final' : 'error' )

    client
      .mutate({
        mutation: ANSWER_QUESTION,
        variables: {
          userId,
          questionId: id,
          result
        },
      })

    !!result && addPointsToTheUser({
      userId,
      action: level,
    })

  }, [response])
  
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
          // @ts-ignore
          action={setResponse}
        />
      )
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

type QuestionsContainerProps = {
  stage: Stages;
  userId: string;
  question: any;
  onPress: () => void;
  setStage: (stage: Stages) => void;
}

export default function QuestionsContainer({ onPress, question, stage, userId, setStage}: QuestionsContainerProps) {
  return (
    <> 
      <ScrollView>
        <View style={styles.header}>
          <QuestionHeaderSec question={question} stage={stage} />
        </View>
        <View style={styles.container}>
          { question ? (
            <QuestionBody question={question} stage={stage} userId={userId} setStage={setStage}/>
          ) : <ActivityIndicator/> }
        </View>
      </ScrollView>
      <View style={{ height: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        <Button
          backgroundColor={color.GREEN}
          raiseLevel={0}
          textColor="white"
          label={stage === 'info' ? 'Responder' : stage === 'answer' ? 'Pular pergunta' : stage === 'end' ? 'Voltar' :'Próxima pergunta' }
          onPress={onPress}
        />
      </View>
    </>
  )
} 
const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'ios' ? 237 : 187,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.BLUE,
    padding: 30,
  },
  stars: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backImage: {
    margin: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginTop: 15,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
  instructions: {
    width: 200,
    textAlign: 'left',
    color: '#fff',
  },
  textStyle: { 
    padding: 40, 
    textAlign: 'center' 
  }
});
