
import React, { useState } from 'react';
import { useSections } from '@/contexts/SectionContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface IndustryTemplatesSelectorProps {
  onSelectTemplate: (template: any) => void;
}

const IndustryTemplatesSelector: React.FC<IndustryTemplatesSelectorProps> = ({ onSelectTemplate }) => {
  const { 
    filteredSections, 
    popularSections, 
    userSections,
    industries, 
    activeIndustry, 
    setActiveIndustry, 
    setSearchTerm, 
    availableTags,
    tagFilters,
    setTagFilters,
    isLoading 
  } = useSections();
  
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [localSearch, setLocalSearch] = useState<string>("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(localSearch);
  };
  
  const toggleTagFilter = (tag: string) => {
    setTagFilters(current => 
      current.includes(tag) 
        ? current.filter(t => t !== tag)
        : [...current, tag]
    );
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Industry-Specific Templates</h2>
        <p className="text-muted-foreground">Choose from our curated section templates for your industry</p>
      </div>
      
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search templates..." 
            className="pl-9"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)} 
          />
        </div>
        <Button type="submit" variant="default">Search</Button>
      </form>
      
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium pt-1.5">Industry:</span>
        {industries.map((industry) => (
          <Button 
            key={industry} 
            variant={activeIndustry === industry ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveIndustry(industry)}
          >
            {industry === 'all' ? 'All Industries' : industry.charAt(0).toUpperCase() + industry.slice(1)}
          </Button>
        ))}
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Filter by tags:</h3>
        <div className="flex flex-wrap gap-1.5">
          {availableTags.slice(0, 12).map((tag) => (
            <Badge 
              key={tag}
              variant={tagFilters.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleTagFilter(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="yours">Your Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-32 w-full" />
                  <CardContent className="p-4">
                    <Skeleton className="h-5 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full mt-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredSections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSections.map((template) => (
                <Card key={template.id} className="overflow-hidden">
                  <div className="relative h-32 w-full bg-muted">
                    {template.thumbnail_url ? (
                      <img 
                        src={template.thumbnail_url} 
                        alt={template.name} 
                        className="h-full w-full object-cover" 
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                        No preview available
                      </div>
                    )}
                    {template.is_premium && (
                      <Badge className="absolute top-2 right-2" variant="secondary">
                        Premium
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {template.description || "No description available"}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {template.tags?.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {(template.tags?.length || 0) > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.tags!.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button 
                      onClick={() => onSelectTemplate(template.template_data)}
                      className="w-full"
                    >
                      Use Template
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <h3 className="font-medium">No templates found</h3>
              <p className="text-muted-foreground mt-1">
                Try adjusting your filters or search term
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="popular" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularSections.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <div className="relative h-32 w-full bg-muted">
                  {template.thumbnail_url ? (
                    <img 
                      src={template.thumbnail_url} 
                      alt={template.name} 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                      No preview available
                    </div>
                  )}
                </div>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {template.description || "No description available"}
                  </p>
                  <div className="flex gap-1 mt-2">
                    {template.complexity && (
                      <Badge variant="secondary" className={cn(
                        "text-xs",
                        template.complexity === 'simple' && "bg-green-100 text-green-800",
                        template.complexity === 'medium' && "bg-yellow-100 text-yellow-800",
                        template.complexity === 'complex' && "bg-red-100 text-red-800"
                      )}>
                        {template.complexity}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    onClick={() => onSelectTemplate(template.template_data)}
                    className="w-full"
                  >
                    Use Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="yours" className="mt-4">
          {userSections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userSections.map((template) => (
                <Card key={template.id} className="overflow-hidden">
                  <div className="h-32 w-full bg-muted">
                    {template.thumbnail_url ? (
                      <img 
                        src={template.thumbnail_url} 
                        alt={template.name} 
                        className="h-full w-full object-cover" 
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                        No preview available
                      </div>
                    )}
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {template.description || "No description available"}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button 
                      onClick={() => onSelectTemplate(template.template_data)}
                      className="flex-1 mr-2"
                    >
                      Use Template
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        // Would implement edit functionality here
                      }}
                      className="flex-shrink-0"
                    >
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <h3 className="font-medium">No saved templates</h3>
              <p className="text-muted-foreground mt-1">
                Save sections as templates to reuse them across your projects
              </p>
              <Button className="mt-4" variant="outline">
                Learn how to save templates
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IndustryTemplatesSelector;
