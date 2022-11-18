import clone from 'clone';

export const set = (original: { [key: string]: any }, name: string, value: any) => {
  const object = clone(original);
  const path = name.split('.');

  let head = object;

  while (path.length > 1) {
    const key = path.shift() as string;

    head[key] = head.hasOwnProperty(key) ? head[key] : {};

    head = head[key];
  }

  head[path.shift() as string] = value;

  return object;
};

export const get = (object: { [key: string]: any }, name: string) => {
  const path = name.split('.');

  return path.reduce((value, path) => {
    return (value !== undefined) ? value[path] : undefined;
  }, object);
};

export const flat = <T extends { [key: string]: any }>(original: T) => {
  const object = {} as { [key: string]: any };

  const iterateKeys = (obj: T, path: string[] = []) => {
    Object.entries(obj).forEach(([key, value]) => {
      const keyParts = [...path, key];

      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        iterateKeys(value, keyParts);
        return;
      }

      object[keyParts.join('.')] = value;
    });
  };

  iterateKeys(original);

  return object;
};

// inverse of flat
export const inflate = (original: { [key: string]: any }) => {
  return Object.entries(original)
    .reduce((object, [key, value]) => set(object, key, value), {});
};
