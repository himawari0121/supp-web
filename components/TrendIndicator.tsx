import React from 'react';

export function TrendIndicator({ value }: { value: number }) {
  if (value > 0) {
    return <span style={{ color: 'green', marginLeft: '4px' }}>▲{value}</span>;
  } else if (value < 0) {
    return <span style={{ color: 'red', marginLeft: '4px' }}>▼{Math.abs(value)}</span>;
  }
  return <span style={{ marginLeft: '4px' }}>-</span>;
}
