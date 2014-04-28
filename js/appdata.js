/*
------------ App data and objects
*/

App.DataLoad = function(){

	App.Persons = [

		{name: 'Sylvester Stallone'}, 
		{name: 'Jan-Claude Van Damme'},
		{name: 'Bruce Lee'},
		{name: 'Arnold Schwarzenegger'}

	];

	App.Tags = [

		{tag: 'Made in Russia'}, 
		{tag: 'Startask'},
		{tag: 'Tvora'},
		{tag: 'Design'},
		{tag: 'Programming'}

	];

	App.Task = {
		name: '',
		tags: [],
		date: ''
	};
	
};