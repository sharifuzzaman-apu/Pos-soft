'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function ThemeToggle({
  showLabel = false,
  size = 'sm',
  className = '',
}) {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  // Don't render until mounted (avoid hydration issues)
  if (!mounted) {
    return (
      <Button variant="secondary" size={size} className={className}>
        Theme
      </Button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant="secondary"
        size={size}
        onClick={toggleTheme}
        className="relative overflow-hidden"
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </Button>

      {showLabel && (
        <Badge variant={isDark ? 'gray' : 'warning'} size="sm">
          {isDark ? 'Dark' : 'Light'}
        </Badge>
      )}
    </div>
  );
}
