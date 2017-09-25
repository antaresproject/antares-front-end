const menuAside = {
  init() {
    var self = this;

    $(function() {
      self.scrollIfNeeded();
      self.submenuControl();
      self.createSelectRWD();
      self.menuMobileControl();
      self.activeTabletMenu();
    });
  },

  menuMobileControl() {
    $('.menu-mobile-settings').change(function(e) {
      const selectedOption = $(this).select2('data')[0].id;

      if (selectedOption == null) {
        return false;
      }

      if (selectedOption.charAt(0) === '#') {
        setTimeout(() => {
          window.location.hash = selectedOption;
        }, 50);
      } else {
        setTimeout(() => {
          window.location.href = selectedOption;
        }, 50);
      }

      e.preventDefault();
    });
  },
  createSelectRWD() {
    var mobileMenu = $('.menu-mobile-settings');
    //restrain
    if (!mobileMenu.length) {
      return;
    }

    mobileMenu.find('option').remove();
    var groups = [];
    $('.menu-aside li').each(function() {
      var link = $(this)
        .find('> a')
        .attr('href');
      var text = $(this)
        .find('> a > span')
        .eq(0)
        .text();
      //validate if not empty
      if (!$(this).hasClass('menu-aside__title')) {
        //if has submenu
        if ($(this).hasClass('has-submenu')) {
          //  create optgroup if none
          if (!$('optgroup[label="' + text + '"]').length) {
            mobileMenu.append('<optgroup label="' + text + '"></optgroup>');
            groups.push(text);
          }
          //deal with submenu children
        } else if ($(this).parent('.menu-aside__submenu').length) {
          // console.log(groups)

          mobileMenu.find('optgroup[label="' + groups[0] + '"]').append('<option value="' + link + '">' + text + '</option>');
          // mobileMenu.find('optgroup').append('<option value="' + link + '">' + text + '</option>');
        } else {
          //normal options
          groups = [];
          mobileMenu.append('<option value="' + link + '">' + text + '</option>');
        }
      }
    });
  },
  scrollIfNeeded() {
    if ($('.menu-aside-container').length) {
      $('.menu-aside-container').on('ps-y-reach-end', function(e) {
        e.preventDefault();
        return false;
      });
    }

    // $('.app-content').scroll(function(e) {
    //   var el = $('.menu-aside-container'),
    //     toTop = $('.main-head').outerHeight(),
    //     isPositionFixed = el.css('position') == 'fixed';
    //   // console.log(toTop);
    //   // console.log(isPositionFixed);
    //   if ($(this).scrollTop() > toTop && !isPositionFixed) {
    //     el.addClass('menu-aside-container--fixed');
    //   }
    //   if ($(this).scrollTop() < toTop && isPositionFixed) {
    //     el.removeClass('menu-aside-container--fixed');
    //   }
    // });
  },

  submenuControl() {
    //settings menu dropdown
    $('.menu-aside > li').each(function(index, el) {
      if ($(this).children('.menu-aside__submenu').length) {
        $(this).addClass('has-submenu');
      }
    });
    $(document).on('click', '.menu-aside > li.has-submenu', function(e) {
      e.stopPropagation();
      $(this).addClass('submenu-open');
    });
    $(document).on('click', '.menu-aside > li.has-submenu.submenu-open ul', function(e) {
      e.stopPropagation();
    });
    $(document).on('click', '.menu-aside > li.has-submenu.submenu-open', function(e) {
      e.stopPropagation();
      $(this).removeClass('submenu-open');
    });
  }
};

menuAside.init();

export default menuAside;
