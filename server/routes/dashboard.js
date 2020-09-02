var express = require('express');
var router = express.Router();

var getDashboardLayout = require('../lib/dashboard');
var getAvailableWidgets = require('../lib/dashboard/availableWidgets');
var getWidget = require('../lib/dashboard/widget');

/**
 * /dashboard
 */
router.get('/', (req, res) => {
	res.send(getDashboardLayout());
});

/**
 * /dashboard/available-widgets
 */
router.get('/available-widgets', (req, res) => {
	res.send(getAvailableWidgets());
});

/**
 * /dashboard/widget
 */
router.get('/widget', (req, res) => {
	if (!req.query || !req.query.reportId) {
		res.status(400);
		res.json({ message: 'No Report ID Given' });
	}

	let widget = getWidget(req.query.reportId);

	if (widget === null) {
		res.status(404);
		res.json({ message: 'Report ID Not Found' });
	}

	if (req.query.duration !== undefined) {
		widget.metadata.duration = req.query.duration;
	}

	res.send(widget);
});

module.exports = router;
