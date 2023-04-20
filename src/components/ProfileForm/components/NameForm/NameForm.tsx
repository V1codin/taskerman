import ButtonWithLoader from '@/modules/button/ButtonWithLoader';

import { StyledInput, StyledInputContainer } from '../../styledProfile';
import { useAtom } from 'jotai';
import { ChangeEvent } from 'react';
import { userDisplayNameAtom } from '@/context/stateManager';

type NameFormProps = {};

const NameForm: React.FC<NameFormProps> = () => {
  const [displayName, setDisplayName] = useAtom(userDisplayNameAtom);

  const click = () => {};

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  return (
    <StyledInputContainer>
      <h3>Name</h3>
      <StyledInput
        type="text"
        value={displayName}
        name="displayName"
        onChange={changeHandler}
      />
      <ButtonWithLoader
        isLoading={false}
        attrs={{
          onClick: click,
          className: 'primary position_left',
        }}
      >
        Update
      </ButtonWithLoader>
    </StyledInputContainer>
  );
};

export default NameForm;
