// Menu Active Element

export const menuActiveElement = function () {

	let url = document.location.href,
		parts = url.split('/'),
		lastSegment = parts.pop() || parts.pop(),  // handle potential trailing slash
		linkColor = 'white';

	if (lastSegment === 'localhost:9000' || lastSegment === 'localhost') {
		lastSegment = 'index.html';
	}

	let link = $('.main-sidebar a[href="' + lastSegment + '"]');


	link.closest('li[data-index]').addClass('is-active');
	link.css('color', linkColor);

};

menuActiveElement();

