import config from '../../config'
import mongoose, { Model } from 'mongoose'
import { DataRes, IConcepts, IOneConcept, UIConcept } from '../../types'
import { LogInfo, LogMongoDB } from '../log_debug/debug'

const uri: string = config.DB_URL
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

mongoose.connect(uri, options)
mongoose.set('useCreateIndex', true)
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
    LogMongoDB('datos obtenidos de mongodb')
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

const createConceptInSchema = async (
  schema: Model<IConcepts>,
  data: UIConcept,
): Promise<IOneConcept> => {
  try {
    const concept = new schema(data)
    await concept.save()
    LogMongoDB('datos guardados con exito')
    return {
      error: false,
      message: null,
      data: concept,
    }
  } catch (error) {
    return {
      error: true,
      message: error.message,
    }
  }
}

export { getAllDataFromSchema, createConceptInSchema }
