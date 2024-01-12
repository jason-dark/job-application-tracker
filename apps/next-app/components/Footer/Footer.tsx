import { AppShell, Container, AppShellFooterProps, Anchor, rem, Box, Group } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import { theme } from 'lib/theme';

const iconProps = {
  w: rem(18),
  h: rem(18),
  mb: rem(-4),
  mr: rem(4),
  c: theme.colors.dark[0],
};

const anchorProps = {
  size: 'xs',
  fw: 'bold',
  target: '__blank',
};

interface FooterProps extends AppShellFooterProps {}

export const Footer = ({ ...props }: FooterProps) => {
  return (
    <AppShell.Footer withBorder={false} zIndex={2} {...props}>
      <Container h='100%'>
        <Group h='100%' justify='flex-start' gap='lg'>
          <Anchor {...anchorProps} href='https://www.linkedin.com/in/jason-dark/'>
            <Box component={IconBrandLinkedin} {...iconProps} />
            Jason Dark
          </Anchor>
          <Anchor {...anchorProps} href='https://github.com/jason-dark/job-application-tracker'>
            <Box component={IconBrandGithub} {...iconProps} />
            GitHub project
          </Anchor>
        </Group>
      </Container>
    </AppShell.Footer>
  );
};
