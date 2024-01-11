'use client';

import { AppShell, Container } from '@mantine/core';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { DataTable } from 'components/DataTable';
import { v4 as uuidv4 } from 'uuid';
import { COMPANIES, JOB_TITLES } from '@job-application-tracker/constants';
import { AuthModal } from 'components/AuthModal';

export default function Home() {
  return (
    <AppShell header={{ height: 60 }} footer={{ height: 60 }} padding='md'>
      <Header />
      <AppShell.Main bg='dark.8'>
        <Container pos='relative'>
          <DataTable
            jobs={[...Array(16)].map(() => ({
              id: uuidv4(),
              company: COMPANIES.sample(),
              job_title: JOB_TITLES.sample(),
              created_at: new Date().toISOString(),
              hyperlink: 'https://www.metacareers.com/v2/jobs/237697185997433/',
              status: 'applied',
              user_id: uuidv4(),
            }))}
          />
        </Container>
        <AuthModal />
      </AppShell.Main>
      <Footer />
    </AppShell>
  );
}
