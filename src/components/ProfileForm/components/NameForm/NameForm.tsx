import ButtonWithLoader from '@/modules/button/ButtonWithLoader';

import { StyledInput, StyledInputContainer } from '../../styledProfile';
import { useAtom, useSetAtom } from 'jotai';
import { ChangeEvent, useState } from 'react';
import {
  getSetUserStateAtom,
  userDisplayNameAtom,
} from '@/context/stateManager';
import { useToast } from '@/hooks/hooks';
import { api } from '@/utils/api/api';

import type { MouseEvent } from 'react';

type NameFormProps = {};

const NameForm: React.FC<NameFormProps> = () => {
  const [displayName, setDisplayName] = useAtom(userDisplayNameAtom);
  const setUser = useSetAtom(getSetUserStateAtom);
  const { setToast } = useToast();
  const [loader, setLoader] = useState(false);

  const click = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!displayName || !displayName.trim()) {
      setToast({
        message: 'Name input should not be empty',
        typeClass: 'warning',
      });

      return;
    }

    try {
      setLoader(true);

      const response = await api.update('user', {
        displayName,
      });

      setUser(response.updatedUser);

      setLoader(false);
    } catch (e) {
      setLoader(false);
      setToast({
        message: 'Failed to update user',
        typeClass: 'conflict',
      });
    }
  };

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
        isLoading={loader}
        spinnerSize="s"
        attrs={{
          disabled: loader,
          type: 'submit',
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
