'use strict';

var NUMBER_OF_WIZARD = 4;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var similarSetup = userDialog.querySelector('.setup-similar');
var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = userDialog.querySelector('.setup-close');
var setupUserName = userDialog.querySelector('.setup-user-name');
var setupWizard = userDialog.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var fireball = userDialog.querySelector('.setup-fireball-wrap');
var fireballHiddenInput = fireball.querySelector('input');

var getRandomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var generateRandomWizard = function () {
  var wizard = {};

  wizard.name = getRandomItem(NAMES) + ' ' + getRandomItem(SURNAMES);
  wizard.coatColor = getRandomItem(COAT_COLORS);
  wizard.eyesColor = getRandomItem(EYES_COLORS);

  return wizard;
};

var renderWizardElement = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var createArrayOfWizards = function (number) {
  var wizards = [];

  for (var i = 0; i < number; i++) {
    wizards.push(generateRandomWizard());
  }

  return wizards;
};

var createTableOfWizards = function (wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizardElement(wizards[i]));
  }

  return fragment;
};

var showElementDOM = function (element) {
  element.classList.remove('hidden');
};

var hideElementDOM = function (element) {
  element.classList.add('hidden');
};

var changeElementColor = function (element, colors) {
  element.style.fill = getRandomItem(colors);
};

var onClickWizardCoat = function () {
  changeElementColor(wizardCoat, COAT_COLORS);
};

var onClickWizardEyes = function () {
  changeElementColor(wizardEyes, EYES_COLORS);
};

var onClickFireball = function () {
  var newColor = getRandomItem(FIREBALL_COLORS);
  fireball.style.backgroundColor = newColor;
  fireballHiddenInput.value = newColor;
};

var onClickOpenButton = function () {
  showElementDOM(userDialog);
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
  hideElementDOM(userDialog);
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
  if (evt.key === ESC_KEY) {
    onClickCloseButton();
  }
};

var onOpenButtonEnterPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    onClickOpenButton();
  }
};

var onCloseButtonEnterPress = function (evt) {
  if (evt.key === ENTER_KEY) {
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


similarListElement.appendChild(createTableOfWizards(createArrayOfWizards(NUMBER_OF_WIZARD)));
showElementDOM(similarSetup);
