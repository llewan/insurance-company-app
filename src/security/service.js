const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/notFoundError');
const config = require('../../config');
const UserService = require('../users/service')

const SecurityService = {
  authenticate({ email }) {
    return UserService.list()
      .then((clients) => {
        const client = clients.find(client => client.email === email);
        if (!client) throw new NotFoundError(`Not found user with email ${email}`);
        const token = jwt.sign({ sub: client.email, role: client.role }, config.secret);
        return { ...client, token };
      })
      .catch(error => { 
        throw error; 
      });
  }
};

module.exports = SecurityService;