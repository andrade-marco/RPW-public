//Handlers for profile
const db = require('../models');

//Export handlers
//Retrieve complete profile
exports.retrieveProfile = async function(req, res, next) {
  try {
    const {userId} = req.params;
    const foundProfile = await db.User.findOne({_id: userId});
    const {username, email, reputation, about, preferences} = foundProfile;

    return res.status(200).json({username, email, reputation, about, preferences});

  } catch (err) {
    return next(err);
  }
}
