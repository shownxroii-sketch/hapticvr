'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const titleLeftRef = useRef<HTMLHeadingElement>(null);
  const titleRightRef = useRef<HTMLHeadingElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const expandedContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsap: any, ScrollTrigger: any;

    const initGSAP = async () => {
      const gsapModule = await import('gsap');
      const stModule = await import('gsap/ScrollTrigger');
      gsap = gsapModule.gsap;
      ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current || !mediaRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2
        }
      });

      // Media expands from card to fullscreen
      tl.to(
        mediaRef.current,
        {
          width: '100vw',
          height: '100vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
          borderRadius: '0px',
          duration: 2,
          ease: 'power2.inOut'
        },
        0
      );

      // Background fades
      if (heroBgRef.current) {
        tl.to(heroBgRef.current, { opacity: 0, duration: 0.8 }, 0);
      }

      // Titles fly apart
      if (titleLeftRef.current) {
        tl.to(titleLeftRef.current, { x: '-110vw', duration: 2, ease: 'power2.inOut' }, 0);
      }
      if (titleRightRef.current) {
        tl.to(titleRightRef.current, { x: '110vw', duration: 2, ease: 'power2.inOut' }, 0);
      }

      // Expanded content appears
      if (expandedContentRef.current) {
        tl.to(
          expandedContentRef.current,
          { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.6 },
          1.4
        );
      }
    };

    initGSAP();

    return () => {
      if (typeof ScrollTrigger !== 'undefined' && ScrollTrigger?.getAll) {
        ScrollTrigger.getAll().forEach((t: any) => t.kill());
      }
    };
  }, []);

  return (
    <section ref={containerRef} className="expansion-hero-container">
      <div className="expansion-hero-sticky">
        {/* Background */}
        <div ref={heroBgRef} className="absolute inset-0 z-0">
          <AppImage
            src="https://images.unsplash.com/photo-1706264337427-fbd7405c3483"
            alt="VR gaming environment with dark atmospheric blue and purple lighting, dim industrial space with glowing headset displays"
            fill
            className="object-cover"
            priority />
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />
        </div>

        {/* Expanding media card */}
        <div
          ref={mediaRef}
          className="media-card"
          style={{ width: '340px', height: '460px' }}>
          
          <div className="relative w-full h-full">
            <AppImage
              src="https://images.unsplash.com/photo-1682447564158-cb3dc7524c75"
              alt="Person wearing VR headset with haptic gloves in dark room with purple neon lighting, immersive gaming setup"
              fill
              className="object-cover"
              priority />
            
            {/* Scrim for text overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
        </div>

        {/* Titles — fly apart on scroll */}
        <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none" style={{ mixBlendMode: 'difference' }}>
          <div className="flex flex-col items-center gap-2 text-center px-4">
            <h1
              ref={titleLeftRef}
              className="text-hero-xl font-extrabold text-white uppercase tracking-tighter glow-text">
              
              Feel Every
            </h1>
            <h2
              ref={titleRightRef}
              className="text-hero-xl font-extrabold text-white uppercase tracking-tighter">
              
              Impact
            </h2>
          </div>
        </div>

        {/* Content revealed after expansion */}
        <div
          ref={expandedContentRef}
          className="absolute bottom-10 left-0 w-full px-6 opacity-0 pointer-events-none z-50"
          style={{ transform: 'translateY(20px)' }}>
          
          <div className="max-w-4xl mx-auto text-white">
            <p className="text-sm font-mono font-medium uppercase tracking-widest text-accent mb-3">
              HapticVR — Educational Series
            </p>
            <p className="text-xl md:text-2xl font-semibold mb-6 leading-relaxed max-w-2xl">
              Discover how haptic feedback technology lets you physically feel virtual worlds — from a gentle breeze to a full-force punch.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#science"
                className="px-6 py-3 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent/90 transition-all shadow-lg shadow-accent/30">
                
                Explore the Science
              </Link>
              <Link
                href="/key-hardware"
                className="px-6 py-3 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-all">
                
                View Hardware
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs font-mono uppercase tracking-widest">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>);

}