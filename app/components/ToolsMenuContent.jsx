var React = require('react');

var ToolsMenuContent = React.createClass ({

render() {
  return (
    <div>
      <div className="button-box">
        <a href="#" id="button-help" className="tabindex" aria-label="help" role="button" aria-disabled="false" aria-pressed="false">
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
        <a href="#" id="button-resources" className="tabindex  disabled" aria-label="resources" role="button" aria-disabled="true" aria-pressed="false">
          <span className="button-label"></span>
          <span className="icon-resources"></span>
        </a>
      </div>

      <div className="button-box">
        <a href="#" id="button-replay" className="tabindex" aria-label="replay" role="button" aria-disabled="false">
          <span className="button-label"></span>
          <span className="icon-replay"></span>
        </a>
      </div>
    </div>
  )
}
});

export default ToolsMenuContent;
