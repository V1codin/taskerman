import { getSetToastState } from '@/context/stateManager';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export const useToast = (timerToRemoveToast: number = 2000) => {
  const [toast, setToast] = useAtom(getSetToastState);

  useEffect(() => {
    if (!toast.message) {
      return;
    }

    const resetToast = () => {
      setToast({
        message: '',
      });
    };

    setTimeout(resetToast, toast.timeout || timerToRemoveToast);
  }, [setToast, toast.message, timerToRemoveToast, toast.timeout]);

  return {
    toast,
    setToast,
  };
};
