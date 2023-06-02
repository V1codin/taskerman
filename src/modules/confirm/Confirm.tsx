import Button from '../button/Button';
import cls from 'classnames';

import { SyntheticEvent } from 'react';
import { FormWrapper } from '../formWrapper/FormWrapper';
import ButtonWithLoader from '../button/ButtonWithLoader';

const defaultConfirmClasses = `p-1 w-full flex 
items-center justify-center mt-10
[&>button]:shadow-none
[&>button]:m-0`;

type ConfirmProps = {
  children: React.ReactNode;
  accept: (e: SyntheticEvent<HTMLElement>) => void;
  decline: () => void;
  containerClassNames?: string;
  isLoading: boolean;
};

const Confirm: React.FC<ConfirmProps> = ({
  children,
  accept,
  decline,
  isLoading,
  containerClassNames,
}) => {
  return (
    <FormWrapper submit={accept}>
      {children}
      <div className={cls(defaultConfirmClasses, containerClassNames)}>
        <ButtonWithLoader
          isLoading={isLoading}
          attrs={{
            onClick: accept,
            type: 'submit',
            disabled: isLoading,
          }}
          classNames="rounded-md min-h-[42px] min-w-[106px] px-6 py-2 mt-0 bg-pale-green 
          text-yellow 
          hover:bg-pale-bright-green
          active:bg-yellow
          active:text-monokai
          "
        >
          Confirm
        </ButtonWithLoader>

        <Button
          attrs={{
            onClick: decline,
          }}
          containerClassNames="rounded-md px-6 py-2 min-h-[42px] min-w-[106px] !ml-2 bg-monokai 
          text-pale-bright-blue 
          hover:bg-dark-grey 
          active:bg-[#605c5c]"
        >
          Cancel
        </Button>
      </div>
    </FormWrapper>
  );
};

export default Confirm;
