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
	App.add_button.addEventListener('click', add_task, false);

	//document click
	document.querySelector('body').addEventListener('click', function(event) {
	 
	 //removing node
	  if (event.target.getAttribute('rel') == 'del') {
	    event.target.parentNode.remove();
	  }

	  //adding App.Task fields
	    var el_id = event.target.getAttribute('id');
	    
	    //person
	    if(el_id == 'person')
	    	App.Task.name = event.target.innerText || event.target.textContent;

	    else if(el_id == 'date')
	    	App.Task.date = event.target;
	 
	 });


	//icons click
	App.icons = document.querySelectorAll('[rel=icon]');
	for (var i = 0, len = App.icons.length; i < len; i++){
	 	App.icons[i].addEventListener('click', popup, false);
	}

};


function add_task(){
	var task_text = document.getElementById('adder_text').value || 'empty task'; 
	var new_task = App.create_task(task_text);

	App.Poligon.appendChild(new_task);

	document.getElementById('adder_text').value = '';

};

function popup(e){
	var type, top, left, node;

	if(e.target.hasAttribute('rel')) {
		point = e;
	}

	else {
		point = e;
	}

	//костыль для координат
	if (point.pageX || point.pageY) { 
	  left = point.pageX;
	  top  = point.pageY;
	}
	else { 
	  left = point.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
	  top  = point.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
	} 

	left -= 50;

	type = e.target.getAttribute('data-type');
	node = App.tmpl(type, left, top);

	App.MainPage.appendChild(node);

	var onUnClick = function(e){

			try {

				if(e.target.getAttribute('id') != 'person'){
						//Chrome
						if(e.clientX){
							if(e.clientX >= left &&
							e.clientX <= left+300 &&
							e.clientY >= top &&
							e.clientY <= top+300) return;
						}

						//FireFox
						if(e.pageX){
							if(e.pageX >= left &&
							e.pageX <= left+170 &&
							e.pageY >= top &&
							e.pageY <= top+300) return;
						}
				}
				
			} catch(e){console.log(e)}

			
			node.remove();
			document.removeEventListener('click', onUnClick, false);
			

		};

	document.addEventListener('click', onUnClick, false);

	var search = document.getElementById('search_text');
	search.onkeyup = function(){
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



Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
};

// Element.prototype.text = function() {
//  var html = this.innerHTML;
//  html.replace(/<[^>]*>/g, "");
//  console.log(html)
//  return html;
// }


// Element.prototype.find = function(tagname) {
//     var el = this.getElementById(this.getAttribute('id')).getElementsByTagName(tagname)[0];
//     return el;
// };





