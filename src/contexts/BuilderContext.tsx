
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

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
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [elements, setElements] = useState<ElementData[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();

  const addElement = (element: Omit<ElementData, 'id'>) => {
    const id = `${element.type}-${Date.now()}`;
    setElements((prev) => [...prev, { ...element, id }]);
  };

  const updateElement = (id: string, data: Partial<ElementData>) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...data } : el))
    );
  };

  const deleteElement = (id: string) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };

  const selectElement = (id: string | null) => {
    setSelectedElement(id);
  };
  
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
          properties: element.properties,
          position: element.position
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
        setElements(data);
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
        isLoading
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
