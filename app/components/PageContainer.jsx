var React = require('react'), {loadPage} = require('../components/Navigate.js'), {loadAudio} = require('../assets/scripts/AudioManager.js'),
  $ = require('jquery');
import Preloader from 'preloader.js';

var pageAssets = [
  [
    'images/m01_t01_p01/img1.png', '../app/assets/audio/m01_t01_p01.mp3'
  ],
  ['../app/assets/audio/m01_t01_p02.mp3'],
  [
    'images/m01_t01_p03/Slide_08_image_01.jpg', 'images/m01_t01_p03/Slide_08_image_02.jpg', '../app/assets/audio/m01_t01_p03.mp3', '../app/assets/audio/m01_t01_p03_02.mp3', '../app/assets/audio/m01_t01_p03_03.mp3'
  ],
  [
    'images/m01_t01_p04/m01_t01_p04_01_large.jpg',
    'images/m01_t01_p04/m01_t01_p04_02.jpg',
    'images/m01_t01_p04/m01_t01_p04_03.jpg',
    'images/m01_t01_p04/m01_t01_p04_04.jpg',
    'images/m01_t01_p04/m01_t01_p04_05.jpg',
    'images/m01_t01_p04/m01_t01_p04_06.jpg',
    'images/m01_t01_p04/m01_t01_p04_07.jpg',
    'images/m01_t01_p04/m01_t01_p04_08.jpg',
    'images/m01_t01_p04/m01_t01_p04_09.jpg',
    'images/m01_t01_p04/m01_t01_p04_10.jpg',
    'images/m01_t01_p04/m01_t01_p04_11.jpg',
    'images/m01_t01_p04/icon1.png',
    'images/m01_t01_p04/icon2.png',
    'images/m01_t01_p04/icon3.png',
    'images/m01_t01_p04/arrow.png',
    '../app/assets/audio/m01_t01_p04.mp3'
  ],
  [
    'images/m01_t01_p05/arrow.png', 'images/m01_t01_p05/m01_t01_p05_img1.jpg', '../app/assets/audio/m01_t01_p05.mp3'
  ],
  [
    '../app/assets/audio/m01_t01_p06.mp3',
    '../app/assets/audio/m01_t01_p06_02.mp3',
    '../app/assets/audio/m01_t01_p06_03.mp3',
    '../app/assets/audio/m01_t01_p06_04.mp3',
    '../app/assets/audio/m01_t01_p06_05.mp3',
    '../app/assets/audio/m01_t01_p06_06.mp3',
    '../app/assets/audio/m01_t01_p06_07.mp3',
    '../app/assets/audio/m01_t01_p06_08.mp3',
    '../app/assets/audio/m01_t01_p06_09.mp3',
    'images/m01_t01_p06/image1.jpg',
    'images/m01_t01_p06/image2.jpg',
    'images/m01_t01_p06/image3.jpg',
    'images/m01_t01_p06/image4.jpg',
    'images/m01_t01_p06/image5.jpg',
    'images/m01_t01_p06/image6.jpg',
    'images/m01_t01_p06/image7.jpg',
    'images/m01_t01_p06/image8.jpg',
    'images/m01_t01_p06/medical_device_bg_images.png'
  ],
  [
    '../app/assets/audio/m01_t01_p07_01.mp3', '../app/assets/audio/m01_t01_p07_02.mp3', '../app/assets/audio/m01_t01_p07_03.mp3', '../app/assets/audio/m01_t01_p07_04.mp3', '../app/assets/audio/m01_t01_p07.mp3'
  ],
  [
    '../app/assets/images/Yes.png', '../app/assets/images/No.png', 'images/m01_t01_p07/m01_t01_p07_bg.jpg', 'images/m01_t01_p07/m01_t01_p07_bg1.jpg', '../app/assets/audio/m01_t01_p08.mp3'
  ],
  ['../app/assets/audio/m01_t01_p09_01.mp3', '../app/assets/audio/m01_t01_p09_02.mp3', '../app/assets/audio/m01_t01_p09.mp3']
]

var PageContainer = React.createClass({
  propTypes: {
    PageNum: React.PropTypes.number,
    audioState: React.PropTypes.bool,
    replayState: React.PropTypes.bool,
    volume: React.PropTypes.number
  },

  getInitialState() {
    return {finishedPlaying: false, stopAudio: false, currentAudioPosition: 0, isLoading: true}
  },

  componentDidMount() {
    var _self = this;
    $(".loading").show();

    var preloader = new Preloader({resources: pageAssets[0]});

    preloader.addProgressListener(function(loaded, length) {
      console.log('loading ', loaded, length, loaded / length)
    });

    preloader.addCompletionListener(function() {
      $(".loading").hide();
      loadPage(_self.props.PageNum);
      loadAudio(_self.props.PageNum);
    });
    var deviceHeight = window.innerHeight;
    preloader.start();
    this.setContainerDimension();
    
  },

  componentDidUpdate(prevProps, prevState) {
    if ((this.props.PageNum !== prevProps.PageNum)) {
      loadPage(this.props.PageNum)
    }
    if (this.state.isLoading) {
      $("#button-playPause").addClass("disabled");
    } else {
      $("#button-playPause").removeClass("disabled");
    }
      this.setContainerDimension();
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    if (this.props.PageNum !== nextProps.PageNum || this.props.volume !== nextProps.volume || this.props.audioState !== nextProps.audioState || this.state.stopAudio !== nextState.stopAudio) {
      return true;
    } else {
      return false;
    }
  },

  setContainerDimension() {
    var isMobile = window.matchMedia("only screen and (max-width: 760px)");
    if (isMobile.matches) {
        setTimeout(function () {
             var deviceHeight = window.height;
        //alert('if isMobile.matches: '+deviceHeight);
      $('.page-holder').css('height', (deviceHeight) + 'px');
        }, 100)
     
    }

    $(window).on("orientationchange", function() {
      if (isMobile.matches) {
        setTimeout(function () {
             var deviceHeight = window.height;
        //alert('if isMobile.matches: '+deviceHeight);
      $('.page-holder').css('height', (deviceHeight) + 'px');
        }, 100)
     
    }
    }).trigger('orientationchange');
  },

  componentWillReceiveProps(nextProps) {
    var _self = this
    if (this.props.PageNum !== nextProps.PageNum) {
      $(".loading").show();

      _self.setState({isLoading: true});
      soundManager.stopAll();
      var preloader = new Preloader({
        resources: pageAssets[nextProps.PageNum - 1]
      });

      preloader.addProgressListener(function(loaded, length) {
        console.log('loading ', loaded, length, loaded / length)
      });

      preloader.addCompletionListener(function() {
        $(".loading").hide();
        loadPage(nextProps.PageNum);
        loadAudio(nextProps.PageNum)
        _self.setState({isLoading: false});
      });

      preloader.start();
    }
  },

  render() {
    let audioPath = "../app/assets/audio/m01_t01_p0" + this.props.PageNum + ".mp3";
    return (
      <div className="page-holder">
        <div className="loading">Loading&#8230;</div>
        <div className="page-title__container">
          <span className="topic-title"></span>
          <span className="page-title"></span>
        </div>
        <div ref="pageLoader" className="page-loader"></div>

      </div>
    )
  }

});

export default PageContainer;
