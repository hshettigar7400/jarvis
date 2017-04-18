var React = require('react');
var $ = require("jquery");
var PageContainer = React.createClass ({
  propTypes: {
    PageNum: React.PropTypes.number
  },

  componentDidMount() {
      $(".page-loader").load('components/content/m01/t01/m01_t01_p01.html')
  },

  componentWillReceiveProps() {
    $(".page-loader").load('components/content/m01/t01/m01_t01_p0'+(this.props.PageNum)+'.html')
  },

  render() {
    return (
      <div>
      <div className="page-title__container">
        <span className="topic-title">
          Introduction
        </span>
        <span className="title-seperator acc-prop-background">|</span>
        <span className="page-title">Welcome</span>
      </div>
        <div ref="pageLoader" className="page-loader">
        </div>
      </div>
    )
  }
});

export default PageContainer;
