import app from './app'
const PORT: number = 4000

app.listen(PORT, () => {
  console.log(`App listen in http://127.0.0.1:${PORT}`)
})

