
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface FontSelectorProps {
  value: string;
  onChange: (value: string) => void;
  fonts: string[];
  label?: string;
}

const FontSelector: React.FC<FontSelectorProps> = ({ 
  value, 
  onChange, 
  fonts,
  label 
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      {label && <Label>{label}</Label>}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a font" />
        </SelectTrigger>
        <SelectContent>
          {fonts.map((font) => (
            <SelectItem key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FontSelector;
