
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Check, ArrowRight } from 'lucide-react';
import { SignupFormData } from '@/pages/Signup';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SignupStepThreeProps {
  formData: SignupFormData;
  updateFormData: (data: Partial<SignupFormData>) => void;
  onSubmit: (skipTemplate: boolean) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const SignupStepThree: React.FC<SignupStepThreeProps> = ({ 
  formData, 
  updateFormData, 
  onSubmit,
  onBack,
  isSubmitting 
}) => {
  const [selectedTab, setSelectedTab] = useState('recommended');
  
  const industryTemplates = [
    { id: 'template-1', name: 'Modern Business', image: '/placeholder.svg' },
    { id: 'template-2', name: 'Classic Portfolio', image: '/placeholder.svg' },
    { id: 'template-3', name: 'E-Commerce Shop', image: '/placeholder.svg' },
    { id: 'template-4', name: 'Professional Services', image: '/placeholder.svg' },
  ];
  
  const handleSelectTemplate = (templateId: string) => {
    updateFormData({ selectedTemplate: templateId });
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium">Choose how you want to start</h3>
        <p className="text-muted-foreground">Select a template or start with a blank canvas</p>
      </div>
      
      <Tabs defaultValue="recommended" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="industry">By Industry</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommended" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {industryTemplates.slice(0, 4).map((template) => (
              <Card 
                key={template.id}
                className={`cursor-pointer transition overflow-hidden ${
                  formData.selectedTemplate === template.id ? 'ring-2 ring-perspective-purple' : 'hover:shadow-md'
                }`}
                onClick={() => handleSelectTemplate(template.id)}
              >
                <div className="relative aspect-video bg-gray-100">
                  <img 
                    src={template.image} 
                    alt={template.name} 
                    className="object-cover w-full h-full"
                  />
                  {formData.selectedTemplate === template.id && (
                    <div className="absolute inset-0 bg-perspective-purple/20 flex items-center justify-center">
                      <div className="bg-perspective-purple text-white rounded-full p-1">
                        <Check size={18} />
                      </div>
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <p className="font-medium text-sm">{template.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="industry" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {industryTemplates.slice(2, 6).map((template) => (
              <Card 
                key={template.id}
                className={`cursor-pointer transition overflow-hidden ${
                  formData.selectedTemplate === template.id ? 'ring-2 ring-perspective-purple' : 'hover:shadow-md'
                }`}
                onClick={() => handleSelectTemplate(template.id)}
              >
                <div className="relative aspect-video bg-gray-100">
                  <img 
                    src={template.image} 
                    alt={template.name} 
                    className="object-cover w-full h-full"
                  />
                  {formData.selectedTemplate === template.id && (
                    <div className="absolute inset-0 bg-perspective-purple/20 flex items-center justify-center">
                      <div className="bg-perspective-purple text-white rounded-full p-1">
                        <Check size={18} />
                      </div>
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <p className="font-medium text-sm">{template.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="popular" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {industryTemplates.slice(1, 5).map((template) => (
              <Card 
                key={template.id}
                className={`cursor-pointer transition overflow-hidden ${
                  formData.selectedTemplate === template.id ? 'ring-2 ring-perspective-purple' : 'hover:shadow-md'
                }`}
                onClick={() => handleSelectTemplate(template.id)}
              >
                <div className="relative aspect-video bg-gray-100">
                  <img 
                    src={template.image} 
                    alt={template.name} 
                    className="object-cover w-full h-full"
                  />
                  {formData.selectedTemplate === template.id && (
                    <div className="absolute inset-0 bg-perspective-purple/20 flex items-center justify-center">
                      <div className="bg-perspective-purple text-white rounded-full p-1">
                        <Check size={18} />
                      </div>
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <p className="font-medium text-sm">{template.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="border-t pt-6">
        <div className="flex flex-col space-y-3">
          <Button 
            type="button" 
            className="btn-gradient h-12"
            onClick={() => onSubmit(false)}
            disabled={isSubmitting || !formData.selectedTemplate}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Complete Setup
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            className="h-12 border-perspective-purple text-perspective-purple hover:bg-perspective-purple/10"
            onClick={() => onSubmit(true)}
            disabled={isSubmitting}
          >
            Skip and Start from Scratch
          </Button>
          
          <Button 
            type="button" 
            variant="ghost"
            className="h-12"
            onClick={onBack}
            disabled={isSubmitting}
          >
            Back to Business Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupStepThree;
