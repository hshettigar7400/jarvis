var React = require('react'),
  HeaderTitle = require('../components/HeaderTitle.jsx').default,
  Footer = require('../components/Footer.jsx').default,
  PageContainer = require('../components/PageContainer.jsx').default,
  MenuContent = require('../components/MenuContent.jsx').default,
  ToolsMenuContent = require('../components/ToolsMenuContent.jsx').default,
  MediaQuery = require('react-responsive'),
  TopNav = require('../components/TopNav.jsx').default,
  HelpContent = require('../components/HelpContent.jsx').default,
  Menu = require('react-sidebar').default,
  ToolsMenu = require('react-sidebar').default,
  HelpDock = require('react-dock');


var Shell = React.createClass ({
  getInitialState: function() {
    return {
      sidebarOpen: false,
      toolsMenuOpen: false,
      isHelpDockOpen: false,
      transcriptVisible: false,
      currentPageNumber: 1
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

  loadNextPage() {
    this.setState({currentPageNumber: this.state.currentPageNumber + 1});
  },

  loadPreviousPage() {
    this.setState({currentPageNumber: this.state.currentPageNumber - 1});
  },

  clickOpenHelpDock() {
    this.setState({isHelpDockOpen: !this.state.isHelpDockOpen});
  },

  enableTranscript() {
    this.setState({transcriptVisible: !this.state.transcriptVisible});
  },

  showTranscript() {
    return(
      <div className="transcript-container">
        <div id="transcript-header" className="transcript-header">
          <div className="transcript-title">Transcript</div>
          <a href="#" id="transcript-close-button" onClick={this.enableTranscript} className="transcript-close-button tabindex" aria-label="Transcript close" role="button">
            <span className="icon-close"></span>
          </a>
        </div>
        <div className="transcript-text-container">
            Loading......
        </div>
      </div>
    )
  },


  render() {
    return (
      <div className="shell-container">
        <div className="header">
          <MediaQuery query='(max-width: 800px)'>
            <TopNav
              onMenuClick={this.clickOpenMenu.bind(null, this)}
              onToolsMenuClick={this.clickOpenToolsMenu}
            />
          </MediaQuery>
          <MediaQuery query='(min-width: 800px)'>
            <HeaderTitle />
          </MediaQuery>
        </div>

        <div className="page-container">
          <PageContainer PageNum={this.state.currentPageNumber}/>
          <div className="help-container">
            <HelpDock
              position='top'
              isVisible={this.state.isHelpDockOpen}
              duration={800}
              size={0.98}
              dockStyle={{position: 'absolute', height: 'auto'}}
              dimStyle={{position: 'relative', height: '102%'}}
              >
              <HelpContent closeHelp={this.clickOpenHelpDock}/>
            </HelpDock>
          </div>
        </div>

        <MediaQuery query='(min-width: 800px)'>
          <div className="footer">
            <Footer
              onMenuClick={this.clickOpenMenu.bind(null, this)}
              onHelpClick={this.clickOpenHelpDock}
              onNextButtonClick={this.loadNextPage}
              onBackButtonClick={this.loadPreviousPage}
              onTranscriptButtonClick={this.enableTranscript}
              totalPages={10}
              currentPageNumber={this.state.currentPageNumber}
            />
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

      {this.state.transcriptVisible && this.showTranscript()}

      </div>
    )
  }
});

export default Shell;
