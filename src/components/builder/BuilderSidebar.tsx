
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, LayoutGrid, Type, Image, Box } from 'lucide-react';
import { Button as ButtonIcon } from 'lucide-react';
import ElementItem from './ElementItem';

const BuilderSidebar = () => {
  const sections = [
    { id: 'headers', name: 'Headers', count: 5 },
    { id: 'hero', name: 'Hero Sections', count: 8 },
    { id: 'features', name: 'Features', count: 12 },
    { id: 'testimonials', name: 'Testimonials', count: 6 },
    { id: 'pricing', name: 'Pricing', count: 4 },
    { id: 'contact', name: 'Contact', count: 3 },
    { id: 'footer', name: 'Footers', count: 5 },
  ];

  const elements = [
    { id: 'heading', name: 'Heading', icon: Type },
    { id: 'paragraph', name: 'Paragraph', icon: Type },
    { id: 'image', name: 'Image', icon: Image },
    { id: 'button', name: 'Button', icon: ButtonIcon },
    { id: 'container', name: 'Container', icon: LayoutGrid },
  ];

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      <Tabs defaultValue="sections" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-2 mx-2 mt-2 bg-gray-100">
          <TabsTrigger value="sections" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Sections</TabsTrigger>
          <TabsTrigger value="elements" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Elements</TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-y-auto p-4">
          <TabsContent value="sections" className="mt-0">
            {sections.map((section) => (
              <Collapsible key={section.id} className="mb-2">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded-md">
                  <span className="font-medium">{section.name}</span>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 mr-2">{section.count}</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-1 pl-2">
                  <div className="h-20 bg-gray-100 rounded-md mb-2 flex items-center justify-center text-xs text-gray-500">
                    Section Preview
                  </div>
                  <div className="h-20 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-500">
                    Section Preview
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </TabsContent>
          
          <TabsContent value="elements" className="mt-0">
            <div className="grid grid-cols-2 gap-2">
              {elements.map((element) => (
                <ElementItem key={element.id} id={element.id} name={element.name} Icon={element.icon} />
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default BuilderSidebar;
