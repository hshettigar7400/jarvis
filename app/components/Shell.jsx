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
  HelpDock = require('react-dock'),
  {toggleSoundVolume, togglePlayPuase, loadAudio, toggleButtonState} = require('../assets/scripts/AudioManager.js'),
  {loadPage} = require('../components/Navigate.js'),
  $ = require('jquery');


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

  clickOpenMenu: function(e) {
    this.setState({sidebarOpen: !this.state.sidebarOpen});
    this.setState({transcriptVisible: false});
    this.setState({isHelpDockOpen: false});
  },

  clickOpenToolsMenu: function() {
    this.setState({toolsMenuOpen: !this.state.toolsMenuOpen});
  },

  setOpen() {
    this.setState({sidebarOpen: false});
    togglePlayPuase()
  },

  updateDimensions: function() {
    var w = window,
      d = document,
      documentElement = d.documentElement,
      body = d.getElementsByTagName('body')[0],
      width = w.innerWidth,
      height = w.innerHeight;
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        var contentHeight = height - 65;
        $('#root').css({
          'min-width': '320px'
        })
      } else {
        var contentHeight = height - 65;
        $('#root').css({
        'max-width': '1010px',
        'max-height': '650px'
        })
        $('.shell-container').css({
        'max-width': '1010px',
        'max-height': '650px'
        })
      }
      /*if (width > 680)
        var contentHeight = height - 65;
      else
        var contentHeight = height - 46;*/
        //alert('contentHeight: '+contentHeight);
      $('.page-container').css('height', contentHeight+'px');
      $('.page-loader').css('height', (contentHeight-40)+'px');
  },

  componentDidMount: function() {
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
  },

  componentDidUpdate: function(prevProps, prevState) {
    window.addEventListener("resize", this.updateDimensions);
    if (this.state.transcriptVisible === false) {
      $("#button-transcript").removeClass("selected");
    }
    if (jarvisAudio.playState != 1) {
      $("button-playPause").removeClass("selected");
    }
    if (this.state.sidebarOpen || this.state.isHelpDockOpen) {
      $("#button-playPause").addClass("disabled");
      jarvisAudio.pause();
    }
    else {
      $("#button-playPause").removeClass("disabled");
      if (!$("#button-playPause").hasClass("selected")) {
        jarvisAudio.resume();
      }
    }
  },

  setToolsMenuOpen() {
    this.setState({toolsMenuOpen: false});
  },

  loadNextPage() {
    if(this.state.currentPageNumber + 1 > 9) {
      this.setState({currentPageNumber: 2});
    }
    else {
    this.setState({currentPageNumber: this.state.currentPageNumber + 1});
  }
    this.setState({isPause: false})
  },

  loadPreviousPage() {
    this.setState({currentPageNumber: this.state.currentPageNumber - 1});
    this.setState({isPause: false})
  },

  menuItemClicked(e){
    var pageId = e.currentTarget.dataset.pageId;
    this.setState({currentPageNumber: parseInt(pageId)});
    this.setState({sidebarOpen: !this.state.sidebarOpen});
    console.log("Clicked",  parseInt(pageId));
  },

  clickOpenHelpDock() {
    this.setState({isHelpDockOpen: !this.state.isHelpDockOpen});
    this.setState({transcriptVisible: false});
  },

  enableTranscript(e) {
  this.setState({isHelpDockOpen: false});
    var _self =this;
    if (!this.state.transcriptVisible) {
      $("#button-transcript").addClass("selected");
    }
    else {
      $("#button-transcript").removeClass("selected");
    }
    this.setState({transcriptVisible: !this.state.transcriptVisible});
    $.getJSON( "../app/assets/data/transcript.json", function( data ) {
        $(".transcript-text-container").html(data.transcript[_self.state.currentPageNumber-1].text)
    });
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
    togglePlayPuase();
    toggleButtonState(e);
  },

  replayScreen() {
    loadPage(this.state.currentPageNumber);
    loadAudio(this.state.currentPageNumber);
  },


  volumeChange(e) {
    toggleSoundVolume();
    toggleButtonState(e);
  },

  render() {
    return (
      <div className="shell-container" style={{position: 'relative'}}>
        <div className="header">
          <MediaQuery query='(max-width: 680px)'>
            <TopNav
              onMenuClick={this.clickOpenMenu.bind(null, this)}
              onToolsMenuClick={this.clickOpenToolsMenu}
              onNextButtonClick={this.loadNextPage}
              onBackButtonClick={this.loadPreviousPage}
              onTranscriptButtonClick={this.enableTranscript}
              totalPages={9}
              currentPageNumber={this.state.currentPageNumber}
              onPlayPauseClick={this.audioPlayPause}
              onReplayClick={this.replayScreen}
              onVolumeClick={this.volumeChange}
              isMenuOpened={!this.state.sidebarOpen}
            />
          </MediaQuery>
          <MediaQuery query='(min-width: 680px)'>
            <HeaderTitle />
          </MediaQuery>
        </div>
        <div className="page-container" >
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
              dimStyle={{position: 'relative', height: '100%'}}
              >
              <HelpContent closeHelp={this.clickOpenHelpDock}/>
            </HelpDock>
          </div>

        </div>

        <MediaQuery query='(min-width: 680px)'>
          <div className="footer">
            <Footer
              onMenuClick={this.clickOpenMenu.bind(null, this)}
              onHelpClick={this.clickOpenHelpDock}
              onNextButtonClick={this.loadNextPage}
              onBackButtonClick={this.loadPreviousPage}
              onTranscriptButtonClick={this.enableTranscript}
              totalPages={9}
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
