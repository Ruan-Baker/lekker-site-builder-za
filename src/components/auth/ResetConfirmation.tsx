
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, Check, Loader2 } from 'lucide-react';

const ResetConfirmation: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have the recovery token in URL
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    if (!params.get('access_token')) {
      setError('Invalid or expired password reset link. Please try requesting a new one.');
    }
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) {
        setError(error.message);
        toast({
          title: 'Password Reset Failed',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }
      
      setSuccess(true);
      toast({
        title: 'Password Reset Successful',
        description: 'Your password has been changed successfully',
      });
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/auth');
      }, 3000);
      
    } catch (error: any) {
      console.error('Error during password reset:', error);
      setError(error.message || 'An error occurred during password reset');
      toast({
        title: 'Password Reset Failed',
        description: error.message || 'An error occurred during password reset',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-perspective-light-gray to-white">
      <div className="w-full max-w-md space-y-6">
        <Card className="overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-white">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle>Set New Password</CardTitle>
            <CardDescription className="text-white/90">
              Create a new password for your account
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success ? (
              <Alert className="mb-4 border-green-500 bg-green-50">
                <Check className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Your password has been reset successfully! You will be redirected to the login page...
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleReset} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="h-12 pr-10 rounded-lg bg-white border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Password must be at least 6 characters long</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="h-12 pr-10 rounded-lg bg-white border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resetting Password...
                    </>
                  ) : 'Reset Password'}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground border-t bg-gray-50 px-6 py-4">
            <Button 
              variant="link" 
              onClick={() => navigate('/auth')} 
              className="text-sm text-blue-600"
            >
              Back to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ResetConfirmation;
