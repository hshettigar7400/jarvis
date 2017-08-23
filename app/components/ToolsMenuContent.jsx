var React = require('react');

var ToolsMenuContent = React.createClass ({
getInitialState: function() {
  return {
    resourceVisible: false
  }
},
propTypes: {
  onVolumeClick: React.PropTypes.func,
  onHelpClick: React.PropTypes.func,
  onResourceClick: React.PropTypes.func
},


render() {

  return (
    <div className="Tools">
      <div className="button-box">
        <a href="#" id="button-help" onClick={this.props.onHelpClick} className="tabindex" aria-label="help" role="button" aria-disabled="false" aria-pressed="false">
          <span className="button-label"></span>
          <span className="icon-help"></span>
        </a>
      </div>

      <div className="button-box">
        <a href="#" id="button-glossary" className="tabindex disabled" aria-label="glossary" role="button" aria-disabled="false" aria-pressed="false">
          <span className="button-label"></span>
          <span className="icon-glossary"></span>
        </a>
      </div>

      <div className="button-box">
        <a href="#" onClick={this.props.onResourceClick} id="button-resources" className="tabindex disabled" aria-label="resources" role="button" aria-disabled="true" aria-pressed="false">
          <span className="button-label"></span>
          <span className="icon-resources"></span>
        </a>
      </div>

      <div className="button-box">
        <a href="#" id="button-audio" onClick={this.props.onVolumeClick} className="tabindex" aria-label="audio" role="button" aria-disabled="false" aria-pressed="true">
          <span className="button-label"></span>
          <span className="icon-audio"></span>
        </a>
      </div>

      <div className="button-box">
        <a href="#" id="button-replay" onClick={this.props.onReplayClick} className="tabindex" aria-label="replay" role="button" aria-disabled="false">
          <span className="button-label"></span>
          <span className="icon-replay"></span>
        </a>
      </div>
        <div className="button-box">
        <a href="../app/assets/resource/medical_devices_industry_overview.pdf" target="_blank" className="tabindex" aria-label="replay" role="button" aria-disabled="false" >
        <span className="button-label"></span>
          <span className="icon-print"></span>
        </a>
      </div>
    </div>

  )
}
})

export default ToolsMenuContent;
