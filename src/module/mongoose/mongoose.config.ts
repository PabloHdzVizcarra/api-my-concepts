import config from '../../config'
import mongoose, { mongo } from 'mongoose'

const uri: string = config.DB_URL
const options: object = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(uri, options)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', (): void => {
  console.log('success connect mongoDB')
})
