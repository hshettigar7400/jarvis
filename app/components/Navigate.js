var $ = require("jquery");
var topicNamesArray = [
  'Welcome', 
  'Course objectives', 
  'Increase in home therapy options', 
  'Small and portable medical devices',
  'Internet of things—connected medical equipment',
  'Medical appications for Honeywell sensors - Activity',
  'Course Summary',
  'Quiz Introduction'
];
function loadPage(pageNumber) {
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

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  var s = ((minutes * 60) + parseInt(seconds));
  return s;
}

module.exports = {
  loadPage,
  loadSound,
  loadTranscript,
  millisToMinutesAndSeconds
}
