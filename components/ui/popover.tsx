import React, { ReactNode, useState } from 'react';

export function Popover({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        const type = (child.type as any).displayName;
        if (type === 'PopoverTrigger') {
          return React.cloneElement(child, { onToggle: () => setOpen(!open) });
        }
        if (type === 'PopoverContent') {
          return open ? child : null;
        }
        return child;
      })}
    </div>
  );
}

export function PopoverTrigger({ children, onToggle }: { children: ReactNode; onToggle?: () => void }) {
  return <div onClick={onToggle}>{children}</div>;
}
PopoverTrigger.displayName = 'PopoverTrigger';

export function PopoverContent({ children }: { children: ReactNode; className?: string; align?: string }) {
  return (
    <div style={{ position: 'absolute', zIndex: 1, background: '#fff', border: '1px solid #ccc', padding: '0.5rem' }}>
      {children}
    </div>
  );
}
PopoverContent.displayName = 'PopoverContent';
