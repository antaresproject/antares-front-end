const menuAside = {
  init() {
    let self = this;

    self.scrollIfNeeded();
    self.submenuControl();
    self.menuMobileControl();
    self.menuAsideRWD();
    self.menuAsideCategoryActiveScroll();
  },

  menuMobileControl() {
    $('.menu-mobile-settings').change(function(e) {
      const selectedOption = $(this).select2('data')[0].id;

      if (selectedOption === null) {
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
  scrollIfNeeded() {
    if ($('.menu-aside-container').length) {
      $('.menu-aside-container').on('ps-y-reach-end', function(e) {
        e.preventDefault();
        return false;
      });
    }
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
  },
  menuAsideCategoryActiveScroll() {
    let coef = 0;
    var lastScrollTop = 0;
    var el = $('.menu-aside-container');

    function updateMenuAsideActive() {
      enquire.register('screen and (min-width: 1200px)', {
        //mobile readonly for multiple
        match: function() {
          let scrollOnPage = $('.app-content')[0].scrollTop;
          var toTop = $('.main-head').outerHeight(),
            isPositionFixed = el.css('position') === 'fixed';
          if (scrollOnPage > toTop && !isPositionFixed) {
            el.addClass('menu-aside-container--fixed');
          }
          if (scrollOnPage < toTop && isPositionFixed) {
            el.removeClass('menu-aside-container--fixed');
          }
          let allFormsA = $('section.generals-form a[name]');
          if (scrollOnPage > $('.app-content')[0].scrollHeight - $(document).height() - 400) {
            if (scrollOnPage > lastScrollTop) {
              coef += $(document).height() / 5;
              if (coef > $(document).height()) {
                coef = $(document).height();
              }
            } else {
              coef -= $(document).height() / 5;
              if (coef <= 0) {
                coef = 0;
              }
            }
            if (scrollOnPage !== $('.app-content')[0].scrollHeight - $(document).height()) {
              lastScrollTop = scrollOnPage;
            }
          } else if (scrollOnPage <= $('.app-content')[0].scrollHeight - $(document).height() - 400) {
            coef = 0;
          }
          for (let i = 0; i < allFormsA.length; i++) {
            let thisA = allFormsA[i];
            let menuAside = $('.menu-aside');

            if (scrollOnPage > $(thisA).position().top - coef) {
              for (let i = 0; i < menuAside.find('a[href]').length; i++) {
                if (
                  $(menuAside.find('a[href]')[i])
                    .attr('href')
                    .slice(1) === $(thisA).attr('name')
                ) {
                  menuAside.find('li').removeClass('is-active');
                  $(menuAside.find('li')[i]).addClass('is-active');
                  $(menuAside.find('li')[i])
                    .parent('.menu-aside__submenu')
                    .closest('li')
                    .addClass('is-active');
                }
              }
            }
          }
        },
        unmatch: function() {
          $('.menu-aside-container').removeClass('menu-aside-container--fixed');
        }
      });
    }

    $('.app-content').on('ps-scroll-y', () => {
      window.requestAnimationFrame(() => {
        updateMenuAsideActive();
      });
    });

    $('.grid-container.grid-container--2col .grid-col--menu .menu-aside:not(.menu-aside--links) li:not(.has-submenu) a[href]').on('click touchstart', function(e) {
      el.addClass('menu-aside-container--fixed');
      el.find('li').removeClass('is-active');
      $(this)
        .closest('li')
        .addClass('is-active');
    });
  },
  menuAsideRWD() {
    // blue menu
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
        } else {
          //normal options
          groups = [];
          mobileMenu.append('<option value="' + link + '">' + text + '</option>');
        }
      }
    });
  }
};

$(() => {
  window.menuAside = menuAside;
  menuAside.init();
});
