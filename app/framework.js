var React = require('react'),
  ReactDOM = require('react-dom'),
  Instruction = require('./components/Instruction.jsx').default;
import SCSS from './assets/stylesheet/app.scss';
//import * as scormAdaptor from "./assets/scripts/scorm_adaptor";

const appData = {
  title: 'Jarvis'
}

window.appType = 'scorm';

if(window.appType != 'standalone') {
	scormAdaptor_getAPI();
	//window.pageStatusList = [0,0,0,0,0,0,0,0];
	console.log('suspend_data: ', window.scormAdaptor_getsuspenddata());
	console.log('lesson location: ', window.scormAdaptor_getlocation());
	if(window.scormAdaptor_getsuspenddata() == '' || window.scormAdaptor_getsuspenddata() == undefined) {
	  window.pageStatusList = [0,0,0,0,0,0,0,0];
	} else {
	  window.pageStatusList = window.scormAdaptor_getsuspenddata().split(',').map(Number);
	}

	if(window.scormAdaptor_getlocation() == '' || window.scormAdaptor_getlocation() == undefined) {
	  window.currentPageNum = 1;
	} else {
	  window.currentPageNum = window.scormAdaptor_getlocation();
	}
}


window.updatePageStatusList = function(pageNum) {
	pageStatusList[pageNum-1] = 1;
  if (document.getElementById('courseProgressUpdate'))
	 document.getElementById('courseProgressUpdate').style.width = getCourseProgress();

  window.scormAdaptor_setsuspenddata(window.pageStatusList);
  
  window.scormAdaptor_setlocation(pageNum.toString());
  
  window.scormAdaptor_commit();
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
