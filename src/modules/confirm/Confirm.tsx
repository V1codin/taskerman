import { SyntheticEvent, useCallback, useEffect } from 'react';
import { FormWrapper } from '../formWrapper/FormWrapper';
import { StyledConfirmButtonsWrapper } from './styledConfirm';
import Button from '../button/Button';

type ConfirmProps = {
  children: React.ReactNode;
};

const Confirm: React.FC<ConfirmProps> = ({ children }) => {
  const submit = useCallback((e: SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    return () => {
      console.log('asd');
    };
  }, []);
  return (
    <FormWrapper submit={submit} containerProps={{ size: 's' }}>
      {children}
      <StyledConfirmButtonsWrapper>
        <Button
          attrs={{
            type: 'submit',
            className: 'btn',
          }}
        >
          Confirm
        </Button>
        <Button
          attrs={{
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
