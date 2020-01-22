'use strict';

var WINDOW_WIDTH = 700;
var SKY_HEIGHT = 300;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var GAP = 20;
var HEADING_HEIGHT = 40;
var HEADING_TEXT_FIRST_LINE = 'Ура вы победили!';
var HEADING_TEXT_SECOND_LINE = 'Список результатов:';
var TEXT_HEIGHT = 10;
var cloudX = (WINDOW_WIDTH - CLOUD_WIDTH) / 2;
var cloudY = (SKY_HEIGHT - CLOUD_HEIGHT) / 2;
var barHeight = CLOUD_HEIGHT - 2 * GAP - 2 * TEXT_HEIGHT - HEADING_HEIGHT * 2;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
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

var getAlignText = function (ctx, width, text) {
  return (width - ctx.measureText(text).width) / 2;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, cloudX + GAP, cloudY + GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, cloudX, cloudY, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText(HEADING_TEXT_FIRST_LINE, cloudX + getAlignText(ctx, CLOUD_WIDTH, HEADING_TEXT_FIRST_LINE), HEADING_HEIGHT);
  ctx.fillText(HEADING_TEXT_SECOND_LINE, cloudX + getAlignText(ctx, CLOUD_WIDTH, HEADING_TEXT_SECOND_LINE), HEADING_HEIGHT + HEADING_HEIGHT / 2);

  var maxTime = getMaxElement(times);
  var barWidth = (CLOUD_WIDTH - GAP) / players.length - GAP;

  for (var i = 0; i < players.length; i++) {
    var actualBarHeight = (barHeight * times[i]) / maxTime;
    var playerTime = Math.floor(times[i]);
    var marginTopBar = barHeight - actualBarHeight + GAP + TEXT_HEIGHT + 2 * HEADING_HEIGHT + cloudY;

    ctx.fillText(playerTime, cloudX + GAP + getAlignText(ctx, barWidth, playerTime) + (GAP + barWidth) * i, marginTopBar - TEXT_HEIGHT);
    ctx.fillText(players[i], cloudX + GAP + getAlignText(ctx, barWidth, players[i]) + (GAP + barWidth) * i, CLOUD_HEIGHT - TEXT_HEIGHT + cloudY);
    ctx.fillRect(cloudX + GAP + (GAP + barWidth) * i, marginTopBar, barWidth, actualBarHeight);
  }
};
