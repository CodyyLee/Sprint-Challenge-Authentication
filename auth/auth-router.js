const router = require('express').Router();

const Users = require('./user-model.js');

const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../secrets/secret.js');

const bc = require('bcryptjs');

const restricted = require("./authenticate-middleware.js");

router.post('/register', (req, res) => {
  // implement registration
  const body = req.body;
  const hash = bc.hashSync(body.password, 10);

  body.password = hash;

  Users.add(body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "There was an error trying to register this user."
      })
    })
});

router.post('/login', (req, res) => {
  // implement login
  const body = req.body;

  Users.getUser(body.username)
    .first()
    .then(user => {
      if(user && bc.compareSync(req.body.password, user.password)) {
          const token = signToken(user)
          res.status(200).json({token});
      }
      else {
          res.status(400).json({
          errorMessage: "Failed to log into account. Invalid username or password."
      })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "There was an error trying to log into this account."
      })
    })
});

router.get('/users', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "There was an error getting all users."
      })
    })
})

function signToken(user) {
    const payload = {
        user
    }

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
