var express = require('express');
var router = express.Router();

var notifications = require('../lib/notifications');

/**
 * notifications
 */
router.get('/', (req, res) => {
	res.send(notifications.get());
});

router.patch('/mark-as-read', (req, res) => {
	try {
		notifications.markAsRead(req.body.id);
		res.send();
	} catch (ex) {
		res.status(404);
		res.json({ message: ex.message });
	}
});

module.exports = router;
