
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBuilder } from '@/contexts/BuilderContext';
import { useDesign } from '@/contexts/DesignContext';
import { ArrowsPointingOutIcon, Grid3X3, Grid2X2, GridIcon, LayoutGrid } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface ResponsiveGridControlsProps {
  elementId: string;
}

const ResponsiveGridControls: React.FC<ResponsiveGridControlsProps> = ({ elementId }) => {
  const { elements, updateElement } = useBuilder();
  const { viewportSize } = useDesign();
  const element = elements.find(el => el.id === elementId);
  
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

  return (
    <div className="space-y-4 p-1">
      <div className="flex items-center justify-between">
        <Label htmlFor="enable-grid">Enable Grid Layout</Label>
        <Switch 
          id="enable-grid" 
          checked={gridSettings.enabled || false}
          onCheckedChange={(checked) => updateGridSetting('enabled', checked)}
        />
      </div>
      
      {gridSettings.enabled && (
        <div className="space-y-4 mt-4">
          <Tabs defaultValue="columns">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="columns">Columns & Rows</TabsTrigger>
              <TabsTrigger value="alignment">Alignment</TabsTrigger>
            </TabsList>
            
            <TabsContent value="columns" className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Grid Template</Label>
                  <ToggleGroup type="single" value={gridSettings.template || 'custom'} onValueChange={(value) => {
                    if (!value) return;
                    
                    let columns = 12;
                    let rows = 1;
                    
                    switch (value) {
                      case '1x1':
                        columns = 1;
                        rows = 1;
                        break;
                      case '2x2':
                        columns = 2;
                        rows = 2;
                        break;
                      case '3x3':
                        columns = 3;
                        rows = 3;
                        break;
                      case '4x4':
                        columns = 4;
                        rows = 4;
                        break;
                    }
                    
                    updateGridSetting('template', value);
                    updateGridSetting('columns', columns);
                    updateGridSetting('rows', rows);
                  }}>
                    <ToggleGroupItem value="1x1" size="sm" className="px-2 py-1">
                      <GridIcon className="h-3 w-3 mr-1" />1×1
                    </ToggleGroupItem>
                    <ToggleGroupItem value="2x2" size="sm" className="px-2 py-1">
                      <Grid2X2 className="h-3 w-3 mr-1" />2×2
                    </ToggleGroupItem>
                    <ToggleGroupItem value="3x3" size="sm" className="px-2 py-1">
                      <Grid3X3 className="h-3 w-3 mr-1" />3×3
                    </ToggleGroupItem>
                    <ToggleGroupItem value="custom" size="sm" className="px-2 py-1">
                      Custom
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
                
              <div className="space-y-2">
                <Label>Number of Columns</Label>
                <div className="flex gap-2">
                  <Slider
                    className="flex-grow"
                    value={[gridSettings.columns || 12]} 
                    min={1} 
                    max={12} 
                    step={1} 
                    onValueChange={([value]) => updateGridSetting('columns', value)}
                  />
                  <div className="w-10 text-center">
                    {gridSettings.columns || 12}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Number of Rows</Label>
                <div className="flex gap-2">
                  <Slider
                    className="flex-grow"
                    value={[gridSettings.rows || 1]} 
                    min={1} 
                    max={12} 
                    step={1} 
                    onValueChange={([value]) => updateGridSetting('rows', value)}
                  />
                  <div className="w-10 text-center">
                    {gridSettings.rows || 1}
                  </div>
                </div>
              </div>
              
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
                  <div className="w-10 text-center">
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
                    <SelectItem value="dense">Dense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            
            <TabsContent value="alignment" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Justify Items</Label>
                <Select 
                  value={gridSettings.justifyItems || 'stretch'} 
                  onValueChange={(value) => updateGridSetting('justifyItems', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Horizontal alignment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="start">Start</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="end">End</SelectItem>
                    <SelectItem value="stretch">Stretch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Align Items</Label>
                <Select 
                  value={gridSettings.alignItems || 'stretch'} 
                  onValueChange={(value) => updateGridSetting('alignItems', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Vertical alignment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="start">Start</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="end">End</SelectItem>
                    <SelectItem value="stretch">Stretch</SelectItem>
                    <SelectItem value="baseline">Baseline</SelectItem>
                  </SelectContent>
                </Select>
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
              
              <div className="space-y-2">
                <Label>Grid Item Position</Label>
                <div className="grid grid-cols-2 gap-2">
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
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default ResponsiveGridControls;
