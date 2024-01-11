import { AppShell, Container, AppShellHeaderProps, Title, Flex } from '@mantine/core';

interface HeaderProps extends AppShellHeaderProps {}

export const Header = ({ ...props }: HeaderProps) => {
  return (
    <AppShell.Header withBorder={false} zIndex={2} {...props}>
      <Container h='100%'>
        <Flex align='center' h='100%'>
          <Title order={1} c='indigo' fz='lg'>
            Job Application Tracker
          </Title>
        </Flex>
      </Container>
    </AppShell.Header>
  );
};
