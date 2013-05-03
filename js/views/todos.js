// js/views/todos.js

var app = app || {};

// Todo item views

// The DOM element for a todo item...
app.TodoView = Backbone.View.extend({
	// this is the list tag
	tagName: 'li',

	// Cache the template function for a single item
	template: _.template( $('#item-template').html() ),

	// DOM events specific to an item
	events: {
		'click .toggle': 'togglecompleted', // new
		'dblclick label': 'edit',
		'click .destroy': 'clear',			// new
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
	},

	// TodoView listens for changes to its model, re-rendering
	// since their is a one to one correspondence between a 'Todo'
	// and 'TodoView' in this app, we set a direct reference 
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove); // new
		this.listenTo(this.model, 'visible', this.toggleVisible); // new
	},

	// Re-render the titles of the items
	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );

		this.$el.toggleClass( 'completed', this.model.get('completed') ); 	// new
		this.toggleVisible();												// new

		this.$input = this.$('.edit');
		return this;
	},

	// New Toggles visibility of item
	toggleVisible: function() {
		this.$el.toggleClass( 'hidden', this.isHidden());
	},

	// New Toggle the completed section
	togglecompleted: function() {
		this.model.toggle();
	},

	// Switch this view into 'editing' mode displaying the input field
	edit: function() {
		this.$el.addClass('editing');
		this.$input.focus();
	},

	// close the 'editing' mode, saving the changes
	close: function() {
		var value = this.$input.val().trim();

		if ( value ) {
			this.model.save({ title: value });	
		}
		else
		{
			this.clear();	// new
		}

		this.$el.removeClass('editing');
	},

	// if you hit 'enter', were through editing the item
	updateOnEnter: function(e) {
		if ( e.which === ENTER_KEY ) {
			this.close();
		}  
	}
});