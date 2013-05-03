// js/collections/todos.js

var app = app || {};

// Todo Collection

// collection of todos backed by localstorage instead of a setDomLibrary

var TodoList = Backbone.Collection.extend({
	// reference the collections model
	model: app.Todo,

	// save all todo items to localstorage - using todos-backbone namespace
	localStorage: new Backbone.LocalStorage('todos-backbone'),

	// filter down the list of todos that are finished
	completed: function() {
		return this.filter(function( todo ) {
			return todo.get('completed');
		});
	},

	// filter list to only todos that are not finished
	remaining: function() {
		return this.without.apply( this, this.completed() );
	},

	// Keep the todos in sequential order despite being saved in 
	// unordered GUID in the db
	nextOrder: function() {
		if ( !this.length ) {
			return 1;
		}
		return this.last().get('order') + 1;
	},

	// create global collection of todos
	app.Todos = new TodoList();

});