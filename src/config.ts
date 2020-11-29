import dotenv from 'dotenv'
import path from 'path'

interface ConfigFile {
  NODE_ENV: string | undefined
  HOST: string | number
  PORT: number | string
  DB_URL: string
}

dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env')
})

const objectConfig: ConfigFile = {
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DB_URL || 'mongodb://0.0.0.0:27017/default',
}

export default objectConfig