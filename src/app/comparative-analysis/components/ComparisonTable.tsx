'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

type Criterion = 'latency' | 'coverage' | 'price' | 'fidelity' | 'ease' | 'compatibility' | 'battery' | 'weight';

const devices = [
  {
    name: 'HaptX G1',
    short: 'HaptX',
    latency: 5,
    coverage: 5,
    price: 1,
    fidelity: 5,
    ease: 2,
    compatibility: 3,
    battery: 3,
    weight: 2,
  },
  {
    name: 'bHaptics X40',
    short: 'bHaptics',
    latency: 3,
    coverage: 4,
    price: 4,
    fidelity: 3,
    ease: 5,
    compatibility: 5,
    battery: 4,
    weight: 3,
  },
  {
    name: 'Valve Index',
    short: 'Valve',
    latency: 5,
    coverage: 2,
    price: 4,
    fidelity: 4,
    ease: 4,
    compatibility: 4,
    battery: 2,
    weight: 5,
  },
  {
    name: 'Meta Quest 3',
    short: 'Meta',
    latency: 4,
    coverage: 2,
    price: 4,
    fidelity: 3,
    ease: 5,
    compatibility: 4,
    battery: 4,
    weight: 5,
  },
  {
    name: 'Teslasuit',
    short: 'Tesla',
    latency: 4,
    coverage: 5,
    price: 1,
    fidelity: 5,
    ease: 1,
    compatibility: 2,
    battery: 3,
    weight: 1,
  },
  {
    name: 'OWO Skin',
    short: 'OWO',
    latency: 4,
    coverage: 3,
    price: 4,
    fidelity: 4,
    ease: 4,
    compatibility: 4,
    battery: 4,
    weight: 4,
  },
];

const criteria: { key: Criterion; label: string; icon: string; description: string }[] = [
  { key: 'latency', label: 'Latency', icon: 'BoltIcon', description: 'Signal-to-sensation speed' },
  { key: 'coverage', label: 'Coverage', icon: 'MapPinIcon', description: 'Body area covered' },
  { key: 'price', label: 'Value', icon: 'CurrencyDollarIcon', description: 'Cost-to-performance ratio' },
  { key: 'fidelity', label: 'Fidelity', icon: 'StarIcon', description: 'Sensation realism quality' },
  { key: 'ease', label: 'Ease of Use', icon: 'HandRaisedIcon', description: 'Setup & daily usability' },
  { key: 'compatibility', label: 'Compatibility', icon: 'PuzzlePieceIcon', description: 'Platform & game support' },
  { key: 'battery', label: 'Battery', icon: 'BatteryHalfIcon', description: 'Wireless endurance' },
  { key: 'weight', label: 'Comfort', icon: 'ScaleIcon', description: 'Wearability & weight' },
];

function ScoreDots({ score }: { score: number }) {
  return (
    <div className="flex gap-1 justify-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i < score ? 'bg-accent' : 'bg-muted'
          }`}
        />
      ))}
    </div>
  );
}

export default function ComparisonTable() {
  const [highlight, setHighlight] = useState<Criterion | null>(null);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-sm font-mono font-semibold uppercase tracking-widest text-accent mb-3">
            Full Matrix
          </p>
          <h2 className="text-section-title font-extrabold text-foreground mb-3">
            8-criteria comparison
          </h2>
          <p className="text-muted-foreground">
            Click a criterion column to highlight the winner. Scores are 1–5 (5 = best).
          </p>
        </div>

        {/* Criteria legend */}
        <div className="flex flex-wrap gap-2 mb-6">
          {criteria.map((c) => (
            <button
              key={c.key}
              onClick={() => setHighlight(highlight === c.key ? null : c.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                highlight === c.key
                  ? 'bg-accent text-white border-accent' :'border-border text-muted-foreground hover:border-accent/40 hover:text-foreground'
              }`}
            >
              <Icon name={c.icon as any} size={13} />
              {c.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
          <table className="comparison-table w-full min-w-[800px] bg-card">
            <thead>
              <tr className="bg-secondary/50">
                <th className="text-left px-5 py-4 text-sm font-semibold text-foreground w-36">Device</th>
                {criteria.map((c) => (
                  <th
                    key={c.key}
                    className={`px-3 py-4 text-center cursor-pointer transition-colors ${
                      highlight === c.key ? 'bg-accent/10' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setHighlight(highlight === c.key ? null : c.key)}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <Icon
                        name={c.icon as any}
                        size={16}
                        className={highlight === c.key ? 'text-accent' : 'text-muted-foreground'}
                      />
                      <span className={`text-xs font-semibold ${highlight === c.key ? 'text-accent' : 'text-muted-foreground'}`}>
                        {c.label}
                      </span>
                    </div>
                  </th>
                ))}
                <th className="text-center px-3 py-4 text-xs font-semibold text-muted-foreground">Total</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device, di) => {
                const total = criteria.reduce((sum, c) => sum + device[c.key], 0);
                return (
                  <tr key={device.name} className="group hover:bg-secondary/30 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-semibold text-sm text-foreground">{device.name}</span>
                    </td>
                    {criteria.map((c) => {
                      const score = device[c.key];
                      const isMax = devices.every((d) => d[c.key] <= score);
                      return (
                        <td
                          key={c.key}
                          className={`px-3 py-4 text-center transition-colors ${
                            highlight === c.key ? 'bg-accent/5' : ''
                          }`}
                        >
                          <div className="flex flex-col items-center gap-1">
                            <ScoreDots score={score} />
                            {isMax && highlight === c.key && (
                              <Icon name="TrophyIcon" size={12} className="text-accent" />
                            )}
                          </div>
                        </td>
                      );
                    })}
                    <td className="px-3 py-4 text-center">
                      <span className="font-mono font-bold text-accent">{total}</span>
                      <span className="text-muted-foreground text-xs">/40</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-muted-foreground text-xs font-mono mt-4 text-center">
          Scores based on editorial assessment of manufacturer specs, user reviews, and academic benchmarks (2026).
        </p>
      </div>
    </section>
  );
}