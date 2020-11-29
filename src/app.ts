import express, { Express } from 'express'
import cors from 'cors'
import allRoutes from './routes'
import './module/mongoose/mongoose.config'
import { defaultController, errorController } from './controllers/others/other.controller'

const app: Express = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(allRoutes)

app.use(defaultController)
app.use(errorController)

export default app