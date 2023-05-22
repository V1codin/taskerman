export const useDebounce = (
  callback: (...args: any[]) => Promise<any>,
  timeOut: number = 600,
) => {
  let timer: NodeJS.Timeout;

  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(async () => {
      await callback(...args);
    }, timeOut);
  };
};
