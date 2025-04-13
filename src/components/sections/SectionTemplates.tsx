
import React, { useState } from 'react';
import { useSections } from '@/contexts/SectionContext';
import { useBuilder } from '@/contexts/BuilderContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import IndustryTemplates from './IndustryTemplates';

const SectionTemplates = () => {
  const { 
    filteredSections, 
    isLoading, 
    searchTerm, 
    setSearchTerm, 
    categories,
    activeCategory,
    setActiveCategory,
    industries,
    activeIndustry,
    setActiveIndustry,
    complexityFilter,
    setComplexityFilter
  } = useSections();
  
  const { addElement } = useBuilder();
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState<'sections' | 'industries'>('sections');
  
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
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search sections..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? 'bg-muted' : ''}
          >
            <Filter size={16} />
          </Button>
        </div>
        
        <div className="flex gap-4 mb-4">
          <Button
            variant={view === 'sections' ? 'default' : 'outline'}
            onClick={() => setView('sections')}
            className="flex-1"
            size="sm"
          >
            Section Library
          </Button>
          <Button
            variant={view === 'industries' ? 'default' : 'outline'}
            onClick={() => setView('industries')}
            className="flex-1"
            size="sm"
          >
            Industry Templates
          </Button>
        </div>
        
        {showFilters && (
          <div className="space-y-4 py-4 border-y border-gray-100">
            <div>
              <label className="text-sm font-medium mb-1 block">Category</label>
              <ScrollArea className="max-w-full pb-2">
                <Tabs 
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
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Complexity</label>
                <Select value={complexityFilter} onValueChange={setComplexityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select complexity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All levels</SelectItem>
                    <SelectItem value="simple">Simple</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="complex">Complex</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Industry</label>
                <Select value={activeIndustry} onValueChange={setActiveIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry === 'all' ? 'All industries' : industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {(activeCategory !== 'all' || activeIndustry !== 'all' || complexityFilter !== 'all' || searchTerm) && (
              <div className="flex items-center justify-between pt-2">
                <div className="flex flex-wrap gap-2">
                  {activeCategory !== 'all' && (
                    <Badge variant="secondary" className="gap-1">
                      {activeCategory}
                      <button onClick={() => setActiveCategory('all')} className="ml-1">×</button>
                    </Badge>
                  )}
                  {activeIndustry !== 'all' && (
                    <Badge variant="secondary" className="gap-1">
                      {activeIndustry}
                      <button onClick={() => setActiveIndustry('all')} className="ml-1">×</button>
                    </Badge>
                  )}
                  {complexityFilter !== 'all' && (
                    <Badge variant="secondary" className="gap-1">
                      {complexityFilter}
                      <button onClick={() => setComplexityFilter('all')} className="ml-1">×</button>
                    </Badge>
                  )}
                  {searchTerm && (
                    <Badge variant="secondary" className="gap-1">
                      "{searchTerm}"
                      <button onClick={() => setSearchTerm('')} className="ml-1">×</button>
                    </Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={() => {
                  setActiveCategory('all');
                  setActiveIndustry('all');
                  setComplexityFilter('all');
                  setSearchTerm('');
                }}>
                  Clear all
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      
      <ScrollArea className="flex-1 p-4">
        {view === 'industries' ? (
          <IndustryTemplates 
            onSelectIndustry={setActiveIndustry} 
            selectedIndustry={activeIndustry === 'all' ? '' : activeIndustry} 
          />
        ) : isLoading ? (
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
            {categories.length > 1 && activeCategory === 'all' && (
              categories.filter(c => c !== 'all').map(category => {
                const categorySections = filteredSections.filter(s => s.category === category);
                if (categorySections.length === 0) return null;
                
                return (
                  <div key={category} className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium capitalize">{category}</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setActiveCategory(category)}
                      >
                        See all
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {categorySections.slice(0, 3).map((section) => (
                        <SectionTemplateCard 
                          key={section.id} 
                          section={section} 
                          onAdd={handleAddSection}
                        />
                      ))}
                    </div>
                    
                    <Separator className="my-6" />
                  </div>
                );
              })
            ) || (
              <div className="grid grid-cols-1 gap-4">
                {filteredSections.map((section) => (
                  <SectionTemplateCard 
                    key={section.id} 
                    section={section} 
                    onAdd={handleAddSection}
                  />
                ))}
              </div>
            )}
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

interface SectionTemplateCardProps {
  section: any;
  onAdd: (section: any) => void;
}

const SectionTemplateCard: React.FC<SectionTemplateCardProps> = ({ section, onAdd }) => {
  return (
    <Card className="overflow-hidden group">
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
            onClick={() => onAdd(section)}
            variant="secondary"
            className="gap-2"
          >
            <Plus size={16} />
            Add Section
          </Button>
        </div>
      </div>
      <CardContent className="p-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-sm">{section.name}</h3>
            {section.description && (
              <p className="text-xs text-gray-500 mt-1">{section.description}</p>
            )}
          </div>
          
          {section.complexity && (
            <Badge variant={
              section.complexity === 'simple' ? 'outline' : 
              section.complexity === 'medium' ? 'secondary' : 
              'default'
            } className="text-xs">
              {section.complexity}
            </Badge>
          )}
        </div>
        
        {section.tags && section.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {section.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs bg-muted/50">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SectionTemplates;
