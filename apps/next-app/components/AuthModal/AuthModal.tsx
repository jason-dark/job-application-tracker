import { Modal, ModalProps } from '@mantine/core';
import { AuthForm } from 'components/AuthForm';
import { AuthSuccess } from 'components/AuthSuccess';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeInOut } from 'lib/animation';
import { theme } from 'lib/theme';
import { useState } from 'react';
import { useStyles } from 'tss-react';

interface AuthModalProps extends Partial<ModalProps> {}

export const AuthModal = ({ ...props }: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const { css } = useStyles();

  return (
    <Modal
      opened
      onClose={() => null}
      title='Authentication'
      centered
      overlayProps={{ backgroundOpacity: 0.2, blur: 3 }}
      zIndex={1}
      withCloseButton={false}
      withinPortal={false}
      lockScroll
      className={css({
        '& .mantine-Modal-inner': {
          padding: theme.spacing.md,
          left: 0,
          right: 0,
        },
      })}
      data-testid='auth-modal'
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
