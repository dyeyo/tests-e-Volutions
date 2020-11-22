const router = require('express').Router();
const middleware = require('./middelware')

const apiTasksRouter = require('./api/taks.router')
const apiUsersRouter = require('./api/user.router')

// router.use('/tasks', middleware.checkedToken, apiTasksRouter)
router.use('/tasks', apiTasksRouter)
router.use('/users', apiUsersRouter)

module.exports = router