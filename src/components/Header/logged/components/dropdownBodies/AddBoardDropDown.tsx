// @ts-ignore
import logoutIcon from '@/assets/logout.svg?url';
// @ts-ignore
import profileIcon from '@/assets/profile.svg?url';
// @ts-ignore
import boardIcon from '@/assets/board_colored.svg?url';

import DropDown from '@/modules/dropdown/DropDown';
import DropDownElement from './DropDownElement';
import Button from '@/modules/button/Button';
import cls from 'classnames';

import { listInnerActiveElementDefaultClass } from './DropDownElement';
import { useOuterClick } from '@/hooks/useOuterClick';

import type { MouseEventHandler, MutableRefObject } from 'react';
import type { TMenuCreateModalNames } from '@/types/state';

type AccountDropDownProps = {
  closeDropDown: () => void;
  openModal: (
    modalName: TMenuCreateModalNames,
  ) => MouseEventHandler<HTMLButtonElement>;

  containerRef: MutableRefObject<HTMLElement | null>;
};

const AccountDropDown: React.FC<AccountDropDownProps> = ({
  closeDropDown,
  openModal,
  containerRef,
}) => {
  useOuterClick(containerRef, closeDropDown);

  return (
    <DropDown
      close={closeDropDown}
      heading="Create"
      dropDownType="add"
      containerClassNames="min-w-[290px]"
    >
      <DropDownElement>
        <Button
          containerClassNames={cls(
            listInnerActiveElementDefaultClass,
            'flex-col text-start',
          )}
          attrs={{
            onClick: openModal('create_board'),
          }}
        >
          <h2 className="self-start font-bold text-sm text-yellow">
            Create a board
          </h2>
          <p className="mt-1">
            A board is made up of cards ordered on lists. Use it to manage
            projects, track information, or organize anything.
          </p>
        </Button>
      </DropDownElement>
      <DropDownElement>
        <Button
          containerClassNames={cls(
            listInnerActiveElementDefaultClass,
            'flex-col text-start',
          )}
        >
          <h2 className="self-start font-bold text-sm text-yellow">
            Start with template
          </h2>
          <p className="mt-1">
            Get started faster with a board template.{' '}
            <span className="text-pink">(not implemented)</span>
          </p>
        </Button>
      </DropDownElement>
      <DropDownElement>
        <Button
          containerClassNames={cls(
            listInnerActiveElementDefaultClass,
            'flex-col text-start',
          )}
        >
          <h2 className="self-start font-bold text-sm text-yellow">
            Create a workspace
          </h2>
          <p className="mt-1">
            A Workspace is a group of boards and people. Use it to organize your
            company, side hustle, family, or friends.{' '}
            <span className="text-pink">(not implemented)</span>
          </p>
        </Button>
      </DropDownElement>
    </DropDown>
  );
};

export default AccountDropDown;
