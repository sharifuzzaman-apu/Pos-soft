'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { FaBars, FaTimes } from 'react-icons/fa';
const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/bkash', label: 'bKash' },
  { href: '/dashboard/cash', label: 'Cash' },
  { href: '/dashboard/expense', label: 'Expense' },
  { href: '/dashboard/summary', label: 'Summary' },
  { href: '/dashboard/history', label: 'History' },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="lg:hidden">
      {/* Floating Action Button */}
      <Button
        variant="primary"
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg p-0 flex items-center justify-center"
        title={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? (
          <FaTimes className="text-xl" />
        ) : (
          <FaBars className="text-xl" />
        )}
      </Button>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
            onClick={closeMenu}
          />

          {/* Menu Panel */}
          <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl z-50 animate-slide-up max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Navigation
                </h3>
                <Badge variant="purple">Menu</Badge>
              </div>

              {/* Navigation Grid */}
              <nav className="grid grid-cols-2 gap-3">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link key={link.href} href={link.href} onClick={closeMenu}>
                      <div
                        className={`
                          flex flex-col items-center justify-center gap-2 p-4 rounded-xl
                          transition-all duration-200
                          ${
                            isActive
                              ? 'bg-purple-100 text-purple-600 border-2 border-purple-300'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'
                          }
                        `}
                      >
                        <span className="text-base font-semibold">
                          {link.label}
                        </span>
                        {isActive && (
                          <Badge variant="purple" size="sm">
                            Active
                          </Badge>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
