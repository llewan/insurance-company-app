const axios = require('axios/index');
const NotFoundError = require('./notFoundError');

const PoliciesService = {
  basePath: 'http://www.mocky.io/v2/580891a4100000e8242b75c5',

  list() {
    return axios.get(this.basePath)
      .then(response => response.data.policies)
      .catch(error => error);
  },

  get(policyId) {
    return PoliciesService.list()
      .then((policies) => {
        const policy = policies.find(policy => policy.id === policyId);
        if (!policy) throw new NotFoundError(`Not found policy with id ${policyId}`);
        return policy;
      })
      .catch(error => { throw error; });
  },

  getByClient(clientId) {
  	return PoliciesService.list()
      .then((policies) => {
        console.log('policies', clientId);
        return policies.filter(policy => policy.clientId === clientId);
      })
      .catch(error => { throw error; });
  }
};

module.exports = PoliciesService;