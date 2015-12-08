var React = require('react');
var ReactDOM = require('react-dom');

var ItemsRow = React.createClass({
  handleClick: function(keyid, field) {
    alert('clicked on item with id '+keyid+' '+field);
  },
  render: function() {
    var keyid = this.props.key;
    var item = this.props.items;
    return (
      <tr key={this.props.keyid}>
        <td onClick={this.handleClick.bind(this, keyid, 'item')}>{item.item}</td>
        <td onClick={this.handleClick.bind(this, keyid, 'story')}>{item.story}</td>
        <td onClick={this.handleClick.bind(this, keyid, 'project')}>{item.project}</td>
        <td onClick={this.handleClick.bind(this, keyid, 'projectstory')}>{item.projectstory}</td>
        <td onClick={this.handleClick.bind(this, keyid, 'project_id')}>{item.project_id}</td>
        <td onClick={this.handleClick.bind(this, keyid, 'edit')}>e</td>
        <td onClick={this.handleClick.bind(this, keyid, 'delete')}>x</td>
      </tr>
    );
  }
});

module.exports = ItemsRow;
