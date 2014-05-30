
//创建cookie
function setCookie(name, value, path, domain, expires, secure) {
	var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
	if (expires instanceof Date) {
		cookieText += '; expires=' + expires;
	}
	if (path) {
		cookieText += '; path=' + path;
	}
	if (domain) {
		cookieText += '; domain=' + domain;
	}
	if (secure) {
		cookieText += '; secure';
	}
	document.cookie = cookieText;
	// alert(cookieText);
};

// 获取cookie
function getCookie(name) {
	var cookieName = encodeURIComponent(name) + '=';
	var cookieStart = document.cookie.indexOf(cookieName);
	var cookieValue = null;
	if (cookieStart > -1) {
		var cookieEnd = document.cookie.indexOf(';', cookieStart);
		if (cookieEnd == -1) {
			cookieEnd = document.cookie.length;
		}
		cookieValue = decodeURIComponent(document.cookie.substring(cookieStart
				+ cookieName.length, cookieEnd));
	}

	return cookieValue;
};

// 删除cookie
function unsetCookie(name) {
	document.cookie = name + "= ; expires=" + new Date(0);
};

// 失效天数，直接传一个天数即可
function setCookieDate(day) {
	if (typeof day == 'number' && day > 0) {
		var date = new Date();
		date.setDate(date.getDate() + day);
	} else {
		throw new Error('传递的day 必须是一个天数，必须比0 大');
	}
	return date;
};