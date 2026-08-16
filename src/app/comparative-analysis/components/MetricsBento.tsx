'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

// BENTO GRID AUDIT:
// Array has 5 cards: [Best Latency, Coverage Range, Price Spread, Avg Fidelity, Winner Overall]
// 3-col grid:
// Row 1: [col-1: Best Latency cs-1] [col-2: Coverage Range cs-1] [col-3: Price Spread cs-1]
// Row 2: [col-1-2: Avg Fidelity cs-2] [col-3: Winner Overall cs-1]
// Placed 5/5 cards ✓

const metrics = [
  {
    label: 'Best Latency',
    value: 5,
    suffix: 'ms',
    detail: 'Valve Index Controllers',
    icon: 'BoltIcon',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    description: 'Lowest recorded end-to-end haptic latency among tested devices',
  },
  {
    label: 'Coverage Range',
    value: 68,
    suffix: ' zones',
    detail: 'Teslasuit Full Body',
    icon: 'MapPinIcon',
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
    description: 'Maximum haptic coverage zones in a single wearable system',
  },
  {
    label: 'Price Spread',
    value: 399,
    suffix: '+',
    detail: 'OWO to Teslasuit',
    icon: 'CurrencyDollarIcon',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    description: 'Consumer entry point in USD for body haptic systems',
  },
];

export default function MetricsBento() {
  const [counters, setCounters] = useState([0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            metrics.forEach((metric, i) => {
              animateCounter(i, metric.value);
            });
          }
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const animateCounter = (index: number, target: number) => {
    const duration = 1800;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      setCounters((prev) => {
        const next = [...prev];
        next[index] = current;
        return next;
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-background relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 blob-accent opacity-5" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-sm font-mono font-semibold uppercase tracking-widest text-accent mb-3">
            Key Metrics
          </p>
          <h2 className="text-section-title font-extrabold text-foreground">
            What the numbers reveal
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Row 1: Three metric cards */}
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`stagger-child glass-card-light rounded-2xl border p-7 ${metric.border}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${metric.bg}`}>
                <Icon name={metric.icon as any} size={22} className={metric.color} />
              </div>
              <p className="text-muted-foreground text-xs font-mono uppercase tracking-wider mb-2">
                {metric.label}
              </p>
              <div className="counter-num mb-1">
                {counters[i]}{metric.suffix}
              </div>
              <p className="text-foreground font-semibold text-sm mb-1">{metric.detail}</p>
              <p className="text-muted-foreground text-xs leading-relaxed">{metric.description}</p>
            </div>
          ))}

          {/* Row 2, col-span-2: Fidelity breakdown */}
          <div
            ref={(el) => { cardRefs.current[3] = el; }}
            className="stagger-child md:col-span-2 glass-card-light rounded-2xl border border-border p-7"
            style={{ transitionDelay: '300ms' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <Icon name="ChartBarIcon" size={22} className="text-violet-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs font-mono uppercase tracking-wider">Fidelity Scores</p>
                <h3 className="font-bold text-foreground">Haptic Fidelity by Category</h3>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Finger-level precision', score: 95, device: 'HaptX G1' },
                { label: 'Full-body coverage', score: 88, device: 'Teslasuit' },
                { label: 'Consumer accessibility', score: 72, device: 'bHaptics X40' },
                { label: 'Novel sensation types', score: 80, device: 'OWO Skin' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-44 flex-shrink-0">
                    <p className="text-foreground text-sm font-medium">{item.label}</p>
                    <p className="text-muted-foreground text-xs">{item.device}</p>
                  </div>
                  <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-violet-400"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <span className="font-mono font-bold text-accent text-sm w-10 text-right">{item.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2, col-span-1: Winner card */}
          <div
            ref={(el) => { cardRefs.current[4] = el; }}
            className="stagger-child glass-card-light rounded-2xl border border-accent/30 p-7 flex flex-col justify-between bg-gradient-to-br from-accent/5 to-transparent"
            style={{ transitionDelay: '400ms' }}
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-accent/15 flex items-center justify-center mb-4">
                <Icon name="TrophyIcon" size={22} className="text-accent" />
              </div>
              <p className="text-muted-foreground text-xs font-mono uppercase tracking-wider mb-2">
                Best Overall
              </p>
              <h3 className="text-foreground font-extrabold text-xl mb-3">
                HaptX Gloves G1
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Unmatched finger-level fidelity, lowest latency among gloves, and the most comprehensive haptic SDK. The reference standard for research and enterprise VR.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex justify-between">
                <div>
                  <p className="text-muted-foreground text-xs">Fidelity Score</p>
                  <p className="font-mono font-bold text-accent">95/100</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Latency</p>
                  <p className="font-mono font-bold text-emerald-500">10ms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}