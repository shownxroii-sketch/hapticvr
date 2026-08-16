'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const navLinks = [
  { label: 'How It Works', href: '/' },
  { label: 'Key Hardware', href: '/key-hardware' },
  { label: 'Comparative Analysis', href: '/comparative-analysis' },
  { label: 'Limitations', href: '/limitations' },
  { label: 'Future Trends', href: '/future-trends' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      const handleScroll = () => setIsScrolled(window.scrollY > 50);
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 pt-4 pb-2">
      <nav
        className={`max-w-6xl mx-auto flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 border border-border shadow-xl shadow-accent/10 backdrop-blur-xl'
            : 'bg-white/10 border border-white/20 backdrop-blur-md'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <AppLogo size={36} />
          <span
            className={`font-bold text-lg tracking-tight hidden sm:block transition-colors duration-300 ${
              isScrolled ? 'text-primary' : 'text-white'
            }`}
          >
            HapticVR
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks?.map((link) => (
            <Link
              key={link?.href}
              href={link?.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isScrolled
                  ? 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {link?.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/future-trends"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-200 shadow-lg shadow-accent/25"
          >
            Future Trends
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`lg:hidden p-2 rounded-xl transition-colors ${
            isScrolled ? 'text-foreground hover:bg-secondary' : 'text-white hover:bg-white/10'
          }`}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <Icon name={isMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={22} />
        </button>
      </nav>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-2 max-w-6xl mx-auto bg-white border border-border rounded-2xl p-5 shadow-2xl shadow-accent/10">
          <div className="flex flex-col gap-1 mb-4">
            {navLinks?.map((link) => (
              <Link
                key={link?.href}
                href={link?.href}
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-medium text-foreground hover:bg-secondary transition-colors"
              >
                {link?.label}
              </Link>
            ))}
          </div>
          <Link
            href="/future-trends"
            onClick={() => setIsMenuOpen(false)}
            className="block w-full text-center px-5 py-3 rounded-xl text-sm font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
          >
            Future Trends
          </Link>
        </div>
      )}
    </header>
  );
}
