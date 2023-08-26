// ? for correct hover styling of svgs
import './index.css';

import cls from 'classnames';

import { JetBrains_Mono } from 'next/font/google';
import { Info } from './Info';
import { Tools } from './Tools';

const inter = JetBrains_Mono({ subsets: ['latin'] });

const containerDefaultClasses = `max-w-[80%] mt-16 
mx-[auto] p-3 
text-white pb-11 
tablet:max-w-full tablet:pb-2`;

type CVComponentProps = {};

const CVComponent: React.FC<CVComponentProps> = () => {
  return (
    <section className={cls(containerDefaultClasses, inter.className)}>
      <h1 className="text-2xl text-center text-pale-bright-green">
        Hello. My name is Kyrylo Orlovskyi
      </h1>
      <div
        className="grid grid-cols-2 
      items-start justify-between mt-4 gap-2 
      tablet:block
      tablet:h-[calc(100dvh_-_210px)] overflow-auto"
      >
        <Info />
        <Tools />
      </div>
    </section>
  );
};

export { CVComponent };
