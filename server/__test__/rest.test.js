'use strict';

const request = require("supertest");
const url = require('url');

const app = require("../app");

describe('Test personen ', () => {
    test('GET /api/personen/', async () => {
        const res = await request(app).get('/api/personen/');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(10);
        expect(res.body[0]._links.self.href).toContain('/api/persons/1');
    });

    test('GET /api/personen/?zoekstring=Jos', async () => {
        const res = await request(app).get('/api/personen?zoekstring=Jos');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].first_name).toContain('Jos');
    });

    test('GET /api/personen/1', async () => {
        return request(app).get('/api/personen/1')
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body.first_name).toContain('Jos');
                expect(res.body.last_name).toContain('Vertommen');
            })
    });

    test('POST /api/personen/', async () => {
        const res = await request(app).post('/api/personen/').send({
            "first_name": "Jos",
            "last_name": "Vermeulen",
            "birth_day": "1999-01-23",
            "gender": "M",
            "image": "https://via.placeholder.com/200x80.png?text=Jos",
            "married": true,
            "yearsService": 9
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            "id": 16,
            "first_name": "Jos",
            "last_name": "Vermeulen",
            "birth_day": "1999-01-23",
            "gender": "M",
            "image": "https://via.placeholder.com/200x80.png?text=Jos",
            "married": true,
            "yearsService": 9
        });
    });

    test('GET /api/personen/1/cars', () => {
        return request(app).get('/api/personen/1/cars')
            .expect(200)
            .then(res => expect(res.body[0].license).toContain('1-AAA-123'))
    });
});

describe('Test cars', () => {
    test('GET /api/cars/1', async () => {
        const res = await request(app).get('/api/cars/1');
        expect(res.statusCode).toBe(200);
        expect(res.body.person.id).toBe(1);
        expect(res.body.car.brand).toBe('Opel');
    });
});