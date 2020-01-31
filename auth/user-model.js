const db = require('../database/dbConfig.js');

module.exports = {
    add,
    getUser,
    find
}

function add(user) {
    return db('users').insert(user);
}

function getUser(username) {
    return db('users').select('id','username', 'password').where('username', username);
}

function find() {
    return db('users');
}