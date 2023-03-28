
import React from 'react';
import { StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';
import { Query } from 'react-apollo';

import LogoTitle from '../components/LogoTitle';
import AnswerButton from '../components/AnswerButton';
import Menu from '../components/Menu';
import Typography from '../components/Typography';
import QuestionsContainer from '../components/QuestionsContainer';
import InfoHeader from '../components/InfoHeader';
import QuestionHeader from '../components/QuestionHeader';
import Error from '../components/Error';
import ErrorHeader from '../components/ErrorHeader';
import SuccessHeader from '../components/SuccessHeader';
import Me from '../components/Me';
import { APP_KEYS } from '../utils/asyncStorage';
import Loading from '../components/Loading';
import EndHeader from '../components/EndHeader';

import { ANSWER_QUESTION, ADD_POINTS } from '../graphql/mutations';
import { NEXT_QUESTION, PROFILE_QUERY } from '../graphql/queries';
import { client } from '../services/apollo';
import { getRulles } from '../utils';

type Answers = 'info' | 'answer' | 'final' | 'error' | 'end'

type QuizzScreenState = {
  answer?: number | null | undefined;
  response?: number | null | undefined;
  question: any;
  stage: Answers;
  cursor: string | null
  me: any
}

const errorText = 'Oops!, Algo deu errado'

export default class QuizzScreen extends React.PureComponent<{}, QuizzScreenState> {
  static navigationOptions = {
    drawerLabel: 'Quizz',
    headerTitle: <LogoTitle />,
    // headerLeft: <Menu />,
    headerRight: <Me />
  }

  state: QuizzScreenState = {
    answer: null,
    response: null,
    question: 0,
    stage: 'info',
    cursor: null,
    me: null
  }

  componentDidMount() {
    this.asyncBootstrap()
    this.getTag()
  }

  asyncBootstrap = async (cursor = null) => {
    try {
      const { me }: any = await client.cache.readQuery({
        query: PROFILE_QUERY
      })
      this.setState({ me })
    } catch (error) {
      
    }
  }

  getTag = async () => {
    try {
      const value = await AsyncStorage.getItem(APP_KEYS.CURSOR);
      const hasNextPage = await AsyncStorage.getItem(APP_KEYS.NEXT_PAGE);

      if (hasNextPage !== null) {
        return this.setState({ stage: 'end' })
      }

      if (value !== null) {
        this.setState({ cursor: value })
        return value
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  verify = (response: number, question: any) => {
    const {correctAnswer, _id, level} = question
    const userId = this.state.me._id
    const isCorrect: Boolean = Number(response) === Number(correctAnswer)

    this.setState({ 
      answer: Number(correctAnswer), 
      response: Number(response), 
      stage: !!isCorrect ? 'final' : 'error' 
    })

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
      });
  }

  next = async (refetch: any, cursor: string, hasNextPage: boolean) => {
    await AsyncStorage.setItem(APP_KEYS.CURSOR, cursor);
    await refetch()
    this.setState({ 
      stage: 'info', 
      answer: null, 
      response: null,
      cursor,
    })
  }

  finish = async () => {
    await AsyncStorage.setItem(APP_KEYS.NEXT_PAGE, 'finito');
    return this.setState({ stage: 'end' })
  }

  nextStage = (stage: Answers) => this.setState({ stage })
  
  renderHeader = (question: any) => {
    const { stage } = this.state;
    switch(stage) {
      case 'info':
        return <InfoHeader points={getRulles(question.level)}/>;
      case 'answer':
        return <QuestionHeader label={question.label} answer={question.correctAnswer}/>;
      case 'error':
        return <ErrorHeader />;
      case 'final':
        return <SuccessHeader points={getRulles(question.level)} />;
      case 'end':
        return <EndHeader />;
      default:
        return null;
    }
  }

  renderBody = (question: any) => {
    const { stage, response } = this.state;
    switch(stage) {
      case 'info':
        return (
          <Typography kind="instructions" style={styles.textStyle}>
            {question.introduction}
          </Typography>
        );
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
        ;
      case 'end':
        return <EndHeader />;
      default:
        return <Error text={errorText} />;
    }
  }

  renderFunction = (loadNext: () => void, cursor: string, hasNextPage: boolean) => {
    const { stage } = this.state;
    switch(stage) {
      case 'info':
        return this.nextStage('answer');
      case 'answer':
      case 'error':
      case 'final':
        return this.next(loadNext, cursor, hasNextPage);
      case 'end':
      default:
        return null;
    }
  }

  render() {
    return (
      <Query
        query={NEXT_QUESTION}
        variables={{
          cursor: this.state.cursor
        }}
        fetchPolicy="cache-and-network"
      >
      {({ data, refetch, loading, error }: any) => {
        if (loading) return  <Loading />
        if (!data) return <ActivityIndicator />
        if (error) return <Typography kind="welcome">Error</Typography>
        const { questions: { pageInfo: { hasNextPage, endCursor }, edges  } } = data;        
       
        if (!hasNextPage) return <EndHeader/>;
        const question = hasNextPage ? edges[0].node : () => this.finish()
        const loadNext = () => hasNextPage ? refetch() : this.finish()

        if (data) return (
          <QuestionsContainer
            header={this.renderHeader(question)}
            body={this.renderBody(question)}
            label={this.state.stage === 'info' ? 'Responder' : this.state.stage === 'answer' ? 'Pular pergunta' : 'Próxima pergunta' }
            onPress={() => this.renderFunction(loadNext, endCursor, hasNextPage)}
          />
        )}
      }
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: { 
    padding: 40, 
    textAlign: 'center' 
  }
});
