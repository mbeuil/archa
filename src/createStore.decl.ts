export type StoreDefaultType = Record<string, unknown>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DispatchDefaultType = Record<string, (arg: any) => void>;

export type Dispatch<T_Store, T_Dispatch> = (
  set: (value: SetProps<T_Store>) => void,
  get: () => T_Store,
) => T_Dispatch;

export type SetProps<T_Store> =
  | Partial<T_Store>
  | ((oldValue: T_Store) => Partial<T_Store>);

export type StoreSelectorProps<T_Store, T_Dispatch> =
  T_Dispatch extends undefined
    ? T_Store & { setStore: (setter: SetProps<T_Store>) => void }
    : T_Store;

export type UseStoreProps<T_Store, T_Dispatch, T_SelectorOutput> = (
  store: StoreSelectorProps<T_Store, T_Dispatch>,
) => T_SelectorOutput;

export type UseDispatchProps<T_Dispatch, T_SelectorOutput> = (
  dispatch: T_Dispatch,
) => T_SelectorOutput;

export type CreateStoreReturn<T_Store, T_Dispatch> = {
  Provider: (props: { children: React.ReactNode }) => JSX.Element;
  useStore: <TSelectorOutput>(
    selector: UseStoreProps<T_Store, T_Dispatch, TSelectorOutput>,
  ) => TSelectorOutput;
  useDispatch: <TSelectorOutput>(
    selector: UseDispatchProps<T_Dispatch, TSelectorOutput>,
  ) => TSelectorOutput;
};
