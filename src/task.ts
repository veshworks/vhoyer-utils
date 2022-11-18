const timeouts = Symbol('timeouts');

export const queueMacrotask = (function queueMacrotask<T extends () => void>(
  this: { [timeouts]?: T[] },
  fn: T,
) {
  const messageName = '@vhoyer/utils/queueMacrotask';
  this[timeouts] = this[timeouts] || [];

  window.addEventListener('message', (event) => {
    if (event.source !== window) return;
    if (event.data !== messageName) return;

    event.stopPropagation();

    if (this[timeouts]!.length <= 0) return;

    const queuedFn = this[timeouts]!.shift()!;
    queuedFn();
  }, true);

  this[timeouts].push(fn);
  window.postMessage(messageName, "*");
}).bind({});
