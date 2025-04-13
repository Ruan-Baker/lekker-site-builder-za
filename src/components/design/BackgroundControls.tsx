
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BackgroundSelector from './BackgroundSelector';
import { ColorPicker } from './ColorPicker';
import ShadowGenerator from './ShadowGenerator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useDesign } from '@/contexts/DesignContext';

interface BackgroundControlsProps {
  elementId?: string;
  background: any;
  onBackgroundChange: (value: any) => void;
  shadow?: string;
  onShadowChange?: (value: string) => void;
  border?: {
    width: number;
    style: string;
    color: string;
    radius: number;
  };
  onBorderChange?: (value: any) => void;
}

const BackgroundControls: React.FC<BackgroundControlsProps> = ({
  elementId,
  background,
  onBackgroundChange,
  shadow = 'none',
  onShadowChange,
  border = { width: 0, style: 'solid', color: '#000000', radius: 0 },
  onBorderChange,
}) => {
  const { designSettings } = useDesign();
  
  const handleBorderChange = (key: string, value: any) => {
    if (onBorderChange) {
      onBorderChange({
        ...border,
        [key]: value
      });
    }
  };
  
  // Get borders from global design settings if available
  const defaultBorderRadius = designSettings?.spacing_settings?.borderRadius || '0.375rem';
  const parsedDefaultRadius = parseFloat(defaultBorderRadius); 
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Background</CardTitle>
        </CardHeader>
        <CardContent>
          <BackgroundSelector
            value={background}
            onChange={onBackgroundChange}
          />
        </CardContent>
      </Card>
      
      {onBorderChange && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Border</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs">Border Width: {border.width}px</Label>
              <Slider
                value={[border.width]}
                min={0}
                max={10}
                step={1}
                onValueChange={(val) => handleBorderChange('width', val[0])}
              />
            </div>
            
            {border.width > 0 && (
              <>
                <div className="space-y-2">
                  <Label>Border Style</Label>
                  <Select
                    value={border.style}
                    onValueChange={(val) => handleBorderChange('style', val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select border style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solid">Solid</SelectItem>
                      <SelectItem value="dashed">Dashed</SelectItem>
                      <SelectItem value="dotted">Dotted</SelectItem>
                      <SelectItem value="double">Double</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Border Color</Label>
                  <ColorPicker
                    color={border.color}
                    onChange={(color) => handleBorderChange('color', color)}
                  />
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <Label className="text-xs">
                Border Radius: {border.radius}px
              </Label>
              <Slider
                value={[border.radius]}
                min={0}
                max={50}
                step={1}
                onValueChange={(val) => handleBorderChange('radius', val[0])}
              />
              <div className="flex gap-2 mt-1">
                <button
                  type="button"
                  className={`text-xs px-2 py-1 rounded ${
                    border.radius === 0 ? 'bg-primary text-white' : 'bg-gray-100'
                  }`}
                  onClick={() => handleBorderChange('radius', 0)}
                >
                  Square
                </button>
                <button
                  type="button"
                  className={`text-xs px-2 py-1 rounded ${
                    border.radius === parsedDefaultRadius ? 'bg-primary text-white' : 'bg-gray-100'
                  }`}
                  onClick={() => handleBorderChange('radius', parsedDefaultRadius)}
                >
                  Default
                </button>
                <button
                  type="button"
                  className={`text-xs px-2 py-1 rounded ${
                    border.radius === 9999 ? 'bg-primary text-white' : 'bg-gray-100'
                  }`}
                  onClick={() => handleBorderChange('radius', 9999)}
                >
                  Pill
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {onShadowChange && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Shadow</CardTitle>
          </CardHeader>
          <CardContent>
            <ShadowGenerator
              value={shadow}
              onChange={onShadowChange}
              type="box"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Import missing components
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export default BackgroundControls;
