import React from 'react';
import { ArrowRight, Play, Sparkles, Youtube, CheckCircle2 } from 'lucide-react';
import { Language, SiteSettings } from '../types';
import { translations } from '../utils/translations';

interface HeroProps {
  lang: Language;
  onOpenOrderModal: () => void;
  settings: SiteSettings;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenOrderModal, settings }) => {
  const t = translations[lang];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-violet-600/15 via-indigo-600/10 to-amber-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and Call-to-actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Subtle editorial kicker (unboxed, clean typography) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-amber-500 dark:text-amber-400 mb-4">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{t.heroBadge}</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span className="text-slate-500 dark:text-slate-400">2026 Edition</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] mb-6 text-balance">
              {t.heroTitle}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-500 to-amber-500 dark:from-violet-400 dark:via-indigo-300 dark:to-amber-400">
                {t.heroHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mb-8 leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#services"
                className="px-6 py-3.5 text-sm font-semibold rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 shrink-0"
              >
                <span>{t.heroCtaServices}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenOrderModal}
                className="px-6 py-3.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/20 active:scale-[0.98] flex items-center justify-center gap-2 shrink-0"
              >
                <span>{t.heroCtaOrder}</span>
              </button>

              <a
                href={settings.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 text-sm font-medium rounded-xl border border-slate-300 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all flex items-center justify-center gap-2 shrink-0"
              >
                <Youtube className="w-4 h-4 text-red-500" />
                <span>{t.heroCtaYoutube}</span>
              </a>
            </div>

            {/* Editorial trust markers */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-3 gap-4 w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{t.heroStatOrders}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{t.heroStatSatisfaction}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{t.heroStatSpeed}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Focal Carrier with high-fidelity asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800/90 shadow-2xl shadow-violet-500/10 bg-slate-900 group">
              <img
                src="/src/assets/images/vizonyordamchi_hero_1793014647395.jpg"
                alt="VizonYORDAMCHI AI Assistant Sphere"
                className="w-full h-auto object-cover aspect-[16/9] lg:aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {/* Subtle glass overlay tag */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-slate-950/75 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">VizonYORDAMCHI Engine</p>
                  <p className="text-[11px] text-slate-300">YouTube · AI Video · AI Musiqa · Web</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
