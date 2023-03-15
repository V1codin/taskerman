import { LOGIN_ACTION, LOGOUT_ACTION, NOTE_DISMISSED, NOTE_RECEIVED } from './actions.types';

const init = [];

function notes(state = init, { type, payload, notes = [] }) {
  switch (type) {
    case LOGIN_ACTION:
      return [...state, ...notes];
    case LOGOUT_ACTION:
      return init;

    case NOTE_DISMISSED:
      return state.filter(({ _id }) => _id !== payload._id);
    case NOTE_RECEIVED:
      return [...state, payload];
    default:
      return state;
  }
}

export { notes };
