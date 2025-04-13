
import React from 'react';
import { useSections } from '@/contexts/SectionContext';
import { useBuilder } from '@/contexts/BuilderContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

const SectionTemplates = () => {
  const { 
    filteredSections, 
    isLoading, 
    searchTerm, 
    setSearchTerm, 
    categories,
    activeCategory,
    setActiveCategory
  } = useSections();
  
  const { addElement } = useBuilder();
  
  const handleAddSection = (template: any) => {
    // Convert the template to an element
    const element = {
      type: template.template_data.type,
      properties: template.template_data.properties,
      position: {
        x: 0,  // These will be adjusted by the builder canvas
        y: 0,
        width: 800,
        height: 300,
      }
    };
    
    addElement(element);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search sections..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <ScrollArea className="max-w-full pb-2">
          <Tabs 
            defaultValue="all" 
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-full"
          >
            <TabsList className="w-fit max-w-full flex overflow-auto">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="capitalize whitespace-nowrap"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </ScrollArea>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-[120px] w-full rounded-md" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredSections.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredSections.map((section) => (
              <Card key={section.id} className="overflow-hidden group">
                <div className="relative w-full h-40 bg-gray-100">
                  {section.thumbnail_url ? (
                    <img
                      src={section.thumbnail_url}
                      alt={section.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No preview
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button 
                      onClick={() => handleAddSection(section)}
                      variant="secondary"
                      className="gap-2"
                    >
                      <Plus size={16} />
                      Add Section
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm">{section.name}</h3>
                  {section.description && (
                    <p className="text-xs text-gray-500 mt-1">{section.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className="text-gray-400 mb-2">
              No sections found
            </div>
            <p className="text-sm text-gray-500">
              Try adjusting your search or category filter
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default SectionTemplates;
