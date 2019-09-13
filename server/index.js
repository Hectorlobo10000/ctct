const { sequelize } = require('./api/db/index')
const users = require('./api/routes/users')
const authentication = require('./api/routes/authentication')
const companies = require('./api/routes/companies')
const test = require('./api/routes/test')
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

sequelize
  .authenticate()
  .then(() => {
    consola.success({
      message: 'Connection has been established successfully.',
      badge: true,
      additional: 'Mariadb'
    })
  })
  .catch(err => {
    consola.error({
      message: 'Unable to connect to the database:',
      badge: true,
      additional: err.message
    })
  })

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use('/api/users', users)
  app.use('/api/authentication', authentication)
  app.use('/api/companies', companies)
  app.use('/', test)
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
