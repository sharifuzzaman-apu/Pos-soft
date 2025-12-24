'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import Logo from '@/components/shared/Logo';
import { FaBars, FaTimes } from 'react-icons/fa';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/bkash', label: 'bKash' },
  { href: '/dashboard/cash', label: 'Cash' },
  { href: '/dashboard/loan', label: 'Loan' },
  { href: '/dashboard/expense', label: 'Expense' },
  { href: '/dashboard/summary', label: 'Summary' },
  { href: '/dashboard/history', label: 'History' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-10 h-10 p-0 flex items-center justify-center"
          title={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? (
            <FaTimes className="text-lg" />
          ) : (
            <FaBars className="text-lg" />
          )}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 animate-fade-in"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white border-r border-gray-200 
          flex flex-col transition-transform duration-300
          ${
            isMobileMenuOpen
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0'
          }
        `}
      >
        {/* Logo Section - ✅ Using Logo Component */}
        <div className="p-6 border-b border-gray-200">
          <Logo showVersion={true} size="md" />
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                  isActive
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                }`}
              >
                <span className="flex-1">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 space-y-3">
          <Link
            href="/dashboard/settings"
            className="block px-4 py-3 rounded-lg transition-colors font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600"
            onClick={closeMobileMenu}
          >
            Settings
          </Link>

          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">© 2025 POS-Soft</p>
          </div>
        </div>
      </aside>
    </>
  );
}
