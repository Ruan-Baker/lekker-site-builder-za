
import React, { useEffect, useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useBuilder } from '@/contexts/BuilderContext';
import { useDesign } from '@/contexts/DesignContext';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const VIEWPORT_WIDTHS = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px'
};

const GRID_SIZE = 8;
const ALIGNMENT_THRESHOLD = 10;
const SPACING_GUIDES = [8, 16, 24, 32];

const BuilderCanvas = () => {
  const { elements, addElement, selectElement, selectedElement, updateElement, executeElementAction } = useBuilder();
  const { viewportSize, getResponsiveValue } = useDesign();
  const [showGrid, setShowGrid] = useState(true);
  const [showGuides, setShowGuides] = useState(true);
  const [alignmentGuides, setAlignmentGuides] = useState({ horizontal: null, vertical: null });
  const [spacingGuides, setSpacingGuides] = useState([]);
  const canvasRef = useRef(null);
  
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'element',
    drop: (item: any, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const canvasBounds = canvasRef.current?.getBoundingClientRect();
      
      let left = Math.round(delta ? delta.x : 0);
      let top = Math.round(delta ? delta.y : 0);
      
      if (canvasBounds) {
        const dropPosition = monitor.getClientOffset();
        left = dropPosition.x - canvasBounds.left;
        top = dropPosition.y - canvasBounds.top;
      }
      
      if (showGrid) {
        left = Math.round(left / GRID_SIZE) * GRID_SIZE;
        top = Math.round(top / GRID_SIZE) * GRID_SIZE;
      }
      
      console.log('Item dropped at position:', { left, top });
      
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
  
  const findAlignmentGuides = (draggedId, dragPosition) => {
    if (!showGuides) return { horizontal: null, vertical: null };
    
    const guides = { horizontal: null, vertical: null };
    const draggedElement = elements.find(el => el.id === draggedId);
    
    if (!draggedElement) return guides;
    
    const draggedCenterX = dragPosition.x + (draggedElement.position.width / 2);
    const draggedCenterY = dragPosition.y + (draggedElement.position.height / 2);
    
    const draggedRight = dragPosition.x + draggedElement.position.width;
    const draggedBottom = dragPosition.y + draggedElement.position.height;
    
    elements.forEach(element => {
      if (element.id === draggedId) return;
      
      const centerX = element.position.x + (element.position.width / 2);
      const centerY = element.position.y + (element.position.height / 2);
      const right = element.position.x + element.position.width;
      const bottom = element.position.y + element.position.height;
      
      if (Math.abs(dragPosition.x - element.position.x) < ALIGNMENT_THRESHOLD) {
        guides.horizontal = { position: element.position.x, type: 'left' };
      } else if (Math.abs(draggedCenterX - centerX) < ALIGNMENT_THRESHOLD) {
        guides.horizontal = { position: centerX - (draggedElement.position.width / 2), type: 'center' };
      } else if (Math.abs(draggedRight - right) < ALIGNMENT_THRESHOLD) {
        guides.horizontal = { position: right - draggedElement.position.width, type: 'right' };
      }
      
      if (Math.abs(dragPosition.y - element.position.y) < ALIGNMENT_THRESHOLD) {
        guides.vertical = { position: element.position.y, type: 'top' };
      } else if (Math.abs(draggedCenterY - centerY) < ALIGNMENT_THRESHOLD) {
        guides.vertical = { position: centerY - (draggedElement.position.height / 2), type: 'center' };
      } else if (Math.abs(draggedBottom - bottom) < ALIGNMENT_THRESHOLD) {
        guides.vertical = { position: bottom - draggedElement.position.height, type: 'bottom' };
      }
    });
    
    return guides;
  };
  
  const findSpacingGuides = (draggedId, dragPosition) => {
    if (!showGuides) return [];
    
    const guides = [];
    const draggedElement = elements.find(el => el.id === draggedId);
    
    if (!draggedElement) return guides;
    
    const draggedRight = dragPosition.x + draggedElement.position.width;
    const draggedBottom = dragPosition.y + draggedElement.position.height;
    
    elements.forEach(element => {
      if (element.id === draggedId) return;
      
      const right = element.position.x + element.position.width;
      const bottom = element.position.y + element.position.height;
      
      const horizontalSpacing = dragPosition.x - right;
      if (horizontalSpacing > 0 && horizontalSpacing < 100) {
        SPACING_GUIDES.forEach(space => {
          if (Math.abs(horizontalSpacing - space) < ALIGNMENT_THRESHOLD) {
            guides.push({
              type: 'horizontal',
              start: { x: right, y: Math.max(element.position.y, dragPosition.y) + 10 },
              end: { x: dragPosition.x, y: Math.max(element.position.y, dragPosition.y) + 10 },
              value: space
            });
          }
        });
      }
      
      const verticalSpacing = dragPosition.y - bottom;
      if (verticalSpacing > 0 && verticalSpacing < 100) {
        SPACING_GUIDES.forEach(space => {
          if (Math.abs(verticalSpacing - space) < ALIGNMENT_THRESHOLD) {
            guides.push({
              type: 'vertical',
              start: { x: Math.max(element.position.x, dragPosition.x) + 10, y: bottom },
              end: { x: Math.max(element.position.x, dragPosition.x) + 10, y: dragPosition.y },
              value: space
            });
          }
        });
      }
    });
    
    return guides;
  };
  
  const handleElementDrag = (id: string, position: { x: number; y: number }) => {
    const elementIndex = elements.findIndex(el => el.id === id);
    if (elementIndex === -1) return;
    
    const element = elements[elementIndex];
    
    let x = position.x;
    let y = position.y;
    
    if (showGrid) {
      x = Math.round(x / GRID_SIZE) * GRID_SIZE;
      y = Math.round(y / GRID_SIZE) * GRID_SIZE;
    }
    
    const guides = findAlignmentGuides(id, { x, y });
    setAlignmentGuides(guides);
    
    if (guides.horizontal) {
      x = guides.horizontal.position;
    }
    
    if (guides.vertical) {
      y = guides.vertical.position;
    }
    
    const spacing = findSpacingGuides(id, { x, y });
    setSpacingGuides(spacing);
    
    spacing.forEach(guide => {
      if (guide.type === 'horizontal' && Math.abs(guide.end.x - guide.start.x - guide.value) < ALIGNMENT_THRESHOLD) {
        x = guide.start.x + guide.value;
      }
      
      if (guide.type === 'vertical' && Math.abs(guide.end.y - guide.start.y - guide.value) < ALIGNMENT_THRESHOLD) {
        y = guide.start.y + guide.value;
      }
    });
    
    updateElement(id, {
      position: {
        ...elements[elementIndex].position,
        x,
        y
      }
    });
  };
  
  const handleDragEnd = () => {
    setAlignmentGuides({ horizontal: null, vertical: null });
    setSpacingGuides([]);
  };
  
  const getElementStyles = (element) => {
    const responsive = element.properties.responsive || {
      desktop: {}, tablet: {}, mobile: {}
    };
    
    const currentViewport = responsive[viewportSize] || {};
    
    const hoverStyles = element.properties.interactions?.hover?.enabled 
      ? {
          backgroundColor: element.properties.interactions.hover.backgroundColor,
          color: element.properties.interactions.hover.textColor,
          scale: element.properties.interactions.hover.scale || 1,
          translateY: element.properties.interactions.hover.translateY ? `${element.properties.interactions.hover.translateY}px` : undefined,
          rotate: element.properties.interactions.hover.rotate ? element.properties.interactions.hover.rotate : undefined,
          boxShadow: element.properties.interactions.hover.shadow,
          transition: { duration: (element.properties.interactions.hover.transitionDuration || 200) / 1000 }
        }
      : {};
    
    // Basic styles
    const elementWidth = currentViewport.width || `${element.position.width}px`;
    const elementHeight = currentViewport.height || `${element.position.height}px`;
    
    // Grid styles
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
    
    // Combine all styles
    const styles = {
      position: 'absolute' as const,
      left: `${element.position.x}px`,
      top: `${element.position.y}px`,
      width: elementWidth,
      height: elementHeight,
      margin: currentViewport.margin || '',
      padding: currentViewport.padding || '',
      fontSize: currentViewport.fontSize || '',
      textAlign: currentViewport.textAlign || 'left',
      display: currentViewport.isVisible === false ? 'none' : (currentViewport.display || 'block'),
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
    
    return { styles, hoverStyles };
  };
  
  const getAnimationProps = (element) => {
    const animations = element.properties.interactions?.animations;
    
    if (!animations?.enabled) {
      return {};
    }
    
    const getAnimationDirection = () => {
      if (!animations.direction) return { x: -20 };
      
      switch(animations.direction) {
        case 'left': return { x: -20 };
        case 'right': return { x: 20 };
        case 'top': return { y: -20 };
        case 'bottom': return { y: 20 };
        default: return { x: -20 };
      }
    };
    
    const direction = getAnimationDirection();
    
    switch (animations.type) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { 
            duration: (animations.duration || 500) / 1000,
            delay: (animations.delay || 0) / 1000,
            repeat: animations.iterationCount === 'infinite' ? Infinity : (parseInt(animations.iterationCount) - 1) || 0
          }
        };
      case 'slide':
        return {
          initial: { ...direction, opacity: 0 },
          animate: { x: 0, y: 0, opacity: 1 },
          transition: { 
            duration: (animations.duration || 500) / 1000,
            delay: (animations.delay || 0) / 1000,
            repeat: animations.iterationCount === 'infinite' ? Infinity : (parseInt(animations.iterationCount) - 1) || 0
          }
        };
      case 'scale':
        return {
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { 
            duration: (animations.duration || 500) / 1000,
            delay: (animations.delay || 0) / 1000,
            repeat: animations.iterationCount === 'infinite' ? Infinity : (parseInt(animations.iterationCount) - 1) || 0
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
            delay: (animations.delay || 0) / 1000,
            repeat: animations.iterationCount === 'infinite' ? Infinity : (parseInt(animations.iterationCount) - 1) || 0
          }
        };
      case 'flip':
        return {
          initial: { rotateX: 90, opacity: 0 },
          animate: { rotateX: 0, opacity: 1 },
          transition: { 
            duration: (animations.duration || 500) / 1000,
            delay: (animations.delay || 0) / 1000,
            repeat: animations.iterationCount === 'infinite' ? Infinity : (parseInt(animations.iterationCount) - 1) || 0
          }
        };
      case 'rotate':
        return {
          initial: { rotate: -90, opacity: 0 },
          animate: { rotate: 0, opacity: 1 },
          transition: { 
            duration: (animations.duration || 500) / 1000,
            delay: (animations.delay || 0) / 1000,
            repeat: animations.iterationCount === 'infinite' ? Infinity : (parseInt(animations.iterationCount) - 1) || 0
          }
        };
      case 'zoom':
        return {
          initial: { scale: 1.5, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { 
            duration: (animations.duration || 500) / 1000,
            delay: (animations.delay || 0) / 1000,
            repeat: animations.iterationCount === 'infinite' ? Infinity : (parseInt(animations.iterationCount) - 1) || 0
          }
        };
      default:
        return {};
    }
  };
  
  const handleElementClick = (elementId: string) => {
    selectElement(elementId);
    
    const element = elements.find(el => el.id === elementId);
    if (element?.properties.interactions?.onClick?.action) {
      executeElementAction(elementId, element.properties.interactions.onClick.action);
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
          ref={(node) => {
            drop(node);
            canvasRef.current = node;
          }}
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
              {showGuides && alignmentGuides.horizontal && (
                <div 
                  className="absolute left-0 right-0 border-t border-blue-500 pointer-events-none"
                  style={{ 
                    top: alignmentGuides.horizontal.position,
                    zIndex: 1000
                  }}
                />
              )}
              
              {showGuides && alignmentGuides.vertical && (
                <div 
                  className="absolute top-0 bottom-0 border-l border-blue-500 pointer-events-none"
                  style={{ 
                    left: alignmentGuides.vertical.position,
                    zIndex: 1000
                  }}
                />
              )}
              
              {showGuides && spacingGuides.map((guide, index) => (
                guide.type === 'horizontal' ? (
                  <div key={`spacing-${index}`} className="absolute pointer-events-none" style={{ zIndex: 1000 }}>
                    <div className="border-t border-dashed border-blue-400" style={{ 
                      position: 'absolute',
                      left: guide.start.x,
                      top: guide.start.y,
                      width: guide.end.x - guide.start.x
                    }}></div>
                    <div className="bg-blue-400 text-white text-xs px-1 rounded" style={{
                      position: 'absolute',
                      left: (guide.start.x + guide.end.x) / 2 - 8,
                      top: guide.start.y - 16
                    }}>
                      {guide.value}px
                    </div>
                  </div>
                ) : (
                  <div key={`spacing-${index}`} className="absolute pointer-events-none" style={{ zIndex: 1000 }}>
                    <div className="border-l border-dashed border-blue-400" style={{ 
                      position: 'absolute',
                      left: guide.start.x,
                      top: guide.start.y,
                      height: guide.end.y - guide.start.y
                    }}></div>
                    <div className="bg-blue-400 text-white text-xs px-1 rounded" style={{
                      position: 'absolute',
                      left: guide.start.x + 4,
                      top: (guide.start.y + guide.end.y) / 2 - 8
                    }}>
                      {guide.value}px
                    </div>
                  </div>
                )
              ))}
              
              <AnimatePresence>
                {elements.map((element) => {
                  const { styles, hoverStyles } = getElementStyles(element);
                  const animationProps = getAnimationProps(element);
                  
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
                      onClick={() => handleElementClick(element.id)}
                      whileHover={hoverStyles}
                      drag
                      dragMomentum={false}
                      dragElastic={0}
                      onDragStart={() => {
                        selectElement(element.id);
                      }}
                      onDragEnd={(event, info) => {
                        handleElementDrag(element.id, {
                          x: element.position.x + info.offset.x,
                          y: element.position.y + info.offset.y
                        });
                        handleDragEnd();
                      }}
                      onDrag={(event, info) => {
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
                      
                      {selectedElement === element.id && (
                        <div className="absolute -bottom-5 -left-1 text-xs bg-gray-900 text-white px-1 py-0.5 rounded opacity-75">
                          {element.position.x}, {element.position.y}
                        </div>
                      )}
                      
                      {selectedElement === element.id && (
                        <>
                          <div className="absolute top-0 left-0 w-2 h-2 bg-blue-500 rounded-full -translate-x-1 -translate-y-1" />
                          <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full translate-x-1 -translate-y-1" />
                          <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-500 rounded-full -translate-x-1 translate-y-1" />
                          <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-500 rounded-full translate-x-1 translate-y-1" />
                        </>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              
              {showGuides && selectedElement && elements.find(el => el.id === selectedElement) && (
                <>
                  <div 
                    className="absolute left-0 right-0 border-t border-blue-500 pointer-events-none"
                    style={{ 
                      top: elements.find(el => el.id === selectedElement)?.position.y,
                      zIndex: 1000
                    }}
                  />
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
