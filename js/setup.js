'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var setupWizard = userDialog.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var fireball = userDialog.querySelector('.setup-fireball-wrap');
  var fireballHiddenInput = fireball.querySelector('input[name="fireball-color"]');
  var coatColorHiddenInput = userDialog.querySelector('input[name="coat-color"]');
  var eyesColorHiddenInput = userDialog.querySelector('input[name="eyes-color"]');

  var changeElementColor = function (element, colors, input) {
    var newColor = window.util.getRandomItem(colors);
    element.style.fill = newColor;
    input.value = newColor;
  };

  window.setup = {
    userDialog: userDialog,
    wizardCoat: wizardCoat,
    wizardEyes: wizardEyes,
    fireball: fireball,
    onClickWizardCoat: function () {
      changeElementColor(wizardCoat, window.color.COAT_COLORS, coatColorHiddenInput);
    },
    onClickWizardEyes: function () {
      changeElementColor(wizardEyes, window.color.EYES_COLORS, eyesColorHiddenInput);
    },
    onClickFireball: function () {
      var newColor = window.util.getRandomItem(window.color.FIREBALL_COLORS);
      fireball.style.backgroundColor = newColor;
      fireballHiddenInput.value = newColor;
    }
  };
})();
