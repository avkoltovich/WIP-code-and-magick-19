'use strict';

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var similarSetup = userDialog.querySelector('.setup-similar');
var NUMBER_OF_WIZARD = 4;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var generateRandomWizard = function (names, surnames, coats, eyes) {
  var wizard = {};

  wizard.name = getRandomItem(names) + ' ' + getRandomItem(surnames);
  wizard.coatColor = getRandomItem(coats);
  wizard.eyesColor = getRandomItem(eyes);

  return wizard;
};

var createWizardElement = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var createArrayOfWizards = function (names, surnames, coats, eyes, number) {
  var wizards = [];

  for (var i = 0; i < number; i++) {
    wizards.push(generateRandomWizard(names, surnames, coats, eyes));
  }

  return wizards;
};

var createTableOfWizards = function (wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(createWizardElement(wizards[i]));
  }

  similarListElement.appendChild(fragment);
  userDialog.classList.remove('hidden');
  similarSetup.classList.remove('hidden');
};

createTableOfWizards(createArrayOfWizards(NAMES, SURNAMES, COAT_COLORS, EYES_COLORS, NUMBER_OF_WIZARD));
