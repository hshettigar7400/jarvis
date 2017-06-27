var React = require('react'),
MediaQuery = require('react-responsive').default;

var HelpContent = React.createClass ({

  propTypes: {
    closeHelp:React.PropTypes.func
  },

  render() {
    return (
      <div>
        <div className="help-header">
          <div className="title-container">
            <h1>Help</h1>
          </div>
          <div className="button-container">
            <a href="#" id="help-close-button" onClick={this.props.closeHelp} className="help-close-button tabindex" aria-label="Help close button">
              <span className="icon-close"></span>
            </a>
          </div>
        </div>
        <div className="help-content">

          <div className="elements-container">
            <div className="title-container">
              <p>Page Counter</p>
              <div className="iconbg btnbg">
                <span className="pagecounter">1|13</span>
              </div>
            </div>
            <div className="button-container">
              <p>The page counter helps you track your progress through the course. </p>
              <p></p>
            </div>
          </div>

          <div className="elements-container">
            <div className="title-container">
              <p>Help</p>
              <div className="iconbg btnbg">
                <span className="icon-help"></span>
              </div>
            </div>
            <div className="button-container">
              <p>Use this button to open the Help home page. </p>
              <p></p>
            </div>
          </div>

          <div className="elements-container">
            <div className="title-container">
              <p>Glossary</p>
              <div className="iconbg btnbg">
                <span className="icon-glossary"></span>
              </div>
            </div>
            <div className="button-container">
              <p>Use this button to see a list of words and phrases used in the course, along with their definitions. </p>
              <p></p>
            </div>
          </div>

          <div className="elements-container">
            <div className="title-container">
              <p>Print</p>
              <div className="iconbg btnbg">
                <span className="icon-print"></span>
              </div>
            </div>
            <div className="button-container">
              <p>Use this button to print the entire course. </p>
              <p></p>
            </div>
          </div>

          <div className="elements-container">
            <div className="title-container">
              <p>Back</p>
              <div className="iconbg btnbg">
                <span className="icon-back"></span>
              </div>
            </div>
            <div className="button-container">
              <p>Use this button to return to the previous slide. </p>
              <p></p>
            </div>
          </div>

          <div className="elements-container">
            <div className="title-container">
              <p>Play/Pause</p>
              <div className="iconbg btnbg">
                <span className="icon-playPause"></span>
              </div>
            </div>
            <div className="button-container">
              <p>Use this button to play or pause animation or media in the course.  </p>
              <p></p>
            </div>
          </div>

          <div className="elements-container">
            <div className="title-container">
              <p>Replay</p>
              <div className="iconbg btnbg">
                <span className="icon-replay"></span>
              </div>
            </div>
            <div className="button-container">
              <p>Use this button to replay a slide from the beginning.</p>
              <p></p>
            </div>
          </div>

          <div className="elements-container">
            <div className="title-container">
              <p>Next</p>
              <div className="iconbg btnbg">
                <span className="icon-next"></span>
              </div>
            </div>
            <div className="button-container">
              <p>Use this button to advance to the next slide.  </p>
              <p></p>
            </div>
          </div>

          <div className="elements-container">
            <div className="title-container">
              <p>Page Progress</p>
              <div className="pageprogress">
                <span ></span>
                <span ></span>
              </div>
            </div>
            <div className="button-container">
              <p>This bar displays the progress of the current page. </p>
              <p></p>
            </div>
          </div>

          <div className="elements-container">
            <div className="title-container">
              <p>Audio On/Off</p>
              <div className="iconbg btnbg">
                <span className="icon-audio"></span>
              </div>
            </div>
            <div className="button-container">
              <p>Use this button to turn audio on or off. </p>
              <p></p>
            </div>
          </div>

          <div className="elements-container">
            <div className="title-container">
              <p>Transcript Text</p>
              <div className="iconbg btnbg">
                <span className="icon-transcript"></span>
              </div>
            </div>
            <div className="button-container">
              <p>Use this button to see the transcript of the audio.</p>
              <p></p>
            </div>
          </div>

          <div className="elements-container">
            <div className="title-container">
              <p>References</p>
              <div className="iconbg btnbg">
                <span className="icon-resources"></span>
              </div>
            </div>
            <div className="button-container">
              <p>Use this button to access a list of resources and references for the course. </p>
              <p></p>
            </div>
          </div>

          <div className="elements-container">
            <div className="title-container">
              <p>Topics</p>
              <div className="iconbg btnbg">
                <span className="icon-menu"></span>
              </div>
            </div>
            <div className="button-container">
              <p>Use this button to see a list of topics covered in this course. You can navigate through the various pages and sections of the course from the Topics list.</p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default HelpContent;
