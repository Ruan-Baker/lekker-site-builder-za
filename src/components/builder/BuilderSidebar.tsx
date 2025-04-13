
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  ChevronDown, 
  LayoutGrid, 
  Type, 
  Image as ImageIcon, 
  Square as ButtonIcon, 
  Box, 
  Layout, 
  ListOrdered, 
  FormInput,
  Video,
  LucideIcon,
  Palette,
  Boxes
} from 'lucide-react';
import ElementItem from './ElementItem';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useBuilder } from '@/contexts/BuilderContext';
import SectionTemplates from '../sections/SectionTemplates';
import DesignPanel from './DesignPanel';

// Define the section type
interface Section {
  id: string;
  name: string;
  count: number;
}

// Define the element type for sidebar items
interface SidebarElement {
  id: string;
  name: string;
  icon: LucideIcon;
}

const BuilderSidebar = () => {
  const { user, signOut } = useAuth();
  const { elements } = useBuilder();
  
  const sections: Section[] = [
    { id: 'headers', name: 'Headers', count: 5 },
    { id: 'hero', name: 'Hero Sections', count: 8 },
    { id: 'features', name: 'Features', count: 12 },
    { id: 'testimonials', name: 'Testimonials', count: 6 },
    { id: 'pricing', name: 'Pricing', count: 4 },
    { id: 'contact', name: 'Contact', count: 3 },
    { id: 'footer', name: 'Footers', count: 5 },
  ];

  const sidebarElements: SidebarElement[] = [
    { id: 'heading', name: 'Heading', icon: Type },
    { id: 'paragraph', name: 'Paragraph', icon: Type },
    { id: 'image', name: 'Image', icon: ImageIcon },
    { id: 'button', name: 'Button', icon: ButtonIcon },
    { id: 'container', name: 'Container', icon: Layout },
    { id: 'video', name: 'Video', icon: Video },
    { id: 'list', name: 'List', icon: ListOrdered },
    { id: 'form', name: 'Form', icon: FormInput },
  ];

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback>{user?.email?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-0.5">
            <div className="text-sm font-medium">
              {user?.user_metadata?.display_name || user?.email?.split('@')[0]}
            </div>
            <div className="text-xs text-gray-500">{elements.length} elements</div>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={signOut}>
          Sign out
        </Button>
      </div>
      
      <Tabs defaultValue="sections" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3 mx-2 mt-2 bg-gray-100">
          <TabsTrigger value="sections" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-1.5">
            <Boxes size={14} />
            Sections
          </TabsTrigger>
          <TabsTrigger value="elements" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-1.5">
            <Layout size={14} />
            Elements
          </TabsTrigger>
          <TabsTrigger value="design" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-1.5">
            <Palette size={14} />
            Design
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-hidden">
          <TabsContent value="sections" className="mt-0 h-full">
            <SectionTemplates />
          </TabsContent>
          
          <TabsContent value="elements" className="mt-0 p-4 h-full overflow-auto">
            <div className="grid grid-cols-2 gap-2">
              {sidebarElements.map((element) => (
                <ElementItem key={element.id} id={element.id} name={element.name} Icon={element.icon} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="design" className="mt-0 h-full">
            <DesignPanel />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default BuilderSidebar;
