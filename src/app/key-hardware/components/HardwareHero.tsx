import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function HardwareHero() {
  return (
    <section className="relative min-h-[65vh] flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <AppImage
          src="https://images.unsplash.com/photo-1706264337427-fbd7405c3483"
          alt="Array of VR hardware devices including haptic gloves and controllers arranged on dark surface with dramatic purple and blue studio lighting, low-key industrial aesthetic"
          fill
          className="object-cover"
          priority />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-40 pb-16 w-full">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <p className="text-sm font-mono font-semibold uppercase tracking-widest text-accent mb-3">
              Hardware Guide
            </p>
            <h1 className="text-hero-xl font-extrabold text-white leading-none mb-4">
              Key Haptic
              <br />
              Hardware
            </h1>
            <p className="text-white/70 text-lg max-w-xl leading-relaxed">
              From consumer-grade controllers to enterprise-level haptic suits — the devices transforming virtual touch into physical sensation.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="glass-card rounded-xl px-4 py-3 border border-white/10">
              <p className="text-white/50 text-xs font-mono uppercase tracking-wider">Devices covered</p>
              <p className="text-white font-bold text-2xl font-mono">6</p>
            </div>
            <div className="glass-card rounded-xl px-4 py-3 border border-white/10">
              <p className="text-white/50 text-xs font-mono uppercase tracking-wider">Price range</p>
              <p className="text-white font-bold text-2xl font-mono">$50–$5k</p>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mt-8 text-white/40 text-sm">
          <Link href="/" className="hover:text-white/70 transition-colors flex items-center gap-1">
            <Icon name="HomeIcon" size={14} />
            How It Works
          </Link>
          <Icon name="ChevronRightIcon" size={14} />
          <span className="text-white/70">Key Hardware</span>
        </div>
      </div>
    </section>);

}