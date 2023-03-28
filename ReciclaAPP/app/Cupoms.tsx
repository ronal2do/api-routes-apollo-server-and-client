import React from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import Typography from '../components/Typography';
import Cupom from '../components/CupomAzul';
import { theme as color } from '../constants/Colors';
import Menu from '../components/Menu';
import Me from '../components/Me';
import { PROFILE_QUERY } from '../graphql/queries';
import { client } from '../services/apollo';
import { ADD_CPF } from '../graphql/mutations';
import CpfForm from '../components/CpfForm';
import { useMutation, useQuery } from '@apollo/client';

type CupomsScreenState = {
  cpf?: any,
  result?: any
};

const generate: string = 'Para gerar seus cupons, informe seu CPF:'
const mycupoms: string = 'Meus cupons'

export default class CupomsScreen extends React.PureComponent<{}, CupomsScreenState> {
  static navigationOptions = {
    title: 'Cupons',
    headerLeft: <Menu variant />,
    headerRight: <Me />,
    headerTintColor: color.BLUE,
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0,
    },
    headerBackTitle: null
  }

  state: CupomsScreenState = {
    cpf: null,
    result: null,
  };

  componentDidMount() {
    this.asyncBootstrap()
  }

  asyncBootstrap = async () => {
    try {
      const { me }: any = await client.cache.readQuery({
        query: PROFILE_QUERY
      })
      this.setState({ cpf: me.cpf })
    } catch (error) {
      
    }
  }

  renderContent = (cpf: boolean) => {
    return !cpf ? (
        <AddCpf />
      ) : (
        <CuponsView />
      )
  }

  render() {
    const { cpf } = this.state;
    return (
      <View style={styles.container}>
        <Typography kind="instructions"style={{ padding: 30, paddingBottom: 0 }}>A cada 1.000 pontos você ganha um cupom. Valem os pontos somados até uma hora antes dos sorteios.
        {`\n`}Seus cupons e seu saldo seguirão valendo para os sorteios futuros. Continue participando para aumentar suas chances.
        </Typography>
        <Typography kind="welcome" style={{ padding: 30, paddingBottom: 0 }}>{!cpf ? generate : mycupoms}</Typography>
        {this.renderContent(!!cpf)}
      </View>
    );
  }
}

const AddCpf = () => {
  const mutation = useMutation(ADD_CPF)
   return (
    <CpfForm mutation={mutation}/>
   )     
}

const CuponsView = () => {
          const { loading, data, error }= useQuery(PROFILE_QUERY)
           
    if (loading) {
      return <ActivityIndicator />
    }
    if (error) {
      return <View />
    }
    const { me: { cupoms } } = data;
    return (
      <ScrollView style={{ width: '100%' }}>
        { cupoms.count === 0 ? (
          <Typography kind="instructions" style={{ padding: 30, paddingBottom: 0 }}>Você ainda não tem pontos suficientes para gerar cupoms</Typography>
        ) : cupoms.edges.map(({ node }: any) => <Cupom key={node.id} {...node} />)}
        <View style={{ padding: 50 }} />
      </ScrollView>
      )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
  },
  logoContainer: {
    height: 130,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    padding: 30
  },
});
