function getListOfItemIds(items) {
  return Object.keys(items);
}
function getNumberOfItems(items) {
  var listOfItemIds = getListOfItemIds(items);

  return listOfItemIds.length;
}

function isEmptyItems(items) {
  return (getNumberOfItems(items) == 0);
}

module.exports = {
  getListOfItemIds: getListOfItemIds,
  getNumberOfItems: getNumberOfItems,
  isEmptyItems: isEmptyItems
};
