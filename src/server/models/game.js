const mongoose = require('mongoose')

const positionSchema = new mongoose.Schema({
    col: Number,
    row: Number,
}, { _id: false })

const pieceSchema = new mongoose.Schema({
    position: positionSchema,
    color: String,
}, { _id: false })

const gameSchema = new mongoose.Schema({
    name: String,
    pieces: [ pieceSchema ]
})

gameSchema.statics.findGame = async id => {
    return await Game.findOne({ _id: id })
}

gameSchema.statics.createGame = async name => {
    const game = new Game({ name, pieces: [] })
    return await game.save()
}

gameSchema.statics.updateGame = async (id, pieces) => {
    return await Game.findByIdAndUpdate(id, { pieces }).exec()
}

const Game = new mongoose.Model('Game', gameSchema, 'games')

module.exports = { Game }
