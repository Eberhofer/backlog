var React = require('react');
var ReactDOM = require('react-dom');
var itemsReducers = require('./Reducers/itemsReducers');
var ItemsTable = require('./components/itemsTable.react');
var ItemsForm = require('./components/itemsForm.react');
var CheckboxWithLabel = require('./components/CheckBoxWithLabel.react');
var createStore = require('redux').createStore;
const store = createStore(itemsReducers);

console.log(itemsReducers.ADD_ITEM)
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
      <ItemsTable data={this.state.data} />
      <h2>Add item</h2>
      <ItemsForm onContentSubmit={this.handleContentSubmit} />
      <CheckboxWithLabel labelOn="...Chabis" labelOff="So en ..." />
      </div>
    );
  }
});
// tutorial2.js

ReactDOM.render(
  // <ContentBox data={data}/>,
  <ContentBox url="http://localhost:3000/api/v1/items"  pollInterval={20000}/>,
  document.getElementById('content')
);
