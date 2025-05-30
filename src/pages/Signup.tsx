
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import SignupStepOne from '@/components/auth/SignupStepOne';
import SignupStepTwo from '@/components/auth/SignupStepTwo';
import SignupStepThree from '@/components/auth/SignupStepThree';
import SignupSuccess from '@/components/auth/SignupSuccess';
import { ArrowLeft } from 'lucide-react';

export type SignupFormData = {
  name: string;
  email: string;
  password: string;
  businessName: string;
  industry: string;
  businessSize: string;
  websiteGoals: string[];
  selectedTemplate: string | null;
};

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    businessName: '',
    industry: '',
    businessSize: 'small',
    websiteGoals: [],
    selectedTemplate: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { user, signUp } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is logged in, redirect to homepage
    if (user && !isSubmitting && !isSuccess) {
      navigate('/');
    }
  }, [user, navigate, isSubmitting, isSuccess]);
  
  const updateFormData = (data: Partial<SignupFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };
  
  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleSubmit = async (skipTemplate = false) => {
    setIsSubmitting(true);
    
    try {
      // First, create the user account
      const { error } = await signUp(
        formData.email, 
        formData.password, 
        formData.name
      );
      
      if (error) {
        toast({
          title: 'Sign Up Failed',
          description: error.message || 'There was an error creating your account',
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }
      
      // Show success state
      setIsSuccess(true);
      setIsSubmitting(false);
      
      toast({
        title: 'Account Created',
        description: 'Your account has been successfully created!',
      });
      
    } catch (error: any) {
      console.error('Error during signup:', error);
      toast({
        title: 'Sign Up Failed',
        description: error.message || 'There was an error creating your account',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-perspective-light-gray to-white">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <Link to="/" className="flex items-center text-perspective-gray hover:text-blue-600 transition">
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-blue-600">Create Your Account</span>
          </h2>
          <p className="text-gray-700 text-lg">
            Let's get you set up with your new website
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-perspective-light-gray text-perspective-gray'}`}>
              1
            </div>
            <div className={`h-1 w-12 ${currentStep > 1 ? 'bg-blue-600' : 'bg-perspective-light-gray'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-perspective-light-gray text-perspective-gray'}`}>
              2
            </div>
            <div className={`h-1 w-12 ${currentStep > 2 ? 'bg-blue-600' : 'bg-perspective-light-gray'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-perspective-light-gray text-perspective-gray'}`}>
              3
            </div>
          </div>
        </div>
        
        <Card className="overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-white">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="text-2xl">
              {currentStep === 1 && "Create Your Account"}
              {currentStep === 2 && "Business Details"}
              {currentStep === 3 && "Choose a Template"}
              {isSuccess && "Account Created!"}
            </CardTitle>
            <CardDescription className="text-white/90">
              {currentStep === 1 && "Start building your website today"}
              {currentStep === 2 && "Tell us about your business"}
              {currentStep === 3 && "Select a template or start from scratch"}
              {isSuccess && "You're all set to start building"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {isSuccess ? (
              <SignupSuccess />
            ) : (
              <>
                {currentStep === 1 && (
                  <SignupStepOne 
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={handleNextStep}
                  />
                )}
                
                {currentStep === 2 && (
                  <SignupStepTwo 
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={handleNextStep}
                    onBack={handlePrevStep}
                  />
                )}
                
                {currentStep === 3 && (
                  <SignupStepThree 
                    formData={formData}
                    updateFormData={updateFormData}
                    onSubmit={handleSubmit}
                    onBack={handlePrevStep}
                    isSubmitting={isSubmitting}
                  />
                )}
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t bg-gray-50 px-6 py-4">
            {!isSuccess && (
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/auth" className="text-blue-600 hover:underline font-medium">
                  Log in
                </Link>
              </p>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
