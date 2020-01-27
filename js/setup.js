'use strict';

var HIDDEN_CLASS = 'hidden';
var USER_DIALOG = document.querySelector('.setup');
var SIMILAR_LIST_ELEMENT = USER_DIALOG.querySelector('.setup-similar-list');
var SIMILAR_WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var SIMILAR_SETUP = USER_DIALOG.querySelector('.setup-similar');
var SIMILAR_LABEL = '.setup-similar-label';
var WIZARD_COAT = '.wizard-coat';
var WIZARD_EYES = '.wizard-eyes';
var NUMBER_OF_WIZARD = 4;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomWizard = function (names, surnames, coat, eyes) {
  var object = {};
  object.name = getRandomItem(names) + ' ' + getRandomItem(surnames);
  object.coatColor = getRandomItem(coat);
  object.eyesColor = getRandomItem(eyes);
  return object;
};

var renderWizard = function (wizard) {
  var wizardElement = SIMILAR_WIZARD_TEMPLATE.cloneNode(true);

  wizardElement.querySelector(SIMILAR_LABEL).textContent = wizard.name;
  wizardElement.querySelector(WIZARD_COAT).style.fill = wizard.coatColor;
  wizardElement.querySelector(WIZARD_EYES).style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderSimilarWizardTable = function () {
  var wizards = [];

  for (var i = 0; i < NUMBER_OF_WIZARD; i++) {
    wizards.push(getRandomWizard(NAMES, SURNAMES, COAT_COLORS, EYES_COLORS));
  }

  var fragment = document.createDocumentFragment();

  for (i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  SIMILAR_LIST_ELEMENT.appendChild(fragment);
  USER_DIALOG.classList.remove(HIDDEN_CLASS);
  SIMILAR_SETUP.classList.remove(HIDDEN_CLASS);
};

renderSimilarWizardTable();
