import { renderHook } from 'lib/testing/test-utils';
import { notifications } from '@mantine/notifications';
import { useNotifications } from './use-notifications';

describe('useNotifications', () => {
  beforeEach(() => {
    jest.spyOn(notifications, 'show').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call notifications.show with the correct parameters when notifyError is called', () => {
    const { result } = renderHook(() => useNotifications());
    const { notifyError } = result.current;

    const errorMessage = 'Something went wrong';
    notifyError(errorMessage);

    expect(notifications.show).toHaveBeenCalledWith({
      title: expect.any(Object),
      message: expect.any(Object),
      color: 'white',
      bg: expect.any(String),
    });

    const showCall = notifications.show.mock.calls[0][0];
    expect(showCall.title.props.children).toBe('Error');
    expect(showCall.message.props.children).toBe(errorMessage);
    expect(showCall.bg).toBe('#ff5252');
  });
});
