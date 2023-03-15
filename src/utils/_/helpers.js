import {
  boardsService,
  listsService,
  cardsService,
  notificationsService,
} from "../api/feathers.api";
import {
  NEW_BOARD_CREATED,
  BOARD_DELETED,
  BOARD_PATCHED,
  NEW_LIST_CREATED,
  LIST_DELETED,
  CARD_DELETED,
  NEW_CARD_CREATED,
  CARD_PATCHED,
  NOTE_DISMISSED,
  NOTE_RECEIVED,
} from "../utils/actions.types";

const isLink = (background) => {
  return /^https:\/\/images\.unsplash\.com\/.{1,}/g.test(background);
};

const isImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.src = src;

    img.onload = () => resolve(src);

    img.onerror = (e) => {
      reject("Your link has no image");
    };
  });
};

const getDataFromClipBoard = async () => {
  try {
    const link = await navigator.clipboard.readText();
    if (!isLink(link)) return Promise.reject("Your link has no image");

    const result = await isImage(link);
    return result;
  } catch (e) {
    console.log("e: ", e);
    throw e;
  }
};

const isPropInObject = (prop, obj) => prop in obj;

const addListenersForServerChanges = (dispatch) => {
  /*
  ? server has channels for publish events below
  ? every user joins to his own channel (by user id)
  ? and channels (if there are some) from users SUBS
  ? after login
  */

  // ? avoiding re render after any creation of any user

  // ? events for updating data in case of subscription

  notificationsService.on("created", (payload) => {
    dispatch({
      type: NOTE_RECEIVED,
      payload,
    });
  });

  notificationsService.on("removed", (payload) => {
    dispatch({
      type: NOTE_DISMISSED,
      payload,
    });
  });

  boardsService.on("patched", (payload) => {
    dispatch({
      type: BOARD_PATCHED,
      payload,
    });
  });

  boardsService.on("created", (payload) => {
    dispatch({
      type: NEW_BOARD_CREATED,
      payload,
    });
  });

  boardsService.on("removed", ({ _id }) => {
    dispatch({
      type: BOARD_DELETED,
      payload: _id,
    });
  });

  listsService.on("created", (payload) => {
    dispatch({
      type: NEW_LIST_CREATED,
      payload,
    });
  });

  listsService.on("removed", (payload) => {
    dispatch({
      type: LIST_DELETED,
      payload,
    });
  });

  /*
  TODO suggestion
  ? get a new card/list 
  ? for every changed data (action type GET_LISTS/GET_CARDS)
  ? instead of
  */

  cardsService.on("removed", ({ _id, listId }) => {
    dispatch({
      type: CARD_DELETED,
      payload: { _id, listId },
    });
  });

  cardsService.on("created", (payload) => {
    dispatch({
      type: NEW_CARD_CREATED,
      payload,
    });
  });

  cardsService.on("patched", (payload) => {
    dispatch({
      type: CARD_PATCHED,
      payload,
    });
  });
};

const errorDisplay = (stateFn, timer = 1000, ...args) => {
  stateFn(...args);

  const time = setTimeout(() => {
    stateFn(null);
  }, timer);

  return () => {
    clearTimeout(time);
    stateFn(null);
  };
};

const isTrueSearchPath = (path) => {
  return /\/?code=4.+/g.test(path);
};

class CustomUrlSearchParams {
  constructor(query) {
    this.query = query;
  }
  getSearchObject = () => {
    const { query } = this;
    return query
      ? (/^[?#]/.test(query) ? query.slice(1) : query)
          .split("&")
          .reduce((params, param) => {
            let [key, value] = param.split("=");
            params[key] = value
              ? decodeURIComponent(value.replace(/\+/g, " "))
              : "";
            return params;
          }, {})
      : {};
  };
  getAll = () => {
    const searchParams = this.getSearchObject();
    return searchParams;
  };
  get = (param) => {
    const searchParams = this.getSearchObject();
    return searchParams[param];
  };
  setUrl = (param, value) => {
    const searchParams = this.getSearchObject();
    searchParams[param] = value;
    return Object.keys(searchParams)
      .map((key) => key + "=" + searchParams[key])
      .join("&");
  };
}

export {
  isTrueSearchPath,
  isLink,
  getDataFromClipBoard,
  isPropInObject,
  addListenersForServerChanges,
  errorDisplay,
  CustomUrlSearchParams,
};
