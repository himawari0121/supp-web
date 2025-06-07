import { ReactNode } from 'react';

interface SelectProps {
  value: string;
  onValueChange: (v: string) => void;
  children: ReactNode;
}

export function Select({ value, onValueChange, children }: SelectProps) {
  const options: ReactNode[] = [];
  // Extract SelectItem children from SelectContent
  const traverse = (nodes: ReactNode) => {
    const arr = Array.isArray(nodes) ? nodes : [nodes];
    arr.forEach((child: any) => {
      if (!child) return;
      if (child.type === SelectItem) {
        options.push(child);
      } else if (child.props && child.props.children) {
        traverse(child.props.children);
      }
    });
  };
  traverse(children);
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
    >
      {options}
    </select>
  );
}

export function SelectTrigger({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function SelectValue() {
  return null;
}

export function SelectContent({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }: { value: string; children: ReactNode }) {
  return <option value={value}>{children}</option>;
}
