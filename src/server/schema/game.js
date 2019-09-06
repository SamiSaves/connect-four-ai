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
    pieces: [ pieceSchema ]
})

const Game = new mongoose.Model('Game', gameSchema, 'games')

module.exports({ Game })
