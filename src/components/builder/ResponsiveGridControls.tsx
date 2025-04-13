
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useBuilder } from '@/contexts/BuilderContext';
import { useDesign } from '@/contexts/DesignContext';
import { Grid3X3, Grid2X2, GridIcon, LayoutGrid, Columns, ColumnsVertical, Grid, Table2 } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

// Define a GridStyles interface to fix TypeScript errors
export interface GridStyles {
  display?: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gap?: string;
  gridAutoFlow?: string;
  justifyItems?: string;
  alignItems?: string;
  placeContent?: string;
  gridColumnStart?: string | number;
  gridColumnEnd?: string | number;
  gridRowStart?: string | number;
  gridRowEnd?: string | number;
}

interface GridTemplateDefinition {
  name: string;
  columns: number;
  rows: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface ResponsiveGridControlsProps {
  elementId: string;
}

const ResponsiveGridControls: React.FC<ResponsiveGridControlsProps> = ({ elementId }) => {
  const { elements, updateElement } = useBuilder();
  const { viewportSize } = useDesign();
  const element = elements.find(el => el.id === elementId);
  const [activeTab, setActiveTab] = useState('columns');
  const [columnView, setColumnView] = useState<'slider' | 'manual' | 'preset'>('preset');
  
  if (!element) return null;

  // Get responsive settings for current viewport
  const responsive = element.properties.responsive || {
    desktop: {}, tablet: {}, mobile: {}
  };
  
  const currentViewport = responsive[viewportSize] || {};
  
  // Get grid settings
  const gridSettings = currentViewport.grid || {
    enabled: false,
    columns: 12,
    rows: 1,
    gap: 16,
    autoFlow: 'row',
    justifyItems: 'stretch',
    alignItems: 'stretch'
  };

  // Define preset grid templates
  const gridTemplates: GridTemplateDefinition[] = [
    { name: '1×1', columns: 1, rows: 1, icon: GridIcon },
    { name: '2×1', columns: 2, rows: 1, icon: Columns },
    { name: '3×1', columns: 3, rows: 1, icon: Columns },
    { name: '2×2', columns: 2, rows: 2, icon: Grid2X2 },
    { name: '3×2', columns: 3, rows: 2, icon: Grid },
    { name: '3×3', columns: 3, rows: 3, icon: Grid3X3 },
    { name: '4×1', columns: 4, rows: 1, icon: Table2 },
    { name: '4×2', columns: 4, rows: 2, icon: Table2 },
  ];

  const updateGridSetting = (property: string, value: any) => {
    const updatedGrid = {
      ...(currentViewport.grid || {}),
      [property]: value
    };
    
    const updatedViewport = {
      ...currentViewport,
      grid: updatedGrid
    };
    
    const updatedResponsive = {
      ...responsive,
      [viewportSize]: updatedViewport
    };
    
    updateElement(elementId, {
      properties: {
        ...element.properties,
        responsive: updatedResponsive
      }
    });
  };

  // Apply a preset grid template
  const applyGridTemplate = (template: GridTemplateDefinition) => {
    updateGridSetting('columns', template.columns);
    updateGridSetting('rows', template.rows);
    updateGridSetting('template', template.name);
  };

  // Generate grid preview
  const generateGridPreview = () => {
    const columns = gridSettings.columns || 1;
    const rows = gridSettings.rows || 1;
    
    return (
      <div className="w-full aspect-video bg-gray-50 border rounded-md overflow-hidden">
        <div 
          className="w-full h-full"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: `${gridSettings.gap || 8}px`,
          }}
        >
          {Array.from({ length: columns * rows }).map((_, i) => (
            <div key={i} className="bg-blue-100 border border-blue-200 rounded-sm flex items-center justify-center">
              <span className="text-xs text-blue-500">{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <ScrollArea className="h-[500px]">
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="enable-grid">Enable Grid Layout</Label>
          <Switch 
            id="enable-grid" 
            checked={gridSettings.enabled || false}
            onCheckedChange={(checked) => updateGridSetting('enabled', checked)}
          />
        </div>
        
        {gridSettings.enabled && (
          <div className="space-y-6 mt-4">
            {/* Grid Preview */}
            <div className="space-y-2">
              <Label>Grid Preview</Label>
              {generateGridPreview()}
            </div>
            
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="columns">Structure</TabsTrigger>
                <TabsTrigger value="alignment">Alignment</TabsTrigger>
                <TabsTrigger value="position">Positioning</TabsTrigger>
              </TabsList>
              
              <TabsContent value="columns" className="space-y-4 pt-4">
                {/* Grid Template Selection */}
                <div className="space-y-2">
                  <Label>Grid Template</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {gridTemplates.map((template) => (
                      <Button
                        key={template.name}
                        variant={gridSettings.template === template.name ? "default" : "outline"}
                        size="sm"
                        className="h-auto py-2 flex flex-col items-center gap-1"
                        onClick={() => applyGridTemplate(template)}
                      >
                        <template.icon className="h-4 w-4" />
                        <span className="text-xs">{template.name}</span>
                      </Button>
                    ))}
                    <Button
                      variant={columnView === 'manual' ? "default" : "outline"}
                      size="sm"
                      className="h-auto py-2 flex flex-col items-center gap-1"
                      onClick={() => setColumnView('manual')}
                    >
                      <LayoutGrid className="h-4 w-4" />
                      <span className="text-xs">Custom</span>
                    </Button>
                  </div>
                </div>
                
                {columnView === 'preset' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Columns: {gridSettings.columns}</Label>
                        <div className="flex gap-1">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => updateGridSetting('columns', Math.max(1, (gridSettings.columns || 1) - 1))}
                          >-</Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => updateGridSetting('columns', Math.min(12, (gridSettings.columns || 1) + 1))}
                          >+</Button>
                        </div>
                      </div>
                      <Slider
                        className="flex-grow"
                        value={[gridSettings.columns || 1]} 
                        min={1} 
                        max={12} 
                        step={1} 
                        onValueChange={([value]) => updateGridSetting('columns', value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Rows: {gridSettings.rows}</Label>
                        <div className="flex gap-1">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => updateGridSetting('rows', Math.max(1, (gridSettings.rows || 1) - 1))}
                          >-</Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => updateGridSetting('rows', Math.min(12, (gridSettings.rows || 1) + 1))}
                          >+</Button>
                        </div>
                      </div>
                      <Slider
                        className="flex-grow"
                        value={[gridSettings.rows || 1]} 
                        min={1} 
                        max={12} 
                        step={1} 
                        onValueChange={([value]) => updateGridSetting('rows', value)}
                      />
                    </div>
                  </div>
                )}
                
                {columnView === 'manual' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="grid-template-columns">Custom Grid Template Columns</Label>
                      <Input
                        id="grid-template-columns"
                        placeholder="e.g., 1fr 2fr 1fr"
                        value={gridSettings.customTemplateColumns || ''}
                        onChange={(e) => updateGridSetting('customTemplateColumns', e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Use CSS grid values like "1fr 2fr 1fr" or "repeat(3, 1fr)"
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="grid-template-rows">Custom Grid Template Rows</Label>
                      <Input
                        id="grid-template-rows"
                        placeholder="e.g., auto 200px 1fr"
                        value={gridSettings.customTemplateRows || ''}
                        onChange={(e) => updateGridSetting('customTemplateRows', e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Use CSS grid values like "auto 1fr" or "repeat(2, minmax(100px, auto))"
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label>Grid Gap</Label>
                  <div className="flex gap-2">
                    <Slider
                      className="flex-grow"
                      value={[gridSettings.gap || 16]} 
                      min={0} 
                      max={48} 
                      step={4} 
                      onValueChange={([value]) => updateGridSetting('gap', value)}
                    />
                    <div className="w-12 text-center">
                      {gridSettings.gap || 16}px
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Auto Flow</Label>
                  <Select 
                    value={gridSettings.autoFlow || 'row'} 
                    onValueChange={(value) => updateGridSetting('autoFlow', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select flow direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="row">Row</SelectItem>
                      <SelectItem value="column">Column</SelectItem>
                      <SelectItem value="row dense">Row Dense</SelectItem>
                      <SelectItem value="column dense">Column Dense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Advanced Mode</Label>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="advanced-grid"
                      checked={gridSettings.advancedMode || false}
                      onCheckedChange={(checked) => updateGridSetting('advancedMode', checked)}
                    />
                    <Label htmlFor="advanced-grid" className="text-sm">Enable advanced grid options</Label>
                  </div>
                </div>
                
                {gridSettings.advancedMode && (
                  <div className="space-y-4 border-t border-gray-200 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="grid-template-areas">Grid Template Areas</Label>
                      <Textarea
                        id="grid-template-areas"
                        placeholder={`"header header"\n"sidebar content"\n"footer footer"`}
                        value={gridSettings.templateAreas || ''}
                        onChange={(e) => updateGridSetting('templateAreas', e.target.value)}
                        className="font-mono text-sm"
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground">
                        Define named grid areas. Each row in quotes, cells separated by spaces.
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="alignment" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Justify Items (Horizontal Alignment)</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {['start', 'center', 'end', 'stretch'].map((value) => (
                        <Button
                          key={value}
                          variant={gridSettings.justifyItems === value ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateGridSetting('justifyItems', value)}
                          className="capitalize"
                        >
                          {value}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Align Items (Vertical Alignment)</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {['start', 'center', 'end', 'stretch', 'baseline'].map((value) => (
                        <Button
                          key={value}
                          variant={gridSettings.alignItems === value ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateGridSetting('alignItems', value)}
                          className="capitalize"
                        >
                          {value}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Place Content</Label>
                    <Select 
                      value={gridSettings.placeContent || 'stretch'} 
                      onValueChange={(value) => updateGridSetting('placeContent', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Content alignment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="start">Start</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="end">End</SelectItem>
                        <SelectItem value="stretch">Stretch</SelectItem>
                        <SelectItem value="space-between">Space Between</SelectItem>
                        <SelectItem value="space-around">Space Around</SelectItem>
                        <SelectItem value="space-evenly">Space Evenly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="position" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Grid Item Position</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Position this element within its parent grid
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Column Start</Label>
                      <Input 
                        type="number" 
                        placeholder="auto" 
                        value={gridSettings.columnStart || ''} 
                        onChange={(e) => updateGridSetting('columnStart', e.target.value ? parseInt(e.target.value) : '')} 
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Column End</Label>
                      <Input 
                        type="number" 
                        placeholder="auto" 
                        value={gridSettings.columnEnd || ''} 
                        onChange={(e) => updateGridSetting('columnEnd', e.target.value ? parseInt(e.target.value) : '')} 
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Row Start</Label>
                      <Input 
                        type="number" 
                        placeholder="auto" 
                        value={gridSettings.rowStart || ''} 
                        onChange={(e) => updateGridSetting('rowStart', e.target.value ? parseInt(e.target.value) : '')} 
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Row End</Label>
                      <Input 
                        type="number" 
                        placeholder="auto" 
                        value={gridSettings.rowEnd || ''} 
                        onChange={(e) => updateGridSetting('rowEnd', e.target.value ? parseInt(e.target.value) : '')} 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Grid Area Name</Label>
                  <Input 
                    placeholder="e.g., header" 
                    value={gridSettings.area || ''} 
                    onChange={(e) => updateGridSetting('area', e.target.value)} 
                  />
                  <p className="text-xs text-muted-foreground">
                    Assign this element to a named grid area (requires template areas)
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Span Multiple Cells</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Column Span</Label>
                      <Input 
                        type="number" 
                        placeholder="1" 
                        value={gridSettings.columnSpan || ''} 
                        onChange={(e) => updateGridSetting('columnSpan', e.target.value ? parseInt(e.target.value) : '')} 
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Row Span</Label>
                      <Input 
                        type="number" 
                        placeholder="1" 
                        value={gridSettings.rowSpan || ''} 
                        onChange={(e) => updateGridSetting('rowSpan', e.target.value ? parseInt(e.target.value) : '')} 
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

// Import missing components
import { Textarea } from '@/components/ui/textarea';

export default ResponsiveGridControls;
