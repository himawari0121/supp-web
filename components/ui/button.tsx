import { ButtonHTMLAttributes, ReactNode } from 'react';

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button {...props} style={{ padding: '0.5rem 1rem', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
      {props.children}
    </button>
  );
}
