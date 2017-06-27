var React = require('react'),
{loadPage} = require('../components/Navigate.js');

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

  shouldComponentUpdate: function(nextProps, nextState) {
    if(this.props.PageNum !== nextProps.PageNum || this.props.volume !== nextProps.volume || this.props.audioState !== nextProps.audioState || this.state.stopAudio !== nextState.stopAudio)
      return true;
    else
      return false;
  },

  render() {
    let audioPath = "../app/assets/audio/m01_t01_p0"+this.props.PageNum+".mp3";
    return (
      <div className="page-holder">
        <div className="page-title__container">
          <span className="topic-title">

          </span>
          <span className="page-title">Welcome</span>
        </div>
        <div ref="pageLoader" className="page-loader">
        </div>

      </div>
    )
  }
});

export default PageContainer;
