/**
 * Converts degrees to radians.
 * @param {number} degrees
 * @return {number} radians
 */
function toRadians (degrees) {
  return degrees * (Math.PI / 180);
};

/**
 * Converts radians to degrees.
 * @param {number} radians
 * @return {number} degrees
 */
function toDegrees (radians) {
  return radians / (Math.PI / 180);
};

/**
 * Calculates the dot product of two n-tuples (arrays of numbers).
 *
 *   [1, 2, 3] * [4, 5, 6] = (1 * 4) + (2 * 5) + (3 * 6)
 *
 * @param {Array[number]} tuple1
 * @param {Array[number]} tuple2
 * @return {number}
 */
function dotProduct (tuple1, tuple2) {
  return tuple1.reduce(
    (accumulator, value, i) => (value * tuple2[i]) + accumulator,
    0);
};

/**
 * Transposes rows and columns in a matrix (array of arrays of numbers).
 *
 * [[1, 2], [3, 4], [5, 6]] => [[1, 3, 5], [2, 4, 6]]
 *
 * @param {Array[Array{number}]} matrix
 * @return {Array[Array{number}]}
 */
function transpose (matrix) {
  return matrix[0].map((value, i) => {
    return matrix.map(tuple => tuple[i]);
  });
};

export { toRadians, toDegrees, dotProduct, transpose };
