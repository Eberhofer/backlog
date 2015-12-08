var React = require('react');
var ReactDOM = require('react-dom');
var ItemsRow = require('./itemsRow.react');
var ItemsHeader = require('./itemsHeader.react');
var ItemsForm = require('./itemsHeader.react');

var ItemsTable = React.createClass({
  render: function() {
    var contentNodes = this.props.data.map(function(items) {
      var keyid = items.id;
      return (
        <ItemsRow key={keyid} items={items}/>
      );
    }, this);
    return (
      <table className="table">
        <ItemsHeader />
        <tbody>
          {contentNodes}
        </tbody>
      </table>
    );
  }
});

module.exports = ItemsTable;
