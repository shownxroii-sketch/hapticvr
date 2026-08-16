'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';


// BENTO GRID AUDIT:
// Array has 6 cards: [HaptX Gloves, bHaptics TactSuit, Valve Index, Meta Quest Pro, Teslasuit, OWO Vest]
// 3-col grid:
// Row 1: [col-1-2: HaptX cs-2 rs-1] [col-3: bHaptics cs-1 rs-1]
// Row 2: [col-1: Valve Index cs-1 rs-1] [col-2: Meta Quest cs-1 rs-1] [col-3: Teslasuit cs-1 rs-1]
// Row 3: [col-1-3: OWO Vest cs-3 rs-1]
// Placed 6/6 cards ✓

const hardwareData = [
{
  id: 'haptx',
  name: 'HaptX Gloves G1',
  type: 'Haptic Gloves',
  price: '$4,500',
  priceRange: 'Enterprise',
  tech: 'Pneumatic microfluidic',
  coverage: 'Hands (full)',
  latency: '~10ms',
  platform: 'SteamVR, OpenXR',
  highlight: 'Industry gold standard for finger-level force feedback. 130 points of tactile feedback per glove with true force resistance up to 40N per finger.',
  badge: 'Best Fidelity',
  badgeColor: 'bg-accent text-white',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a47fa888-1768055633625.png",
  imageAlt: 'Close-up of advanced haptic glove with electronic finger nodes and wrist sensors, dark background with subtle purple glow',
  colSpan: 'md:col-span-2',
  featured: true
},
{
  id: 'bhaptics',
  name: 'bHaptics TactSuit X40',
  type: 'Haptic Vest',
  price: '$499',
  priceRange: 'Prosumer',
  tech: 'ERM vibration motors',
  coverage: 'Torso front + back',
  latency: '~15ms',
  platform: 'PC VR, Meta, PSVR2',
  highlight: '40 vibration points across chest and back. Compatible with 300+ games. Widely adopted in location-based VR entertainment.',
  badge: 'Best Value',
  badgeColor: 'bg-emerald-500 text-white',
  image: "https://images.unsplash.com/photo-1653158861306-e5b3804f6115",
  imageAlt: 'Person wearing haptic vest in dark VR gaming environment with teal and purple ambient lighting',
  colSpan: 'md:col-span-1',
  featured: false
},
{
  id: 'valve',
  name: 'Valve Index Controllers',
  type: 'Haptic Controllers',
  price: '$279',
  priceRange: 'Consumer',
  tech: 'LRA + finger tracking',
  coverage: 'Hands (grip/trigger)',
  latency: '~5ms',
  platform: 'SteamVR',
  highlight: 'Capacitive finger sensors + high-fidelity LRA haptics. Individual finger tracking without button presses.',
  badge: 'Best Controllers',
  badgeColor: 'bg-blue-500 text-white',
  image: "https://images.unsplash.com/photo-1684906870357-077d6dd59619",
  imageAlt: 'VR controller with glowing tracking ring in dark environment, blue ambient light',
  colSpan: 'md:col-span-1',
  featured: false
},
{
  id: 'metaquest',
  name: 'Meta Quest 3 Controllers',
  type: 'Haptic Controllers',
  price: '$499',
  priceRange: 'Consumer',
  tech: 'TruTouch haptics',
  coverage: 'Hands (palm zones)',
  latency: '~8ms',
  platform: 'Meta / standalone',
  highlight: 'Pancake lens optics with TruTouch haptic feedback. Wireless standalone operation with hand-tracking fallback.',
  badge: 'Most Accessible',
  badgeColor: 'bg-orange-500 text-white',
  image: "https://images.unsplash.com/photo-1678058284415-b86240f89a14",
  imageAlt: 'Person holding Meta VR controllers with white and orange ambient light in clean environment',
  colSpan: 'md:col-span-1',
  featured: false
},
{
  id: 'teslasuit',
  name: 'Teslasuit Full Body',
  type: 'Full-Body Haptic Suit',
  price: '$19,990',
  priceRange: 'Enterprise',
  tech: 'Electrotactile + thermal',
  coverage: 'Full body (68 zones)',
  latency: '~12ms',
  platform: 'PC VR, custom SDK',
  highlight: 'The most comprehensive haptic system available. Electrotactile stimulation + temperature feedback + biometric monitoring.',
  badge: 'Most Complete',
  badgeColor: 'bg-rose-500 text-white',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1929c54ab-1786787430260.png",
  imageAlt: 'Full body haptic suit displayed on mannequin with glowing sensor nodes in dark studio with violet lighting',
  colSpan: 'md:col-span-1',
  featured: false
},
{
  id: 'owo',
  name: 'OWO Game Skin',
  type: 'Haptic Shirt',
  price: '$399',
  priceRange: 'Consumer',
  tech: 'Electrotactile nervestim',
  coverage: 'Torso (10 zones)',
  latency: '~10ms',
  platform: 'PC VR, Meta, PS5',
  highlight: 'First consumer-grade electrotactile haptic garment. Uses mild electrical nerve stimulation — not vibration — for more realistic sensations like wind, impacts, and temperature.',
  badge: 'Most Innovative',
  badgeColor: 'bg-violet-500 text-white',
  image: "https://images.unsplash.com/photo-1641564341147-244da181fcbe",
  imageAlt: 'Modern haptic gaming shirt laid flat on dark surface with glowing sensor pads illuminated in purple and blue light',
  colSpan: 'md:col-span-3',
  featured: true
}];

// 360° preview items — haptic gloves and vests
const previewItems = [
  {
    id: 'glove-preview',
    label: 'HaptX Haptic Gloves',
    category: 'Haptic Gloves',
    description: 'Pneumatic microfluidic actuators deliver 130 points of tactile feedback per glove with up to 40N force resistance per finger.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a47fa888-1768055633625.png',
    imageAlt: 'Close-up of advanced haptic glove with electronic finger nodes and wrist sensors, dark background with subtle purple glow',
    accentColor: '#a855f7',
    specs: [
      { label: 'Feedback Points', value: '130 / glove' },
      { label: 'Force Resistance', value: '40N / finger' },
      { label: 'Latency', value: '~10ms' },
      { label: 'Technology', value: 'Pneumatic' },
    ],
  },
  {
    id: 'vest-preview',
    label: 'bHaptics TactSuit X40',
    category: 'Haptic Vest',
    description: '40 ERM vibration motors distributed across chest and back provide full-torso haptic coverage compatible with 300+ VR titles.',
    image: 'https://images.unsplash.com/photo-1653158861306-e5b3804f6115',
    imageAlt: 'Person wearing haptic vest in dark VR gaming environment with teal and purple ambient lighting',
    accentColor: '#10b981',
    specs: [
      { label: 'Vibration Points', value: '40 motors' },
      { label: 'Coverage', value: 'Torso front + back' },
      { label: 'Latency', value: '~15ms' },
      { label: 'Technology', value: 'ERM motors' },
    ],
  },
  {
    id: 'suit-preview',
    label: 'Teslasuit Full Body',
    category: 'Full-Body Suit',
    description: 'Electrotactile stimulation across 68 body zones combined with thermal feedback and biometric monitoring for complete immersion.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1929c54ab-1786787430260.png',
    imageAlt: 'Full body haptic suit displayed on mannequin with glowing sensor nodes in dark studio with violet lighting',
    accentColor: '#f43f5e',
    specs: [
      { label: 'Body Zones', value: '68 zones' },
      { label: 'Coverage', value: 'Full body' },
      { label: 'Latency', value: '~12ms' },
      { label: 'Technology', value: 'Electrotactile' },
    ],
  },
];

interface Preview3DCardProps {
  item: typeof previewItems[0];
  index: number;
}

function Preview3DCard({ item, index }: Preview3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [autoAngle, setAutoAngle] = useState(0);
  const animRef = useRef<number | null>(null);

  // Auto-rotate when not hovered
  useEffect(() => {
    let frame: number;
    const animate = () => {
      setAutoAngle((prev) => (prev + 0.4) % 360);
      frame = requestAnimationFrame(animate);
    };
    if (!isHovered) {
      frame = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(frame);
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setRotation({ x: -dy * 18, y: dx * 18 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const autoRotateY = isHovered ? rotation.y : Math.sin((autoAngle * Math.PI) / 180) * 15;
  const autoRotateX = isHovered ? rotation.x : Math.cos((autoAngle * Math.PI) / 180) * 6;

  return (
    <div
      ref={cardRef}
      className="relative cursor-pointer select-none"
      style={{ perspective: '900px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="rounded-2xl overflow-hidden border border-border bg-card transition-shadow duration-300"
        style={{
          transform: `rotateX(${autoRotateX}deg) rotateY(${autoRotateY}deg)`,
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.6s ease-out',
          boxShadow: isHovered
            ? `0 30px 60px rgba(0,0,0,0.5), 0 0 40px ${item.accentColor}33`
            : `0 10px 30px rgba(0,0,0,0.3), 0 0 20px ${item.accentColor}22`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Image area */}
        <div className="relative h-56 overflow-hidden">
          <AppImage
            src={item.image}
            alt={item.imageAlt}
            fill
            className="object-cover"
            style={{
              transform: isHovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.4s ease',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />

          {/* 360° badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white" style={{ animation: 'spin 3s linear infinite' }}>
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            <span className="text-white text-xs font-mono font-bold">360°</span>
          </div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span
              className="px-2.5 py-1 rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: item.accentColor }}
            >
              {item.category}
            </span>
          </div>

          {/* Drag hint */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70">
              <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20" />
            </svg>
            <span className="text-white/70 text-xs">Hover to interact</span>
          </div>
        </div>

        {/* Info area */}
        <div className="p-5">
          <h3 className="font-bold text-foreground text-lg mb-1">{item.label}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.description}</p>

          {/* Specs grid */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border">
            {item.specs.map((spec) => (
              <div key={spec.label}>
                <p className="text-muted-foreground text-xs">{spec.label}</p>
                <p className="text-foreground text-xs font-mono font-semibold" style={{ color: item.accentColor }}>
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HardwareBento() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);

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
    if (previewRef.current) observer.observe(previewRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-sm font-mono font-semibold uppercase tracking-widest text-accent mb-3">
              Device Catalog
            </p>
            <h2 className="text-section-title font-extrabold text-foreground">
              Six devices, six approaches
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hardwareData.map((device, i) =>
            <div
              key={device.id}
              ref={(el) => {cardRefs.current[i] = el;}}
              className={`stagger-child hardware-card rounded-2xl overflow-hidden border border-border bg-card ${device.colSpan}`}
              style={{ transitionDelay: `${i * 80}ms` }}>
              
                {device.featured ? (
              /* Featured card — image background */
              <div className="relative h-full min-h-72">
                    <AppImage
                  src={device.image}
                  alt={device.imageAlt}
                  fill
                  className="object-cover" />
                
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${device.badgeColor}`}>
                          {device.badge}
                        </span>
                        <span className="glass-card px-3 py-1 rounded-full text-white text-xs font-mono border border-white/20">
                          {device.priceRange}
                        </span>
                      </div>
                      <div>
                        <p className="text-white/60 text-xs font-mono uppercase tracking-wider mb-1">{device.type}</p>
                        <h3 className="text-white font-bold text-xl mb-2">{device.name}</h3>
                        <p className="text-white/70 text-sm leading-relaxed mb-4 max-w-lg">{device.highlight}</p>
                        <div className="flex flex-wrap gap-3">
                          <div className="glass-card rounded-lg px-3 py-1.5 border border-white/10">
                            <p className="text-white/50 text-xs">Latency</p>
                            <p className="text-white font-mono font-bold text-sm">{device.latency}</p>
                          </div>
                          <div className="glass-card rounded-lg px-3 py-1.5 border border-white/10">
                            <p className="text-white/50 text-xs">Coverage</p>
                            <p className="text-white font-mono font-bold text-sm">{device.coverage}</p>
                          </div>
                          <div className="glass-card rounded-lg px-3 py-1.5 border border-white/10">
                            <p className="text-white/50 text-xs">Price</p>
                            <p className="text-white font-mono font-bold text-sm">{device.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>) : (

              /* Standard card */
              <div className="flex flex-col h-full">
                    <div className="relative h-44 overflow-hidden">
                      <AppImage
                    src={device.image}
                    alt={device.imageAlt}
                    fill
                    className="object-cover" />
                  
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${device.badgeColor}`}>
                          {device.badge}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-muted-foreground text-xs font-mono uppercase tracking-wider mb-1">{device.type}</p>
                      <h3 className="font-bold text-foreground text-lg mb-2">{device.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{device.highlight}</p>
                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border">
                        {[
                    { label: 'Latency', value: device.latency },
                    { label: 'Price', value: device.price },
                    { label: 'Tech', value: device.tech },
                    { label: 'Platform', value: device.platform }].
                    map((spec) =>
                    <div key={spec.label}>
                            <p className="text-muted-foreground text-xs">{spec.label}</p>
                            <p className="text-foreground text-xs font-mono font-semibold">{spec.value}</p>
                          </div>
                    )}
                      </div>
                    </div>
                  </div>)
              }
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 360° Interactive 3D Preview Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blob-accent opacity-5" />

        <div className="max-w-6xl mx-auto px-6">
          <div
            ref={previewRef}
            className="stagger-child mb-12"
          >
            <p className="text-sm font-mono font-semibold uppercase tracking-widest text-accent mb-3">
              Interactive 3D Preview
            </p>
            <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-0 md:justify-between">
              <h2 className="text-section-title font-extrabold text-foreground">
                360° Hardware Visualizer
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed max-w-md">
                Hover over each device to explore haptic gloves and vests from every angle. Interact with the 3D perspective to examine hardware details.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewItems.map((item, index) => (
              <Preview3DCard key={item.id} item={item} index={index} />
            ))}
          </div>

          {/* Educational callout */}
          <div className="mt-10 rounded-2xl border border-border glass-card-light p-6 flex flex-col md:flex-row gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
            </div>
            <div>
              <p className="text-foreground font-semibold mb-1">For Students &amp; Educators</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                These interactive previews demonstrate the physical form factor of haptic hardware. The 360° perspective helps visualize how actuators, sensors, and wearable components are distributed across gloves and vest surfaces — key concepts in understanding haptic feedback system design.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
