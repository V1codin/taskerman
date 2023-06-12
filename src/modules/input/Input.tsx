import cls from 'classnames';

import { forwardRef } from 'react';

import type { InputHTMLAttributes } from 'react';

const defaultContainerClasses = `rounded-md 
bg-alpha-black w-full
font-light 
text-white p-2 text-base 
border-b 
border-b-yellow 
outline-none
focus:border-b-pale-blue
hover:border-b-pale-green
hover:placeholder:text-yellow`;

type InputProps = {
  classNames?: string;
  attrs?: InputHTMLAttributes<HTMLInputElement>;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ classNames, attrs }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        className={cls(defaultContainerClasses, classNames)}
        {...attrs}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
