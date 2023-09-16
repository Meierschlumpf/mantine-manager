'use client';

import { Button, Stack, Text } from '@mantine/core';
import { createManagedModal } from 'mantine-modal-manager';

type InnerProps = Record<string, never>;

export const ModalWithoutInnerProps = createManagedModal<InnerProps>(({ actions }) => {
  return (
    <Stack>
      <Text>Here is nothing!</Text>
      <Button onClick={actions.closeModal}>Close</Button>
    </Stack>
  );
});
