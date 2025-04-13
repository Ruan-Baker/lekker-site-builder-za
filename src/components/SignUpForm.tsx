
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  return (
    <section id="signup" className="section-padding bg-gradient-to-b from-perspective-light-gray to-white">
      <div className="flex flex-col lg:flex-row items-center gap-16 max-w-7xl mx-auto">
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-blue-600">Sign Up</span> and Start Building Your Website Today
          </h2>
          <p className="text-perspective-gray text-lg mb-8">
            Create a free account and explore our builder. No credit card required.
          </p>
          
          <div className="space-y-8 max-w-md">
            <Link to="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full h-12 rounded-xl">
                Get Started - It's Free
              </Button>
            </Link>
            
            <p className="text-center text-sm text-perspective-gray">
              Already have an account? <Link to="/auth" className="text-blue-600 font-medium hover:underline">Log in</Link>
            </p>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2">
          <Card className="rounded-2xl shadow-lg border border-gray-200 overflow-hidden bg-white">
            <CardHeader className="bg-blue-600 text-white pb-6">
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
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-blue-600">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                  </svg>
                  Mobile-responsive website
                </li>
                <li className="flex items-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-blue-600">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                  </svg>
                  5 pages
                </li>
                <li className="flex items-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-blue-600">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                  </svg>
                  Lekker Sites subdomain
                </li>
                <li className="flex items-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-blue-600">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                  </svg>
                  Basic SEO tools
                </li>
                <li className="flex items-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-blue-600">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                  </svg>
                  Community support
                </li>
              </ul>
            </CardContent>
            <CardFooter className="border-t border-gray-200 pt-6 flex flex-col items-start">
              <h4 className="font-medium mb-2">Simple 4-step setup:</h4>
              <div className="space-y-3 w-full">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600">1</div>
                  <span className="ml-3 text-sm">Create your account</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600">2</div>
                  <span className="ml-3 text-sm">Choose your template</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600">3</div>
                  <span className="ml-3 text-sm">Customize your site</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600">4</div>
                  <span className="ml-3 text-sm">Publish and go live</span>
                </div>
              </div>
              <Button variant="outline" className="mt-6 w-full hover:bg-blue-600/10 hover:text-blue-600 transition-all rounded-xl border-blue-600 text-blue-600">View All Plans</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
