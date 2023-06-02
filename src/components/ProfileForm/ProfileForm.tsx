import cls from 'classnames';

import NameForm from './components/NameForm/NameForm';
import AvatarForm from './components/AvatarForm/AvatarForm';
import Subs from './components/Subs/Subs';

const defaultContainerClasses = `max-w-[950px] 
mx-auto my-0 grid 
grid-cols-2 gap-x-6 
laptop:block 
laptop:w-auto
laptop:px-10
laptop:py-0`;

type ProfileFormProps = {};

const ProfileForm: React.FC<ProfileFormProps> = () => {
  return (
    <div className={cls(defaultContainerClasses)}>
      <div className="col-span-1">
        <NameForm />
        <AvatarForm />
      </div>
      <div
        className="overflow-x-hidden 
        pb-64 mb-[-256px] col-span-1 
        laptop:overflow-x-visible 
        laptop:pb-0 laptop:mb-0 laptop:mt-4"
      >
        <Subs />
      </div>
    </div>
  );
};

export default ProfileForm;
