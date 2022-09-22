const db = require('../models/index')
const {User, Car} = db
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const getUsers = (req, res, next) => {
    User.findAll({include: Car})
        .then(users => res.status(200).send(users))
        .catch(err => next(err))
}

const getUser = (req, res, next) => {
    const id = req.params.id
    User.findOne({where: {id}, include: Car})
        .then(user => res.status(200).send(user))
        .catch(err => next(err))
}

const addUser = async (req, res, next) => {
    const {email, password} = req.body
    const search = await User.findOne({where: {email}})
    if(search === null){
        const newUser = {
            email: email,
            password: bcrypt.hashSync(password, 10)
        }
        User.create(newUser)
            .then(user => res.status(200).send(user))
            .catch(err => next(err))
    }else{
        res.status(400).send("This Account already exists")
    }
}

const updateUser = (req, res, next) => {
    const id = req.params.id
    const {email, password} = req.body
    const newUser = {
        email: email,
        password: bcrypt.hashSync(password, 10)
    }
    User.update(newUser, {where: {id}})
        .then(user => res.status(200).send("User Successfully Updated"))
        .catch(err => next(err))
}

const deleteUser = (req, res, next) => {
    const id = req.params.id
    User.destroy({where: {id}})
        .then(user => res.status(200).send("User Successfully Deleted"))
        .catch(err => next(err))
}

const login = async (req, res, next) => {
    try{
        const user = await User.findOne({where: {email : req.body.email}})
        if(user){
            const passwordValidation = bcrypt.compareSync(req.body.password, user.password)
            if(passwordValidation){
                let token = jwt.sign({
                    usuario: user
                }, process.env.SEED_AUTENTICACION, {
                expiresIn: process.env.CADUCIDAD_TOKEN
                })
                res.status(200).json({ token : token })
            }else{
                res.status(400).send("Invalid username or password")
            }
        } else {
            res.status(400).send("Invalid username or password")
        }
    }catch(err){
        next(err)
    }
}

const getMe = (req, res, next) => {
    const id = req.user.id
    User.findOne({where: {id}, include: Car})
        .then(user => res.status(200).send(user))
        .catch(err => next(err))
}

const editMe = (req, res, next) => {
    const changes = req.body
    const id = req.user.id
    User.update(changes, {where: {id}})
        .then(user => res.status(200).send("User Successfully Updated"))
        .catch(err => next(err))
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    login,
    getMe,
    editMe
}