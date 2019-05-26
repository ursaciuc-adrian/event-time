'use strict';

var writer = require('../utils/writer.js');
var EventService = require('../services/EventService.js');

module.exports.getEvents = function addEvent(req, res, next) {
	EventService.getEvents()
		.then(function (response) {
			writer.writeJson(res, response);
		})
		.catch(function (response) {
			writer.writeJson(res, response);
		});
};