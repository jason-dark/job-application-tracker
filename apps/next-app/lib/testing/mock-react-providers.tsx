import React, { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir';

export const MockProviders = ({ children }: { children: ReactNode }) => {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
      <MantineProvider>{children}</MantineProvider>
    </NextAppDirEmotionCacheProvider>
  );
};
