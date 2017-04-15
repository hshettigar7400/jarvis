var React = require('react');

var MenuContent = React.createClass ({
render() {
  return (
    <div>
      <div className="menu-header">
        <div className="menu-header-title">
          <h1>Menu</h1>
        </div>
        <div className="menu-close-button-container">
          <a>
            <span className="icon-close"></span>
          </a>
        </div>
      </div>
    </div>
  )
}
});

module.exports = MenuContent;
