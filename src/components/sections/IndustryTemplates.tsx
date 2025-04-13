
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Building2, Briefcase, ShoppingBag, Utensils, Hotel, Stethoscope, Rocket, Palette, GraduationCap, Dumbbell, Plus } from 'lucide-react';

interface IndustryTemplatesProps {
  onSelectIndustry: (industry: string) => void;
  selectedIndustry: string;
}

interface IndustryOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const IndustryTemplates: React.FC<IndustryTemplatesProps> = ({
  onSelectIndustry,
  selectedIndustry
}) => {
  const industries: IndustryOption[] = [
    {
      id: 'business',
      name: 'Business & Services',
      icon: <Briefcase className="h-10 w-10 text-blue-500" />,
      description: 'Professional templates for corporate, consulting, and service businesses.'
    },
    {
      id: 'ecommerce',
      name: 'E-Commerce',
      icon: <ShoppingBag className="h-10 w-10 text-emerald-500" />,
      description: 'Conversion-optimized templates for online stores and marketplaces.'
    },
    {
      id: 'restaurant',
      name: 'Restaurant & Food',
      icon: <Utensils className="h-10 w-10 text-orange-500" />,
      description: 'Appetizing designs for restaurants, cafes, and food services.'
    },
    {
      id: 'real-estate',
      name: 'Real Estate',
      icon: <Building2 className="h-10 w-10 text-indigo-500" />,
      description: 'Property showcase templates for realtors and property managers.'
    },
    {
      id: 'hospitality',
      name: 'Hospitality',
      icon: <Hotel className="h-10 w-10 text-amber-500" />,
      description: 'Welcoming templates for hotels, resorts, and hospitality services.'
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: <Stethoscope className="h-10 w-10 text-red-500" />,
      description: 'Trustworthy designs for medical practices, clinics, and healthcare providers.'
    },
    {
      id: 'tech',
      name: 'Technology',
      icon: <Rocket className="h-10 w-10 text-purple-500" />,
      description: 'Modern templates for tech startups, SaaS, and tech companies.'
    },
    {
      id: 'creative',
      name: 'Creative & Portfolio',
      icon: <Palette className="h-10 w-10 text-pink-500" />,
      description: 'Showcase templates for designers, photographers, and creatives.'
    },
    {
      id: 'education',
      name: 'Education',
      icon: <GraduationCap className="h-10 w-10 text-cyan-500" />,
      description: 'Informative templates for schools, universities, and online courses.'
    },
    {
      id: 'fitness',
      name: 'Fitness & Wellness',
      icon: <Dumbbell className="h-10 w-10 text-lime-500" />,
      description: 'Energetic designs for gyms, personal trainers, and wellness centers.'
    },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Industry-Specific Templates</h2>
        <p className="text-muted-foreground">Select an industry to view optimized section templates</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {industries.map((industry) => (
          <Card 
            key={industry.id} 
            className={`cursor-pointer transition-all ${selectedIndustry === industry.id ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
            onClick={() => onSelectIndustry(industry.id)}
          >
            <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
              <div className="p-3 rounded-full bg-primary/10 mx-auto">
                {industry.icon}
              </div>
              <h3 className="font-medium">{industry.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {selectedIndustry !== 'all' && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Templates for {industries.find(i => i.id === selectedIndustry)?.name}</h3>
          <p className="text-muted-foreground mb-6">
            {industries.find(i => i.id === selectedIndustry)?.description}
          </p>
          
          <Tabs defaultValue="sections">
            <TabsList>
              <TabsTrigger value="sections">Sections</TabsTrigger>
              <TabsTrigger value="layouts">Complete Layouts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sections" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array(4).fill(0).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="h-40 bg-muted flex items-center justify-center">
                      <div className="text-muted-foreground">
                        {selectedIndustry} section preview {i + 1}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-medium">{selectedIndustry.charAt(0).toUpperCase() + selectedIndustry.slice(1)} Section {i + 1}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Optimized for {industries.find(ind => ind.id === selectedIndustry)?.name.toLowerCase()} websites
                      </p>
                      <div className="mt-4">
                        <Button size="sm" className="w-full gap-1">
                          <Plus size={16} />
                          Add Section
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="layouts" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array(2).fill(0).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="h-60 bg-muted flex items-center justify-center">
                      <div className="text-muted-foreground">
                        {selectedIndustry} full layout preview {i + 1}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-medium">{selectedIndustry.charAt(0).toUpperCase() + selectedIndustry.slice(1)} Complete Layout {i + 1}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Full website layout with multiple sections
                      </p>
                      <div className="mt-4">
                        <Button size="sm" className="w-full gap-1">
                          <Plus size={16} />
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default IndustryTemplates;
