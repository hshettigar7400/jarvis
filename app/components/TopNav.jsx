var React = require('react'),
    MediaQuery = require('react-responsive').default;

var TopNav = React.createClass ({

  propTypes: {
    onMenuClick:React.PropTypes.func,
    onToolsMenuClick:React.PropTypes.func,
    onNextButtonClick: React.PropTypes.func,
    onBackButtonClick: React.PropTypes.func,
    onTranscriptButtonClick: React.PropTypes.func,
    onPlayPauseClick: React.PropTypes.func,
    totalPages: React.PropTypes.number,
    currentPageNumber: React.PropTypes.number,
    onReplayClick: React.PropTypes.func,
    isMenuOpened: React.PropTypes.bool
  },
  getDoubleDigit (num) {

    if(num > 9) {
        return num;
    } else {
      return ("0"+num);
     }
},

  render() {
    return (
      <div className="top-nav">
        <div className="leftButtons"></div>
        <div className="middleButtons">
          <div className="button-box">
            <a href="#" id="button-tool" onClick={this.props.onToolsMenuClick} className="tabindex" aria-label="menu" role="button" aria-disabled="false" aria-pressed="false">
              <span className="button-label">
              </span>
              <span className="icon-tools"></span>
            </a>
          </div>
          <div className="button-box">
            <a href="#" id="button-pause" onClick={this.props.onPlayPauseClick} className="tabindex" aria-label="menu" role="button" aria-disabled="false" aria-pressed="false">
              <span className="button-label">
              </span>
              <span className="icon-playPause"></span>
            </a>
          </div>
          <div className="button-box">
            <a href="#" id="button-back" onClick={this.props.onBackButtonClick} className={(this.props.currentPageNumber > 1 || !this.props.isMenuOpened)? "back-button tabindex" : "back-button tabindex disabled"} aria-label="menu" role="button" aria-disabled="false" aria-pressed="false">
              <span className="button-label">
              </span>
              <span className="icon-back"></span>
            </a>
          </div>
          <div className="nav-comp-container">
            <div className="page-counter clearfix">
              <span className="page-number">{this.getDoubleDigit(this.props.currentPageNumber)}</span>
              <span className="page-separator">|</span>
              <span className="total-pages">{this.getDoubleDigit(this.props.totalPages)}</span>
            </div>
          </div>
          <div className="button-box">
            <a href="#" id="button-next" onClick={this.props.onNextButtonClick} className={this.props.isMenuOpened && this.props.currentPageNumber !== this.props.totalPages ? "tabindex next-button" : "tabindex disabled next-button"} aria-label="next" role="button" aria-disabled="false">
              <span className="button-label"></span>
              <span className="icon-next"></span>
            </a>
          </div>
          <div className="button-box">
            <a href="#" id="button-transcript" onClick={this.props.onTranscriptButtonClick} className="tabindex" aria-label="transcript" role="button" aria-disabled="false" aria-pressed="false">
              <span className="button-label"></span>
              <span className="icon-transcript"></span>
            </a>
          </div>
          <div className="button-box">
            <a href="#" id="button-menu" onClick={this.props.onMenuClick} className="tabindex" aria-label="menu" role="button" aria-disabled="false" aria-pressed="false">
            <span className="button-label">
            </span>
            <span className="icon-menu"></span></a>
          </div>
        </div>
        <div className="rightButtons"></div>
      </div>
    )
  }
});

export default TopNav;
