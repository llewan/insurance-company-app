const { getByName } = require('../users/service');
const { getByClient } = require('./service');

const Controller = {
  getPoliciesByUsername(req, res, next) {
    const name = req.params.name;
    
    return getByName(name)
      .then(async (user) => {
        const policies = await getByClient(user.id);
        return res.status(201).json(policies);
      })
      .catch((error) => {
        return next(error);
      });
  },
};

module.exports = Controller;