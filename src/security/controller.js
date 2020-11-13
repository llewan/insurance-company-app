const SecurityService = require('./service');

const Controller = {
  authenticate(req, res, next) {
    const body = req.body;
    
    return SecurityService.authenticate(body)
      .then(user => {
        return res.status(201).json(user);
      })
      .catch((error) => {
        return next(error);
      });
  }
};

module.exports = Controller;