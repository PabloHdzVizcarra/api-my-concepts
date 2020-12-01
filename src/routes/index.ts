import { Router } from 'express'
import {
  createConcept,
  deleteConcept,
  getAllConcepts,
} from '../controllers/concepts/concepts.controllers'
import {
  conceptValidationRules,
  validationMiddleware,
} from '../middleware/validator'

const router: Router = Router()

router.get('/', (req, res) => {
  res.json({
    example: 'Please read the project readme to learn how to use this API',
  })
})

router.get('/concepts', getAllConcepts)

router.post(
  '/concept',
  conceptValidationRules(),
  validationMiddleware,
  createConcept,
)

router.delete('/concept/:name', deleteConcept)

export default router
