import { describe, it, expect, vi } from 'vitest';
import * as utils from '../event';

describe('event', () => {
  describe('#debounce', () => {
    it('should debounce the function', () => {
      vi.useFakeTimers();
      const fn = vi.fn();
      const debounced = utils.debounce(fn, 100);

      debounced();
      debounced();
      debounced();

      vi.runAllTimers();

      expect(fn).toHaveBeenCalledTimes(1);
    });
  });
});
