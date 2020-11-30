import { Request, Response } from 'express'
import {
  getAllDataFromSchema,
  createConceptInSchema,
} from '../../module/mongoose/mongoose.config'
import { DataRes } from '../../types'
import ConceptSchema from '../../models/concepts.schema'
import { LogRoute } from '../../module/log_debug/debug'

const getAllConcepts = async (req: Request, res: Response): Promise<void> => {
  const { error, message, data }: DataRes = await getAllDataFromSchema(
    ConceptSchema,
  )
  if (error) {
    res.status(500).send(message)
  }
  res.status(200).json(data)
}

const createConcept = async (req: Request, res: Response): Promise<void> => {
  LogRoute('route /api/v1/create-article')
  const { error, message, data } = await createConceptInSchema(
    ConceptSchema,
    req.body,
  )

  if (error) {
    res.status(404).send(message)
    return
  }

  res.status(201).json({
    message,
    data,
  })
}

export { getAllConcepts, createConcept }
