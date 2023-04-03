import { CSSProperties, FormEventHandler, memo } from 'react';
import { StyledForm, StyledFormContainer } from './styledFormWrapper';

type ContainerProps = {
  size: 's' | 'm' | 'l';
};

export type PartialContainerProps = Partial<ContainerProps>;

type Props = {
  children: React.ReactNode;
  submit: FormEventHandler<HTMLDivElement>;
  formStyle?: CSSProperties;
  containerProps?: PartialContainerProps;
};

const FormWrapper: React.FC<Props> = memo(
  ({ children, submit, formStyle, containerProps }) => {
    return (
      <StyledFormContainer
        onSubmit={submit}
        containerProps={{ ...containerProps }}
      >
        <StyledForm className="colored" style={{ ...formStyle }}>
          {children}
        </StyledForm>
      </StyledFormContainer>
    );
  },
);

FormWrapper.displayName = 'FormWrapper';

export { FormWrapper };
