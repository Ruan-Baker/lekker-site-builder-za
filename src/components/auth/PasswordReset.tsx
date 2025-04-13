
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, AlertCircle, Check, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface PasswordResetProps {
  onBack: () => void;
}

const PasswordReset: React.FC<PasswordResetProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { resetPassword, errorMessage, clearErrorMessage } = useAuth();
  
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearErrorMessage();
    
    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        toast({
          title: 'Password Reset Failed',
          description: error.message || 'There was an error sending the password reset email',
          variant: 'destructive',
        });
        return;
      }
      
      setSuccessMessage('Check your email for a password reset link');
      toast({
        title: 'Password Reset Email Sent',
        description: 'Check your inbox for instructions to reset your password',
      });
    } catch (error: any) {
      console.error('Error during password reset:', error);
      toast({
        title: 'Password Reset Failed',
        description: error.message || 'There was an error sending the password reset email',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter your email to receive a password reset link
        </CardDescription>
      </CardHeader>
      <CardContent>
        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-auto h-6 px-2" 
              onClick={clearErrorMessage}
            >
              Dismiss
            </Button>
          </Alert>
        )}
        
        {successMessage ? (
          <div className="text-center space-y-4">
            <Alert className="mb-4 border-green-500 bg-green-50">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
            </Alert>
            <Button variant="outline" onClick={onBack} className="mt-2">
              Back to Login
            </Button>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Reset Link...
                </>
              ) : 'Send Reset Link'}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PasswordReset;
