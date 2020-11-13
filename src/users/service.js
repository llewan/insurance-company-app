const axios = require('axios/index');
const NotFoundError = require('../errors/notFoundError');
const PoliciesService = require('../policies/service');

const UserService = {
  basePath: 'http://www.mocky.io/v2/5808862710000087232b75ac',

  list() {
    return axios.get(this.basePath)
      .then(response => response.data.clients)
      .catch(error => error);
  },

  get(userId) {
    return UserService.list()
      .then((clients) => {
        const client = clients.find(user => user.id === userId);
        if (!client) throw new NotFoundError(`Not found user with id ${userId}`);
        return client;
      })
      .catch(error => { throw error; });
  },

  getByName(name) {
    return UserService.list()
      .then((clients) => {
        const client = clients.find(user => user.name.toLowerCase() === name.toLowerCase());
        if (!client) throw new NotFoundError(`Not found user with name ${name}`);
        return client;
      })
      .catch(error => { throw error; });
  },

  getByPolicy(policy) {
    return PoliciesService.get(policy)
      .then(async (policy) => await UserService.get(policy.clientId))
      .catch(error => { throw error; });
  },
};

module.exports = UserService;