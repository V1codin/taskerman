import HeaderLayout from '@/layouts/HeaderLayout';
import LoginFormBody from '@/modules/LoginFormBody/LoginFormBody';

import { Form } from '@/modules/formWrapper';
import { ChangeEvent, useCallback, useState } from 'react';
import { inputValidation } from '@/utils/helpers';
import { ILoginForm, IMasks, TOAuth } from '../../types/helpers';

export default function Login() {
  const formDefault: ILoginForm = {
    username: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    email: '',
  };

  const [formState, setFormState] = useState({
    form: formDefault,
    warn: formDefault,
  });

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const name = e.target.name as keyof IMasks;

    const { message, isValidated } = inputValidation(value, name);

    if (!isValidated) {
      setFormState((prev) => {
        return {
          form: {
            ...prev.form,
            [name]: value,
          },
          warn: {
            ...prev.warn,
            [name]: message,
          },
        };
      });
    } else {
      setFormState((prev) => {
        return {
          form: {
            ...prev.form,
            [name]: value,
          },
          warn: {
            ...prev.warn,
            [name]: '',
          },
        };
      });
    }
  }, []);

  const submit = useCallback(() => {}, []);

  const oauthHandler = useCallback((type: keyof TOAuth) => {
    console.log('type: ', type);
  }, []);

  return (
    <HeaderLayout>
      <Form>
        <LoginFormBody
          {...{ formState, changeHandler, submit, oauthHandler }}
        />
      </Form>
    </HeaderLayout>
  );
}
