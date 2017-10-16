// Menu Active Element

export const activeMenuElement = {
  init() {
    const url = document.location.href;
    const parts = url.split('/');
    let lastSegment = parts.pop() || parts.pop(); // handle potential trailing slash
    var linkColor = 'white';

    if (window.antaresCfgLocal.menuSimpleSubmenu) {
      linkColor = '#5C6066';
    }

    if (lastSegment === 'localhost:9000' || lastSegment === '#' || url === 'http://demo.antaresproject.io/frontend/') {
      lastSegment = 'index.html';
    }

    let link = $('a[href="' + lastSegment + '"]');
    link.closest('li[data-index]').addClass('is-active');
    if (window.antaresCfgLocal.menuSimpleSubmenu === true) {
      link.css('color', '#5c6066');
    } else {
      link.css('color', 'white');
    }
  }
};

export default activeMenuElement;
