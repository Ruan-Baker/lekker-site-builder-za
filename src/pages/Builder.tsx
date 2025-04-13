
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BuilderSidebar from '@/components/builder/BuilderSidebar';
import BuilderCanvas from '@/components/builder/BuilderCanvas';
import BuilderHeader from '@/components/builder/BuilderHeader';

const Builder = () => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex flex-col bg-perspective-light-gray">
        <BuilderHeader />
        <div className="flex flex-1 overflow-hidden">
          <BuilderSidebar />
          <BuilderCanvas />
        </div>
      </div>
    </DndProvider>
  );
};

export default Builder;
