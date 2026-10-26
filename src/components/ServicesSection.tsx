import React, { useState } from 'react';
import { Smartphone, Settings, Video, Music, Globe, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { Language, ServiceItem } from '../types';
import { translations } from '../utils/translations';

interface ServicesSectionProps {
  lang: Language;
  services: ServiceItem[];
  onOpenOrderModal: (serviceId: string, country?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  services,
  onOpenOrderModal,
}) => {
  const t = translations[lang];
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('ID');

  const getLocalizedTitle = (s: ServiceItem) => {
    if (lang === 'ru') return s.titleRu || s.titleUz;
    if (lang === 'en') return s.titleEn || s.titleUz;
    if (lang === 'tj') return s.titleTj || s.titleUz;
    return s.titleUz;
  };

  const getLocalizedDesc = (s: ServiceItem) => {
    if (lang === 'ru') return s.descRu || s.descUz;
    if (lang === 'en') return s.descEn || s.descUz;
    if (lang === 'tj') return s.descTj || s.descUz;
    return s.descUz;
  };

  const getLocalizedPrice = (s: ServiceItem) => {
    if (lang === 'ru') return s.priceDisplayRu || s.priceDisplayUz;
    if (lang === 'en') return s.priceDisplayEn || s.priceDisplayUz;
    if (lang === 'tj') return s.priceDisplayTj || s.priceDisplayUz;
    return s.priceDisplayUz;
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5" />;
      case 'Settings':
        return <Settings className="w-5 h-5" />;
      case 'Video':
        return <Video className="w-5 h-5" />;
      case 'Music':
        return <Music className="w-5 h-5" />;
      case 'Globe':
        return <Globe className="w-5 h-5" />;
      default:
        return <ShieldCheck className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-24 relative bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs font-bold tracking-wider uppercase text-amber-500 mb-2">
            VizonYORDAMCHI
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 text-balance">
            {t.servicesSectionTitle}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.servicesSectionSubtitle}
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => {
            const hasCountryPricing = service.hasCountrySelect && service.countryPricing && service.countryPricing.length > 0;
            const currentSelectedCountry = service.countryPricing?.find((c) => c.code === selectedCountryCode) || service.countryPricing?.[0];

            return (
              <div
                key={service.id}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 sm:p-7 flex flex-col justify-between hover:border-amber-400/50 dark:hover:border-amber-500/50 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div>
                  {/* Image banner if present */}
                  {service.imageUrl && (
                    <div className="rounded-xl overflow-hidden mb-5 aspect-[16/10] bg-slate-900 relative">
                      <img
                        src={service.imageUrl}
                        alt={getLocalizedTitle(service)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}

                  {/* Header: Icon & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-violet-500/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                      {renderIcon(service.iconName)}
                    </div>
                    {service.badge && (
                      <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                    {getLocalizedTitle(service)}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    {getLocalizedDesc(service)}
                  </p>

                  {/* Country Pricing Details for YouTube Number Verification */}
                  {hasCountryPricing && (
                    <div className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">
                        {t.countrySelectLabel}:
                      </p>
                      <div className="space-y-2">
                        {service.countryPricing!.map((cp) => {
                          const isSelected = selectedCountryCode === cp.code;
                          const countryName =
                            lang === 'ru'
                              ? cp.nameRu
                              : lang === 'en'
                              ? cp.nameEn
                              : lang === 'tj'
                              ? cp.nameTj
                              : cp.nameUz;

                          return (
                            <button
                              key={cp.code}
                              type="button"
                              onClick={() => setSelectedCountryCode(cp.code)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                                isSelected
                                  ? 'bg-amber-500/15 border border-amber-500/40 text-amber-600 dark:text-amber-300 font-medium'
                                  : 'bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-amber-500 bg-amber-500 text-slate-950' : 'border-slate-400'}`}>
                                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                </span>
                                <span>{countryName}</span>
                              </span>
                              <span className="font-semibold">{cp.price}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer: Price and Order Action */}
                <div className="pt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                      {lang === 'en' ? 'Price' : 'Narx'}
                    </span>
                    <span className="text-lg font-extrabold text-amber-600 dark:text-amber-400">
                      {hasCountryPricing && currentSelectedCountry
                        ? currentSelectedCountry.price
                        : getLocalizedPrice(service)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      const countryToPass = hasCountryPricing && currentSelectedCountry ? currentSelectedCountry.nameUz : undefined;
                      onOpenOrderModal(service.id, countryToPass);
                    }}
                    className="px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-amber-500 dark:hover:bg-amber-400 dark:hover:text-slate-950 transition-all flex items-center gap-1.5 shadow-sm active:scale-95 shrink-0"
                  >
                    <span>{t.serviceOrderBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-14 p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-0.5">
              {t.legalDisclaimerTitle}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.legalDisclaimerText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
