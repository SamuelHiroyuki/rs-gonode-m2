const { User } = require('../models')
const { Op } = require('sequelize')

class DashboardController {
  async index (req, res) {
    const providers = await User.findAll({
      where: {
        provider: true,
        email: {
          [Op.ne]: req.session.user.email
        }
      }
    })

    return res.render('dashboard', { providers })
  }
}

module.exports = new DashboardController()
