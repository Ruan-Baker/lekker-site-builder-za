
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BuilderSidebar from '@/components/builder/BuilderSidebar';
import BuilderCanvas from '@/components/builder/BuilderCanvas';
import BuilderHeader from '@/components/builder/BuilderHeader';
import { useBuilder } from '@/contexts/BuilderContext';

const Builder = () => {
  const { selectedElement } = useBuilder();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <BuilderHeader />
        <div className="flex flex-1 overflow-hidden">
          <BuilderSidebar />
          <BuilderCanvas />
          {/* Future properties panel could go here based on selectedElement */}
        </div>
      </div>
    </DndProvider>
  );
};

export default Builder;
