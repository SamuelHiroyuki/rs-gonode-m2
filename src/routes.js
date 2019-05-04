const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

const routes = express.Router()
routes.use('/app/', authMiddleware)

routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.post)

routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.post)

routes.get('/app/dashboard', (req, res) => res.render('dashboard'))

module.exports = routes
