'use client';

import React, { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface TrendCard {
  year: string;
  icon: string;
  title: string;
  category: string;
  description: string;
  readiness: number;
  tags: string[];
}

interface ResearchArea {
  title: string;
  institution: string;
  description: string;
  icon: string;
}

const trends: TrendCard[] = [
  {
    year: '2025–2027',
    icon: '🧤',
    title: 'Soft Robotics Haptic Gloves',
    category: 'Hardware',
    description: 'Pneumatic soft actuators replace rigid motors, enabling lightweight gloves that simulate grip resistance, texture, and temperature simultaneously.',
    readiness: 72,
    tags: ['Pneumatics', 'Soft Robotics', 'Wearables'],
  },
  {
    year: '2026–2028',
    icon: '🧠',
    title: 'Neural Interface Haptics',
    category: 'Neuroscience',
    description: 'Non-invasive transcutaneous electrical nerve stimulation (TENS) arrays bypass skin receptors to directly stimulate peripheral nerves for richer sensation.',
    readiness: 45,
    tags: ['TENS', 'Neural', 'Non-invasive'],
  },
  {
    year: '2025–2026',
    icon: '🌊',
    title: 'Mid-Air Ultrasound Haptics',
    category: 'Physics',
    description: 'Phased arrays of ultrasonic transducers create tactile sensations in free air without any wearable device — touch without touching.',
    readiness: 68,
    tags: ['Ultrasound', 'Contactless', 'Phased Array'],
  },
  {
    year: '2027–2030',
    icon: '🤖',
    title: 'AI-Generated Haptic Textures',
    category: 'AI / ML',
    description: 'Generative AI models trained on tactile datasets synthesize realistic haptic feedback patterns for any virtual surface in real time.',
    readiness: 38,
    tags: ['Generative AI', 'Texture Synthesis', 'Real-time'],
  },
  {
    year: '2026–2029',
    icon: '🌡️',
    title: 'Thermal Haptic Feedback',
    category: 'Sensory',
    description: 'Peltier element arrays embedded in gloves and suits deliver precise temperature gradients — feel the warmth of fire or cold of ice in VR.',
    readiness: 55,
    tags: ['Peltier', 'Temperature', 'Multi-modal'],
  },
  {
    year: '2028–2032',
    icon: '💊',
    title: 'Haptic Feedback in Medical VR',
    category: 'Healthcare',
    description: 'Surgical training simulators with sub-millimeter force feedback will allow medical students to practice procedures with realistic tissue resistance.',
    readiness: 60,
    tags: ['Medical', 'Force Feedback', 'Training'],
  },
  {
    year: '2027–2031',
    icon: '🏫',
    title: 'Classroom Haptic Labs',
    category: 'Education',
    description: 'Affordable shared haptic kits for schools enable students to feel molecular bonds, historical artifacts, and scientific phenomena hands-on.',
    readiness: 42,
    tags: ['Education', 'Affordable', 'STEM'],
  },
  {
    year: '2029–2035',
    icon: '🌐',
    title: 'Full-Body Haptic Metaverse',
    category: 'Metaverse',
    description: 'Lightweight full-body haptic suits with 1000+ actuators enable complete physical presence in shared virtual worlds for work, education, and play.',
    readiness: 22,
    tags: ['Full-body', 'Metaverse', 'Social VR'],
  },
];

const researchAreas: ResearchArea[] = [
  {
    title: 'Electrotactile Stimulation',
    institution: 'MIT Media Lab',
    description: 'Micro-electrode arrays on fingertips that stimulate nerve endings electrically to simulate fine textures at 1mm resolution.',
    icon: '⚡',
  },
  {
    title: 'Magnetorheological Fluids',
    institution: 'Stanford HCI Group',
    description: 'Smart fluids that change viscosity under magnetic fields, enabling variable resistance in haptic interfaces for realistic material simulation.',
    icon: '🧲',
  },
  {
    title: 'Shape Memory Alloys',
    institution: 'ETH Zurich',
    description: 'Nitinol wires that contract when heated, creating muscle-like actuation in ultra-thin haptic wearables with high force-to-weight ratios.',
    icon: '🔩',
  },
  {
    title: 'Haptic Rendering Algorithms',
    institution: 'Carnegie Mellon University',
    description: 'Physics-based algorithms that compute realistic contact forces between virtual objects in under 1ms for seamless haptic-visual synchronization.',
    icon: '💻',
  },
];

const timeline = [
  { year: '2024', label: 'Now', desc: 'Vibrotactile gloves, basic force feedback, $500–$5K devices', color: '#7C3AED' },
  { year: '2026', label: 'Near', desc: 'Soft robotics gloves, ultrasound mid-air haptics, AI texture synthesis', color: '#A78BFA' },
  { year: '2028', label: 'Mid', desc: 'Neural interface haptics, thermal feedback suits, medical VR training', color: '#C4B5FD' },
  { year: '2030', label: 'Far', desc: 'Classroom haptic labs, full-body suits under $500, metaverse presence', color: '#DDD6FE' },
  { year: '2035+', label: 'Future', desc: 'Direct neural haptics, photorealistic touch, seamless physical-digital merge', color: '#EDE9FE' },
];

function TrendCardComponent({ trend, index }: { trend: TrendCard; index: number }) {
  const [visible, setVisible] = useState(false);
  const [barWidth, setBarWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setVisible(true);
            setBarWidth(trend.readiness);
          }, index * 70);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index, trend.readiness]);

  return (
    <div
      ref={ref}
      className={`glass-card rounded-2xl p-6 hardware-card transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{trend.icon}</span>
        <span className="text-xs font-mono-data text-accent/70 bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
          {trend.year}
        </span>
      </div>
      <div className="mb-1">
        <span className="text-xs text-white/40 uppercase tracking-widest font-mono-data">{trend.category}</span>
      </div>
      <h3 className="text-white font-bold text-lg mb-3 leading-tight">{trend.title}</h3>
      <p className="text-white/55 text-sm leading-relaxed mb-5">{trend.description}</p>

      {/* Readiness bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-white/40">Technology Readiness</span>
          <span className="text-xs font-mono-data font-bold text-accent">{trend.readiness}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent to-violet-400 transition-all duration-1000 ease-out"
            style={{ width: `${barWidth}%` }}
          />
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {trend.tags.map((tag) => (
          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function FutureTrendsPage() {
  const [timelineVisible, setTimelineVisible] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimelineVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (timelineRef.current) observer.observe(timelineRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main className="bg-surface-dark min-h-screen">
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden animated-gradient-bg noise-overlay">
          <div className="absolute inset-0 pointer-events-none">
            <div className="blob-primary absolute w-[600px] h-[600px] opacity-25 -top-32 left-1/4" />
            <div className="blob-accent absolute w-[400px] h-[400px] opacity-15 bottom-0 right-0" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-accent/30 text-accent text-sm font-medium mb-8">
              <span>🚀</span>
              <span>What&apos;s Coming Next</span>
            </div>
            <h1 className="text-hero-xl font-extrabold text-white mb-6 glow-text">
              Future Trends in<br />
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                Haptic VR
              </span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed">
              Explore the emerging technologies, research breakthroughs, and roadmap that will transform how we feel virtual worlds — from lab to classroom.
            </p>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { value: '8', label: 'Emerging Trends', suffix: '' },
                { value: '2035', label: 'Full Neural Haptics', suffix: '' },
                { value: '4', label: 'Research Frontiers', suffix: '' },
                { value: '10B', label: 'Market by 2030', suffix: '$+' },
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

        {/* Timeline */}
        <section className="py-20 px-6 bg-surface-dark-2">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-section-title font-bold text-white mb-3">Technology Roadmap</h2>
              <p className="text-white/50 max-w-xl mx-auto">A projected timeline of haptic VR milestones from today to the next decade.</p>
            </div>
            <div ref={timelineRef} className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-violet-500/50 to-transparent" />
              <div className="space-y-10">
                {timeline.map((item, i) => (
                  <div
                    key={item.year}
                    className={`relative flex items-start gap-6 md:gap-0 transition-all duration-700 ${
                      timelineVisible ? 'opacity-100 translate-x-0' : i % 2 === 0 ? 'opacity-0 -translate-x-8' : 'opacity-0 translate-x-8'
                    }`}
                    style={{ transitionDelay: `${i * 120}ms` }}
                  >
                    {/* Dot */}
                    <div
                      className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full border-2 border-accent -translate-x-1/2 mt-1 z-10"
                      style={{ backgroundColor: item.color }}
                    />
                    {/* Content — alternating sides on desktop */}
                    <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                      <div className="glass-card rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-2 md:justify-end" style={i % 2 !== 0 ? { justifyContent: 'flex-start' } : {}}>
                          <span className="font-mono-data font-bold text-lg" style={{ color: item.color }}>{item.year}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/40">{item.label}</span>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trend Cards Grid */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-section-title font-bold text-white mb-3">Emerging Technologies</h2>
              <p className="text-white/50 max-w-xl mx-auto">Eight breakthrough technologies shaping the next generation of haptic VR experiences.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {trends.map((trend, i) => (
                <TrendCardComponent key={trend.title} trend={trend} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Research Frontiers */}
        <section className="py-20 px-6 bg-surface-dark-2">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-section-title font-bold text-white mb-3">Active Research Frontiers</h2>
              <p className="text-white/50 max-w-xl mx-auto">Cutting-edge research from leading universities driving the next wave of haptic innovation.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {researchAreas.map((area, i) => (
                <div
                  key={area.title}
                  className="glass-card rounded-2xl p-7 hardware-card"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{area.icon}</span>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">{area.title}</h3>
                      <span className="text-xs text-accent/70 font-mono-data">{area.institution}</span>
                      <p className="text-white/55 text-sm leading-relaxed mt-3">{area.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Educational CTA */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-card rounded-3xl p-10 md:p-14 border border-accent/20 glow-accent">
              <span className="text-5xl mb-6 block">🎓</span>
              <h2 className="text-section-title font-bold text-white mb-4">Be Part of the Future</h2>
              <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                The technologies on this page are being built right now by researchers, engineers, and designers — many of whom started exactly where you are: as curious students. The field of haptic VR needs new minds to solve its hardest problems.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: '📖', title: 'Study Haptics', desc: 'Explore IEEE Transactions on Haptics and ACM CHI for the latest research papers.' },
                  { icon: '🛠️', title: 'Build Prototypes', desc: 'Arduino + vibration motors let you prototype basic haptic feedback for under $30.' },
                  { icon: '🤝', title: 'Join Communities', desc: 'IEEE Technical Committee on Haptics and open-source haptics projects welcome students.' },
                ].map((item) => (
                  <div key={item.title} className="bg-white/5 rounded-2xl p-5 text-left">
                    <span className="text-2xl mb-3 block">{item.icon}</span>
                    <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                    <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
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
