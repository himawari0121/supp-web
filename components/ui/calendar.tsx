interface CalendarProps {
  selected: Date;
  onSelect: (d: Date) => void;
  mode?: string;
  initialFocus?: boolean;
}

export function Calendar({ selected, onSelect }: CalendarProps) {
  const value = selected.toISOString().slice(0, 10);
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onSelect(new Date(e.target.value))}
      style={{ padding: '0.25rem', border: '1px solid #ccc', borderRadius: '4px' }}
    />
  );
}
