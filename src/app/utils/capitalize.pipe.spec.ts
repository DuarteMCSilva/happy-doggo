import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalizePipe();
    expect(pipe).toBeTruthy();
  });

  it('should capitalize input', () => {
    const pipe = new CapitalizePipe();
    expect(pipe.transform('random input')).toEqual('Random input');
    expect(pipe.transform('Already capitalized')).toEqual('Already capitalized');
  });
});
