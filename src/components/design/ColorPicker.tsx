
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
  allowAlpha?: boolean;
  showInput?: boolean;
}

const PRESET_COLORS = [
  "#000000", "#ffffff", "#f44336", "#e91e63", "#9c27b0", 
  "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4",
  "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", 
  "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"
];

const ColorPicker: React.FC<ColorPickerProps> = ({ 
  color, 
  onChange,
  label,
  allowAlpha = false,
  showInput = true
}) => {
  const [currentColor, setCurrentColor] = useState(color);
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentColor(e.target.value);
  };
  
  const handleChange = () => {
    onChange(currentColor);
  };

  return (
    <div className="flex flex-col space-y-1.5">
      {label && <Label>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="w-full flex items-center justify-between px-3 py-2 rounded-md border border-input bg-background h-9"
            aria-label="Select color"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-full border border-gray-200"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm">{color}</span>
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3">
          <div className="flex flex-col gap-4">
            <div>
              <div 
                className="w-full h-32 rounded-md mb-2 border"
                style={{ backgroundColor: currentColor }}
              />
              
              <div className="grid grid-cols-5 gap-2 mb-3">
                {PRESET_COLORS.map((presetColor) => (
                  <button
                    key={presetColor}
                    type="button"
                    className={cn(
                      "w-full h-6 rounded-md border flex items-center justify-center",
                      currentColor === presetColor && "ring-2 ring-primary ring-offset-1"
                    )}
                    style={{ backgroundColor: presetColor }}
                    onClick={() => {
                      setCurrentColor(presetColor);
                      onChange(presetColor);
                    }}
                    aria-label={`Select color ${presetColor}`}
                  >
                    {currentColor === presetColor && (
                      <Check size={14} className="text-white drop-shadow-lg" />
                    )}
                  </button>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={currentColor}
                  onChange={handleColorChange}
                  className="h-9 w-9 p-0 border-none"
                />
                {showInput && (
                  <Input
                    type="text"
                    value={currentColor}
                    onChange={handleColorChange}
                    className="h-9 flex-1"
                  />
                )}
                <button
                  type="button"
                  onClick={handleChange}
                  className="px-3 h-9 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ColorPicker;
