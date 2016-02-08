const itemsActions ={
  ADD_ITEM: 'ADD_ITEM',
  CLICK_ITEM_FIELD: 'CLICK_ITEM_FIELD',
  REMOVE_ITEM: 'REMOVE_ITEM',
  EDIT_ITEM: 'EDIT_ITEM'
}

function addItem(item) {
  return { type: ADD_ITEM, item}
}
function clickItemField(itemField) {
  return { type: CLICK_ITEM_FIELD, itemField }
}
function removeItem(id) {
  return { type: REMOVE_ITEM, id }
}
exports.itemsActions = itemsActions;
exports.addItem = addItem
exports. clickItemField = clickItemField
exports.removeItem = removeItem
