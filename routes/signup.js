// modules
const express   = require('express')
const jwt       = require('jsonwebtoken')
const bcrypt    = require('bcrypt')

// models
const User = require('../models/user')

const router = express.Router()

router.get('/', (req, res) => res.send('GET: /api/signup'))

router.post('/', (req, res) => {
  const { username, firstname, lastname, password, email } = req.body
  const password_digest = bcrypt.hashSync(password, 10)
  
  User.findOne({username}, (err, user) => {
    if(err)
      res.send({ error: err })
    // else if(user) {
    //   res.send({ error: 'Username already exists'})
    // }
    else {
      const newUser = {
        username,
        password: password_digest,
        firstname,
        lastname,
        email,
      }
      User.create(newUser, (err, user) => {
        if(err)
          res.status(401).send(err)
        else {
          const token = jwt.sign({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname
          }, process.env.JWT_SECRET, {expiresIn: '10d'})
          res.json({ token })
        }
      })
    }
  })
})

module.exports = router