import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Globe, ChevronDown, Lock } from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../utils/translations';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onThemeToggle: () => void;
  onOpenOrderModal: (serviceId?: string) => void;
  onOpenAdminModal: () => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  theme,
  onThemeToggle,
  onOpenOrderModal,
  onOpenAdminModal,
  isAdminLoggedIn,
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'uz', label: 'O‘zbekcha', flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'tj', label: 'Тоҷикӣ', flag: '🇹🇯' },
  ];

  const currentLangObj = languages.find((l) => l.code === lang) || languages[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? theme === 'dark'
            ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 sm:gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#"
          className="flex items-center gap-2 group whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg p-1"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-amber-500 flex items-center justify-center shadow-md shadow-violet-500/20 group-hover:scale-105 transition-transform">
            <span className="text-white font-extrabold text-lg sm:text-xl tracking-wider">V</span>
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center">
            Vizon<span className="text-amber-500 dark:text-amber-400">YORDAMCHI</span>
          </span>
        </a>

        {/* Zone 2: Navigation Links (single-line, clean text) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a
            href="#services"
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            {t.navServices}
          </a>
          <a
            href="#why-us"
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            {t.navWhyUs}
          </a>
          <a
            href="#banner"
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            {t.navPromo}
          </a>
          <a
            href="#contact"
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            {t.navContact}
          </a>
        </nav>

        {/* Zone 3: Actions & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Language Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 px-2 py-1.5 sm:px-2.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-amber-400 dark:hover:border-amber-500 transition-colors whitespace-nowrap shrink-0"
              aria-label="Tilni tanlash"
              aria-expanded={langDropdownOpen}
            >
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              <span>{currentLangObj.code.toUpperCase()}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onLanguageChange(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                      lang === l.code
                        ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </span>
                    <span className="text-[10px] uppercase text-slate-400">{l.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={onThemeToggle}
            className="p-1.5 sm:p-2 rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors shrink-0"
            aria-label={theme === 'dark' ? 'Kunduzgi rejimga o‘tish' : 'Tungi rejimga o‘tish'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Admin Indicator button (if logged in, quick open) */}
          {isAdminLoggedIn && (
            <button
              onClick={onOpenAdminModal}
              className="p-1.5 sm:p-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-colors shrink-0"
              title="Admin Panel"
              aria-label="Admin Panel"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}

          {/* Primary Action Button (Header CTA on sm+, prominent in hero for mobile) */}
          <button
            onClick={() => onOpenOrderModal()}
            className="hidden sm:inline-flex px-4 py-2 text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-[0.98] rounded-lg shadow-md shadow-amber-500/20 transition-all whitespace-nowrap shrink-0"
          >
            {t.navOrder}
          </button>
        </div>
      </div>
    </header>
  );
};
