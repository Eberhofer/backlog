(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// var React = require('react');
// var ReactDOM = require('react-dom');

var Content = React.createClass({displayName: "Content",
  render: function() {
    return (
      React.createElement("div", {className: "Mycontent"}, 
        React.createElement("h2", {className: "contentItem"}, 
          this.props.item
        ), 
        this.props.children
      )
    );
  }
});

var ContentList = React.createClass({displayName: "ContentList",
  handleClick: function(keyid, field) {
    alert('clicked on item with id '+keyid+' '+field);
  },
  render: function() {
    var contentNodes = this.props.data.map(function(items) {
      var keyid = items.id
      return (
        React.createElement("tr", {key: keyid}, 
          React.createElement("td", {onClick: this.handleClick.bind(this, keyid, 'item')}, items.item), 
          React.createElement("td", {onClick: this.handleClick.bind(this, keyid, 'story')}, items.story), 
          React.createElement("td", {onClick: this.handleClick.bind(this, keyid, 'project')}, items.project), 
          React.createElement("td", {onClick: this.handleClick.bind(this, keyid, 'projectstory')}, items.projectstory), 
          React.createElement("td", {onClick: this.handleClick.bind(this, keyid, 'project_id')}, items.project_id), 
          React.createElement("td", {onClick: this.handleClick.bind(this, keyid, 'edit')}, "e"), 
          React.createElement("td", {onClick: this.handleClick.bind(this, keyid, 'delete')}, "x")
        )
      );
    }, this);
    return (
      React.createElement("table", {className: "table"}, 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
            React.createElement("th", null, "Item"), 
            React.createElement("th", null, "Story"), 
            React.createElement("th", null, "Project"), 
            React.createElement("th", null, "ProjectStory"), 
            React.createElement("th", null, "ProjectID"), 
            React.createElement("th", null, "e"), 
            React.createElement("th", null, "x")
          )
        ), 
        React.createElement("tbody", null, 
          contentNodes
        )
      )
    );
  }
});

var ContentForm = React.createClass({displayName: "ContentForm",
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
      React.createElement("form", {className: "contentForm", onSubmit: this.handleSubmit}, 
        React.createElement("input", {type: "text", placeholder: "Item", ref: "item"}), 
        React.createElement("input", {type: "text", placeholder: "The item does ...", ref: "story"}), 
        React.createElement("input", {type: "number", min: "1", step: "1", placeholder: "Enter the ProjectID", ref: "project_id"}), 
        React.createElement("input", {type: "submit", value: "Post"})
      )
    );
  }
});

var ContentBox = React.createClass({displayName: "ContentBox",
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
      React.createElement("div", {className: "contentBox"}, 
      React.createElement("h1", null, "Content"), 
      React.createElement(ContentList, {data: this.state.data}), 
      React.createElement("h2", null, "Add item"), 
      React.createElement(ContentForm, {onContentSubmit: this.handleContentSubmit})
      )
    );
  }
});
// tutorial2.js

ReactDOM.render(
  // <ContentBox data={data}/>,
  React.createElement(ContentBox, {url: "localhost:3000/api/v1/items", pollInterval: 20000}),
  document.getElementById('content')
);
},{}]},{},[1]);
