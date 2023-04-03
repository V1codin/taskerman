// @ts-ignore
import link from '@/assets/link.svg?url';
import ButtonWithLoader from '@/modules/button/ButtonWithLoader';
import DefaultColorPickerButtons from './components/CreateBoard/DefaultColorPickerButtons';

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
import { useToast } from '@/hooks/hooks';
import { createBoard } from '@/utils/api/boards';
import { useSession } from 'next-auth/react';
import { useSetAtom } from 'jotai';
import { getSetBoardsState } from '@/context/stateManager';

type CreateBoardModalProps = {};

const defaultFormState = {
  bg: STANDARD_BG,
  title: '',
  link: '',
  style: {},
};

const CreateBoardModal: React.FC<CreateBoardModalProps> = () => {
  const [form, setForm] = useState<{
    bg: string;
    title: string;
    link: string;
    style: CSSProperties;
  }>(defaultFormState);

  const { setToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { data, status } = useSession();
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
        if (status !== 'authenticated') {
          throw new Error('Please log into your account');
        }

        setIsLoading(true);
        const result = await createBoard({
          bg: form.bg,
          members: [],
          pendingMembers: [],
          title: form.title,
          ownerId: data?.user.id!,
        });

        setToast({
          typeClass: 'notification',
          message: `Board ${result.data.title} was created`,
        });
        setForm(defaultFormState);
        updateBoards(result.data);
      } catch (e) {
        setToast({
          typeClass: 'warning',
          message: e instanceof Error ? e.message : 'Unexpected error',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [data?.user.id, form.bg, form.title, setToast, status, updateBoards],
  );

  return (
    <FormWrapper submit={createBoardHandler} formStyle={form.style}>
      <h3 className="heading">Add board</h3>
      <input
        type="text"
        name="title"
        className="input"
        placeholder="Enter board title"
        value={form.title}
        onChange={changeHandler}
        style={{
          backgroundColor: '#333333a1',
        }}
        required
        autoFocus
      />
      <DefaultColorPickerButtons
        changeHandlerClick={changeHandlerClick}
        changeHandler={changeHandler}
      />
      <ButtonWithLoader
        isLoading={isLoading}
        attrs={{
          className: 'btn',
          type: 'submit',
          disabled: form.title === '',
        }}
      >
        Create Board
      </ButtonWithLoader>
    </FormWrapper>
  );
};
export default CreateBoardModal;
