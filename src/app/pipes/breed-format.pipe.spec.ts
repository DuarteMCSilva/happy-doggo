import { FormatBreedPipe } from './breed-format.pipe';

describe('CapitalizePipe', () => {
  it('create an instance', () => {
    const pipe = new FormatBreedPipe();
    expect(pipe).toBeTruthy();
  });

  it('should format input', () => {
    const pipe = new FormatBreedPipe();
    expect(pipe.transform(['random', 'input'])).toEqual('Random - Input');
    expect(pipe.transform(['Already', 'capitalized'])).toEqual('Already - Capitalized');
  });
});
