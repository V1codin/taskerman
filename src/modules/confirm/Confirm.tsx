import Button from '../button/Button';

import { SyntheticEvent } from 'react';
import { FormWrapper } from '../formWrapper/FormWrapper';
import { StyledConfirmButtonsWrapper } from './styledConfirm';

type ConfirmProps = {
  children: React.ReactNode;
  accept: (e: SyntheticEvent<HTMLElement>) => void;
  decline: () => void;
};

const Confirm: React.FC<ConfirmProps> = ({ children, accept, decline }) => {
  return (
    <FormWrapper submit={accept} containerProps={{ size: 's' }}>
      {children}
      <StyledConfirmButtonsWrapper>
        <Button
          attrs={{
            onClick: accept,
            type: 'submit',
            className: 'btn',
          }}
        >
          Confirm
        </Button>
        <Button
          attrs={{
            onClick: decline,
            className: 'btn_secondary',
          }}
        >
          Cancel
        </Button>
      </StyledConfirmButtonsWrapper>
    </FormWrapper>
  );
};
export default Confirm;
