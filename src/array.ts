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
