import { Service } from "./service.api";
import { listsService } from "./feathers.api";

class List extends Service {
  create = async (props, dispatch, ...callbacks) => {
    try {
      const payload = await listsService.create(props);

      callbacks.forEach((cb) => {
        if (typeof cb === "function") {
          cb(payload);
        }
      });

      return payload;
    } catch (e) {
      console.log("create a list error", e);
      const errorFromHandler = this.handleError(e, dispatch);
      throw errorFromHandler;
    }
  };
  find = async (props, dispatch, ...callbacks) => {
    try {
      const response = await listsService.find({ query: { props } });

      callbacks.forEach((cb) => {
        if (typeof cb === "function") {
          cb(response.data);
        }
      });

      return response.data;
    } catch (e) {
      console.log("find a list error", e);
      const errorFromHandler = this.handleError(e, dispatch);
      throw errorFromHandler;
    }
  };
  delete = async (id, dispatch, ...callbacks) => {
    try {
      await listsService.remove({ _id: id });

      callbacks.forEach((cb) => {
        if (typeof cb === "function") {
          cb(id);
        }
      });

      return id;
    } catch (e) {
      console.log("delete list error", e);
      const errorFromHandler = this.handleError(e, dispatch);
      throw errorFromHandler;
    }
  };
}

const list = new List();

export { list };
