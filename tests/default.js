import { toRadians, toDegrees, dotProduct, transpose } from '../index';
import assert from 'assert';

describe('isometryjs', () => {
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
