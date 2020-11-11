const UsersService = require('./usersService');
const PoliciesService = require('./policiesService');

const Controller = {
  getUserById(req, res, next) {
    const userId = req.params.id; 
    
    return UsersService.get(userId)
      .then((user) => {
        return res.status(201).json(user);
      })
      .catch((error) => {
        return next(error);
      });
  },

  getUserByName(req, res, next) {
    const name = req.params.name;

    return UsersService.getByName(name)
      .then((user) => {
        return res.status(201).json(user);
      })
      .catch((error) => {
        return next(error);
      });
  },

  getUserByPolicy(req, res, next) {
    const policy = req.params.policy;

    return UsersService.getByPolicy(policy)
      .then((user) => {
        return res.status(201).json(user);
      })
      .catch((error) => {
        return next(error);
      });
  },

  getPoliciesByUsername(req, res, next) {
    const name = req.params.name;
    
    return UsersService.getByName(name)
      .then(async (user) => {
        const policies = await PoliciesService.getByClient(user.id);
        return res.status(201).json(policies);
      })
      .catch((error) => {
        return next(error);
      });
  },

  authenticate(req, res, next) {
    const body = req.body;
    
    return UsersService.authenticate(body)
      .then(user => {
        return res.status(201).json(user);
      })
      .catch((error) => {
        return next(error);
      });
  }
};

module.exports = Controller;