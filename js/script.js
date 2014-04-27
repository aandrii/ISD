var App = {};

window.onload = function(){

	/*
	Apps objects
	*/

	App.MainPage = document.getElementById('wrapper');
	App.Poligon  = document.getElementById('container');

	//App.template_path = "template.html";

	App.head = document.querySelectorAll('head')[0];

	//button click
	App.add_button = document.getElementById("add_task");
	
	//task input
	App.adder_text = document.getElementById('adder_text');
	
	//basic App events handlers
	App.handlersOn();
	
	//App render
	App.render();

	
};


function add_task(){
	var task_text = document.getElementById('adder_text').value || 'empty task'; 
	var new_task = App.create_task(task_text);

	App.Poligon.appendChild(new_task);

	document.getElementById('adder_text').value = '';

};


function popup(e, popup_type, x, y){
	var type, top, left, node;

	if(popup_type)
		type = popup_type;
	else
		type = e.target.getAttribute('data-type');	

	//если всплывание под курсором
	if(x && y){
		left = x; top = y;
	}

	//если всплывание от иконки
	else {

		if(e.target.hasAttribute('rel')) {
			point = e;
		}

		else {
			point = e;
		}

		//------------------костыль для координат
		if (point.pageX || point.pageY) { 
		  left = point.pageX;
		  top  = point.pageY;
		}
		else { 
		  left = point.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
		  top  = point.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
		} 

		//костыль смещения
		top+=20;
		
	}

	//костыль смещения
	left -= 50;
	//---------------------------

	var node = App.tmpl_show(type, left, top);
	
	var onUnClick = function(e){

			try {

				if(e.target.getAttribute('id') != 'person'){
						//Chrome
						if(e.clientX){
							if(e.clientX >= left &&
							e.clientX <= left+300 &&
							e.clientY >= top-20 &&
							e.clientY <= top+300) return;
						}

						//FireFox
						if(e.pageX){
							if(e.pageX >= left &&
							e.pageX <= left+300 &&
							e.pageY >= top-20 &&
							e.pageY <= top+300) return;
						}
				}
				
			} catch(e){console.log(e)}

			
			node.hide();
			document.removeEventListener('click', onUnClick, false);
			

		};

	document.addEventListener('click', onUnClick, false);

	//search input key
	node.input.onkeyup = function(){
		searchStart(this.value);
	};


	return false;
};


function searchStart(text){
	var strings = document.querySelectorAll('[rel=string]');
	var re = new RegExp(text,"i");
	
	for(var i = 0, len = strings.length; i < len; i++){
		var str = strings[i].innerHTML;
				
		if(re.test(str))
			strings[i].style.display = 'block';
		else
			strings[i].style.display = 'none';
	
	}
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

	App.Task.task = text;

	App.save();

	return task;
};

App.save = function(){
	//adding App.Task fields
	    // var el_id = event.target.getAttribute('id');
	    
	    // //person
	    // if(el_id == 'person')
	    // 	App.Task.name = event.target.innerText || event.target.textContent;

	    // else if(el_id == 'date')
	    // 	App.Task.date = event.target;

	    var inputs = document.getElementsByTagName("input");
	    //var labels = document.getElementsByTagName("label"); 
		
		var checked = []; //will contain all checked checkboxes  
		for (var i = 0; i < inputs.length; i++) {  

		  if (inputs[i].getAttribute('data-type') == "tag") {

		  	if(inputs[i].checked){
			  	var tag_text = inputs[i].next().innerText;
			    checked.push(tag_text);
			    
			}

		  }  

		} 

		App.Task.tags = checked;

	//saving task on server
	App.AJAX(App.Task);
};

App.AJAX = function(params, callback){
	console.log(params)

	if(callback) callback();
};








