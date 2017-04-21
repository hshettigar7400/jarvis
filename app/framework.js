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
	document.getElementById('courseProgressUpdate').style.width = getCourseProgress();
}

window.getCourseProgress = function() {
	let cnt = 0;
	for(var i = 0; i < pageStatusList.length; i++) {
		if(pageStatusList[i] == 1) cnt++
	}

	return (cnt/pageStatusList.length) * 100 + '%';
}

ReactDOM.render(
  <Instruction data={appData} />, document.getElementById('root')
);
