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
  handleContentSubmit: function(mycontent) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: mycontent,
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
      <ContentForm onContentSubmit={this.handleContentSubmit} />
      </div>
    );
  }
});
// tutorial2.js
var ContentList = React.createClass({
  render: function() {
    var contentNodes = this.props.data.map(function(items) {
      return (
        <Content item={items.item} key={items.id}>
          Story: {items.story}, ProjectID = {items.project_id}
        </Content>
      );
    });
    return (
      <div className="contentList">
      {contentNodes}
      </div>
    );
  }
});

var ContentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var item = this.refs.item.value.trim();
    var story = this.refs.story.value.trim();
    var project_id = this.refs.project_id.value;
    if (!item || !story || !project_id) {
      return;
    }
    this.props.onCommentSubmit({item: item, story: story, project_id: project_id});
    this.refs.item.value = '';
    this.refs.story.value = '';
    return;
  },
  render: function() {
    return (
      <form className="contentForm">
        <input type="text" placeholder="Item" ref="item"/>
        <input type="text" placeholder="The item does ..."  ref="story"/>
        <input type="number" placeholder="Enter the ProjectID"  ref="project_id"/>
        <input type="submit" value="Post" />
      </form>
    );
  }
});
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

ReactDOM.render(
  // <ContentBox data={data}/>,
  <ContentBox url="/api/v1/items"  pollInterval={2000}/>,
  document.getElementById('content')
);
