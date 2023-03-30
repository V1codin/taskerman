import { CSSProperties, FormEventHandler, memo } from 'react';
import { StyledForm, StyledFormContainer } from './styledFormWrapper';

type Props = {
  children: React.ReactNode;
  submit: FormEventHandler<HTMLDivElement>;
  formStyle?: CSSProperties;
};

const FormWrapper: React.FC<Props> = memo(({ children, submit, formStyle }) => {
  return (
    <StyledFormContainer onSubmit={submit}>
      <StyledForm className="colored" style={{ ...formStyle }}>
        {children}
      </StyledForm>
    </StyledFormContainer>
  );
});

FormWrapper.displayName = 'FormWrapper';

export { FormWrapper };
