'use client';

import React, { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface LimitationCard {
  icon: string;
  title: string;
  category: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  details: string[];
}

interface BarData {
  label: string;
  value: number;
  color: string;
}

const limitations: LimitationCard[] = [
  {
    icon: '💰',
    title: 'High Cost Barrier',
    category: 'Economic',
    description: 'Advanced haptic VR systems remain prohibitively expensive for most students and educational institutions.',
    impact: 'High',
    details: [
      'Full-body haptic suits cost $5,000–$20,000+',
      'Haptic gloves range from $500–$5,000',
      'Maintenance and calibration add ongoing costs',
      'Limited availability in school budgets',
    ],
  },
  {
    icon: '⚡',
    title: 'Latency & Lag Issues',
    category: 'Technical',
    description: 'Signal processing delays between virtual events and physical sensations break immersion and cause disorientation.',
    impact: 'High',
    details: [
      'Human perception threshold: ~20ms',
      'Current systems average 30–80ms latency',
      'Wireless transmission adds extra delay',
      'Complex simulations worsen lag significantly',
    ],
  },
  {
    icon: '🔋',
    title: 'Battery & Power Constraints',
    category: 'Technical',
    description: 'Wearable haptic devices drain power rapidly, limiting session duration and portability.',
    impact: 'Medium',
    details: [
      'Haptic gloves last 2–4 hours per charge',
      'Full-body suits require tethered power',
      'Actuator density increases power draw',
      'Heat generation causes user discomfort',
    ],
  },
  {
    icon: '🎯',
    title: 'Limited Tactile Resolution',
    category: 'Sensory',
    description: 'Current actuator technology cannot replicate the full range of human touch sensations with precision.',
    impact: 'High',
    details: [
      'Human skin has ~17,000 touch receptors per hand',
      'Best gloves have ~130 actuators per hand',
      'Texture simulation remains coarse',
      'Temperature feedback largely absent',
    ],
  },
  {
    icon: '🏋️',
    title: 'Bulky & Uncomfortable Hardware',
    category: 'Ergonomic',
    description: 'Wearable haptic devices add weight and restrict natural movement, causing fatigue during extended use.',
    impact: 'Medium',
    details: [
      'Haptic vests weigh 2–5 kg on average',
      'Rigid exoskeleton frames limit mobility',
      'Sweat and heat buildup during sessions',
      'One-size-fits-all designs cause poor fit',
    ],
  },
  {
    icon: '🤢',
    title: 'Cybersickness & Sensory Conflict',
    category: 'Health',
    description: 'Mismatches between visual, vestibular, and haptic signals cause nausea, dizziness, and disorientation.',
    impact: 'High',
    details: [
      '40–70% of VR users experience some cybersickness',
      'Haptic-visual mismatch amplifies symptoms',
      'Prolonged exposure worsens effects',
      'Individual susceptibility varies widely',
    ],
  },
  {
    icon: '🔧',
    title: 'Software & Standardization Gap',
    category: 'Software',
    description: 'No universal haptic API or standard exists, forcing developers to build device-specific integrations.',
    impact: 'Medium',
    details: [
      'Each manufacturer uses proprietary SDKs',
      'Cross-platform haptic content is rare',
      'Limited haptic authoring tools available',
      'Game engines have basic haptic support only',
    ],
  },
  {
    icon: '🧠',
    title: 'Phantom Sensation & Adaptation',
    category: 'Neurological',
    description: 'The brain adapts to repeated haptic stimuli, reducing perceived intensity and effectiveness over time.',
    impact: 'Low',
    details: [
      'Sensory adaptation occurs within minutes',
      'Phantom sensations persist after device removal',
      'Long-term neurological effects unstudied',
      'Individual adaptation rates vary greatly',
    ],
  },
];

const impactData: BarData[] = [
  { label: 'Cost Barrier', value: 92, color: '#EF4444' },
  { label: 'Tactile Resolution', value: 85, color: '#F97316' },
  { label: 'Cybersickness', value: 80, color: '#EF4444' },
  { label: 'Latency Issues', value: 78, color: '#EF4444' },
  { label: 'Battery Life', value: 62, color: '#EAB308' },
  { label: 'Ergonomics', value: 58, color: '#EAB308' },
  { label: 'Standardization', value: 55, color: '#EAB308' },
  { label: 'Sensory Adaptation', value: 35, color: '#22C55E' },
];

const impactColor = {
  High: 'bg-red-500/20 text-red-400 border border-red-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  Low: 'bg-green-500/20 text-green-400 border border-green-500/30',
};

function AnimatedBar({ bar, index }: { bar: BarData; index: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(bar.value), index * 80);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [bar.value, index]);

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm text-white/70 font-medium">{bar.label}</span>
        <span className="text-sm font-mono-data font-bold" style={{ color: bar.color }}>
          {bar.value}%
        </span>
      </div>
      <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, backgroundColor: bar.color }}
        />
      </div>
    </div>
  );
}

function LimitationCardComponent({ card, index }: { card: LimitationCard; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 60);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`glass-card rounded-2xl p-6 hardware-card transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{card.icon}</span>
          <div>
            <h3 className="text-white font-bold text-lg leading-tight">{card.title}</h3>
            <span className="text-xs text-accent/70 font-mono-data uppercase tracking-wider">{card.category}</span>
          </div>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${impactColor[card.impact]}`}>
          {card.impact} Impact
        </span>
      </div>
      <p className="text-white/60 text-sm leading-relaxed mb-4">{card.description}</p>
      <ul className="space-y-1.5">
        {card.details.map((detail, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-white/50">
            <span className="text-accent/60 mt-0.5 shrink-0">▸</span>
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function LimitationsPage() {
  return (
    <>
      <Header />
      <main className="bg-surface-dark min-h-screen">
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden animated-gradient-bg noise-overlay">
          <div className="absolute inset-0 pointer-events-none">
            <div className="blob-primary absolute w-[500px] h-[500px] opacity-20 -top-20 -left-20" />
            <div className="blob-accent absolute w-[400px] h-[400px] opacity-15 bottom-0 right-0" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-red-500/30 text-red-400 text-sm font-medium mb-8">
              <span>⚠️</span>
              <span>Current Challenges</span>
            </div>
            <h1 className="text-hero-xl font-extrabold text-white mb-6 glow-text">
              Limitations of<br />
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Haptic VR
              </span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed">
              Understanding the barriers that prevent haptic VR from reaching its full potential — from economic constraints to fundamental sensory science.
            </p>
            {/* Stats row */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { value: '8', label: 'Key Limitations', suffix: '' },
                { value: '40', label: 'Users Get Cybersick', suffix: '%+' },
                { value: '20K', label: 'Cost of Full Suit', suffix: '$+' },
                { value: '130', label: 'Actuators vs 17K Receptors', suffix: '' },
              ].map((stat) => (
                <div key={stat.label} className="glass-card rounded-2xl p-4 text-center">
                  <div className="counter-num text-3xl font-bold">
                    {stat.value}
                    <span className="text-xl">{stat.suffix}</span>
                  </div>
                  <div className="text-white/50 text-xs mt-1 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Chart */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-section-title font-bold text-white mb-3">Severity Impact Index</h2>
              <p className="text-white/50 max-w-xl mx-auto">Relative severity of each limitation on overall haptic VR adoption and user experience.</p>
            </div>
            <div className="glass-card rounded-3xl p-8 space-y-5">
              {impactData.map((bar, i) => (
                <AnimatedBar key={bar.label} bar={bar} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Limitation Cards Grid */}
        <section className="py-10 pb-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-section-title font-bold text-white mb-3">Detailed Breakdown</h2>
              <p className="text-white/50 max-w-xl mx-auto">Each limitation examined in depth — what it is, why it matters, and its real-world impact on students and educators.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {limitations.map((card, i) => (
                <LimitationCardComponent key={card.title} card={card} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Educational Note */}
        <section className="py-16 px-6 bg-surface-dark-2">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-3xl p-8 md:p-12 border border-accent/20">
              <div className="flex items-start gap-4 mb-6">
                <span className="text-4xl">📚</span>
                <div>
                  <h3 className="text-white font-bold text-2xl mb-2">For Students & Educators</h3>
                  <p className="text-white/60 leading-relaxed">
                    These limitations are not permanent roadblocks — they are active research areas. Understanding them helps you critically evaluate haptic VR claims, design better experiments, and contribute to solving real engineering challenges. Many of today&apos;s limitations will be overcome by the next generation of researchers.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {[
                  { icon: '🔬', title: 'Research Opportunity', desc: 'Each limitation is an open research problem with published literature.' },
                  { icon: '💡', title: 'Critical Thinking', desc: 'Evaluate haptic VR products by asking which limitations they address.' },
                  { icon: '🚀', title: 'Future Careers', desc: 'Engineers solving these challenges are in high demand across industries.' },
                ].map((item) => (
                  <div key={item.title} className="bg-white/5 rounded-2xl p-5">
                    <span className="text-2xl mb-3 block">{item.icon}</span>
                    <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
