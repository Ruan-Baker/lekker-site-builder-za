
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { useBuilder } from '@/contexts/BuilderContext';
import { useSections } from '@/contexts/SectionContext';
import { useToast } from '@/hooks/use-toast';
import { LayoutGrid, Grid, Save, Plus, Square, Copy, LayoutList } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import BackgroundSelector from '@/components/design/BackgroundSelector';
import ColorPicker from '@/components/design/ColorPicker';

interface GridSectionBuilderProps {
  onSave?: () => void;
}

interface GridCellItem {
  id: string;
  type: string;
  columnSpan: number;
  rowSpan: number;
  content?: string;
  properties?: Record<string, any>;
}

const GridSectionBuilder: React.FC<GridSectionBuilderProps> = ({ onSave }) => {
  const { addElement } = useBuilder();
  const { saveSectionAsTemplate, categories } = useSections();
  const { toast } = useToast();
  
  // Grid structure settings
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(2);
  const [gap, setGap] = useState(16);
  const [cellItems, setCellItems] = useState<GridCellItem[]>([]);
  
  // Section metadata
  const [sectionName, setSectionName] = useState('');
  const [sectionDescription, setSectionDescription] = useState('');
  const [sectionCategory, setSectionCategory] = useState('custom');
  
  // Section styling
  const [background, setBackground] = useState({ type: 'color', value: '#ffffff' });
  const [padding, setPadding] = useState({ top: 64, right: 32, bottom: 64, left: 32 });
  const [maxWidth, setMaxWidth] = useState(1200);
  
  // Current edit mode
  const [currentTab, setCurrentTab] = useState('structure');
  const [selectedCellIndex, setSelectedCellIndex] = useState<number>(-1);
  
  // Handle adding a new cell item
  const addCellItem = () => {
    const newItem: GridCellItem = {
      id: `cell-${Date.now()}`,
      type: 'text',
      columnSpan: 1,
      rowSpan: 1,
      content: 'New Content'
    };
    
    setCellItems([...cellItems, newItem]);
  };
  
  // Handle updating a cell item
  const updateCellItem = (index: number, data: Partial<GridCellItem>) => {
    const updatedItems = [...cellItems];
    updatedItems[index] = { ...updatedItems[index], ...data };
    setCellItems(updatedItems);
  };
  
  // Remove a cell item
  const removeCellItem = (index: number) => {
    const updatedItems = [...cellItems];
    updatedItems.splice(index, 1);
    setCellItems(updatedItems);
    
    if (selectedCellIndex === index) {
      setSelectedCellIndex(-1);
    }
  };
  
  // Preview the grid
  const previewGrid = () => {
    return (
      <div 
        className="w-full border rounded-md bg-gray-50 overflow-hidden"
        style={{ 
          minHeight: '300px',
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, minmax(50px, auto))`,
          gap: `${gap}px`,
          padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
          backgroundColor: background.type === 'color' ? background.value : '#ffffff',
          backgroundImage: background.type === 'gradient' ? background.value : 'none',
        }}
      >
        {cellItems.map((cell, index) => {
          const isSelected = index === selectedCellIndex;
          
          return (
            <div
              key={cell.id}
              style={{
                gridColumn: `span ${cell.columnSpan}`,
                gridRow: `span ${cell.rowSpan}`,
              }}
              className={`relative p-2 bg-white border ${isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200'} cursor-pointer`}
              onClick={() => setSelectedCellIndex(index)}
            >
              <div className="absolute top-1 right-1 text-xs px-1 rounded bg-gray-100">
                {`${cell.columnSpan}x${cell.rowSpan}`}
              </div>
              
              {cell.type === 'text' && (
                <p className="text-sm">{cell.content}</p>
              )}
              
              {cell.type === 'image' && (
                <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
                  <span className="text-xs">Image</span>
                </div>
              )}
              
              {cell.type === 'button' && (
                <div className="mt-3">
                  <button 
                    className="text-xs px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    {cell.content || 'Button'}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  
  // Generate section template data
  const generateSectionTemplate = () => {
    // Create a container element for the section
    const containerProperties = {
      style: {
        maxWidth: `${maxWidth}px`,
        margin: '0 auto',
        padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
      },
      background: background,
      content: '',
      // Create child elements based on cell items
      children: cellItems.map(cell => ({
        type: cell.type,
        properties: {
          content: cell.content || '',
          ...(cell.properties || {}),
          style: {
            gridColumn: `span ${cell.columnSpan}`,
            gridRow: `span ${cell.rowSpan}`,
          }
        },
      })),
      // Add grid layout properties
      grid: {
        enabled: true,
        columns: columns,
        rows: rows,
        gap: gap
      }
    };
    
    return {
      type: 'container',
      properties: containerProperties,
      complexity: 'medium'
    };
  };
  
  // Handle save section
  const handleSaveSection = async () => {
    if (!sectionName) {
      toast({
        title: "Name Required",
        description: "Please provide a name for your section template",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const sectionData = generateSectionTemplate();
      
      const metadata = {
        name: sectionName,
        description: sectionDescription,
        category: sectionCategory,
        industry: null,
        tags: [],
        complexity: 'medium'
      };
      
      await saveSectionAsTemplate(sectionData, metadata);
      
      toast({
        title: "Section Saved",
        description: "Your grid section has been saved as a template"
      });
      
      // Reset form
      setSectionName('');
      setSectionDescription('');
      
      // Call onSave callback if provided
      if (onSave) onSave();
      
    } catch (error) {
      console.error('Error saving grid section:', error);
      toast({
        title: "Error",
        description: "Failed to save section template",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LayoutGrid className="h-5 w-5" />
          Grid Section Builder
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="structure">Structure</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>
          
          <TabsContent value="structure" className="space-y-4 pt-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <Label>Number of Columns</Label>
                  <div className="flex gap-2 items-center">
                    <Slider 
                      value={[columns]} 
                      min={1} 
                      max={12} 
                      step={1}
                      onValueChange={([value]) => setColumns(value)}
                    />
                    <div className="w-10 text-center">{columns}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Number of Rows</Label>
                  <div className="flex gap-2 items-center">
                    <Slider 
                      value={[rows]} 
                      min={1} 
                      max={6} 
                      step={1}
                      onValueChange={([value]) => setRows(value)}
                    />
                    <div className="w-10 text-center">{rows}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Grid Gap</Label>
                  <div className="flex gap-2 items-center">
                    <Slider 
                      value={[gap]} 
                      min={0} 
                      max={48} 
                      step={4}
                      onValueChange={([value]) => setGap(value)}
                    />
                    <div className="w-10 text-center">{gap}px</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Common Layouts</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex flex-col items-center py-3"
                      onClick={() => { setColumns(1); setRows(3); }}
                    >
                      <LayoutList className="h-5 w-5 mb-1" />
                      <span className="text-xs">Single Column</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex flex-col items-center py-3"
                      onClick={() => { setColumns(2); setRows(2); }}
                    >
                      <Grid className="h-5 w-5 mb-1" />
                      <span className="text-xs">2×2 Grid</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex flex-col items-center py-3"
                      onClick={() => { setColumns(3); setRows(1); }}
                    >
                      <LayoutGrid className="h-5 w-5 mb-1" />
                      <span className="text-xs">3-Column</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex flex-col items-center py-3"
                      onClick={() => { setColumns(2); setRows(1); }}
                    >
                      <Square className="h-5 w-5 mb-1" />
                      <span className="text-xs">2-Column</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="space-y-2">
                  <Label>Grid Preview</Label>
                  <div className="border rounded-md p-2 bg-gray-50 aspect-video flex items-center justify-center">
                    <div 
                      className="w-full h-full" 
                      style={{ 
                        display: 'grid',
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gridTemplateRows: `repeat(${rows}, 1fr)`,
                        gap: `${gap}px`
                      }}
                    >
                      {Array.from({ length: columns * rows }).map((_, i) => (
                        <div key={i} className="bg-blue-100 border border-blue-200" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Cell Items</h3>
              <Button onClick={addCellItem} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" /> Add Cell
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <ScrollArea className="h-[300px] pr-4">
                {cellItems.map((item, index) => (
                  <Card key={item.id} className={`mb-2 ${index === selectedCellIndex ? 'border-primary' : ''}`}>
                    <CardHeader className="py-2 px-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">Cell {index + 1}</CardTitle>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500" onClick={() => removeCellItem(index)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2 px-3 space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label className="text-xs">Column Span</Label>
                          <Select 
                            value={item.columnSpan.toString()} 
                            onValueChange={(val) => updateCellItem(index, { columnSpan: parseInt(val) })}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue placeholder="Span" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: columns }).map((_, i) => (
                                <SelectItem key={i} value={(i + 1).toString()}>
                                  {i + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-1">
                          <Label className="text-xs">Row Span</Label>
                          <Select 
                            value={item.rowSpan.toString()} 
                            onValueChange={(val) => updateCellItem(index, { rowSpan: parseInt(val) })}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue placeholder="Span" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: rows }).map((_, i) => (
                                <SelectItem key={i} value={(i + 1).toString()}>
                                  {i + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <Label className="text-xs">Content Type</Label>
                        <Select 
                          value={item.type} 
                          onValueChange={(val) => updateCellItem(index, { type: val })}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="image">Image</SelectItem>
                            <SelectItem value="button">Button</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {item.type !== 'image' && (
                        <div className="space-y-1">
                          <Label className="text-xs">Content</Label>
                          <Input 
                            value={item.content || ''}
                            onChange={(e) => updateCellItem(index, { content: e.target.value })}
                            className="h-8 text-xs"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                
                {cellItems.length === 0 && (
                  <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center text-gray-500">
                    <LayoutGrid className="h-10 w-10 mb-2 opacity-20" />
                    <p className="text-sm">No cell items added yet</p>
                    <p className="text-xs mt-1">Click "Add Cell" to create content cells</p>
                    <Button 
                      onClick={addCellItem} 
                      variant="outline" 
                      size="sm"
                      className="mt-3"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add First Cell
                    </Button>
                  </div>
                )}
              </ScrollArea>
            </div>
          </TabsContent>
          
          <TabsContent value="style" className="space-y-4 pt-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Background</Label>
                <BackgroundSelector value={background} onChange={setBackground} />
              </div>
              
              <div className="space-y-2">
                <Label>Max Width</Label>
                <div className="flex gap-2 items-center">
                  <Slider 
                    value={[maxWidth]} 
                    min={600} 
                    max={2400} 
                    step={100}
                    onValueChange={([value]) => setMaxWidth(value)}
                  />
                  <div className="w-16 text-center">{maxWidth}px</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Padding</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Top</Label>
                    <div className="flex gap-2 items-center">
                      <Slider 
                        value={[padding.top]} 
                        min={0} 
                        max={120} 
                        step={8}
                        onValueChange={([value]) => setPadding({ ...padding, top: value })}
                      />
                      <div className="w-10 text-center">{padding.top}px</div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-xs">Right</Label>
                    <div className="flex gap-2 items-center">
                      <Slider 
                        value={[padding.right]} 
                        min={0} 
                        max={120} 
                        step={8}
                        onValueChange={([value]) => setPadding({ ...padding, right: value })}
                      />
                      <div className="w-10 text-center">{padding.right}px</div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-xs">Bottom</Label>
                    <div className="flex gap-2 items-center">
                      <Slider 
                        value={[padding.bottom]} 
                        min={0} 
                        max={120} 
                        step={8}
                        onValueChange={([value]) => setPadding({ ...padding, bottom: value })}
                      />
                      <div className="w-10 text-center">{padding.bottom}px</div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-xs">Left</Label>
                    <div className="flex gap-2 items-center">
                      <Slider 
                        value={[padding.left]} 
                        min={0} 
                        max={120} 
                        step={8}
                        onValueChange={([value]) => setPadding({ ...padding, left: value })}
                      />
                      <div className="w-10 text-center">{padding.left}px</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div>
          <h3 className="text-sm font-medium mb-3">Section Preview</h3>
          {previewGrid()}
        </div>
        
        <div className="space-y-3 border-t pt-4">
          <div className="space-y-2">
            <Label htmlFor="section-name">Section Name *</Label>
            <Input
              id="section-name"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              placeholder="Enter a name for your section template"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="section-description">Description</Label>
            <Textarea
              id="section-description"
              value={sectionDescription}
              onChange={(e) => setSectionDescription(e.target.value)}
              placeholder="Describe what this section does..."
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="section-category">Category</Label>
            <Select value={sectionCategory} onValueChange={setSectionCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter(cat => cat !== 'all')
                  .map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button onClick={handleSaveSection} className="ml-auto">
          <Save className="h-4 w-4 mr-2" />
          Save Section Template
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GridSectionBuilder;
