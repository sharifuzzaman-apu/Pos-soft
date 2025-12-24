'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Logo from '@/components/shared/Logo';

const socialLinks = [
  { href: '#', label: 'GitHub' },
  { href: '#', label: 'Twitter' },
  { href: '#', label: 'LinkedIn' },
  { href: '#', label: 'Email' },
];

const quickLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/summary', label: 'Summary' },
  { href: '/dashboard/history', label: 'History' },
];

const supportLinks = [
  { href: '#', label: 'Help Center' },
  { href: '#', label: 'Documentation' },
  { href: '#', label: 'Contact Us' },
];

export default function Footer({ className = '' }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`bg-white border-t border-gray-200 mt-auto ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section - ✅ Using Logo Component */}
          <div className="col-span-1 md:col-span-2">
            <Logo showVersion={true} size="md" href={null} />
            <Badge variant="success" size="sm" className="mt-2">
              Active
            </Badge>
            <p className="text-sm text-gray-600 my-4">
              Simple and powerful accounting software for small businesses.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="secondary"
                  size="sm"
                  className="px-3"
                >
                  {social.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-gray-600">
            © {currentYear} POS-Soft. All rights reserved.
          </p>

          {/* Policy Links */}
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              Privacy Policy
            </Button>
            <Button variant="outline" size="sm">
              Terms of Service
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
