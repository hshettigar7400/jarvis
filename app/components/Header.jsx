var React = require('react');

var Header = React.createClass ({
render() {
  return (
    <div>
      <div className="course-logo">
        <img src="../app/assets/images/logo-fred.png" />
      </div>
      <div className="title-holder clearfix">
        <div id="courseTitle" className="course-title title">
          <p>Introduction to aerospace MRO</p>
        </div>
      </div>
      <div className="courseProgress">
        <span></span>
      </div>
    </div>
  )
}
});

module.exports = Header;
