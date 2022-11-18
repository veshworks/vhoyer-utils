export const isSelf = (e: Event) => {
  return e.currentTarget === e.target;
};

type Listener = (e: Event) => void;

export const onlySelf = (fn: Listener) => (...args: [Event]) => {
  const [e] = args;

  if (!isSelf(e)) return;

  fn(...args);
};
