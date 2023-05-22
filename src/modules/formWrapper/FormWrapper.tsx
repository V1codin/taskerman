import cls from 'classnames';

import { FormEventHandler, PropsWithChildren, memo } from 'react';

const defaultInputClass = cls(`text-white w-full p-2 mt-2 text-sm
bg-transparent
border-b-[1px]
border-yellow
outline-none
focus:placeholder:text-yellow
hover:placeholder:text-yellow
focus:border-bright-blue
focus:hover:border-yellow
invalid:border-red
`);

const defaultWarningClass = cls(`font-semibold mt-2 text-pink`);
const defaultFormClasse = cls(
  'flex flex-col colored items-center flex-wrap px-6 py-4 text-center colored',
);

type FormProps = {
  submit: FormEventHandler<HTMLFormElement>;

  containerClassNames?: string;
  classNames?: string;
};

const FormWrapper: React.FC<PropsWithChildren<FormProps>> = memo(
  ({ children, submit, containerClassNames, classNames }) => {
    return (
      <div className={cls('mx-[auto] my-0', containerClassNames)}>
        <form onSubmit={submit} className={cls(defaultFormClasse, classNames)}>
          {children}
        </form>
      </div>
    );
  },
);

FormWrapper.displayName = 'FormWrapper';

export { FormWrapper, defaultInputClass, defaultWarningClass };
