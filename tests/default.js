import {
  toRadians,
  toDegrees,
  dotProduct,
  transpose,
  matrixMultiply,
  standardIsometricTransform,
  standardInverseIsometricTransform
} from '../index';
import assert from 'assert';

const compareXYPair = (results, expected, assert) => {
  results.forEach((value, i) =>
    assert.equal(
      // NOTE:  for testing purposes results must be rounded, since
      // different engines return slightly different results after
      // ~13 decimal digits.  In practice this variance is acceptable,
      // so rounding by the transform itself is unnecessary.
      parseFloat(value.toFixed(10)),
      parseFloat(expected[i].toFixed(10))
    )
  );
};

describe('isometryjs', () => {

  describe('iso', () => {
    describe('standardIsometricTransform', () => {
      it('works', () => {
        const inputOutputPairs = [
          [[10, 10, 10], [0, 0, -10]],
          [[10, 10], [1.7763568394002505e-15, 10, 0]],
          [[-180, 360], [-467.6537180435969, 90.0000000000001, 0]],
          [[1900, -2049], [3419.934319544748, -74.50000000000057, 0]]
        ];
        inputOutputPairs.forEach(pair => {
          const result = standardIsometricTransform(...pair[0]);
          compareXYPair(result, pair[1], assert);
        });
      });
    });

    describe('standardInverseIsometricTransform', () => {
      it('works', () => {
        const inputOutputPairs = [
          [[0, 0, -10], [10, 10, 10]],
          [[1.7763568394002505e-15, 10], [10, 10, 0]],
          [[-467.6537180435969, 90.0000000000001], [-180, 360, 0]],
          [[3419.934319544748, -74.50000000000057], [1900, -2049, 0]]
        ];
        inputOutputPairs.forEach(pair => {
          const result = standardInverseIsometricTransform(...pair[0]);
          compareXYPair(result, pair[1], assert);
        });
      });
    });
  });

  describe('utils', () => {
    describe('toRadians()', () => {
      it('works', () => {
        assert.equal(toRadians(0), 0);
        assert.equal(toRadians(45),  (Math.PI / 4));
        assert.equal(toRadians(90),  (Math.PI / 2));
        assert.equal(toRadians(180), (Math.PI));
        assert.equal(toRadians(360), (Math.PI * 2));
      });
    });

    describe('toDegrees()', () => {
      it('works', () => {
        assert.equal(toDegrees(0), 0);
        assert.equal(toDegrees(Math.PI / 4), 45);
        assert.equal(toDegrees(Math.PI / 2), 90);
        assert.equal(toDegrees(Math.PI),     180);
        assert.equal(toDegrees(Math.PI * 2), 360);
      });
    });

    describe('dotProduct()', () => {
      it('works', () => {
        assert.equal(dotProduct([1, 2, 3], [7, 9, 11]), 58);
        assert.equal(dotProduct([1, 2, 3], [8, 10, 12]), 64);
        assert.equal(dotProduct([4, 5, 6], [7, 9, 11]), 139);
        assert.equal(dotProduct([4, 5, 6], [8, 10, 12]), 154);
      });
    });

    describe('transpose()', () => {
      it('works', () => {
        const matrix = [
          [1, 2],
          [3, 4],
          [5, 6]
        ];
        const result = transpose(matrix);
        assert.equal(result[0][0], 1);
        assert.equal(result[0][1], 3);
        assert.equal(result[0][2], 5);
        assert.equal(result[1][0], 2);
        assert.equal(result[1][1], 4);
        assert.equal(result[1][2], 6);
      });
      it('works', () => {
        const matrix = [
          [9, 8, 7],
          [6, 5, 4]
        ];
        const result = transpose(matrix);
        assert.equal(result[0][0], 9);
        assert.equal(result[0][1], 6);
        assert.equal(result[1][0], 8);
        assert.equal(result[1][1], 5);
        assert.equal(result[2][0], 7);
        assert.equal(result[2][1], 4);
      });
    });

    describe('matrixMultiply()', () => {
      it('works', () => {
        const matrix1 = [
          [1, 2, 3],
          [4, 5, 6]
        ];
        const matrix2 = [
          [7, 8],
          [9, 10],
          [11, 12]
        ];
        const result = matrixMultiply(matrix1, matrix2);
        assert.equal(result[0][0], 58);
        assert.equal(result[0][1], 64);
        assert.equal(result[1][0], 139);
        assert.equal(result[1][1], 154);
      });
    });
  });

});

Testem.afterTests((config, data, callback) => {
  const coverage = JSON.stringify(window.__coverage__);
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) callback();
  };
  xhr.open('POST', '/coverage', true);
  xhr.send(coverage);
});
