// Used to track the enabling of hover effects

// For future preloader
import _ from 'lodash';

const classList = ['.app-content', '[data-scrollable]'];

for (var i = 0; i < classList.length; i++) {
  $(classList[i]).scroll(
    _.debounce(
      function() {
        addHoverClass();
      },
      350,
      { leading: true, trailing: false },
    ),
  );

  $(classList[i]).scroll(
    _.debounce(function() {
      removeHoverClass();
    }, 420),
  );
}

function removeHoverClass() {
  document.body.classList.remove('is-curently-scrolling');
}

function addHoverClass() {
  document.body.classList.add('is-curently-scrolling');
}
