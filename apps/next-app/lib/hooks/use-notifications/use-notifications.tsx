import { Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { theme } from 'lib/theme';
import { useCallback } from 'react';

export const useNotifications = () => {
  const notifyError = useCallback((message: string) => {
    notifications.show({
      title: (
        <Text c='white' size='sm' fw={700}>
          Error
        </Text>
      ),
      message: (
        <Text c='white' size='xs'>
          {message}
        </Text>
      ),
      color: 'white',
      bg: theme.colors.red[7],
    });
  }, []);

  return { notifyError };
};
