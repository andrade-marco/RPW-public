//Authentication
//Routes responsible for user authentication
const express = require('express');
const router = express.Router();
const {signingUpUser, signingInUser, checkingUserToken} = require('../handlers/auth');

//Routes
//Signing up new user
router.post('/signup', signingUpUser);

//Signing in existing user
router.post('/signin', signingInUser);

//Checking for user
router.post('/check', checkingUserToken);

//Export
module.exports = router;
