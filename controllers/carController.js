const db = require('../models/index');
const { Car, User } = db;

const getCars = (req, res, next) => {
    Car.findAll({ include: User})
        .then(cars => res.status(200).send(cars))
        .catch(err => next(err))
}

const getCar = (req, res, next) => {
    const id = req.params.id;
    Car.findOne({ where: { id }})
        .then(car => res.status(200).send(car))
        .catch(err => next(err));
}

const addCar = (req, res, next) => {
    Car.create(req.body)
        .then(car => res.status(201).send("Car Created"))
        .catch(err => next(err))     
}

const updateCar = (req, res, next) => {
    const id = req.params.id
    const newCar = req.body
    Car.update(newCar, { where: { id }})
        .then(car => res.status(200).send("Car Successfully Updated"))
        .catch(err => next(err))
}

const deleteCar = (req, res, next) => {
    const id = req.params.id
    Car.destroy({ where: { id } })
        .then(() => res.status(200).send("Car Successfully Deleted"))
        .catch(err => next(err))
}

const availableCars = async(req, res, next) => {
    try{
        const allCars = await Car.findAll()
        const availableCars = allCars.filter(car => car.UserId === null)
        res.status(200).send(availableCars)
    } catch(err){
        next(err)
    }
}

const buyCar = (req, res, next) => {
        const id = req.params.id
        const userId = req.user.id
        const change = {
            UserId: userId
        }
        Car.update(change, { where: {id}})
        .then(car => res.status(200).send("Car Successfully Updated"))
        .catch(err => next(err))
}

module.exports = {
    getCars,
    getCar,
    addCar,
    updateCar,
    deleteCar,
    availableCars,
    buyCar
}