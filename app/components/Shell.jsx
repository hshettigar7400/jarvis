var React = require('react'),
  Header = require('../components/Header.jsx'),
  Footer = require('../components/Footer.jsx'),
  PageContainer = require('../components/PageContainer.jsx'),
  MenuContent = require('../components/MenuContent.jsx'),
  Menu = require('react-sidebar').default;

var Shell = React.createClass ({
getInitialState: function() {
  return {sidebarOpen: false};
},

handleChildClick: function() {
 this.setState({sidebarOpen: true});
},

setOpen() {
  this.setState({sidebarOpen: false});
},

render() {
  return (
    <div className="shell-container">
      <div className="header">
        <Header />
      </div>

      <div className="page-container">
        <PageContainer />
      </div>

      <div className="footer">
        <Footer onMenuClick={this.handleChildClick}/>
      </div>

      <Menu sidebar={<MenuContent />}
         open={this.state.sidebarOpen}
         onSetOpen={this.onSetSidebarOpen}
         overlayClassName="menu-overlay-style"
         onSetOpen={this.setOpen}
         pullRight={true}
         rootClassName="menu-custom-style"
         sidebarClassName="menu-style">
         <b>{}</b>
      </Menu>
    </div>
  )
}
});

module.exports = Shell;
