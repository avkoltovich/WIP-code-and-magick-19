'use strict';

var userDialog = document.querySelector('.setup');
var similarSetup = userDialog.querySelector('.setup-similar');
var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = userDialog.querySelector('.setup-close');
var setupUserName = userDialog.querySelector('.setup-user-name');
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

var onClickWizardCoat = function () {
  changeElementColor(wizardCoat, window.color.COAT_COLORS, coatColorHiddenInput);
};

var onClickWizardEyes = function () {
  changeElementColor(wizardEyes, window.color.EYES_COLORS, eyesColorHiddenInput);
};

var onClickFireball = function () {
  var newColor = window.util.getRandomItem(window.color.FIREBALL_COLORS);
  fireball.style.backgroundColor = newColor;
  fireballHiddenInput.value = newColor;
};

var onClickOpenButton = function () {
  window.util.showElementDOM(userDialog);
  setupOpenButton.removeEventListener('click', onClickOpenButton);
  setupCloseButton.addEventListener('click', onClickCloseButton);
  document.addEventListener('keydown', onPopupEscPress);
  setupOpenButton.removeEventListener('keydown', onOpenButtonEnterPress);
  setupCloseButton.addEventListener('keydown', onCloseButtonEnterPress);
  setupUserName.addEventListener('focusin', onUserNameFocus);
  setupUserName.addEventListener('focusout', onUserNameBlur);
  wizardCoat.addEventListener('click', onClickWizardCoat);
  wizardEyes.addEventListener('click', onClickWizardEyes);
  fireball.addEventListener('click', onClickFireball);
};

var onClickCloseButton = function () {
  window.util.hideElementDOM(userDialog);
  setupCloseButton.removeEventListener('click', onClickCloseButton);
  document.removeEventListener('keydown', onPopupEscPress);
  setupCloseButton.removeEventListener('keydown', onCloseButtonEnterPress);
  setupUserName.removeEventListener('focusin', onUserNameFocus);
  setupUserName.removeEventListener('focusout', onUserNameBlur);
  setupOpenButton.addEventListener('keydown', onOpenButtonEnterPress);
  setupOpenButton.addEventListener('click', onClickOpenButton);
  wizardCoat.removeEventListener('click', onClickWizardCoat);
  wizardEyes.removeEventListener('click', onClickWizardEyes);
  fireball.removeEventListener('click', onClickFireball);
};

var onPopupEscPress = function (evt) {
  if (evt.key === window.util.ESC_KEY) {
    onClickCloseButton();
  }
};

var onOpenButtonEnterPress = function (evt) {
  if (evt.key === window.util.ENTER_KEY) {
    onClickOpenButton();
  }
};

var onCloseButtonEnterPress = function (evt) {
  if (evt.key === window.util.ENTER_KEY) {
    onClickCloseButton();
  }
};

var onUserNameFocus = function () {
  document.removeEventListener('keydown', onPopupEscPress);
};

var onUserNameBlur = function () {
  document.addEventListener('keydown', onPopupEscPress);
};

setupOpenButton.addEventListener('click', onClickOpenButton);
setupOpenButton.addEventListener('keydown', onOpenButtonEnterPress);

window.util.showElementDOM(similarSetup);
