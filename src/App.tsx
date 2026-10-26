/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PromoBanner } from './components/PromoBanner';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { AdminPortal } from './components/AdminPortal';
import { PrivacyModal } from './components/PrivacyModal';
import { Language, ServiceItem, SiteSettings, Theme } from './types';
import { initialServices, defaultSiteSettings } from './data/defaultData';
import { translations } from './utils/translations';
import { Zap, ShieldCheck, Headphones, Award } from 'lucide-react';

export default function App() {
  // 1. Language state (persisted)
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('vizon_lang');
    return (saved as Language) || 'uz';
  });

  // 2. Theme state (persisted, default dark)
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('vizon_theme');
    return (saved as Theme) || 'dark';
  });

  // 3. Dynamic Server Data
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);

  // 4. Modals
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderModalServiceId, setOrderModalServiceId] = useState<string | undefined>(undefined);
  const [orderModalCountry, setOrderModalCountry] = useState<string | undefined>(undefined);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  // 5. Admin Token
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return sessionStorage.getItem('vizon_admin_token') || null;
  });

  const t = translations[lang];

  // Apply Theme to documentElement
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    localStorage.setItem('vizon_theme', theme);
  }, [theme]);

  // Persist language
  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('vizon_lang', newLang);
  };

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Fetch Public Config (Services & Settings) from server
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch('/api/public/config');
        if (res.ok) {
          const data = await res.json();
          if (data.services && data.services.length > 0) {
            setServices(data.services);
          }
          if (data.settings) {
            setSettings(data.settings);
          }
        }
      } catch (err) {
        console.warn('Backend config unavailable, using built-in defaults:', err);
      }
    };
    fetchConfig();
  }, []);

  // Check URL params for direct admin access (?admin=1)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === '1') {
      setAdminModalOpen(true);
    }
  }, []);

  // Open Order Modal with preselected service and country
  const handleOpenOrderModal = (serviceId?: string, country?: string) => {
    setOrderModalServiceId(serviceId);
    setOrderModalCountry(country);
    setOrderModalOpen(true);
  };

  const handleLoginSuccess = (token: string) => {
    setAdminToken(token);
    sessionStorage.setItem('vizon_admin_token', token);
  };

  const handleLogout = () => {
    setAdminToken(null);
    sessionStorage.removeItem('vizon_admin_token');
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Top Navigation */}
      <Navbar
        lang={lang}
        onLanguageChange={handleLanguageChange}
        theme={theme}
        onThemeToggle={handleThemeToggle}
        onOpenOrderModal={handleOpenOrderModal}
        onOpenAdminModal={() => setAdminModalOpen(true)}
        isAdminLoggedIn={!!adminToken}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          lang={lang}
          onOpenOrderModal={() => handleOpenOrderModal()}
          settings={settings}
        />

        {/* Services & Transparent Pricing Section */}
        <ServicesSection
          lang={lang}
          services={services}
          onOpenOrderModal={handleOpenOrderModal}
        />

        {/* Why Us / Advantages Section */}
        <section id="why-us" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
                {t.navWhyUs}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Nega aynan VizonYORDAMCHI?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                  Tezkor bajarilish
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Har bir buyurtma zudlik bilan ko‘rib chiqiladi va eng qisqa muddatlarda sifatli topshiriladi.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                  100% Qonuniy va Xavfsiz
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Barcha jarayonlar xavfsiz va platforma qoidalariga to‘liq mos keladigan tartibda olib boriladi.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                  Shaffof va Qulay Narxlar
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Yashirin to‘lovlarsiz, har bir xizmat uchun aniq va qulay narxlar kafolatlangan.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                  <Headphones className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                  Doimiy Qo‘llab-quvvatlash
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Telegram va telefon orqali doimo aloqadamiz. Savollaringizga zudlik bilan javob beramiz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Advertising Banner */}
        <PromoBanner
          lang={lang}
          settings={settings}
          onOpenOrderModal={() => handleOpenOrderModal()}
        />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onLanguageChange={handleLanguageChange}
        settings={settings}
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
        onOpenAdminModal={() => setAdminModalOpen(true)}
        onOpenOrderModal={handleOpenOrderModal}
      />

      {/* Order Modal */}
      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        lang={lang}
        services={services}
        defaultServiceId={orderModalServiceId}
        defaultCountry={orderModalCountry}
        settings={settings}
      />

      {/* Admin Portal Modal */}
      <AdminPortal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        lang={lang}
        token={adminToken}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        onSettingsUpdated={(newSettings) => setSettings(newSettings)}
        onServicesUpdated={(newServices) => setServices(newServices)}
      />

      {/* Privacy & Terms Modal */}
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
