const {check} = require('express-validator')
const {validateResult} = require('../helper/validateHelper')

const validate = [
    check('email')
        .exists()
        .isEmail()
        .isEmpty(),
    check('password')
        .isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {
    validate
}