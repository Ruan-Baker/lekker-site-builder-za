
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useProject } from '@/contexts/ProjectContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

const CreateProject = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createNewProject, isLoading } = useProject();
  
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectType, setProjectType] = useState<'website' | 'funnel'>('website');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  const handleNext = () => {
    if (step === 1) {
      if (!projectName.trim()) {
        toast({
          title: "Project name required",
          description: "Please enter a name for your project",
          variant: "destructive"
        });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      handleCreateProject();
    }
  };
  
  const handleCreateProject = async () => {
    if (!user) return;
    
    try {
      const projectId = await createNewProject(
        projectName,
        projectDescription,
        projectType,
        selectedTemplate
      );
      
      if (projectId) {
        toast({
          title: "Project created!",
          description: "Redirecting to the builder",
        });
        navigate(`/builder/${projectId}`);
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    }
  };
  
  const websiteTemplates = [
    {
      id: 'blank-website',
      name: 'Blank Website',
      description: 'Start from scratch with a clean canvas',
      thumbnail: null,
    },
    {
      id: 'business-website',
      name: 'Business Website',
      description: 'Professional template for businesses',
      thumbnail: 'bg-gradient-to-br from-blue-100 to-indigo-100',
    },
    {
      id: 'portfolio-website',
      name: 'Portfolio Website',
      description: 'Showcase your work and projects',
      thumbnail: 'bg-gradient-to-br from-purple-100 to-pink-100',
    },
  ];
  
  const funnelTemplates = [
    {
      id: 'blank-funnel',
      name: 'Blank Funnel',
      description: 'Start from scratch with a clean funnel',
      thumbnail: null,
    },
    {
      id: 'lead-generation-funnel',
      name: 'Lead Generation',
      description: 'Capture leads with this proven funnel',
      thumbnail: 'bg-gradient-to-br from-green-100 to-emerald-100',
    },
    {
      id: 'sales-funnel',
      name: 'Sales Funnel',
      description: 'Convert visitors into customers',
      thumbnail: 'bg-gradient-to-br from-orange-100 to-red-100',
    },
  ];
  
  const templates = projectType === 'website' ? websiteTemplates : funnelTemplates;
  
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              {step > 1 ? <Check size={18} /> : 1}
            </div>
            <div className={`h-1 w-20 ${step > 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              2
            </div>
          </div>
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold">
              {step === 1 ? 'Create New Project' : 'Choose a Template'}
            </h1>
            <p className="text-gray-600">
              {step === 1 ? 'Enter your project details and select the type' : 'Start with a template or create from scratch'}
            </p>
          </div>
        </div>

        {/* Step 1: Project Details */}
        {step === 1 && (
          <Card className="p-6 rounded-xl shadow-md">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name *
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                placeholder="My Awesome Project"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (optional)
              </label>
              <textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                placeholder="A brief description of your project"
              />
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Project Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className={`border rounded-xl p-5 cursor-pointer transition ${
                    projectType === 'website'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setProjectType('website')}
                >
                  <div className="flex items-center mb-2">
                    <div className={`w-5 h-5 rounded-full border ${
                      projectType === 'website'
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-400'
                    } flex items-center justify-center mr-3`}>
                      {projectType === 'website' && <Check size={12} className="text-white" />}
                    </div>
                    <h3 className="font-medium text-lg">Website</h3>
                  </div>
                  <p className="text-gray-600 text-sm ml-8">
                    Build a multi-page website for your business or personal brand
                  </p>
                </div>
                
                <div
                  className={`border rounded-xl p-5 cursor-pointer transition ${
                    projectType === 'funnel'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setProjectType('funnel')}
                >
                  <div className="flex items-center mb-2">
                    <div className={`w-5 h-5 rounded-full border ${
                      projectType === 'funnel'
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-400'
                    } flex items-center justify-center mr-3`}>
                      {projectType === 'funnel' && <Check size={12} className="text-white" />}
                    </div>
                    <h3 className="font-medium text-lg">Funnel</h3>
                  </div>
                  <p className="text-gray-600 text-sm ml-8">
                    Create a conversion-focused sales or lead generation funnel
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
              <Button
                className="rounded-xl flex items-center"
                onClick={handleNext}
                disabled={!projectName.trim()}
              >
                Next Step <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: Template Selection */}
        {step === 2 && (
          <div>
            <Card className="p-6 rounded-xl shadow-md">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6 w-full flex justify-center">
                  <TabsTrigger value="all" className="rounded-lg">All Templates</TabsTrigger>
                  <TabsTrigger value="popular" className="rounded-lg">Popular</TabsTrigger>
                  <TabsTrigger value="recent" className="rounded-lg">Recent</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`border rounded-xl overflow-hidden cursor-pointer transition ${
                          selectedTemplate === template.id
                            ? 'border-blue-500 ring-2 ring-blue-200'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <div className={`h-36 ${template.thumbnail || 'bg-gray-100'} flex items-center justify-center`}>
                          {!template.thumbnail && (
                            <span className="text-gray-400">No Preview</span>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium mb-1">{template.name}</h3>
                          <p className="text-gray-600 text-sm">{template.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="popular">
                  <div className="p-10 text-center text-gray-500">
                    Popular templates coming soon
                  </div>
                </TabsContent>
                
                <TabsContent value="recent">
                  <div className="p-10 text-center text-gray-500">
                    Recently used templates will appear here
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-between items-center mt-8">
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button
                  className="rounded-xl"
                  onClick={handleCreateProject}
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create Project"}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProject;
