import { Redirect } from "react-router-dom";
import { useAsync } from "react-async-hook";
import { connect } from "react-redux";

import { useBodyColor } from "../../../../hooks/hooks";
import { list } from "../../../../api/list.api";
import { card } from "../../../../api/card.api";
import { GET_LISTS_AND_CARDS } from "../../../../utils/actions.types";

import { Process } from "../../../../modules/process";
import { List } from "../../../List";

const mapStateToProps = (state, props) => {
  const { _boardId } = props;

  return {
    isLogged: state.auth.isLogged,
    localBoard: state.boards.find((item) => item._id === _boardId),
    lists: state.lists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

const ListsIterator = (props) => {
  const { lists } = props;
  return lists.map((list) => <List key={list._id} list={list} />);
};

function RawListsWrapper(props) {
  const { localBoard, dispatch, isLogged, lists, _boardId } = props;

  const { loading } = useAsync(
    async (id) => {
      try {
        const result = await Promise.all([
          list.find(id, dispatch),
          card.find(id, dispatch),
        ]);

        const [lists, cards] = result;

        dispatch({
          type: GET_LISTS_AND_CARDS,
          lists,
          cards,
        });
        return result;
      } catch (e) {
        throw e;
      }
    },
    [_boardId, dispatch]
  );

  useBodyColor(localBoard?.bg);

  if (localBoard === undefined || !isLogged) return <Redirect to="/" />;

  return (
    <>
      {loading ? (
        <Process isShown={loading} />
      ) : (
        <ListsIterator
          lists={lists.filter(({ boardId }) => boardId === _boardId)}
        />
      )}
    </>
  );
}

const ListsWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawListsWrapper);

export { ListsWrapper };
