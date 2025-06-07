import { ReactNode } from 'react';

export function Card({ children }: { children: ReactNode }) {
  return <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>{children}</div>;
}

export function CardHeader({ children }: { children: ReactNode }) {
  return <div style={{ marginBottom: '0.5rem' }}>{children}</div>;
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{children}</h2>;
}

export function CardDescription({ children }: { children: ReactNode }) {
  return <p style={{ color: '#666', fontSize: '0.875rem' }}>{children}</p>;
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export function CardFooter({ children }: { children: ReactNode }) {
  return <div style={{ marginTop: '0.5rem' }}>{children}</div>;
}
