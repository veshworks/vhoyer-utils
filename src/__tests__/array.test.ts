import { describe, it, expect} from 'vitest';
import * as utils from '../array';

describe('Utils > String', () => {
  const source = 'abcde'.split('');
  const count = 1000000;

  describe('#randomItemFrom', () => {
    it('has a good distribution of selection', () => {
      const distribution = { a: 0, b: 0, c: 0, d: 0, e: 0 } as any;
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

  describe('#shuffle', () => {
    it('has a good distribution of shuffleness', () => {
      const eachExpect = 1/5;
      const distribution = [
        { a: 0, b: 0, c: 0, d: 0, e: 0 },
        { a: 0, b: 0, c: 0, d: 0, e: 0 },
        { a: 0, b: 0, c: 0, d: 0, e: 0 },
        { a: 0, b: 0, c: 0, d: 0, e: 0 },
        { a: 0, b: 0, c: 0, d: 0, e: 0 },
      ] as any;

      for (let i = 0; i < count; i++) {
        const shuffled = utils.shuffle([...source]);

        shuffled.forEach((key: 'a'|'b'|'c'|'d'|'e', position) => {
          ++distribution[position][key];
        });
      }

      for (let position = 0; position < 5; ++position) {
        expect(distribution[position].a / count).toBeCloseTo(eachExpect);
        expect(distribution[position].b / count).toBeCloseTo(eachExpect);
        expect(distribution[position].c / count).toBeCloseTo(eachExpect);
        expect(distribution[position].d / count).toBeCloseTo(eachExpect);
        expect(distribution[position].e / count).toBeCloseTo(eachExpect);
      }
    });
  });

  describe('#range', () => {
    it('creates range appropriately', () => {
      expect(utils.range({ length: 3 }))
        .toEqual([0, 0.5, 1]);
      expect(utils.range({ length: 5, min: 1, max: 2 }))
        .toEqual([1, 1.25, 1.5, 1.75, 2]);
      expect(utils.range({ length: 10, min: 10, max: 100 }))
        .toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    });
  });
});
