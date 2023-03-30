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
  CSSProperties,
} from 'react';
import { getDataFromClipBoard } from '@/utils/helpers';
import { useToast } from '@/hooks/hooks';

type CreateBoardModalProps = {};

const CreateBoardModal: React.FC<CreateBoardModalProps> = () => {
  const [form, setForm] = useState<{
    bg: string;
    title: string;
    link: string;
    style: CSSProperties;
  }>({
    bg: STANDARD_BG,
    title: '',
    link: '',
    style: {},
  });

  const { setToast } = useToast();

  const updateForm = (name: keyof typeof form, value: string) => {
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
  };

  const changeHandlerClick = async (e: SyntheticEvent<HTMLButtonElement>) => {
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
  };

  const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const name = e.target.name as keyof typeof form;
    const value = e.target.value;

    updateForm(name, value);
  };

  const createBoard = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <FormWrapper submit={createBoard} formStyle={form.style}>
      <h3 className="form__heading">Add board</h3>
      <input
        type="text"
        name="title"
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
                  name="bg"
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
            name="bg"
            type="color"
            style={{
              height: '32px',
              width: '32px',
              padding: '11px',
              backgroundColor: '#ffffffb0',
              marginTop: '12px',
            }}
            onChange={changeHandler}
          />
        </li>
      </ul>
      <button className="form__btn" type="submit" disabled={form.title === ''}>
        Create Board
      </button>
    </FormWrapper>
  );
};
export default CreateBoardModal;
