import { Router } from 'express'
import {
  createConcept,
  getAllConcepts,
} from '../controllers/concepts/concepts.controllers'
import {
  conceptValidationRules,
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

export default router
