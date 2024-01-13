import { MantineProvider } from '@mantine/core';
import React, { ReactNode } from 'react';
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir';

export const MockProviders = ({ children }: { children: ReactNode }) => {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
      {/* <Notifications /> */}
      <MantineProvider>{children}</MantineProvider>
    </NextAppDirEmotionCacheProvider>
  );
};
