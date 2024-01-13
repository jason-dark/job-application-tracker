import { Box, BoxProps, Button, TextInput, Title } from '@mantine/core';
import { isEmail,useForm } from '@mantine/form';
import { Supabase } from 'lib/supabase-client';
import { useCallback, useState } from 'react';

interface AuthFormProps extends BoxProps {
  onSubmit: (email: string) => void;
}

export const AuthForm = ({ onSubmit, ...props }: AuthFormProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<{ email: string }>({
    initialValues: {
      email: '',
    },
    validate: {
      email: isEmail('Please enter a valid email'),
    },
  });

  const sendMagicLink = useCallback(
    async (email: string) => {
      form.clearErrors();
      setLoading(true);
      const { error } = await Supabase.getInstance().client.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
      setLoading(false);
      if (error) {
        return form.setFieldError('email', 'Sorry, something went wrong');
      }
      return onSubmit(email);
    },
    [form, onSubmit]
  );

  return (
    <Box {...props}>
      <Title order={4}>Please create an account or sign in</Title>
      <Box
        component='form'
        onSubmit={form.onSubmit((values) => sendMagicLink(values.email))}
        mt='xl'
      >
        <TextInput label='Email' placeholder='your@email.com' {...form.getInputProps('email')} />
        <Button type='submit' w='100%' mt='xs' loading={loading}>
          Continue
        </Button>
      </Box>
    </Box>
  );
};
