var React = require('react'),
  ReactDOM = require('react-dom'),
  Instruction = require('./components/Instruction.jsx');
import SCSS from './assets/stylesheet/app.scss';

const appData = {
  title: 'Jarvis'
}

ReactDOM.render(
  <Instruction data={appData} />, document.getElementById('root')
);
