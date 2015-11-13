var ContentBox = React.createClass({
  render: function() {
    return (
      <div className="contentBox">
      <h1>Content</h1>
      <ContentList data={this.props.data} />
      <ContentForm />
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
          {items.story}
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
  render: function() {
    return (
      <div className="contentForm">
        Hello, world! I am a ContentForm.
      </div>
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
var data = [
  {id: 1, item: "Pete Hunt", story: "This is one comment", project_id: 1},
  {id: 2, item: "Jordan Walke", sotry: "This is *another* comment", project_id: 1}
];
ReactDOM.render(
  <ContentBox data={data}/>,
  document.getElementById('content')
);
// <script type='text/jsx'>
  // var Example1 = React.createClass({
  //
  //   add: function() {
  //     console.log('add 1!');
  //   },
  //
  //   render: function() {
  //     return(
  //       <div>
  //         <h1>Counter</h1>
  //         <button onClick={this.add}>+</button>
  //       </div>
  //     );
  //   }
  // });
  //
  // React.render(<Example1 />, document.getElementById('content'));
