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

export { toRadians, toDegrees };
