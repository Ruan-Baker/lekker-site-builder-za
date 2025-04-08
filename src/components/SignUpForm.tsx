
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
          <div className="relative">
            <div className="bg-white rounded-lg p-6 shadow-soft max-w-md mx-auto">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-lekker-purple/20 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="#6B46C1"/>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Quick Setup</h3>
                  <p className="text-lekker-gray">Create your account in seconds</p>
                </div>
              </div>
              
              <div className="my-8 border-t border-lekker-border-gray"></div>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-lekker-purple/20 flex items-center justify-center text-sm">1</div>
                  <span className="ml-3 text-sm">Create your account</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-lekker-purple/20 flex items-center justify-center text-sm">2</div>
                  <span className="ml-3 text-sm">Choose your template</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-lekker-purple/20 flex items-center justify-center text-sm">3</div>
                  <span className="ml-3 text-sm">Customize your site</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-lekker-purple/20 flex items-center justify-center text-sm">4</div>
                  <span className="ml-3 text-sm">Publish and go live</span>
                </div>
              </div>
              
              <div className="mt-8 bg-lekker-light-gray rounded-lg p-4 text-sm">
                <p className="font-medium mb-2">Free plan includes:</p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="#6B46C1"/>
                    </svg>
                    Mobile-responsive website
                  </li>
                  <li className="flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="#6B46C1"/>
                    </svg>
                    5 pages
                  </li>
                  <li className="flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="#6B46C1"/>
                    </svg>
                    Lekker Sites subdomain
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="absolute -top-5 -right-5 w-20 h-20 bg-lekker-purple/10 rounded-full"></div>
            <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-lekker-purple/10 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
