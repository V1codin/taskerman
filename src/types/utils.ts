export type TOmitedGeneric<
  TBase extends unknown,
  OmitedTypes extends string | number,
> = Omit<Pick<TBase, keyof TBase>, OmitedTypes>;

export type WithOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export type CSSMeasurementUnit = 'em' | 'em' | 'px' | 'vw' | 'vh' | '%';
export type TButtonDataTypes = {
  'data-drop-type'?: string;
  'data-oauthtype'?: TAuthTypes;
};
