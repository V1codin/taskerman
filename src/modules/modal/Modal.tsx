'use client';

import cls from 'classnames';
import FocusTrap from '../focusTrap/FocusTrap';
import CloseButton from '../button/CloseButton';

import { ModalForm } from './Forms';
import { getSetModal } from '@/context/stateManager';
import { useAtom } from 'jotai';
import { useCallback, useRef } from 'react';
import { useEscapeKeyCallback } from '@/hooks/useEscapeKeyCallback';
import { useFocus } from '@/hooks/useFocus';

type ModalProps = {};

const Modal: React.FC<ModalProps> = () => {
  const [modalState, setModalState] = useAtom(getSetModal);
  const firstElementRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => {
    setModalState({
      isOpen: false,
      window: null,
    });
  }, [setModalState]);

  useEscapeKeyCallback(close, null, modalState.isOpen);
  useFocus(firstElementRef, modalState.isOpen);

  return modalState.isOpen ? (
    <FocusTrap
      containerClassNames={cls(
        'w-screen h-screen absolute top-0 left-0 z-[5000]',
      )}
      firstElementRef={firstElementRef}
    >
      <div
        className="relative w-screen h-screen bg-overlay"
        onClick={close}
      ></div>
      <CloseButton click={close} />
      <div
        className="absolute top-[10%] left-[50%] translate-x-[-50%]"
        ref={firstElementRef}
      >
        <ModalForm modalMeta={modalState.window!} />
      </div>
    </FocusTrap>
  ) : null;
};

export default Modal;
