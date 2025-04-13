
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { EyeOff, Eye, CheckCircle, X } from "lucide-react";

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would typically handle form submission, API calls, etc.
    setSubmitted(true);
    toast({
      title: "Account Created",
      description: "Your account has been successfully created!"
    });
  };
  
  return (
    <section id="signup" className="section-padding bg-gradient-to-b from-perspective-light-gray to-white">
      <div className="flex flex-col lg:flex-row items-center gap-16 max-w-7xl mx-auto">
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="gradient-text">Sign Up</span> and Start Building Your Website Today
          </h2>
          <p className="text-perspective-gray text-lg mb-8">
            Create a free account and explore our builder. No credit card required.
          </p>
          
          {submitted ? (
            <div className="text-center p-8 rounded-xl bg-green-50 border border-green-200">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Registration Successful!
              </h3>
              <p className="text-green-600 mb-6">
                Thank you for signing up. Check your email for confirmation.
              </p>
              <Button className="btn-gradient w-full">
                Continue to Dashboard
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 max-w-md">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Your name" 
                  className="h-12 mt-2 rounded-lg border-perspective-light-gray focus:border-perspective-purple focus:ring-perspective-purple"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  className="h-12 mt-2 rounded-lg border-perspective-light-gray focus:border-perspective-purple focus:ring-perspective-purple"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password" 
                    className="h-12 mt-2 pr-10 rounded-lg border-perspective-light-gray focus:border-perspective-purple focus:ring-perspective-purple"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-[1.15rem] text-perspective-gray hover:text-perspective-purple"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div>
                <Button type="submit" className="btn-gradient w-full h-12">
                  Create Account
                </Button>
                <p className="text-xs text-perspective-gray text-center mt-4">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </form>
          )}
        </div>
        
        <div className="w-full lg:w-1/2">
          <Card className="shadow-soft border-perspective-light-gray/30 overflow-hidden bg-white">
            <CardHeader className="bg-gradient-purple-blue text-white pb-6">
              <CardTitle className="text-2xl">Free Starter Plan</CardTitle>
              <CardDescription className="text-white/90 text-lg">Perfect for small businesses and entrepreneurs</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">R0</span>
                <span className="text-white/90 ml-2">/ month</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <h4 className="font-medium mb-4">What's included:</h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-perspective-purple">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                  </svg>
                  Mobile-responsive website
                </li>
                <li className="flex items-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-perspective-purple">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                  </svg>
                  5 pages
                </li>
                <li className="flex items-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-perspective-purple">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                  </svg>
                  Lekker Sites subdomain
                </li>
                <li className="flex items-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-perspective-purple">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                  </svg>
                  Basic SEO tools
                </li>
                <li className="flex items-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-perspective-purple">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                  </svg>
                  Community support
                </li>
              </ul>
            </CardContent>
            <CardFooter className="border-t border-perspective-light-gray/30 pt-6 flex flex-col items-start">
              <h4 className="font-medium mb-2">Simple 4-step setup:</h4>
              <div className="space-y-3 w-full">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-perspective-purple/20 flex items-center justify-center text-sm font-medium text-perspective-purple">1</div>
                  <span className="ml-3 text-sm">Create your account</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-perspective-purple/20 flex items-center justify-center text-sm font-medium text-perspective-purple">2</div>
                  <span className="ml-3 text-sm">Choose your template</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-perspective-purple/20 flex items-center justify-center text-sm font-medium text-perspective-purple">3</div>
                  <span className="ml-3 text-sm">Customize your site</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-perspective-purple/20 flex items-center justify-center text-sm font-medium text-perspective-purple">4</div>
                  <span className="ml-3 text-sm">Publish and go live</span>
                </div>
              </div>
              <Button variant="outline" className="mt-6 w-full hover:bg-perspective-purple/10 hover:text-perspective-purple transition-all">View All Plans</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
