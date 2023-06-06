import cls from 'classnames';

type DefaultAccountImageProps = {
  classNames?: string;
  userAliases: {
    displayName?: string;
    username?: string;
  };
};

const DefaultAccountImage: React.FC<DefaultAccountImageProps> = ({
  classNames,
  userAliases: { displayName, username },
}) => {
  const content = displayName
    ? displayName.split(' ').reduce((acc, item) => {
        acc += item[0];

        return acc;
      }, '')
    : username
    ? username.split(' ').reduce((acc, item) => {
        acc += item[0];

        return acc;
      }, '')
    : 'N A';

  return (
    <div
      className={cls(
        `flex
        text-center
        justify-center 
        items-center 
        rounded-[50%] 
        w-full h-full text-yellow`,
        classNames,
      )}
    >
      {content}
    </div>
  );
};

export default DefaultAccountImage;
