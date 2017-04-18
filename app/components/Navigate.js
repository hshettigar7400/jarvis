var $ = require("jquery");

function loadPage(pageNumber) {
  $(".page-loader").load('components/content/m01/t01/m01_t01_p0'+(pageNumber)+'.html');
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
