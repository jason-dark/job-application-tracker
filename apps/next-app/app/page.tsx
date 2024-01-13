'use client';

import { COMPANIES, JOB_TITLES } from '@job-application-tracker/constants';
import { SamplerArray } from '@job-application-tracker/utils';
import { AppShell, Container, Loader } from '@mantine/core';
import { AuthedHome } from 'components/AuthedHome';
import { AuthModal } from 'components/AuthModal';
import { DataTable } from 'components/DataTable';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { useSupabase } from 'lib/hooks';

const randomJobs = [...Array(20)].map((_, i) => ({
  id: i.toString(),
  company: new SamplerArray(...COMPANIES).sample(),
  job_title: new SamplerArray(...JOB_TITLES).sample(),
  created_at: new Date().toISOString(),
  hyperlink: '',
  status: 'applied',
  user_id: i.toString(),
}));

export default function Home() {
  const { loaded, user } = useSupabase();

  return (
    <AppShell header={{ height: 60 }} footer={{ height: 60 }} padding='md'>
      <Header />
      <AppShell.Main bg='dark.8' pos='relative'>
        {/* Show loader if we don't yet know whether or not a user is authed */}
        {!loaded && !user && (
          <Loader
            size='xl'
            pos='absolute'
            m='auto'
            top={0}
            right={0}
            bottom={0}
            left={0}
            data-testid='loader'
          />
        )}
        {/* Show the auth modal and data table with dummy data if no user is authed */}
        {loaded && !user && (
          <>
            <AuthModal />
            <Container px={0}>
              {/* Random jobs to make the unauthed view look better, table is shown behind the blur of the auth modal */}
              <DataTable jobs={randomJobs} />
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
