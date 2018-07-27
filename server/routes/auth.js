const express = require('express');
const router = express.Router();
const {signingUpUser, signingInUser, checkingUserToken} = require('../handlers/auth');

//Routes
//Signing up new user
router.post('/signup', signingUpUser);

//Logging in existing user
router.post('/signin', signingInUser);

//Checking for user
router.post('/check', checkingUserToken);

module.exports = router;
