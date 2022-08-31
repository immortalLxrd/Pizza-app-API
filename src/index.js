const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const jwt = require('jsonwebtoken')
const helmet = require('helmet')
const cors = require('cors')
const depthLimit = require('graphql-depth-limit')
const {createComplexityLimitRule} = require('graphql-validation-complexity')
require('dotenv').config()

const db = require('./db')

const {JWT_SECRET, PORT, DB_HOST, IS_DEV} = process.env

const models = require('./models')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const isDevelopment = IS_DEV === 'development'

const port = PORT || 4000


db.connect(DB_HOST)

const getUser = token => {
	if (token) {
		try {
			return jwt.verify(token, JWT_SECRET)
		} catch (err) {
			new Error('Session invalid')
		}
	}
}

async function startApolloServer(typeDefs, resolvers, port) {
	const app = express()
	app.use(
		helmet({
			crossOriginEmbedderPolicy: !isDevelopment,
			contentSecurityPolicy: !isDevelopment,
		}),
	)
	app.use(cors())
	const server = new ApolloServer({
		typeDefs, resolvers,
		validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
		context: ({req}) => {
			const token = req.headers.authorization || ''
			const user = getUser(token)
			return {models, user}
		}
	})
	await server.start()
	server.applyMiddleware({app, path: '/api'})
	app.listen({port}, () =>
		console.log(
			`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
		))
}

startApolloServer(typeDefs, resolvers, port)