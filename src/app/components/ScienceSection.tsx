'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const sciencePoints = [
  {
    icon: 'CpuChipIcon',
    label: 'Game Engine Signal',
    description:
      'When a virtual object collides or a surface is touched, the game engine generates a haptic event — a data packet encoding intensity, duration, and location.',
    stat: '< 1ms',
    statLabel: 'signal generation',
  },
  {
    icon: 'WifiIcon',
    label: 'Wireless Transmission',
    description:
      'The haptic signal travels via Bluetooth 5.2 or USB-C to the haptic controller, maintaining sub-20ms total latency for a believable tactile illusion.',
    stat: '5–8ms',
    statLabel: 'transmission lag',
  },
  {
    icon: 'BoltIcon',
    label: 'Actuator Activation',
    description:
      'Eccentric Rotating Mass (ERM) or Linear Resonant Actuator (LRA) motors convert electrical signals into precise mechanical vibrations on the skin surface.',
    stat: '200Hz',
    statLabel: 'max frequency',
  },
  {
    icon: 'HandRaisedIcon',
    label: 'Somatosensory Perception',
    description:
      'Mechanoreceptors in the skin — Meissner corpuscles, Merkel discs, Pacinian corpuscles — detect vibration and pressure, sending signals to the somatosensory cortex.',
    stat: '4 types',
    statLabel: 'mechanoreceptors',
  },
];

export default function ScienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="science"
      ref={sectionRef}
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Subtle background blobs */}
      <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 blob-accent opacity-5" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-72 h-72 blob-primary opacity-5" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 grid gap-5 md:grid-cols-2 items-end">
          <div>
            <p className="text-sm font-mono font-semibold uppercase tracking-widest text-accent mb-3">
              The Science
            </p>
            <h2 className="text-section-title font-extrabold text-foreground">
              How your brain gets fooled
            </h2>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Haptic feedback exploits the nervous system&apos;s inability to distinguish real touch from precisely timed mechanical vibrations — a phenomenon called somatosensory substitution.
          </p>
        </div>

        {/* Science points grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {sciencePoints.map((point, i) => (
            <div
              key={point.label}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="stagger-child glass-card-light rounded-2xl p-7 group hover:border-accent/30 transition-colors"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Icon name={point.icon as any} size={22} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                    Step {i + 1}
                  </p>
                  <h3 className="text-card-title font-bold text-foreground">{point.label}</h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-5">{point.description}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <span className="font-mono font-bold text-accent text-lg">{point.stat}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{point.statLabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* YouTube Reference Video */}
        <div className="mt-16">
          <div className="mb-6">
            <p className="text-sm font-mono font-semibold uppercase tracking-widest text-accent mb-2">
              Reference Video
            </p>
            <h3 className="text-2xl font-bold text-foreground">
              See the science in action
            </h3>
            <p className="text-muted-foreground mt-2 text-base leading-relaxed">
              Watch how haptic feedback technology works in real VR environments — from signal generation to tactile perception.
            </p>
          </div>
          <div className="relative w-full rounded-2xl overflow-hidden border border-border glass-card-light" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/KGDWtPeMpDs?si=-or4mkqE-mmFSaly"
              title="Haptic Feedback in VR — Reference Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}