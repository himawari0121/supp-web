import { ReactNode, useState, ReactElement } from 'react';

export function Tabs({ defaultValue, children }: { defaultValue: string; children: ReactNode }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as ReactElement<any>, { value, onChange: setValue });
      })}
    </div>
  );
}

export function TabsList({ children, value, onChange }: { children: ReactNode; value: string; onChange: (v: string) => void }) {
  return <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
    {React.Children.map(children, child => {
      if (!React.isValidElement(child)) return child;
      return React.cloneElement(child as ReactElement<any>, { current: value, onSelect: onChange });
    })}
  </div>;
}

export function TabsTrigger({ children, value, current, onSelect }: { children: ReactNode; value: string; current?: string; onSelect?: (v: string) => void }) {
  const active = current === value;
  return <button onClick={() => onSelect?.(value)} style={{ padding: '0.25rem 0.5rem', background: active ? '#0070f3' : '#eee', color: active ? '#fff' : '#000', border: 'none', borderRadius: '4px' }}>{children}</button>;
}

export function TabsContent({ children, value, current }: { children: ReactNode; value: string; current?: string }) {
  if (value !== current) return null;
  return <div style={{ marginTop: '0.5rem' }}>{children}</div>;
}
