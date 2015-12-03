var React = require('react');

var Content = React.createClass({
  render: function() {
    return (
      <div className="Mycontent">
        <h2 className="contentItem">
          {this.props.item}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Content;
