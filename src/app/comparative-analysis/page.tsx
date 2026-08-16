import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnalysisHero from '@/app/comparative-analysis/components/AnalysisHero';
import MetricsBento from '@/app/comparative-analysis/components/MetricsBento';
import ComparisonTable from '@/app/comparative-analysis/components/ComparisonTable';
import LatencyChart from '@/app/comparative-analysis/components/LatencyChart';

export default function ComparativeAnalysisPage() {
  return (
    <>
      <Header />
      <main>
        <AnalysisHero />
        <MetricsBento />
        <ComparisonTable />
        <LatencyChart />
      </main>
      <Footer />
    </>
  );
}