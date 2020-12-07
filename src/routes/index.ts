import { Router } from 'express'
import {
  createConcept,
  deleteConcept,
  getAllConcepts,
  updateConceptByName,
} from '../controllers/concepts/concepts.controllers'
import {
  conceptUpdateRules,
  conceptValidationRules,
  validationMiddleware,
} from '../middleware/validator'

const router: Router = Router()

router.get('/', (req, res) => {
  res.json({
    example: 'Please read the project readme to learn how to use this API',
  })
})

router.get('/api/concepts', getAllConcepts)

router.post(
  '/api/concept',
  conceptValidationRules(),
  validationMiddleware,
  createConcept,
)

router.delete('/api/concept/:name', deleteConcept)
router.patch(
  '/api/concept/:name',
  conceptUpdateRules(),
  validationMiddleware,
  updateConceptByName,
)

export default router
