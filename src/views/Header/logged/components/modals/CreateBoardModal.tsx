import ImageModule from '@/modules/image/Image';
// @ts-ignore
import link from '@/assets/link.svg?url';

import { FormWrapper } from '@/modules/formWrapper/FormWrapper';
import { addBoardColors, STANDARD_BG } from '@/utils/constants';
import {
  Children,
  ChangeEvent,
  useState,
  SyntheticEvent,
  BaseSyntheticEvent,
} from 'react';

type CreateBoardModalProps = {};

const CreateBoardModal: React.FC<CreateBoardModalProps> = () => {
  const [form, setForm] = useState({
    bg: STANDARD_BG,
    title: '',
    link: '',
  });

  const changeHandlerClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    const formValue = form[name as keyof typeof form];
    if (formValue !== value) {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const name = e.target.name;
    const value = e.target.value;

    const formValue = form[name as keyof typeof form];
    if (formValue !== value) {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const createBoard = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <FormWrapper submit={createBoard}>
      <h3 className="form__heading">Add board</h3>
      <input
        type="text"
        name={'title' as keyof typeof form}
        className="form__input"
        placeholder="Enter board title"
        value={form.title}
        onChange={changeHandler}
        required
        autoFocus
      />
      <ul className="form__colorPicker">
        {Children.toArray(
          addBoardColors.map((color) => {
            const { backgroundColor } = color;
            return (
              <li>
                <button
                  className="colorPicker__el card_design"
                  style={{ backgroundColor: backgroundColor }}
                  onClick={changeHandlerClick}
                  value={backgroundColor}
                  name={'bg' as keyof typeof form}
                ></button>
              </li>
            );
          }),
        )}
        <li>
          <button
            className="menu__btn card_design menu_linkBg"
            onClick={changeHandlerClick}
            name="link"
          >
            <ImageModule
              src={link}
              alt="link bg"
              className="menu__ico"
              title="Get link of the background from clipboard"
            />
          </button>
        </li>
        <li>
          <input
            className="colorPicker__el card_design"
            name={'bg' as keyof typeof form}
            type="color"
            style={{ backgroundColor: '#ffffffb0' }}
            onChange={changeHandler}
          />
        </li>
      </ul>
      <button
        className="form__btn"
        type="submit"
        disabled={form.title === '' || form.title === undefined ? true : false}
      >
        Create Board
      </button>
    </FormWrapper>
  );
};
export default CreateBoardModal;
