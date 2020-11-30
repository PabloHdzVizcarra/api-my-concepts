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

export interface UIConcept {
  title: string
  description: string
}

export interface IOneConcept {
  error: boolean | false
  message: string | null
  data?: IConcepts
}
