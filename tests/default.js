import { toRadians } from '../index';
import assert from 'assert';

describe('isometryjs', () => {
  describe('radians', () => {
    describe('toRadians()', () => {
      it('works', () => {
        assert.equal(toRadians(0), 0);
        assert.equal(toRadians(45), 0.7853981633974483);
        assert.equal(toRadians(90), 1.5707963267948966);
        assert.equal(toRadians(180), Math.PI);
        assert.equal(toRadians(360), 6.283185307179586);
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
