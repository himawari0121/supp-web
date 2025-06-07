import { ReactNode } from 'react';

export function Alert({ children }: { children: ReactNode }) {
  return <div style={{ border: '1px solid #f5c2c7', background: '#f8d7da', padding: '0.75rem', borderRadius: '4px', marginBottom: '0.5rem' }}>{children}</div>;
}

export function AlertTitle({ children }: { children: ReactNode }) {
  return <strong>{children}</strong>;
}

export function AlertDescription({ children }: { children: ReactNode }) {
  return <div style={{ marginTop: '0.25rem' }}>{children}</div>;
}
