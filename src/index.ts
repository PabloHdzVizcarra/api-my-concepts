import app from './app'
import config from './config'

console.log(config)

app.listen(() => {
  console.log(`App listen in http://${config.HOST}:${config.PORT}`)
})

