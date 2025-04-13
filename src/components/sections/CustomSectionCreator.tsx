
import React, { useState } from 'react';
import { useSections } from '@/contexts/SectionContext';
import { useBuilder } from '@/contexts/BuilderContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Plus, Save, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface CustomSectionCreatorProps {
  elementId?: string;
  isDialog?: boolean;
}

const CustomSectionCreator: React.FC<CustomSectionCreatorProps> = ({ 
  elementId,
  isDialog = false
}) => {
  const { user } = useAuth();
  const { saveSectionAsTemplate, categories } = useSections();
  const { elements, selectedElement } = useBuilder();
  
  const [sectionName, setSectionName] = useState('');
  const [sectionDescription, setSectionDescription] = useState('');
  const [sectionCategory, setSectionCategory] = useState('custom');
  const [sectionIndustry, setSectionIndustry] = useState<string>('');
  const [sectionTags, setSectionTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [complexity, setComplexity] = useState<'simple' | 'medium' | 'complex'>('medium');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const targetElement = elementId 
    ? elements.find(el => el.id === elementId) 
    : selectedElement 
      ? elements.find(el => el.id === selectedElement)
      : null;
  
  const addTag = () => {
    if (currentTag && !sectionTags.includes(currentTag)) {
      setSectionTags([...sectionTags, currentTag]);
      setCurrentTag('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setSectionTags(sectionTags.filter(tag => tag !== tagToRemove));
  };
  
  const handleSaveSection = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save templates",
        variant: "destructive"
      });
      return;
    }
    
    if (!targetElement) {
      toast({
        title: "No Element Selected",
        description: "Please select a section to save as template",
        variant: "destructive"
      });
      return;
    }
    
    if (!sectionName) {
      toast({
        title: "Name Required",
        description: "Please provide a name for your section template",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const metadata = {
        name: sectionName,
        description: sectionDescription,
        category: sectionCategory,
        industry: sectionIndustry || null,
        tags: sectionTags,
        complexity: complexity
      };
      
      const templateData = {
        type: targetElement.type,
        properties: targetElement.properties,
        // Only include children if they exist
        ...(targetElement.children && { children: targetElement.children }),
        complexity: complexity
      };
      
      await saveSectionAsTemplate(templateData, metadata);
      
      setSectionName('');
      setSectionDescription('');
      setSectionCategory('custom');
      setSectionIndustry('');
      setSectionTags([]);
      setComplexity('medium');
      
      if (isDialog) {
        setDialogOpen(false);
      }
      
    } catch (error) {
      console.error('Error saving section template:', error);
      toast({
        title: "Error",
        description: "Failed to save section template",
        variant: "destructive"
      });
    }
  };
  
  const SectionForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="section-name">Template Name *</Label>
        <Input
          id="section-name"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          placeholder="Enter a name for your section template"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="section-description">Description</Label>
        <Textarea
          id="section-description"
          value={sectionDescription}
          onChange={(e) => setSectionDescription(e.target.value)}
          placeholder="Describe what this section does..."
          className="resize-none"
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="section-category">Category</Label>
          <Select value={sectionCategory} onValueChange={setSectionCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories
                .filter(cat => cat !== 'all')
                .map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="section-industry">Industry (Optional)</Label>
          <Input
            id="section-industry"
            value={sectionIndustry}
            onChange={(e) => setSectionIndustry(e.target.value)}
            placeholder="e.g., Healthcare, Finance"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Complexity</Label>
        <div className="flex space-x-2">
          <Button
            type="button"
            variant={complexity === 'simple' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setComplexity('simple')}
            className="flex-1"
          >
            Simple
          </Button>
          <Button
            type="button"
            variant={complexity === 'medium' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setComplexity('medium')}
            className="flex-1"
          >
            Medium
          </Button>
          <Button
            type="button"
            variant={complexity === 'complex' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setComplexity('complex')}
            className="flex-1"
          >
            Complex
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="section-tags">Tags</Label>
        <div className="flex">
          <Input
            id="section-tags"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            placeholder="Add tags..."
            className="flex-grow"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag();
              }
            }}
          />
          <Button type="button" onClick={addTag} className="ml-2" size="icon" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {sectionTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {sectionTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                {tag}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeTag(tag)}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
  if (isDialog) {
    return (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save as Template
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Save Section as Template</DialogTitle>
            <DialogDescription>
              Fill in the details to save this section as a reusable template
            </DialogDescription>
          </DialogHeader>
          
          <SectionForm />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSection}>
              <Check className="h-4 w-4 mr-2" />
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Save Section as Template</CardTitle>
      </CardHeader>
      <CardContent>
        <SectionForm />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSaveSection}>
          <Save className="h-4 w-4 mr-2" />
          Save Template
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CustomSectionCreator;
