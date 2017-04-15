var React = require('react');

var Page1 = React.createClass ({
render() {
  return (
    <div>
      <div className="screen-holder page">
        <div className="screen-bg">
          <div className="objective-holder">
            <div className="objective-title">Course objectives</div>
            <div className="objective-content">
              <p className="heading">After completing this course, you will be able to:</p>
              <ul>
                <li>Describe how trends/advances are relevant to sensor producs</li>
                <li>Identify industry shift to consumer-like behavior</li>
                <li>Describe the IOT revolution</li>
                <li>List applications relevant to Honeywell</li>
              </ul>
            </div>
          </div>
      </div>
      </div>
    </div>
  )
}
});

module.exports = Page1;
