import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const footerLinks = [
  { label: 'How It Works', href: '/' },
  { label: 'Key Hardware', href: '/key-hardware' },
  { label: 'Comparative Analysis', href: '/comparative-analysis' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
];

const socialLinks = [
  { icon: 'AcademicCapIcon', href: '#', label: 'Academic Resources' },
  { icon: 'BookOpenIcon', href: '#', label: 'Course Materials' },
  { icon: 'ShareIcon', href: '#', label: 'Share' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Pattern 3: Vercel Horizontal Flow */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo + Links */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-2">
              <AppLogo size={28} />
              <span className="font-bold text-sm text-primary">HapticVR</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-1">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Social + Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-muted-foreground">
              <a href="mailto:shownxroii@gmail.com" className="hover:text-foreground transition-colors flex items-center gap-1">
                <Icon name="EnvelopeIcon" size={14} />
                shownxroii@gmail.com
              </a>
              <a href="tel:+94763648886" className="hover:text-foreground transition-colors flex items-center gap-1">
                <Icon name="PhoneIcon" size={14} />
                +94 763648886
              </a>
            </div>
            <div className="flex items-center gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent/40 hover:bg-secondary transition-all"
                >
                  <Icon name={s.icon as any} size={16} />
                </a>
              ))}
              <span className="text-sm text-muted-foreground pl-2 border-l border-border">
                © 2026 HapticVR. All rights reserved.
              </span>
            </div>
          </div>
        </div>

        {/* Educational disclaimer */}
        <p className="mt-8 text-xs text-muted-foreground text-center">
          Educational resource for students and educators. Specifications are approximate and subject to change.
        </p>
      </div>
    </footer>
  );
}