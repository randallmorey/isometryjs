import { toRadians, matrixMultiply } from './utils';

/**
 * Creates an isometric transformation function using the specified degrees.
 * @param {number} degrees
 * @return {Function} fn expects a single argument,
 *                    an array of [x, y] coordinates
 */
function makeIsometricTransform (degrees) {
  const rads = toRadians(degrees);
  const matrices = {
    shear: [
      [1, Math.tan(-rads), 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
    scale: [
      [1, 0, 0],
      [0, Math.cos(-rads), 0],
      [0, 0, 1]
    ],
    rotate: [
      [Math.cos(rads), -Math.sin(rads), 0],
      [Math.sin(rads), Math.cos(rads), 0],
      [0, 0, 1]
    ]
  };
  const transformationMatrix = matrixMultiply(
    matrices.rotate,
    matrixMultiply(matrices.shear, matrices.scale)
  );
  return coords => {
    const coordinateMatrix = [
      [coords[0]],
      [coords[1]],
      [1]
    ];
    const product = matrixMultiply(transformationMatrix, coordinateMatrix);
    return [product[0][0], product[1][0]];
  };
};

/**
 * Applies a standard 30° isometric transform to the [x, y] coordinate pair.
 * @param {Array[number]} coordinates - an [x, y] coordinate pair
 * @return {Array[number]} isometric coordinate pair
 */
const standardIsometricTransform = makeIsometricTransform(30);

export {
  makeIsometricTransform,
  standardIsometricTransform
};
