var $ = require("jquery");
var currentCuePointId = 0;
var topicNamesArray = [
  'Welcome',
  'Course objectives',
  'Medical devices move to the home',
  'Growth in portable- and home-use medical devices',
  'Internet of things—connected medical equipment',
  'Target/focus medical applications',
  'Medical appications for Honeywell sensors - Activity',
  'Course Summary',
  'Quiz Introduction'
];

function loadPage(pageNumber) {
  $(".page-number").html(pageNumber);
  if (document.querySelector('.next-button'))
    document.querySelector('.next-button').classList.remove("blinker");
  if (document.querySelector('#button-audio'))
    document.querySelector('#button-audio').classList.remove("disabled");
  if (document.querySelector('#button-playPause'))
    document.querySelector('#button-playPause').classList.remove("disabled");
  $(".page-loader").empty();
  $(".page-loader").load('components/content/m01/t01/m01_t01_p0'+(pageNumber)+'.html');
  window.updatePageStatusList(pageNumber);
  $(".page-title").html(topicNamesArray[pageNumber-1]);
}

function loadSound(filePath) {

}

function loadTranscript() {

}

function loadMenu() {

}


module.exports = {
  loadPage,
  loadSound,
  loadTranscript
}
