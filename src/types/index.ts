import { Document } from 'mongoose'

export interface IConcepts extends Document {
  title: string
  description: string
}

export interface DataRes {
  error: true | false
  message: string
  data?: IConcepts[]
}
