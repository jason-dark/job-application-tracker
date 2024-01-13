import { renderHook } from 'lib/testing/test-utils';
import { notifications } from '@mantine/notifications';
import { useNotifications } from './use-notifications';

jest.mock('@mantine/notifications', () => ({
  notifications: {
    show: jest.fn(),
  },
}));

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
  });
});
