
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
import ThemeSelector from '../design/ThemeSelector';
import CustomCodeEditor from '../design/CustomCodeEditor';
import { useParams } from 'react-router-dom';
import AdvancedTypographyControls from '../design/AdvancedTypographyControls';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const DesignPanel = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { 
    designSettings, 
    updateDesignSettings, 
    fonts, 
    selectedFont, 
    setSelectedFont,
    primaryColor,
    setPrimaryColor,
    isLoading,
    applyTheme,
    addCustomFont
  } = useDesign();
  
  const [isSaving, setIsSaving] = useState(false);
  const [newFontUrl, setNewFontUrl] = useState('');
  const [newFontName, setNewFontName] = useState('');
  
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
  
  const handleAddCustomFont = async () => {
    if (!newFontName || !newFontUrl) return;
    
    try {
      await addCustomFont(newFontName, newFontUrl, ['400', '700']);
      setNewFontName('');
      setNewFontUrl('');
    } catch (error) {
      console.error('Failed to add custom font:', error);
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
          <Tabs defaultValue="themes">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="themes">Themes</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="spacing">Spacing</TabsTrigger>
              <TabsTrigger value="code">Custom Code</TabsTrigger>
            </TabsList>
            
            <TabsContent value="themes" className="space-y-4">
              <ThemeSelector 
                onSelect={(theme) => {
                  applyTheme(theme);
                }}
                selectedTheme={designSettings.theme || 'default'}
              />
            </TabsContent>
            
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
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">State Colors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ColorPicker 
                    color={designSettings.color_palette.success || '#22c55e'} 
                    onChange={(color) => {
                      const updatedSettings = {
                        ...designSettings,
                        color_palette: {
                          ...designSettings.color_palette,
                          success: color
                        }
                      };
                      updateDesignSettings(updatedSettings);
                    }}
                    label="Success Color"
                  />
                  
                  <ColorPicker 
                    color={designSettings.color_palette.error || '#ef4444'} 
                    onChange={(color) => {
                      const updatedSettings = {
                        ...designSettings,
                        color_palette: {
                          ...designSettings.color_palette,
                          error: color
                        }
                      };
                      updateDesignSettings(updatedSettings);
                    }}
                    label="Error Color"
                  />
                  
                  <ColorPicker 
                    color={designSettings.color_palette.warning || '#f59e0b'} 
                    onChange={(color) => {
                      const updatedSettings = {
                        ...designSettings,
                        color_palette: {
                          ...designSettings.color_palette,
                          warning: color
                        }
                      };
                      updateDesignSettings(updatedSettings);
                    }}
                    label="Warning Color"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="typography" className="space-y-4">
              <Tabs defaultValue="fonts">
                <TabsList className="w-full">
                  <TabsTrigger value="fonts" className="flex-1">Fonts</TabsTrigger>
                  <TabsTrigger value="advanced" className="flex-1">Advanced</TabsTrigger>
                  <TabsTrigger value="custom" className="flex-1">Custom Fonts</TabsTrigger>
                </TabsList>
                
                <TabsContent value="fonts" className="pt-4 space-y-4">
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
                
                <TabsContent value="advanced" className="pt-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Heading Typography</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <AdvancedTypographyControls 
                        value={{
                          fontFamily: designSettings.typography_settings.headings.fontFamily,
                          fontWeight: designSettings.typography_settings.headings.fontWeight,
                          lineHeight: designSettings.typography_settings.headings.lineHeight || '1.2',
                          letterSpacing: designSettings.typography_settings.headings.letterSpacing || '-0.025em',
                          textTransform: designSettings.typography_settings.headings.textTransform || 'none'
                        }}
                        onChange={(value) => {
                          const updatedSettings = {
                            ...designSettings,
                            typography_settings: {
                              ...designSettings.typography_settings,
                              headings: {
                                ...designSettings.typography_settings.headings,
                                ...value
                              }
                            }
                          };
                          updateDesignSettings(updatedSettings);
                        }}
                      />
                    </CardContent>
                  </Card>
                  
                  <Card className="mt-4">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Body Typography</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <AdvancedTypographyControls 
                        value={{
                          fontFamily: designSettings.typography_settings.body.fontFamily,
                          fontWeight: designSettings.typography_settings.body.fontWeight,
                          lineHeight: designSettings.typography_settings.body.lineHeight || '1.5',
                          letterSpacing: designSettings.typography_settings.body.letterSpacing || '0',
                          fontSize: designSettings.typography_settings.body.fontSize || '16px'
                        }}
                        onChange={(value) => {
                          const updatedSettings = {
                            ...designSettings,
                            typography_settings: {
                              ...designSettings.typography_settings,
                              body: {
                                ...designSettings.typography_settings.body,
                                ...value
                              }
                            }
                          };
                          updateDesignSettings(updatedSettings);
                        }}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="custom" className="pt-4 space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Add Custom Font</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fontName">Font Name</Label>
                        <Input
                          id="fontName"
                          value={newFontName}
                          onChange={(e) => setNewFontName(e.target.value)}
                          placeholder="e.g., My Custom Font"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="fontUrl">Font URL</Label>
                        <Input
                          id="fontUrl"
                          value={newFontUrl}
                          onChange={(e) => setNewFontUrl(e.target.value)}
                          placeholder="https://fonts.googleapis.com/css2?family=..."
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Use a link to a Google Font or a self-hosted font file
                        </p>
                      </div>
                      
                      <Button onClick={handleAddCustomFont} className="w-full">
                        Add Font
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Custom Fonts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {designSettings.typography_settings.customFonts && 
                       designSettings.typography_settings.customFonts.length > 0 ? (
                        designSettings.typography_settings.customFonts.map((font, index) => (
                          <div key={index} className="p-3 border rounded-md">
                            <div className="font-medium">{font.name}</div>
                            <div className="text-xs text-muted-foreground truncate">{font.url}</div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No custom fonts added yet
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
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
                  
                  <SpacingControl 
                    value={designSettings.spacing_settings.elementSpacing || '1rem'} 
                    onChange={(value) => {
                      const updatedSettings = {
                        ...designSettings,
                        spacing_settings: {
                          ...designSettings.spacing_settings,
                          elementSpacing: value
                        }
                      };
                      updateDesignSettings(updatedSettings);
                    }}
                    label="Element Spacing"
                    min={0}
                    max={4}
                    step={0.25}
                    unit="rem"
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Border & Sizing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SpacingControl 
                    value={designSettings.spacing_settings.borderRadius || '0.375rem'} 
                    onChange={(value) => {
                      const updatedSettings = {
                        ...designSettings,
                        spacing_settings: {
                          ...designSettings.spacing_settings,
                          borderRadius: value
                        }
                      };
                      updateDesignSettings(updatedSettings);
                    }}
                    label="Border Radius"
                    min={0}
                    max={2}
                    step={0.125}
                    unit="rem"
                  />
                  
                  <SpacingControl 
                    value={designSettings.spacing_settings.contentWidth || '1200px'} 
                    onChange={(value) => {
                      const updatedSettings = {
                        ...designSettings,
                        spacing_settings: {
                          ...designSettings.spacing_settings,
                          contentWidth: value
                        }
                      };
                      updateDesignSettings(updatedSettings);
                    }}
                    label="Max Content Width"
                    min={480}
                    max={1600}
                    step={20}
                    unit="px"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="code" className="space-y-4">
              {projectId && <CustomCodeEditor projectId={projectId} />}
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
};

export default DesignPanel;

// Import the Select components
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
