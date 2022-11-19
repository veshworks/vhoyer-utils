import { randomItemFrom } from './array';

/** generates an id with the given set */
export const getUID = ({
  length = 10,
  set = 'abcdefghijklmnopqrstuvwxyz1234567890',
} = {}) => {
  const id = Array(length).fill('');
  const setList = set.split('');

  for (const index in id) {
    id[index] = randomItemFrom(setList);
  }

  return id.join('');
}
