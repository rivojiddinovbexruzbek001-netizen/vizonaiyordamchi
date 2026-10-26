export type Language = 'uz' | 'ru' | 'en' | 'tj';

export type Theme = 'dark' | 'light';

export type OrderStatus = 'new' | 'in_progress' | 'completed' | 'cancelled';

export interface ServiceItem {
  id: string;
  titleUz: string;
  titleRu: string;
  titleEn: string;
  titleTj: string;
  descUz: string;
  descRu: string;
  descEn: string;
  descTj: string;
  priceDisplayUz: string;
  priceDisplayRu: string;
  priceDisplayEn: string;
  priceDisplayTj: string;
  basePrice: number;
  category: 'youtube' | 'ai' | 'web';
  badge?: string;
  imageUrl?: string;
  iconName: string;
  isActive: boolean;
  hasCountrySelect?: boolean;
  countryPricing?: {
    code: string;
    nameUz: string;
    nameRu: string;
    nameEn: string;
    nameTj: string;
    price: string;
  }[];
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  serviceId: string;
  serviceTitle: string;
  country?: string;
  notes?: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SavedItem {
  id: string;
  title: string;
  content: string;
  category: 'eslatma' | 'mijoz' | 'loyiha' | 'boshqa';
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  contactPhone: string;
  telegramUsername: string;
  telegramPhone: string;
  youtubeChannelName: string;
  youtubeUrl: string;
  bannerTitle: string;
  bannerSubtitle: string;
}
