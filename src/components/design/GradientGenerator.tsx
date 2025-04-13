
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Plus, X, RotateCcw } from "lucide-react";

interface GradientStop {
  color: string;
  position: number;
  id: string;
}

interface GradientGeneratorProps {
  value: string;
  onChange: (value: string) => void;
}

const GradientGenerator: React.FC<GradientGeneratorProps> = ({ value, onChange }) => {
  const [gradientType, setGradientType] = useState<string>('linear');
  const [gradientAngle, setGradientAngle] = useState<number>(90);
  const [stops, setStops] = useState<GradientStop[]>([
    { color: '#3b82f6', position: 0, id: 'stop-1' },
    { color: '#8b5cf6', position: 100, id: 'stop-2' }
  ]);

  // Parse initial gradient value if provided
  useEffect(() => {
    if (value && value !== 'none') {
      try {
        if (value.includes('linear-gradient')) {
          setGradientType('linear');
          
          // Extract angle
          const angleMatch = value.match(/linear-gradient\((\d+)deg/);
          if (angleMatch && angleMatch[1]) {
            setGradientAngle(parseInt(angleMatch[1], 10));
          }
          
          // Extract stops
          const stopsString = value.match(/linear-gradient\(\d+deg,\s*(.*)\)/);
          if (stopsString && stopsString[1]) {
            const parsedStops = stopsString[1].split(',').map((stop, index) => {
              const trimmedStop = stop.trim();
              const colorPosMatch = trimmedStop.match(/(#[0-9a-f]{3,8}|rgba?\(.*?\))\s+(\d+)%/i);
              
              if (colorPosMatch) {
                return {
                  color: colorPosMatch[1],
                  position: parseInt(colorPosMatch[2], 10),
                  id: `stop-${index + 1}`
                };
              }
              
              return null;
            }).filter(Boolean) as GradientStop[];
            
            if (parsedStops.length >= 2) {
              setStops(parsedStops);
            }
          }
        } else if (value.includes('radial-gradient')) {
          setGradientType('radial');
          
          // Extract stops for radial gradient
          const stopsString = value.match(/radial-gradient\(circle,\s*(.*)\)/);
          if (stopsString && stopsString[1]) {
            const parsedStops = stopsString[1].split(',').map((stop, index) => {
              const trimmedStop = stop.trim();
              const colorPosMatch = trimmedStop.match(/(#[0-9a-f]{3,8}|rgba?\(.*?\))\s+(\d+)%/i);
              
              if (colorPosMatch) {
                return {
                  color: colorPosMatch[1],
                  position: parseInt(colorPosMatch[2], 10),
                  id: `stop-${index + 1}`
                };
              }
              
              return null;
            }).filter(Boolean) as GradientStop[];
            
            if (parsedStops.length >= 2) {
              setStops(parsedStops);
            }
          }
        }
      } catch (error) {
        console.error('Failed to parse gradient value:', error);
      }
    }
  }, []);

  // Update gradient string when params change
  useEffect(() => {
    const sortedStops = [...stops].sort((a, b) => a.position - b.position);
    const stopsString = sortedStops.map(stop => `${stop.color} ${stop.position}%`).join(', ');
    
    let gradientString = 'none';
    
    if (gradientType === 'linear') {
      gradientString = `linear-gradient(${gradientAngle}deg, ${stopsString})`;
    } else if (gradientType === 'radial') {
      gradientString = `radial-gradient(circle, ${stopsString})`;
    }
    
    onChange(gradientString);
  }, [gradientType, gradientAngle, stops, onChange]);

  const addStop = () => {
    // Find middle position between existing stops
    const positions = stops.map(stop => stop.position);
    const minPos = Math.min(...positions);
    const maxPos = Math.max(...positions);
    const middlePos = Math.round((minPos + maxPos) / 2);
    
    const newStop: GradientStop = {
      color: '#4f46e5',
      position: middlePos,
      id: `stop-${Date.now()}`
    };
    
    setStops([...stops, newStop]);
  };

  const updateStop = (id: string, updates: Partial<GradientStop>) => {
    setStops(stops.map(stop => 
      stop.id === id ? { ...stop, ...updates } : stop
    ));
  };

  const removeStop = (id: string) => {
    if (stops.length <= 2) return; // Maintain at least 2 stops
    setStops(stops.filter(stop => stop.id !== id));
  };

  const resetGradient = () => {
    setGradientType('linear');
    setGradientAngle(90);
    setStops([
      { color: '#3b82f6', position: 0, id: 'stop-1' },
      { color: '#8b5cf6', position: 100, id: 'stop-2' }
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="h-16 rounded-lg border-2 border-gray-200 relative overflow-hidden" 
        style={{ 
          background: gradientType === 'linear' 
            ? `linear-gradient(${gradientAngle}deg, ${stops.map(s => `${s.color} ${s.position}%`).join(', ')})` 
            : `radial-gradient(circle, ${stops.map(s => `${s.color} ${s.position}%`).join(', ')})`
        }}
      />
      
      <div className="flex items-center justify-between">
        <Label>Gradient Type</Label>
        <Button variant="outline" size="sm" onClick={resetGradient}>
          <RotateCcw size={14} className="mr-1" /> Reset
        </Button>
      </div>
      
      <Select
        value={gradientType}
        onValueChange={setGradientType}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select gradient type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="linear">Linear</SelectItem>
          <SelectItem value="radial">Radial</SelectItem>
        </SelectContent>
      </Select>
      
      {gradientType === 'linear' && (
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Angle: {gradientAngle}°</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Slider
              value={[gradientAngle]}
              min={0}
              max={360}
              step={1}
              onValueChange={(val) => setGradientAngle(val[0])}
              className="flex-grow"
            />
            <Input
              type="number"
              value={gradientAngle}
              onChange={(e) => setGradientAngle(Number(e.target.value))}
              className="w-16"
              min={0}
              max={360}
            />
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        <Label>Color Stops</Label>
        {stops.map((stop) => (
          <div key={stop.id} className="flex items-center space-x-2 py-1">
            <div className="w-6 h-6 rounded-md border border-gray-300 overflow-hidden">
              <Input
                type="color"
                value={stop.color}
                onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                className="w-8 h-8 p-0 border-0 m-0 transform translate-x-[-4px] translate-y-[-4px]"
              />
            </div>
            <div className="flex-grow">
              <Slider
                value={[stop.position]}
                min={0}
                max={100}
                step={1}
                onValueChange={(val) => updateStop(stop.id, { position: val[0] })}
              />
            </div>
            <div className="w-12">
              <Input
                type="number"
                value={stop.position}
                onChange={(e) => updateStop(stop.id, { position: Number(e.target.value) })}
                className="p-1 h-8 text-xs"
                min={0}
                max={100}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeStop(stop.id)}
              disabled={stops.length <= 2}
              className="h-8 w-8"
            >
              <X size={14} />
            </Button>
          </div>
        ))}
        
        <Button
          variant="outline"
          size="sm"
          onClick={addStop}
          className="w-full mt-2"
        >
          <Plus size={14} className="mr-1" /> Add Stop
        </Button>
      </div>
    </div>
  );
};

export default GradientGenerator;
