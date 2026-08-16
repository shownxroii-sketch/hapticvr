import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import ScienceSection from '@/app/components/ScienceSection';
import ProcessBento from '@/app/components/ProcessBento';
import FeedbackDiagram from '@/app/components/FeedbackDiagram';
import { HowItWorksSEO } from '@/app/components/SEOSchema';

export default function HowItWorksPage() {
  return (
    <>
      <HowItWorksSEO />
      <Header />
      <main>
        <HeroSection />
        <ScienceSection />
        <ProcessBento />
        <FeedbackDiagram />
      </main>
      <Footer />
    </>
  );
}