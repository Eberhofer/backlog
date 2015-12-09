jest.dontMock('../itemsHeader.react');
var React = require('react');
var ReactDOM = require('react-dom');

describe('itemsHeader module',  function () {

    it('has the right headings', function () {
      var testUtils = require('react-addons-test-utils');
      var ItemsHeader = require('../itemsHeader.react');

      var expectedHeaderText = 'ItemStoryProjectProjectStoryProjectIDex';
      var Header = testUtils.renderIntoDocument(<table><ItemsHeader /></table>);
      var actualHeaderText = ReactDOM.findDOMNode(Header).textContent;

      expect(actualHeaderText).toEqual(expectedHeaderText);

    });
  });
