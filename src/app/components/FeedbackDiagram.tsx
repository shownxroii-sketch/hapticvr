'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

const steps = [
{
  number: '01',
  icon: 'CursorArrowRaysIcon',
  title: 'Virtual Interaction',
  body: 'Player touches or collides with a virtual object. The physics engine calculates contact force, surface texture, and temperature properties.',
  color: 'text-violet-400',
  bg: 'bg-violet-500/15',
  border: 'border-violet-500/30'
},
{
  number: '02',
  icon: 'CodeBracketIcon',
  title: 'Haptic Encoding',
  body: 'The game engine translates physical properties into haptic descriptors using APIs like OpenHaptics or SteamVR Input — encoding waveform, amplitude, and duration.',
  color: 'text-accent',
  bg: 'bg-accent/15',
  border: 'border-accent/30'
},
{
  number: '03',
  icon: 'BoltIcon',
  title: 'Actuator Response',
  body: 'LRA or piezoelectric actuators fire at precise frequencies. Gloves can activate individual finger zones; vests can simulate hits across 24+ body points.',
  color: 'text-pink-400',
  bg: 'bg-pink-500/15',
  border: 'border-pink-500/30'
},
{
  number: '04',
  icon: 'SparklesIcon',
  title: 'Neural Perception',
  body: 'Mechanoreceptors relay signals to the brain\'s somatosensory cortex. With accurate timing, the brain accepts the artificial sensation as genuine physical touch.',
  color: 'text-emerald-400',
  bg: 'bg-emerald-500/15',
  border: 'border-emerald-500/30'
}];


export default function FeedbackDiagram() {
  const [activeStep, setActiveStep] = useState(0);
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
      { threshold: 0.15 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Auto-advance active step
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-sm font-mono font-semibold uppercase tracking-widest text-accent mb-3">
            Complete Cycle
          </p>
          <h2 className="text-section-title font-extrabold text-foreground mb-4">
            The haptic feedback loop
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From virtual event to neural sensation in under 20 milliseconds — four precisely orchestrated steps.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Steps */}
          <div className="space-y-4">
            {steps.map((step, i) =>
            <div
              key={step.number}
              ref={(el) => {itemRefs.current[i] = el;}}
              className={`stagger-child rounded-2xl border p-6 cursor-pointer transition-all duration-300 ${
              activeStep === i ?
              `${step.bg} ${step.border}` :
              'border-border hover:border-accent/20 bg-background'}`
              }
              style={{ transitionDelay: `${i * 80}ms` }}
              onClick={() => setActiveStep(i)}>
              
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${step.bg}`}>
                    <Icon name={step.icon as any} size={20} className={step.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-mono text-xs font-bold ${step.color}`}>{step.number}</span>
                      <h3 className="font-bold text-foreground">{step.title}</h3>
                    </div>
                    {activeStep === i &&
                  <p className="text-muted-foreground text-sm leading-relaxed mt-2">{step.body}</p>
                  }
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Visual */}
          <div
            ref={(el) => {itemRefs.current[4] = el;}}
            className="stagger-child relative"
            style={{ transitionDelay: '320ms' }}>
            
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-accent/20">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1a47fa888-1768055633625.png"
                alt="Haptic glove device with electronic components visible, dark background with purple lighting highlighting finger actuator nodes"
                fill
                className="object-cover" />
              
              {/* Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Active step overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className={`rounded-xl border ${steps[activeStep].border} ${steps[activeStep].bg} p-4 backdrop-blur-md`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name={steps[activeStep].icon as any} size={16} className={steps[activeStep].color} />
                    <span className={`text-sm font-bold ${steps[activeStep].color}`}>
                      {steps[activeStep].title}
                    </span>
                  </div>
                  {/* Progress dots */}
                  <div className="flex gap-1.5 mt-2">
                    {steps.map((_, i) =>
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-500 ${
                      i === activeStep ? `flex-1 ${steps[activeStep].bg.replace('/15', '')} opacity-80` : 'w-4 bg-white/20'}`
                      } />

                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -top-4 -right-4 glass-card-light rounded-2xl p-4 shadow-xl border border-accent/20">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">Total Latency</p>
              <p className="text-2xl font-mono font-bold text-accent">~13ms</p>
              <p className="text-xs text-muted-foreground">end-to-end</p>
            </div>
          </div>
        </div>
      </div>
    </section>);

}