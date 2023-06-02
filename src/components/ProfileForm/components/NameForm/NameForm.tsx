'use client';
import ButtonWithLoader from '@/modules/button/ButtonWithLoader';

import { useAtom, useSetAtom } from 'jotai';
import { useState } from 'react';
import {
  getSetUserStateAtom,
  userDisplayNameAtom,
} from '@/context/stateManager';
import { api } from '@/utils/api/api';
import { useToast } from '@/hooks/useToast';

import type { ChangeEvent } from 'react';
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
      <input
        className="mt-4 rounded-md 
        bg-alpha-black w-full
        font-light 
        text-white p-2 text-base 
        border-b 
        border-b-yellow 
        outline-none
        focus:border-b-pale-blue
        placeholder:text-[#757575]
        hover:border-b-pale-green
        hover:placeholder:text-yellow
        "
        type="text"
        placeholder="Enter your full name"
        value={displayName}
        name="displayName"
        onChange={changeHandler}
      />
      <ButtonWithLoader
        isLoading={loader}
        spinnerSize="w-[45px] h-auto"
        classNames="min-w-[79px] min-h-[33px] font-medium
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
