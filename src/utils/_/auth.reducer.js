import { LOGIN_ACTION, LOGOUT_ACTION } from "./actions.types";

const checker = false;

const init = {
  isLogged: checker,
  accessToken: "",
  authentication: {},
  user: {
    imageURL: "",
  },
};

function auth(state = init, { type, payload }) {
  switch (type) {
    case LOGIN_ACTION:
      return {
        ...state,
        ...payload,
        isLogged: true,
      };

    case LOGOUT_ACTION:
      return init;

    default:
      return state;
  }
}

export { auth };
