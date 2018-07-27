//Auth middleware
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'KxMhz22PtC0AT3FZ6gJOYbi36NRi3JMY4cc7vFajyZth2Um4iyMSjub03q5wXOTrnwLOs9YohyvOyQyr';

//Make sure user is logged in - Authentication
exports.loginRequired = function(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, SECRET_KEY, function(err, decoded) {
        if (decoded) {
          req.user = decoded;
          return next();
        } else {
          return next({
            status: 401,
            message: 'Please log in first'
          });
        }
      });
    } catch (err) {
      return next({
        status: 401,
        message: 'Please log in first'
      });
    }
};
