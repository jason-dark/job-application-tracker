import { Box, BoxProps, Button, Stack, Text, Title } from '@mantine/core';
import {
  IconBrandApple,
  IconBrandGmail,
  IconBrandWindows,
  IconExternalLink,
} from '@tabler/icons-react';

interface AuthSuccessProps extends BoxProps {
  email: string;
  onGoBack: () => void;
}

const MAIL_PROVIDERS = [
  {
    label: 'Gmail',
    href: 'https://mail.google.com/mail',
    icon: IconBrandGmail,
  },
  {
    label: 'Outlook',
    href: 'https://outlook.office365.com/mail',
    icon: IconBrandWindows,
  },
  {
    label: 'iCloud Mail',
    href: 'https://www.icloud.com/mail',
    icon: IconBrandApple,
  },
];

export const AuthSuccess = ({ email, onGoBack, ...props }: AuthSuccessProps) => {
  return (
    <Box {...props}>
      <Title order={4}>Please check your email</Title>
      <Text size='sm' mt='xs'>
        We have sent an email to <b>{email}</b> with a sign in link. Please click this link to
        create your account or sign in.
      </Text>
      <Stack justify='space-between' mt='md'>
        {MAIL_PROVIDERS.map(({ label, icon, href }) => (
          <Button
            key={label}
            component='a'
            variant='light'
            target='_blank'
            leftSection={<Box component={icon} size={14} />}
            rightSection={<IconExternalLink size={14} />}
            href={href}
          >
            {label}
          </Button>
        ))}
      </Stack>
      <Button type='submit' w='100%' mt='lg' variant='outline' onClick={onGoBack}>
        Go back
      </Button>
    </Box>
  );
};
