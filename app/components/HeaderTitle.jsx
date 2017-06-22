var React = require('react'),
    MediaQuery = require('react-responsive'),
    TopNav = require('../components/TopNav.jsx').default;

var HeaderTitle = React.createClass ({
  propTypes: {
    onMenuClick:React.PropTypes.func
  },

  render() {
    return (
      <div>
        <div className="course-logo">
          <img src="../app/assets/images/logo-fred.png" className="logo_img" />
        </div>
        <div className="title-holder clearfix">
          <div id="courseTitle" className="course-title title">
            <p>Medical Device Industry Overview</p>
          </div>
        </div>
        <div className="courseProgress">
          <span id="courseProgressUpdate"></span>
        </div>
      </div>
    )
  }
});

export default HeaderTitle;
