/*
---------- templates
*/

App.render = function() {
	App.PersonList = App.tmpl('person');
	App.TagsList   = App.tmpl('tag');
	App.Datepicker = App.tmpl('datepicker');

	App.MainPage.appendChild(App.PersonList);
	App.MainPage.appendChild(App.TagsList);
	App.MainPage.appendChild(App.Datepicker);

	App.PersonList.hide();
	App.TagsList.hide();
	App.Datepicker.hide();
};


App.tmpl = function (type){
	var tmpl = document.createElement('div');

	tmpl.className  = tmpl.className + 'list';
	tmpl.setAttribute('rel','popup');

	//tmpl.style.left = left + "px";
	//tmpl.style.top  = top + "px";

	var searcher = document.createElement('div');
	searcher.className = 'searcher';

	var searcher_input = document.createElement('input');
	searcher_input.setAttribute('id', 'search_text');

	searcher.appendChild(searcher_input);

	switch (type){
		case 'person':
			tmpl.appendChild(searcher);
			
			for (var i in App.Persons){
				var string = document.getElementById('person').cloneNode(true);
				string.setAttribute('rel', 'string');

				var name = document.createTextNode(App.Persons[i].name);
				string.appendChild(name);
				
				tmpl.appendChild(string);
			}
		break;

		case 'tag':
			tmpl.appendChild(searcher);
			
			for (var i in App.Tags){
				var string = document.getElementById('tag').cloneNode(true);
				string.setAttribute('rel', 'string');

				var checkbox = string.children[0];
				var label = string.children[1];

				checkbox.setAttribute('id', App.Tags[i].tag);
				label.setAttribute('for', App.Tags[i].tag);

				var tag = document.createTextNode(App.Tags[i].tag);
				label.appendChild(tag);
				
				tmpl.appendChild(string);
			}
		break;

		case 'datepicker':
			var datepicker = document.createTextNode('Datepicker in process');
			tmpl.className  = tmpl.className + ' datepicker';
			tmpl.appendChild(datepicker);			
		break;

		default:
			return;
		break;


	}

	tmpl.input = searcher_input;

	return tmpl;
};

App.tmpl_show = function(type, left, top){
	var tmpl;
	if(type == "person")
		tmpl = App.PersonList;
	if(type == "tag")
		tmpl = App.TagsList;
	if(type == "datepicker")
		tmpl = App.Datepicker;

	tmpl.style.left = left + "px";
	tmpl.style.top  = top + "px";

	tmpl.show();

	return tmpl;

};


