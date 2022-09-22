const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const errorHandler = require('../middlewares/errorHandler')
const {validate} = require('../middlewares/validate')

router.post('/login', validate, userController.login)
router.post('/register', validate, userController.addUser)
router.use(errorHandler.errorLogger);

module.exports = router;