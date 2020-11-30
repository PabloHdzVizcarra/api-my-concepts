import config from '../../config'
import mongoose, { Model } from 'mongoose'
import { DataRes, IConcepts } from '../../types'
import { LogInfo } from '../log_debug/debug'

const uri: string = config.DB_URL
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

mongoose.connect(uri, options)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', (): void => {
  LogInfo('success connect mongoDB')
})

const getAllDataFromSchema = async (
  schema: Model<IConcepts>,
): Promise<DataRes> => {
  try {
    const concepts: IConcepts[] = await schema.find()
    return {
      error: false,
      message: 'get data success',
      data: concepts,
    }
  } catch (error) {
    return {
      error: true,
      message: error.message,
    }
  }
}

export { getAllDataFromSchema }
