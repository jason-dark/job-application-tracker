import { Modal, ModalProps } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeInOut } from 'lib/animation';
import { AuthForm } from 'components/AuthForm';
import { AuthSuccess } from 'components/AuthSuccess';

interface AuthModalProps extends Partial<ModalProps> {}

export const AuthModal = ({ ...props }: AuthModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [email, setEmail] = useState('');

  return (
    <Modal
      opened={true}
      onClose={close}
      title='Authentication'
      centered
      overlayProps={{ backgroundOpacity: 0.2, blur: 3 }}
      zIndex={1}
      withCloseButton={false}
      {...props}
    >
      <AnimatePresence mode='wait'>
        {email ? (
          <motion.div key='success' {...fadeInOut}>
            <AuthSuccess email={email} onGoBack={() => setEmail('')} />
          </motion.div>
        ) : (
          <motion.div key='email-form' {...fadeInOut}>
            <AuthForm onSubmit={setEmail} />
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};
