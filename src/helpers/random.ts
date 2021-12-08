/**
 * genrates  a random number between given range
 * @param {Number} min - lower bound
 *  @param {Number} max - upper bound
 * @returns {Number} a random generated integer
 */
export function getRandomInt(min, max) {
  if (min === null && max) return max;
  if (max === null && min) return min;
  let i = Math.floor(Math.random() * (max - min + 1)) + min;
  return i;
}
