jest.dontMock('../itemsForm.react');

describe('Form button behaviour', function () {

  it('calls handler function on click', function () {
    var React = require('react');
    var ReactDOM = require('react-dom');
    var testUtils = require('react-addons-test-utils');
    var ItemsForm = require('../itemsForm.react');
    var handleContentSubmit = jest.genMockFunction();
    var itemsform = testUtils.renderIntoDocument(<ItemsForm onContentSubmit={function () {return handleContentSubmit()}.bind(this)} tag="form"/>);
    var inputs = testUtils.scryRenderedDOMComponentsWithTag(itemsform, "input");
    var form = testUtils.findRenderedDOMComponentWithTag(itemsform, "form");

    expect(inputs[0].value).toEqual('');
    expect(inputs[1].value).toEqual('');
    expect(inputs[1].value).toEqual('');
    testUtils.Simulate.submit(form);
    expect(handleContentSubmit).not.toBeCalled();

    inputs[0].value='haha';
    inputs[1].value='haha';
    inputs[2].value=2;
    expect(inputs[1].value).toEqual('haha');
    expect(inputs[2].value).toEqual('2');

    testUtils.Simulate.submit(form);

    expect(handleContentSubmit).toBeCalled();

    var numberOfCallsMadeIntoMockFunction = handleContentSubmit.mock.calls.length;

    expect(numberOfCallsMadeIntoMockFunction).toBe(1);
  });
});
