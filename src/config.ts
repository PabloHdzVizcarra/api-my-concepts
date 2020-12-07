import dotenv from 'dotenv'

dotenv.config()

interface envFile {
  PORT: number | string
  MONGO_USERNAME: number | string
  MONGO_PASSWORD: number | string
  MONGO_PORT: number | string
  MONGO_HOST: number | string
  MONGO_DB: number | string
}

const env: envFile = {
  PORT: process.env.PORT || 3000,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || '123456',
  MONGO_DB: process.env.MONGO_DB || 'any',
  MONGO_HOST: process.env.MONGO_HOST || 'localhost',
  MONGO_USERNAME: process.env.MONGO_USERNAME || 'example',
  MONGO_PORT: process.env.MONGO_PORT || 27017,
}

export default env
