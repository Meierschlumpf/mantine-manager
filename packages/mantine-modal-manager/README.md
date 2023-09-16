# Improved Mantine modals manager

[![npm](https://img.shields.io/npm/dm/mantine-modal-manager)](https://www.npmjs.com/package/mantine-modal-manager)

This is an extension of `@mantine/modals` package with improved modals manager that allows to:

- Open managed modals with full typesafety
- Keeping the state of parent modals when opening nested modals
- Has an improved API for managed modals

## Installation

```bash
# With yarn
yarn add @mantine/hooks@7.0.0-beta.5 @mantine/core@7.0.0-beta.5 mantine-modal-manager@7.0.0-beta.5

# With npm
npm install @mantine/hooks@7.0.0-beta.5 @mantine/core@7.0.0-beta.5 mantine-modal-manager@7.0.0-beta.5
```

## Usage

```tsx
import { createManagedModal, createModalManager } from 'mantine-modal-manager';

// Define modal props:
type InnerProps = {
  title: string;
};

// Create managed modal:
const ExampleModal = createManagedModal<InnerProps>(({ actions, innerProps }) => {
  return (
    <div>
      <p>{innerProps.title}</p>
      <button onClick={actions.closeModal}>Close</button>
    </div>
  );
});

// Somewhere in your app create modal manager:
const [ModalManager, modalEvents] = createModalManager({
  example: ExampleModal,
});

// In your layout use the modal:

export const Layout = () => {
  return (
    <ModalManager>
      <YourApp />
    </ModalManager>
  );
};

// In your app use the modal:
const YourApp = () => {
  const openExampleModal = () =>
    modalEvents.openManagedModal({
      modal: 'example',
      innerProps: {
        title: 'Hello world',
      },
    });

  return (
    <div>
      <button onClick={openExampleModal}>Open modal</button>
    </div>
  );
};
```

## License

MIT
