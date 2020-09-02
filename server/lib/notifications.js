const moment = require('moment');
const crypto = require('crypto');

const priorities = ['low', 'medium', 'high', 'urgent'];

function getFrom(set) {
	return set[Math.floor(Math.random() * set.length)];
}

function isRead() {
	return Math.random() >= 0.5;
}

function getNotifications(length) {
	let data = [];

	for (let i = 0; i < length; i++) {
		data.push({
			id: crypto.randomBytes(20).toString('hex'),
			dateTime: moment(new Date()).format('YYYY/MM/DD HH:mm:ss'),
			title: `Random Notification ${i}`,
			priority: getFrom(priorities),
			read: isRead(),
		});
	}

	return data;
}

let data = getNotifications(20);

let notifications = {
	/**
	 * get
	 *
	 * @returns {array}
	 */
	get: function() {
		return data;
	},

	/**
	 * markAsRead
	 *
	 * @param {string} id
	 * @returns {void}
	 */
	markAsRead: function(id) {
		const notificationIndex = data.findIndex(obj => obj.id === id);

		if (notificationIndex === -1) throw new Error('Invalid Notification ID');

		data[notificationIndex].read = true;
	},
};

module.exports = notifications;
