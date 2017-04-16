var React = require('react'),
    MediaQuery = require('react-responsive'),
    TopNav = require('../components/TopNav.jsx');

var HeaderTitle = React.createClass ({
  propTypes: {
    onMenuClick:React.PropTypes.func
  },

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

module.exports = HeaderTitle;
