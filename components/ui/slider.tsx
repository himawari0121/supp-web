import { FC } from 'react';

interface SliderProps {
  value: [number];
  onValueChange: ([value]: [number]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export const Slider: FC<SliderProps> = ({ value, onValueChange, min=0, max=100, step=1, className }) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={(e) => onValueChange([Number(e.target.value)])}
      className={className}
    />
  );
};
