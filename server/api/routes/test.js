const base64 = require('base-64')
const utf8 = require('utf8')
const express = require('express')
const router = express.Router()

router.get('/test',  (req, res) => {
  const text = 'http://localhost:3000/api/0b7f45b0-be67-11e9-84e4-537eaa6f60cf'
  const bytes = utf8.encode(text)
  const encode = base64.encode(bytes)
  const bytes1 = base64.decode(encode)
  const text1 = utf8.decode(bytes1)
  res.send({ encoded: encode, decoded: text1 })
})

module.exports = router