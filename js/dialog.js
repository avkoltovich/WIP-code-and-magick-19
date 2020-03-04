'use strict';

(function () {
  var setupOpenButton = document.querySelector('.setup-open');
  var setupCloseButton = window.setup.userDialog.querySelector('.setup-close');
  var setupUserName = window.setup.userDialog.querySelector('.setup-user-name');
  var dialogHandler = window.setup.userDialog.querySelector('.upload');
  var defaultDialogCoords = {
    y: window.setup.userDialog.style.top,
    x: window.setup.userDialog.style.left
  };

  var onClickOpenButton = function () {
    window.util.showElementDOM(window.setup.userDialog);
    setupOpenButton.removeEventListener('click', onClickOpenButton);
    setupCloseButton.addEventListener('click', onClickCloseButton);
    document.addEventListener('keydown', onPopupEscPress);
    setupOpenButton.removeEventListener('keydown', onOpenButtonEnterPress);
    setupCloseButton.addEventListener('keydown', onCloseButtonEnterPress);
    setupUserName.addEventListener('focusin', onUserNameFocus);
    setupUserName.addEventListener('focusout', onUserNameBlur);
    window.setup.wizardCoat.addEventListener('click', window.setup.onClickWizardCoat);
    window.setup.wizardEyes.addEventListener('click', window.setup.onClickWizardEyes);
    window.setup.fireball.addEventListener('click', window.setup.onClickFireball);
    dialogHandler.addEventListener('mousedown', onDialogMove);
  };

  var onClickCloseButton = function () {
    window.util.hideElementDOM(window.setup.userDialog);
    setupCloseButton.removeEventListener('click', onClickCloseButton);
    document.removeEventListener('keydown', onPopupEscPress);
    setupCloseButton.removeEventListener('keydown', onCloseButtonEnterPress);
    setupUserName.removeEventListener('focusin', onUserNameFocus);
    setupUserName.removeEventListener('focusout', onUserNameBlur);
    setupOpenButton.addEventListener('keydown', onOpenButtonEnterPress);
    setupOpenButton.addEventListener('click', onClickOpenButton);
    window.setup.wizardCoat.removeEventListener('click', window.setup.onClickWizardCoat);
    window.setup.wizardEyes.removeEventListener('click', window.setup.onClickWizardEyes);
    window.setup.fireball.removeEventListener('click', window.setup.onClickFireball);
    dialogHandler.removeEventListener('mousedown', onDialogMove);
    window.setup.userDialog.style.top = defaultDialogCoords.y;
    window.setup.userDialog.style.left = defaultDialogCoords.x;
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

  var onDialogMove = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.setup.userDialog.style.top = (window.setup.userDialog.offsetTop - shift.y) + 'px';
      window.setup.userDialog.style.left = (window.setup.userDialog.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    dialogHandler.addEventListener('mousedown', onDialogMove);
  };
})();
