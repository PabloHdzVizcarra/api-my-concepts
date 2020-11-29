import app from './app'
import config from './config'

const PORT: string | number = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`App listen in http://${config.HOST}:${config.PORT}`)
})

export default 'Success'