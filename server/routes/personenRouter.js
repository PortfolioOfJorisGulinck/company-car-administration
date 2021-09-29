"use strict";

const router = require('express').Router();
const bodyParser = require('body-parser');
const url = require('url');

const personRepo = require('../repositories/personRepository');
const carRepo = require('../repositories/carRepository');
const utilHal = require('../util/hal');
const formdata = require('express-form-data');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(formdata.parse());


// http://localhost:3000/api/personen/
// http://localhost:3000/api/personen?zoekstring=Jos
function getPersons(req, res) {
    let persons = [];
    if (Object.keys(req.query).length === 0) { // if GET zonder query params
        persons = personRepo.getPersons();
    }
    else {
        const zoekstring = req.query.zoekstring;
        if (zoekstring) {
            persons = personRepo.searchPersons(zoekstring);
            console.log("personrouter: " + persons)
        }
    }

    const formattedPersons = persons.map(person => {
        const href = url.format({
                protocol: req.protocol,
                host: req.get("host"),
                pathname: "/api/personen/" + person.id
            }
        );
        return utilHal.addSelf(person, href)
    });
    if (!formattedPersons) {
        return res.status(404).send();
    }
    res.json(formattedPersons);
}

// http://localhost:3000/api/personen/id
function getPerson(req, res) {
    const persId = +req.params.id;
    if (isNaN(persId)) {
        return res.status(404).send();
    }
    const person = personRepo.findPersonById(persId);
    if (!person) {
        return res.status(404).send();
    }
    res.json(person);
}

// http://localhost:3000/api/personen/id
function deletePerson(req, res) {
    const persId = +req.params.id;
    if (isNaN(persId)) {
        return res.status(404, "id is not a number").send();
    }
    const person = personRepo.findPersonById(persId);
    if (!person) {
        return res.status(404, "Person not found").send();
    }
    personRepo.deletePerson(persId);

    res.json(person);
}

// http://localhost:3000/api/personen/
function addPerson(req, res) {
    const {
        first_name,
        last_name,
        birth_day,
        gender,
        married,
        image,
        yearsService,
    } = req.body;
    const personToCreate = {
        first_name,
        last_name,
        birth_day,
        gender,
        married,
        image,
        yearsService,
    };
    const person = personRepo.createPerson(personToCreate);
    res.json(person);
}

// http://localhost:3000/api/personen/1/cars
function getCarsOfPerson(req, res) {
    const pId = parseInt(req.params.id);
    if (isNaN(pId)) {
        return res.status(404).send();
    }

    const cars = carRepo.findBy((car) => car.personId === pId);
    if (!cars) {
        return res.status(404).send();
    }

    const formattedCars = cars.map(car => {
        const href = url.format({
                protocol: req.protocol,
                host: req.get("host"),
                pathname: "/api/personen/" + car.id
            }
        );
        return utilHal.addCarSelf(car, href)
    });
    if (!formattedCars) {
        return res.status(404).send();
    }
    res.json(formattedCars);
}

router.get('/', getPersons);
router.get('/:id', getPerson);
router.delete('/:id', deletePerson);
router.post('/', addPerson);
router.get("/:id/cars", getCarsOfPerson);

module.exports = router;
