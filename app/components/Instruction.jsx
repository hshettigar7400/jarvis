var React = require('react');
var Shell = require('./Shell.jsx').default;
import Preloader from 'preloader.js';

var Instruction = React.createClass ({

getInitialState() {
  var uagent = navigator.userAgent.toLowerCase();
  return {
  isStartCourse: false,
  isMobile: uagent.search("mobile") > -1,
  isLoading: true,
  };
},

componentDidMount() {
  var self = this;
  var preloader = new Preloader({
    resources: [
      '../app/assets/audio/course_instruction.mp3'
      ],
    concurrency: 0
  });

  console.log('preloader: ', preloader);

  preloader.addProgressListener(function (loaded, length) {
      console.log('loading ', loaded, length, loaded / length)
  });

  preloader.addCompletionListener(function () {
    jarvisAudio.play();
    $('#html5Loader').css('display', 'none');
    self.setState({
      isLoading: false
    });
  });

  preloader.start();
},

startCourse() {
  this.setState({isStartCourse: true});
  soundManager.stopAll();
},

playInstructionAudio() {
  $('.playAudioParent').hide()
  soundManager.createSound({
    url: '../app/assets/audio/course_instruction.mp3',
    autoLoad: true,
    autoPlay: true,
    onload: function() {
    },
    volume: 100
  });
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
  if (this.state.isLoading) {
    return (
    <div className="loading">Loading&#8230;</div>
    )
  }
  return (
  <div className="instruction-container">
    {this.state.isMobile &&
    <div className="playAudioParent">
      <div className="playBlinkBlack"></div>
      <div className="playBlink" onClick={this.playInstructionAudio.bind(null, this)}>
           <a className="button-autoPlay" href="#"></a>
      </div>
    </div>
    }
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

  							<p className="btnIconBlank"><span className="icon-btn email"></span> </p>
  							<p> Email: <a href="mailTo:ACSHSMVocollectTrainingRequests@honeywell.com" className="fontStyle" role="button"><u>Training</u></a></p>
  						</div>
  					</div>
  					<div className="text">
  						<div>
  							<p className="btnIconBlank btnIcon1"><span className="icon-btn"></span></p>
  							<p>Course duration: Approximately 20 minutes</p>
  						</div>
  					</div>
  				</div>
          <div className="dis_sys_check">
            <div className="container">
                <div className="startbtn dis">
                   <p className="instruction">Select <span className="fontBold">Start</span> to proceed with the session.
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
          <div className="dis_img1"></div>
    </div>
  </div>
  )
}
}
});

export default Instruction;
