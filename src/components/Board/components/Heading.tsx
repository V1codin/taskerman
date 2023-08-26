import SaveButton from '@/modules/button/SaveButton';
import EditButton from '@/modules/button/EditButton';
import Input from '@/modules/input/Input';

import { useCallback, useRef, useState } from 'react';
import { ChangeEvent } from 'react';
import { useOuterClick } from '@/hooks/useOuterClick';
import { useFocus } from '@/hooks/useFocus';
import { api } from '@/utils/api/api';
import { getSetToastState } from '@/context/stateManager';
import { useSetAtom } from 'jotai';
import { ServerResponseError } from '@/libs/error.service';

type HeadingProps = {
  boardTitle: string;
  boardId: string;
};

const Heading: React.FC<HeadingProps> = ({ boardTitle, boardId }) => {
  const containerRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const setToast = useSetAtom(getSetToastState);
  const [title, setTitle] = useState(boardTitle);
  const prevTitle = useRef(title);
  const [isEditHeading, setIsEditHeading] = useState(false);

  useFocus(inputRef, isEditHeading);

  useOuterClick(containerRef, () => {
    setTitle(prevTitle.current);
    setIsEditHeading(false);
  });

  const saveHeading = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    try {
      await api.update('board', {
        type: 'update_header',
        boardId,
        title,
      });

      setIsEditHeading(false);
      prevTitle.current = title;
    } catch (e) {
      if (e instanceof ServerResponseError) {
        setToast({
          message: e.message,
          typeClass: 'warning',
          timeout: 3500,
        });
      }
    }
  };

  const editHeading = useCallback(() => {
    setIsEditHeading(true);
  }, []);

  const headingChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };

  return (
    <header
      ref={containerRef}
      className="flex bg-monokai w-fit rounded-md relative z-[3000]"
    >
      {isEditHeading ? (
        <Input
          ref={inputRef}
          classNames="bg-transparent 
        font-light 
        max-h-11
        text-white p-2 text-xl max-w-full
        focus:border-b-pale-blue rounded-none rounded-bl-md"
          attrs={{
            type: 'text',
            placeholder: 'Enter board title',
            value: title,
            name: 'title',
            onChange: headingChangeHandler,
          }}
        />
      ) : (
        <h2
          className="line-clamp-1 text-ellipsis text-3xl px-3 py-1 tablet:max-w-[40vw] max-w-[320px] overflow-hidden mobile:text-lg"
          title={title}
        >
          {title}
        </h2>
      )}
      {isEditHeading ? (
        <SaveButton
          click={saveHeading}
          classNames="active:bg-pale-green rounded-tr-md rounded-br-md 
          mobile:justify-center border-l-0
          border-b-bright-green border-r-bright-green border-t-bright-green"
        />
      ) : (
        <EditButton click={editHeading} />
      )}
    </header>
  );
};

export { Heading };
