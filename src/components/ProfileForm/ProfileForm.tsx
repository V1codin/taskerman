import NameForm from './components/NameForm/NameForm';
import AvatarForm from './components/AvatarForm/AvatarForm';
import Subs from './components/Subs/Subs';

import { StyledProfile, StyledColumn_1, StyledColumn_2 } from './styledProfile';

type ProfileFormProps = {};

const ProfileForm: React.FC<ProfileFormProps> = () => {
  return (
    <StyledProfile>
      <StyledColumn_1>
        <NameForm />
        <AvatarForm />
      </StyledColumn_1>
      <StyledColumn_2>
        <Subs />
      </StyledColumn_2>
    </StyledProfile>
  );
};

export default ProfileForm;
