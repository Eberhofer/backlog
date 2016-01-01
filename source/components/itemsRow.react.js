var React = require('react');
var ReactDOM = require('react-dom');

var ItemsRow = React.createClass({
  handleClick: function(keyid, field) {
    alert('clicked on item with id '+keyid+' '+field);
  },
  render: function() {
    var item = this.props.items;
    return (
      <tr key={item.id}>
        <td onClick={this.handleClick.bind(this, item.id, 'item')}>{item.item}</td>
        <td onClick={this.handleClick.bind(this, item.id, 'story')}>{item.story}</td>
        <td onClick={this.handleClick.bind(this, item.id, 'project')}>{item.project}</td>
        <td onClick={this.handleClick.bind(this, item.id, 'projectstory')}>{item.projectstory}</td>
        <td onClick={this.handleClick.bind(this, item.id, 'project_id')}>{item.project_id}</td>
        <td onClick={this.handleClick.bind(this, item.id, 'edit')}>e</td>
        <td onClick={this.handleClick.bind(this, item.id, 'delete')}>x</td>
      </tr>
    );
  }
});

module.exports = ItemsRow;
