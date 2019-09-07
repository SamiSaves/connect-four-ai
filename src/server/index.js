const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const mongooseClient = require('./mongooseClient')
const { schema } = require('./graphql/schema')
const { AiScript } = require('./models/aiScript')

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
        createGame: ({ name }) => {
            console.log('Creating a game', name)
            return { name, _id: 'testid', pieces: [] }
        },
        insertPiece: ({ id, column, color }) => {
            console.log('Inserting a piece', color, column)
            return { name: 'testGame', _id: id, pieces: [{ position: { col: column, row: 0 }, color }] }
        }
    }

    app.use('/graphql', graphqlHTTP({ schema, rootValue, graphiql: true }))

    await mongooseClient.connectMongoose()

    const port = process.env.PORT || 3000
    app.listen(port)
    console.log(`Server started at port ${port}`)
}

initServer()
