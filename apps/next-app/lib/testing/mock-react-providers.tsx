import React, { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir';
import { Notifications } from '@mantine/notifications';

export const MockProviders = ({ children }: { children: ReactNode }) => {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
      {/* <Notifications /> */}
      <MantineProvider>{children}</MantineProvider>
    </NextAppDirEmotionCacheProvider>
  );
};
