import { toRadians, toDegrees } from '../index';
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
