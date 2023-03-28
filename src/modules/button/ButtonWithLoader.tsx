import Button from './Button';

import { Process } from '../process/Process';

type ButtonWithLoaderProps = {
  isLoading: boolean;
  children?: JSX.Element | JSX.Element[] | React.ReactNode;
  attrs?: Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  styles?: React.CSSProperties;
};

const ButtonWithLoader: React.FC<ButtonWithLoaderProps> = ({
  isLoading,
  children,
  styles,
  attrs,
}) => {
  return (
    <Button
      styles={{
        ...styles,
        position: 'relative',
      }}
      attrs={attrs}
    >
      {isLoading ? <Process /> : children}
    </Button>
  );
};
export default ButtonWithLoader;
