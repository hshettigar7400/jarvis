var React = require('react');
var Shell = require('./Shell.jsx').default;
var Sound = require('react-sound');

var Instruction = React.createClass ({

getInitialState() {
  return {
  isStartCourse: false
  };
},

startCourse() {
  this.setState({isStartCourse: true});
},

render() {
if (this.state.isStartCourse) {
  return (

    <div>
      <Shell />
    </div>
  )
}
else {
  return (
  <div className="instruction-container">
    <Sound
    url="../app/assets/audio/course_instruction.mp3"
    playStatus={Sound.status.PLAYING}
    playFromPosition={0 /* in milliseconds */}
    />

    <div className="cover-page">
      <div className="logo-container">
        <img src="../app/assets/images/coverPage_logo.png" />
        <div className="instruction-title">
  				<p className="title">Course instructions</p>
  			</div>
      </div>

      <div className="text-container">
  					<div className="text">
  						<div>
  							<p className="btnIcon"><span className="icon-btn"></span></p>
  							<p>Adjust your audio settings.</p>
  						</div>
  					</div>
  					<div className="text">
  						<div>

  							<p className="btnIcon"><span className="icon-btn"></span></p>
  							<p>Hide or display the Transcript at any time.</p>
  						</div>
  					</div>
  					<div className="text">
  						<div>
  							<p className="btnIcon"><span className="icon-btn"></span></p>
  							<p>Hide or display the Topics at any time.</p>
  						</div>
  					</div>
  					<div className="text">
  						<div>
  							<p className="btnIconBlank btnIcon2"><span className="icon-btn"></span></p>
  							<p>Print the course PDF from the Print section</p>
  						</div>
  					</div>
  					<div className="text">
  						<div>

  							<p className="btnIconBlank"><span className="icon-btn"></span> </p>
  							<p> Email: <a href="mailTo:ACSHSMVocollectTrainingRequests@honeywell.com" className="fontStyle" role="button"><u>Training</u></a></p>
  						</div>
  					</div>
  					<div className="text">
  						<div>
  							<p className="btnIconBlank btnIcon1"><span className="icon-btn"></span></p>
  							<p>Course duration: 10 minutes</p>
  						</div>
  					</div>
  				</div>
          <div className="dis_sys_check">
            <div className="container">
                <div className="startbtn dis">
                   <p className="instruction">Select <span className="fontBold">Start</span> to proceed with the course.
                     <a href="#" className="startbtn_a tab" role="button" onClick={this.startCourse.bind(null, this)}>
                          <span className="btnContent">
                              <span>Start</span>
                          </span>
                      </a>
                    </p>
                </div>
                <div className="sys_container">
                    <div className="sys_text">
                        <p className="warning_msg">Your device does not meet the minimum requirements for an optimal viewing experience. To continue click "Continue" button.</p>
                    </div>
                    <div className="sys_btns">
                        <a href="#" className="check_config tab" role="button">Check Configuration</a>
                        <a href="#" className="close_demo tab" role="button">Exit Demo</a>
                    </div>
                </div>
            </div>
          </div>
          <div className="invisible-container"></div>
    </div>
  </div>
  )
}
}
});

export default Instruction;
