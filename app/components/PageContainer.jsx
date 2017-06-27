var React = require('react'),
{loadPage} = require('../components/Navigate.js');
import Preloader from 'preloader.js';
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
      currentAudioPosition: 0,
      isLoading: true,
    }
  },

  componentDidMount() {
    loadPage(this.props.PageNum);
    var self = this;
    var preloader = new Preloader({
      resources: [
      '../app/assets/audio/course_instruction.mp3',
      '../app/assets/audio/m01_t01_p01.mp3',
      '../app/assets/audio/m01_t01_p02.mp3',
      '../app/assets/audio/m01_t01_p03.mp3',
      '../app/assets/audio/m01_t01_p04.mp3',
      '../app/assets/audio/m01_t01_p05.mp3',
      '../app/assets/audio/m01_t01_p07_01.mp3',
      '../app/assets/audio/m01_t01_p07_02.mp3',
      '../app/assets/audio/m01_t01_p07_03.mp3',
      '../app/assets/audio/m01_t01_p07_04.mp3',
      '../app/assets/audio/m01_t01_p06.mp3',
      '../app/assets/audio/m01_t01_p07.mp3',
      '../app/assets/audio/m01_t01_p08.mp3',
      '../app/assets/audio/m01_t01_p09_01.mp3',
      '../app/assets/audio/m01_t01_p09_02.mp3',
      '../app/assets/audio/m01_t01_p09.mp3'

      ]
      });

      // console.log('preloader: ', preloader);

      preloader.addProgressListener(function (loaded, length) {
          // console.log('loading ', loaded, length, loaded / length)
      });

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
    let audioPath = "../app/assets/audio/m01_t01_p0'+pageNum+'.mp3";
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
})


export default PageContainer;
