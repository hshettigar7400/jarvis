var React = require('react'),
    Popout = require('react-popout').default,
    Instruction = require('./Instruction.jsx');

var Intro = React.createClass ({

getInitialState() {
  return {
  isPoppedOut: false,
  windowHeight: 1010,
  windowWidth: 650
  };
},

componentDidMount() {
  var sysInfo = new SystemDetect();
  sysInfo.init();
  var is_chrome = sysInfo.browserName === 'chrome';
  var is_safari = sysInfo.browserName === 'safari';
  var isWindows = sysInfo.deviceType === 'windows';

  if (is_chrome) {
      this.setState({winheight : 650});
  } else if (is_safari && isWindows) {
      if (parseInt($.browser.version) === 534) {
        this.setState({winheight : 591});
      } else {
        this.setState({winheight : 570});
      }
  } else if (sysInfo.browserName === 'ie' && sysInfo.browserVersion >= 9) {
      this.setState({winheight : 647});
      this.setState({winwidth : 1006});
  } else if (sysInfo.osName === 'mac' && sysInfo.browserName === 'opera') {
      this.setState({winheight : 711});
  } else {
      this.setState({winheight : 650});
  }
},

startCourse() {
  this.setState({isPoppedOut: true});
},

popoutClosed() {
  console.log("sdfsdf")
  this.setState({isPoppedOut: false});
},

render() {
  if (this.state.isPoppedOut) {
    return (
      <Popout  url ="app/framework.html" title='Honeywell' options={{width: this.state.winwidth, height: this.state.winheight}} onClosing={this.popupClosed}>
          
      </Popout>
    );
  }
  else {
    return (
      <div className="wrapper">
        <div className="launcher">
          <div className="whitePatch">
            <div className="td1">
              <img className="logo" src="../app/assets/images/Honeywell_LOGO.png" alt="Logo" />
            </div>
            <div className="td2">
              <div className="divSeparator"></div>
            </div>
            <div className="td3">
              <p className="title-text">Introduction to aerospace MRO</p>
              <a href="javascript:void(0)" onClick={this.startCourse} className="Link launch_btn">
                <span>LAUNCH</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
});

module.exports = Intro;
