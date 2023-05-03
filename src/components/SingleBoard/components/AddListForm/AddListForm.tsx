import AddButton from '@/modules/button/AddButton';
import ButtonWithLoader from '@/modules/button/ButtonWithLoader';
import CloseButton from '@/modules/button/CloseButton';

import { useToast } from '@/hooks/hooks';
import { FormWrapper } from '@/modules/formWrapper/FormWrapper';
import { createList } from '@/utils/api/lists';
import { ChangeEvent, FormEvent, useState } from 'react';
import { StyledButtonsContainer } from './styledAddListForm';
import { useSetAtom } from 'jotai';
import { addListOfSingleBoardState } from '@/context/stateManager';

type AddListFormProps = {
  boardId: string;
};

const AddListForm: React.FC<AddListFormProps> = ({ boardId }) => {
  const [isFormOpened, setOpenForm] = useState(false);
  const [loader, setLoader] = useState(false);
  const [title, setTitle] = useState('');
  const { setToast } = useToast();
  const updateBoards = useSetAtom(addListOfSingleBoardState);

  const toggleForm = () => {
    setOpenForm((prev) => !prev);
  };

  const closeForm = () => {
    setOpenForm(() => false);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const addList = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!title) {
      setToast({
        message: 'List title can not be empty',
        typeClass: 'warning',
      });

      return;
    }

    try {
      setLoader(true);

      const result = await createList({
        title,
        board: boardId,
      });

      setTitle('');
      updateBoards(result.data);

      setToast({
        typeClass: 'notification',
        message: `List titled : ${result.data.title} was created`,
      });
    } catch (e) {
      setToast({
        typeClass: 'warning',
        message: e instanceof Error ? e.message : 'Unexpected error',
      });
    } finally {
      setLoader(false);
    }
  };

  return isFormOpened ? (
    <FormWrapper
      submit={addList}
      containerProps={{
        customWidth: '200px',
      }}
      formStyle={{
        padding: '10px',
        marginLeft: '15px',
      }}
    >
      <input
        value={title}
        type="text"
        name="list_name"
        className="input"
        placeholder="Enter the List title"
        onChange={changeHandler}
        autoFocus
      />
      <StyledButtonsContainer>
        <ButtonWithLoader
          isLoading={loader}
          attrs={{
            disabled: loader,
            className: 'primary',
            type: 'submit',
          }}
          spinnerSize="s"
        >
          Add List
        </ButtonWithLoader>
        <CloseButton
          attrs={{
            type: 'button',
            onClick: closeForm,
          }}
          styles={{
            position: 'static',
            marginLeft: '15px',
          }}
        />
      </StyledButtonsContainer>
    </FormWrapper>
  ) : (
    <AddButton
      onClick={toggleForm}
      className="menu__btn flex_center"
      attrs={{
        style: {
          marginLeft: '15px',
        },
      }}
    />
  );
};

export default AddListForm;
