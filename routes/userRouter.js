const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/userController')
const errorHandler = require('../middlewares/errorHandler')
const check = require('../middlewares/check')


userRouter.get('/', [check.checkAdmin], userController.getUsers)
userRouter.post('/add', [check.checkAdmin], userController.addUser)
userRouter.get('/me', [check.checkLoggedIn], userController.getMe)
userRouter.get('/me/edit', [check.checkLoggedIn], userController.editMe)
userRouter.get('/:id', [check.checkAdmin], userController.getUser)
userRouter.put('/:id', [check.checkAdmin], userController.updateUser)
userRouter.delete('/:id', [check.checkAdmin], userController.deleteUser)
userRouter.use(errorHandler.errorLogger)

module.exports = userRouter;