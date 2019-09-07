const mongoose = require('mongoose')

const connectionString = "mongodb://localhost:27017"

const connectMongoose = async () => {
    await mongoose.connect(connectionString, {
        dbName: 'ConnectFour',
        useNewUrlParser: true,
        useCreateIndex: true
    })
}

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
})

mongoose.connection.on('error', error => {
    console.log('Error when connecting to MongoDB', error)
})

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connection closed')
})

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log('Mongoose connection closed')
    })
})

module.exports = { connectMongoose }
