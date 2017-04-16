var React = require('react'),
    MenuList = require('../components/Vendor/MenuList.jsx').default;

var MenuContent = React.createClass ({
propTypes: {
  onCloseMenuClick:React.PropTypes.func
},

render() {
  return (
    <div>
      <div className="menu-header">
        <div className="menu-header-title">
          <h1>Menu</h1>
        </div>
        <div className="menu-close-button-container" onClick={this.props.onCloseMenuClick}>
          <a>
            <span className="icon-close"></span>
          </a>
        </div>
      </div>
      <div>
        <MenuList trigger="Introduction">
          <ul>
            <li>
              <a>Course objectives</a>
              <span className="menu-page-progress"></span>
            </li>
            <li>
              <a>Increase in home therapy options</a>
              <span className="menu-page-progress"></span>
            </li>
            <li>
              <a>Small and portable medical devices</a>
              <span className="menu-page-progress"></span>
            </li>
            <li>
              <a>Internet of things—connected medical equipment</a>
              <span className="menu-page-progress"></span>
            </li>
            <li>
              <a>Welcome to the quiz</a>
              <span className="menu-page-progress"></span>
            </li>
          </ul>
        </MenuList>
      </div>
    </div>
  )
}
});

module.exports = MenuContent;
