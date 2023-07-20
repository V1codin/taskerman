import { Links } from './Links';

type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="w-full bg-black-aqua_op fixed bottom-0">
      <Links />
    </div>
  );
};

export { Footer };
