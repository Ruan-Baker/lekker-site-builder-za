
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import PasswordReset from '@/components/auth/PasswordReset';
import UserProfile from '@/components/auth/UserProfile';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const { user, signIn, errorMessage, clearErrorMessage } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (user && location.pathname !== '/profile') {
      navigate('/');
    }
  }, [user, navigate, location.pathname]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearErrorMessage();
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        toast({
          title: 'Login Failed',
          description: error.message || 'There was an error logging in',
          variant: 'destructive',
        });
        return;
      }
      
      toast({
        title: 'Login Successful',
        description: 'You have been logged in successfully',
      });
      
      navigate('/');
    } catch (error: any) {
      console.error('Error during login:', error);
      toast({
        title: 'Login Failed',
        description: error.message || 'There was an error logging in',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (showPasswordReset) {
    return <PasswordReset onBack={() => setShowPasswordReset(false)} />;
  }
  
  if (user && location.pathname === '/profile') {
    return <UserProfile />;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-perspective-light-gray to-white">
      <div className="max-w-md w-full space-y-6">
        <div className="flex justify-between items-center mb-4">
          <Link to="/" className="flex items-center text-perspective-gray hover:text-perspective-purple transition">
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </Link>
        </div>
        
        <Card className="overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-white">
          <CardHeader className="bg-blue-600 text-white p-6">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription className="text-white/90">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 p-6">
            {errorMessage && (
              <Alert variant="destructive" className="mb-6">
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
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="h-12 mt-2 rounded-xl bg-white border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Button
                    type="button"
                    variant="link"
                    className="p-0 h-auto text-xs text-blue-600"
                    onClick={() => setShowPasswordReset(true)}
                  >
                    Forgot password?
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="h-12 mt-2 pr-10 rounded-xl bg-white border-gray-300 focus:border-blue-600 focus:ring-blue-600"
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
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-xl" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : 'Login'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground border-t bg-gray-50 px-6 py-4">
            <p>
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth;

