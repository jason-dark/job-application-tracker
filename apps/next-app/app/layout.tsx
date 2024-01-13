import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { ColorSchemeScript,MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ReactQueryProvider } from 'lib/react-query';
import { theme } from 'lib/theme';
import type { Metadata } from 'next';
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir';

export const metadata: Metadata = {
  title: 'Job Application Tracker',
  description: 'Used to track job applications you have on the go',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript defaultColorScheme='dark' />
      </head>
      {/* This site is fully staticly generated so suppressing hydration warnings is fine and makes the
      console less noisy in dev */}
      <body suppressHydrationWarning={true}>
        <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
          <MantineProvider defaultColorScheme='dark' theme={theme}>
            <Notifications />
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </MantineProvider>
        </NextAppDirEmotionCacheProvider>
      </body>
    </html>
  );
}
