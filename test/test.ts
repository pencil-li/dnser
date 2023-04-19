import { getTldInfo } from '../src/index';

describe('getTldInfo', () => {
  it('should return HNS TLDs', () => {
    const hnsTlds = getTldInfo('HNS');
    expect(hnsTlds).toBeInstanceOf(Array);
    expect(hnsTlds.length).toBeGreaterThan(0);
  });

  it('should return ICANN TLDs', () => {
    const icannTlds = getTldInfo('ICANN');
    expect(icannTlds).toBeInstanceOf(Array);
    expect(icannTlds.length).toBeGreaterThan(0);
  });

  it('should return an empty array for unknown TLD types', () => {
    const unknownTlds = getTldInfo('unknown' as any);
    expect(unknownTlds).toBeInstanceOf(Array);
    expect(unknownTlds.length).toBe(0);
  });
});
