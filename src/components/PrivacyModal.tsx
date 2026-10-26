import React, { useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose, lang }) => {
  const t = translations[lang];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto relative animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Yopish"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {t.footerPrivacy} & {t.footerTerms}
            </h3>
            <p className="text-xs text-slate-500">VizonYORDAMCHI — 2026</p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            <strong>1. Maxfiylik va Shaxsiy Ma’lumotlar:</strong> Foydalanuvchilar tomonidan buyurtma formasi orqali kiritilgan telefon raqami va ism faqatgina buyurtmani bajarish hamda aloqa o‘rnatish maqsadida xavfsiz backend serverida saqlanadi. Uchinchi shaxslarga berilmaydi.
          </p>
          <p>
            <strong>2. Xizmatlar shartlari va qonuniylik:</strong> Biz faqatgina foydalanuvchining o‘z roziligi bilan amalga oshiriladigan, qonuniy, platforma (YouTube, Google) qoidalariga zid bo‘lmagan xizmatlarni taqdim etamiz. YouTube xizmatlarida telefon raqami mavjudligi va platforma shartlariga qat’iy rioya qilinadi.
          </p>
          <p>
            <strong>3. Xizmat narxlari va to‘lovlar:</strong> Saytdagi barcha narxlar shaffof va adolatli tarzda ko‘rsatilgan. Murakkab loyihalar (katta veb-saytlar yoki uzoq AI videolari) uchun narxlar mijoz bilan individual kelishilishi mumkin.
          </p>
          <p>
            <strong>4. Murojaat:</strong> Barcha savol va takliflar bo‘yicha biz bilan telefon: <strong>+998 99 556 26 26</strong> yoki rasmiy YouTube kanalimiz <strong>@VizonAI_uz</strong> orqali bog‘lanishingiz mumkin.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs font-semibold rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
          >
            Tushundim
          </button>
        </div>
      </div>
    </div>
  );
};
