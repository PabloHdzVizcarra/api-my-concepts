import { Document } from 'mongoose'

export interface IConcepts extends Document {
  title: string
  description: string
}

export interface DataRes {
  error: boolean
  message: string
  data?: IConcepts[]
}
