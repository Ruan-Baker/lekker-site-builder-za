
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useDesign } from '@/contexts/DesignContext';
import ColorPicker from '../design/ColorPicker';
import FontSelector from '../design/FontSelector';
import SpacingControl from '../design/SpacingControl';

const DesignPanel = () => {
  const { 
    designSettings, 
    updateDesignSettings, 
    fonts, 
    selectedFont, 
    setSelectedFont,
    primaryColor,
    setPrimaryColor,
    isLoading 
  } = useDesign();
  
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSaveDesign = async () => {
    if (!designSettings) return;
    
    setIsSaving(true);
    try {
      await updateDesignSettings({
        typography_settings: {
          ...designSettings.typography_settings,
          headings: {
            ...designSettings.typography_settings.headings,
            fontFamily: selectedFont
          }
        },
        color_palette: {
          ...designSettings.color_palette,
          primary: primaryColor
        }
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading || !designSettings) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading design settings...</p>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-medium">Design Settings</h2>
        <Button 
          size="sm" 
          onClick={handleSaveDesign} 
          disabled={isSaving}
          className="flex items-center gap-1"
        >
          <Save size={14} />
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          <Tabs defaultValue="colors">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="spacing">Spacing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="colors" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Brand Colors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ColorPicker 
                    color={primaryColor} 
                    onChange={setPrimaryColor}
                    label="Primary Color"
                  />
                  
                  <ColorPicker 
                    color={designSettings.color_palette.secondary} 
                    onChange={(color) => {
                      const updatedSettings = {
                        ...designSettings,
                        color_palette: {
                          ...designSettings.color_palette,
                          secondary: color
                        }
                      };
                      updateDesignSettings(updatedSettings);
                    }}
                    label="Secondary Color"
                  />
                  
                  <ColorPicker 
                    color={designSettings.color_palette.accent} 
                    onChange={(color) => {
                      const updatedSettings = {
                        ...designSettings,
                        color_palette: {
                          ...designSettings.color_palette,
                          accent: color
                        }
                      };
                      updateDesignSettings(updatedSettings);
                    }}
                    label="Accent Color"
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">UI Colors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ColorPicker 
                    color={designSettings.color_palette.background} 
                    onChange={(color) => {
                      const updatedSettings = {
                        ...designSettings,
                        color_palette: {
                          ...designSettings.color_palette,
                          background: color
                        }
                      };
                      updateDesignSettings(updatedSettings);
                    }}
                    label="Background Color"
                  />
                  
                  <ColorPicker 
                    color={designSettings.color_palette.text} 
                    onChange={(color) => {
                      const updatedSettings = {
                        ...designSettings,
                        color_palette: {
                          ...designSettings.color_palette,
                          text: color
                        }
                      };
                      updateDesignSettings(updatedSettings);
                    }}
                    label="Text Color"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="typography" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Fonts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FontSelector 
                    value={selectedFont}
                    onChange={setSelectedFont}
                    fonts={fonts}
                    label="Heading Font"
                  />
                  
                  <FontSelector 
                    value={designSettings.typography_settings.body.fontFamily}
                    onChange={(font) => {
                      const updatedSettings = {
                        ...designSettings,
                        typography_settings: {
                          ...designSettings.typography_settings,
                          body: {
                            ...designSettings.typography_settings.body,
                            fontFamily: font
                          }
                        }
                      };
                      updateDesignSettings(updatedSettings);
                    }}
                    fonts={fonts}
                    label="Body Font"
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Font Weights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select 
                    value={designSettings.typography_settings.headings.fontWeight}
                    onValueChange={(weight) => {
                      const updatedSettings = {
                        ...designSettings,
                        typography_settings: {
                          ...designSettings.typography_settings,
                          headings: {
                            ...designSettings.typography_settings.headings,
                            fontWeight: weight
                          }
                        }
                      };
                      updateDesignSettings(updatedSettings);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select heading weight" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="400">Regular (400)</SelectItem>
                      <SelectItem value="500">Medium (500)</SelectItem>
                      <SelectItem value="600">Semi-Bold (600)</SelectItem>
                      <SelectItem value="700">Bold (700)</SelectItem>
                      <SelectItem value="800">Extra Bold (800)</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={designSettings.typography_settings.body.fontWeight}
                    onValueChange={(weight) => {
                      const updatedSettings = {
                        ...designSettings,
                        typography_settings: {
                          ...designSettings.typography_settings,
                          body: {
                            ...designSettings.typography_settings.body,
                            fontWeight: weight
                          }
                        }
                      };
                      updateDesignSettings(updatedSettings);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select body weight" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="300">Light (300)</SelectItem>
                      <SelectItem value="400">Regular (400)</SelectItem>
                      <SelectItem value="500">Medium (500)</SelectItem>
                      <SelectItem value="600">Semi-Bold (600)</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="spacing" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Layout Spacing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SpacingControl 
                    value={designSettings.spacing_settings.containerPadding} 
                    onChange={(value) => {
                      const updatedSettings = {
                        ...designSettings,
                        spacing_settings: {
                          ...designSettings.spacing_settings,
                          containerPadding: value
                        }
                      };
                      updateDesignSettings(updatedSettings);
                    }}
                    label="Container Padding"
                    min={0}
                    max={5}
                    step={0.25}
                    unit="rem"
                  />
                  
                  <SpacingControl 
                    value={designSettings.spacing_settings.sectionSpacing} 
                    onChange={(value) => {
                      const updatedSettings = {
                        ...designSettings,
                        spacing_settings: {
                          ...designSettings.spacing_settings,
                          sectionSpacing: value
                        }
                      };
                      updateDesignSettings(updatedSettings);
                    }}
                    label="Section Spacing"
                    min={0}
                    max={8}
                    step={0.5}
                    unit="rem"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
};

export default DesignPanel;

// Import the Select components that were missing
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
