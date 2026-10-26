import React from 'react';
import { Youtube, Phone, Send, Sparkles, ArrowRight, Check } from 'lucide-react';
import { Language, SiteSettings } from '../types';
import { translations } from '../utils/translations';

interface PromoBannerProps {
  lang: Language;
  settings: SiteSettings;
  onOpenOrderModal: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
  lang,
  settings,
  onOpenOrderModal,
}) => {
  const t = translations[lang];

  return (
    <section id="banner" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 shadow-2xl shadow-violet-950/40">
          {/* High-fidelity background artwork */}
          <div className="absolute inset-0 z-0">
            <img
              src="/src/assets/images/vizonyordamchi_banner_1793014647177.jpg"
              alt="VizonYORDAMCHI Premium Advertising Banner"
              className="w-full h-full object-cover opacity-35 mix-blend-screen scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
            <div className="absolute inset-0 bg-radial from-violet-600/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Banner Content Container */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-14 text-center">
            {/* Top Brand Subtitle */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{settings.bannerSubtitle}</span>
            </div>

            {/* Central Master Title */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
              Vizon<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">YORDAMCHI</span>
            </h2>

            {/* Sub-text */}
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
              {t.bannerSubtitle}
            </p>

            {/* Compact Services & Price Summary Strip */}
            <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10 text-left">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                <span className="text-[11px] text-slate-400 block">YouTube Tasdiq</span>
                <span className="text-xs sm:text-sm font-bold text-amber-400">14 990 so‘mdan</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                <span className="text-[11px] text-slate-400 block">YouTube Sozlash</span>
                <span className="text-xs sm:text-sm font-bold text-amber-400">50 000 so‘m</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                <span className="text-[11px] text-slate-400 block">AI Video</span>
                <span className="text-xs sm:text-sm font-bold text-amber-400">25 000 so‘mdan</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                <span className="text-[11px] text-slate-400 block">Website Yaratish</span>
                <span className="text-xs sm:text-sm font-bold text-amber-400">50 000 so‘mdan</span>
              </div>
            </div>

            {/* Contact Information Hub */}
            <div className="inline-block p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 backdrop-blur-md mb-8 max-w-xl w-full">
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
                {t.bannerContactLabel}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm">
                {/* Phone */}
                <a
                  href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 text-white hover:text-amber-400 transition-colors font-semibold"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>{settings.contactPhone}</span>
                </a>

                {/* Telegram */}
                <a
                  href={settings.telegramUsername ? `https://t.me/${settings.telegramUsername}` : `tel:${settings.telegramPhone.replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:text-sky-400 transition-colors font-semibold"
                >
                  <Send className="w-4 h-4 text-sky-400" />
                  <span>{settings.telegramUsername ? `@${settings.telegramUsername}` : settings.telegramPhone}</span>
                </a>

                {/* YouTube */}
                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:text-red-400 transition-colors font-semibold"
                >
                  <Youtube className="w-4 h-4 text-red-500" />
                  <span>{settings.youtubeChannelName}</span>
                </a>
              </div>
            </div>

            {/* Banner CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onOpenOrderModal}
                className="px-8 py-3.5 text-sm font-bold rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 transition-all shadow-lg shadow-amber-500/30 active:scale-[0.98] flex items-center gap-2"
              >
                <span>{t.bannerCtaOrder}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={settings.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 text-sm font-semibold rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white transition-all flex items-center gap-2"
              >
                <Youtube className="w-4 h-4 text-red-500" />
                <span>{t.bannerCtaChannel}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
