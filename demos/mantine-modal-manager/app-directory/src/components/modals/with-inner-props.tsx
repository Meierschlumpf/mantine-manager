'use client';

import { Button, Group, Stack, Text } from '@mantine/core';
import { createManagedModal } from 'mantine-modal-manager';

type InnerProps = {
  content: string;
};

export const ModalWithInnerProps = createManagedModal<InnerProps>(({ actions, innerProps }) => {
  return (
    <Stack>
      <Text>{innerProps.content}</Text>
      <Group justify="end">
        <Button onClick={actions.closeModal}>Close</Button>
      </Group>
    </Stack>
  );
});
