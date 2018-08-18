//Profile
//Handler functions for profile routes (NOT IN USE)
const db = require('../models');

//Export handlers
//Retrieve complete profile
exports.retrieveProfile = async function(req, res, next) {
  try {
    //Find user profile based on user ID
    const {userId} = req.params;
    const foundProfile = await db.User.findOne({_id: userId});
    const {username, email, reputation, about, preferences} = foundProfile;

    return res.status(200).json({username, email, reputation, about, preferences});

  } catch (err) {
    return next(err);
  }
}
