import ButtonWithLoader from '@/modules/button/ButtonWithLoader';
import ClipBoardButton from '@/modules/button/ClipBoardButton';

import { StyledInput, StyledInputContainer } from '../../styledProfile';
import { getDataFromClipBoard } from '@/utils/helpers';
import { useToast } from '@/hooks/hooks';
import { ChangeEvent, useLayoutEffect, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { getSetUserStateAtom, userImageAtom } from '@/context/stateManager';
import { updateUser } from '@/utils/api/auth';

import type { MouseEvent } from 'react';

type AvatarFormProps = {};

const AvatarForm: React.FC<AvatarFormProps> = () => {
  const image = useAtomValue(userImageAtom);
  const setUser = useSetAtom(getSetUserStateAtom);
  const [state, setState] = useState(image || '');
  const { setToast } = useToast();
  const [loader, setLoader] = useState(false);

  useLayoutEffect(() => {
    if (image) {
      setState(image);
    }
  }, [image]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const click = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!state) {
      setToast({
        message: 'Avatar input should not be empty',
        typeClass: 'warning',
      });

      return;
    }

    try {
      setLoader(true);

      const response = await updateUser({
        imageURL: state,
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

  const clipboardClick = async () => {
    try {
      const link = await getDataFromClipBoard();
      setState(link);
    } catch (e) {
      setToast({
        message: e as string,
        typeClass: 'warning',
      });
    }
  };

  return (
    <StyledInputContainer>
      <h3>Avatar</h3>
      <StyledInput
        type="text"
        value={state}
        name="imageURL"
        onChange={changeHandler}
      />
      <div className="flex position_left">
        <ClipBoardButton
          click={clipboardClick}
          buttonName="link"
          className="mr_10"
        />
        <ButtonWithLoader
          isLoading={loader}
          spinnerSize="s"
          attrs={{
            disabled: loader,
            type: 'submit',
            onClick: click,
            className: 'primary',
          }}
        >
          Update
        </ButtonWithLoader>
      </div>
    </StyledInputContainer>
  );
};

export default AvatarForm;
