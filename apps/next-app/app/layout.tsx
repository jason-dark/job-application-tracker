import type { Metadata } from 'next';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir';
import '@mantine/core/styles.css';
import { theme } from '../lib/theme';

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
      <body>
        <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
          <MantineProvider defaultColorScheme='dark' theme={theme}>
            {children}
          </MantineProvider>
        </NextAppDirEmotionCacheProvider>
      </body>
    </html>
  );
}
