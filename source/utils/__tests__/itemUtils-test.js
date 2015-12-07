jest.dontMock('../itemUtils');

describe('item utitilities module',  function () {
  var itemUtils = require('../itemUtils');
  var itemMock = {1: {},2: {},3: {},4: {}};
    it('returns an array of item ids', function () {
      var expectedListOfItemIds = ['1','2','3','4'];
      var actualListOfItemIds = itemUtils.getListOfItemIds(itemMock);
      expect(actualListOfItemIds).toEqual(expectedListOfItemIds);
    });
    it('there are four items', function () {
      var expectedNumberOfItems = 4;
      var actualNumberOfItems = itemUtils.getNumberOfItems(itemMock);
      expect(actualNumberOfItems).toBe(expectedNumberOfItems);
    });
    it('is not empty', function () {
      var expectedBooleanValue = false;
      var actualBooleanValue = itemUtils.isEmptyItems(itemMock);
      expect(actualBooleanValue).toBe(expectedBooleanValue);
    });
  });
