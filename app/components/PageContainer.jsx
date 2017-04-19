var React = require('react'),
{loadPage, onAudioPlaying} = require('../components/Navigate.js'),
Sound = require('react-sound');
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
      isFirstTime: false,
      finishedPlaying: false
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
    if(this.props.PageNum === nextProps.PageNum) {
        this.setState({isFirstTime: true})
    }
    else {
        this.setState({isFirstTime: false})
    }
  },

  onAudioFinished() {
    document.querySelector('.next-button').classList.add("blinker");
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
        {!this.state.sFirstTime && <Sound
        url={audioPath}
        playStatus={this.props.audioState ? Sound.status.PAUSED : Sound.status.PLAYING}
        playFromPosition={0}
        onPlaying={({position}) => onAudioPlaying(position)}
        volume={this.props.volume}
        onFinishedPlaying={this.onAudioFinished}
        />}
      </div>
    )
  }
});

export default PageContainer;
