const jwt = require('jsonwebtoken')
const authentication = require('../middleware/authentication')
const _ = require('lodash')
const bycrypt = require('bcrypt')
const validate = require('../validators/user')
const { User } = require('../db/index')
const express = require('express')
const router = express.Router()

router.get('/me', authentication, (req, res) => {
  res.send(req.user)
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if(error) return res.status(400).send({ errorMessage: error.details[0].message })

  let user = await User.findOne({ where: { mail: req.body.mail } })
  if(user) return res.status(400).send({ errorMessage: 'User already registed' }) 

  user = await User.create(_.pick(req.body, ['name', 'mail', 'password', 'identity', 'phone']))
  const salt = await bycrypt.genSalt(10)
  user.password = await bycrypt.hash(req.body.password, salt)
  await user.save();

  res.status(200).header('x-auth-token', user.generateToken).send(_.assign(_.pick(user, ['name', 'mail', 'phone']), { authentication: true }))
})

module.exports = router