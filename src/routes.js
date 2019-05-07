const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const AppointmentsController = require('./app/controllers/AppointmentsController')
const AvailableController = require('./app/controllers/AvailableController')

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

const routes = express.Router()

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

routes.use('/app/', authMiddleware)

routes.get('/files/:file', FileController.show)

routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.post)

routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.post)

routes.get('/app/logout', SessionController.destroy)
routes.get('/app/dashboard', DashboardController.index)

routes.get('/app/appointments', AppointmentsController.show)

routes.get('/app/appointments/new/:provider', AppointmentsController.create)
routes.post('/app/appointments/new/:provider', AppointmentsController.post)

routes.get('/app/available/:provider', AvailableController.index)

module.exports = routes
