import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, ArrowRight, Check, Mail, Github, Facebook, Linkedin } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { PasswordReset } from '@/components/auth/PasswordReset';
import { UserProfile } from '@/components/auth/UserProfile';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const { user, signIn, signUp, signInWithProvider, errorMessage, clearErrorMessage } = useAuth();
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
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearErrorMessage();
    
    if (password.length < 6) {
      toast({
        title: 'Password Too Short',
        description: 'Password must be at least 6 characters long',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }
    
    try {
      const { error } = await signUp(email, password, name || undefined);
      
      if (error) {
        toast({
          title: 'Sign Up Failed',
          description: error.message || 'There was an error creating your account',
          variant: 'destructive',
        });
        return;
      }
      
      toast({
        title: 'Sign Up Successful',
        description: 'Please check your email to confirm your account',
      });
    } catch (error: any) {
      console.error('Error during signup:', error);
      toast({
        title: 'Sign Up Failed',
        description: error.message || 'There was an error creating your account',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSocialLogin = async (provider: 'github' | 'twitter' | 'google' | 'facebook' | 'linkedin_oidc') => {
    try {
      const { error } = await signInWithProvider(provider);
      
      if (error) {
        toast({
          title: 'Login Failed',
          description: error.message || `There was an error logging in with ${provider}`,
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error(`Error during ${provider} login:`, error);
      toast({
        title: 'Login Failed',
        description: error.message || `There was an error logging in with ${provider}`,
        variant: 'destructive',
      });
    }
  };
  
  if (showPasswordReset) {
    return <PasswordReset onBack={() => setShowPasswordReset(false)} />;
  }
  
  if (user && location.pathname === '/profile') {
    return <UserProfile />;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
          <CardDescription>
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
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
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
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
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto text-xs"
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
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : 'Login'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Optional</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
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
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing up...
                    </>
                  ) : 'Sign Up'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mb-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin('github')}
              className="flex items-center justify-center"
              size="sm"
            >
              <Github className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin('google')}
              className="flex items-center justify-center"
              size="sm"
            >
              <Google className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin('twitter')}
              className="flex items-center justify-center"
              size="sm"
            >
              <Twitter className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin('facebook')}
              className="flex items-center justify-center gap-2"
              size="sm"
            >
              <Facebook className="h-4 w-4" />
              Facebook
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin('linkedin_oidc')}
              className="flex items-center justify-center gap-2"
              size="sm"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Button>
          </div>
          
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-md p-3">
            <div className="flex gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                To use social login, you'll need to configure these providers in your Supabase project settings.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          <p>
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
