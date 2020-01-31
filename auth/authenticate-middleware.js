/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');

const { jwtSecret } = require("../secrets/secret.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if(err) {
        res.status(401).json({
          errorMessage: "Token is invalid."
        })
      }
      else {
        req.user = decodedToken.user;
        next();
      }
    });
  }
  else {
    res.status(401).json({
      errorMessage: "You shall not pass!"
    })
  }
};

