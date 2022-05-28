const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')


const port = process.env.PORT || 4000

const typeDefs = gql`
    type Query {
        hello: String
    }
`

const resolvers = {
    Query: {
        hello: () => 'Hello, GraphQL API!'
    }
}


async function startApolloServer(typeDefs, resolvers, port) {
    const app = express()
    const server = new ApolloServer({ typeDefs, resolvers, 
    csrfPrevention: true, })
    await server.start()
    server.applyMiddleware({ app, path: '/api' })
    app.listen({ port }, () =>
        console.log(
            `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
        ))
}

startApolloServer(typeDefs, resolvers, port)