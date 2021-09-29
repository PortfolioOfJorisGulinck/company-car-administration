'use strict';

const jsonFile = require('../../../persons.json');

const cars = jsonFile.cars;

function getCars() {
    return cars;
}

function findCarById(id) {
    return cars.find(car => car.id === id);
}

function findBy(carTest) {
    return cars.filter(carTest);
}

module.exports = {findCarById, findBy, getCars};