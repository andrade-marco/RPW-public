//Authentication
//Handler functions for authentication routes
const db = require('../models');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.ENCRYPTION_KEY;

//Signing up new user
exports.signingUpUser = async function(req, res, next) {
  try {
    //Create new user and assign access token
    const newUser = await db.User.create(req.body);
    const {_id, username, email, reputation} = newUser;
    const token = jwt.sign({_id, username, email, reputation}, SECRET_KEY, {
      expiresIn: 2419200
    });

    return res.status(200).json({_id, username, email, reputation, token});

  } catch (err) {
    next(err);
  }
}

//Signing in existing user
exports.signingInUser = async function(req, res, next) {
  try {
    //Look for user based on email and check password if user found
    const foundUser = await db.User.findOne({email: req.body.email});
    const isCorrect = (foundUser) ? await foundUser.checkPassword(req.body.password) : false;
    const {_id, username, email, reputation} = (foundUser) ? foundUser : {};

    //If password correct assign accesss token
    if (isCorrect) {
      const token = jwt.sign({_id, username, email, reputation}, SECRET_KEY, {
        expiresIn: 2419200
      });
      return res.status(200).json({_id, username, email, reputation, token});

    } else {
      //Send error if password and/or username incorrect
      return next({
        code: 400,
        name: 'InvalidUsernamePassword',
        message: 'Invalid username and/or password'
      });
    }
  } catch (err) {
    return next(err);
  }
}

//Check for validitiy of access token
//Note: not currently in use - JWT decode on client side instead
exports.checkingUserToken = function(req, res, next) {
  jwt.verify(req.body.token, SECRET_KEY, function(err, decoded) {
    if (decoded) {
      const {_id, username, email, reputation, token} = decoded;
      return res.status(200).json({_id, username, email, reputation, token});
    } else {
      return next({
        status: 401,
        message: 'Please log in first'
      });
    }
  });
}
