import { describe, it, expect} from 'vitest';
import * as utils from '../array';

describe('Utils > String', () => {
  describe('#randomItemFrom', () => {
    const source = 'abcde'.split('');

    it('has a good distribution of selection', () => {
      const distribution = { a: 0, b: 0, c: 0, d: 0, e: 0, } as any;
      const count = 1000000;
      const eachExpect = 1/5;

      for (let i = 0; i < count; i++) {
        const selected = utils.randomItemFrom(source);
        ++distribution[selected];
      }

      expect(distribution.a / count).toBeCloseTo(eachExpect);
      expect(distribution.b / count).toBeCloseTo(eachExpect);
      expect(distribution.c / count).toBeCloseTo(eachExpect);
      expect(distribution.d / count).toBeCloseTo(eachExpect);
      expect(distribution.e / count).toBeCloseTo(eachExpect);
    });
  });
});
