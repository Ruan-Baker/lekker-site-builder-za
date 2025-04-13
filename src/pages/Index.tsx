
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import FunnelBuilder from '@/components/FunnelBuilder';
import Templates from '@/components/Templates';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import BusinessResults from '@/components/BusinessResults';
import GrowthPlatform from '@/components/GrowthPlatform';
import FunnelExpert from '@/components/FunnelExpert';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <FunnelBuilder />
        <BusinessResults />
        <GrowthPlatform />
        <Templates />
        <Testimonials />
        <FunnelExpert />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
