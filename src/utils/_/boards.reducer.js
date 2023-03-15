import {
  NEW_BOARD_CREATED,
  BOARD_DELETED,
  LOGIN_ACTION,
  LOGOUT_ACTION,
  BOARD_PATCHED,
} from "./actions.types";

const init = [];

function boards(state = init, { type, payload, boards = [] }) {
  switch (type) {
    case NEW_BOARD_CREATED:
      return [...state, payload];
    case BOARD_DELETED:
      return state.filter(({ _id }) => _id !== payload);
    case LOGIN_ACTION:
      return [...boards];
    case LOGOUT_ACTION:
      return init;
    case BOARD_PATCHED:
      return [payload, ...state.filter(({ _id }) => _id !== payload._id)];

    default:
      return state;
  }
}

export { boards };
