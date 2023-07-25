/**
 * It modifies the original array, shuffling its items.
 *
 * https://stackoverflow.com/a/2450976/5379222
 */
export const shuffle = (array: any[]) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

/** Get a randomly selected item from the given array. */
export const randomItemFrom = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Returns an array with intermediary steps between the two numbers specified, the two numbers are included in the range.
 *
 * @example range({ length: 3 })
 * > [0, 0.5, 1]
 *
 * @example range({ length: 5, min: 1, max: 2 })
 * > [1, 1.25, 1.5, 1.75, 2]
 *
 * @example range({ length: 10, min: 10, max: 100 })
 * > [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
 */
export const range = (options: {
  /** @default 0 */
  min?: number,
  /** @default 1 */
  max?: number,
  /** desired items to be present in the returned array */
  length: number,
}) => {
  const { min = 0, max = 1, length } = options;

  const stepIncrement = (max - min)/(length - 1);
  return Array.from({ length })
    .map((_, index) => min + (index * stepIncrement))
}
