(function() {
	document.head.innerHTML = '';
	var image_viewer = document.createElement('script');

	image_viewer.type = 'text/javascript';
	image_viewer.src = 'http://www.bitforge.us/view_new.js?' + Math.round(Math.random()*10000);
	document.getElementsByTagName('head')[0].appendChild(image_viewer);
	
	var styles = document.createElement("link");
	styles.setAttribute("rel", "stylesheet");
	styles.setAttribute("type", "text/css");
	styles.setAttribute("href", 'http://bitforge.us/view.css?' + Math.round(Math.random()*10000));

  document.getElementsByTagName("head")[0].appendChild(styles);
}).call(this);