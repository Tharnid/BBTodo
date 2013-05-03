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
      	$('#todo-list').append( view.render().el );
    },

	addAll: function( todo ) {
		this.$('#todo-list').html('');
		app.Todos.each(this.addOne, this);	
	},

	// hmmm...not sure what this does???
	filterOne : function( todo ) {
		todo.trigger('visible');
	},
	// this filters all the todos I believe???
	filterAll: function() {
		app.Todos.each(this.filterOne, this);
	},

	// Generate the attributes for a new Todo item.
	newAttributes: function() {
		return {
			title: this.$input.val().trim(),
			order: app.Todos.nextOrder(),
			completed: false
		};	
	},

	// if you hit return in the main input field, create a new Todo model,
	// persisting it to localStorage
	createOnEnter: function( event ) {
		if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
			return;
		}

		app.Todos.create( this.newAttributes() );
		this.$input.val('');
	},

	// clears completed items
	clearCompleted: function() {
		_.invoke(app.Todos.completed(), 'destroy');
		return false;
	},

	// clear items toggle all complete???
	toggleAllComplete: function() {
		var completed = this.allCheckbox.checked;

		app.Todos.each(function( todo ) {
			todo.save({
				'completed': completed
			});
		});
	}
});