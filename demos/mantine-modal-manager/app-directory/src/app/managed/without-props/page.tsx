'use client';

import { openManagedModal } from '@/app/_modals';
import { Button, Container, Title } from '@mantine/core';

export default function ManagedModalWithoutProps() {
  const openModal = () => {
    openManagedModal({
      title: 'This modal has no inner props',
      modal: 'withoutInnerProps',
      innerProps: {},
    });
  };

  return (
    <Container>
      <Title order={2}>Managed modal without inner props</Title>
      <Button onClick={openModal}>Open Modal</Button>
    </Container>
  );
}
