import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function AnalysisHero() {
  return (
    <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-surface-dark">
      {/* Background */}
      <div className="absolute inset-0">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_170dedbe2-1776886224384.png"
          alt="Data visualization dashboard with glowing charts and metrics on dark background, deep blue and purple analytical aesthetic, dim atmospheric lighting"
          fill
          className="object-cover opacity-30"
          priority />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
      </div>
      {/* Animated gradient overlay */}
      <div className="pointer-events-none absolute inset-0 animated-gradient-bg opacity-40" />
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-40 pb-16 w-full">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <p className="text-sm font-mono font-semibold uppercase tracking-widest text-accent mb-3">
              Comparative Analysis
            </p>
            <h1 className="text-hero-xl font-extrabold text-white leading-none mb-4">
              Data-Driven
              <br />
              Comparison
            </h1>
            <p className="text-white/70 text-lg max-w-xl leading-relaxed">
              Eight criteria, six devices, one clear picture — which haptic system performs best for which use case.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {['6 Devices', '8 Criteria', '2026 Data']?.map((label) =>
            <div key={label} className="glass-card rounded-xl px-4 py-3 border border-white/10">
                <p className="text-white font-bold text-sm font-mono">{label}</p>
              </div>
            )}
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mt-8 text-white/40 text-sm">
          <Link href="/" className="hover:text-white/70 transition-colors flex items-center gap-1">
            <Icon name="HomeIcon" size={14} />
            How It Works
          </Link>
          <Icon name="ChevronRightIcon" size={14} />
          <Link href="/key-hardware" className="hover:text-white/70 transition-colors">
            Key Hardware
          </Link>
          <Icon name="ChevronRightIcon" size={14} />
          <span className="text-white/70">Comparative Analysis</span>
        </div>
      </div>
    </section>);

}