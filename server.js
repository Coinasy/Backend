import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Load Configs
dotenv.config()

// Routes
const signup  = require('./routes/signup')
const login   = require('./routes/login')
const bittrex  = require('./routes/bittrex')
const marketcap = require('./routes/marketcap')

let app = express()
const PORT = process.env.PORT || '4000'

mongoose.connect(process.env.MONGOOSE_CONNECT, { useMongoClient: true })
mongoose.connection.on('error', err => 
  console.error(`Failed to connect to DB ${err.message}`)
)

// Accept url-encoded and json headers
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use('/api/signup', signup)
app.use('/api/login', login)
app.use('/api/bittrex', bittrex)
app.use('/api/marketcap', marketcap)

app.get('/', (req, res) => res.send('Reached root path of API'))

app.listen(PORT, () => {
  console.log(`Server started at localhost:${PORT}`)
})