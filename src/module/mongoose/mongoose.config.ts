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
    console.log(concept)
    LogMongoDB('datos guardados con exito')
    return {
      error: false,
      message: null,
      data: concept,
    }
  } catch (error) {
    // console.log(error.code)
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
        message: 'No se encontraron los datos en la database',
      }
    }

    return {
      error: false,
      message: 'Se elimino con exito',
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
        message: `El documento con title: ${name.title} no se encontro en la database`,
      }
    }
    await result.save()
    return {
      error: false,
      message: `Documento ${name.title} actualizado con exito`,
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
