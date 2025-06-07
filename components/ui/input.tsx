import { InputHTMLAttributes } from 'react';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />;
}
