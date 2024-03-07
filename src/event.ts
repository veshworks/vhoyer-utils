export const isSelf = (e: Event) => {
  return e.currentTarget === e.target;
};

type Listener = (e: Event) => void;

export const onlySelf = (fn: Listener) => (...args: [Event]) => {
  const [e] = args;

  if (!isSelf(e)) return;

  fn(...args);
};

export const debounce = <T extends () => void>(fn: T, delay: number) => {
  let timer: any;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args as []), delay);
  };
};
