import { Request, Response } from 'express'
import {
  getAllDataFromSchema,
  createConceptInSchema,
  deleteDataInSchema,
  updateDocInSchema,
} from '../../module/mongoose/mongoose.config'
import { DataRes } from '../../types'
import ConceptSchema from '../../models/concepts.schema'
import { LogMongoDB, LogRoute } from '../../module/log_debug/debug'

const getAllConcepts = async (req: Request, res: Response): Promise<void> => {
  LogRoute('get /concepts')
  const { error, message, data }: DataRes = await getAllDataFromSchema(
    ConceptSchema,
  )
  if (error) {
    res.status(500).send(message)
  }
  res.status(200).json(data)
}

const createConcept = async (req: Request, res: Response): Promise<void> => {
  LogRoute('post /concept')
  const { error, message, data } = await createConceptInSchema(
    ConceptSchema,
    req.body,
  )

  if (error) {
    res.status(404).json({ error: message })
    return
  }

  res.status(201).json({
    message,
    data,
  })
}

async function deleteConcept(req: Request, res: Response): Promise<void> {
  LogRoute('delete /concept/:name')
  const { error, message, databaseError } = await deleteDataInSchema(
    req.params.name,
    ConceptSchema,
  )

  if (databaseError) {
    LogMongoDB('An error cocurred with the connection to the database')
    res.status(500).json({ error: message })
    return
  }

  if (error) {
    LogMongoDB(message)
    res.status(404).json({ error: message })
    return
  }

  LogMongoDB(message)
  res.status(200).json({ success: message })
}

async function updateConceptByName(
  req: Request,
  res: Response,
): Promise<Response> {
  LogRoute('PATCH /concept/:name')
  const { error, message, errorDB, document } = await updateDocInSchema(
    req.body,
    { title: req.params.name },
    ConceptSchema,
  )

  if (errorDB) {
    return res.status(500).json({ error: message })
  }

  if (error) {
    return res.status(404).json({ error: message })
  }

  return res.status(200).json({ message, document })
}

export { getAllConcepts, createConcept, deleteConcept, updateConceptByName }
