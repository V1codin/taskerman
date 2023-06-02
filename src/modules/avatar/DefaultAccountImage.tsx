type DefaultAccountImageProps = {
  userAliases: {
    displayName?: string;
    username?: string;
  };
};

const DefaultAccountImage: React.FC<DefaultAccountImageProps> = ({
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
      className="flex
      text-center
      justify-center 
      items-center 
      text-lg 
      rounded-[50%] 
      w-full h-full text-yellow"
    >
      {content}
    </div>
  );
};

export default DefaultAccountImage;
