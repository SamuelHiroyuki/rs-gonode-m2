const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')

const routes = express.Router()

routes.get('/', SessionController.create)
routes.post('/signin', SessionController.post)

routes.get('/signup', UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.post)

routes.get('/app/dashboard', (req, res) => res.render('dashboard'))

module.exports = routes
