
var $ = require("jquery");
var currentCuePointId = 0;
var topicNamesArray = [
  'Welcome',
  'Course objectives',
  'Medical devices move to the home',
  'Growth in portable- and home-use medical devices',
  'Internet of things—connected medical equipment',
  'Target/focus medical applications',
  'Medical applications for Honeywell sensors—Activity',
  'Course summary',
  'Welcome to the quiz'
];

function loadPage(pageNumber) {

  if(pageNumber > 1) {
    if (document.querySelector('.back-button'))
      document.querySelector('.back-button').classList.remove("disabled");
  }

  //alert(pageNumber);
  $(".page-number").html(getDoubleDigit(pageNumber));
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

  var isMobile = window.matchMedia("only screen and (max-width: 760px)");
  var uagentMobile = navigator.userAgent.indexOf('Mobile');
  var isIpad =  navigator.userAgent.indexOf('iPad');
  //console.log(navigator);
  //alert(uagentMobile+' ::: '+isIpad);
  //alert(isMobile.matches+' || ('+uagentMobile+' !== -1 && '+isIpad+' === -1)')
  if(isMobile.matches || (uagentMobile !== -1 && isIpad === -1)) {
    //console.log(pageNumber, ':::', typeof pageNumber);
    setTimeout(function () {
      $('.page').css('height', '100vh');
      if(pageNumber == 9) {
        $('#player').css('height', '100vh');
      }
      //alert('coming 1')
    }, 500);
  } else {
    setTimeout(function () {
      $('.page').css('height', '100%');
    }, 500);
  }

}

function loadSound(filePath) {

}

function loadTranscript() {

}

function loadMenu() {

}
function getDoubleDigit (num) {

  if(num > 9) {
      return num;
  } else {
    return ("0"+num);
   }
}

module.exports = {
  loadPage,
  loadSound,
  loadTranscript,
  topicNamesArray
}
