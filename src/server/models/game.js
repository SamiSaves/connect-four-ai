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
  pieces: [pieceSchema],
  winner: String,
  currentTurn: String,
})

gameSchema.statics.findGame = async (id) => Game.findOne({ _id: id })
gameSchema.statics.findGames = async () => Game.find({})

gameSchema.statics.createGame = async (name) => {
  const game = new Game({ name, pieces: [], currentTurn: 'red' })
  return game.save()
}

gameSchema.statics.insertPiece = async (id, column, color) => {
  const game = await Game.findGame(id)

  if (!game) throw Error('Game not found')
  if (game.winner) throw Error(`Game is already over, winner is ${game.winner}`)
  if (game.currentTurn !== color) throw Error(`It's not ${color} turn`)

  placePiece(game, column, color)

  return game.save()
}

const Game = mongoose.model('Game', gameSchema, 'games')

module.exports = { Game }
