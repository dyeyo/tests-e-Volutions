const Sequelize = require('sequelize')
const TaskModel = require('./models/taks.model')
const UserModel = require('./models/users.model')
const sequelize = new Sequelize('ImqyNzNcgI', 'ImqyNzNcgI', 'TRRgU7CSmH', {
  host: 'remotemysql.com',
  dialect: 'mysql'
})

const Task = TaskModel(sequelize, Sequelize)
const User = UserModel(sequelize, Sequelize)

sequelize.sync({ force: false }).then(() => {
  console.log('Tables Created');
})

module.exports = {
  Task,
  User
}
