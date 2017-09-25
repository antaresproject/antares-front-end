//
// Menu mobile specific scripts
//

export const menuMobile = {
  init() {
    var self = this;

    enquire.register('screen and (max-width:768px)', {
      match: function() {
        self.createSubmenu();
        self.menuRelocation();
      }
    });
  },

  // methods

  menuRelocation() {},

  createSubmenu() {
    let moreButtonPri = $('#app-wrapper .main-menu--primary li.more-trigger');
    let moreButtonSec = $('#app-wrapper .main-menu--secondary li.more-trigger');
    moreButtonSec.css('display', 'none');
    moreButtonPri.append("<div class='submenu flex-fs'></div>");
    let submenu = moreButtonPri.find('> .submenu');

    var submenuReturn = `
		<a href="#" class="submenu__mobile-return">
            <i class="zmdi zmdi-arrow-left"></i>
            <span>More</span>
        </a>`;

    var submenuInsides = `
        <section>
        	<div class="submenu__content">
	        	<header>
	        		<h3>More</h3>
	        	</header>
	        </div>
		</section>`;

    submenu.prepend(submenuReturn);
    setTimeout(function() {
      submenu.append(submenuInsides);
    }, 30);

    // add menu

    setTimeout(function() {
      let menuSecondary = $('.main-menu--secondary');
      menuSecondary.find('.main-menu--brand').remove();
      menuSecondary.removeClass('is-hidden');
      let submenuContent = submenu.find('.submenu__content');

      submenuContent.append(menuSecondary);

      $(document)
        .find('.main-menu--secondary li')
        .attr('class', '');
      $(document)
        .find('.main-menu--secondary')
        .attr('class', 'data-list');
    }, 30);
  }
};

// All units, fire at will.
// menuMobile.init();
