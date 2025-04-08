
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

const SignUpForm = () => {
  return (
    <section id="signup" className="section-padding bg-lekker-light-gray">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Sign Up and Start Building Your Website Today
          </h2>
          <p className="text-lekker-gray text-lg mb-8">
            Create a free account and explore our builder. No credit card required.
          </p>
          
          <form className="space-y-8 max-w-md">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input 
                id="name" 
                type="text" 
                placeholder="Your name" 
                className="h-12 mt-2 rounded-lg border-lekker-border-gray focus:border-lekker-purple focus:ring-lekker-purple"
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
                className="h-12 mt-2 rounded-lg border-lekker-border-gray focus:border-lekker-purple focus:ring-lekker-purple"
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Create a password" 
                className="h-12 mt-2 rounded-lg border-lekker-border-gray focus:border-lekker-purple focus:ring-lekker-purple"
              />
            </div>
            
            <div>
              <Button className="w-full btn-primary h-12">
                Create Account
              </Button>
              <p className="text-xs text-lekker-gray text-center mt-4">
                By signing up, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </form>
        </div>
        
        <div className="w-full lg:w-1/2">
          <Card className="shadow-soft border-lekker-border-gray overflow-hidden">
            <CardHeader className="bg-lekker-purple text-white pb-6">
              <CardTitle className="text-2xl">Free Starter Plan</CardTitle>
              <CardDescription className="text-white/80 text-lg">Perfect for small businesses and entrepreneurs</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">R0</span>
                <span className="text-white/80 ml-2">/ month</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <h4 className="font-medium mb-4">What's included:</h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-lekker-purple">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                  </svg>
                  Mobile-responsive website
                </li>
                <li className="flex items-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-lekker-purple">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                  </svg>
                  5 pages
                </li>
                <li className="flex items-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-lekker-purple">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                  </svg>
                  Connect your own domain
                </li>
                <li className="flex items-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-lekker-purple">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                  </svg>
                  Basic SEO tools
                </li>
                <li className="flex items-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-lekker-purple">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                  </svg>
                  Community support
                </li>
              </ul>
            </CardContent>
            <CardFooter className="border-t border-lekker-border-gray pt-6 flex flex-col items-start">
              <div className="flex w-full justify-between mb-4">
                <div className="pricing-option">
                  <h5 className="font-medium">Pro Plan</h5>
                  <p className="text-sm text-lekker-gray">R199/month</p>
                </div>
                <div className="pricing-option">
                  <h5 className="font-medium">Business Plan</h5>
                  <p className="text-sm text-lekker-gray">R399/month</p>
                </div>
              </div>
              
              <h4 className="font-medium mt-4 mb-2">Quick setup in 4 steps:</h4>
              <div className="space-y-3 w-full">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-lekker-purple/20 flex items-center justify-center text-sm font-medium text-lekker-purple">1</div>
                  <span className="ml-3 text-sm">Create your account</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-lekker-purple/20 flex items-center justify-center text-sm font-medium text-lekker-purple">2</div>
                  <span className="ml-3 text-sm">Choose your template</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-lekker-purple/20 flex items-center justify-center text-sm font-medium text-lekker-purple">3</div>
                  <span className="ml-3 text-sm">Customize your site</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-lekker-purple/20 flex items-center justify-center text-sm font-medium text-lekker-purple">4</div>
                  <span className="ml-3 text-sm">Publish and go live</span>
                </div>
              </div>
              <Button variant="outline" className="mt-6 w-full">View All Plans</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
