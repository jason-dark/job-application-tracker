import { SamplerArray } from './sampler-array';

describe('sampler', () => {
  it('should return a random item from the array', () => {
    const testArray = new SamplerArray('a', 'b', 'c', 'd', 'e');
    const result = testArray.sample();
    expect(testArray).toContain(result);
  });

  it('should return undefined for an empty array', () => {
    const emptyArray = new SamplerArray();
    const result = emptyArray.sample();
    expect(result).toBeUndefined();
  });

  it('should return the only item for an array with a single item', () => {
    const singleItemArray = new SamplerArray(42);
    const result = singleItemArray.sample();
    expect(result).toBe(42);
  });
});
