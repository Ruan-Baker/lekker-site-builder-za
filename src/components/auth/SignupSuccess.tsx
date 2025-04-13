
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const SignupSuccess: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="py-6 text-center">
      <div className="flex justify-center mb-4">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      
      <h3 className="text-xl font-semibold text-green-700 mb-2">
        Registration Successful!
      </h3>
      
      <p className="text-muted-foreground mb-6">
        Your account has been created. You can now start building your website.
      </p>
      
      <div className="space-y-3">
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12" 
          onClick={() => navigate('/builder')}
        >
          Go to Website Builder
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full h-12 border-blue-600 text-blue-600 hover:bg-blue-600/10 rounded-xl"
          onClick={() => navigate('/')}
        >
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default SignupSuccess;
