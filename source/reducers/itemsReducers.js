var itemsActions = require('../actions/itemsActions')

function items(state, action) {
  switch (action.type) {
    case itemsActions.ADD_ITEM:
      return {
        id: action.id,
        blabla: action.gugus
      }
      case itemsActions.REMOVE_ITEM:
        if (state.id !== action.id) {
          return setState
        }
        return {}
  }
}

module.exports = items;
