import config from '../../config'
import mongoose, { Model } from 'mongoose'
import {
  DataRes,
  IConcepts,
  IDeleteData,
  IOneConcept,
  ResUpdateConcept,
  UIConcept,
} from '../../types'
import { LogInfo, LogMongoDB } from '../log_debug/debug'

const uri: string = config.DB_URL
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

mongoose.connect(uri, options)
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', (): void => {
  LogInfo('success connect mongoDB')
})

const getAllDataFromSchema = async (
  schema: Model<IConcepts>,
): Promise<DataRes> => {
  try {
    const concepts: IConcepts[] = await schema.find({})
    LogMongoDB('data obtained from mongodb')
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
    LogMongoDB('data saved successfully')
    return {
      error: false,
      message: `the ${data.title} document was successfully saved in the database`,
      data: concept,
    }
  } catch (error) {
    return {
      error: true,
      message: error.message,
    }
  }
}

async function deleteDataInSchema(
  data: string,
  scheme: Model<IConcepts>,
): Promise<IDeleteData> {
  try {
    const concept = await scheme.findOneAndDelete({ title: data })
    if (!concept) {
      return {
        error: true,
        message: `not found ${data} document in the database`,
      }
    }

    return {
      error: false,
      message: 'was successfully removed from the database',
    }
  } catch (error) {
    return {
      error: true,
      message: error.message,
      databaseError: true,
    }
  }
}

async function updateDocInSchema(
  data: { description: string },
  name: { title: string },
  Schema: Model<IConcepts>,
): Promise<ResUpdateConcept> {
  try {
    const result = await Schema.findOneAndUpdate(name, data, { new: true })
    if (!result) {
      return {
        error: true,
        message: `the document with the title: ${name.title} was not found in the database`,
      }
    }
    await result.save()
    LogMongoDB('update data')
    return {
      error: false,
      message: `${name.title} document updated successfully`,
      document: result,
    }
  } catch (error) {
    return {
      error: true,
      message: error.message,
      errorDB: true,
    }
  }
}

export {
  getAllDataFromSchema,
  createConceptInSchema,
  deleteDataInSchema,
  updateDocInSchema,
}
