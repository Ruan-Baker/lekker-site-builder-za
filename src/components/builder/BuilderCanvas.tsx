
import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useBuilder } from '@/contexts/BuilderContext';
import { useDesign } from '@/contexts/DesignContext';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Define viewport widths
const VIEWPORT_WIDTHS = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px'
};

const BuilderCanvas = () => {
  const { elements, addElement, selectElement, selectedElement, updateElement } = useBuilder();
  const { viewportSize, getResponsiveValue } = useDesign();
  const [showGrid, setShowGrid] = useState(true);
  const [showGuides, setShowGuides] = useState(true);
  
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'element',
    drop: (item: any, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(delta ? delta.x : 0);
      const top = Math.round(delta ? delta.y : 0);
      
      console.log('Item dropped:', item);
      
      // Add the element to our context
      addElement({
        type: item.id,
        properties: {
          content: `New ${item.name}`,
          responsive: {
            desktop: {},
            tablet: {},
            mobile: {}
          },
          interactions: {
            hover: {
              enabled: false
            },
            animations: {
              enabled: false
            }
          }
        },
        position: {
          x: left,
          y: top,
          width: 200,
          height: 100
        }
      });
      
      toast({
        title: "Element added",
        description: `Added a new ${item.name} element to your canvas`
      });
      
      return undefined;
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  
  // Function to handle element positioning with grid snapping
  const handleElementDrag = (id: string, position: { x: number; y: number }) => {
    // Grid size (e.g., 8px)
    const gridSize = showGrid ? 8 : 1;
    
    // Snap to grid
    const x = Math.round(position.x / gridSize) * gridSize;
    const y = Math.round(position.y / gridSize) * gridSize;
    
    updateElement(id, {
      position: {
        ...elements.find(el => el.id === id)?.position,
        x,
        y
      }
    });
  };
  
  // Generate the appropriate styles for interactive elements
  const getElementStyles = (element) => {
    const responsive = element.properties.responsive || {
      desktop: {}, tablet: {}, mobile: {}
    };
    
    const currentViewport = responsive[viewportSize] || {};
    
    // Get hover styles if they exist
    const hoverStyles = element.properties.interactions?.hover?.enabled 
      ? {
          backgroundColor: element.properties.interactions.hover.backgroundColor,
          color: element.properties.interactions.hover.textColor,
          transform: `scale(${element.properties.interactions.hover.scale || 1})`,
          transition: `all ${element.properties.interactions.hover.transitionDuration || 200}ms ease`
        }
      : {};
    
    // Start with base styles
    const styles = {
      position: 'absolute',
      left: `${element.position.x}px`,
      top: `${element.position.y}px`,
      width: currentViewport.width || `${element.position.width}px`,
      height: currentViewport.height || `${element.position.height}px`,
      margin: currentViewport.margin || '',
      padding: currentViewport.padding || '',
      fontSize: currentViewport.fontSize || '',
      textAlign: currentViewport.textAlign || 'left',
      display: currentViewport.isVisible === false ? 'none' : 'block',
    };
    
    return { styles, hoverStyles };
  };
  
  // Get the animation properties for an element
  const getAnimationProps = (element) => {
    const animations = element.properties.interactions?.animations;
    
    if (!animations?.enabled) {
      return {};
    }
    
    // Determine animation properties based on type
    switch (animations.type) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { 
            duration: (animations.duration || 500) / 1000,
            delay: (animations.delay || 0) / 1000
          }
        };
      case 'slide':
        return {
          initial: { x: -20, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          transition: { 
            duration: (animations.duration || 500) / 1000,
            delay: (animations.delay || 0) / 1000
          }
        };
      case 'scale':
        return {
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { 
            duration: (animations.duration || 500) / 1000,
            delay: (animations.delay || 0) / 1000
          }
        };
      case 'bounce':
        return {
          initial: { y: -20, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { 
            type: 'spring',
            stiffness: 300,
            damping: 10,
            delay: (animations.delay || 0) / 1000
          }
        };
      default:
        return {};
    }
  };
  
  return (
    <div className="flex-1 overflow-y-auto relative">
      <div className="pb-4 pt-2 px-4 bg-white border-b border-lekker-border-gray flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="grid" 
              checked={showGrid}
              onCheckedChange={(value) => setShowGrid(!!value)}
            />
            <Label htmlFor="grid" className="text-sm">Show Grid</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="guides" 
              checked={showGuides}
              onCheckedChange={(value) => setShowGuides(!!value)}
            />
            <Label htmlFor="guides" className="text-sm">Show Guides</Label>
          </div>
        </div>
        <div className="text-sm text-lekker-gray">Width: {VIEWPORT_WIDTHS[viewportSize]}</div>
      </div>
      
      <div className="px-4 py-8 overflow-auto min-h-[calc(100vh-8rem)]">
        <div 
          ref={drop}
          className={`mx-auto bg-white rounded-lg shadow-softer transition-all p-6 ${isOver ? 'ring-2 ring-blue-600/50' : ''}`}
          style={{
            width: VIEWPORT_WIDTHS[viewportSize],
            maxWidth: '100%',
            minHeight: '500px',
            position: 'relative',
            backgroundSize: showGrid ? '8px 8px' : 'auto',
            backgroundImage: showGrid ? 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)' : 'none'
          }}
        >
          {elements.length === 0 ? (
            <div className="h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 p-12 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Plus className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">Your canvas is empty</h3>
              <p className="text-sm mb-4 max-w-md">Drag sections or elements from the sidebar to start building your website</p>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <AnimatePresence>
                {elements.map((element) => {
                  const { styles, hoverStyles } = getElementStyles(element);
                  const animationProps = getAnimationProps(element);
                  
                  // Check if element should be visible in current viewport
                  const isVisible = element.properties.responsive?.[viewportSize]?.isVisible !== false;
                  
                  if (!isVisible) return null;
                  
                  return (
                    <motion.div
                      key={element.id}
                      initial={animationProps.initial}
                      animate={animationProps.animate}
                      transition={animationProps.transition}
                      className={`absolute p-4 cursor-pointer ${
                        selectedElement === element.id 
                          ? 'border-blue-500 ring-2 ring-blue-500/20' 
                          : 'border border-gray-200 hover:border-gray-300'
                      } rounded-md bg-white`}
                      style={styles}
                      onClick={() => selectElement(element.id)}
                      whileHover={hoverStyles}
                      drag
                      dragMomentum={false}
                      onDragEnd={(event, info) => {
                        handleElementDrag(element.id, {
                          x: element.position.x + info.offset.x,
                          y: element.position.y + info.offset.y
                        });
                      }}
                    >
                      <div className="text-sm font-medium">
                        {element.properties.content} ({element.type})
                      </div>
                      
                      {element.properties.interactions?.onClick?.action === 'link' && (
                        <div className="absolute top-0 right-0 bg-blue-100 text-blue-700 text-xs px-1 rounded-bl">
                          Link
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              
              {showGuides && selectedElement && elements.find(el => el.id === selectedElement) && (
                <>
                  {/* Horizontal guide */}
                  <div 
                    className="absolute left-0 right-0 border-t border-blue-500 pointer-events-none"
                    style={{ 
                      top: elements.find(el => el.id === selectedElement)?.position.y,
                      zIndex: 1000
                    }}
                  />
                  {/* Vertical guide */}
                  <div 
                    className="absolute top-0 bottom-0 border-l border-blue-500 pointer-events-none"
                    style={{ 
                      left: elements.find(el => el.id === selectedElement)?.position.x,
                      zIndex: 1000
                    }}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuilderCanvas;
