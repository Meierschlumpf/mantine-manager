import { ManagedModal, ManagedModalInnerProps } from './manager';

export const createManagedModal = <TInnerProps extends ManagedModalInnerProps>(
  component: ManagedModal<TInnerProps>
) => component;
