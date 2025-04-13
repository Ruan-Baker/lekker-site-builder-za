
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import BuilderPreview from '@/components/BuilderPreview';
import Templates from '@/components/Templates';
import FunnelBuilder from '@/components/FunnelBuilder';
import Testimonials from '@/components/Testimonials';
import SignUpForm from '@/components/SignUpForm';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import MobileFirst from '@/components/MobileFirst';

const Index = () => {
  // Intersection Observer for animation triggers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animationElements = document.querySelectorAll('.section-animation-container');
    animationElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      animationElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-perspective-white">
      <Header />
      <main className="pt-24">
        <Hero />
        <Features />
        <BuilderPreview />
        <FunnelBuilder />
        <Templates />
        <MobileFirst />
        <Testimonials />
        <SignUpForm />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
