import { CSSProperties, FormEventHandler, memo } from 'react';
import { StyledForm, StyledFormContainer } from './styledFormWrapper';
import { CSSMeasurementUnit } from 'styled-components';

type ContainerProps = {
  width: 's' | 'm' | 'l';
  customWidth: `${number}${CSSMeasurementUnit}`;
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
