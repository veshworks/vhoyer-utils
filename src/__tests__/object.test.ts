import { describe, it, expect} from 'vitest';
import * as utils from '../object';

describe('Utils > Object', () => {
  describe('#set', () => {
    it('sets a simple key', () => {
      expect(utils.set({}, 'simple', 1)).toEqual({
        simple: 1,
      });
    });

    it('sets a simple key and keeps the original value', () => {
      expect(utils.set({ complex: 2 }, 'simple', 1)).toEqual({
        simple: 1,
        complex: 2,
      });
    });

    it('sets a child key and keeps the original value', () => {
      expect(utils.set({ complex: 2 }, 'parent.child', 3)).toEqual({
        complex: 2,
        parent: {
          child: 3,
        },
      });
    });

    it('sets a 2 deep child key and keeps the original value', () => {
      expect(utils.set({ complex: 3 }, 'grand.parent.child', 'frick')).toEqual({
        complex: 3,
        grand: {
          parent: {
            child: 'frick',
          },
        },
      });
    });

    it('sets a deep child in a existing deep child', () => {
      const arranged = {
        complex: 3,
        grand: {
          parent: {
            child: 'frick',
          },
        },
      };

      expect(utils.set(arranged, 'grand.parent.sibling', 'frick too')).toEqual({
        complex: 3,
        grand: {
          parent: {
            child: 'frick',
            sibling: 'frick too',
          },
        },
      });
    });
  });

  describe('#get', () => {
    it('returns a value from a child', () => {
      expect(utils.get({ child: 'f' }, 'child')).toEqual('f');
    });

    it('returns a value from a grandchild', () => {
      expect(utils.get({ parent: { child: 'f' } }, 'parent.child')).toEqual('f');
    });

    it('returns a value from a grand-grandchild', () => {
      const arranged = { grand: { parent: { child: 'f' } } };

      expect(utils.get(arranged, 'grand.parent.child')).toEqual('f');
    });
  });

  describe('#flat', () => {
    it('returns the same object from an already flat object', () => {
      const input = {
        a: 1,
        b: 2,
      };

      expect(utils.flat(input)).toEqual(input);
    });

    it('returns a flat object from a non flat object', () => {
      const input = {
        a: { b: 1 },
        c: 2,
        d: {
          e: 3,
          f: { g: 4, h: 5 },
        },
      };

      expect(utils.flat(input)).toEqual({
        'a.b': 1,
        'c': 2,
        'd.e': 3,
        'd.f.g': 4,
        'd.f.h': 5,
      });
    });
  });

  describe('#inflate', () => {
    it('returns the same object from an already inlfated object', () => {
      const input = {
        a: 1,
        b: 2,
      };

      expect(utils.inflate(input)).toEqual(input);
    });

    it('returns a inflated object from a flat object', () => {
      const input = {
        'a.b': 1,
        'c': 2,
        'd.e': 3,
        'd.f.g': 4,
        'd.f.h': 5,
      };

      expect(utils.inflate(input)).toEqual({
        a: { b: 1 },
        c: 2,
        d: {
          e: 3,
          f: { g: 4, h: 5 },
        },
      });
    });
  });
});
