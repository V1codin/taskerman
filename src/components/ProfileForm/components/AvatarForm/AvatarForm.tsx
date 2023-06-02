'use client';

import ButtonWithLoader from '@/modules/button/ButtonWithLoader';
import ClipBoardButton from '@/modules/button/ClipBoardButton';

import { getDataFromClipBoard } from '@/utils/helpers';
import { ChangeEvent, useLayoutEffect, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { getSetUserStateAtom, userImageAtom } from '@/context/stateManager';
import { api } from '@/utils/api/api';

import type { MouseEvent } from 'react';
import { useToast } from '@/hooks/useToast';

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

    if (!state || !state.trim()) {
      setToast({
        message: 'Avatar input should not be empty',
        typeClass: 'warning',
      });

      return;
    }

    try {
      setLoader(true);

      const response = await api.update('user', {
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
      setUser((prev) => {
        if (prev) {
          return {
            ...prev,
            imageURL: link,
          };
        } else {
          return prev;
        }
      });
    } catch (e) {
      setToast({
        message: e as string,
        typeClass: 'warning',
      });
    }
  };

  return (
    <form
      className="mt-4 flex 
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
      "
    >
      <h3
        className="w-full text-center
        text-lg
        font-bold 
        p-1
        rounded-md 
        bg-black-aqua"
      >
        Avatar
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
        laptop:pr-12
        "
        type="text"
        value={state}
        name="imageURL"
        onChange={changeHandler}
      />
      <div className="flex items-end relative mt-2 mr-0 mb-0 ml-auto laptop:w-full">
        <ClipBoardButton
          classNames="mr-2 laptop:absolute 
          laptop:-top-[46px] laptop:right-1
          laptop:m-0
          "
          click={clipboardClick}
          buttonName="link"
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
          laptop:p-2"
          attrs={{
            disabled: loader,
            type: 'submit',
            onClick: click,
          }}
        >
          Update
        </ButtonWithLoader>
      </div>
    </form>
  );
};

export default AvatarForm;
