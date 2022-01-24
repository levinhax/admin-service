export type Response<T = unknown> = {
  code: number;
  data?: T;
  message: string;
};
