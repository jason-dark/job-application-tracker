'use client';

import { AppShell, Container } from '@mantine/core';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';

export default function Home() {
  return (
    <AppShell header={{ height: 60 }} footer={{ height: 60 }} padding='md'>
      <Header />
      <AppShell.Main>
        <Container>
          <div>App</div>
        </Container>
      </AppShell.Main>
      <Footer />
    </AppShell>
  );
}
