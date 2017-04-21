var React = require('react'),
{loadPage, millisToMinutesAndSeconds} = require('../components/Navigate.js'),
Sound = require('react-sound'),
ReactInterval = require("react-interval");

var $ = require("jquery");

var PageContainer = React.createClass ({
  propTypes: {
    PageNum: React.PropTypes.number,
    audioState: React.PropTypes.bool,
    replayState: React.PropTypes.bool,
    volume: React.PropTypes.number
  },

  getInitialState() {
    return {
      finishedPlaying: false,
      stopAudio: false,
      currentAudioPosition: 0
    }
  },

  componentDidMount() {
    loadPage(this.props.PageNum);
  },

  componentDidUpdate(prevProps, prevState) {
    if((this.props.PageNum !== prevProps.PageNum)) {
      loadPage(this.props.PageNum)
    }
  },

  componentWillReceiveProps(nextProps) {
    if(this.props.PageNum !== nextProps.PageNum) {
        this.setState({stopAudio: false});
    }
  },

  showTab1(){
    console.log("sadfsdfsd")
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    if(this.props.PageNum !== nextProps.PageNum || this.props.volume !== nextProps.volume || this.props.audioState !== nextProps.audioState || this.state.stopAudio !== nextState.stopAudio)
      return true;
    else
      return false;
  },

  onAudioFinished() {
    document.querySelector('.next-button').classList.add("blinker");
    document.querySelector('#button-audio').classList.add("disabled");
    document.querySelector('#button-playPause').classList.add("disabled");
  },

  stopSound () {
    this.setState({stopAudio: true});
  },

  onAudioPlaying(ev) {
    if(document.querySelector('.transcript-text-container')) {
      document.querySelector('.transcript-text-container').innerHTML = transcript;
    }
    if (qPoints !== null) {
      var t = millisToMinutesAndSeconds(ev.position);
      if (t == qPoints[currentCuePointId]) {
        if (imageSwap &&  document.querySelector('.sync'+(currentCuePointId))){
          document.querySelector('.sync'+(currentCuePointId)).classList.add('hide');
          document.querySelector('.sync'+(currentCuePointId + 1)).classList.remove('hide');
        }
        if (document.querySelector('.sync'+(currentCuePointId+1))) {
          document.querySelector('.sync'+(currentCuePointId+1)).classList.remove('fadeOut');
          document.querySelector('.sync'+(currentCuePointId+1)).classList.add('fadeIn');
        }
        if(qPointsExecution && qPointsExecution[currentCuePointId])
        {
          eval(qPointsExecution[currentCuePointId]);
        }
        currentCuePointId++;
      }
    }
  },


  render() {
    let audioPath = "../app/assets/audio/m01_t01_p0"+this.props.PageNum+".mp3";
    return (
      <div className="page-holder">
        <Sound
        url={audioPath}
        playStatus={(this.props.audioState || this.state.stopAudio) ? Sound.status.PAUSED : Sound.status.PLAYING}
        playFromPosition={this.state.currentAudioPosition}
        onPlaying={this.onAudioPlaying}
        volume={this.props.volume}
        onFinishedPlaying={this.onAudioFinished}
        />
        <div className="page-title__container">
          <span className="topic-title">
            Introduction
          </span>
          <span className="title-seperator acc-prop-background">|</span>
          <span className="page-title">Welcome</span>
        </div>
        <div ref="pageLoader" className="page-loader">
        </div>

      </div>
    )
  }
});

export default PageContainer;
