const express = require('express')
const axios = require('axios')

const router = express.Router()

router.get('/', (req, res) => {
    axios.get("https://api.coinmarketcap.com/v1/ticker/")
    .then(data => {
        console.log(data.data)
        res.json(data.data)
    }).catch(err => {
        console.log(err)
        res.status(403).send(err)
    }) 
})

router.get('/all', (req, res) => {
    axios.get("https://api.coinmarketcap.com/v1/ticker/?limit=0")
    .then(data => {
        console.log(data.data)
        res.json(data.data)
    }).catch(err => {
        console.log(err)
        res.status(403).send(err)
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id.toString()
    axios.get('https://api.coinmarketcap.com/v1/ticker/' + id)
    .then(data => {
        console.log(data.data)
        res.json(data.data)
    }).catch(err => {
        console.log(err)
        res.status(403).send(err)
    }) 
})

module.exports = router