(function() {
  var checkContext, checkRequirements, loadLinks, loadStyles, loadUI,
 
  loadLinks = function() {
    var anchor, count, data, found, hideThreshhold, index, opacity, record, url, _len, _ref;
    found = [];
    _ref = document.getElementsByTagName("a");
    for (index = 0, _len = _ref.length; index < _len; index++) {
      anchor = _ref[index];
      leader = '/image.php?img=';
      url = anchor.getAttribute("href");
      if (!url || url.length === 0) continue;
      if (url.indexOf(leader) !== 0) continue;
      url = url.replace(leader, '/media/gals/');
      found.push(url);
    }
    return found;
  };

  loadUI = function(links) {
    var viewbox, link, num;
    viewbox = document.createElement('div');
    viewbox.setAttribute("style", "position:absolute;top:10px;right:10px;border:1px solid #000;box-shadow:1px 1px 3px #000;border-radius: 3px;padding:3px;background:#000");
    viewbox.id = "image_viewer";

    for (num = 1; num < links.length; num++) {
      link = document.createElement('a');
      link.innerHTML = num;
      link.setAttribute("href", links[num]);
      viewbox.appendChild(link);
    }
   
    document.body.appendChild(viewbox);
  };

  loadStyles = function() {
    var style_text, styles;
    styles = document.createElement("style");
    styles.type = "text/css";
    style_text = "a:visited { opacity: 0.5; color: blue; }\n";
    style_text += "#drudge_js_navbar select { margin: 0 10px; }\n";
    if (styles.styleSheet) {
      styles.styleSheet.cssText = style_text;
    } else {
      styles.appendChild(document.createTextNode(style_text));
    }
    return document.getElementsByTagName("head")[0].appendChild(styles);
  };

  var links = [];
  links = loadLinks();
  loadUI(links);
  loadStyles();

}).call(this);
