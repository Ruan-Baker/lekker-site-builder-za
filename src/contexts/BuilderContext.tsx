
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Json } from '@/integrations/supabase/types';

// Element type definitions
export interface ElementPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ElementData {
  id: string;
  type: string;
  properties: Record<string, any>;
  position: ElementPosition;
}

export type AnimationType = 'fade' | 'slide' | 'scale' | 'bounce' | 'flip' | 'rotate' | 'zoom';
export type InteractionAction = 'link' | 'scroll' | 'toggle' | 'chain' | 'none';
export type HoverEffect = 'color' | 'scale' | 'rotate' | 'shadow' | 'translateY';

// Context type definition
interface BuilderContextType {
  elements: ElementData[];
  selectedElement: string | null;
  addElement: (element: Omit<ElementData, 'id'>) => void;
  updateElement: (id: string, data: Partial<ElementData>) => void;
  deleteElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  saveElements: (pageId: string) => Promise<void>;
  loadElements: (pageId: string) => Promise<void>;
  isLoading: boolean;
  setElements: (elements: ElementData[]) => void;
  duplicateElement: (id: string) => void;
  toggleElementVisibility: (id: string, viewport: string, visible: boolean) => void;
  getInteractiveStyles: (element: ElementData) => Record<string, any>;
  executeElementAction: (elementId: string, action: string) => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [elements, setElements] = useState<ElementData[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();

  // Add a new element to the canvas
  const addElement = (element: Omit<ElementData, 'id'>) => {
    const id = `${element.type}-${Date.now()}`;
    setElements((prev) => [...prev, { ...element, id }]);
  };

  // Update an existing element
  const updateElement = (id: string, data: Partial<ElementData>) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...data } : el))
    );
  };

  // Delete an element
  const deleteElement = (id: string) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };
  
  // Duplicate an element
  const duplicateElement = (id: string) => {
    const elementToDuplicate = elements.find(el => el.id === id);
    if (!elementToDuplicate) return;
    
    const newElement = {
      ...elementToDuplicate,
      id: `${elementToDuplicate.type}-${Date.now()}`,
      position: {
        ...elementToDuplicate.position,
        x: elementToDuplicate.position.x + 20,
        y: elementToDuplicate.position.y + 20
      }
    };
    
    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement.id);
    
    toast({
      title: 'Element duplicated',
      description: `Duplicated ${elementToDuplicate.type} element`
    });
  };

  // Select an element
  const selectElement = (id: string | null) => {
    setSelectedElement(id);
  };
  
  // Toggle element visibility for specific viewport
  const toggleElementVisibility = (id: string, viewport: string, visible: boolean) => {
    const element = elements.find(el => el.id === id);
    if (!element) return;
    
    updateElement(id, {
      properties: {
        ...element.properties,
        responsive: {
          ...(element.properties.responsive || {}),
          [viewport]: {
            ...(element.properties.responsive?.[viewport] || {}),
            isVisible: visible
          }
        }
      }
    });
  };
  
  // Get computed interactive styles for an element
  const getInteractiveStyles = (element: ElementData) => {
    const interactions = element.properties.interactions || {};
    const styles: Record<string, any> = {};
    
    // Process hover effects
    if (interactions.hover?.enabled) {
      styles.hover = {
        backgroundColor: interactions.hover.backgroundColor || undefined,
        color: interactions.hover.textColor || undefined,
        transform: interactions.hover.scale ? `scale(${interactions.hover.scale})` : undefined,
        boxShadow: interactions.hover.shadow || undefined,
        transition: `all ${(interactions.hover.transitionDuration || 200) / 1000}s`
      };
    }
    
    // Process animation effects
    if (interactions.animations?.enabled) {
      styles.animation = {
        type: interactions.animations.type || 'fade',
        duration: interactions.animations.duration || 500,
        delay: interactions.animations.delay || 0,
        iterationCount: interactions.animations.iterationCount || 1,
        direction: interactions.animations.direction || 'normal'
      };
    }
    
    return styles;
  };
  
  // Execute an action for an element
  const executeElementAction = (elementId: string, action: string) => {
    const element = elements.find(el => el.id === elementId);
    if (!element) return;
    
    const interactions = element.properties.interactions || {};
    
    if (!interactions.onClick || interactions.onClick.action !== action) return;
    
    switch (action) {
      case 'link':
        if (interactions.onClick.url) {
          const openInNewTab = interactions.onClick.newTab;
          if (openInNewTab) {
            window.open(interactions.onClick.url, '_blank');
          } else {
            window.location.href = interactions.onClick.url;
          }
        }
        break;
        
      case 'scroll':
        if (interactions.onClick.targetId) {
          const targetElement = document.getElementById(interactions.onClick.targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
        break;
        
      case 'toggle':
        if (interactions.onClick.targetElementId) {
          const targetElement = elements.find(el => el.id === interactions.onClick.targetElementId);
          if (targetElement) {
            const isVisible = 
              targetElement.properties.responsive?.[interactions.onClick.targetViewport || 'desktop']?.isVisible !== false;
            
            toggleElementVisibility(
              interactions.onClick.targetElementId, 
              interactions.onClick.targetViewport || 'desktop', 
              !isVisible
            );
          }
        }
        break;
        
      case 'chain':
        if (interactions.onClick.chainedActions && Array.isArray(interactions.onClick.chainedActions)) {
          interactions.onClick.chainedActions.forEach(chainedAction => {
            if (chainedAction.action && chainedAction.targetElementId) {
              setTimeout(() => {
                executeElementAction(chainedAction.targetElementId, chainedAction.action);
              }, chainedAction.delay || 0);
            }
          });
        }
        break;
    }
  };
  
  // Save elements to the database
  const saveElements = async (pageId: string) => {
    if (!user || !pageId) return;
    
    setIsLoading(true);
    
    try {
      // First, delete existing elements for this page
      const { error: deleteError } = await supabase
        .from('elements')
        .delete()
        .eq('page_id', pageId);
        
      if (deleteError) {
        throw new Error(deleteError.message);
      }
      
      if (elements.length > 0) {
        // Format elements for insertion
        const elementsToInsert = elements.map(element => ({
          page_id: pageId,
          type: element.type,
          properties: element.properties as Json,
          position: element.position as unknown as Json
        }));
        
        // Insert new elements
        const { error: insertError } = await supabase
          .from('elements')
          .insert(elementsToInsert);
          
        if (insertError) {
          throw new Error(insertError.message);
        }
      }
      
      toast({
        title: 'Elements saved',
        description: 'Your page elements have been saved successfully'
      });
    } catch (error) {
      console.error('Error saving elements:', error);
      toast({
        title: 'Error saving elements',
        description: (error as Error).message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load elements from the database
  const loadElements = async (pageId: string) => {
    if (!user || !pageId) return;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('elements')
        .select('*')
        .eq('page_id', pageId);
        
      if (error) {
        throw new Error(error.message);
      }
      
      if (data) {
        // Transform database data to our ElementData format
        const transformedData: ElementData[] = data.map(item => ({
          id: item.id,
          type: item.type,
          properties: item.properties as Record<string, any>,
          position: item.position as unknown as ElementPosition
        }));
        
        setElements(transformedData);
      }
    } catch (error) {
      console.error('Error loading elements:', error);
      toast({
        title: 'Error loading elements',
        description: (error as Error).message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BuilderContext.Provider
      value={{
        elements,
        selectedElement,
        addElement,
        updateElement,
        deleteElement,
        selectElement,
        saveElements,
        loadElements,
        isLoading,
        setElements,
        duplicateElement,
        toggleElementVisibility,
        getInteractiveStyles,
        executeElementAction
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};
