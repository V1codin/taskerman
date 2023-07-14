// @ts-ignore
import tsIco from '@/assets/cv/badges/ts.svg?url';
// @ts-ignore
import vsCodeIco from '@/assets/cv/badges/vs_code.svg?url';

import ImageModule from '@/modules/image/Image';

import { Section } from './Section';

type CVComponentProps = {};

const CVComponent: React.FC<CVComponentProps> = () => {
  return (
    <>
      <Section type="TS">
        <ImageModule
          className="rounded cursor-pointer h-7"
          width={124}
          height={28}
          alt="ts"
          src={tsIco}
        />
      </Section>
      <Section type="VS_CODE" classNames="mt-1" innerClasses="max-w-max">
        <ImageModule
          className="rounded cursor-pointer h-7"
          width={124}
          height={28}
          alt="vs_code"
          src={vsCodeIco}
        />
      </Section>
    </>
  );
};

export { CVComponent };
