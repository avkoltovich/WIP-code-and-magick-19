'use strict';

(function () {
  var NUMBER_OF_WIZARD = 4;
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var generateRandomWizard = function () {
    var wizard = {};

    wizard.name = window.util.getRandomItem(NAMES) + ' ' + window.util.getRandomItem(SURNAMES);
    wizard.coatColor = window.util.getRandomItem(window.color.COAT_COLORS);
    wizard.eyesColor = window.util.getRandomItem(window.color.EYES_COLORS);

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

  similarListElement.appendChild(createTableOfWizards(createArrayOfWizards(NUMBER_OF_WIZARD)));
})();
