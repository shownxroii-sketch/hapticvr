'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

// BENTO GRID AUDIT:
// Array has 4 cards: [Signal Chain, Actuator Types, Feedback Loop, Latency Window]
// Row 1: [col-1: Signal Chain cs-2 rs-1] [col-3: Actuator Types cs-1 rs-1]
// Row 2: [col-1: Feedback Loop cs-1 rs-1] [col-2-3: Latency Window cs-2 rs-1]
// Placed 4/4 cards ✓

export default function ProcessBento() {
  const bentoRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-surface-dark relative overflow-hidden noise-overlay">
      {/* Atmospheric blobs */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 w-80 h-80 blob-primary opacity-20" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-96 h-96 blob-accent opacity-10" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-sm font-mono font-semibold uppercase tracking-widest text-accent mb-3">
            Core Mechanics
          </p>
          <h2 className="text-section-title font-extrabold text-white">
            Inside the haptic pipeline
          </h2>
        </div>

        {/* Bento grid — 3 cols */}
        <div ref={bentoRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Card 1: Signal Chain — col-span-2 */}
          {/* [col-1-2: Signal Chain cs-2 rs-1] */}
          <div
            ref={(el) => {cardRefs.current[0] = el;}}
            className="stagger-child md:col-span-2 glass-card rounded-2xl overflow-hidden relative min-h-64"
            style={{ transitionDelay: '0ms' }}>
            
            <AppImage
              src="https://images.unsplash.com/photo-1656454300703-889c028be15e"
              alt="Circuit board close-up with glowing purple and blue traces in dark atmospheric lighting, electronic components"
              fill
              className="object-cover opacity-25" />
            
            <div className="relative z-10 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Icon name="SignalIcon" size={20} className="text-accent" />
                </div>
                <h3 className="text-white font-bold text-xl">Signal Chain</h3>
              </div>
              <p className="text-white/70 leading-relaxed mb-6 max-w-lg">
                Every haptic event begins as a game engine trigger. The signal travels: 
                Game Engine → Haptic SDK → Driver → USB/BT → Actuator Controller → Motor.
                Modern SDKs like Immersion TouchSense handle all encoding automatically.
              </p>
              {/* Signal flow visual */}
              <div className="flex items-center gap-2 flex-wrap">
                {['Game Event', 'SDK', 'Driver', 'Wireless', 'Actuator', 'Sensation'].map((step, i) =>
                <React.Fragment key={step}>
                    <span className="px-3 py-1.5 rounded-lg bg-accent/20 text-accent text-xs font-mono font-semibold border border-accent/30">
                      {step}
                    </span>
                    {i < 5 &&
                  <Icon name="ArrowRightIcon" size={14} className="text-white/30 flex-shrink-0" />
                  }
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Actuator Types — col-span-1 */}
          {/* [col-3: Actuator Types cs-1 rs-1] */}
          <div
            ref={(el) => {cardRefs.current[1] = el;}}
            className="stagger-child glass-card rounded-2xl p-7 flex flex-col justify-between min-h-64"
            style={{ transitionDelay: '80ms' }}>
            
            <div>
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4">
                <Icon name="AdjustmentsHorizontalIcon" size={20} className="text-violet-400" />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Actuator Types</h3>
              <div className="space-y-3">
                {[
                { name: 'ERM Motors', detail: 'Low cost, broad vibration', color: 'bg-yellow-400' },
                { name: 'LRA Actuators', detail: 'Precise, low latency', color: 'bg-accent' },
                { name: 'Piezoelectric', detail: 'Ultra-fast, high fidelity', color: 'bg-emerald-400' },
                { name: 'Pneumatic', detail: 'Force simulation, complex', color: 'bg-rose-400' }].
                map((act) =>
                <div key={act.name} className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${act.color}`} />
                    <div>
                      <span className="text-white text-sm font-semibold">{act.name}</span>
                      <span className="text-white/50 text-xs ml-2">{act.detail}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Waveform visual */}
            <div className="flex items-end gap-1 h-10 mt-4">
              {Array.from({ length: 8 }).map((_, i) =>
              <div
                key={i}
                className="wave-bar flex-1 bg-accent rounded-sm"
                style={{
                  height: `${30 + Math.sin(i * 0.8) * 20}%`,
                  minHeight: '20%',
                  maxHeight: '100%'
                }} />

              )}
            </div>
          </div>

          {/* Card 3: Feedback Loop — col-span-1 */}
          {/* [col-1: Feedback Loop cs-1 rs-1] */}
          <div
            ref={(el) => {cardRefs.current[2] = el;}}
            className="stagger-child glass-card rounded-2xl p-7 flex flex-col justify-between min-h-56"
            style={{ transitionDelay: '160ms' }}>
            
            <div>
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center mb-4">
                <Icon name="ArrowPathIcon" size={20} className="text-pink-400" />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Feedback Loop</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Closed-loop haptics use sensor data to dynamically adjust vibration intensity. 
                Force sensors on fingertips feed back real-time grip data to modulate actuator output.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-pink-500 to-accent" />
              </div>
              <span className="text-xs font-mono text-white/50">75% fidelity</span>
            </div>
          </div>

          {/* Card 4: Latency Window — col-span-2 */}
          {/* [col-2-3: Latency Window cs-2 rs-1] */}
          <div
            ref={(el) => {cardRefs.current[3] = el;}}
            className="stagger-child md:col-span-2 glass-card rounded-2xl p-7 min-h-56"
            style={{ transitionDelay: '240ms' }}>
            
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Icon name="ClockIcon" size={20} className="text-emerald-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">Latency Window</h3>
                <p className="text-white/50 text-xs font-mono">Human perception threshold: ~20ms</p>
              </div>
            </div>
            {/* Latency bar chart */}
            <div className="space-y-3">
              {[
              { label: 'Game engine event', ms: 1, max: 20, color: 'bg-accent' },
              { label: 'Wireless transmission', ms: 7, max: 20, color: 'bg-violet-400' },
              { label: 'Actuator spin-up', ms: 5, max: 20, color: 'bg-pink-400' },
              { label: 'Total end-to-end', ms: 13, max: 20, color: 'bg-emerald-400' }].
              map((item) =>
              <div key={item.label} className="flex items-center gap-3">
                  <span className="text-white/60 text-xs font-mono w-40 flex-shrink-0">{item.label}</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${item.ms / item.max * 100}%` }} />
                  
                  </div>
                  <span className="text-white font-mono font-bold text-sm w-12 text-right">{item.ms}ms</span>
                </div>
              )}
            </div>
            <p className="text-white/40 text-xs font-mono mt-4">
              ✓ Below 20ms threshold — tactile illusion maintained
            </p>
          </div>
        </div>
      </div>
    </section>);

}