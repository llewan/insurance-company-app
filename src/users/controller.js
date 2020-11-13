const { get, getByName, getByPolicy } = require('./service');

const Controller = {
  getUserById(req, res, next) {
    const userId = req.params.id; 
    
    return get(userId)
      .then((user) => {
        return res.status(201).json(user);
      })
      .catch((error) => {
        return next(error);
      });
  },

  getUserByName(req, res, next) {
    const name = req.params.name;

    return getByName(name)
      .then((user) => {
        return res.status(201).json(user);
      })
      .catch((error) => {
        return next(error);
      });
  },

  getUserByPolicy(req, res, next) {
    const policy = req.params.policy;

    return getByPolicy(policy)
      .then((user) => {
        return res.status(201).json(user);
      })
      .catch((error) => {
        return next(error);
      });
  },
};

module.exports = Controller;