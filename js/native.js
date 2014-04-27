Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
};


Element.prototype.show = function() {
    this.style.display = 'block';
};


Element.prototype.hide = function() {
    this.style.display = 'none';
};


Element.prototype.next = function() {
    return this.parentElement.children[1];
};

function getCursorXY(e) {
	
	App.X = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	App.Y = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

};