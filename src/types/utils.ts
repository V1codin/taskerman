export type TOmitedGeneric<
  TBase extends unknown,
  OmitedTypes extends string | number,
> = Omit<Pick<TBase, keyof TBase>, OmitedTypes>;

export type WithOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
