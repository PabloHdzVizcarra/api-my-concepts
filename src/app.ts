import express, { Express } from 'express'
import cors from 'cors'
import allRoutes from './routes'

const app: Express = express()

app.use(cors())
app.use(allRoutes)
app.use(express.static('dist'))

export default app