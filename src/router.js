const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Role = require('./role');
const config = require('./config');
const Controller = require('./controller');

const authorize = (roles) => (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split(' ')[1];
		
		jwt.verify(token, config.secret, (err, user) => {			
            if (err || !roles.includes(user.role)) return res.sendStatus(403);
            req.user = user;
            next();
        });
	} else {
        res.sendStatus(401);
    }
}

// authorize([Role.ADMIN])
router.get('/users/:id', authorize([Role.USER]), Controller.getUserById);
router.get('/users/name/:name', Controller.getUserByName);
router.get('/users/policy/:policy', Controller.getUserByPolicy);
router.get('/policies/users/:name', Controller.getPoliciesByUsername);

router.post('/authenticate', Controller.authenticate);  

router.use((err, req, res, next) => {
	return res.status(err.status).json(err);
});





module.exports = router;