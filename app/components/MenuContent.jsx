var React = require('react'),
    MenuList = require('../components/Vendor/MenuList.jsx').default;

var MenuContent = React.createClass ({
propTypes: {
  onCloseMenuClick:React.PropTypes.func,
  onPageLinkClick: React.PropTypes.func
},

getInitialState() {
  return {
    pageStatus: []
  }
},

componentDidMount() {
  this.setState({pageStatus: pageStatusList})
  },

getProgressColor(id) {
  if (this.state.pageStatus[id-1] == 1) {
    return  "#EE3124";
  }
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
        <MenuList>
          <ul>
            <li  onClick={this.props.onPageLinkClick} data-page-id={1}>
              <a className="disable-event">Welcome</a>
              <span className="menu-page-progress" style={{backgroundColor:this.getProgressColor(1)}}></span>
            </li>
            <li  onClick={this.props.onPageLinkClick} data-page-id={2}>
              <a className="disable-event">Course objectives</a>
              <span className="menu-page-progress" style={{backgroundColor:this.getProgressColor(2)}}></span>
            </li>
            <li  onClick={this.props.onPageLinkClick} data-page-id={3}>
              <a className="disable-event">Medical devices move to the home</a>
              <span className="menu-page-progress" style={{backgroundColor:this.getProgressColor(3)}}></span>
            </li>
            <li  onClick={this.props.onPageLinkClick} data-page-id={4}>
              <a className="disable-event">Growth in portable- and home-use medical devices</a>
              <span className="menu-page-progress" style={{backgroundColor:this.getProgressColor(4)}}></span>
            </li>
            <li  onClick={this.props.onPageLinkClick} data-page-id={5}>
              <a className="disable-event">Internet of things—connected medical equipment</a>
              <span className="menu-page-progress" style={{backgroundColor:this.getProgressColor(5)}}></span>
            </li>
            <li  onClick={this.props.onPageLinkClick} data-page-id={6}>
              <a className="disable-event">Target/focus medical applications</a>
              <span className="menu-page-progress" style={{backgroundColor:this.getProgressColor(6)}}></span>
            </li>
            <li  onClick={this.props.onPageLinkClick} data-page-id={7}>
              <a className="disable-event">Medical applications for Honeywell sensors—Activity</a>
              <span className="menu-page-progress" style={{backgroundColor:this.getProgressColor(7)}}></span>
            </li>
            <li  onClick={this.props.onPageLinkClick} data-page-id={8}>
              <a className="disable-event">Course summary</a>
              <span className="menu-page-progress" style={{backgroundColor:this.getProgressColor(8)}}></span>
            </li>
            <li  onClick={this.props.onPageLinkClick} data-page-id={9}>
              <a className="disable-event">Welcome to the quiz</a>
              <span className="menu-page-progress" style={{backgroundColor:this.getProgressColor(9)}}></span>
            </li>
          </ul>
        </MenuList>
      </div>
    </div>
  )
}
});

export default MenuContent;
