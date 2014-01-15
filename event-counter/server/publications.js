//server/publications.js
Meteor.publish('eventStats', function(options) {
	return EventStats.find({}, options);
});