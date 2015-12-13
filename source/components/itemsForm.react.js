var React = require('react');
var ReactDOM = require('react-dom');

var ItemsForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var item = this.refs.item.value.trim();
    var story = this.refs.story.value.trim();
    var project_id = this.refs.project_id.value;
    if (!item || !story || !project_id ) {
      return;
    }
    this.props.onContentSubmit({item: item, story: story, project_id: project_id});
    this.refs.item.value = '';
    this.refs.story.value = '';
    return;
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Item" ref="item" tag="input"/>
        <input type="text" placeholder="The item does ..."  ref="story" tag="input"/>
        <input type="number"  min="1" step="1" placeholder="Enter the ProjectID"  ref="project_id" tag="input"/>
        <input type="submit" value="Post" />
      </form>
    );
  }
});


module.exports = ItemsForm;
