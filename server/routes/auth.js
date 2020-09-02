var express = require('express');
var router = express.Router();

/**
 * login
 */
router.post('/login', (req, res) => {
	// simulate invalid user
	if (req.body.username === 'invalid@syniba.com') {
		res.status(422);
		res.json({ message: 'Invalid Username or Password' });
	}

	// simulate user with expired password
	if (req.body.username === 'expired@syniba.com') {
		res.status(401);
		res.json({ metadata: { type: 'expired', resetToken: 'valid-token' } });
	}

	// simulate user with expired password, bad token
	if (req.body.username === 'expired-invalid@syniba.com') {
		res.status(401);
		res.json({ metadata: { type: 'expired', resetToken: 'invalid-token' } });
	}

	res.send();
});

/**
 * logout
 */
router.post('/logout', (req, res) => {
	res.send();
});

module.exports = router;
