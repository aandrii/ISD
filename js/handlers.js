
App.handlersOn = function(){

	//button click
	App.add_button.addEventListener('click', add_task, false);

	//task input change
	App.adder_text.addEventListener('keyup', function(event){
		var symbol = event.target.value, type;

		switch(symbol){
			case '@':
				type = 'person';
			break;

			case '#':
				type = 'tag';
			break;

			case 'tomorrow':
				type = 'datepicker';
			break;

			default:
				return;
			break;
		}

		popup(event, type, App.X, App.Y);
	});

	//document click
	document.querySelector('body').addEventListener('click', function(event) {
	 
	 //removing node
	  if (event.target.getAttribute('rel') == 'del') {
	    event.target.parentNode.remove();
	  }

	  //person clicked
		if(event.target.getAttribute('id') == 'person'){
			App.Task.name = event.target.innerText;
			console.log(App.Task.name);
		}
			
	 
	 });

	//icons click
	App.icons = document.querySelectorAll('[rel=icon]');
	for (var i = 0, len = App.icons.length; i < len; i++){
	 	App.icons[i].addEventListener('click', popup, false);
	}

	//mousemove
	document.onmousemove = getCursorXY;


};

