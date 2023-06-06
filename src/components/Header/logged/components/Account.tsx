import cls from 'classnames';
import Avatar from '@/modules/avatar/Avatar';

const defaultContainerClasses = `w-[2.4rem] h-[2.4rem]
flex justify-center items-center 
active:shadow-none 
[&>img]:rounded-[50%] 
transition-[0.2s] duration-[ease] 
border rounded-[50%] 
border-dashed 
border-transparent 
hover:shadow-[0_0_15px_var(--blue)]
`;

type AccountProps = {
  imageURL?: string;
  displayName?: string;
  username?: string;
  classNames?: string;
  onToggle: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  doubleClick?: () => void;
};

const Account: React.FC<AccountProps> = ({
  imageURL,
  displayName,
  username,
  classNames,
  onToggle,
  doubleClick,
}) => {
  return (
    <button
      className={cls(
        defaultContainerClasses,
        {
          'bg-monokai': !imageURL,
          'active:bg-aqua-active': !imageURL,
        },
        classNames,
      )}
      name="account"
      onClick={onToggle}
      onDoubleClick={doubleClick}
      data-drop-type="account"
    >
      <Avatar
        displayName={displayName}
        imageURL={imageURL}
        username={username}
        avatarHeight={36}
        avatarWidth={36}
        className="h-9"
      />
    </button>
  );
};

export default Account;
