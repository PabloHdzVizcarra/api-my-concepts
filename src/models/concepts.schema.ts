import { IConcepts } from '../types'
import { model, Schema } from 'mongoose'

const conceptsSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export default model<IConcepts>('Concept', conceptsSchema)
