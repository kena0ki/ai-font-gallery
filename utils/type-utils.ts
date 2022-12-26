export type FilteredKeys<T, P> = {
  [K in keyof T]: T[K] extends P ? K : never;
}[keyof T];

export type FilteredType<T, P> = Pick<T, FilteredKeys<T, P>>;

