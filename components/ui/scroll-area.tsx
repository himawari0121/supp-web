import { ReactNode } from 'react';

export function ScrollArea({ children, className }: { children: ReactNode; className?: string }) {
  return <div style={{ overflowY: 'auto', maxHeight: '100%' }} className={className}>{children}</div>;
}
