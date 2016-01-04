var React = require('react');
var ReactDOM = require('react-dom');

var ItemsHeader = React.createClass({
  render: function() {
    return (
      <thead>
        <tr>
          <th>Item</th>
          <th>Story</th>
          <th>Project</th>
          <th>ProjectStory</th>
          <th>e</th>
          <th>x</th>
        </tr>
      </thead>
    );
  }
});

module.exports = ItemsHeader;
