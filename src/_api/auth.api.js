import { Service } from "./service.api";
import { client, userService } from "./feathers.api";

import { board } from "./board.api";
import { note } from "./notification.api";

import { LOGIN_ACTION, LOGOUT_ACTION } from "../utils/actions.types";
import { STRATEGY } from "../utils/constants";

class Auth extends Service {
  login = async (loginPayload, dispatch, ...callbacks) => {
    try {
      const payload = await client.authenticate({
        strategy: STRATEGY,
        ...loginPayload,
      });

      const [boards, notes] = await Promise.all([board.find(), note.find()]);

      callbacks.forEach((cb) => {
        if (typeof cb === "function") {
          cb(payload, boards.data);
        }
      });

      dispatch({
        type: LOGIN_ACTION,
        payload,
        boards: boards.data,
        notes: notes.data,
      });

      return payload;
    } catch (e) {
      const errorFromHandler = this.handleError(e, dispatch);
      throw errorFromHandler;
    }
  };

  logout = async (dispatch) => {
    try {
      const res = await client.logout();

      dispatch({
        type: LOGOUT_ACTION,
      });

      return res;
    } catch (e) {
      const errorFromHandler = this.handleError(e, dispatch);
      throw errorFromHandler;
    }
  };

  create = async (props) => {
    try {
      const res = await userService.create({ ...props, strategy: STRATEGY });

      return res;
    } catch (e) {
      const errorFromHandler = this.handleError(e);
      throw errorFromHandler;
    }
  };

  loginFromCache = async (dispatch) => {
    const token = window.localStorage.getItem("feathers-jwt");

    if (typeof token === "string" && token.length > 0) {
      try {
        const [payload, boards, notes] = await Promise.all([
          client.reAuthenticate(),
          board.find(),
          note.find(),
        ]);

        dispatch({
          type: LOGIN_ACTION,
          payload,
          boards: boards.data,
          notes: notes.data,
        });
      } catch (e) {
        console.log(this.handleError(e));
      }
    }
  };

  getBoardMembersInfo = async (arr = [], ...callbacks) => {
    try {
      const { data } = await userService.find({ query: { _id: { $in: arr } } });

      callbacks.forEach((cb) => {
        if (typeof cb === "function") {
          cb(data);
        }
      });

      return data;
    } catch (e) {
      const errorFromHandler = this.handleError(e);
      throw errorFromHandler;
    }
  };

  getUsersFromRegex = async (regex = "", ...callbacks) => {
    try {
      const { data } = await userService.find({
        query: { nameAlias: { $regex: regex, $options: "gi" } },
      });

      callbacks.forEach((cb) => {
        if (typeof cb === "function") {
          cb(data);
        }
      });

      return data;
    } catch (e) {
      const errorFromHandler = this.handleError(e);
      throw errorFromHandler;
    }
  };
}

const auth = new Auth();

export { auth };
