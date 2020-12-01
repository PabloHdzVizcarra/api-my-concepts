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
  error: true | false
  message: string | null
  data?: IConcepts
}

export interface IDeleteData {
  error: boolean
  message: string | null
  databaseError?: boolean
}
export interface ResUpdateConcept {
  error: boolean
  message: string
  errorDB?: boolean
  document?: IConcepts
}
