import { ReactNode } from 'react';

export function Badge({ children }: { children: ReactNode }) {
  return <span style={{ display: 'inline-block', padding: '0.25rem 0.5rem', background: '#eee', borderRadius: '4px', fontSize: '0.75rem', marginRight: '0.25rem' }}>{children}</span>;
}
