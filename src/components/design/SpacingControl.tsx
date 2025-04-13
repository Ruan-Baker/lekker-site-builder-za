
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface SpacingControlProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: 'px' | 'rem' | '%';
}

const SpacingControl: React.FC<SpacingControlProps> = ({ 
  value, 
  onChange, 
  label,
  min = 0,
  max = 100,
  step = 1,
  unit = 'px'
}) => {
  // Convert value string to number for slider
  const extractNumericValue = (val: string): number => {
    const match = val.match(/^(\d+)/);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
    return 0;
  };
  
  const numericValue = extractNumericValue(value);
  
  const handleSliderChange = (newValue: number[]) => {
    onChange(`${newValue[0]}${unit}`);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10) || 0;
    onChange(`${newValue}${unit}`);
  };

  return (
    <div className="flex flex-col space-y-1.5">
      {label && (
        <div className="flex justify-between items-center">
          <Label>{label}</Label>
          <div className="flex items-center">
            <Input
              type="number"
              min={min}
              max={max}
              value={numericValue}
              onChange={handleInputChange}
              className="w-16 h-8 text-right"
            />
            <span className="ml-1 text-sm text-gray-500">{unit}</span>
          </div>
        </div>
      )}
      <Slider
        min={min}
        max={max}
        step={step}
        value={[numericValue]}
        onValueChange={handleSliderChange}
      />
    </div>
  );
};

export default SpacingControl;
