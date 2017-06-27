var React = require('react'),
  ReactDOM = require('react-dom'),
  Instruction = require('./components/Instruction.jsx').default;
import SCSS from './assets/stylesheet/app.scss';
import * as scormAdaptor from "./assets/scripts/scorm_adaptor";

const appData = {
  title: 'Jarvis'
}

window.appType = 'standalone';
if(scormAdaptor.scormAdaptor_getsuspenddata() == '' || scormAdaptor.scormAdaptor_getsuspenddata() == undefined) {
  window.pageStatusList = [0,0,0,0,0,0,0,0];
} else {
  window.pageStatusList = scormAdaptor.scormAdaptor_getsuspenddata().split(',').map(Number);
}

if(scormAdaptor.scormAdaptor_getlocation() == '' || scormAdaptor.scormAdaptor_getlocation() == undefined) {
  window.currentPageNum = 1;
} else {
  window.currentPageNum = scormAdaptor.scormAdaptor_getlocation();
}

window.updatePageStatusList = function(pageNum) {
	pageStatusList[pageNum-1] = 1;
  if (document.getElementById('courseProgressUpdate'))
	 document.getElementById('courseProgressUpdate').style.width = getCourseProgress();

  scormAdaptor.scormAdaptor_setsuspenddata(window.pageStatusList);
  scormAdaptor.scormAdaptor_setlocation(pageNum);
}

window.getCourseProgress = function() {
	let cnt = 0;
	for(var i = 0; i < pageStatusList.length; i++) {
		if(pageStatusList[i] == 1) cnt++
	}

	return (cnt/pageStatusList.length) * 100 + '%';
}

window.reloadFromStart = function () {
	if (document.querySelector('.next-button'))
    document.querySelector('.next-button').classList.remove("blinker");
  if (document.querySelector('#button-audio'))
    document.querySelector('#button-audio').classList.remove("disabled");
  if (document.querySelector('#button-playPause'))
    document.querySelector('#button-playPause').classList.remove("disabled");
  $(".page-loader").empty();
  $(".page-loader").load('components/content/m01/t01/m01_t01_p01.html');
  window.updatePageStatusList(1);
}

ReactDOM.render(
  <Instruction data={appData} />, document.getElementById('root')
);
