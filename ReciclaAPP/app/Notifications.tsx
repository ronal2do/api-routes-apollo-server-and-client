import React, { PureComponent } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Typography from '../components/Typography'
import PageFooter from '../components/PageFooter';

export default class MyNotificationsScreen extends PureComponent {
  render() {
    return (
      <>
        <ScrollView style={styles.container}>
          <Typography kind="welcome">Datas, prêmios e regulamento.</Typography>
          <Typography kind="title">Sorteios</Typography>
          <Typography kind="instructions">
          Serão realizados 45 sorteios em cinco dias diferentes. Depois de converter os pontos em cupons, o saldo que ficar vale para a próxima troca e os cupons gerados valem para todos os sorteios.
          </Typography>
          <Typography kind="title">Prêmios</Typography>
          <Typography kind="instructions">31/08: 10 vale-compras de R$ 100 cada</Typography>
          <Typography kind="instructions">14/09: 10 vale-compras de R$ 100 cada</Typography>
          <Typography kind="instructions">28/09: 10 vale-compras de R$ 100 cada</Typography>
          <Typography kind="instructions">12/10: 10 vale-compras de R$ 100 cada</Typography>
          <Typography kind="instructions">02/11: SmartTV, notebook, smartphone, bicicleta e patinete.</Typography>
          <Typography kind="title">Cupons</Typography>

          <Typography kind="instructions">Somente serão computados aqueles pontos
          que forem enviados até a véspera do dia do sorteio.</Typography>
          <Typography kind="instructions">Em até 24 horas, você receberá no e-mail cadastrado 
          os seus cupons numerados. 
          O saldo que ficar seguirá valendo para os sorteios futuros. Continue participando para aumentar 
          suas chances.</Typography>
        </ScrollView>
        <PageFooter />
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 30,
  },
})
