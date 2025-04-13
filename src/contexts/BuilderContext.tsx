
import React, { createContext, useContext, useState } from 'react';

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
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [elements, setElements] = useState<ElementData[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

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
  };

  const selectElement = (id: string | null) => {
    setSelectedElement(id);
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
