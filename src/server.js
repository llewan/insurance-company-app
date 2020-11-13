const express = require('express');
const bodyParser = require('body-parser');

const UsersRouter = require('./users/router');
const PoliciesRouter = require('./policies/router');
const SecurityRouter = require('./security/router');

class Server {
  constructor(port) {
    this.port = port || 3000;
    this.app = express();
    this.setMiddlewares();
    this.setRouters();
    this.serve();
  }

  setMiddlewares() {
    this.app.use(bodyParser.json())
  }

  setRouters() {
    this.app.use('/users', UsersRouter);
    this.app.use('/policies', PoliciesRouter);
    this.app.use('/authenticate', SecurityRouter);
    this.app.use((err, req, res, next) => res.status(err.status).json(err) );
  }

  serve() {
    this.app.listen(this.port, () => { console.log(`Running on port ${this.port}!`); });
  }
}

module.exports = Server;