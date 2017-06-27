var React = require('react'),
  ReactDOM = require('react-dom'),
  Instruction = require('./components/Instruction.jsx').default;
import SCSS from './assets/stylesheet/app.scss';

const appData = {
  title: 'Jarvis'
}

window.pageStatusList = [0,0,0,0,0,0,0,0];

window.updatePageStatusList = function(pageNum) {
	pageStatusList[pageNum-1] = 1;
  if (document.getElementById('courseProgressUpdate'))
	 document.getElementById('courseProgressUpdate').style.width = getCourseProgress();
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
