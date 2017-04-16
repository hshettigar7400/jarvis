var React = require('react'),
  HeaderTitle = require('../components/HeaderTitle.jsx'),
  Footer = require('../components/Footer.jsx'),
  PageContainer = require('../components/PageContainer.jsx'),
  MenuContent = require('../components/MenuContent.jsx'),
  ToolsMenuContent = require('../components/ToolsMenuContent.jsx').default,
  MediaQuery = require('react-responsive'),
  TopNav = require('../components/TopNav.jsx'),
  Menu = require('react-sidebar').default,
  ToolsMenu = require('react-sidebar').default;

var Shell = React.createClass ({
getInitialState: function() {
  return {
    sidebarOpen: false,
    toolsMenuOpen: false
  };
},

clickOpenMenu: function() {
  this.setState({sidebarOpen: !this.state.sidebarOpen});
},

clickOpenToolsMenu: function() {
  this.setState({toolsMenuOpen: !this.state.toolsMenuOpen});
},

setOpen() {
  this.setState({sidebarOpen: false});
},

setToolsMenuOpen() {
  this.setState({toolsMenuOpen: false});
},

render() {
  return (
    <div className="shell-container">
      <div className="header">
        <MediaQuery query='(max-width: 800px)'>
          <TopNav
            onMenuClick={this.clickOpenMenu}
            onToolsMenuClick={this.clickOpenToolsMenu}
          />
        </MediaQuery>
        <MediaQuery query='(min-width: 800px)'>
          <HeaderTitle />
        </MediaQuery>
      </div>

      <div className="page-container">
        <PageContainer />
      </div>
      <MediaQuery query='(min-width: 800px)'>
        <div className="footer">
          <Footer onMenuClick={this.clickOpenMenu}/>
        </div>
      </MediaQuery>

      <Menu sidebar={<MenuContent onCloseMenuClick={this.setOpen}/>}
         open={this.state.sidebarOpen}
         onSetOpen={this.onSetSidebarOpen}
         overlayClassName="menu-overlay-style"
         onSetOpen={this.setOpen}
         pullRight={true}
         rootClassName="menu-custom-style"
         sidebarClassName="menu-style">
         <b>{}</b>
      </Menu>

      <ToolsMenu sidebar={<ToolsMenuContent onCloseMenuClick={this.setOpen}/>}
         open={this.state.toolsMenuOpen}
         onSetOpen={this.onSetSidebarOpen}
         overlayClassName="tool-menu-overlay-style"
         onSetOpen={this.setToolsMenuOpen}
         pullRight={true}
         rootClassName="tool-menu-custom-style"
         sidebarClassName="tool-menu-style">
         <b>{}</b>
      </ToolsMenu>
    </div>
  )
}
});

module.exports = Shell;
