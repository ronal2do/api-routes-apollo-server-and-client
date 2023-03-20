import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'

import { NextApiRequest, NextApiResponse } from 'next'
import { schema } from '../../apollo/schema'
import { connectDB } from '../../lib/connectDb'

type IContext = {
  req: NextApiRequest
  res: NextApiResponse
}

const apolloServer = new ApolloServer<IContext>({ schema })

const _handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res }),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();

    await _handler(req as NextApiRequest, res);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
}

export default handler