const express = require('express')
const bcrypt  = require('bcrypt')
const jwt     = require('jsonwebtoken')  

// Models
const User = require('../models/user')

const router = express.Router()

router.get('/', (req, res) => res.send('GET: /api/login'))

router.post('/', (req, res) => {
  const { username, password } = req.body
  
  User.findOne({ username }, (err, user) => {
    if(err)
      res.send({ error: err })
    else if(bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname
      }, process.env.JWT_SECRET, { expiresIn: '10d'})
      res.json({ token })
    } else {
      res.status(401).json({ error: 'Invalid Credentials' })
    }
  })
})

module.exports = router