const reservationModel = require('../models/reservation')
const busModel = require('../models/bus')
const chairModel = require('../models/chair')
const scheduleModel = require('../models/schedule')
const routeModel = require('../models/route')
const companyModel = require('../models/company')
const userModel = require('../models/user')
const consola = require('consola')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('ctct', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mariadb',
  define: {
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    }
  },
  dialectOptions: {
    timezone: process.env.TZ
  },
  pool: {
    max: 10,
    min: 1,
    idle: 10000,
    acquire: 120000
  }
})

const User = userModel(sequelize, Sequelize)
const Company = companyModel(sequelize, Sequelize)
const Route = routeModel(sequelize, Sequelize)
const Schedule = scheduleModel(sequelize, Sequelize)
const Bus = busModel(sequelize, Sequelize)
const Chair = chairModel(sequelize, Sequelize)
const Reservation = reservationModel(sequelize, Sequelize)

Company.hasMany(Route)
Route.belongsTo(Company)

Schedule.hasMany(Bus)
Bus.belongsTo(Schedule)

User.hasMany(Reservation)
Reservation.belongsTo(User)

Route.hasMany(Reservation)
Reservation.belongsTo(Route)

Chair.hasMany(Reservation)
Reservation.belongsTo(Chair)

/* Bus.hasMany(Chair)
Chair.belongsTo(Bus) */

/* sequelize.sync({ force: true})
  .then(() =>  {
    consola.success({
      message: 'Database & tables created.',
      badge: true,
    })
    User.create({ name: 'Hector lobo', mail: 'hector.lobo10000@gmail.com', password: '$2b$10$NOev1oGr5Ick6slbtMXtXezge8yh8fa.jkHaAeFbt.gPhcZ.6BW8e', identity: '0301199202602', phone: '96511795' })
    //create->companies->routes
    companies = [
      { name: 'Company 1', address: 'address 1' },
      { name: 'Company 2', address: 'address 2' },
      { name: 'Company 3', address: 'address 3' },
      { name: 'Company 4', address: 'address 4' },
      { name: 'Company 5', address: 'address 5' },
      { name: 'Company 6', address: 'address 6' }
    ]
    companies.forEach(element => {
      Company.create(element)
        .then(company => {
          routes = [
            { name: 'Route 1', description: 'description 1', companyId: company.id },
            { name: 'Route 2', description: 'description 2', companyId: company.id }
          ]
          routes.forEach(element => {
            Route.create(element)
          })
        })
    })
    //create->schedules
    schedules = [
      { hour: '06:00:00', isWeekend: false },
      { hour: '07:00:00', isWeekend: false },
      { hour: '08:00:00', isWeekend: false },
      { hour: '09:00:00', isWeekend: false },
      { hour: '10:00:00', isWeekend: false },
      { hour: '11:00:00', isWeekend: false },
      { hour: '12:00:00', isWeekend: false },
      { hour: '13:00:00', isWeekend: false },
      { hour: '14:00:00', isWeekend: false },
      { hour: '15:00:00', isWeekend: false },
      { hour: '16:00:00', isWeekend: false },
      { hour: '17:00:00', isWeekend: false },
      { hour: '18:00:00', isWeekend: true },
    ]
    schedules.forEach(element => {
      Schedule.create(element)
        .then(schedule => {
          buses = [
            { plate: 'BAA0001', driver: 'driver 1', scheduleId: schedule.id, isAvailable: true },
            { plate: 'BAA0001', driver: 'driver 2', scheduleId: schedule.id, isAvailable: false }
          ]
          buses.forEach(element => {
            Bus.create(element)
          })
        })
    })

    //create->chairs
    chairs = [
      { chair: 'RW-15'},
      { chair: 'RH-16'},
      { chair: 'LH-31'},
      { chair: 'LW-32'},
      { chair: 'RW-13'},
      { chair: 'RH-14'},
      { chair: 'LH-29'},
      { chair: 'LW-30'},
      { chair: 'RW-11'},
      { chair: 'RH-12'},
      { chair: 'LH-27'},
      { chair: 'LW-28'},
      { chair: 'RW-9'},
      { chair: 'RH-10'},
      { chair: 'LH-25'},
      { chair: 'LW-26'},
      { chair: 'RW-7'},
      { chair: 'RH-8'},
      { chair: 'LH-23'},
      { chair: 'LW-24'},
      { chair: 'RW-5'},
      { chair: 'RH-6'},
      { chair: 'LH-21'},
      { chair: 'LW-22'},
      { chair: 'RW-3'},
      { chair: 'RH-4'},
      { chair: 'LH-19'},
      { chair: 'LW-20'},
      { chair: 'RW-1'},
      { chair: 'RH-2'},
      { chair: 'LH-17'},
      { chair: 'LW-18'}
    ]
    chairs.forEach(element => {
      Chair.create(element)
    })
  })
  .catch(err => {
    consola.error({
      message: err.message,
      badge: true
    })
  }) */

module.exports = {
  sequelize,
  User,
  Company,
  Route,
  Schedule,
  Chair,
  Reservation
}