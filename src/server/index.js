const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const mongooseClient = require('./mongooseClient')
const { schema } = require('./graphql/schema')
const { AiScript } = require('./models/aiScript')
const { Game } = require('./models/game')

const initServer = async () => {
    const app = express()
    app.use(cors())

    const rootValue = {
        createAiScript: async ({ name, script }) => {
            return await AiScript.createAiScript(name, script)
        },
        updateAiScript: async ({ id, script }) => {
            return await AiScript.updateAiScript(id, script)
        },
        createGame: async ({ name }) => {
            return await Game.createGame(name)
        },
        insertPiece: async ({ id, column, color }) => {
            return await Game.insertPiece(id, column, color)
        }
    }

    app.use('/graphql', graphqlHTTP({ schema, rootValue, graphiql: true }))

    await mongooseClient.connectMongoose()

    const port = process.env.PORT || 3000
    app.listen(port)
    console.log(`Server started at port ${port}`)
}

initServer()
