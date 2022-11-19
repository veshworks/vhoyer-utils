import { describe, it, expect} from 'vitest';
import * as utils from '../string';

describe('Utils > String', () => {
  describe('#getUID', () => {
    it('generates a unique string', () => {
      const uid = utils.getUID();

      expect(uid).toEqual(expect.any(String));
      expect(uid.length).toEqual(10);
    });

    it('generates a unique string with the given length', () => {
      const uid = utils.getUID({ length: 3 });

      expect(uid).toEqual(expect.any(String));
      expect(uid.length).toEqual(3);
    });

    it('generates a unique string with the given set of random characters', () => {
      const uid = utils.getUID({ set: 'a' });

      expect(uid).toEqual('aaaaaaaaaa');
    });
  });
});
