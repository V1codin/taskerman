import SaveButton from '@/modules/button/SaveButton';
import EditButton from '@/modules/button/EditButton';
import Input from '@/modules/input/Input';

import { useCallback, useMemo, useRef, useState } from 'react';
import { BOARD_TITLE_SLICE_INDEX } from '@/utils/constants';
import { ChangeEvent } from 'react';
import { useOuterClick } from '@/hooks/useOuterClick';
import { useFocus } from '@/hooks/useFocus';

type HeadingProps = {
  boardTitle: string;
};

const Heading: React.FC<HeadingProps> = ({ boardTitle }) => {
  const containerRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(boardTitle);
  const prevTitle = useRef(title);
  const [isEditHeading, setIsEditHeading] = useState(false);
  const slicedTitle = useMemo(() => {
    return title.slice(0, BOARD_TITLE_SLICE_INDEX);
  }, [title]);

  useFocus(inputRef, isEditHeading);

  useOuterClick(containerRef, () => {
    setTitle(prevTitle.current);
    setIsEditHeading(false);
  });

  const saveHeading = () => {
    setIsEditHeading(false);
    prevTitle.current = title;
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
        text-white p-2 text-xl max-w-full
        focus:border-b-pale-blue rounded-none"
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
          className="text-3xl px-3 py-1 max-w-[40vw] overflow-hidden mobile:text-lg"
          title={title}
        >
          {slicedTitle}
        </h2>
      )}
      {isEditHeading ? (
        <SaveButton
          click={saveHeading}
          classNames="active:bg-pale-green rounded-tr-md rounded-br-md mobile:justify-center"
        />
      ) : (
        <EditButton click={editHeading} />
      )}
    </header>
  );
};

export default Heading;
