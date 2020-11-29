import config from '../../config'
import mongoose from 'mongoose'

const uri: string = config.DB_URL
const options: object = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
console.log(config.DB_URL)

mongoose.set('useFindAndModify', false)
mongoose
  .connect(uri, options)
  .then((): void => {
    console.log('connected mongoDB')
  })
  .catch((error):never =>  {
    throw error
  })
