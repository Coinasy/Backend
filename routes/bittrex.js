import express from 'express'
import bittrex from 'node-bittrex-api'

const { BIT_KEY, BIT_SECRET } = process.env
if(!BIT_KEY || !BIT_SECRET) {
  console.log('No API Keys for Bittrex specified, check .env')
} else {
  bittrex.options({
    apikey: process.env.BIT_KEY,
    apisecret: process.env.BIT_SECRET,
  })
}

// Models

const router = express.Router()

router.get('/history/:market', (req, res) => {
  const { market } = req.params
  bittrex.getmarkethistory({ market }, (data, err) => {
    if(err) {
      res.status(400).send(err)
    }
    res.json(data)
  })
})

router.get('/all', (req, res) => {
  bittrex.getmarketsummaries((data, err) => {
    if(err) {
      console.log(err)
    }
    console.log(data.result.length)
    res.json(data)
  })
})



router.post('/', (req, res) => {
})

module.exports = router