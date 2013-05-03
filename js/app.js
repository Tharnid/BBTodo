// js/views/app.js

var app = app || {};

// This is where the app lives :-)

app.AppView = Backbone.View.extend({
	// instead of generating a new element, bind to the existing skeleton
	// of the app already present in the HTML
	el: '#todoapp',

	// template for stat line
	statsTemplae: _.template( $('#stats-template').html() ),

	// when intialized we bind to the relevant events on the todos
	// collection, when items are added or changed
	initialize: function() {
		this.allCheckbox = this.$('#toggle-all')[0];
		this.$input = this.$('#new-todo');
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');

		this.listenTo(app.Todos, 'add', this.addOne);
		this.listenTo(app.Todos, 'reset', this.addAll);
	},

	// add a single todo appending to the <ul>
	addOne: function( todo ) {
		var view = new app.TodoView({ model: todo });
		$('#todo-list').append( view:render().el );	
	},

	addAll: function( todo ) {
		this.$('#todo-list').html('');
		app.Todos.each(this.addOne, this);	
	}
});