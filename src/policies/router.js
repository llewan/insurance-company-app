const express = require('express');
const router = express.Router();

const authorize = require('../middlewares/authorize');
const Role = require('../security/role');
const Controller = require('./controller');

router.get('/users/:name', authorize([Role.ADMIN]), Controller.getPoliciesByUsername);

module.exports = router;