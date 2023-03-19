import { helloWorld, goodBye } from '../src/index';
import npmPackage from '../src/index';

describe('NPM Package', () => {
  it('should be an object', () => {
    expect(typeof npmPackage).toBe("object");
  });

  it('should have a helloWorld property', () => {
    expect(npmPackage).toHaveProperty('helloWorld');
  });
});

describe('Hello World Function', () => {
  it('should be a function', () => {
    expect(typeof helloWorld).toBe("function");
  });

  it('should return the hello world message', () => {
    const expected = 'Hello World from my example modern npm package!';
    const actual = helloWorld();
    expect(actual).toEqual(expected);
  });
});

describe('Goodbye Function', () => {
  it('should be a function', () => {
    expect(typeof goodBye).toBe("function");
  });

  it('should return the goodbye message', () => {
    const expected = 'Goodbye from my example modern npm package!';
    const actual = goodBye();
    expect(actual).toEqual(expected);
  });
});