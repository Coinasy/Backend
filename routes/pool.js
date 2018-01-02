// modules
const express   = require('express')
const jwt       = require('jsonwebtoken')
const mongoose = require('mongoose')

const Pool = require('../models/pool')

const auth = require('../validations/authenticate')

const router = express.Router()

router.get('/' , (req, res) => {
    var data = Pool.find()
    console.log(data)
    res.send(data.stringify)
})

router.post('/create', (req, res) => {
    const { name, size, entries, fee, startDate, endDate } = req.body;
    var today = Date.now();
    // check authentication bearer
    var decodedToken = auth.authenticate(req, res)
    console.log(decodedToken.id)

    const newPool = {
        name,
        size,
        entries,
        fee,
        //will change starting and end date later
        startDate: today,
        endDate: today,
        // insert user objectID of the person login
        participant: [
            decodedToken.id
        ]
    }

    Pool.create(newPool, (err, pool) => {
        if(err)
          res.status(401).send(err)
        else {
          res.send(pool)
        }
    })   
})

module.exports = router