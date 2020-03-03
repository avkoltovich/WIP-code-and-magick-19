'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  window.util = {
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    getRandomItem: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    showElementDOM: function (element) {
      element.classList.remove('hidden');
    },
    hideElementDOM: function (element) {
      element.classList.add('hidden');
    }
  };
})();
