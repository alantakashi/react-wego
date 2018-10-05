import mongoose from 'mongoose'

const options = {
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 1000 // Reconnect every 500ms
}

const dbConfig = () => {
  const dbURI = 'mongodb://hornbillAdmin:x2T6uZDUXd8WYQawzVCgrH3N5LmjAcKR@ds157538.mlab.com:57538/hornbill_inventory'
  const db = mongoose.connection
  mongoose.connect(dbURI, options)

  db.once('open', () => console.log('MongoDB running')).on('error', err => console.error(err))
  db.on('connecting', () => console.log('connecting to MongoDB...'))
  db.on('connected', () => console.log('MongoDB connected!'))
  db.on('reconnected', () => console.log('MongoDB reconnected!'))
  db.on('disconnected', () => {
    console.log('MongoDB disconnected!')
    mongoose.connect(dbURI, options)
  })
}

export { dbConfig }