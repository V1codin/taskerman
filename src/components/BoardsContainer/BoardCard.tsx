// @ts-ignore
import deleteIco from '@/assets/plus.svg?url';
import Router from 'next/router';
import ImageModule from '@/modules/image/Image';

type BoardCardProps = {
  _id: string;
  bgChecker: boolean;
  title: string;
  bg: string;
};

const BoardCard: React.FC<BoardCardProps> = ({ _id, bgChecker, bg, title }) => {
  const deleteBoard = () => {};

  const redirectToBoard = () => {
    Router.push(`/board/${_id}`);
  };
  return (
    <div
      className="board__card colored"
      style={
        bgChecker
          ? {
              backgroundImage: `url(${bg})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }
          : { background: bg }
      }
      title={title}
    >
      <button className="close__btn" onClick={deleteBoard} name={_id}>
        <ImageModule
          src={deleteIco}
          alt="delete"
          className="menu__ico"
          title="Delete the board"
          draggable={false}
        />
      </button>
      <button
        className="form__btn card__btn"
        title="Go to the board"
        onClick={redirectToBoard}
      >
        {title}
      </button>
    </div>
  );
};
export default BoardCard;
