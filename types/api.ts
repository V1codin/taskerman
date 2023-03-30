export type TMetods = 'POST' | 'PUT' | 'DELETE' | 'GET' | undefined;
export type TBoardReturn<TMethod, TBody> = {
  status: number;
  data: TMethod extends undefined ? null : any;
};
