const mongoose = require('mongoose')
const { placePiece } = require('../../common/gameLogic')

const positionSchema = new mongoose.Schema({
    column: Number,
    row: Number,
}, { _id: false })

const pieceSchema = new mongoose.Schema({
    position: positionSchema,
    color: String,
}, { _id: false })

const gameSchema = new mongoose.Schema({
    name: String,
    pieces: [ pieceSchema ],
    winner: String,
    currentTurn: String
})

gameSchema.statics.findGame = async id => {
    return await Game.findOne({ _id: id })
}

gameSchema.statics.createGame = async name => {
    const game = new Game({ name, pieces: [], currentTurn: "red" })
    return await game.save()
}

gameSchema.statics.insertPiece = async (id, column, color) => {
    const game = await Game.findGame(id)

    if (!game) throw Error('Game not found')
    if (game.currentTurn !== color) throw Error(`It's not ${color} turn`)

    placePiece(game, column, color)
    
    return await game.save()
}

const Game = new mongoose.model('Game', gameSchema, 'games')

module.exports = { Game }
