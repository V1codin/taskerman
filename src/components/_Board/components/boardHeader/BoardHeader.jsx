const BoardHeader: React.FC<BoardHeaderProps> = ({ _boardId }) => {
  return (
    <section className="boards__header">
      <div className="header__wrapper card_design">
        <h4 className="unselectable" title="Board name">
          {title}
        </h4>
        <span className="span_divider"></span>
        <SubscribersSection subs={subs} ownerId={ownerId} />
        <span className="span_divider"></span>
        {currentUser === ownerId ? (
          <Invite ownerId={ownerId} boardId={_id} />
        ) : null}
      </div>
    </section>
  );
};
export default BoardHeader;

/*
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import { auth } from "../../../../api/auth.api";

import { Invite } from "./invite";
import { Avatar } from "../../../../modules/avatar";

import ownerIco from "../../../../assets/owner.svg";

const mapStateToProps = (state, props) => {
  const { _boardId } = props;
  const localBoard = state.boards.find((item) => item._id === _boardId) || {};
  const currentUser = state.auth.user._id;

  return {
    localBoard,
    currentUser,
  };
};

const SubscribersSection = (props) => {
  const { subs, ownerId } = props;

  return (
    <section className="subsSection">
      {subs.map(({ _id, imageURL, displayName }) => {
        if (_id === ownerId) {
          return (
            <section className="avatar__container" key={_id + Math.random()}>
              <Avatar
                imgLink={imageURL}
                name={`${displayName} owner`}
                size={25}
              />
              <img src={ownerIco} className="avatar__ico" alt="owner" />
            </section>
          );
        }

        return (
          <Avatar
            key={_id + Math.random()}
            imgLink={imageURL}
            name={displayName}
            size={25}
          />
        );
      })}
    </section>
  );
};

function RawBoardHeader(props) {
  const {
    currentUser,
    localBoard,
    localBoard: { title, memberIds, ownerId, _id },
  } = props;

  const [subs, setSubs] = useState([]);

  useEffect(() => {
    const getMembersInfo = async (memberIds, ownerId) => {
      if (memberIds && ownerId) {
        try {
          const data = await auth.getBoardMembersInfo([ownerId, ...memberIds]);

          setSubs(() => data);
        } catch (e) {
          console.error("get boar members info error", e);
        }
      }
    };

    getMembersInfo(memberIds, ownerId);

    return () => setSubs([]);

    // eslint-disable-next-line
  }, [memberIds]);

  if (!localBoard) return null;

  return (
    <section className="boards__header">
      <div className="header__wrapper card_design">
        <h4 className="unselectable" title="Board name">
          {title}
        </h4>
        <span className="span_divider"></span>
        <SubscribersSection subs={subs} ownerId={ownerId} />
        <span className="span_divider"></span>
        {currentUser === ownerId ? (
          <Invite ownerId={ownerId} boardId={_id} />
        ) : null}
      </div>
    </section>
  );
}

const BoardHeader = connect(mapStateToProps, null)(RawBoardHeader);

export { BoardHeader };
*/
