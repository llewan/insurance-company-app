const express = require('express');
const router = express.Router();

const authorize = require('../middlewares/authorize');
const Role = require('../security/role');
const Controller = require('./controller');

router.get('/:id', authorize([Role.USER, Role.ADMIN]), Controller.getUserById);
router.get('/name/:name', authorize([Role.USER, Role.ADMIN]), Controller.getUserByName);
router.get('/policy/:policy', authorize([Role.ADMIN]), Controller.getUserByPolicy);

module.exports = router;