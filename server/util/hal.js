'use strict';

function addSelf(person, href) {
    return {
        id: person.id,
        first_name: person.first_name,
        last_name: person.last_name,
        _links: {
            self: {
                href: href
            }
        }
    }
}

function addCarSelf(car, href) {
    return {
        id: car.id,
        license: car.license,
        brand: car.brand,
        model: car.model,
        _links: {
            self: {
                href: href
            }
        }
    }
}

module.exports = {addSelf, addCarSelf};