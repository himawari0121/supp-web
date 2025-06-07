interface ProgressProps { value: number; className?: string }

export function Progress({ value, className }: ProgressProps) {
  return (
    <div style={{ background: '#eee', borderRadius: '4px', height: '8px', overflow: 'hidden' }} className={className}>
      <div style={{ width: `${value}%`, background: '#0070f3', height: '100%' }} />
    </div>
  );
}
