jest.dontMock('../itemsHeader.react');
var React = require('react');
var ReactDOM = require('react-dom');
var testUtils = require('react-addons-test-utils');

describe('itemsHeader module',  function () {
  var ItemsHeader = require('../itemsHeader.react');

    it('has the right headings', function () {
      var expectedHeaderText = '1';
      var actualHeaderText = testUtils.renderIntoDocument('<table><ItemsHeader /></table>');
      expect(actualHeaderText).toEqual(expectedHeaderText);
    });
  });
