import { toRadians, matrixMultiply } from './utils';

/**
 * Transforms x and y coordinates to create a z height illusion when
 * subsequently passed through an isometric transform.
 *
 * The illusion of z position in an isometric coordinate system is acheived by
 * subtracting z from both x and y.  To achieve symmetry, the sign of z is
 * flipped such that passing the resulting coordinates through the transform
 * again results in the original coordinates.
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z virtual coordinate used to create the z height illusion
 * @return {Array[number]} coordinates transformed for z height illusion
 */
function zTransform (x, y, z=0) {
  return [x - z, y - z, -z];
};

/**
 * Creates a matrix multiplication function that multiplies the passed
 * transformationMatrix with a coordinate matrix.
 * The z argument is pass-through.
 * @param {Array[Array[number]]} transformationMatrix
 * @return {Function} fn expects two arguments, (x,y,z) coordinates
 */
function makeCoordinateMatrixMultiplicationTransform (transformationMatrix) {
  return (x, y, z) => {
    const coordinateMatrix = [[x], [y], [1]];
    const product = matrixMultiply(transformationMatrix, coordinateMatrix);
    return [product[0][0], product[1][0], z];
  };
};

/**
 * Creates an isometric transformation function using the specified degrees.
 * @param {number} degrees
 * @return {Function} fn expects three arguments, (x,y,z) coordinates
 *   (z is optional and results in a z height illusion)
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
  const transform =
    makeCoordinateMatrixMultiplicationTransform(transformationMatrix);
  return (x, y, z) => transform(...zTransform(x, y, z));
};

/**
 * Creates an inverse isometric transformation function using the
 * specified degrees.
 * @param {number} degrees
 * @return {Function} fn expects three arguments, (x,y,z) coordinates
 *   (z is optional and returns original coordinates if z was used originally)
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
  const transform =
    makeCoordinateMatrixMultiplicationTransform(transformationMatrix);
  return (x, y, z) => zTransform(...transform(x, y, z));
};

/**
 * Applies a standard 30° isometric transform to
 * the x,y,z coordinate triplet.
 * Passing a z argument creates a z height illusion.
 * @param {number} x coordinate
 * @param {number} y coordinate
 * @param {number} z coordinate (optional)
 * @return {Array[number]} isometric coordinate triplet
 */
const standardIsometricTransform = makeIsometricTransform(30);

/**
 * Applies a standard 30° inverse isometric transform to
 * the x,y,z coordinate triplet.
 * Passing a z argument corrects for a z height illusion.
 * @param {number} x coordinate
 * @param {number} y coordinate
 * @param {number} z coordinate (optional)
 * @return {Array[number]} non-isometric coordinate triplet
 */
const standardInverseIsometricTransform = makeInverseIsometricTransform(30);

export {
  makeIsometricTransform,
  makeInverseIsometricTransform,
  standardIsometricTransform,
  standardInverseIsometricTransform
};
