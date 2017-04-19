var $ = require("jquery");

function loadPage(pageNumber) {
  document.querySelector('.next-button').classList.remove("blinker");
  $(".page-loader").empty();
  $(".page-loader").load('components/content/m01/t01/m01_t01_p0'+(pageNumber)+'.html');
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
  return seconds;
}

function onAudioPlaying(position) {
  if(document.querySelector('.transcript-text-container')) {
    document.querySelector('.transcript-text-container').innerHTML = transcript;
  }
  if(qPoints == null) return;
  var t = millisToMinutesAndSeconds(position);
  if(t == qPoints[currentCuePointId]) {
    document.querySelector('.sync'+(currentCuePointId+1)).classList.remove('fadeOut');
    document.querySelector('.sync'+(currentCuePointId+1)).classList.add('fadeIn');
    currentCuePointId++;
  }
}

module.exports = {
  loadPage,
  loadSound,
  loadTranscript,
  onAudioPlaying
}
