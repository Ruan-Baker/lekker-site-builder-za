
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import ColorPicker from './ColorPicker';

interface GradientStop {
  color: string;
  position: number;
}

interface GradientGeneratorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const GradientGenerator: React.FC<GradientGeneratorProps> = ({
  value,
  onChange,
  label,
}) => {
  // Parse the initial gradient value
  const parseGradient = (cssGradient: string): {
    type: string;
    angle: number;
    stops: GradientStop[];
  } => {
    let type = 'linear';
    let angle = 180;
    let stops: GradientStop[] = [
      { color: '#3b82f6', position: 0 },
      { color: '#10b981', position: 100 }
    ];
    
    try {
      if (cssGradient) {
        const isRadial = cssGradient.includes('radial-gradient');
        type = isRadial ? 'radial' : 'linear';
        
        // Extract angle for linear gradients
        if (!isRadial && cssGradient.includes('deg')) {
          const angleMatch = cssGradient.match(/(\d+)deg/);
          if (angleMatch && angleMatch[1]) {
            angle = parseInt(angleMatch[1], 10);
          }
        }
        
        // Extract color stops
        const stopRegex = /(#[a-zA-Z0-9]+|\w+\([^\)]+\))\s+(\d+)%/g;
        const stopMatches = [...cssGradient.matchAll(stopRegex)];
        
        if (stopMatches.length > 0) {
          stops = stopMatches.map(match => ({
            color: match[1],
            position: parseInt(match[2], 10)
          }));
        }
      }
    } catch (error) {
      console.error('Error parsing gradient:', error);
    }
    
    return { type, angle, stops };
  };
  
  const [gradientType, setGradientType] = useState<string>(parseGradient(value).type);
  const [angle, setAngle] = useState<number>(parseGradient(value).angle);
  const [stops, setStops] = useState<GradientStop[]>(parseGradient(value).stops);
  
  // Generate CSS gradient string
  const generateGradientCSS = (
    type: string,
    angleVal: number,
    stopsVal: GradientStop[]
  ): string => {
    const sortedStops = [...stopsVal].sort((a, b) => a.position - b.position);
    const stopsCSS = sortedStops
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ');
    
    if (type === 'linear') {
      return `linear-gradient(${angleVal}deg, ${stopsCSS})`;
    } else {
      return `radial-gradient(circle, ${stopsCSS})`;
    }
  };
  
  // Update the gradient when any property changes
  const updateGradient = (
    type: string = gradientType,
    angleVal: number = angle,
    stopsVal: GradientStop[] = stops
  ) => {
    const newGradientCSS = generateGradientCSS(type, angleVal, stopsVal);
    onChange(newGradientCSS);
  };
  
  // Handle adding a new color stop
  const addStop = () => {
    if (stops.length >= 5) return; // Limit to 5 stops
    
    const lastPos = stops.length > 0 ? stops[stops.length - 1].position : 0;
    const newPos = Math.min(lastPos + 25, 100);
    const newStop = { color: '#ffffff', position: newPos };
    const newStops = [...stops, newStop];
    
    setStops(newStops);
    updateGradient(gradientType, angle, newStops);
  };
  
  // Handle removing a color stop
  const removeStop = (index: number) => {
    if (stops.length <= 2) return; // Keep at least 2 stops
    
    const newStops = stops.filter((_, i) => i !== index);
    setStops(newStops);
    updateGradient(gradientType, angle, newStops);
  };
  
  // Handle updating a color stop
  const updateStop = (index: number, key: keyof GradientStop, value: string | number) => {
    const newStops = [...stops];
    newStops[index] = { ...newStops[index], [key]: value };
    
    setStops(newStops);
    updateGradient(gradientType, angle, newStops);
  };
  
  return (
    <div className="space-y-4">
      {label && <Label>{label}</Label>}
      
      <div 
        className="h-20 rounded-md border"
        style={{ 
          background: generateGradientCSS(gradientType, angle, stops),
          backgroundSize: 'cover'
        }}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Gradient Type</Label>
          <Select 
            value={gradientType} 
            onValueChange={(value) => {
              setGradientType(value);
              updateGradient(value, angle, stops);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linear">Linear</SelectItem>
              <SelectItem value="radial">Radial</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {gradientType === 'linear' && (
          <div className="space-y-2">
            <Label>Angle: {angle}°</Label>
            <Slider
              value={[angle]}
              min={0}
              max={360}
              step={1}
              onValueChange={(value) => {
                setAngle(value[0]);
                updateGradient(gradientType, value[0], stops);
              }}
            />
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Color Stops</Label>
          <button 
            type="button"
            onClick={addStop}
            className="text-xs text-primary hover:underline"
            disabled={stops.length >= 5}
          >
            + Add Stop
          </button>
        </div>
        
        {stops.map((stop, index) => (
          <div key={index} className="grid grid-cols-3 gap-2 items-center">
            <div>
              <ColorPicker
                color={stop.color}
                onChange={(color) => updateStop(index, 'color', color)}
                showInput={false}
              />
            </div>
            
            <div className="col-span-2 flex items-center gap-2">
              <Slider
                value={[stop.position]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => updateStop(index, 'position', value[0])}
              />
              
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={stop.position}
                  min={0}
                  max={100}
                  onChange={(e) => updateStop(index, 'position', parseInt(e.target.value) || 0)}
                  className="w-16 text-xs"
                />
                <span className="text-xs">%</span>
                
                {stops.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeStop(index)}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradientGenerator;
