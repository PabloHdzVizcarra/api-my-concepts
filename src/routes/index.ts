import { Router } from 'express'
import { getAllConcepts } from '../controllers/concepts/concepts.controllers'

const router: Router = Router()

router.get('/', (req, res) => {
  res.json({
    success: 'exito',
  })
})

router.get('/api/v1/', getAllConcepts)

export default router
