import fetch from 'jest-mock-fetch';

// @ts-ignore
global.fetch = fetch;

/*
class AppendableObjectMock {
  append;

  constructor() {
    this.append = jest.fn();
  }
}
global.FormData = AppendableObjectMock;
global.Headers = AppendableObjectMock;
global.setImmediate = global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));


jest
  .spyOn(EPSApi.prototype, 'doRequest')
  .mockImplementation(async (uri: string, method?: string, body?: any) => {
    method = (method ? method : 'GET').toUpperCase();
    return { status: method === 'POST' ? 201 : 200, result: generateMockDataForUri(uri) };
  });
*/