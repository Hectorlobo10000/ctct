const authentication = require('../middleware/authentication')
const _ = require('lodash')
const { Company, Route, Schedule } = require('../db/index')
const express = require('express')
const router = express.Router()

router.get('/', authentication, async (req, res) => {
  const companies = await Company.findAll({ include: Route })
  const schedules = await Schedule.findAll()
  res.status(200).send({ companies, schedules })
})

module.exports = router