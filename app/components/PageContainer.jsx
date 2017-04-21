var React = require('react'),
{loadPage, millisToMinutesAndSeconds} = require('../components/Navigate.js'),
Sound = require('react-sound');
var $ = require("jquery");
var playAudioInterval;
var checkAudioPositionInterval;

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
    loadPage(this.props.PageNum)
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

  shouldComponentUpdate: function(nextProps, nextState) {
    if(this.props.PageNum !== nextProps.PageNum || this.props.volume !== nextProps.volume || this.props.audioState !== nextProps.audioState)
      return true;
    else
      return false;
  },

  onAudioFinished() {
    document.querySelector('.next-button').classList.add("blinker");
    document.querySelector('#button-audio').classList.add("disabled");
    document.querySelector('#button-playPause').classList.add("disabled");
  },

  changeFontSize() {
    document.querySelector('.text-1-large').style.fontSize = '1em';
  },

  stopSound () {
    this.setState({stopAudio: true});
    startAudioPlay = false;
    playAudioInterval = setInterval(this.checkAudioToPlay, 1);
  },

  checkAudioToPlay () {
    if (startAudioPlay) {
      this.setState({stopAudio: false});
      clearInterval(playAudioInterval)
    }
  },

  onAudioPlaying(position) {
    //console.log(position);
    if(document.querySelector('.transcript-text-container')) {
      document.querySelector('.transcript-text-container').innerHTML = transcript;
    }
    if (qPoints !== null) {
      var t = millisToMinutesAndSeconds(position);
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
        <div className="page-title__container">
          <span className="topic-title">
            Introduction
          </span>
          <span className="title-seperator acc-prop-background">|</span>
          <span className="page-title">Welcome</span>
        </div>
        <div ref="pageLoader" className="page-loader">
        </div>
        <Sound
        url={audioPath}
        playStatus={(this.props.audioState || this.state.stopAudio) ? Sound.status.PAUSED : Sound.status.PLAYING}
        playFromPosition={this.state.currentAudioPosition}
        onPlaying={({position}) => this.onAudioPlaying(position)}
        volume={this.props.volume}
        onFinishedPlaying={this.onAudioFinished}
        />
      </div>
    )
  }
});

export default PageContainer;
