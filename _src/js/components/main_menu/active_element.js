// Menu Active Element

function menuActiveElement() {
  const url = document.location.href;
  const parts = url.split('/');
  let lastSegment = parts.pop() || parts.pop(); // handle potential trailing slash
  const linkColor = 'white';

  if (lastSegment === 'localhost:9000' || lastSegment === 'localhost') {
    lastSegment = 'index.html';
  }

  const link = $('.main-sidebar a[href="' + lastSegment + '"]');

  link.closest('li[data-index]').addClass('is-active');
  link.css('color', linkColor);
}

menuActiveElement();

export default menuActiveElement;
