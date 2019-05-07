const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class AppointmentsController {
  async create (req, res) {
    const provider = await User.findByPk(req.params.provider)
    return res.render('appointments/create', { provider })
  }

  async post (req, res) {
    const { id } = req.session.user
    const { provider } = req.params
    const { date } = req.body

    await Appointment.create({
      user_id: id,
      provider_id: provider,
      date
    })

    return res.redirect('/app/dashboard')
  }

  async show (req, res) {
    const { id } = req.session.user
    let appointments = await Appointment.findAll({
      where: {
        provider_id: id,
        date: {
          [Op.between]: [
            moment()
              .startOf('day')
              .format(),
            moment()
              .endOf('day')
              .format()
          ]
        }
      },
      include: [
        {
          model: User,
          as: 'user'
        }
      ]
    })

    appointments.forEach(a => {
      a.available = moment(a.date).isAfter(moment())
    })

    return res.render('appointments/list', { appointments })
  }
}

module.exports = new AppointmentsController()
