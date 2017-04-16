var React = require('react'),
    MediaQuery = require('react-responsive');

var TopNav = React.createClass ({

  propTypes: {
    onMenuClick:React.PropTypes.func,
    onToolsMenuClick:React.PropTypes.func
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
            <a href="#" id="button-pause" onClick={this.props.onMenuClick} className="tabindex" aria-label="menu" role="button" aria-disabled="false" aria-pressed="false">
              <span className="button-label">
              </span>
              <span className="icon-playPause"></span>
            </a>
          </div>
          <div className="button-box">
            <a href="#" id="button-back" onClick={this.props.onMenuClick} className="tabindex" aria-label="menu" role="button" aria-disabled="false" aria-pressed="false">
              <span className="button-label">
              </span>
              <span className="icon-back"></span>
            </a>
          </div>
          <div className="nav-comp-container">
            <div className="page-counter clearfix">
              <span className="page-number">01</span>
              <span className="page-separator">|</span>
              <span className="total-pages">13</span>
            </div>
          </div>
          <div className="button-box">
            <a href="#" id="button-next" className="tabindex" aria-label="next" role="button" aria-disabled="false">
              <span className="button-label"></span>
              <span className="icon-next"></span>
            </a>
          </div>
          <div className="button-box">
            <a href="#" id="button-transcript" className="tabindex" aria-label="transcript" role="button" aria-disabled="false" aria-pressed="false">
              <span className="button-label"></span>
              <span className="icon-audio"></span>
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

module.exports = TopNav;
