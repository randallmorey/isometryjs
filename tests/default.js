import { foo } from '../index';
import assert from 'assert';

describe('isometryjs', () => {
  describe('foo()', () => {
    it('works', () => {
      assert.equal(foo(1, 1), 2);
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
