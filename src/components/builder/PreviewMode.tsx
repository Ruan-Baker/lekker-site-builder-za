
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Laptop, Smartphone, Tablet, X, RotateCcw, RotateCw, 
  ZoomIn, ZoomOut, Maximize, Plus, Minus, ScreenShare, 
  ChevronRight, ChevronLeft, ArrowUpDown
} from 'lucide-react';
import { useDesign } from '@/contexts/DesignContext';
import { useBuilder } from '@/contexts/BuilderContext';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface PreviewModeProps {
  open: boolean;
  onClose: () => void;
  pageId: string;
}

interface DevicePreset {
  name: string;
  width: number;
  height: number;
  type: 'desktop' | 'tablet' | 'mobile';
}

const DEVICE_PRESETS: DevicePreset[] = [
  { name: 'Small Mobile (iPhone SE)', width: 375, height: 667, type: 'mobile' },
  { name: 'Standard Mobile', width: 390, height: 844, type: 'mobile' },
  { name: 'Large Mobile', width: 428, height: 926, type: 'mobile' },
  { name: 'Small Tablet', width: 768, height: 1024, type: 'tablet' },
  { name: 'Standard Tablet', width: 820, height: 1180, type: 'tablet' },
  { name: 'Large Tablet', width: 1024, height: 1366, type: 'tablet' },
  { name: 'Small Desktop', width: 1280, height: 800, type: 'desktop' },
  { name: 'Medium Desktop', width: 1366, height: 768, type: 'desktop' },
  { name: 'Large Desktop', width: 1920, height: 1080, type: 'desktop' },
];

const PreviewMode: React.FC<PreviewModeProps> = ({ open, onClose, pageId }) => {
  const { elements, executeElementAction } = useBuilder();
  const { viewportSize, setViewportSize } = useDesign();
  const isMobile = useIsMobile();
  
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [customWidth, setCustomWidth] = useState<number>(0);
  const [customHeight, setCustomHeight] = useState<number>(0);
  const [deviceRotated, setDeviceRotated] = useState<boolean>(false);
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showBreakpoints, setShowBreakpoints] = useState<boolean>(true);
  
  const getViewportWidth = () => {
    if (customWidth) return customWidth;
    
    const preset = DEVICE_PRESETS[selectedPreset];
    return deviceRotated ? preset.height : preset.width;
  };
  
  const getViewportHeight = () => {
    if (customHeight) return customHeight;
    
    const preset = DEVICE_PRESETS[selectedPreset];
    return deviceRotated ? preset.width : preset.height;
  };
  
  // Generate a temporary preview URL based on the current elements
  useEffect(() => {
    if (!open || !pageId) return;
    
    // In a real implementation, this would create a temporary preview URL
    setPreviewUrl(`/preview/${pageId}?timestamp=${Date.now()}`);
    
    // Use the first device preset by default
    setSelectedPreset(0);
    setDeviceRotated(false);
    setZoomLevel(100);
    setCustomWidth(0);
    setCustomHeight(0);
  }, [open, pageId]);
  
  const handleDeviceRotation = () => {
    setDeviceRotated(!deviceRotated);
  };
  
  const handlePresetsChange = (index: number) => {
    setSelectedPreset(index);
    setCustomWidth(0);
    setCustomHeight(0);
    setViewportSize(DEVICE_PRESETS[index].type);
  };
  
  const handleCustomSizeChange = (width: number, height: number) => {
    setCustomWidth(width);
    setCustomHeight(height);
    
    // Determine viewport size based on width
    if (width < 768) {
      setViewportSize('mobile');
    } else if (width < 1024) {
      setViewportSize('tablet');
    } else {
      setViewportSize('desktop');
    }
  };
  
  const handleZoomChange = (newZoom: number) => {
    setZoomLevel(newZoom);
  };

  const handleElementClick = (elementId: string) => {
    const element = elements.find(el => el.id === elementId);
    if (element?.properties.interactions?.onClick?.action) {
      executeElementAction(elementId, element.properties.interactions.onClick.action);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) onClose();
    }}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-[1400px] p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b flex flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <DialogTitle>Preview Mode</DialogTitle>
            <div className="text-sm text-gray-500">
              {getViewportWidth()}×{getViewportHeight()}px
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <ScreenShare className="h-4 w-4" /> 
                  <span>Device</span>
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" side="bottom" align="end">
                <div className="p-2 border-b">
                  <h4 className="font-medium text-sm">Device Presets</h4>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {DEVICE_PRESETS.map((device, index) => (
                    <div 
                      key={device.name}
                      className={`px-3 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-50 ${
                        selectedPreset === index && !customWidth ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => handlePresetsChange(index)}
                    >
                      <div className="flex items-center gap-2">
                        {device.type === 'desktop' && <Laptop className="h-4 w-4" />}
                        {device.type === 'tablet' && <Tablet className="h-4 w-4" />}
                        {device.type === 'mobile' && <Smartphone className="h-4 w-4" />}
                        <span className="text-sm">{device.name}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {device.width}×{device.height}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t">
                  <h4 className="font-medium text-sm mb-2">Custom Size</h4>
                  <div className="flex gap-2 items-center">
                    <Input 
                      type="number" 
                      placeholder="Width" 
                      className="h-8"
                      value={customWidth || ''}
                      onChange={(e) => handleCustomSizeChange(parseInt(e.target.value) || 0, customHeight)}
                    />
                    <ArrowUpDown className="h-3 w-3" />
                    <Input 
                      type="number" 
                      placeholder="Height" 
                      className="h-8"
                      value={customHeight || ''}
                      onChange={(e) => handleCustomSizeChange(customWidth, parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <div className="flex items-center gap-1 border border-gray-200 rounded-md p-0.5 bg-white">
              <Button 
                variant="ghost" 
                size="icon"
                className={`h-7 w-7 ${viewportSize === 'desktop' ? 'bg-blue-100 text-blue-600' : ''}`}
                onClick={() => setViewportSize('desktop')}
              >
                <Laptop className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                className={`h-7 w-7 ${viewportSize === 'tablet' ? 'bg-blue-100 text-blue-600' : ''}`}
                onClick={() => setViewportSize('tablet')}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                className={`h-7 w-7 ${viewportSize === 'mobile' ? 'bg-blue-100 text-blue-600' : ''}`}
                onClick={() => setViewportSize('mobile')}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8"
              onClick={handleDeviceRotation}
              title="Rotate device"
            >
              {deviceRotated ? (
                <RotateCcw className="h-4 w-4" />
              ) : (
                <RotateCw className="h-4 w-4" />
              )}
            </Button>
            
            <div className="flex items-center gap-1 border border-gray-200 rounded-md px-2 py-1 bg-white">
              <Button 
                variant="ghost" 
                size="icon"
                className="h-6 w-6"
                onClick={() => handleZoomChange(Math.max(25, zoomLevel - 25))}
                disabled={zoomLevel <= 25}
              >
                <Minus className="h-3 w-3" />
              </Button>
              
              <span className="text-xs w-10 text-center">{zoomLevel}%</span>
              
              <Button 
                variant="ghost" 
                size="icon"
                className="h-6 w-6"
                onClick={() => handleZoomChange(Math.min(200, zoomLevel + 25))}
                disabled={zoomLevel >= 200}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className={`
          flex justify-center items-start 
          overflow-auto h-[75vh] p-8 bg-gray-100
          ${showBreakpoints ? 'bg-gradient-to-r from-transparent via-gray-200/50' : ''}
        `}
        style={{
          backgroundSize: showBreakpoints ? '100% 1px' : 'auto',
          backgroundPosition: showBreakpoints ? `0 0, 
            ${getViewportWidth() * zoomLevel / 100}px 0, 
            ${isMobile ? '768px' : '768px'} 0, 
            ${isMobile ? '1024px' : '1024px'} 0` : 'auto'
        }}
        >
          <div 
            className="bg-white overflow-hidden shadow-md transition-all border border-gray-300"
            style={{
              width: `${getViewportWidth() * zoomLevel / 100}px`,
              height: `${getViewportHeight() * zoomLevel / 100}px`,
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center'
            }}
          >
            {/* Device frame */}
            <div className="relative" style={{ minHeight: '100%', overflow: 'auto' }}>
              {elements.map((element) => {
                // Apply responsive styles based on viewport
                const responsive = element.properties.responsive || {
                  desktop: {}, tablet: {}, mobile: {}
                };
                
                const currentViewport = responsive[viewportSize] || {};
                const isVisible = currentViewport.isVisible !== false;
                
                if (!isVisible) return null;
                
                // Get grid styles
                const gridStyles = {};
                if (currentViewport.grid?.enabled) {
                  const grid = currentViewport.grid;
                  gridStyles.display = 'grid';
                  gridStyles.gridTemplateColumns = `repeat(${grid.columns || 12}, 1fr)`;
                  gridStyles.gridTemplateRows = grid.rows > 1 ? `repeat(${grid.rows || 1}, 1fr)` : undefined;
                  gridStyles.gap = grid.gap ? `${grid.gap}px` : undefined;
                  gridStyles.gridAutoFlow = grid.autoFlow || 'row';
                  gridStyles.justifyItems = grid.justifyItems || 'stretch';
                  gridStyles.alignItems = grid.alignItems || 'stretch';
                  gridStyles.placeContent = grid.placeContent || undefined;
                }
                
                const styles = {
                  position: 'absolute' as const,
                  left: `${element.position.x}px`,
                  top: `${element.position.y}px`,
                  width: currentViewport.width || `${element.position.width}px`,
                  height: currentViewport.height || `${element.position.height}px`,
                  margin: currentViewport.margin || '',
                  padding: currentViewport.padding || '',
                  fontSize: currentViewport.fontSize || '',
                  textAlign: currentViewport.textAlign || 'left',
                  display: currentViewport.display || 'block',
                  flexDirection: currentViewport.flexDirection || undefined,
                  justifyContent: currentViewport.justifyContent || undefined,
                  alignItems: currentViewport.alignItems || undefined,
                  order: currentViewport.order || undefined,
                  zIndex: currentViewport.zIndex || undefined,
                  minWidth: currentViewport.minWidth || undefined,
                  maxWidth: currentViewport.maxWidth || undefined,
                  minHeight: currentViewport.minHeight || undefined,
                  maxHeight: currentViewport.maxHeight || undefined,
                  gridColumnStart: currentViewport.grid?.columnStart || undefined,
                  gridColumnEnd: currentViewport.grid?.columnEnd || undefined,
                  gridRowStart: currentViewport.grid?.rowStart || undefined,
                  gridRowEnd: currentViewport.grid?.rowEnd || undefined,
                  ...gridStyles
                };
                
                // Get animation settings
                const animations = element.properties.interactions?.animations;
                let animationProps = {};
                
                if (animations?.enabled && animations.trigger === 'onLoad') {
                  switch (animations.type) {
                    case 'fade':
                      animationProps = {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        transition: { 
                          duration: (animations.duration || 500) / 1000,
                          delay: (animations.delay || 0) / 1000
                        }
                      };
                      break;
                    case 'slide':
                      const direction = animations.direction || 'left';
                      const initialProps = direction === 'left' ? { x: -20 } : 
                                          direction === 'right' ? { x: 20 } : 
                                          direction === 'top' ? { y: -20 } : { y: 20 };
                      
                      animationProps = {
                        initial: { ...initialProps, opacity: 0 },
                        animate: { x: 0, y: 0, opacity: 1 },
                        transition: { 
                          duration: (animations.duration || 500) / 1000,
                          delay: (animations.delay || 0) / 1000
                        }
                      };
                      break;
                    // Add more animation types as needed
                  }
                }
                
                return (
                  <motion.div
                    key={element.id}
                    className={`absolute p-4 rounded-md bg-white border border-gray-200`}
                    style={styles}
                    onClick={() => handleElementClick(element.id)}
                    {...animationProps}
                  >
                    {element.properties.content}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
        
        <DialogFooter className="p-4 border-t">
          <div className="flex items-center gap-2 mr-auto">
            <Button 
              variant="outline" 
              size="sm"
              className="gap-1"
              onClick={() => setShowBreakpoints(!showBreakpoints)}
            >
              {showBreakpoints ? "Hide Breakpoints" : "Show Breakpoints"}
            </Button>
          </div>
          <Button onClick={onClose}>
            Close Preview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewMode;
