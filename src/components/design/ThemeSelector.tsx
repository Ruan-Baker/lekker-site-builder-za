
import React, { useState } from 'react';
import { useDesign } from '@/contexts/DesignContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Sparkles, Palette, Type, Grid, Save } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { ColorPicker } from '@/components/design/ColorPicker';

interface ThemeSelectorProps {
  onSelect: (theme: string) => void;
  selectedTheme: string;
}

interface ThemeOption {
  id: string;
  name: string;
  colors: string[];
  fonts: [string, string];
  description?: string;
  industry?: string;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onSelect, selectedTheme }) => {
  const { designSettings, updateDesignSettings, addCustomColor, primaryColor, setPrimaryColor } = useDesign();
  const [activeTab, setActiveTab] = useState<string>('presets');
  const [customThemeName, setCustomThemeName] = useState<string>('My Custom Theme');
  const [generatingTheme, setGeneratingTheme] = useState<boolean>(false);
  const { toast } = useToast();

  // Expanded theme options with industry-specific themes
  const themes: ThemeOption[] = [
    {
      id: 'default',
      name: 'Default',
      colors: ['#3b82f6', '#10b981', '#f97316', '#ffffff', '#1e293b'],
      fonts: ['Inter', 'Inter'],
      description: 'Clean and modern design suitable for most websites'
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      colors: ['#000000', '#333333', '#666666', '#ffffff', '#333333'],
      fonts: ['Work Sans', 'Work Sans'],
      description: 'Simple and elegant design with focus on content'
    },
    {
      id: 'bold',
      name: 'Bold',
      colors: ['#ff3e00', '#ff8700', '#ffbd00', '#ffffff', '#111111'],
      fonts: ['Montserrat', 'Open Sans'],
      description: 'High-impact visuals and strong typography'
    },
    {
      id: 'elegant',
      name: 'Elegant',
      colors: ['#937264', '#dcd0c0', '#c0b283', '#f4f4f4', '#373737'],
      fonts: ['Playfair Display', 'Lato'],
      description: 'Sophisticated design with refined aesthetic'
    },
    {
      id: 'playful',
      name: 'Playful',
      colors: ['#6b46c1', '#d53f8c', '#ed8936', '#ffffff', '#2d3748'],
      fonts: ['Quicksand', 'Nunito'],
      description: 'Fun and energetic with vibrant colors'
    },
    {
      id: 'corporate',
      name: 'Corporate',
      colors: ['#2c5282', '#4299e1', '#63b3ed', '#ffffff', '#1a202c'],
      fonts: ['Roboto', 'Source Sans Pro'],
      description: 'Professional and trustworthy business appearance',
      industry: 'finance'
    },
    {
      id: 'dark',
      name: 'Dark',
      colors: ['#bb86fc', '#03dac6', '#cf6679', '#121212', '#ffffff'],
      fonts: ['Inter', 'Roboto'],
      description: 'Modern dark theme with vibrant accents'
    },
    {
      id: 'light',
      name: 'Light',
      colors: ['#6366f1', '#10b981', '#f59e0b', '#f8fafc', '#334155'],
      fonts: ['Nunito', 'Open Sans'],
      description: 'Clean light theme with subtle accents'
    },
    // Industry-specific themes
    {
      id: 'health',
      name: 'Healthcare',
      colors: ['#0ea5e9', '#38bdf8', '#7dd3fc', '#ffffff', '#1e293b'],
      fonts: ['Montserrat', 'Open Sans'],
      description: 'Clean and trustworthy design for healthcare',
      industry: 'healthcare'
    },
    {
      id: 'tech',
      name: 'Technology',
      colors: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#1e1b4b', '#ffffff'],
      fonts: ['Inter', 'Roboto'],
      description: 'Modern and innovative tech appearance',
      industry: 'technology'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#ffffff', '#1e293b'],
      fonts: ['Nunito', 'Lato'],
      description: 'Attention-grabbing design for online shopping',
      industry: 'ecommerce'
    },
    {
      id: 'education',
      name: 'Education',
      colors: ['#8b5cf6', '#d8b4fe', '#f3e8ff', '#ffffff', '#1e293b'],
      fonts: ['Poppins', 'Source Sans Pro'],
      description: 'Friendly and accessible educational design',
      industry: 'education'
    }
  ];
  
  // Filter themes by industry
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const filteredThemes = industryFilter === 'all' 
    ? themes 
    : themes.filter(theme => theme.industry === industryFilter || !theme.industry);

  // Generate random theme based on color science
  const generateRandomTheme = () => {
    setGeneratingTheme(true);
    
    // Simulate AI theme generation
    setTimeout(() => {
      const hue = Math.floor(Math.random() * 360);
      const primaryColor = `hsl(${hue}, 80%, 50%)`;
      const secondaryColor = `hsl(${(hue + 30) % 360}, 70%, 60%)`;
      const accentColor = `hsl(${(hue + 60) % 360}, 90%, 65%)`;
      
      updateDesignSettings({
        color_palette: {
          ...designSettings?.color_palette!,
          primary: primaryColor,
          secondary: secondaryColor,
          accent: accentColor,
        }
      });
      
      toast({
        title: "AI Theme Generated",
        description: "Your custom theme has been created based on color harmony principles."
      });
      
      setGeneratingTheme(false);
    }, 1500);
  };
  
  // Save current settings as a custom theme
  const saveCustomTheme = () => {
    if (!designSettings) return;
    
    toast({
      title: "Theme Saved",
      description: `"${customThemeName}" has been saved to your custom themes.`
    });
    
    // In a real implementation, this would save to the database
  };
  
  // Typography scale factor
  const [typographyScale, setTypographyScale] = useState<number>(1);
  const updateTypographyScale = (value: number[]) => {
    setTypographyScale(value[0]);
    // This would update typography scaling across the site
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="presets">Presets</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="presets" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Theme Presets</h2>
            <div className="flex space-x-2">
              <select
                className="text-sm border rounded p-1"
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
              >
                <option value="all">All Industries</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="technology">Technology</option>
                <option value="ecommerce">E-commerce</option>
                <option value="education">Education</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredThemes.map((theme) => (
              <Card 
                key={theme.id}
                className={`cursor-pointer border transition-all ${selectedTheme === theme.id ? 'ring-2 ring-primary' : 'hover:border-primary/50'}`}
                onClick={() => onSelect(theme.id)}
              >
                <CardContent className="p-3 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-sm">{theme.name}</div>
                    {selectedTheme === theme.id && (
                      <Check size={16} className="text-primary" />
                    )}
                  </div>
                  
                  <div className="flex space-x-1">
                    {theme.colors.map((color, index) => (
                      <div 
                        key={index}
                        className="w-5 h-5 rounded-full border border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  
                  <div className="grid gap-1">
                    <div className="text-xs truncate" style={{ fontFamily: theme.fonts[0] }}>
                      Aa {theme.fonts[0]}
                    </div>
                    <div className="text-xs truncate text-muted-foreground" style={{ fontFamily: theme.fonts[1] }}>
                      Aa {theme.fonts[1]}
                    </div>
                  </div>
                  
                  {theme.description && (
                    <div className="text-xs text-muted-foreground truncate">
                      {theme.description}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Custom Theme</h2>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={generateRandomTheme}
              disabled={generatingTheme}
            >
              <Sparkles size={16} className="mr-1" />
              {generatingTheme ? 'Generating...' : 'AI Generate'}
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label>Theme Name</Label>
              <Input 
                value={customThemeName} 
                onChange={(e) => setCustomThemeName(e.target.value)}
                placeholder="My Custom Theme" 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Primary Color</Label>
              <ColorPicker 
                color={designSettings?.color_palette?.primary || '#3b82f6'} 
                onChange={(color) => {
                  setPrimaryColor(color);
                  updateDesignSettings({
                    color_palette: {
                      ...designSettings?.color_palette!,
                      primary: color
                    }
                  });
                }} 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Secondary Color</Label>
              <ColorPicker 
                color={designSettings?.color_palette?.secondary || '#10b981'} 
                onChange={(color) => {
                  updateDesignSettings({
                    color_palette: {
                      ...designSettings?.color_palette!,
                      secondary: color
                    }
                  });
                }} 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Accent Color</Label>
              <ColorPicker 
                color={designSettings?.color_palette?.accent || '#f97316'} 
                onChange={(color) => {
                  updateDesignSettings({
                    color_palette: {
                      ...designSettings?.color_palette!,
                      accent: color
                    }
                  });
                }} 
              />
            </div>
            
            <Button onClick={saveCustomTheme} className="w-full">
              <Save size={16} className="mr-1" />
              Save Custom Theme
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="typography" className="space-y-4">
          <div>
            <h2 className="text-lg font-medium">Typography Scaling</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Adjust text size across all device sizes proportionally
            </p>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between">
                  <Label>Base Font Scale</Label>
                  <span className="text-sm">{typographyScale}x</span>
                </div>
                <Slider 
                  value={[typographyScale]} 
                  min={0.75} 
                  max={1.5} 
                  step={0.05} 
                  onValueChange={updateTypographyScale} 
                  className="mt-2" 
                />
              </div>
              
              <div>
                <Label>Heading Font</Label>
                <select 
                  className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md"
                  value={designSettings?.typography_settings.headings.fontFamily}
                  onChange={(e) => {
                    updateDesignSettings({
                      typography_settings: {
                        ...designSettings?.typography_settings!,
                        headings: {
                          ...designSettings?.typography_settings.headings!,
                          fontFamily: e.target.value
                        }
                      }
                    });
                  }}
                >
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Poppins">Poppins</option>
                </select>
              </div>
              
              <div>
                <Label>Body Font</Label>
                <select 
                  className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md"
                  value={designSettings?.typography_settings.body.fontFamily}
                  onChange={(e) => {
                    updateDesignSettings({
                      typography_settings: {
                        ...designSettings?.typography_settings!,
                        body: {
                          ...designSettings?.typography_settings.body!,
                          fontFamily: e.target.value
                        }
                      }
                    });
                  }}
                >
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Lato">Lato</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Source Sans Pro">Source Sans Pro</option>
                </select>
              </div>
              
              <div>
                <h3 className="font-medium">Preview</h3>
                <div className="mt-3 p-4 border rounded-md">
                  <h1 className="text-2xl" style={{ 
                    fontFamily: designSettings?.typography_settings.headings.fontFamily, 
                    fontWeight: designSettings?.typography_settings.headings.fontWeight,
                    fontSize: `calc(1.5rem * ${typographyScale})`
                  }}>
                    Heading Text
                  </h1>
                  <p className="mt-2" style={{ 
                    fontFamily: designSettings?.typography_settings.body.fontFamily, 
                    fontWeight: designSettings?.typography_settings.body.fontWeight,
                    fontSize: `calc(1rem * ${typographyScale})`
                  }}>
                    This is body text that shows how typography will appear across your website. Adjusting the scale factor will change text size proportionally across all devices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <h2 className="text-lg font-medium">Advanced Theme Options</h2>
          <p className="text-sm text-muted-foreground">
            Fine-tune your global style overrides and design system
          </p>
          
          <div className="space-y-6">
            <div>
              <Label>Border Radius</Label>
              <div className="flex items-center mt-1">
                <Slider 
                  value={[parseFloat(designSettings?.spacing_settings.borderRadius || '0.375')]} 
                  min={0} 
                  max={2} 
                  step={0.125} 
                  onValueChange={([value]) => {
                    updateDesignSettings({
                      spacing_settings: {
                        ...designSettings?.spacing_settings!,
                        borderRadius: `${value}rem`
                      }
                    });
                  }} 
                  className="flex-1 mr-4" 
                />
                <div className="w-12 text-sm">
                  {designSettings?.spacing_settings.borderRadius}
                </div>
              </div>
            </div>
            
            <div>
              <Label>Section Spacing</Label>
              <div className="flex items-center mt-1">
                <Slider 
                  value={[parseFloat(designSettings?.spacing_settings.sectionSpacing || '4')]} 
                  min={1} 
                  max={10} 
                  step={0.5} 
                  onValueChange={([value]) => {
                    updateDesignSettings({
                      spacing_settings: {
                        ...designSettings?.spacing_settings!,
                        sectionSpacing: `${value}rem`
                      }
                    });
                  }} 
                  className="flex-1 mr-4" 
                />
                <div className="w-12 text-sm">
                  {designSettings?.spacing_settings.sectionSpacing}
                </div>
              </div>
            </div>
            
            <div>
              <Label>Content Width</Label>
              <div className="flex items-center mt-1">
                <Slider 
                  value={[parseInt(designSettings?.spacing_settings.contentWidth || '1200')]} 
                  min={800} 
                  max={1600} 
                  step={50} 
                  onValueChange={([value]) => {
                    updateDesignSettings({
                      spacing_settings: {
                        ...designSettings?.spacing_settings!,
                        contentWidth: `${value}px`
                      }
                    });
                  }} 
                  className="flex-1 mr-4" 
                />
                <div className="w-16 text-sm">
                  {designSettings?.spacing_settings.contentWidth}
                </div>
              </div>
            </div>
            
            <div>
              <Label>Custom CSS</Label>
              <textarea 
                className="w-full h-32 mt-1 px-3 py-2 bg-background border border-input rounded-md font-mono text-sm"
                value={designSettings?.custom_css || ''}
                onChange={(e) => {
                  updateDesignSettings({
                    custom_css: e.target.value
                  });
                }}
                placeholder=":root { --custom-color: #ff0000; }"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThemeSelector;
