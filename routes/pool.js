// modules
const express   = require('express')
const jwt       = require('jsonwebtoken')
const mongoose = require('mongoose')

const Pool = require('../models/pool')

const auth = require('../validations/authenticate')

const router = express.Router()

router.get('/' , (req, res) => {
    Pool.find({}, (err, data) => {
        res.send(data)
    })
})

router.post('/create', (req, res) => {
    const { name, size, entries, fee, startDate, endDate } = req.body;
    var today = Date.now();
    // check authentication bearer
    var decodedToken = auth.authenticate(req, res)

    const newPool = {
        name,
        size,
        entries,
        fee,
        //TODO: will change starting and end date later
        startDate: today,
        endDate: today,
        // insert user objectID of the user that is creating
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

router.post('/join/:id', (req, res) => {
    var decodedToken = auth.authenticate(req, res)
    // only push to array if the id is unique
    Pool.findOneAndUpdate({_id: req.params.id}, {$addToSet: { participant: decodedToken.id}}, err => {
        if(err)
          res.status(401).send(err)
        else {
          res.json({success: true})
        }
    })
})

module.exports = router