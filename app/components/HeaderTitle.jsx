var React = require('react'),
    MediaQuery = require('react-responsive'),
    TopNav = require('../components/TopNav.jsx').default;

var HeaderTitle = React.createClass ({
  propTypes: {
    onMenuClick:React.PropTypes.func
  },

  getInitialState: function() {
    return {
      exitPopupVisible: false
    };

  },
  exitCourse: function(_val)
  {
    if(_val == true)
    {
        setTimeout(function(){window.close();parent.window.close();this.window.opener.close();}, 300);
    }
    else if(_val == false)
    {
      this.setState({exitPopupVisible: false});
    }
  },

showExitPopup() {
  return(
  <div>
  <div className="overlay"></div>
  <section className="exit-alert">
  <div className="popup-header">
    Exit
  </div>
  <div className="popup-area">
    <div className="popup-content">
      <p className="warning-msg">
        <span className="warning-sign"></span>
        Are you sure you wish to exit the module?
      </p>
    </div>
    <div className="popup-buttons">
      <div>
        <a href="#" id="popup-yes-button" onClick={this.exitCourse.bind(this,true)} className="course-button box-shadow popup-yes-button tabindextabindex">Yes</a>
      </div>
      <div>
        <a href="#" id="popup-no-button" onClick={this.exitCourse.bind(this,false)} className="course-button box-shadow popup-yes-button tabindextabindex">No</a>
      </div>
    </div>
  </div>
  </section>
</div>
  )
},

enablePopupVisible()
{
  this.setState({exitPopupVisible: true});
},

  render() {
    return (
      <div>
        <div className="course-logo">
          <img src="../app/assets/images/logo.png" className="logo_img" />
        </div>
        <div className="title-holder clearfix">
          <div id="courseTitle" className="course-title title">
            <p>Medical Device Industry Overview</p>
          </div>

        </div>
        <a href="../app/assets/resource/medical_devices_industry_overview.pdf" target="_blank" className="icon-print print_btn"></a>
        <a href="#" className="icon-close close_btn" onClick={this.enablePopupVisible}></a>
        <div className="courseProgress">
          <span id="courseProgressUpdate"></span>
        </div>
          {this.state.exitPopupVisible && this.showExitPopup()}
      </div>

    )
  }
});

export default HeaderTitle;
