import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import checkDatabaseConnection from './db/connection'

const PORT = process.env.PORT || 3000
const app = express()

app.get('/', (req, res) => {
  res.send('EcoSync Server is Up...')
})



app.listen(PORT,async () => {
    await checkDatabaseConnection()
    console.log(`Server is running on PORT ${PORT}`)
})
