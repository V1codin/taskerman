import cls from 'classnames';
import Avatar from '@/modules/avatar/Avatar';

const defaultContainerClasses = cls(`w-10 h-10
flex justify-center items-center 
bg-monokai active:shadow-none active:bg-aqua-active
[&>img]:rounded-[50%] 
transition-[0.2s] duration-[ease] 
border rounded-[50%] 
border-dashed 
border-transparent 
hover:shadow-[0_0_15px_var(--blue)]
`);

type AccountProps = {
  imageURL?: string;
  displayName?: string;
  username?: string;
  classNames?: string;
  onToggle: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const Account: React.FC<AccountProps> = ({
  imageURL,
  displayName,
  username,
  classNames,
  onToggle,
}) => {
  return (
    <button
      className={cls(defaultContainerClasses, classNames)}
      name="account"
      onClick={onToggle}
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
