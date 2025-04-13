
import React, { useState, useEffect } from 'react';
import { useDesign } from '@/contexts/DesignContext';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import ColorPicker from '@/components/design/ColorPicker';
import { Sparkles, Copy, Check, Plus, Trash2, RefreshCw, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ColorSchemeOption {
  name: string;
  value: string;
  description: string;
}

const ColorSchemeOptions: ColorSchemeOption[] = [
  { name: 'Complementary', value: 'complementary', description: 'Colors opposite on the color wheel' },
  { name: 'Analogous', value: 'analogous', description: 'Colors adjacent on the color wheel' },
  { name: 'Triadic', value: 'triadic', description: 'Three colors evenly spaced on the color wheel' },
  { name: 'Tetradic', value: 'tetradic', description: 'Four colors forming a rectangle on the color wheel' },
  { name: 'Monochromatic', value: 'monochromatic', description: 'Different shades of a single color' },
  { name: 'Split Complementary', value: 'split', description: 'One color and two adjacent to its complement' }
];

const AdvancedColorPalette = () => {
  const { designSettings, updateDesignSettings, addCustomColor } = useDesign();
  const [colorScheme, setColorScheme] = useState<string>('complementary');
  const [baseColor, setBaseColor] = useState<string>(designSettings?.color_palette.primary || '#3b82f6');
  const [generatedColors, setGeneratedColors] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [newColorName, setNewColorName] = useState<string>('');
  const [newColorValue, setNewColorValue] = useState<string>('#3b82f6');
  const [activeTab, setActiveTab] = useState<string>('palette');
  const [savedPalettes, setSavedPalettes] = useState<{name: string, colors: string[]}[]>([]);
  
  // Generate color variations based on the selected scheme
  useEffect(() => {
    generateColorScheme(baseColor, colorScheme);
  }, [baseColor, colorScheme]);
  
  const hexToHSL = (hex: string) => {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16);
      g = parseInt(hex.substring(3, 5), 16);
      b = parseInt(hex.substring(5, 7), 16);
    }
    
    // Convert RGB to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    
    return { h: h * 360, s: s * 100, l: l * 100 };
  };
  
  const HSLToHex = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };
  
  const generateColorScheme = (base: string, scheme: string) => {
    const { h, s, l } = hexToHSL(base);
    let colors: string[] = [];
    
    switch (scheme) {
      case 'complementary':
        colors = [
          base,
          HSLToHex((h + 180) % 360, s, l)
        ];
        break;
      case 'analogous':
        colors = [
          HSLToHex((h + 330) % 360, s, l),
          base,
          HSLToHex((h + 30) % 360, s, l)
        ];
        break;
      case 'triadic':
        colors = [
          base,
          HSLToHex((h + 120) % 360, s, l),
          HSLToHex((h + 240) % 360, s, l)
        ];
        break;
      case 'tetradic':
        colors = [
          base,
          HSLToHex((h + 90) % 360, s, l),
          HSLToHex((h + 180) % 360, s, l),
          HSLToHex((h + 270) % 360, s, l)
        ];
        break;
      case 'monochromatic':
        colors = [
          HSLToHex(h, s, l),
          HSLToHex(h, s, Math.max(0, l - 15)),
          HSLToHex(h, s, Math.max(0, l - 30)),
          HSLToHex(h, Math.max(0, s - 15), l),
          HSLToHex(h, Math.max(0, s - 30), l)
        ];
        break;
      case 'split':
        colors = [
          base,
          HSLToHex((h + 150) % 360, s, l),
          HSLToHex((h + 210) % 360, s, l)
        ];
        break;
      default:
        colors = [base];
        break;
    }
    
    // Add shades and tints for each color
    let extendedPalette: string[] = [];
    colors.forEach(color => {
      const { h, s, l } = hexToHSL(color);
      extendedPalette.push(
        HSLToHex(h, Math.min(100, s + 15), Math.min(100, l + 20)), // lighter
        color, // original
        HSLToHex(h, Math.min(100, s + 10), Math.max(0, l - 15)) // darker
      );
    });
    
    setGeneratedColors(extendedPalette);
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Color copied to clipboard'
    });
  };
  
  const applyColorToPalette = (color: string, position: 'primary' | 'secondary' | 'accent') => {
    if (!designSettings) return;
    
    updateDesignSettings({
      color_palette: {
        ...designSettings.color_palette,
        [position]: color
      }
    });
    
    toast({
      title: 'Applied',
      description: `Set as ${position} color`
    });
  };
  
  const handleAddCustomColor = () => {
    if (!newColorName.trim()) {
      toast({
        title: 'Name required',
        description: 'Please enter a name for your custom color',
        variant: 'destructive'
      });
      return;
    }
    
    addCustomColor(newColorName.trim(), newColorValue);
    setNewColorName('');
    setNewColorValue('#3b82f6');
  };
  
  const savePalette = () => {
    const name = prompt('Enter a name for this palette:');
    if (!name) return;
    
    setSavedPalettes([...savedPalettes, {
      name,
      colors: generatedColors
    }]);
    
    toast({
      title: 'Palette Saved',
      description: `"${name}" saved to your palettes`
    });
  };
  
  const applyPalette = (colors: string[]) => {
    if (colors.length < 3 || !designSettings) return;
    
    updateDesignSettings({
      color_palette: {
        ...designSettings.color_palette,
        primary: colors[0],
        secondary: colors[Math.floor(colors.length / 2)],
        accent: colors[colors.length - 1]
      }
    });
    
    toast({
      title: 'Palette Applied',
      description: 'Color palette applied to your site'
    });
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="palette">Generator</TabsTrigger>
          <TabsTrigger value="custom">Custom Colors</TabsTrigger>
          <TabsTrigger value="saved">Saved Palettes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="palette" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Color Palette Generator</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Dark Mode</span>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label>Base Color</Label>
              <div className="flex mt-1">
                <ColorPicker color={baseColor} onChange={setBaseColor} />
              </div>
            </div>
            
            <div>
              <Label>Color Scheme</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {ColorSchemeOptions.map((scheme) => (
                  <Card 
                    key={scheme.value}
                    className={`cursor-pointer p-2 ${colorScheme === scheme.value ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setColorScheme(scheme.value)}
                  >
                    <div className="text-sm font-medium">{scheme.name}</div>
                    <div className="text-xs text-muted-foreground">{scheme.description}</div>
                  </Card>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={() => generateColorScheme(baseColor, colorScheme)}
              className="w-full gap-2"
              variant="outline"
            >
              <RefreshCw size={16} />
              Regenerate Colors
            </Button>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Generated Palette</Label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 gap-1"
                  onClick={savePalette}
                >
                  <Star size={14} />
                  Save
                </Button>
              </div>
              
              <div className={`grid gap-3 p-4 rounded-lg ${darkMode ? 'bg-slate-900' : 'bg-white border'}`}>
                <div className="grid grid-cols-3 gap-2">
                  {generatedColors.map((color, index) => (
                    <div 
                      key={index} 
                      className="space-y-1"
                      style={{ color: darkMode ? '#fff' : '#000' }}
                    >
                      <div 
                        className="h-12 rounded-md flex items-end justify-end p-1 cursor-pointer group relative"
                        style={{ backgroundColor: color }}
                        onClick={() => copyToClipboard(color)}
                      >
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-md">
                          <Copy size={16} className="text-white" />
                        </div>
                      </div>
                      <div className="flex text-xs justify-between items-center">
                        <span>{color}</span>
                        <div className="flex gap-0.5">
                          <button 
                            onClick={() => applyColorToPalette(color, 'primary')}
                            className="p-1 hover:bg-gray-100 rounded"
                            title="Set as primary color"
                          >
                            P
                          </button>
                          <button 
                            onClick={() => applyColorToPalette(color, 'secondary')}
                            className="p-1 hover:bg-gray-100 rounded"
                            title="Set as secondary color"
                          >
                            S
                          </button>
                          <button 
                            onClick={() => applyColorToPalette(color, 'accent')}
                            className="p-1 hover:bg-gray-100 rounded"
                            title="Set as accent color"
                          >
                            A
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <Button onClick={() => applyPalette(generatedColors)} className="w-full">
              Apply This Palette
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-4">Custom Colors</h3>
            
            <div className="flex gap-2">
              <div className="flex-grow">
                <Label htmlFor="color-name">Color Name</Label>
                <Input 
                  id="color-name"
                  value={newColorName}
                  onChange={(e) => setNewColorName(e.target.value)}
                  placeholder="e.g., Brand Blue"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Color</Label>
                <ColorPicker 
                  color={newColorValue} 
                  onChange={setNewColorValue} 
                  className="mt-1"
                />
              </div>
            </div>
            
            <Button 
              onClick={handleAddCustomColor} 
              className="w-full mt-4 gap-2"
            >
              <Plus size={16} />
              Add Custom Color
            </Button>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-2">Your Custom Colors</h4>
            
            {designSettings?.color_palette.customColors && 
             Object.keys(designSettings.color_palette.customColors).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(designSettings.color_palette.customColors).map(([name, color]) => (
                  <div key={name} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div 
                        className="h-8 w-8 rounded-md border"
                        style={{ backgroundColor: color }}
                      />
                      <div>
                        <div className="font-medium">{name}</div>
                        <div className="text-xs text-muted-foreground">{color}</div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => copyToClipboard(color)}
                        title="Copy color code"
                      >
                        <Copy size={16} />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => {
                          // Remove custom color would go here
                          toast({
                            title: 'Coming Soon',
                            description: 'This feature is not yet implemented'
                          });
                        }}
                        title="Delete color"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground border rounded-md">
                You haven't created any custom colors yet
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="saved" className="space-y-4">
          <h3 className="text-lg font-medium mb-4">Saved Color Palettes</h3>
          
          {savedPalettes.length > 0 ? (
            <div className="space-y-4">
              {savedPalettes.map((palette, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{palette.name}</h4>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => applyPalette(palette.colors)}
                      >
                        Apply
                      </Button>
                    </div>
                    <div className="flex mt-2">
                      {palette.colors.map((color, colorIndex) => (
                        <div
                          key={colorIndex}
                          className="h-8 flex-1"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground border rounded-md">
              No saved palettes yet. Generate a palette and save it!
            </div>
          )}
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setActiveTab('palette')}
          >
            <Sparkles size={16} className="mr-2" />
            Create New Palette
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedColorPalette;
