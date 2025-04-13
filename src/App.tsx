
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { BuilderProvider } from "@/contexts/BuilderContext";
import { ProjectProvider, ProjectProviderWithRouter } from "@/contexts/ProjectContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Builder from "./pages/Builder";
import Dashboard from "./pages/Dashboard";
import CreateProject from "./pages/CreateProject";
import Auth from "./pages/Auth";
import Signup from "./pages/Signup";
import ResetConfirmation from "./components/auth/ResetConfirmation";
import SeoStructuredData from "./components/SeoStructuredData";

const queryClient = new QueryClient();
const helmetContext = {};

const App = () => {
  // Check user preference for dark mode
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ProjectProvider>
            <TooltipProvider>
              <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
                <SeoStructuredData />
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <ProjectProviderWithRouter>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/auth/reset-confirmation" element={<ResetConfirmation />} />
                      <Route path="/profile" element={
                        <ProtectedRoute>
                          <Auth />
                        </ProtectedRoute>
                      } />
                      <Route element={<ProtectedRoute />}>
                        <Route path="/builder" element={
                          <BuilderProvider>
                            <Builder />
                          </BuilderProvider>
                        } />
                        <Route path="/builder/:projectId" element={
                          <BuilderProvider>
                            <Builder />
                          </BuilderProvider>
                        } />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/create-project" element={<CreateProject />} />
                      </Route>
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </ProjectProviderWithRouter>
                </BrowserRouter>
              </div>
            </TooltipProvider>
          </ProjectProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
