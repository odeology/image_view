(function($) {
	$(function() {
	  var loadThumbLinks, loadStyles, loadThumbs, loadGals, loadGalLinks;
	
		processCurrentURL = function() {
			if (data = localStorage.getItem("image.view.galleries")) {
	      data = JSON.parse(data);
				for (url in data) {
					if (window.location.pathname === url) {
						data[url].viewed = true;
						localStorage.setItem("image.view.galleries", JSON.stringify(data));
						break;
					}
				}
	    }
		};

		loadData = function(set) {
			if (data = localStorage.getItem("image.view." + set)) {
	      data = JSON.parse(data);
				return data;
	    }
		};
		
	  loadThumbLinks = function() {
	    var found, url, _ref;
	    found = [];
	    _ref = document.getElementsByTagName("a");
	    for (index = 0, _len = _ref.length; index < _len; index++) {
	      anchor = _ref[index];
				dirprefix = '/media/gals/';
				leader = '/image.php?img=';
				//dirprefix = './test_files/';
	      url = anchor.getAttribute("href");
	      if (!url || url.length === 0) continue;
	      if (url.indexOf(leader) !== 0) continue;
	      url = url.replace(leader, dirprefix);
	      found.push(url);
	    }
	    return found;
	  };
	
	  loadGalLinks = function(delimiter) {
			var found, url, _ref, parts = [];
			if (data = localStorage.getItem("image.view.galleries")) {
	      data = JSON.parse(data);
	    } else {
	      data = {};
	    }

	    found = [];
	    _ref = document.getElementsByTagName("a");
	    for (index = 0, _len = _ref.length; index < _len; index++) {
	      anchor = _ref[index];
	      url = anchor.getAttribute("href");
	      if (!url || url.length === 0) continue;
	      if (url.indexOf(delimiter) !== 0) continue;
				parts = url.split('/');
	      found.push(url);
				if (data[url]) {

				} else {
					data[url] = {
						viewed: false,
						favorite: false,
						host: location.hostname,
						galNum: parts[2],
						sponsor: parts[3],
						gallery: parts[4],
						thumb: $(this).find('img').attr('src')
					}
				}
	    }
	
			localStorage.setItem("image.view.galleries", JSON.stringify(data));
			
	    return found;
	  };

	  loadThumbsUI = function(links) {
	    var thumbs, link, num, img, thumbpath, viewbox;
	    thumbs = document.createElement('div');
	    thumbs.id = 'thumbs';

	    //add thumb links to viewbox
	    for (num = 0; num < links.length - 1 ; num++) {
	      link = document.createElement('a');
	      thumbpath = links[num].replace('.jpg','s.jpg');
	      link.innerHTML = '<img src="' + thumbpath + '" />';
				link.setAttribute("class", num);
	      link.setAttribute("href", links[num]);
	      thumbs.appendChild(link);
	    }

			//create new image viewport for main image
			viewbox = document.createElement('div');
			viewbox.id = 'viewbox';

			//preload main images
			for (num = 0; num < links.length - 1; num++) {
				img = document.createElement('img');
				img.setAttribute('src', links[num]);
				img.setAttribute('class', 'mainimage img' + num + ((num == 0) ? ' active' : ''));
				viewbox.appendChild(img);
			}

	    $('#imageview').append(thumbs);
			$('#imageview').append(viewbox);
			$('#nav ul.panel-ops').append('<li><a class="imageview" href="javascript:void(0);">Image View</a>');
	  };
	
	  loadGalsUI = function(links) {
		//rename to something other than gallerie
		//maybe other, similar, etc
	    var thumbs, link, num, img, thumbpath, viewbox, mainimages = [];
	    thumbs = document.createElement('div');
	    thumbs.id = 'gals';
			data = loadData('galleries');

	    //add thumb links to viewbox
	    for (num = 0; num < links.length; num++) {
	      link = document.createElement('a');
				//Load gallery item if it exists.
				//TODO: perform any replacements necessary for correct link
				galleryItem = data[links[num]];
				parts = links[num].split('/');
				galNum = pad(parts[2], 4);
	      thumbpath = '/media/thumbs/00' + galNum + '.jpg';
	      link.innerHTML = '<img src="' + thumbpath + '" />';
				link.setAttribute("class", num + ((galleryItem && galleryItem.viewed) ? ' viewed' : '') + ((galleryItem && galleryItem.favorite) ? ' favorite' : ''));
	      link.setAttribute("href", links[num]);
	      thumbs.appendChild(link);
	    }

	    $('#imageview').append(thumbs);
	  };
	
		loadHistoryUI = function() {
			//rename to galleries
			var data;
			data = localStorage.getItem("image.view.galleries");
			data = JSON.parse(data);
			
			history = document.createElement('div');
			history.id = 'history';
			history.setAttribute('class', 'panel');

			for (url in data) {
				link = document.createElement('a');
				link.setAttribute('href', url);
				link.setAttribute('class', 'gallery' + ((data[url].viewed === true) ? ' viewed' : '') + ((data[url].favorite === true) ? ' favorite' : ''));
				link.innerHTML = '<img src="/media/thumbs/' + pad(data[url].galNum, 6) + '.jpg" />';
				history.appendChild(link);
			}
			
			document.body.appendChild(history);
			$('#nav ul.panel-ops').append('<li><a class="history" href="javascript:void(0);">Galleries</a>');
		}
		
		loadFavoritesUI = function() {
			var data;
			data = loadData('galleries');
			
			favorties = document.createElement('div');
			favorties.id = 'favorties';
			favorties.setAttribute('class', 'panel');

			for (url in data) {
				if (data[url].favorite) {
					link = document.createElement('a');
					link.setAttribute('href', url);
					link.setAttribute('class', 'gallery' + ((data[url].viewed === true) ? ' viewed' : '') + ((data[url].favorite === true) ? ' favorite' : ''));
					link.innerHTML = '<img src="/media/thumbs/' + pad(data[url].galNum, 6) + '.jpg" />';
					favorties.appendChild(link);
				}
			}
			
			document.body.appendChild(favorties);
			$('#nav ul.panel-ops').append('<li><a class="favorties" href="javascript:void(0);">Favorties</a></li>');
		}
	
		function pad(number, length) {
	    var str = '' + number;
	    while (str.length < length) {
	        str = '0' + str;
	    }
	    return str;
		}

	  var mainlinks = [];
		var gals = [];

	  mainlinks = loadThumbLinks();
	  gals = loadGalLinks('/gallery/');

		document.body.innerHTML = '';
		
		data = loadData('galleries');
		url = window.location.pathname;
		if (!data[url]) {
			//TODO: use a class?
			// 
			parts = url.split('/');
			data[window.location.pathname] = {
				viewed: false,
				favorite: false,
				host: location.hostname,
				galNum: parts[2],
				sponsor: parts[3],
				gallery: parts[4],
				thumb: $(this).find('img').attr('src')
			}
			
			//TODO: use a method or function
			localStorage.setItem("image.view.galleries", JSON.stringify(data));
		}
		curLink = data[window.location.pathname];
		
		$('body').append('<div id="nav"><ul class="panel-ops"></ul><ul class="gal-ops"><li><a class="favorite' + ((curLink && curLink.favorite) ? ' unmark' : ' mark') + '" href="javascript:void(0);">' + ((curLink && curLink.favorite) ? 'Unmark' : 'Mark') + ' Favorite</a></li></ul></div>');
		$('body').append('<div id="imageview" class="panel active' + ((curLink && curLink.favorite) ? ' favorite' : '') + '"></div>');

		loadGalsUI(gals);
	  loadThumbsUI(mainlinks);
		loadHistoryUI();
		processCurrentURL();
		loadFavoritesUI();
		//TODO: change so that each function is bound to a click, so we dont have to load all of it at start
	
		$('#thumbs a').click(function(e) {
			$('#viewbox img').removeClass('active');
			index = $(this).attr('class');
			$('#viewbox img').eq(index).addClass('active');
			e.preventDefault();
		});
		
		$('#nav ul.panel-ops li a').click(function(e) {
			$('.panel').removeClass('active');
			$('body').find('#' + $(this).attr('class')).addClass('active');
			e.preventDefault();
		});
		
		$('#nav li a.mark.favorite').click(function(e) {
			data = loadData('galleries');
			if (curLink = data[window.location.pathname]) {
				console.log('true');
				curLink.favorite = true;
				localStorage.setItem("image.view.galleries", JSON.stringify(data));
				$(this).removeClass('mark').addClass('unmark').html('Unmark Favorite');
			}
			e.preventDefault();
		});

	});
})(jQuery);


