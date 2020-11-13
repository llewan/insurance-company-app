const jwt = require('jsonwebtoken');
const config = require('../../config');
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

module.exports = authorize;
