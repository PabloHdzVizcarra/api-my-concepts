import app from './app'
import env from './config'

const PORT: string | number = env.PORT || 300

app.listen(PORT, () => {
  console.log(`App listen in http://${'localhost'}:${env.PORT}`)
})

export default 'Success'
