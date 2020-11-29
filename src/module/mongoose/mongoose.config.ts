import config from '../../config'
import mongoose, { Model } from 'mongoose'
import { DataRes, IConcepts } from '../../types'

const uri: string = config.DB_URL
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

mongoose.connect(uri, options)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', (): void => {
  console.log('success connect mongoDB')
})

export const getAllDataFromSchema = async (
  schema: Model<IConcepts>,
): Promise<DataRes> => {
  try {
    const concepts: IConcepts[] = await schema.find()
    return {
      error: false,
      message: 'data succes',
      data: concepts,
    }
  } catch (error) {
    return {
      error: true,
      message: error.message,
    }
  }
}
