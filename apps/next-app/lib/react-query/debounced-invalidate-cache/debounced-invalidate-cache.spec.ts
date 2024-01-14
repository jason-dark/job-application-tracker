import { DebouncedInvalidateCache } from './debounced-invalidate-cache';

describe('DebouncedInvalidateCache', () => {
  it('should return the same instance whenever called', () => {
    const instance1 = DebouncedInvalidateCache.getInstance();
    const instance2 = DebouncedInvalidateCache.getInstance();
    expect(instance1).toBe(instance2);
  });
});
