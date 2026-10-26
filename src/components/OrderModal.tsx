import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Phone, Send, Youtube, AlertCircle, Loader2 } from 'lucide-react';
import { Language, ServiceItem, SiteSettings, Order } from '../types';
import { translations } from '../utils/translations';
import { validatePhoneNumber } from '../utils/phoneValidator';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  services: ServiceItem[];
  defaultServiceId?: string;
  defaultCountry?: string;
  settings: SiteSettings;
  onOrderCreated?: (order: Order) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  lang,
  services,
  defaultServiceId,
  defaultCountry,
  settings,
  onOrderCreated,
}) => {
  const t = translations[lang];

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceId, setServiceId] = useState(defaultServiceId || (services[0]?.id || ''));
  const [country, setCountry] = useState(defaultCountry || 'AQSH (USA)');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successOrder, setSuccessOrder] = useState<Order | null>(null);

  // Sync default service when opened
  useEffect(() => {
    if (defaultServiceId) {
      setServiceId(defaultServiceId);
    } else if (services.length > 0 && !serviceId) {
      setServiceId(services[0].id);
    }
  }, [defaultServiceId, services]);

  useEffect(() => {
    if (defaultCountry) {
      setCountry(defaultCountry);
    }
  }, [defaultCountry]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const selectedService = services.find((s) => s.id === serviceId);
  const isYoutubeVerify = serviceId === 'srv-yt-verify' || selectedService?.hasCountrySelect;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate phone number
    const validation = validatePhoneNumber(phone);
    if (!validation.isValid) {
      setErrorMessage(validation.error || t.errorPhoneRequired);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName.trim(),
          phone: validation.normalized,
          serviceId,
          country: isYoutubeVerify ? country : undefined,
          notes: notes.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || t.errorGeneric);
      }

      setSuccessOrder(data.order);
      if (onOrderCreated) {
        onOrderCreated(data.order);
      }
    } catch (err: any) {
      setErrorMessage(err.message || t.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccessOrder(null);
    setCustomerName('');
    setPhone('');
    setNotes('');
    setErrorMessage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label={t.orderCloseBtn}
        >
          <X className="w-5 h-5" />
        </button>

        {successOrder ? (
          /* Success Screen */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-5 border border-emerald-500/20">
              <CheckCircle className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {t.orderSuccessTitle}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              {t.orderSuccessDesc}
            </p>

            {/* Order ID box */}
            <div className="mb-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 inline-block text-center w-full">
              <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                {t.orderIdLabel}
              </span>
              <span className="font-mono text-xl font-extrabold text-amber-500 tracking-wider">
                {successOrder.id}
              </span>
            </div>

            {/* Contact instructions with direct clickable links */}
            <div className="text-left p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 mb-6">
              <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-3">
                {t.orderContactTitle}
              </p>
              <div className="space-y-3 text-sm">
                <a
                  href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 text-slate-800 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 font-semibold group"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">{t.orderContactCall}:</span>
                    <span>{settings.contactPhone}</span>
                  </div>
                </a>

                <a
                  href={settings.telegramUsername ? `https://t.me/${settings.telegramUsername}` : `tel:${settings.telegramPhone.replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-800 dark:text-slate-200 hover:text-sky-500 dark:hover:text-sky-400 font-semibold group"
                >
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">{t.orderContactTelegram}:</span>
                    <span>{settings.telegramUsername ? `@${settings.telegramUsername}` : settings.telegramPhone}</span>
                  </div>
                </a>

                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-800 dark:text-slate-200 hover:text-red-500 dark:hover:text-red-400 font-semibold group"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Youtube className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">{t.orderContactYoutube}:</span>
                    <span>{settings.youtubeChannelName}</span>
                  </div>
                </a>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-3 text-sm font-semibold rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
            >
              {t.orderCloseBtn}
            </button>
          </div>
        ) : (
          /* Order Form */
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1.5">
                {t.modalTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {t.modalSubtitle}
              </p>
            </div>

            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.labelName}
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={t.placeholderName}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                />
              </div>

              {/* Phone Number (Required & Validated) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.labelPhone} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.placeholderPhone}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-mono"
                />
              </div>

              {/* Selected Service */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.labelService}
                </label>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {lang === 'ru'
                        ? s.titleRu
                        : lang === 'en'
                        ? s.titleEn
                        : lang === 'tj'
                        ? s.titleTj
                        : s.titleUz}{' '}
                      — {s.priceDisplayUz}
                    </option>
                  ))}
                </select>
              </div>

              {/* Country selection for YouTube Verification */}
              {isYoutubeVerify && (
                <div className="p-3.5 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20">
                  <label className="block text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1.5">
                    {t.labelCountry}
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="AQSH (USA)">{t.countryUsa}</option>
                    <option value="Indoneziya">{t.countryId}</option>
                    <option value="Boshqa davlatlar">{t.countryOther}</option>
                  </select>
                </div>
              )}

              {/* Additional notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.labelNotes}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.placeholderNotes}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.btnSubmitting}</span>
                  </>
                ) : (
                  <span>{t.btnSubmitOrder}</span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
