'use client';

// @ts-ignore
import tsIco from '@/assets/cv/badges/ts.svg?url';
// @ts-ignore
import vsCodeIco from '@/assets/cv/badges/vs_code.svg?url';
// @ts-ignore
import jsIco from '@/assets/cv/badges/js.svg?url';
// @ts-ignore
import reactIco from '@/assets/cv/badges/react.svg?url';
// @ts-ignore
import reduxIco from '@/assets/cv/badges/redux.svg?url';

import Link from 'next/link';
import ImageModule from '@/modules/image/Image';

import { Section } from './Section';

type ToolsProps = {};

const Tools: React.FC<ToolsProps> = () => {
  return (
    <section className="tablet:mt-2">
      <h2 className="info-heading">About me</h2>
      <Section type="TS" classNames="tablet:mt-2">
        <Link
          href="https://gist.github.com/V1codin/b3f8dd9ec6b70438ab5b884a8b282dde"
          target="_blank"
        >
          <ImageModule
            className="rounded cursor-pointer h-7"
            title="My default typescript config"
            width={124}
            height={28}
            alt="typescript"
            src={tsIco}
          />
        </Link>
      </Section>
      <Section type="VS_CODE" classNames="mt-1" innerClasses="max-w-max">
        <ImageModule
          className="rounded cursor-pointer h-7"
          width={124}
          height={28}
          alt="vs code"
          src={vsCodeIco}
        />
      </Section>
      <ImageModule
        className="mt-1 rounded cursor-pointer h-7"
        width={124}
        height={28}
        alt="javascript"
        src={jsIco}
      />
      <ImageModule
        className="mt-1 rounded cursor-pointer h-7"
        width={124}
        height={28}
        alt="react"
        src={reactIco}
      />
      <ImageModule
        className="mt-1 rounded cursor-pointer h-7"
        width={124}
        height={28}
        alt="redux"
        src={reduxIco}
      />
    </section>
  );
};

export { Tools };
