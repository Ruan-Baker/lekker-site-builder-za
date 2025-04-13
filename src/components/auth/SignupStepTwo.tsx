
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { SignupFormData } from '@/pages/Signup';

interface SignupStepTwoProps {
  formData: SignupFormData;
  updateFormData: (data: Partial<SignupFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const websiteGoals = [
  { id: 'online-presence', label: 'Establish online presence' },
  { id: 'generate-leads', label: 'Generate leads' },
  { id: 'sell-products', label: 'Sell products/services' },
  { id: 'showcase-portfolio', label: 'Showcase portfolio/work' },
  { id: 'share-information', label: 'Share information/content' },
  { id: 'build-community', label: 'Build community' },
];

const industries = [
  { value: 'business', label: 'Business & Services' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'restaurant', label: 'Restaurant & Food' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'tech', label: 'Technology' },
  { value: 'creative', label: 'Creative & Portfolio' },
  { value: 'education', label: 'Education' },
  { value: 'fitness', label: 'Fitness & Wellness' },
  { value: 'other', label: 'Other' },
];

const SignupStepTwo: React.FC<SignupStepTwoProps> = ({ 
  formData, 
  updateFormData, 
  onNext, 
  onBack 
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.businessName) {
      toast({
        title: "Missing Information",
        description: "Please enter your business name",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.industry) {
      toast({
        title: "Missing Information",
        description: "Please select your industry",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.websiteGoals.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please select at least one website goal",
        variant: "destructive"
      });
      return;
    }
    
    onNext();
  };
  
  const toggleGoal = (goal: string) => {
    const currentGoals = formData.websiteGoals;
    const updatedGoals = currentGoals.includes(goal)
      ? currentGoals.filter(g => g !== goal)
      : [...currentGoals, goal];
    
    updateFormData({ websiteGoals: updatedGoals });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="businessName" className="text-sm font-medium">
          Business Name <span className="text-red-500">*</span>
        </Label>
        <Input 
          id="businessName" 
          type="text" 
          placeholder="Your business name" 
          className="h-12 rounded-lg border-perspective-light-gray focus:border-perspective-purple focus:ring-perspective-purple"
          value={formData.businessName}
          onChange={(e) => updateFormData({ businessName: e.target.value })}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="industry" className="text-sm font-medium">
          Industry <span className="text-red-500">*</span>
        </Label>
        <Select 
          value={formData.industry} 
          onValueChange={(value) => updateFormData({ industry: value })}
        >
          <SelectTrigger id="industry" className="h-12">
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((industry) => (
              <SelectItem key={industry.value} value={industry.value}>
                {industry.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="businessSize" className="text-sm font-medium">
          Business Size
        </Label>
        <Select 
          value={formData.businessSize} 
          onValueChange={(value) => updateFormData({ businessSize: value })}
        >
          <SelectTrigger id="businessSize" className="h-12">
            <SelectValue placeholder="Select business size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="solo">Solo Entrepreneur</SelectItem>
            <SelectItem value="small">Small (1-10 employees)</SelectItem>
            <SelectItem value="medium">Medium (11-50 employees)</SelectItem>
            <SelectItem value="large">Large (51+ employees)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-3">
        <Label className="text-sm font-medium">
          Website Goals <span className="text-red-500">*</span>
        </Label>
        <p className="text-xs text-muted-foreground">Select all that apply</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {websiteGoals.map((goal) => (
            <div key={goal.id} className="flex items-center space-x-2">
              <Checkbox 
                id={goal.id} 
                checked={formData.websiteGoals.includes(goal.id)} 
                onCheckedChange={() => toggleGoal(goal.id)} 
              />
              <Label htmlFor={goal.id} className="text-sm cursor-pointer">
                {goal.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex space-x-3 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          className="flex-1 h-12 border-perspective-purple text-perspective-purple hover:bg-perspective-purple/10"
          onClick={onBack}
        >
          Back
        </Button>
        <Button type="submit" className="flex-1 btn-gradient h-12">
          Continue
        </Button>
      </div>
    </form>
  );
};

export default SignupStepTwo;
