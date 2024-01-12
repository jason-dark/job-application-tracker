import { AppShell, AppShellHeaderProps, Title, Flex, Button, Container } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeInOut } from 'lib/animation';
import { useSupabase } from 'lib/hooks';

interface HeaderProps extends AppShellHeaderProps {}

export const Header = ({ ...props }: HeaderProps) => {
  const { loaded, user, signOut } = useSupabase();

  return (
    <AppShell.Header withBorder={false} zIndex={2} {...props}>
      <Container h='100%'>
        <Flex align='center' justify='space-between' h='100%'>
          <Title order={1} c='indigo' fz='lg'>
            Job Application Tracker
          </Title>
          <AnimatePresence mode='wait'>
            {loaded && !!user && (
              <motion.div key='show-sign-out' {...fadeInOut}>
                <Button
                  size='compact-xs'
                  variant='default'
                  rightSection={<IconLogout style={{ width: 14 }} />}
                  onClick={signOut}
                >
                  Sign out
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Flex>
      </Container>
    </AppShell.Header>
  );
};
