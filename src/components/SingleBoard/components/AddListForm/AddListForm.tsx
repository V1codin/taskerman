import AddButton from '@/modules/button/AddButton';
import ButtonWithLoader from '@/modules/button/ButtonWithLoader';
import CloseBtn from '@/modules/button/CloseBtn';

import { FormWrapper } from '@/modules/formWrapper/FormWrapper';
import { ChangeEvent, useState } from 'react';

type AddListFormProps = {
  boardId: string;
};

const AddListForm: React.FC<AddListFormProps> = ({ boardId }) => {
  const [isFormOpened, setOpenForm] = useState(false);
  const toggleForm = () => {
    setOpenForm((prev) => !prev);
  };

  const closeForm = () => {
    setOpenForm(() => false);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return isFormOpened ? (
    <FormWrapper
      submit={() => console.log('submit')}
      containerProps={{
        customWidth: '200px',
      }}
      formStyle={{
        padding: '10px',
      }}
    >
      <input
        type="text"
        name="list_name"
        className="input"
        placeholder="Enter the List title"
        onChange={changeHandler}
        autoFocus
      />
      <div className="add__list__btns">
        <ButtonWithLoader
          isLoading={false}
          attrs={{
            className: 'primary',
          }}
        >
          Add List
        </ButtonWithLoader>
        <CloseBtn
          attrs={{
            type: 'button',
            onClick: closeForm,
          }}
          styles={{
            position: 'static',
            marginLeft: '15px',
          }}
        />
      </div>
    </FormWrapper>
  ) : (
    <AddButton onClick={toggleForm} className="menu__btn flex_center" />
  );
};
export default AddListForm;
