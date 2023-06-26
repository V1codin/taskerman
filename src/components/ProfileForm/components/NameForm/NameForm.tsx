'use client';
import ButtonWithLoader from '@/modules/button/ButtonWithLoader';
import Input from '@/modules/input/Input';

import { useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';
import {
  getSetToastState,
  getSetUserStateAtom,
  userDisplayNameAtom,
} from '@/context/stateManager';
import { api } from '@/utils/api/api';

import type { ChangeEvent } from 'react';
import type { MouseEvent } from 'react';

type NameFormProps = {};

const NameForm: React.FC<NameFormProps> = () => {
  const displayName = useAtomValue(userDisplayNameAtom);
  const [localDisplayName, setLocalDisplayName] = useState(displayName);
  const setUser = useSetAtom(getSetUserStateAtom);
  const setToast = useSetAtom(getSetToastState);
  const [loader, setLoader] = useState(false);

  const click = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (localDisplayName === displayName) return;

    if (!localDisplayName || !localDisplayName.trim()) {
      setToast({
        message: 'Name input should not be empty',
        typeClass: 'warning',
      });

      return;
    }

    try {
      setLoader(true);

      const response = await api.update('user', {
        displayName: localDisplayName,
      });
      setUser(response.updatedUser);
      setToast({
        typeClass: 'notification',
        message: 'Name was successfully updated',
      });
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
    setLocalDisplayName(e.target.value);
  };

  return (
    <form
      className="flex 
    flex-col 
    justify-start 
    items-center
    after:content-['']
    after:block
    after:w-[105%]
    after:h-4
    after:border-b
    after:border-l
    after:border-r
    after:border-pale-blue
    laptop:m-0
    "
    >
      <h3
        className="w-full text-center
      text-lg
      font-bold 
      p-1
      rounded-md 
      bg-black-aqua
      "
      >
        Name
      </h3>
      <Input
        classNames="mt-4"
        attrs={{
          placeholder: 'Enter your full name',
          value: localDisplayName,
          name: 'displayName',
          onChange: changeHandler,
        }}
      />
      <ButtonWithLoader
        isLoading={loader}
        spinnerSize="w-[45px] h-auto"
        classNames="min-w-[79px] min-h-[34px] font-medium
        designed
        rounded-md
        py-1 px-3
        mt-2
        mr-0
        mb-0
        ml-auto
        bg-[#42a185]
        text-white
        hover:bg-[#42c185]
        disabled:hover:!bg-none
        disabled:shadow-none
        active:shadow-none
        laptop:w-full
        laptop:p-2
        "
        attrs={{
          disabled: loader,
          type: 'submit',
          onClick: click,
        }}
      >
        Update
      </ButtonWithLoader>
    </form>
  );
};

export default NameForm;
