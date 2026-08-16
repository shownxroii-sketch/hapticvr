'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const specs = [
  {
    name: 'HaptX Gloves G1',
    type: 'Gloves',
    latency: 10,
    coverage: 'Hands',
    points: 130,
    price: 4500,
    wireless: true,
    platform: 'SteamVR',
    weight: '450g',
  },
  {
    name: 'bHaptics TactSuit X40',
    type: 'Vest',
    latency: 15,
    coverage: 'Torso',
    points: 40,
    price: 499,
    wireless: true,
    platform: 'Multi',
    weight: '1.2kg',
  },
  {
    name: 'Valve Index Controllers',
    type: 'Controllers',
    latency: 5,
    coverage: 'Hands',
    points: 6,
    price: 279,
    wireless: false,
    platform: 'SteamVR',
    weight: '175g',
  },
  {
    name: 'Meta Quest 3',
    type: 'Controllers',
    latency: 8,
    coverage: 'Hands',
    points: 4,
    price: 499,
    wireless: true,
    platform: 'Meta OS',
    weight: '168g',
  },
  {
    name: 'Teslasuit Full Body',
    type: 'Full Suit',
    latency: 12,
    coverage: 'Full Body',
    points: 68,
    price: 19990,
    wireless: true,
    platform: 'Custom SDK',
    weight: '3.8kg',
  },
  {
    name: 'OWO Game Skin',
    type: 'Shirt',
    latency: 10,
    coverage: 'Torso',
    points: 10,
    price: 399,
    wireless: true,
    platform: 'Multi',
    weight: '380g',
  },
];

type SortKey = 'latency' | 'points' | 'price';

export default function SpecsTable() {
  const [sortKey, setSortKey] = useState<SortKey>('latency');
  const sectionRef = useRef<HTMLElement>(null);

  const sorted = [...specs].sort((a, b) => a[sortKey] - b[sortKey]);

  return (
    <section ref={sectionRef} className="py-20 bg-surface-dark noise-overlay relative overflow-hidden">
      <div className="pointer-events-none absolute top-1/3 left-1/4 w-80 h-80 blob-primary opacity-15" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-sm font-mono font-semibold uppercase tracking-widest text-accent mb-2">
              Spec Comparison
            </p>
            <h2 className="text-section-title font-extrabold text-white">
              Numbers side by side
            </h2>
          </div>
          {/* Sort controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white/50 text-xs font-mono uppercase tracking-wider">Sort by:</span>
            {(['latency', 'points', 'price'] as SortKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setSortKey(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  sortKey === key
                    ? 'bg-accent text-white' :'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 border border-white/10'
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="comparison-table w-full min-w-[700px]">
            <thead>
              <tr className="bg-white/5">
                <th className="text-left text-xs font-mono uppercase tracking-wider text-white/50 px-4 py-3">Device</th>
                <th className="text-left text-xs font-mono uppercase tracking-wider text-white/50 px-4 py-3">Type</th>
                <th className="text-right text-xs font-mono uppercase tracking-wider text-white/50 px-4 py-3">Latency</th>
                <th className="text-right text-xs font-mono uppercase tracking-wider text-white/50 px-4 py-3">Touch Points</th>
                <th className="text-left text-xs font-mono uppercase tracking-wider text-white/50 px-4 py-3">Coverage</th>
                <th className="text-center text-xs font-mono uppercase tracking-wider text-white/50 px-4 py-3">Wireless</th>
                <th className="text-right text-xs font-mono uppercase tracking-wider text-white/50 px-4 py-3">Price</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((device, i) => (
                <tr
                  key={device.name}
                  className="group hover:bg-white/5 transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="text-white font-semibold text-sm">{device.name}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-md bg-accent/15 text-accent text-xs font-mono">
                      {device.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-mono font-bold text-sm ${device.latency <= 8 ? 'text-emerald-400' : device.latency <= 12 ? 'text-yellow-400' : 'text-orange-400'}`}>
                      {device.latency}ms
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-mono text-white/80 text-sm">{device.points}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-white/70 text-sm">{device.coverage}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Icon
                      name={device.wireless ? 'CheckCircleIcon' : 'XCircleIcon'}
                      size={18}
                      className={device.wireless ? 'text-emerald-400 mx-auto' : 'text-white/30 mx-auto'}
                      variant={device.wireless ? 'solid' : 'outline'}
                    />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-mono font-bold text-white/90 text-sm">
                      ${device.price.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-white/30 text-xs font-mono mt-4 text-center">
          * Specifications based on manufacturer data as of 2026. Prices approximate.
        </p>
      </div>
    </section>
  );
}