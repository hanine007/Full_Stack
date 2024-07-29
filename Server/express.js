import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
 const app = express()
 app.use(bodyParser.json())
app.use (bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(compression())
app.use(helmet())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send('Hello men!')
    })
export default app 