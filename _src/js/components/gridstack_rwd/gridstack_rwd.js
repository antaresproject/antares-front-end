/*
 * Part of the Antares Project package.
 *
 * NOTICE OF LICENSE
 *
 * Licensed under the 3-clause BSD License.
 *
 * This source file is subject to the 3-clause BSD License that is
 * bundled with this package in the LICENSE file.
 *
 * @package    Global
 * @version    0.9.2
 * @author     Antares Team
 * @license    BSD License (3-clause)
 * @copyright  (c) 2017, Antares Project
 * @link       http://antaresproject.io
 * 

*/

/* global enquire */

// COMPONENT NAME

export default {
  init() {
    const self = this;
    // this.onWindowLoad();
    // this.onDocReady();
    // $('.ui-resizable-handle').mouseup(function() {
    //   this.updateResizeGridstack($(this));
    // });
    // alert('asd');
    //   this.maksymSoFar();
    // this.letsDoThis();
  },

  // methods

  maksymSoFar() {
    // setTimeout(function () {
    // 	$('.grid-stack-item').each(function () {
    // 		var width = $(this).attr('data-gs-width');
    // 		if (width <= 6) {
    // 			$(this).addClass('grid-size--xs'); //tablet ver - odyn pod drugik pod tretim
    // 			// deleteGridstackItemsIfSizeBig()
    // 		} else if (width <= 8) {
    // 			$(this).addClass('grid-size--sm'); // tablet hor - odyn pod drugim
    // 			// deleteGridstackItemsIfSizeBig()
    // 		} else if (width <= 10) {
    // 			$(this).addClass('grid-size--md'); // laptop - odyn pod drugim
    // 			// deleteGridstackItemsIfSizeBig()
    // 		} else if (width <= 12) {
    // 			$(this).addClass('grid-size--lg'); // desktop -  dwe kolonki
    // 			// deleteGridstackItemsIfSizeBig()
    // 		} else if (width <= 24) {
    // 			$(this).addClass('grid-size--xl');
    // 		}
    // 	});
    // 	console.log('gridstack add classes');
    // }, 1000);
    // function updateResizeGridstack(target) {
    // 	// console.log('checkGridstackSize work');
    // 	// console.log(target);
    // 	// console.log(target.closest('.grid-stack-item'));
    // 	target.closest('.grid-stack-item').removeClass('grid-size--xs');
    // 	target.closest('.grid-stack-item').removeClass('grid-size--sm');
    // 	target.closest('.grid-stack-item').removeClass('grid-size--md');
    // 	target.closest('.grid-stack-item').removeClass('grid-size--lg');
    // 	target.closest('.grid-stack-item').removeClass('grid-size--xl');
    // 	setTimeout(() => {
    // 		const width = target.closest('.grid-stack-item').attr('data-gs-width');
    // 		if (width <= 6) {
    // 			target.closest('.grid-stack-item').addClass('grid-size--xs'); //tablet ver - odyn pod drugik pod tretim
    // 			// deleteGridstackItemsIfSizeBig()
    // 		} else if (width <= 8) {
    // 			target.closest('.grid-stack-item').addClass('grid-size--sm'); // tablet hor - odyn pod drugim
    // 			// deleteGridstackItemsIfSizeBig()
    // 		} else if (width <= 10) {
    // 			target.closest('.grid-stack-item').addClass('grid-size--md'); // laptop - odyn pod drugim
    // 			// deleteGridstackItemsIfSizeBig()
    // 		} else if (width <= 12) {
    // 			target.closest('.grid-stack-item').addClass('grid-size--lg'); // desktop -  dwe kolonki
    // 			// deleteGridstackItemsIfSizeBig()
    // 		} else if (width <= 24) {
    // 			target.closest('.grid-stack-item').addClass('grid-size--xl');
    // 		}
    // 		console.log('gridstack rwd classupdate');
    // 	}, 100);
    // }
    // function checkDevices() {
    // 	enquire.register('screen and (max-width:767px) ', {
    // 		match: function () {
    // 			$('#app-wrapper').addClass('is-mobile');
    // 		},
    // 		unmatch: function () {
    // 			$('#app-wrapper').removeClass('is-mobile');
    // 		}
    // 	});
    // 	enquire.register('screen and (min-width:768px) and (max-width:1023px)', {
    // 		match: function () {
    // 			$('#app-wrapper').addClass('is-tablet-vertical');
    // 			changeGridstackFromDevices();
    // 		},
    // 		unmatch: function () {
    // 			$('#app-wrapper').removeClass('is-tablet-vertical');
    // 		}
    // 	});
    // 	enquire.register('screen and (min-width:1024px) and (max-width:1199px)', {
    // 		match: function () {
    // 			$('#app-wrapper').addClass('is-tablet-horizontal');
    // 			changeGridstackFromDevices();
    // 		},
    // 		unmatch: function () {
    // 			$('#app-wrapper').removeClass('is-tablet-horizontal');
    // 		}
    // 	});
    // 	enquire.register('screen and (min-width:1200px) and (max-width:1366px)', {
    // 		match: function () {
    // 			$('#app-wrapper').addClass('is-laptop');
    // 			changeGridstackFromDevices();
    // 		},
    // 		unmatch: function () {
    // 			$('#app-wrapper').removeClass('is-laptop');
    // 		}
    // 	});
    // 	enquire.register('screen and (min-width:1367px)', {
    // 		match: function () {
    // 			$('.grid-stack-item').each(function () {
    // 				var width = $(this).attr('data-gs-width');
    // 				if (width <= 8) {
    // 					$(this).find('.card').addClass('grid-size--tablet-xs');
    // 				} else if (width <= 12) {
    // 					$(this).find('.card').addClass('grid-size--tablet-sm');
    // 				} else if (width <= 20) {
    // 					$(this).find('.card').addClass('grid-size--tablet-md');
    // 				} else if (width <= 24) {
    // 					$(this).find('.card').addClass('grid-size--tablet-lg');
    // 				}
    // 			});
    // 			$('#app-wrapper').addClass('is-desktop');
    // 			changeGridstackFromDevices();
    // 		},
    // 		unmatch: function () {
    // 			$('#app-wrapper').removeClass('is-desktop');
    // 		}
    // 	});
    // }
    // function changeGridstackFromDevices() {
    // 	// not needed anymore.
    // 	// setTimeout(function() {
    // 	//   if ($('#app-wrapper').hasClass('is-desktop')) {
    // 	//     // console.log('THIS IS DESKTOP');
    // 	//     $('.grid-size--lg').attr('data-gs-width', '12');
    // 	//     $('.grid-size--md').attr('data-gs-width', '10');
    // 	//     $('.grid-size--sm').attr('data-gs-width', '8');
    // 	//     $('.grid-size--xs').attr('data-gs-width', '6');
    // 	//   } else if ($('#app-wrapper').hasClass('is-laptop')) {
    // 	//     // console.log('THIS IS LAPTOP');
    // 	//     $('.grid-size--md').attr('data-gs-width', '12');
    // 	//     $('.grid-size--sm').attr('data-gs-width', '10');
    // 	//     $('.grid-size--xs').attr('data-gs-width', '8');
    // 	//   } else if ($('#app-wrapper').hasClass('is-tablet-horizontal')) {
    // 	//     // console.log('THIS IS TABLET HOR');
    // 	//     $('.grid-size--sm').attr('data-gs-width', '12');
    // 	//     $('.grid-size--xs').attr('data-gs-width', '10');
    // 	//   } else if ($('#app-wrapper').hasClass('is-tablet-vertical')) {
    // 	//     // console.log('THIS IS TABLET VER');
    // 	//     $('.grid-size--xs').attr('data-gs-width', '12');
    // 	//   }
    // 	// }, 300);
    // }
    // function deleteGridstackItemsIfSizeBig() {
    // 	// console.log('delete grid');
    // 	if ($('#app-wrapper').hasClass('is-laptop')) {
    // 		$('.grid-size--lg').remove();
    // 	} else if ($('#app-wrapper').hasClass('is-tablet-horizontal')) {
    // 		$('.grid-size--lg').remove();
    // 		$('.grid-size--md').remove();
    // 	} else if ($('#app-wrapper').hasClass('is-tablet-vertical')) {
    // 		$('.grid-size--lg').remove();
    // 		$('.grid-size--md').remove();
    // 		$('.grid-size--sm').remove();
    // 	}
    // }
    // $('.ui-resizable-handle').mouseup(function () {
    // 	// WORK IF MOUSE ON(!) BTN. WAIT FOR RESIZE
    // 	updateResizeGridstack($(this));
    // });
    // // first start
    // checkDevices();
    // setTimeout(() => {
    // 	changeGridstackFromDevices();
    // }, 2000);
  },

  // Damian Refactor

  changeGridstackFromDevices() {
    // console.log('test');
    // not needed anymore.
    // setTimeout(function() {
    //   if ($('#app-wrapper').hasClass('is-desktop')) {
    //     // console.log('THIS IS DESKTOP');
    //     $('.grid-size--lg').attr('data-gs-width', '12');
    //     $('.grid-size--md').attr('data-gs-width', '10');
    //     $('.grid-size--sm').attr('data-gs-width', '8');
    //     $('.grid-size--xs').attr('data-gs-width', '6');
    //   } else if ($('#app-wrapper').hasClass('is-laptop')) {
    //     // console.log('THIS IS LAPTOP');
    //     $('.grid-size--md').attr('data-gs-width', '12');
    //     $('.grid-size--sm').attr('data-gs-width', '10');
    //     $('.grid-size--xs').attr('data-gs-width', '8');
    //   } else if ($('#app-wrapper').hasClass('is-tablet-horizontal')) {
    //     // console.log('THIS IS TABLET HOR');
    //     $('.grid-size--sm').attr('data-gs-width', '12');
    //     $('.grid-size--xs').attr('data-gs-width', '10');
    //   } else if ($('#app-wrapper').hasClass('is-tablet-vertical')) {
    //     // console.log('THIS IS TABLET VER');
    //     $('.grid-size--xs').attr('data-gs-width', '12');
    //   }
    // }, 300);
  },
  updateResizeGridstack() {
    // console.log('checkGridstackSize work');
    // console.log(target);
    // console.log(target.closest('.grid-stack-item'));
    target.closest('.grid-stack-item').removeClass('grid-size--xs');
    target.closest('.grid-stack-item').removeClass('grid-size--sm');
    target.closest('.grid-stack-item').removeClass('grid-size--md');
    target.closest('.grid-stack-item').removeClass('grid-size--lg');
    target.closest('.grid-stack-item').removeClass('grid-size--xl');

    window.requestAnimationFrame(() => {
      const width = target.closest('.grid-stack-item').attr('data-gs-width');
      if (width <= 6) {
        target.closest('.grid-stack-item').addClass('grid-size--xs'); //tablet ver - odyn pod drugik pod tretim
        // deleteGridstackItemsIfSizeBig()
      } else if (width <= 8) {
        target.closest('.grid-stack-item').addClass('grid-size--sm'); // tablet hor - odyn pod drugim
        // deleteGridstackItemsIfSizeBig()
      } else if (width <= 10) {
        target.closest('.grid-stack-item').addClass('grid-size--md'); // laptop - odyn pod drugim
        // deleteGridstackItemsIfSizeBig()
      } else if (width <= 12) {
        target.closest('.grid-stack-item').addClass('grid-size--lg'); // desktop -  dwe kolonki
        // deleteGridstackItemsIfSizeBig()
      } else if (width <= 24) {
        target.closest('.grid-stack-item').addClass('grid-size--xl');
      }

    });
  },
  deleteGridstackItemsIfSizeBig() {
    // console.log('delete grid');

    if ($('#app-wrapper').hasClass('is-laptop')) {
      $('.grid-size--lg').remove();
    } else if ($('#app-wrapper').hasClass('is-tablet-horizontal')) {
      $('.grid-size--lg').remove();
      $('.grid-size--md').remove();
    } else if ($('#app-wrapper').hasClass('is-tablet-vertical')) {
      $('.grid-size--lg').remove();
      $('.grid-size--md').remove();
      $('.grid-size--sm').remove();
    }
  },
  checkDevices() {
    const self = this;
    enquire.register('screen and (max-width:767px) ', {
      match() {
        $('#app-wrapper').addClass('is-mobile');
      },
      unmatch() {
        $('#app-wrapper').removeClass('is-mobile');
      }
    });
    enquire.register('screen and (min-width:768px) and (max-width:1023px)', {
      match() {
        $('#app-wrapper').addClass('is-tablet-vertical');
        // changeGridstackFromDevices();
      },
      unmatch() {
        $('#app-wrapper').removeClass('is-tablet-vertical');
      }
    });
    enquire.register('screen and (min-width:1024px) and (max-width:1199px)', {
      match() {
        $('#app-wrapper').addClass('is-tablet-horizontal');
        // changeGridstackFromDevices();
      },
      unmatch() {
        $('#app-wrapper').removeClass('is-tablet-horizontal');
      }
    });
    enquire.register('screen and (min-width:1200px) and (max-width:1366px)', {
      match() {
        $('#app-wrapper').addClass('is-laptop');
        // changeGridstackFromDevices();
      },
      unmatch() {
        $('#app-wrapper').removeClass('is-laptop');
      }
    });
    enquire.register('screen and (min-width:1367px)', {
      match() {
        $('.grid-stack-item').each(function() {
          const width = $(this).attr('data-gs-width');
          if (width <= 8) {
            $(this)
              .find('.card')
              .addClass('grid-size--tablet-xs');
          } else if (width <= 12) {
            $(this)
              .find('.card')
              .addClass('grid-size--tablet-sm');
          } else if (width <= 20) {
            $(this)
              .find('.card')
              .addClass('grid-size--tablet-md');
          } else if (width <= 24) {
            $(this)
              .find('.card')
              .addClass('grid-size--tablet-lg');
          }
        });
        $('#app-wrapper').addClass('is-desktop');
        self.changeGridstackFromDevices();
      },
      unmatch: function() {
        $('#app-wrapper').removeClass('is-desktop');
      }
    });
  },
  onDocReady() {
    const self = this;
    this.checkDevices();
    window.requestAnimationFrame(() => {
      self.changeGridstackFromDevices();
    });
  },
  onWindowLoad() {
    $(window).on('load', () => {
      window.requestAnimationFrame(() => {
        $('.grid-stack-item').each(function() {
          var width = $(this).attr('data-gs-width');
          if (width <= 6) {
            $(this).addClass('grid-size--xs'); //tablet ver - odyn pod drugik pod tretim
            // deleteGridstackItemsIfSizeBig()
          } else if (width <= 8) {
            $(this).addClass('grid-size--sm'); // tablet hor - odyn pod drugim
            // deleteGridstackItemsIfSizeBig()
          } else if (width <= 10) {
            $(this).addClass('grid-size--md'); // laptop - odyn pod drugim
            // deleteGridstackItemsIfSizeBig()
          } else if (width <= 12) {
            $(this).addClass('grid-size--lg'); // desktop -  dwe kolonki
            // deleteGridstackItemsIfSizeBig()
          } else if (width <= 24) {
            $(this).addClass('grid-size--xl');
          }
        });

      });
    });
  }
};
