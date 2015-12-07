var React = require('react');
var ReactDOM = require('react-dom');

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

var ContentList = React.createClass({
  handleClick: function(keyid, field) {
    alert('clicked on item with id '+keyid+' '+field);
  },
  render: function() {
    var contentNodes = this.props.data.map(function(items) {
      var keyid = items.id
      return (
        <tr key={keyid}>
          <td onClick={this.handleClick.bind(this, keyid, 'item')}>{items.item}</td>
          <td onClick={this.handleClick.bind(this, keyid, 'story')}>{items.story}</td>
          <td onClick={this.handleClick.bind(this, keyid, 'project')}>{items.project}</td>
          <td onClick={this.handleClick.bind(this, keyid, 'projectstory')}>{items.projectstory}</td>
          <td onClick={this.handleClick.bind(this, keyid, 'project_id')}>{items.project_id}</td>
          <td onClick={this.handleClick.bind(this, keyid, 'edit')}>e</td>
          <td onClick={this.handleClick.bind(this, keyid, 'delete')}>x</td>
        </tr>
      );
    }, this);
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Story</th>
            <th>Project</th>
            <th>ProjectStory</th>
            <th>ProjectID</th>
            <th>e</th>
            <th>x</th>
          </tr>
        </thead>
        <tbody>
          {contentNodes}
        </tbody>
      </table>
    );
  }
});

var ContentForm = React.createClass({
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
      <form className="contentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Item" ref="item"/>
        <input type="text" placeholder="The item does ..."  ref="story"/>
        <input type="number"  min="1" step="1" placeholder="Enter the ProjectID"  ref="project_id"/>
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var ContentBox = React.createClass({
  loadContentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleContentSubmit: function(item) {
    console.log(item)
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: item,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadContentsFromServer();
    setInterval(this.loadContentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="contentBox">
      <h1>Content</h1>
      <ContentList data={this.state.data} />
      <h2>Add item</h2>
      <ContentForm onContentSubmit={this.handleContentSubmit} />
      </div>
    );
  }
});
// tutorial2.js

ReactDOM.render(
  // <ContentBox data={data}/>,
  <ContentBox url="/api/v1/items"  pollInterval={20000}/>,
  document.getElementById('content')
);
