'use strict';

var NUMBER_OF_WIZARD = 4;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var similarSetup = userDialog.querySelector('.setup-similar');

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

similarListElement.appendChild(createTableOfWizards(createArrayOfWizards(NUMBER_OF_WIZARD)));
showElementDOM(userDialog);
showElementDOM(similarSetup);
