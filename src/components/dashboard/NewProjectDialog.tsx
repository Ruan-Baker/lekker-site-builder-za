
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '@/contexts/ProjectContext';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Globe, LayoutDashboard, FileText, ArrowRight, Laptop, PlusCircle } from 'lucide-react';

// Project type options
const PROJECT_TYPES = [
  { id: 'website', name: 'Website', icon: <Globe className="h-10 w-10 mb-4 text-blue-500" />, description: "Build a multi-page website with custom designs" },
  { id: 'funnel', name: 'Sales Funnel', icon: <LayoutDashboard className="h-10 w-10 mb-4 text-blue-500" />, description: "Create a high-converting sales funnel" },
];

// Template options
const WEBSITE_TEMPLATES = [
  { id: 'blank', name: 'Blank Website', image: null, description: "Start from scratch" },
  { id: 'business', name: 'Business Site', image: '/lovable-uploads/17f32272-e437-4137-9a93-9774b8bc8094.png', description: "Professional business template" },
  { id: 'portfolio', name: 'Portfolio', image: '/lovable-uploads/243f158e-a205-41ef-b2b7-7ac49abe0716.png', description: "Showcase your work" },
];

const FUNNEL_TEMPLATES = [
  { id: 'blank', name: 'Blank Funnel', image: null, description: "Start from scratch" },
  { id: 'leadgen', name: 'Lead Generation', image: '/lovable-uploads/3502f0e2-87c7-447f-ba87-86aa904adb3a.png', description: "Capture high-quality leads" },
  { id: 'sales', name: 'Product Sales', image: '/lovable-uploads/8e5abb5e-c4f6-4a6d-a3ea-0e0336cf6013.png', description: "Sell products or services" },
];

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewProjectDialog = ({ open, onOpenChange }: NewProjectDialogProps) => {
  const { createNewProject } = useProject();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<'name' | 'type' | 'template'>('name');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectType, setProjectType] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('blank');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const resetState = () => {
    setStep('name');
    setProjectName('');
    setProjectDescription('');
    setProjectType('');
    setSelectedTemplate('blank');
    setIsSubmitting(false);
  };
  
  const handleClose = () => {
    resetState();
    onOpenChange(false);
  };
  
  const nextStep = () => {
    if (step === 'name') {
      setStep('type');
    } else if (step === 'type') {
      setStep('template');
    }
  };
  
  const prevStep = () => {
    if (step === 'template') {
      setStep('type');
    } else if (step === 'type') {
      setStep('name');
    }
  };
  
  const templates = projectType === 'website' ? WEBSITE_TEMPLATES : FUNNEL_TEMPLATES;
  
  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      toast({
        title: 'Error',
        description: 'Project name is required',
        variant: 'destructive'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const projectId = await createNewProject(
        projectName, 
        projectDescription, 
        projectType, 
        selectedTemplate !== 'blank' ? selectedTemplate : null
      );
      
      if (projectId) {
        toast({
          title: 'Success',
          description: 'Project created successfully'
        });
        
        resetState();
        onOpenChange(false);
        navigate(`/builder/${projectId}`);
      }
    } catch (err) {
      console.error('Error creating project:', err);
      toast({
        title: 'Error',
        description: 'Failed to create project',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderStepContent = () => {
    switch (step) {
      case 'name':
        return (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Name your project</DialogTitle>
              <DialogDescription>
                Give your project a name and optional description
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input 
                  id="project-name" 
                  value={projectName} 
                  onChange={e => setProjectName(e.target.value)} 
                  placeholder="My Awesome Website" 
                  className="rounded-md"
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-description">Description (Optional)</Label>
                <Textarea 
                  id="project-description" 
                  value={projectDescription} 
                  onChange={e => setProjectDescription(e.target.value)} 
                  placeholder="A brief description of your project"
                  className="rounded-md"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={handleClose}
                className="rounded-md"
              >
                Cancel
              </Button>
              <Button 
                onClick={nextStep}
                disabled={!projectName.trim()}
                className="bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogFooter>
          </>
        );
        
      case 'type':
        return (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Choose project type</DialogTitle>
              <DialogDescription>
                Select what type of project you want to create
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              {PROJECT_TYPES.map(type => (
                <Card 
                  key={type.id}
                  className={`cursor-pointer transition-all hover:border-blue-400 ${
                    projectType === type.id ? 'border-2 border-blue-500 ring-2 ring-blue-200' : ''
                  }`}
                  onClick={() => setProjectType(type.id)}
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    {type.icon}
                    <h3 className="text-lg font-semibold">{type.name}</h3>
                    <p className="text-sm text-gray-500 text-center mt-2">{type.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <DialogFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={prevStep}
                className="rounded-md"
              >
                Back
              </Button>
              <Button 
                onClick={nextStep}
                disabled={!projectType}
                className="bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogFooter>
          </>
        );
        
      case 'template':
        return (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Choose a template</DialogTitle>
              <DialogDescription>
                Start with a template or begin from scratch
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="template" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="template">Templates</TabsTrigger>
                <TabsTrigger value="blank">Blank Project</TabsTrigger>
              </TabsList>
              <TabsContent value="template">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 max-h-[400px] overflow-y-auto">
                  {templates.filter(t => t.id !== 'blank').map(template => (
                    <Card 
                      key={template.id}
                      className={`cursor-pointer transition-all hover:border-blue-400 ${
                        selectedTemplate === template.id ? 'border-2 border-blue-500 ring-2 ring-blue-200' : ''
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="h-32 bg-gray-100 w-full overflow-hidden">
                        {template.image ? (
                          <img 
                            src={template.image} 
                            alt={template.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText className="h-10 w-10 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <CardHeader className="py-3">
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="blank">
                <div className="flex flex-col items-center justify-center p-8 border rounded-md">
                  <Laptop className="h-16 w-16 text-blue-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Start from scratch</h3>
                  <p className="text-center text-sm text-gray-500 mb-4">Begin with a blank project and build exactly what you want</p>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedTemplate('blank')}
                    className={`rounded-md ${selectedTemplate === 'blank' ? 'bg-blue-50 border-blue-500' : ''}`}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Use blank template
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter className="flex justify-between mt-4">
              <Button 
                variant="outline" 
                onClick={prevStep}
                className="rounded-md"
              >
                Back
              </Button>
              <Button 
                onClick={handleCreateProject}
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                {isSubmitting ? 'Creating...' : 'Create Project'}
              </Button>
            </DialogFooter>
          </>
        );
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-xl">
        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectDialog;
