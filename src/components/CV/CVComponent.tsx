import cls from 'classnames';

import { JetBrains_Mono } from 'next/font/google';
import { Info } from './Info';
import { Tools } from './Tools';

const inter = JetBrains_Mono({ subsets: ['latin'] });

type CVComponentProps = {};

const CVComponent: React.FC<CVComponentProps> = () => {
  return (
    <section
      className={cls(
        'max-w-[80%] mt-16 mx-[auto] p-3 text-white pb-11',
        inter.className,
      )}
    >
      <h1 className="text-2xl text-center text-pale-bright-green">
        Hello. My name is Kyrylo Orlovskyi
      </h1>
      <div className="grid grid-cols-2 items-start justify-between mt-4">
        <Info />
        <Tools />
      </div>
    </section>
  );
};

export { CVComponent };
