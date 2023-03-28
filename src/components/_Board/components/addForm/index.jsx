import AwesomeDebouncePromise from 'awesome-debounce-promise';

import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useAsyncCallback } from 'react-async-hook';

import { useAddForm } from '../../../../hooks/hooks';
import { list } from '../../../../api/list.api';

import { FormWrapper } from '../../../../modules/formWrapper';
import { Button } from '../../../../modules/button';

import plus from '../../../../assets/plus.svg';

const FormBody = memo((props) => {
  const {
    inputPlaceholder,
    changeHandler,
    submit,
    closeFn,
    btnText,
    loading,
    btnClassList,
    classList
  } = props;

  return (
    <>
      <input
        type="text"
        name="list_name"
        className="form__input add__list__input"
        placeholder={inputPlaceholder}
        onChange={changeHandler}
        autoFocus
      />
      <div className="add__list__btns">
        <Button {...{ submit, btnText, loading, btnClassList, classList }} />
        <Button {...{ type: 'closeBtn', submit: closeFn }} />
      </div>
    </>
  );
});

function AddForm(props) {
  const { _boardId } = props;

  const { isAddForm, formToggle, changeHandler, formState } = useAddForm({
    className: 'add__list__form',
    name: '',
    boardId: _boardId
  });

  const dispatch = useDispatch();

  const createListHandler = async (e) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    if (formState.name === '' || formState.name === ' ') return;

    try {
      await list.create(formState, dispatch);
      formToggle();
    } catch (e) {
      console.log('create lists error', e);
    }
  };

  const debouncedRequest = AwesomeDebouncePromise(createListHandler, 1000);

  const { execute, loading } = useAsyncCallback(debouncedRequest);

  const bodyProps = {
    inputPlaceholder: 'Enter list title',
    changeHandler,
    submit: execute,
    closeFn: formToggle,
    btnText: 'Add list',
    loading
  };

  return (
    <div className={isAddForm ? 'add__form' : 'add__form_wd'}>
      {!isAddForm ? (
        <button className="add__toggler card_design" onClick={formToggle}>
          <img
            src={plus}
            alt="add"
            className="menu__ico"
            title="add the list"
          />
          Add another list
        </button>
      ) : (
        <FormWrapper form={formState}>
          <FormBody {...bodyProps} />
        </FormWrapper>
      )}
    </div>
  );
}

export { AddForm };
