//lib/router.js
Router.configure({
	// the main application template
	layoutTemplate: 'layout',
	waitOn: function() {
		return [Meteor.subscribe('eventStats')];
	}
});

Router.map(function(){

	this.route('serverEvent', {
		where: 'server',
		'path': '/event/:action',
		action: function() {
			var action = this.params.action;
			// add raw action and timestamp
			Events.insert({action: action, timestamp: new Date()});

			// update/insert event stats
			EventStats.update({action: action}, {$inc: {count: 1}}, {upsert:true});
			this.response.write(JSON.stringify({'success': true}));
		}
	});

	// home will render the eventList template
	this.route('home', {
		path: '/',
		template: 'eventList',
		data: function (){
			return {
				sortedEvents: EventStats.find({}, {sort: {count: -1}})
			};
		}
	});
});