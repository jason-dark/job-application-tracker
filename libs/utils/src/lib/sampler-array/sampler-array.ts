export class SamplerArray<T> extends Array<T> {
  constructor(...items: T[]) {
    super();
    this.push(...items);
  }

  public sample() {
    if (this.length === 1) {
      return this[0];
    }
    return this[Math.floor(Math.random() * this.length)];
  }
}
