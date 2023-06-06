// @ts-ignore
import link from '@/assets/link.svg?url';
import ButtonWithLoader from '@/modules/button/ButtonWithLoader';
import ColorPicker from '@/components/ColorPicker/ColorPicker';

import { FormWrapper } from '@/modules/formWrapper/FormWrapper';
import { STANDARD_BG } from '@/utils/constants';
import {
  ChangeEvent,
  useState,
  SyntheticEvent,
  BaseSyntheticEvent,
  CSSProperties,
  useCallback,
} from 'react';
import { getDataFromClipBoard } from '@/utils/helpers';
import {
  getSetBoardsState,
  getSetToastState,
  getSetUserStateAtom,
} from '@/context/stateManager';
import { useAtomValue, useSetAtom } from 'jotai';
import { api } from '@/utils/api/api';

type CreateBoardModalProps = {};

const defaultFormState = {
  bg: STANDARD_BG,
  title: '',
  link: '',
  style: {},
};

const CreateBoardForm: React.FC<CreateBoardModalProps> = () => {
  const [form, setForm] = useState<{
    bg: string;
    title: string;
    link: string;
    style: CSSProperties;
  }>(defaultFormState);

  const user = useAtomValue(getSetUserStateAtom);
  const setToast = useSetAtom(getSetToastState);
  const [isLoading, setIsLoading] = useState(false);
  const updateBoards = useSetAtom(getSetBoardsState);

  const updateForm = useCallback(
    (name: keyof typeof form, value: string) => {
      const formValue = form[name];
      if (formValue !== value) {
        setForm((prev) => {
          const customBgStyle =
            name === 'bg' && value !== ''
              ? {
                  backgroundColor: value,
                }
              : prev.style;
          return {
            ...prev,
            [name]: value,
            style: customBgStyle,
          };
        });
      }
    },
    [form],
  );

  const changeHandlerClick = useCallback(
    async (e: SyntheticEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const name = e.currentTarget.name as keyof typeof form;
      const value = e.currentTarget.value;

      if (name === 'link') {
        try {
          const link = await getDataFromClipBoard();
          const customBgStyle = {
            backgroundImage: `url(${link})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          };
          setForm({
            ...form,
            bg: link,
            link,
            style: customBgStyle,
          });
        } catch (e) {
          setToast({
            message: e as string,
            typeClass: 'warning',
          });
        }
        return;
      }

      updateForm(name, value);
    },
    [updateForm, form, setToast],
  );

  const changeHandler = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      const name = e.target.name as keyof typeof form;
      const value = e.target.value;

      updateForm(name, value);
    },
    [updateForm],
  );

  const createBoardHandler = useCallback(
    async (e: BaseSyntheticEvent) => {
      e.preventDefault();
      try {
        if (!user) {
          throw new Error('Please log into your account');
        }

        if (!form.title) {
          throw new Error('Title is required');
        }

        setIsLoading(true);

        const result = await api.create('board', {
          bg: form.bg,
          members: [],
          pendingMembers: [],
          title: form.title,
          owner: user?.id!,
        });

        setForm(defaultFormState);
        updateBoards((state) => {
          const newState = [...state, result.data];

          return newState;
        });

        setToast({
          typeClass: 'notification',
          message: `Board titled : ${result.data.title} was created`,
        });
      } catch (e) {
        setToast({
          typeClass: 'warning',
          message: e instanceof Error ? e.message : 'Unexpected error',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [user, form.title, form.bg, updateBoards, setToast],
  );

  return (
    <FormWrapper submit={createBoardHandler} styles={form.style}>
      <h3 className="text-bright-green text-lg font-bold">Add board</h3>
      <input
        type="text"
        name="title"
        className="text-white bg-alpha-black 
        w-full p-2 mt-2 
        text-[0.9em]
        border-b
        border-b-yellow border-solid outline-none 
        invalid:border-b-red-600
        focus:border-b-pale-blue
        focus:placeholder:text-yellow
        hover:placeholder:text-pale-bright-green
        placeholder:text-[#757575]"
        placeholder="Enter board title"
        value={form.title}
        onChange={changeHandler}
        style={{
          backgroundColor: '#333333a1',
        }}
        required
        autoFocus
      />
      <ColorPicker
        changeHandlerClick={changeHandlerClick}
        changeHandler={changeHandler}
      />
      <ButtonWithLoader
        isLoading={isLoading}
        classNames="rounded-md w-full h-11 bg-pale-green 
        text-yellow mt-4 font-bold 
        hover:bg-pale-bright-green 
        active:bg-yellow 
        active:text-monokai
        disabled:active:text-[#ffffff49]
        "
        attrs={{
          type: 'submit',
          disabled: form.title === '' || isLoading,
        }}
      >
        Create Board
      </ButtonWithLoader>
    </FormWrapper>
  );
};

export default CreateBoardForm;
