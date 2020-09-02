var express = require('express');
var router = express.Router();

/**
 * forgot-password
 */
router.post('/forgot-password', (req, res) => {
	// simulate lockout
	if (req.body.email === 'lockout@syniba.com') {
		res.status(429);
		res.json({ data: { message: 'Your account has been locked for to many password requests.' } });
	}

	res.send({ data: { message: 'Check your email for instructions on resetting your password.' } });
});

/**
 * update-password
 */
router.post('/update-password', (req, res) => {
	if (req.body.token && req.body.token !== 'valid-token') {
		res.status(401);
		res.send({ data: { message: 'Your password reset token was invalid.' } });
	}

	if (req.body.currentPassword && req.body.currentPassword !== 'password') {
		res.status(401);
		res.send({ data: { message: 'The information given does not match our records.' } });
	}

	res.send();
});

module.exports = router;
