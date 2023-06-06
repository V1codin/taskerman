import SaveButton from '@/modules/button/SaveButton';
import EditButton from '@/modules/button/EditButton';

import { useCallback, useMemo, useRef, useState } from 'react';
import { BOARD_TITLE_SLICE_INDEX } from '@/utils/constants';
import { ChangeEvent } from 'react';
import { useOuterClick } from '@/hooks/useOuterClick';

type HeadingProps = {
  boardTitle: string;
};

const Heading: React.FC<HeadingProps> = ({ boardTitle }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [title, setTitle] = useState(boardTitle);
  const prevTitle = useRef(title);
  const [isEditHeading, setIsEditHeading] = useState(false);
  const slicedTitle = useMemo(() => {
    return title.slice(0, BOARD_TITLE_SLICE_INDEX);
  }, [title]);

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
    <header ref={containerRef} className="flex bg-monokai w-fit rounded-md">
      {isEditHeading ? (
        <input
          className="
        bg-transparent 
        font-light 
        text-white p-2 text-xl 
        border-b 
        border-b-yellow 
        outline-none
        focus:border-b-pale-blue
        placeholder:text-[#757575]
        hover:border-b-pale-green
        hover:placeholder:text-yellow
        "
          type="text"
          placeholder="Enter your full name"
          value={title}
          name="displayName"
          onChange={headingChangeHandler}
        />
      ) : (
        <h2
          className="text-3xl px-3 py-1 max-w-md overflow-hidden"
          title={title}
        >
          {slicedTitle}
        </h2>
      )}
      {isEditHeading ? (
        <SaveButton
          click={saveHeading}
          classNames="active:bg-pale-green rounded-tr-md rounded-br-md"
        />
      ) : (
        <EditButton click={editHeading} />
      )}
    </header>
  );
};

export default Heading;
