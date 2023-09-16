'use client';

import { Button, Container, Title } from '@mantine/core';
import { openManagedModal } from './_modals';

export default function Home() {
  const openModal = () => {
    openManagedModal({
      modal: 'withInnerProps',
      title: 'This modal has inner props',
      innerProps: { content: 'Hello World!' },
    });
  };

  return (
    <Container>
      <Title order={2}>Managed modal with inner props</Title>
      <Button onClick={openModal}>Open Modal</Button>
    </Container>
  );
}
