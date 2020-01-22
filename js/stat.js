'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var GAP = 10;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_MARGIN = 50;
var TEXT_HEADING_Y = 40;
var TEXT_HEADING_X = 30;
var TEXT_HEADING_GAP = 20;
var TEXT_HEADING_FIRST_LINE = 'Ура, вы победили!';
var TEXT_HEADING_SECOND_LINE = 'Список результатов:';
var TEXT_HEIGHT = 10;
var TEXT_FONT = '16px PT Mono';
var TEXT_COLOR = '#000';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, text, x, y, font, color) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(text, x, y);
};

var renderBar = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomInteger = function () {
  return Math.floor(Math.random() * 100);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderText(ctx, TEXT_HEADING_FIRST_LINE, CLOUD_X + TEXT_HEADING_X, TEXT_HEADING_Y, TEXT_FONT, TEXT_COLOR);
  renderText(ctx, TEXT_HEADING_SECOND_LINE, CLOUD_X + TEXT_HEADING_X, TEXT_HEADING_Y + TEXT_HEADING_GAP, TEXT_FONT, TEXT_COLOR);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var playerX = CLOUD_X + BAR_MARGIN + (BAR_MARGIN + BAR_WIDTH) * i;
    var playerBarHeight = (BAR_HEIGHT * times[i]) / maxTime;
    var playerBarColor = 'hsl(240, ' + getRandomInteger() + '%, 50%)';
    var playerBarY = BAR_HEIGHT - playerBarHeight + TEXT_HEIGHT + TEXT_HEADING_Y + TEXT_HEADING_GAP * 2 + CLOUD_Y;
    var playerTimeData = Math.floor(times[i]);
    var playerTimeY = playerBarY - TEXT_HEIGHT;
    var playerNameY = CLOUD_HEIGHT - TEXT_HEIGHT + CLOUD_Y;

    if (players[i] === 'Вы') {
      playerBarColor = 'rgba(255, 0, 0, 1)';
    }

    renderText(ctx, playerTimeData, playerX, playerTimeY, TEXT_FONT, TEXT_COLOR);
    renderText(ctx, players[i], playerX, playerNameY, TEXT_FONT, TEXT_COLOR);
    renderBar(ctx, playerX, playerBarY, BAR_WIDTH, playerBarHeight, playerBarColor);
  }
};
