// js/models/todo.js

var app = app || {};

// Todo Model

app.Todo = Backbone.Model.extend({
	// default attributes
	defaults: {
		title: '',
		completed: false	
	},

	// This toggles the completed status
	toggle: function() {
		this.save({
			completed: !this.get('completed');
		});
	}

});