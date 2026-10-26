import React from 'react';
import { Phone, Send, Youtube, Lock, Globe } from 'lucide-react';
import { Language, SiteSettings } from '../types';
import { translations } from '../utils/translations';

interface FooterProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  settings: SiteSettings;
  onOpenPrivacyModal: () => void;
  onOpenAdminModal: () => void;
  onOpenOrderModal: (serviceId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onLanguageChange,
  settings,
  onOpenPrivacyModal,
  onOpenAdminModal,
  onOpenOrderModal,
}) => {
  const t = translations[lang];

  return (
    <footer id="contact" className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-amber-500 flex items-center justify-center text-white font-black text-lg">
                V
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Vizon<span className="text-amber-400">YORDAMCHI</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t.footerAboutText}
            </p>
          </div>

          {/* Services Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t.footerServicesTitle}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onOpenOrderModal('srv-yt-verify')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  {t.srvYtNumberTitle}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenOrderModal('srv-yt-setup')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  {t.srvYtConfigTitle}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenOrderModal('srv-ai-video')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  {t.srvAiVideoTitle}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenOrderModal('srv-ai-music')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  {t.srvAiMusicTitle}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenOrderModal('srv-website')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  {t.srvWebsiteTitle}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t.footerContactTitle}
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              {/* Phone */}
              <a
                href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{settings.contactPhone}</span>
              </a>

              {/* Telegram */}
              <a
                href={settings.telegramUsername ? `https://t.me/${settings.telegramUsername}` : `tel:${settings.telegramPhone.replace(/\s+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Send className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Telegram: {settings.telegramUsername ? `@${settings.telegramUsername}` : settings.telegramPhone}</span>
              </a>

              {/* YouTube */}
              <a
                href={settings.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Youtube className="w-4 h-4 text-red-500 shrink-0" />
                <span>YouTube: {settings.youtubeChannelName}</span>
              </a>
            </div>
          </div>

          {/* Language Selection & Privacy */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Til / Язык / Language
            </h4>
            <div className="flex flex-wrap gap-2 mb-5">
              {(['uz', 'ru', 'en', 'tj'] as Language[]).map((code) => (
                <button
                  key={code}
                  onClick={() => onLanguageChange(code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all ${
                    lang === code
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

            <div>
              <button
                onClick={onOpenPrivacyModal}
                className="text-xs text-slate-400 hover:text-amber-400 underline transition-colors"
              >
                {t.footerPrivacy}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar with quiet admin link and copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} VizonYORDAMCHI. {t.footerRights}</p>

          <button
            onClick={onOpenAdminModal}
            className="flex items-center gap-1.5 text-slate-500 hover:text-amber-400 transition-colors py-1 px-2 rounded focus:outline-none"
            aria-label="Admin Portal"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{t.footerAdminLink}</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
