
var $ = require("jquery");
var currentCuePointId = 0;
var topicNamesArray = [
  'Welcome',
  'Course Objectives',
  'Medical Devices Move to the Home',
  'Growth in Portable-and Home-Use Medical Devices',
  'Internet of Things-Connected Medical Equipment',
  'Target/focus Medical Applications',
  'Medical Appications for Honeywell Sensors-Activity',
  'Course Summary',
  'Quiz Introduction'
];

function loadPage(pageNumber) {
  if(pageNumber > 1) {
    if (document.querySelector('.back-button'))
      document.querySelector('.back-button').classList.remove("disabled");
  }
  $(".page-number").html(pageNumber);
  if (document.querySelector('.next-button'))
    document.querySelector('.next-button').classList.remove("blinker");
  if (document.querySelector('#button-audio')) {
    document.querySelector('#button-audio').classList.remove("disabled");
  }
  if (document.querySelector('#button-playPause'))
    document.querySelector('#button-playPause').classList.remove("disabled");
  $(".page-loader").empty();
  $(".page-loader").load('components/content/m01/t01/m01_t01_p0'+(pageNumber)+'.html');
  window.updatePageStatusList(pageNumber);
  $(".page-title").html(topicNamesArray[pageNumber-1]);
  $("#button-playPause").removeClass("disabled");
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
  loadTranscript,
  topicNamesArray
}
