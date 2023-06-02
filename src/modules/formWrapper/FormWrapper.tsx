import cls from 'classnames';

import {
  CSSProperties,
  FormEventHandler,
  PropsWithChildren,
  memo,
} from 'react';

const defaultInputClass = `text-white w-full p-2 mt-2 text-sm
bg-transparent
border-b-[1px]
border-yellow
outline-none
focus:placeholder:text-yellow
hover:placeholder:text-yellow
focus:border-bright-blue
focus:hover:border-yellow
invalid:border-red
`;

const defaultWarningClass = `font-semibold mt-2 text-pink`;
const defaultFormClasse =
  'flex flex-col items-center flex-wrap px-6 py-4 text-center colored designed';

type FormProps = {
  submit: FormEventHandler<HTMLFormElement>;

  containerClassNames?: string;
  classNames?: string;
  styles?: CSSProperties;
};

const FormWrapper: React.FC<PropsWithChildren<FormProps>> = memo(
  ({ children, submit, containerClassNames, classNames, styles }) => {
    return (
      <div className={cls('mx-[auto] my-0', containerClassNames)}>
        <form
          onSubmit={submit}
          className={cls(defaultFormClasse, classNames)}
          style={{ ...styles }}
        >
          {children}
        </form>
      </div>
    );
  },
);

FormWrapper.displayName = 'FormWrapper';

export { FormWrapper, defaultInputClass, defaultWarningClass };
