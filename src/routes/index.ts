import { Router } from 'express'
import {
  createConcept,
  deleteConcept,
  getAllConcepts,
} from '../controllers/concepts/concepts.controllers'
import {
  conceptValidationRules,
  deleteConceptRules,
  validationMiddleware,
} from '../middleware/validator'

const router: Router = Router()

router.get('/', (req, res) => {
  res.json({
    success: 'exito',
  })
})

router.get('/api/v1/', getAllConcepts)

router.post(
  '/api/v1/create-concept',
  conceptValidationRules(),
  validationMiddleware,
  createConcept,
)

router.delete(
  '/api/v1/delete-concept/:name',
  // deleteConceptRules(),
  // validationMiddleware,
  deleteConcept,
)

export default router
