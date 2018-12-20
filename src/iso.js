import { toRadians, matrixMultiply } from './utils';

/**
 * Creates a matrix multiplication function that multiplies the passed
 * transformationMatrix with a coordinate matrix.
 * @param {Array[Array[number]]} transformationMatrix
 * @return {Function} fn expects two arguments, (x,y) coordinates
 */
function makeCoordinateMatrixMultiplicationTransform (transformationMatrix) {
  return (x, y) => {
    const coordinateMatrix = [[x], [y], [1]];
    const product = matrixMultiply(transformationMatrix, coordinateMatrix);
    return [product[0][0], product[1][0]];
  };
};

/**
 * Creates an isometric transformation function using the specified degrees.
 * @param {number} degrees
 * @return {Function} fn expects two arguments, (x,y) coordinates
 */
function makeIsometricTransform (degrees) {
  const rads = toRadians(degrees);
  const rotationMatrix = [
    [Math.cos(rads), -Math.sin(rads), 0],
    [Math.sin(rads), Math.cos(rads), 0],
    [0, 0, 1]
  ];
  const shearMatrix = [
    [1, Math.tan(-rads), 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  const scaleMatrix = [
    [1, 0, 0],
    [0, Math.cos(-rads), 0],
    [0, 0, 1]
  ];
  const transformationMatrix = matrixMultiply(
    rotationMatrix, matrixMultiply(shearMatrix, scaleMatrix)
  );
  return makeCoordinateMatrixMultiplicationTransform(transformationMatrix);
};

/**
 * Creates an inverse isometric transformation function using the
 * specified degrees.
 * @param {number} degrees
 * @return {Function} fn expects two arguments, (x,y) coordinates
 */
function makeInverseIsometricTransform (degrees) {
  const rads = toRadians(degrees);
  // TODO:  this matrix does not support inverse isometric transforms for any
  // degrees other than (standard) 30°.
  const transformationMatrix = [
    [Math.tan(rads), 1, 0],
    [-Math.tan(rads), 1, 0],
    [0, 0, 1]
  ];
  return makeCoordinateMatrixMultiplicationTransform(transformationMatrix);
};

/**
 * Applies a standard 30° isometric transform to
 * the x, y coordinate pair.
 * @param {number} x coordinate
 * @param {number} y coordinate
 * @return {Array[number]} isometric coordinate pair
 */
const standardIsometricTransform = makeIsometricTransform(30);

/**
 * Applies a standard 30° inverse isometric transform to
 * the x,y coordinate pair.
 * @param {number} x coordinate
 * @param {number} y coordinate
 * @return {Array[number]} non-isometric coordinate pair
 */
const standardInverseIsometricTransform = makeInverseIsometricTransform(30);

export {
  makeIsometricTransform,
  makeInverseIsometricTransform,
  standardIsometricTransform,
  standardInverseIsometricTransform
};
