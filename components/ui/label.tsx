import { ReactNode } from 'react';

export function Label({ children }: { children: ReactNode }) {
  return <label style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>{children}</label>;
}
