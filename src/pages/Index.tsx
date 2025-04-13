
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
import BuilderPreview from '../components/BuilderPreview';
import MobileFirst from '../components/MobileFirst';
import BusinessResults from '../components/BusinessResults';
import FounderMessage from '../components/FounderMessage';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <Header />
      {user ? (
        <div className="bg-blue-50 py-2 text-center">
          <span className="mr-2">Welcome back! Continue building your site</span>
          <Link to="/builder">
            <Button size="sm" variant="default">Go to Builder</Button>
          </Link>
        </div>
      ) : null}
      <Hero />
      <Features />
      <GrowthPlatform />
      <Ecommerce />
      <Templates />
      <FunnelBuilder />
      <FunnelExpert />
      <Testimonials />
      <BuilderPreview />
      <MobileFirst />
      <BusinessResults />
      <FounderMessage />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
