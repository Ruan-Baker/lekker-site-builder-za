
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { AnimationType, useBuilder } from '@/contexts/BuilderContext';
import { 
  ArrowDownCircle, Play, Repeat, RotateCw, ZoomIn, 
  Layers, MoveHorizontal, MoveVertical, Plus, Trash 
} from 'lucide-react';
import ColorPicker from '@/components/design/ColorPicker';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';

interface InteractiveControlsProps {
  elementId: string;
}

const InteractiveControls: React.FC<InteractiveControlsProps> = ({ elementId }) => {
  const { elements, updateElement } = useBuilder();
  const element = elements.find(el => el.id === elementId);
  
  const [chainedActions, setChainedActions] = useState<any[]>([]);
  
  if (!element) return null;
  
  // Get interaction settings with defaults
  const interactions = element.properties.interactions || {};
  const hover = interactions.hover || {};
  const animations = interactions.animations || {};
  const onClick = interactions.onClick || {};
  
  const updateInteraction = (path: string, value: any) => {
    const [category, property] = path.split('.');
    
    const updatedInteractions = {
      ...interactions,
      [category]: {
        ...(interactions[category] || {}),
        [property]: value
      }
    };
    
    updateElement(elementId, {
      properties: {
        ...element.properties,
        interactions: updatedInteractions
      }
    });
  };

  // Update chained action
  const updateChainedAction = (index: number, field: string, value: any) => {
    const updatedActions = [...(onClick.chainedActions || [])];
    updatedActions[index] = {
      ...updatedActions[index],
      [field]: value
    };

    updateElement(elementId, {
      properties: {
        ...element.properties,
        interactions: {
          ...interactions,
          onClick: {
            ...onClick,
            chainedActions: updatedActions
          }
        }
      }
    });
  };
  
  // Add a new chained action
  const addChainedAction = () => {
    const updatedActions = [...(onClick.chainedActions || []), {
      targetElementId: '',
      action: 'toggle',
      delay: 0
    }];
    
    updateElement(elementId, {
      properties: {
        ...element.properties,
        interactions: {
          ...interactions,
          onClick: {
            ...onClick,
            chainedActions: updatedActions
          }
        }
      }
    });
  };
  
  // Remove a chained action
  const removeChainedAction = (index: number) => {
    const updatedActions = [...(onClick.chainedActions || [])];
    updatedActions.splice(index, 1);
    
    updateElement(elementId, {
      properties: {
        ...element.properties,
        interactions: {
          ...interactions,
          onClick: {
            ...onClick,
            chainedActions: updatedActions
          }
        }
      }
    });
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium mb-2">Interactive Settings</h3>
      
      <Tabs defaultValue="hover">
        <TabsList className="w-full">
          <TabsTrigger value="hover" className="flex-1">Hover</TabsTrigger>
          <TabsTrigger value="animations" className="flex-1">Animations</TabsTrigger>
          <TabsTrigger value="actions" className="flex-1">Actions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hover" className="space-y-4 pt-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-hover">Enable hover effects</Label>
              <Switch 
                id="enable-hover" 
                checked={hover.enabled || false}
                onCheckedChange={(checked) => updateInteraction('hover.enabled', checked)}
              />
            </div>
            
            {hover.enabled && (
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Effect type</Label>
                    <ToggleGroup type="single" value={hover.effectType || 'color'} onValueChange={(value) => {
                      if (value) updateInteraction('hover.effectType', value);
                    }}>
                      <ToggleGroupItem value="color" size="sm">Color</ToggleGroupItem>
                      <ToggleGroupItem value="scale" size="sm">Scale</ToggleGroupItem>
                      <ToggleGroupItem value="translateY" size="sm">Lift</ToggleGroupItem>
                      <ToggleGroupItem value="rotate" size="sm">Rotate</ToggleGroupItem>
                      <ToggleGroupItem value="shadow" size="sm">Shadow</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                
                  <div className="space-y-2">
                    <Label>Background color on hover</Label>
                    <ColorPicker 
                      color={hover.backgroundColor || 'transparent'} 
                      onChange={(color) => updateInteraction('hover.backgroundColor', color)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Text color on hover</Label>
                    <ColorPicker 
                      color={hover.textColor || ''} 
                      onChange={(color) => updateInteraction('hover.textColor', color)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Scale on hover</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[hover.scale || 1]}
                        min={0.8}
                        max={1.2}
                        step={0.01}
                        onValueChange={([value]) => updateInteraction('hover.scale', value)}
                      />
                      <span className="text-sm w-12 text-right">
                        {hover.scale || 1}x
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Lift effect (translateY)</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[hover.translateY || 0]}
                        min={-10}
                        max={10}
                        step={1}
                        onValueChange={([value]) => updateInteraction('hover.translateY', value)}
                      />
                      <span className="text-sm w-12 text-right">
                        {hover.translateY || 0}px
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Rotation on hover</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[hover.rotate || 0]}
                        min={-10}
                        max={10}
                        step={1}
                        onValueChange={([value]) => updateInteraction('hover.rotate', value)}
                      />
                      <span className="text-sm w-12 text-right">
                        {hover.rotate || 0}°
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Shadow intensity</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[hover.shadowIntensity || 0]}
                        min={0}
                        max={20}
                        step={1}
                        onValueChange={([value]) => {
                          updateInteraction('hover.shadowIntensity', value);
                          if (value > 0) {
                            updateInteraction('hover.shadow', `0 ${value}px ${value * 1.5}px rgba(0,0,0,0.1)`);
                          } else {
                            updateInteraction('hover.shadow', 'none');
                          }
                        }}
                      />
                      <span className="text-sm w-12 text-right">
                        {hover.shadowIntensity || 0}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Transition duration</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[hover.transitionDuration || 200]}
                        min={0}
                        max={1000}
                        step={10}
                        onValueChange={([value]) => updateInteraction('hover.transitionDuration', value)}
                      />
                      <span className="text-sm w-12 text-right">
                        {hover.transitionDuration || 200}ms
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="animations" className="space-y-4 pt-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-animations">Enable animations</Label>
              <Switch 
                id="enable-animations" 
                checked={animations.enabled || false}
                onCheckedChange={(checked) => updateInteraction('animations.enabled', checked)}
              />
            </div>
            
            {animations.enabled && (
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Animation type</Label>
                    <Select 
                      value={animations.type || 'fade'} 
                      onValueChange={(value) => updateInteraction('animations.type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select animation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fade">
                          <div className="flex items-center gap-2">
                            <Play className="h-4 w-4" /> Fade
                          </div>
                        </SelectItem>
                        <SelectItem value="slide">
                          <div className="flex items-center gap-2">
                            <MoveHorizontal className="h-4 w-4" /> Slide
                          </div>
                        </SelectItem>
                        <SelectItem value="scale">
                          <div className="flex items-center gap-2">
                            <ZoomIn className="h-4 w-4" /> Scale
                          </div>
                        </SelectItem>
                        <SelectItem value="bounce">
                          <div className="flex items-center gap-2">
                            <ArrowDownCircle className="h-4 w-4" /> Bounce
                          </div>
                        </SelectItem>
                        <SelectItem value="flip">
                          <div className="flex items-center gap-2">
                            <Layers className="h-4 w-4" /> Flip
                          </div>
                        </SelectItem>
                        <SelectItem value="rotate">
                          <div className="flex items-center gap-2">
                            <RotateCw className="h-4 w-4" /> Rotate
                          </div>
                        </SelectItem>
                        <SelectItem value="zoom">
                          <div className="flex items-center gap-2">
                            <ZoomIn className="h-4 w-4" /> Zoom
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Direction (for slide and flip)</Label>
                    <Select 
                      value={animations.direction || 'left'} 
                      onValueChange={(value) => updateInteraction('animations.direction', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select direction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left to Right</SelectItem>
                        <SelectItem value="right">Right to Left</SelectItem>
                        <SelectItem value="top">Top to Bottom</SelectItem>
                        <SelectItem value="bottom">Bottom to Top</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Animation trigger</Label>
                    <Select 
                      value={animations.trigger || 'onLoad'} 
                      onValueChange={(value) => updateInteraction('animations.trigger', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select trigger" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="onLoad">Page Load</SelectItem>
                        <SelectItem value="onScroll">On Scroll</SelectItem>
                        <SelectItem value="onClick">On Click</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Animation duration</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[animations.duration || 500]}
                        min={100}
                        max={2000}
                        step={100}
                        onValueChange={([value]) => updateInteraction('animations.duration', value)}
                      />
                      <span className="text-sm w-12 text-right">
                        {animations.duration || 500}ms
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Animation delay</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[animations.delay || 0]}
                        min={0}
                        max={2000}
                        step={100}
                        onValueChange={([value]) => updateInteraction('animations.delay', value)}
                      />
                      <span className="text-sm w-12 text-right">
                        {animations.delay || 0}ms
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Iteration count</Label>
                    <Select 
                      value={animations.iterationCount?.toString() || '1'} 
                      onValueChange={(value) => updateInteraction('animations.iterationCount', value === 'infinite' ? 'infinite' : parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Number of times" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 time</SelectItem>
                        <SelectItem value="2">2 times</SelectItem>
                        <SelectItem value="3">3 times</SelectItem>
                        <SelectItem value="infinite">
                          <div className="flex items-center gap-2">
                            <Repeat className="h-4 w-4" /> Infinite
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </ScrollArea>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="actions" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>On Click Action</Label>
            <Select 
              value={interactions.onClick?.action || 'none'} 
              onValueChange={(value) => updateInteraction('onClick.action', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="link">Navigate to URL</SelectItem>
                <SelectItem value="scroll">Scroll to section</SelectItem>
                <SelectItem value="toggle">Toggle element</SelectItem>
                <SelectItem value="chain">Chain multiple actions</SelectItem>
              </SelectContent>
            </Select>
            
            {interactions.onClick?.action === 'link' && (
              <div className="space-y-2 mt-2">
                <Label>URL</Label>
                <Input 
                  value={interactions.onClick?.url || ''} 
                  onChange={(e) => updateInteraction('onClick.url', e.target.value)}
                  placeholder="https://example.com"
                />
                <div className="flex items-center gap-2 mt-2">
                  <Switch 
                    id="new-tab" 
                    checked={interactions.onClick?.newTab || false}
                    onCheckedChange={(checked) => updateInteraction('onClick.newTab', checked)}
                  />
                  <Label htmlFor="new-tab">Open in new tab</Label>
                </div>
              </div>
            )}
            
            {interactions.onClick?.action === 'scroll' && (
              <div className="space-y-2 mt-2">
                <Label>Element ID</Label>
                <Input 
                  value={interactions.onClick?.targetId || ''} 
                  onChange={(e) => updateInteraction('onClick.targetId', e.target.value)}
                  placeholder="section-id"
                />
                <div className="flex items-center gap-2 mt-2">
                  <Switch 
                    id="smooth-scroll" 
                    checked={interactions.onClick?.smoothScroll !== false}
                    onCheckedChange={(checked) => updateInteraction('onClick.smoothScroll', checked)}
                  />
                  <Label htmlFor="smooth-scroll">Smooth scrolling</Label>
                </div>
              </div>
            )}
            
            {interactions.onClick?.action === 'toggle' && (
              <div className="space-y-2 mt-2">
                <Label>Target Element ID</Label>
                <Select
                  value={interactions.onClick?.targetElementId || ''}
                  onValueChange={(value) => updateInteraction('onClick.targetElementId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select element to toggle" />
                  </SelectTrigger>
                  <SelectContent>
                    {elements.map(el => (
                      <SelectItem key={el.id} value={el.id}>
                        {el.type} {el.id.split('-')[1]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Label className="mt-4">Toggle in Viewport</Label>
                <Select
                  value={interactions.onClick?.targetViewport || 'desktop'}
                  onValueChange={(value) => updateInteraction('onClick.targetViewport', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select viewport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desktop">Desktop</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {interactions.onClick?.action === 'chain' && (
              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Chained Actions</h4>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 px-2"
                    onClick={addChainedAction}
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Add Action
                  </Button>
                </div>
                
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-3">
                    {onClick.chainedActions?.map((action, index) => (
                      <Card key={index} className="relative border-dashed">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-6 w-6 absolute right-2 top-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => removeChainedAction(index)}
                        >
                          <Trash className="h-3.5 w-3.5" />
                        </Button>
                        <CardContent className="pt-4">
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label className="text-xs">Action Type</Label>
                                <Select 
                                  value={action.action || 'toggle'} 
                                  onValueChange={(value) => updateChainedAction(index, 'action', value)}
                                >
                                  <SelectTrigger className="h-8">
                                    <SelectValue placeholder="Action" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="toggle">Toggle Element</SelectItem>
                                    <SelectItem value="scroll">Scroll to Element</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="text-xs">Delay (ms)</Label>
                                <Input 
                                  type="number" 
                                  className="h-8" 
                                  value={action.delay || 0} 
                                  onChange={(e) => updateChainedAction(index, 'delay', parseInt(e.target.value))} 
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label className="text-xs">Target Element</Label>
                              <Select
                                value={action.targetElementId || ''}
                                onValueChange={(value) => updateChainedAction(index, 'targetElementId', value)}
                              >
                                <SelectTrigger className="h-8">
                                  <SelectValue placeholder="Select element" />
                                </SelectTrigger>
                                <SelectContent>
                                  {elements.map(el => (
                                    <SelectItem key={el.id} value={el.id}>
                                      {el.type} {el.id.split('-')[1]}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            {action.action === 'toggle' && (
                              <div>
                                <Label className="text-xs">Viewport</Label>
                                <Select
                                  value={action.targetViewport || 'desktop'}
                                  onValueChange={(value) => updateChainedAction(index, 'targetViewport', value)}
                                >
                                  <SelectTrigger className="h-8">
                                    <SelectValue placeholder="Select viewport" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="desktop">Desktop</SelectItem>
                                    <SelectItem value="tablet">Tablet</SelectItem>
                                    <SelectItem value="mobile">Mobile</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {(!onClick.chainedActions || onClick.chainedActions.length === 0) && (
                      <div className="text-center p-4 border border-dashed rounded-md text-sm text-gray-500">
                        No chained actions. Click "Add Action" to create one.
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InteractiveControls;
