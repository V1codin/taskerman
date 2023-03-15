import { StyledForm, StyledFormContainer } from './styled';

/*
import { useState, useEffect } from 'react';

import { errorDisplay } from '../../utils/helpers';

import { ErrorBlock } from '../error';

import './Form.css';

function FormWrapper(props) {
  const { children, form, loading, error } = props;
  const [localError, setError] = useState(null);

  const formClasses =
    form.className && form.className !== ''
      ? `form ${!loading ? 'card_design' : 'loading'} ${form.className}`
      : `form ${!loading ? 'card_design' : 'loading'}`;

  const customBgStyle =
    props?.form?.bg !== ''
      ? {
          backgroundColor: props?.form?.bg,
        }
      : props.form.link !== ''
      ? {
          backgroundImage: `url(${props.form.link})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }
      : null;

  useEffect(() => {
    if (error) {
      return errorDisplay(setError, 3000, error);
    }
  }, [error]);

  return (
    <form
      className={formClasses}
      style={customBgStyle}
      // ? for firefox (AwesomeDebouncePromise doesn't fire preventDefault in firefox)
      onSubmit={(e) => {
        e.preventDefault();
      }}
      {...props?.containerAttrs}
    >
      {localError ? <ErrorBlock {...localError} /> : null}
      {loading ? <Process isShown={loading} /> : children}
    </form>
  );
}

FormWrapper.defaultProps = {
  children: {},
  loading: false,
  error: null,
};

FormWrapper.propTypes = {
  children: PropTypes.object.isRequired,
  containerAttrs: PropTypes.any,
  form: PropTypes.object.isRequired,
  loading: PropTypes.bool,

  error: PropTypes.object,
};
*/

type Props = {
  children: React.ReactNode;
};

function Form({ children }: Props) {
  return (
    <StyledFormContainer>
      <StyledForm className="colored">{children}</StyledForm>
    </StyledFormContainer>
  );
}

export { Form };
