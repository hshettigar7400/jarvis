var React = require('react');
var Page1 = require('../components/content/m01/t01/Page1.jsx');

var PageContainer = React.createClass ({
render() {
  return (
    <div>
    <div className="page-title__container">
      <span className="topic-title">
        Introduction
      </span>
      <span className="title-seperator acc-prop-background">|</span>
      <span className="page-title">Welcome</span>
    </div>
      <Page1 />
    </div>
  )
}
});

module.exports = PageContainer;
