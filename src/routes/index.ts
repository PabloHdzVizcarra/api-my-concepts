import { Router } from 'express'

const router: Router = Router()

router.get("/", (req, res) => {
  res.json({
    success: "exito"
  })
})

export default router