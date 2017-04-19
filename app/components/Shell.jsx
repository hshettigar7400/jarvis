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
      isPause: false,
      isReplayed: false,
      currentPageNumber: 1,
      volume: 100
    };
  },

  clickOpenMenu: function() {
    this.setState({sidebarOpen: !this.state.sidebarOpen});
    this.setState({isPause: !this.state.sidebarOpen})
  },

  clickOpenToolsMenu: function() {
    this.setState({toolsMenuOpen: !this.state.toolsMenuOpen});
  },

  setOpen() {
    this.setState({sidebarOpen: false});
    this.setState({isPause: false})
  },

  setToolsMenuOpen() {
    this.setState({toolsMenuOpen: false});
  },

  loadNextPage() {
    this.setState({currentPageNumber: this.state.currentPageNumber + 1});
    this.setState({isPause: false})
  },

  loadPreviousPage() {
    this.setState({currentPageNumber: this.state.currentPageNumber - 1});
    this.setState({isPause: false})
  },

  menuItemClicked(e){
    var pageId = e.target.dataset.pageId;
    this.setState({currentPageNumber: parseInt(pageId)});
    this.setState({sidebarOpen: !this.state.sidebarOpen});
  },

  clickOpenHelpDock() {
    this.setState({isHelpDockOpen: !this.state.isHelpDockOpen});
    this.setState({isPause: !this.state.isHelpDockOpen})
  },

  enableTranscript(e) {
    if (!this.state.transcriptVisible) {
      e.currentTarget.classList.add("selected");
    }
    else {
      e.currentTarget.classList.remove("selected");
    }
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
            
        </div>
      </div>
    )
  },

  audioPlayPause(e) {
    if (!this.state.isPause) {
      e.currentTarget.classList.add("selected");
    }
    else {
      e.currentTarget.classList.remove("selected");
    }
    this.setState({isPause: !this.state.isPause})
  },

  replayScreen() {
    this.setState({isReplayed: !this.state.isReplayed})
  },

  volumeChange(e) {
    if (this.state.volume === 100) {
      e.currentTarget.classList.add("selected");
    }
    else {
      e.currentTarget.classList.remove("selected");
    }
    this.setState({volume: this.state.volume === 100 ? 0 : 100})
  },

  render() {
    return (
      <div className="shell-container">
        <div className="header">
          <MediaQuery query='(max-width: 800px)'>
            <TopNav
              onMenuClick={this.clickOpenMenu.bind(null, this)}
              onToolsMenuClick={this.clickOpenToolsMenu}
              onNextButtonClick={this.loadNextPage}
              onBackButtonClick={this.loadPreviousPage}
              onTranscriptButtonClick={this.enableTranscript}
              totalPages={10}
              currentPageNumber={this.state.currentPageNumber}
              onPlayPauseClick={this.audioPlayPause}
              onReplayClick={this.replayScreen}
              onVolumeClick={this.volumeChange}
              isMenuOpened={!this.state.sidebarOpen}
            />
          </MediaQuery>
          <MediaQuery query='(min-width: 800px)'>
            <HeaderTitle />
          </MediaQuery>
        </div>

        <div className="page-container">
          <PageContainer
            PageNum={this.state.currentPageNumber}
            audioState={this.state.isPause}
            replayState={this.state.isReplayed}
            volume={this.state.volume}/>
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
              onPlayPauseClick={this.audioPlayPause}
              onReplayClick={this.replayScreen}
              onVolumeClick={this.volumeChange}
              isMenuOpened={!this.state.sidebarOpen}
            />
          </div>
        </MediaQuery>

        <Menu sidebar={<MenuContent
            onCloseMenuClick={this.setOpen}
            onPageLinkClick={this.menuItemClicked}
          />}
           open={this.state.sidebarOpen}
           onSetOpen={this.onSetSidebarOpen}
           overlayClassName="menu-overlay-style"
           onSetOpen={this.setOpen}
           pullRight={true}
           rootClassName="menu-custom-style"
           sidebarClassName="menu-style">
           <b>{}</b>
        </Menu>

        <ToolsMenu sidebar={<ToolsMenuContent
            onCloseMenuClick={this.setOpen}
            onVolumeClick={this.volumeChange}
            onHelpClick={this.clickOpenHelpDock}
            />}
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
