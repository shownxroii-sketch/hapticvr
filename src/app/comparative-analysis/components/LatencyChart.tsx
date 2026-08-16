'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';
import Icon from '@/components/ui/AppIcon';


const latencyData = [
  { device: 'Valve Index', latency: 5, color: '#7C3AED' },
  { device: 'Meta Quest 3', latency: 8, color: '#7C3AED' },
  { device: 'HaptX G1', latency: 10, color: '#7C3AED' },
  { device: 'OWO Skin', latency: 10, color: '#7C3AED' },
  { device: 'Teslasuit', latency: 12, color: '#7C3AED' },
  { device: 'bHaptics X40', latency: 15, color: '#A78BFA' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-xl">
        <p className="text-foreground font-semibold text-sm mb-1">{label}</p>
        <p className="text-accent font-mono font-bold">{payload[0].value}ms latency</p>
        {payload[0].value <= 20 && (
          <p className="text-emerald-500 text-xs mt-1">✓ Below 20ms threshold</p>
        )}
      </div>
    );
  }
  return null;
};

export default function LatencyChart() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-surface-dark noise-overlay relative overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 blob-primary opacity-15" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-sm font-mono font-semibold uppercase tracking-widest text-accent mb-3">
              Latency Benchmark
            </p>
            <h2 className="text-section-title font-extrabold text-white">
              End-to-end latency
            </h2>
            <p className="text-white/60 mt-2 max-w-md">
              All tested devices fall below the 20ms human perception threshold — the point where artificial haptics become indistinguishable from real touch.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-white/60 text-sm">Device latency</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-red-400 border-dashed border-t border-red-400" />
              <span className="text-white/60 text-sm">20ms threshold</span>
            </div>
          </div>
        </div>

        {isVisible && (
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <ResponsiveContainer width="100%" height={340}>
              <BarChart
                data={latencyData}
                margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                barCategoryGap="35%"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                  vertical={false}
                />
                <XAxis
                  dataKey="device"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'var(--font-jetbrains-mono)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'var(--font-jetbrains-mono)' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}ms`}
                  domain={[0, 25]}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine
                  y={20}
                  stroke="#F87171"
                  strokeDasharray="6 3"
                  label={{
                    value: '20ms perception threshold',
                    fill: '#F87171',
                    fontSize: 11,
                    fontFamily: 'var(--font-jetbrains-mono)',
                    position: 'insideTopRight',
                  }}
                />
                <Bar dataKey="latency" radius={[6, 6, 0, 0]}>
                  {latencyData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} opacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Insight callouts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {[
            {
              title: 'All pass the threshold',
              body: 'Every device tested achieves sub-20ms — the minimum for believable haptic illusion.',
              icon: 'CheckBadgeIcon',
              color: 'text-emerald-400',
            },
            {
              title: 'Wired = faster',
              body: 'Wired devices (Valve Index) show 3–10ms advantage over Bluetooth equivalents.',
              icon: 'BoltIcon',
              color: 'text-accent',
            },
            {
              title: 'Complexity costs latency',
              body: 'Full-body suits with thermal feedback add 2–5ms vs. single-zone systems.',
              icon: 'ChartBarIcon',
              color: 'text-yellow-400',
            },
          ].map((insight) => (
            <div key={insight.title} className="glass-card rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Icon name={insight.icon as any} size={18} className={insight.color} />
                <h3 className="text-white font-semibold text-sm">{insight.title}</h3>
              </div>
              <p className="text-white/50 text-xs leading-relaxed">{insight.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}