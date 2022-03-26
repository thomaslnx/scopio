import express, { Express } from 'express'
import routes from './routes'

const app: Express = express()
app.use(routes)
app.use(express.json())

export default app