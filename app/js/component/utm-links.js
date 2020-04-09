(function ($, window, document) {
	
	function formatWindowSearch() {
		var pairs = window.location.search.substring(1).split("&"),
		  obj = {},
		  pair,
		  i;
	  
		for ( i in pairs ) {
		  if ( pairs[i] === "" ) continue;
	  
		  pair = pairs[i].split("=");
		  obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
		}

		delete obj.htmlpage;

		let utmString = "?";

		for(let item in obj) {
			utmString += `${item}=${obj[item]}&`
		}
	  
		return utmString.substring(0, utmString.length - 1);
	}

    function UTMlinks(obj) {
        if (!obj) {
            var obj = {};
        }

        var selector = obj.selector || '.js_utm-link';
        var links = document.querySelectorAll(selector);
		var utm = formatWindowSearch();

        for (var i = 0; i < links.length; i++) {

            var link = links[i],
				href = link.getAttribute('href');
				
			if (!href) {
				continue;
			}

            var hrefArr = href.split('?');
            var newHref = href + utm;

            if (hrefArr.length >= 2) {
                newHref = href + utm.replace("?", "&");
            }


            if (!link.hasAttribute('href') || href.length <= 0) {
                continue;
            }

			link.setAttribute('href', newHref);
        }
    }

	$(() => {
		UTMlinks();
	});

}(window.jQuery, window, document));