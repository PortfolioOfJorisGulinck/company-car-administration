"use strict";

const router = require("express").Router({mergeParams: true});
const url = require('url');

const carRepo = require('../repositories/carRepository');
const personRepo = require('../repositories/personRepository');
const utilHal = require('../util/hal');

// http://localhost:3000/api/cars/
function getCars(req, res) {
    const cars = carRepo.getCars();
    const formattedCars = cars.map(car => {
        const href = url.format({
                protocol: req.protocol,
                host: req.get("host"),
                pathname: "/api/cars/" + car.id
            }
        );
        return utilHal.addCarSelf(car, href)
    });
    if (!formattedCars) {
        return res.status(404).send();
    }
    res.json(formattedCars);
}

// http://localhost:3000/api/cars/7
function getCar(req, res) {
    const cId = parseInt(req.params.id);
    if (isNaN(cId)) {
        return res.status(404).send();
    }
    const car = carRepo.findCarById(cId);
    if (!car) {
        return res.status(404).send();
    }
    const person = personRepo.findPersonById(car.personId);
    if (!person) {
        return res.status(404).send();
    }

    const href = url.format({
            protocol: req.protocol,
            host: req.get("host"),
            pathname: "/api/persons/" + person.id
        }
    );

    const formattedCar = {
        car,
        person: utilHal.addSelf(person, href)
    };
    res.json(formattedCar);
}

router.get("/", getCars);
router.get("/:id", getCar);

module.exports = router;