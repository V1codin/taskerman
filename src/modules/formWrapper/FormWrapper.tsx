import { FormEventHandler, memo } from 'react';
import { StyledForm, StyledFormContainer } from './styled';

type Props = {
  children: React.ReactNode;
  submit: FormEventHandler<HTMLDivElement>;
};

const FormWrapper: React.FC<Props> = memo(({ children, submit }) => {
  return (
    <StyledFormContainer onSubmit={submit}>
      <StyledForm className="colored">{children}</StyledForm>
    </StyledFormContainer>
  );
});

FormWrapper.displayName = 'FormWrapper';

export { FormWrapper };
