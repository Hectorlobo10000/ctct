const validate = require('../validators/authentication')
const { User } = require('../db/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if(error) return res.status(400).send({ errorMessage: error.details[0].message })

  let user = await User.findOne({ where: { mail: req.body.mail } })
  if(!user) return res.status(400).send({ errorMessage: 'Invalid email or password.' })

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if(!validPassword) return res.status(400).send({ errorMessage: 'Invalid email or password.' })

  res.status(200).header('x-auth-token', await user.get('generateToken')).send(_.assign(_.pick(user, ['name', 'mail', 'phone']), { authentication: true }))
})

module.exports = router