import Button from './Button';

import { Process } from '../process/Process';

type ButtonWithLoaderProps = {
  isLoading: boolean;
  children?: JSX.Element | JSX.Element[] | React.ReactNode;
  attrs?: Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  styles?: React.CSSProperties;
  spinnerSize?: 'm' | 's';
};

const ButtonWithLoader: React.FC<ButtonWithLoaderProps> = ({
  isLoading,
  children,
  styles,
  attrs,
  spinnerSize = 'm',
}) => {
  return (
    <Button
      styles={{
        position: 'relative',
        ...styles,
      }}
      attrs={attrs}
    >
      {isLoading ? <Process size={spinnerSize} /> : children}
    </Button>
  );
};

export default ButtonWithLoader;
