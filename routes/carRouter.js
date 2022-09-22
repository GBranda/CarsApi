const express = require('express')
const carRouter = express.Router()
const carController = require('../controllers/carController')
const errorHandler = require('../middlewares/errorHandler')
const check = require('../middlewares/check')

carRouter.get('/', [check.checkAdmin], carController.getCars)
carRouter.get('/available', carController.availableCars)
carRouter.post('/add', [check.checkAdmin], carController.addCar)
carRouter.post('/buy/:id', [check.checkLoggedIn, carController.buyCar])
carRouter.get('/:id', [check.checkAdmin], carController.getCar)
carRouter.put('/:id', [check.checkAdmin], carController.updateCar)
carRouter.delete('/:id', [check.checkAdmin], carController.getCar)
carRouter.use(errorHandler.errorLogger)

module.exports = carRouter;