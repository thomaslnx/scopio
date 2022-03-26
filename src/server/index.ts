import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

import app from '../app'
import { typeDefs } from '../utils/typeDefs'
import { resolvers } from '../utils/resolvers'

export const port = process.env.PORT || 3000

async function startApolloServer() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ]
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app })

  app.listen(port, () => {
    console.log(`🚀 🚀 🚀  Server running on port: ${port}`)
  })
}

startApolloServer()
