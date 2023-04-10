import Constants from 'expo-constants';

const ENVFILE = {
  dev: {
    API: 'http://192.168.1.14:3000/api/graphql',
    SUPPORT_URL: 'https://reciclaapp.vercel.app/politica-de-privacidade',
    RULES_URL: 'https://reciclaapp.vercel.app/regulamento-plano-de-operacao-da-promocao',
    AMPLITUDE: '18944a4f066e0f82e14f03bbcf0edfc2',
    STQ_URL: 'https://stqpublicidade.com.br'
  },
  beta: {
    API: 'https://reciclaapp.vercel.app',
    SUPPORT_URL: 'https://reciclaapp.vercel.app/politica-de-privacidade',
    RULES_URL: 'https://reciclaapp.vercel.app/regulamento-plano-de-operacao-da-promocao',
    AMPLITUDE: '18944a4f066e0f82e14f03bbcf0edfc2',
    STQ_URL: 'https://stqpublicidade.com.br'
  },
  prod: {
    API: 'https://reciclaapp.vercel.app',
    SUPPORT_URL: 'https://reciclaapp.vercel.app/politica-de-privacidade',
    RULES_URL: 'https://reciclaapp.vercel.app/regulamento-plano-de-operacao-da-promocao',
    AMPLITUDE: '7039bbeb8b65acc499c721eb4a9571ab',
    STQ_URL: 'https://stqpublicidade.com.br/?ref=app-reciclaabc'
  },
}

function getEnvVars(releaseChannel = Constants?.manifest?.releaseChannel) {
  if (releaseChannel === undefined) return ENVFILE.dev // since releaseChannels are undefined in dev, return your default.
  if (releaseChannel.indexOf('beta') !== -1) return ENVFILE.beta // return staging environment variables
  if (releaseChannel.indexOf('prod') !== -1) return ENVFILE.prod // this would pick up prod-v1, prod-v2, prod-v3
}

export default getEnvVars;

export const ENV: any = getEnvVars();