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
    <FormWrapper submit={accept} containerProps={{ customWidth: '20vw' }}>
      {children}
      <StyledConfirmButtonsWrapper>
        <Button
          attrs={{
            onClick: accept,
            type: 'submit',
            className: 'btn btn_primary',
          }}
          styles={{
            padding: '10px 25px',
            marginTop: 0,
          }}
        >
          Confirm
        </Button>
        <Button
          attrs={{
            onClick: decline,
            className: 'btn btn_secondary',
          }}
          styles={{
            padding: '10px 25px',
            marginTop: 0,
          }}
        >
          Cancel
        </Button>
      </StyledConfirmButtonsWrapper>
    </FormWrapper>
  );
};
export default Confirm;
