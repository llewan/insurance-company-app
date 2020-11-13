const UsersRouter = require('./users/router');
const PoliciesRouter = require('./policies/router');
const SecurityRouter = require('./security/router');

const useSpy = jest.fn();
const listenSpy = jest.fn();

jest.doMock('express', () => {
  return () => ({
    use: useSpy,
    listen: listenSpy,
    json: () => {}
  });
});

describe('should test server configuration', () => {
  const Server = require('./server');
  new Server();

  test('use router', () => {
    expect(useSpy).toHaveBeenCalledWith('/users', UsersRouter);
    expect(useSpy).toHaveBeenCalledWith('/policies', PoliciesRouter);
    expect(useSpy).toHaveBeenCalledWith('/authenticate', SecurityRouter);
  });
  test('should call listen fn', () => {
    expect(listenSpy).toHaveBeenCalled();
  });
});