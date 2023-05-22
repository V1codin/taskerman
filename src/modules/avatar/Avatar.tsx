import DefaultAccountImage from './DefaultAccountImage';
import ImageModule from '../image/Image';

type AvatarProps = {
  imageURL?: string;
  displayName?: string;
  username?: string;
  avatarWidth?: number;
  avatarHeight?: number;
  className?: string;
};

const Avatar: React.FC<AvatarProps> = ({
  imageURL,
  displayName,
  username,
  className,
  avatarWidth = 36,
  avatarHeight = 36,
}) => {
  return imageURL ? (
    <ImageModule
      src={imageURL}
      width={avatarWidth}
      height={avatarHeight}
      className={className}
      alt="User avatar"
      title={displayName}
    />
  ) : (
    <DefaultAccountImage userAliases={{ displayName, username }} />
  );
};

export default Avatar;
