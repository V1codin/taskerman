'use client';

// ? for correct hover styling of svgs
import './index.css';

// @ts-ignore
import Shevron from '@/assets/forward_arrow.svg';
// @ts-ignore
import LinkedInLogo from '@/assets/linkedIn.svg';
// @ts-ignore
import GitLogo from '@/assets/github.svg';
// @ts-ignore
import CVLogo from '@/assets/cv.svg';

import cls from 'classnames';
import Link from 'next/link';
import ButtonWithIcon from '@/modules/button/ButtonWithIcon';

import { usePathname } from 'next/navigation';

type LinksProps = {};

const Links: React.FC<LinksProps> = () => {
  const path = usePathname();

  const isCurrent = path === '/cv';

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section className="max-h-10 max-w-[150px] mr-[5%] ml-[auto] my-0 p-2 flex items-center justify-between">
      <Link
        href="https://github.com/V1codin"
        target="_blank"
        className="flex w-6 h-6"
        title="My GitHub"
      >
        <GitLogo className="fill-[#cacaca] hover:fill-blue" />
      </Link>

      <Link
        href="/cv"
        className={cls('flex w-[1.1rem] h-6 cv', {
          'border-b-[1px] border-bright-blue h-[25px]': isCurrent,
        })}
        title="My CV"
      >
        <CVLogo className="fill-[#cacaca]" />
      </Link>

      <Link
        href="https://www.linkedin.com/in/kirill-orlovsky-55049a1a5/"
        target="_blank"
        className="flex w-6 h-6 linkedIn"
        title="My LinkedIn"
      >
        <LinkedInLogo className="hover:!fill-bright-blue" />
      </Link>

      <ButtonWithIcon
        classNames="!p-0 w-6 h-6 scroll-top-btn"
        attrs={{
          onClick: scrollToTop,
          title: 'Scroll to top',
        }}
      >
        <Shevron className="-rotate-90 scroll-top-svg" />
      </ButtonWithIcon>
    </section>
  );
};

export { Links };
