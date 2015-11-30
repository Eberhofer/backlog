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
  render: function() {
    var contentNodes = this.props.data.map(function(items) {
      return (
        <tr key={items.id}>
          <td>{items.item}</td>
          <td>{items.story}</td>
          <td>{items.projectid}</td>
        </tr>
      );
    });
    return (
      <tbody>
      {contentNodes}
      </tbody>
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
      <table>
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
          <ContentList data={this.state.data} />
      </table>
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
