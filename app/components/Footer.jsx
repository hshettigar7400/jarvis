var React = require('react'),
    ReactDOM = require('react-dom');


var Footer = React.createClass ({
propTypes: {
  onMenuClick: React.PropTypes.func,
  onHelpClick: React.PropTypes.func,
  onNextButtonClick: React.PropTypes.func,
  onBackButtonClick: React.PropTypes.func,
  onTranscriptButtonClick: React.PropTypes.func,
  onPlayPauseClick: React.PropTypes.func,
  onReplayClick: React.PropTypes.func,
  totalPages: React.PropTypes.number,
  currentPageNumber: React.PropTypes.number,
  onVolumeClick: React.PropTypes.func,
  isMenuOpened: React.PropTypes.bool
},

getDoubleDigit (num) {
  return (num > 9) ? num : ('0'+num);
},

render() {
  return (
    <div>
      <div className="left-column">
      </div>
      <div className="middle-column">
      </div>
      <div className="right-column">
        <div className="button-box">
          <a href="#" id="button-menu" onClick={this.props.onMenuClick} className="tabindex" aria-label="menu" role="button" aria-disabled="false" aria-pressed="false">
          <span className="button-label">
          </span>
          <span className="icon-menu"></span></a>
        </div>
        <div className="button-box">
          <a href="#" id="button-resources" className="tabindex  disabled" aria-label="resources" role="button" aria-disabled="true" aria-pressed="false">
            <span className="button-label"></span>
            <span className="icon-resources"></span>
          </a>
        </div>
        <div className="button-box">
          <a href="#" id="button-glossary" className="tabindex disabled" aria-label="glossary" role="button" aria-disabled="false" aria-pressed="false">
            <span className="button-label"></span>
            <span className="icon-glossary"></span>
          </a>
        </div>
        <div className="button-box">
          <a href="#" id="button-help" onClick={this.props.onHelpClick} className={this.props.isMenuOpened ? "tabindex" : "tabindex disabled"} aria-label="help" role="button" aria-disabled="false" aria-pressed="false">
            <span className="button-label"></span>
            <span className="icon-help"></span>
          </a>
        </div>
        <div className="button-box">
          <a href="#" id="button-transcript" onClick={this.props.onTranscriptButtonClick} className={this.props.isMenuOpened ? "tabindex" : "tabindex disabled"} aria-label="transcript" role="button" aria-disabled="false" aria-pressed="false">
            <span className="button-label"></span>
            <span className="icon-transcript"></span>
          </a>
        </div>
        <div className="button-box">
          <a href="#" id="button-audio" onClick={this.props.onVolumeClick} className={this.props.isMenuOpened ? "tabindex" : "tabindex disabled"} aria-label="audio" role="button" aria-disabled="false" aria-pressed="true">
            <span className="button-label"></span>
            <span className="icon-audio"></span>
          </a>
        </div>
        <div className="button-box">
          <a href="#" id="button-replay" onClick={this.props.onReplayClick} className={this.props.isMenuOpened ? "tabindex" : "tabindex disabled"} aria-label="replay" role="button" aria-disabled="false">
            <span className="button-label"></span>
            <span className="icon-replay"></span>
          </a>
        </div>
        <div className="button-box">
          <a href="#" id="button-playPause" onClick={this.props.onPlayPauseClick} className={this.props.isMenuOpened ? "tabindex" : "tabindex disabled"} aria-label="playPause" role="button" aria-disabled="true" aria-pressed="true">
            <span className="button-label"></span>
            <span className="icon-playPause"></span>
          </a>
        </div>
        <div className="button-box">
          <a href="#" id="button-back" onClick={this.props.onBackButtonClick} className={(this.props.currentPageNumber > 1 || !this.props.isMenuOpened)? "tabindex" : "tabindex disabled"} aria-label="back" role="button" aria-disabled="true">
            <span className="button-label"></span>
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
          <a href="#" id="button-next" onClick={this.props.onNextButtonClick} className={this.props.isMenuOpened ? "tabindex next-button" : "tabindex disabled next-button"} aria-label="next" role="button" aria-disabled="false">
            <span className="button-label"></span>
            <span className="icon-next"></span>
          </a>
        </div>
      </div>
    </div>
  )
}
});

export default Footer;
