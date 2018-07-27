//Profile
const express = require('express');
const router = express.Router();
const {loginRequired} = require('../middleware/auth');
const {retrieveProfile} = require('../handlers/profile');

//Routes
//Retrieving user complete profile
router.get('/:userId', loginRequired, retrieveProfile);


//Exports
module.exports = router;
