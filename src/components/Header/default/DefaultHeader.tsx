'use client';

import { useAtom } from 'jotai';
import { getSetModal } from '@/context/stateManager';
import { TAuthForms } from '@/types/state';

type DefaultHeaderProps = {};

const DefaultHeader: React.FC<DefaultHeaderProps> = () => {
  const [, setAuthState] = useAtom(getSetModal);

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAuthState({
      isOpen: true,
      window: {
        type: 'auth',
        view: e.currentTarget.name as TAuthForms,
      },
    });
  };

  return (
    <div className="flex mr-20px">
      <button
        className="rounded-md active:border active:border-solid active:border-pale-blue px-4 py-1 text-base font-bold decoration-yellow hover:underline"
        onClick={openModal}
        name="login"
      >
        Log in
      </button>
      <button
        className="duration-300
        text-white
        border 
        border-solid 
        rounded-md 
        px-4 py-1 
        text-base 
        font-bold 
        decoration-yellow 
        hover:no-underline hover:bg-blue
        active:border active:border-solid active:border-pale-blue"
        onClick={openModal}
        name="signup"
      >
        Sign up
      </button>
    </div>
  );
};

export default DefaultHeader;
