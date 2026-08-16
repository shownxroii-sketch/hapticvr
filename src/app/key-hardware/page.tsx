import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HardwareHero from '@/app/key-hardware/components/HardwareHero';
import HardwareBento from '@/app/key-hardware/components/HardwareBento';
import SpecsTable from '@/app/key-hardware/components/SpecsTable';

export default function KeyHardwarePage() {
  return (
    <>
      <Header />
      <main>
        <HardwareHero />
        <HardwareBento />
        <SpecsTable />
      </main>
      <Footer />
    </>
  );
}