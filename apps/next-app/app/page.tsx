'use client';

import { AppShell, Container, Loader } from '@mantine/core';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { DataTable } from 'components/DataTable';
import { v4 as uuidv4 } from 'uuid';
import { COMPANIES, JOB_TITLES } from '@job-application-tracker/constants';
import { AuthModal } from 'components/AuthModal';
import { useSupabase } from 'lib/hooks';
import { AuthedHome } from 'components/AuthedHome';

export default function Home() {
  const { loaded, user } = useSupabase();

  return (
    <AppShell header={{ height: 60 }} footer={{ height: 60 }} padding='md'>
      <Header />
      <AppShell.Main bg='dark.8' pos='relative'>
        {/* Show loader if we don't yet know whether or not a user is authed */}
        {!loaded && !user && (
          <Loader size='xl' pos='absolute' m='auto' top={0} right={0} bottom={0} left={0} />
        )}
        {/* Show the auth modal and data table with dummy data if no user is authed */}
        {loaded && !user && (
          <>
            <AuthModal />
            <Container>
              <DataTable
                jobs={[...Array(20)].map(() => ({
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
          </>
        )}
        {/* Show the main home page if the user is authed */}
        {loaded && !!user && <AuthedHome />}
      </AppShell.Main>
      <Footer />
    </AppShell>
  );
}
