
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import GrowthPlatform from '../components/GrowthPlatform';
import Ecommerce from '../components/Ecommerce';
import Templates from '../components/Templates';
import FunnelBuilder from '../components/FunnelBuilder';
import FunnelExpert from '../components/FunnelExpert';
import Testimonials from '../components/Testimonials';
import BusinessResults from '../components/BusinessResults';
import FounderMessage from '../components/FounderMessage';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Index = () => {
  const { user, loading } = useAuth();
  
  // If user is authenticated, redirect to dashboard
  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div>
      <Header />
      <Hero />
      <FunnelBuilder />
      <GrowthPlatform />
      <Features />
      <Ecommerce />
      <Templates />
      <Testimonials />
      <BusinessResults />
      <FounderMessage />
      <CallToAction />
      <FunnelExpert />
      <Footer />
    </div>
  );
};

export default Index;
