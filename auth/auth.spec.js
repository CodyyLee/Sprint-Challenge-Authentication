const request = require('supertest');

const server = require('../api/server.js');

const db = require('../database/dbConfig.js');

const Users = require('./user-model.js');

describe('register', function() {
    it('should add a user to the database', function() {

        const users = db("users");
        const usersLen = db("users").length;

        return db('users').insert({username:"testing", password: "testing"})

        expect(users).toHaveLength(usersLen + 1);
    })

    it('should return an id', function() {
        return db('users').insert({username:"ttest", password:"test"})

        expect(res).toBe({id});
    })
})

describe('login', function() {
    it('should return 200', function() {
        return request(server).post('/api/auth/login')
            .send({username: "CodyGarrett", password: "AppleSauce"})
            .then(res => {
                expect(res.status).toBe(200);
            })
    })

    it('should return 400', function() {
        return request(server).post('/api/auth/login')
            .send({username:"random", password:'random'})
            .then(res => {
                expect(res.status).toBe(400);
            })
    })
})

describe('users', function() {
    it('should return error', function() {
        return request(server).get('/api/auth/users')
            .then(res => {
                expect(res.status).toBe(401)
            })
    })

    it('should return correct message', function() {
        return request(server).get('/api/auth/users')
            .then(res => {
                expect(res.body).toEqual({
                    errorMessage: "You shall not pass!"
                })
            })
    })
})