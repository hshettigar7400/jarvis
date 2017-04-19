var React = require('react'),
    MenuList = require('../components/Vendor/MenuList.jsx').default;

var MenuContent = React.createClass ({
propTypes: {
  onCloseMenuClick:React.PropTypes.func,
  onPageLinkClick: React.PropTypes.func
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
              <a onClick={this.props.onPageLinkClick} data-page-id={1}>Welcome</a>
              <span className="menu-page-progress"></span>
            </li>
            <li>
              <a onClick={this.props.onPageLinkClick} data-page-id={2}>Course Objectives</a>
              <span className="menu-page-progress"></span>
            </li>
            <li>
              <a onClick={this.props.onPageLinkClick} data-page-id={3}>Increase in home therapy options</a>
              <span className="menu-page-progress"></span>
            </li>
            <li>
              <a onClick={this.props.onPageLinkClick} data-page-id={4}>Small and portable medical devices</a>
              <span className="menu-page-progress"></span>
            </li>
            <li>
              <a onClick={this.props.onPageLinkClick} data-page-id={5}>Internet of things—connected medical equipment</a>
              <span className="menu-page-progress"></span>
            </li>
            <li>
              <a onClick={this.props.onPageLinkClick} data-page-id={6}>Medical appications for Honeywell sensors - Activity</a>
              <span className="menu-page-progress"></span>
            </li>
            <li>
              <a onClick={this.props.onPageLinkClick} data-page-id={7}>Course Summary</a>
              <span className="menu-page-progress"></span>
            </li>
            <li>
              <a onClick={this.props.onPageLinkClick} data-page-id={8}>Welcome to the quiz</a>
              <span className="menu-page-progress"></span>
            </li>
          </ul>
        </MenuList>
      </div>
    </div>
  )
}
});

export default MenuContent;
