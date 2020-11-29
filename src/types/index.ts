import { Document } from 'mongoose'

export interface IConcepts extends Document {
  title: string,
  description: string
}