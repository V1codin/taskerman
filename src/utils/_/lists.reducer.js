import {
  LIST_DELETED,
  NEW_LIST_CREATED,
  GET_LISTS,
  GET_LISTS_AND_CARDS
} from '../utils/actions.types';

const init = [];

function lists(state = init, { type, payload, lists }) {
  switch (type) {
    case LIST_DELETED:
      // ? avoid re-renders if a list is deleted from non active board
      if (state[0] && state[0].boardId === payload.boardId) {
        return state.filter((list) => list._id !== payload._id);
      }
      return state;
    case GET_LISTS:
      return [...payload];
    case GET_LISTS_AND_CARDS:
      return [...lists];
    case NEW_LIST_CREATED:
      // ? avoid re-renders if a list is created from non active board
      if ((state[0] && state[0].boardId === payload.boardId) || state.length === 0) {
        return [...state, payload];
      }

      return state;
    default:
      return state;
  }
}

export { lists };
