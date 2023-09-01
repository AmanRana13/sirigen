import PusherAPI from './pusherAPI';

describe('PusherAPI', () => {
  jest.mock('./pusherAPI.ts');
  const pusher = new PusherAPI();

  beforeEach(() => {
    pusher.pusherConnect('aas', {cluster: 'ap2'});
  });

  afterEach(() => {
    pusher.pusherDisconnect();
  });

  it('should consumer call the class method pusherConnect', () => {
    const spy = jest.spyOn(pusher, 'pusherConnect');
    pusher.pusherConnect('asas', {cluster: 'ap2'});
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockClear();
  });

  test('should define pusher property', () => {
    expect(pusher.pusher).toHaveProperty('channels');
  });

  test('should call the pusher state change handler', async () => {
    const spyOnPusherStateChange = jest.spyOn(pusher, 'onPusherStateChange');
    const mockFn = jest.fn();
    pusher.onPusherStateChange(mockFn);

    expect(spyOnPusherStateChange).toHaveBeenCalledWith(mockFn);
    spyOnPusherStateChange.mockClear();
  });

  test('should call the disconnect', () => {
    const spyPusherDisconnect = jest.spyOn(pusher, 'pusherDisconnect');
    pusher.pusherDisconnect();

    expect(spyPusherDisconnect).toHaveBeenCalledTimes(1);
    expect(pusher.pusher.connection.state).toBe('disconnected');
  });
});
