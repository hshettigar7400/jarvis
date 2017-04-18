var React = require('react'),
{loadPage} = require('../components/Navigate.js'),
Sound = require('react-sound');
var PageContainer = React.createClass ({
  propTypes: {
    PageNum: React.PropTypes.number
  },



  componentDidMount() {
    loadPage(this.props.PageNum)
  },

  componentDidUpdate(prevProps, prevState) {
    if(this.props.PageNum !== prevProps.PageNum)
      loadPage(this.props.PageNum)
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.PageNum !== nextProps.PageNum) {
      //loadPage(this.props.PageNum);
    }
  },

  render() {
    return (
      <div>
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
        url="../app/assets/audio/m01_t01_p01.mp3"
        playStatus={Sound.status.PLAYING}
        playFromPosition={0 /* in milliseconds */}
        />
      </div>
    )
  }
});

export default PageContainer;
