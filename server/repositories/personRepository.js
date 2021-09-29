'use strict';

const jsonFile = require('../../persons.json');

let persons = jsonFile.persons;
let nextId = persons.length + 1;

function getPersons() {
    return persons;
}

function findPersonById(id) {
    return persons.find(person => person.id === id);
}

function createPerson(personToCreate) {
    const person = {
        id: nextId,
        ...personToCreate
    };
    nextId++;
    persons.push(person);
    return person;
}

function deletePerson(id) {
    persons = persons.filter(p => p.id !== id);
}

function searchPersons(searchString) {
    return persons.filter(
        p => p.first_name.toString().toLowerCase().includes(searchString.toLowerCase()) || p.last_name.toString().toLowerCase().includes(searchString.toLowerCase()));

}

module.exports = {findPersonById, getPersons, createPerson, deletePerson, searchPersons};
