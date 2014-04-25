/*
---------- templates
*/

App.tmpl = function (type, left, top){
	var tmpl = document.createElement('div');

	tmpl.className  = tmpl.className + 'list';
	tmpl.setAttribute('rel','popup');

	tmpl.style.left = left + "px";
	tmpl.style.top  = top + "px";

	var searcher = document.createElement('div');
	searcher.className = 'searcher';

	var searcher_input = document.createElement('input');
	searcher_input.setAttribute('id', 'search_text');

	searcher.appendChild(searcher_input);

	switch (type){
		case 'person':
			tmpl.appendChild(searcher);
			
			for (var i in App.Persons){
				var string = document.createElement('div');
				string.setAttribute('rel', 'string');

				var name = document.createTextNode(App.Persons[i].name);
				string.appendChild(name);
				string.className = 'person';				

				tmpl.appendChild(string);
			}
		break;
	}

	return tmpl;
};

App.create_task = function (text){
	var task = document.createElement('div');
	var task_text = document.createTextNode(text);

	task.className = 'task';

	var del  = document.createElement('div');
	del.setAttribute('rel','del');
	del.className = 'right';
	var del_icon = document.createTextNode("X");
	del.appendChild(del_icon);

	task.appendChild(task_text);
	task.appendChild(del);

	var params = {
		task : text,
		date : 'date',
		owner: 'owner'
	}

	App.AJAX(params);

	return task;
};

App.AJAX = function(params, callback){
	console.log(params)

	if(callback) callback();
};

