import { Language } from '../types';

export interface Translations {
  // Brand
  brandName: string;
  brandTagline: string;
  
  // Navigation
  navServices: string;
  navWhyUs: string;
  navOrder: string;
  navPromo: string;
  navContact: string;
  adminLoginNav: string;

  // Hero
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroCtaServices: string;
  heroCtaOrder: string;
  heroCtaYoutube: string;
  heroStatOrders: string;
  heroStatSatisfaction: string;
  heroStatSpeed: string;

  // Services Section
  servicesSectionTitle: string;
  servicesSectionSubtitle: string;
  serviceOrderBtn: string;
  servicePriceFrom: string;
  servicePopularBadge: string;
  legalDisclaimerTitle: string;
  legalDisclaimerText: string;

  // Service Details
  srvYtNumberTitle: string;
  srvYtNumberDesc: string;
  srvYtConfigTitle: string;
  srvYtConfigDesc: string;
  srvAiVideoTitle: string;
  srvAiVideoDesc: string;
  srvAiMusicTitle: string;
  srvAiMusicDesc: string;
  srvWebsiteTitle: string;
  srvWebsiteDesc: string;

  // Country pricing labels
  countryUsa: string;
  countryId: string;
  countryOther: string;
  countrySelectLabel: string;
  countrySelectPlaceholder: string;

  // Order Modal
  modalTitle: string;
  modalSubtitle: string;
  labelName: string;
  placeholderName: string;
  labelPhone: string;
  placeholderPhone: string;
  labelService: string;
  labelCountry: string;
  labelNotes: string;
  placeholderNotes: string;
  btnSubmitOrder: string;
  btnSubmitting: string;
  orderSuccessTitle: string;
  orderSuccessDesc: string;
  orderIdLabel: string;
  orderContactTitle: string;
  orderContactCall: string;
  orderContactTelegram: string;
  orderContactYoutube: string;
  orderCloseBtn: string;
  errorPhoneRequired: string;
  errorGeneric: string;

  // Ad Banner Section
  bannerCenterTitle: string;
  bannerSubtitle: string;
  bannerContactLabel: string;
  bannerPhone: string;
  bannerYoutubeLabel: string;
  bannerTelegramLabel: string;
  bannerCtaOrder: string;
  bannerCtaChannel: string;
  bannerFeatureFast: string;
  bannerFeatureSecurity: string;
  bannerFeatureSupport: string;

  // Footer
  footerServicesTitle: string;
  footerContactTitle: string;
  footerAboutText: string;
  footerPrivacy: string;
  footerTerms: string;
  footerRights: string;
  footerAdminLink: string;

  // Admin Portal
  adminTitle: string;
  adminSubtitle: string;
  adminTabOrders: string;
  adminTabServices: string;
  adminTabSaved: string;
  adminTabSettings: string;
  adminLogout: string;
  adminLoginTitle: string;
  adminLoginDesc: string;
  adminUsernameLabel: string;
  adminPasswordLabel: string;
  adminLoginBtn: string;
  adminLoginError: string;
  adminNewOrdersCount: string;
  adminSearchOrders: string;
  adminFilterAll: string;
  adminFilterNew: string;
  adminFilterInProgress: string;
  adminFilterCompleted: string;
  adminFilterCancelled: string;
  adminEmptyOrders: string;
  adminOrderId: string;
  adminCustomer: string;
  adminPhone: string;
  adminService: string;
  adminDate: string;
  adminStatus: string;
  adminActions: string;
  adminStatusNew: string;
  adminStatusInProgress: string;
  adminStatusCompleted: string;
  adminStatusCancelled: string;
  adminDeleteConfirm: string;
  adminSavedTitle: string;
  adminSavedDesc: string;
  adminAddSavedBtn: string;
  adminSaveNoteTitle: string;
  adminSaveNoteContent: string;
  adminSaveNoteCategory: string;
  adminEmptySaved: string;
  adminSettingsSavedNotice: string;
  adminSaveSettingsBtn: string;
  adminEditServiceTitle: string;
  adminServicePriceLabel: string;
  adminServiceStatusLabel: string;
  adminActive: string;
  adminInactive: string;
  adminSave: string;
  adminCancel: string;
  adminPasswordChange: string;
  adminNewPasswordLabel: string;
  adminUpdatePasswordBtn: string;
}

export const translations: Record<Language, Translations> = {
  uz: {
    brandName: 'VizonYORDAMCHI',
    brandTagline: 'Raqamli xizmatlaringiz uchun aqlli yordamchi',
    navServices: 'Xizmatlar',
    navWhyUs: 'Afzalliklar',
    navOrder: 'Buyurtma berish',
    navPromo: 'Maxsus taklif',
    navContact: 'Aloqa',
    adminLoginNav: 'Admin tizim',

    heroBadge: 'Innovatsion AI & Raqamli Xizmatlar Markazi',
    heroTitle: 'VizonYORDAMCHI — Raqamli xizmatlaringiz uchun',
    heroHighlight: 'aqlli yordamchi',
    heroSubtitle: 'YouTube, AI video, AI musiqa va zamonaviy website xizmatlari — qulay narxlarda, bitta joyda.',
    heroCtaServices: 'Xizmatlarni ko‘rish',
    heroCtaOrder: 'Buyurtma berish',
    heroCtaYoutube: 'YouTube kanalimiz',
    heroStatOrders: '100% Kafolatli yordam',
    heroStatSatisfaction: 'Tezkor bajarilish',
    heroStatSpeed: 'Doimiy qo‘llab-quvvatlash',

    servicesSectionTitle: 'Xizmatlar va Shaffof Narxlar',
    servicesSectionSubtitle: 'Barcha raqamli xizmatlarimiz professional darajada, sifatli va tez muddatda bajariladi.',
    serviceOrderBtn: 'Buyurtma berish',
    servicePriceFrom: 'dan',
    servicePopularBadge: 'Ommabop',
    legalDisclaimerTitle: 'Qonuniy va xavfsiz xizmat',
    legalDisclaimerText: 'Faqat qonuniy, foydalanuvchi ruxsatiga ega va platforma qoidalariga mos tasdiqlash xizmatlari ko‘rsatiladi. Raqam mavjudligi va platforma qoidalariga muvofiq bajariladi.',

    srvYtNumberTitle: 'YouTube raqam bilan tasdiqlash',
    srvYtNumberDesc: 'YouTube kanalingiz imkoniyatlarini kengaytirish uchun mos xorijiy raqamlar orqali qonuniy tasdiqlash.',
    srvYtConfigTitle: 'YouTube akkauntini to‘g‘ri sozlash',
    srvYtConfigDesc: 'YouTube akkauntingizni to‘g‘ri sozlash va kanalni boshlashda yordam.',
    srvAiVideoTitle: 'AI video tayyorlash',
    srvAiVideoDesc: 'G‘oyangiz asosida kreativ AI video va reklama roliklari.',
    srvAiMusicTitle: 'AI musiqa yaratish',
    srvAiMusicDesc: 'Fikringiz, matningiz yoki g‘oyangizni AI yordamida qo‘shiqqa aylantirish.',
    srvWebsiteTitle: 'Website yaratish',
    srvWebsiteDesc: 'Biznes, ta’lim va shaxsiy loyihalar uchun zamonaviy website.',

    countryUsa: 'AQSH raqami — 25 000 so‘m',
    countryId: 'Indoneziya raqami — 14 990 so‘m',
    countryOther: 'Boshqa raqamlar — 15 000–25 000 so‘m',
    countrySelectLabel: 'Mamlakatni tanlang',
    countrySelectPlaceholder: 'Mamlakatni tanlang...',

    modalTitle: 'Buyurtma berish',
    modalSubtitle: 'Kerakli ma’lumotlarni to‘ldiring, mutaxassisimiz tezda siz bilan bog‘lanadi.',
    labelName: 'Ism yoki taxallus',
    placeholderName: 'Masalan: Behruz',
    labelPhone: 'Telefon raqami',
    placeholderPhone: '+998 90 123 45 67',
    labelService: 'Tanlangan xizmat',
    labelCountry: 'Mamlakat tanlovi (Raqam tasdiqlash uchun)',
    labelNotes: 'Qo‘shimcha ma’lumot yoki istaklar',
    placeholderNotes: 'Buyurtmangiz haqida batafsil ma’lumot qoldiring...',
    btnSubmitOrder: 'Buyurtmani tasdiqlash',
    btnSubmitting: 'Yuborilmoqda...',
    orderSuccessTitle: 'Buyurtmangiz muvaffaqiyatli qabul qilindi!',
    orderSuccessDesc: 'Buyurtmangiz bazaga kiritildi. Mutaxassisimiz tez orada siz bilan bog‘lanadi.',
    orderIdLabel: 'Buyurtma raqami (ID)',
    orderContactTitle: 'Buyurtmangiz bo‘yicha bog‘lanish uchun:',
    orderContactCall: 'Telefon orqali qo‘ng‘iroq',
    orderContactTelegram: 'Telegram orqali murojaat',
    orderContactYoutube: 'YouTube kanalimiz',
    orderCloseBtn: 'Yopish',
    errorPhoneRequired: 'Iltimos, haqiqiy telefon raqamini to‘g‘ri kiriting (+998...)',
    errorGeneric: 'Buyurtma yuborishda xatolik yuz berdi. Qayta urinib ko‘ring.',

    bannerCenterTitle: 'VizonYORDAMCHI',
    bannerSubtitle: 'Raqamli xizmatlar va sun’iy intellekt bo‘yicha ishonchli hamkoringiz',
    bannerContactLabel: 'Murojaat uchun',
    bannerPhone: '+998 99 556 26 26',
    bannerYoutubeLabel: 'YouTube kanalimiz: VizonAI',
    bannerTelegramLabel: 'Telegram orqali bog‘lanish',
    bannerCtaOrder: 'Hozir buyurtma berish',
    bannerCtaChannel: 'YouTube kanal',
    bannerFeatureFast: 'Tez va sifatli',
    bannerFeatureSecurity: '100% Ishonchli',
    bannerFeatureSupport: 'Doimiy aloqa',

    footerServicesTitle: 'Xizmatlarimiz',
    footerContactTitle: 'Bog‘lanish va Manzil',
    footerAboutText: 'VizonYORDAMCHI — YouTube kanallarini rivojlantirish, AI video va musiqa yaratish hamda zamonaviy veb-saytlar ishlab chiqish xizmatlarini taqdim etuvchi professional platforma.',
    footerPrivacy: 'Maxfiylik siyosati',
    footerTerms: 'Foydalanish qoidalari',
    footerRights: 'Barcha huquqlar himoyalangan.',
    footerAdminLink: 'Admin boshqaruv paneli',

    adminTitle: 'VizonYORDAMCHI Boshqaruv Markazi',
    adminSubtitle: 'Buyurtmalar, xizmatlar, saqlangan narsalar va sayt sozlamalari',
    adminTabOrders: 'Buyurtmalar',
    adminTabServices: 'Xizmatlarni boshqarish',
    adminTabSaved: 'Saqlangan narsalar',
    adminTabSettings: 'Sayt sozlamalari',
    adminLogout: 'Chiqish',
    adminLoginTitle: 'Admin Portaliga Kirish',
    adminLoginDesc: 'Faqat vakolatli administrator uchun himoyalangan tizim.',
    adminUsernameLabel: 'Login',
    adminPasswordLabel: 'Maxfiy parol',
    adminLoginBtn: 'Tizimga kirish',
    adminLoginError: 'Login yoki parol noto‘g‘ri!',
    adminNewOrdersCount: 'ta yangi buyurtma',
    adminSearchOrders: 'Ism, telefon yoki ID bo‘yicha qidiruv...',
    adminFilterAll: 'Barchasi',
    adminFilterNew: 'Yangi',
    adminFilterInProgress: 'Jarayonda',
    adminFilterCompleted: 'Bajarildi',
    adminFilterCancelled: 'Bekor qilindi',
    adminEmptyOrders: 'Hozircha hech qanday buyurtma topilmadi.',
    adminOrderId: 'ID',
    adminCustomer: 'Mijoz',
    adminPhone: 'Telefon',
    adminService: 'Xizmat',
    adminDate: 'Sana',
    adminStatus: 'Holat',
    adminActions: 'Amallar',
    adminStatusNew: 'Yangi',
    adminStatusInProgress: 'Jarayonda',
    adminStatusCompleted: 'Bajarildi',
    adminStatusCancelled: 'Bekor qilindi',
    adminDeleteConfirm: 'Haqiqatan ham bu buyurtmani o‘chirmoqchimisiz?',
    adminSavedTitle: 'Admin Saqlangan Narsalar & Eslatmalar',
    adminSavedDesc: 'Faqat sizga ko‘rinadigan shaxsiy eslatmalar, muhim mijoz ma’lumotlari va loyiha rejalari.',
    adminAddSavedBtn: 'Yangi eslatma qo‘shish',
    adminSaveNoteTitle: 'Sarlavha',
    adminSaveNoteContent: 'Matn / Ma’lumot',
    adminSaveNoteCategory: 'Toifa',
    adminEmptySaved: 'Saqlangan ma’lumotlar mavjud emas.',
    adminSettingsSavedNotice: 'Sozlamalar muvaffaqiyatli saqlandi!',
    adminSaveSettingsBtn: 'Sozlamalarni saqlash',
    adminEditServiceTitle: 'Xizmatni tahrirlash',
    adminServicePriceLabel: 'Ko‘rsatiladigan narx matni',
    adminServiceStatusLabel: 'Xizmat faolligi',
    adminActive: 'Faol',
    adminInactive: 'Vaqtincha o‘chirilgan',
    adminSave: 'Saqlash',
    adminCancel: 'Bekor qilish',
    adminPasswordChange: 'Parolni yangilash',
    adminNewPasswordLabel: 'Yangi parol',
    adminUpdatePasswordBtn: 'Parolni o‘zgartirish',
  },
  ru: {
    brandName: 'VizonYORDAMCHI',
    brandTagline: 'Умный помощник для ваших цифровых услуг',
    navServices: 'Услуги',
    navWhyUs: 'Преимущества',
    navOrder: 'Заказать',
    navPromo: 'Спецпредложение',
    navContact: 'Контакты',
    adminLoginNav: 'Панель управления',

    heroBadge: 'Инновационный центр AI и цифровых услуг',
    heroTitle: 'VizonYORDAMCHI — Умный помощник для ваших',
    heroHighlight: 'цифровых услуг',
    heroSubtitle: 'YouTube, AI видео, AI музыка и современные веб-сайты — по доступным ценам в одном месте.',
    heroCtaServices: 'Посмотреть услуги',
    heroCtaOrder: 'Оформить заказ',
    heroCtaYoutube: 'Наш YouTube канал',
    heroStatOrders: '100% Гарантия помощи',
    heroStatSatisfaction: 'Быстрое исполнение',
    heroStatSpeed: 'Постоянная поддержка',

    servicesSectionTitle: 'Услуги и Прозрачные Цены',
    servicesSectionSubtitle: 'Все наши цифровые услуги выполняются профессионально, качественно и в кратчайшие сроки.',
    serviceOrderBtn: 'Оформить заказ',
    servicePriceFrom: 'от',
    servicePopularBadge: 'Популярно',
    legalDisclaimerTitle: 'Законно и безопасно',
    legalDisclaimerText: 'Оказываются исключительно законные услуги подтверждения с согласия пользователя в соответствии с правилами платформы.',

    srvYtNumberTitle: 'Подтверждение YouTube по номеру',
    srvYtNumberDesc: 'Законное подтверждение через подходящие зарубежные номера для расширения возможностей YouTube канала.',
    srvYtConfigTitle: 'Правильная настройка YouTube аккаунта',
    srvYtConfigDesc: 'Помощь в правильной настройке YouTube аккаунта и успешном запуске канала.',
    srvAiVideoTitle: 'Создание AI видео',
    srvAiVideoDesc: 'Креативные видеоролики и реклама с помощью искусственного интеллекта на основе вашей идеи.',
    srvAiMusicTitle: 'Создание AI музыки',
    srvAiMusicDesc: 'Превращение ваших мыслей, текста или идеи в полноценную песню с помощью нейросетей.',
    srvWebsiteTitle: 'Создание веб-сайтов',
    srvWebsiteDesc: 'Современные веб-сайты для бизнеса, образовательных и персональных проектов.',

    countryUsa: 'Номер США — 25 000 сум',
    countryId: 'Номер Индонезии — 14 990 сум',
    countryOther: 'Другие номера — 15 000–25 000 сум',
    countrySelectLabel: 'Выберите страну',
    countrySelectPlaceholder: 'Выберите страну...',

    modalTitle: 'Оформление заказа',
    modalSubtitle: 'Заполните форму, и наш специалист оперативно свяжется с вами.',
    labelName: 'Имя или псевдоним',
    placeholderName: 'Например: Бехруз',
    labelPhone: 'Номер телефона',
    placeholderPhone: '+998 90 123 45 67',
    labelService: 'Выбранная услуга',
    labelCountry: 'Выбор страны (для подтверждения номера)',
    labelNotes: 'Дополнительные пожелания',
    placeholderNotes: 'Опишите подробности вашего заказа...',
    btnSubmitOrder: 'Подтвердить заказ',
    btnSubmitting: 'Отправка...',
    orderSuccessTitle: 'Ваш заказ успешно принят!',
    orderSuccessDesc: 'Заказ зарегистрирован в базе. Наш специалист свяжется с вами в ближайшее время.',
    orderIdLabel: 'Номер заказа (ID)',
    orderContactTitle: 'Для связи по вашему заказу:',
    orderContactCall: 'Позвонить по телефону',
    orderContactTelegram: 'Написать в Telegram',
    orderContactYoutube: 'Наш YouTube канал',
    orderCloseBtn: 'Закрыть',
    errorPhoneRequired: 'Пожалуйста, введите корректный номер телефона (+998...)',
    errorGeneric: 'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.',

    bannerCenterTitle: 'VizonYORDAMCHI',
    bannerSubtitle: 'Ваш надежный партнер в сфере цифровых услуг и искусственного интеллекта',
    bannerContactLabel: 'Для связи',
    bannerPhone: '+998 99 556 26 26',
    bannerYoutubeLabel: 'YouTube канал: VizonAI',
    bannerTelegramLabel: 'Связаться через Telegram',
    bannerCtaOrder: 'Заказать сейчас',
    bannerCtaChannel: 'YouTube канал',
    bannerFeatureFast: 'Быстро и качественно',
    bannerFeatureSecurity: '100% Надежно',
    bannerFeatureSupport: 'Постоянная связь',

    footerServicesTitle: 'Наши услуги',
    footerContactTitle: 'Контакты',
    footerAboutText: 'VizonYORDAMCHI — профессиональная платформа для развития YouTube каналов, генерации AI видео и музыки, а также создания современных веб-сайтов.',
    footerPrivacy: 'Политика конфиденциальности',
    footerTerms: 'Условия использования',
    footerRights: 'Все права защищены.',
    footerAdminLink: 'Панель администратора',

    adminTitle: 'Центр управления VizonYORDAMCHI',
    adminSubtitle: 'Заказы, услуги, приватные заметки и настройки сайта',
    adminTabOrders: 'Заказы',
    adminTabServices: 'Управление услугами',
    adminTabSaved: 'Сохраненные заметки',
    adminTabSettings: 'Настройки сайта',
    adminLogout: 'Выйти',
    adminLoginTitle: 'Вход в панель администратора',
    adminLoginDesc: 'Доступ разрешен только уполномоченному администратору.',
    adminUsernameLabel: 'Логин',
    adminPasswordLabel: 'Пароль',
    adminLoginBtn: 'Войти',
    adminLoginError: 'Неверный логин или пароль!',
    adminNewOrdersCount: 'новых заказов',
    adminSearchOrders: 'Поиск по имени, номеру или ID...',
    adminFilterAll: 'Все',
    adminFilterNew: 'Новые',
    adminFilterInProgress: 'В процессе',
    adminFilterCompleted: 'Завершенные',
    adminFilterCancelled: 'Отмененные',
    adminEmptyOrders: 'Заказов не найдено.',
    adminOrderId: 'ID',
    adminCustomer: 'Клиент',
    adminPhone: 'Телефон',
    adminService: 'Услуга',
    adminDate: 'Дата',
    adminStatus: 'Статус',
    adminActions: 'Действия',
    adminStatusNew: 'Новый',
    adminStatusInProgress: 'В процессе',
    adminStatusCompleted: 'Завершен',
    adminStatusCancelled: 'Отменен',
    adminDeleteConfirm: 'Вы действительно хотите удалить этот заказ?',
    adminSavedTitle: 'Приватные заметки администратора',
    adminSavedDesc: 'Скрытые данные, заметки по клиентам и проектные идеи.',
    adminAddSavedBtn: 'Добавить заметку',
    adminSaveNoteTitle: 'Заголовок',
    adminSaveNoteContent: 'Текст / Содержимое',
    adminSaveNoteCategory: 'Категория',
    adminEmptySaved: 'Сохраненных данных пока нет.',
    adminSettingsSavedNotice: 'Настройки успешно сохранены!',
    adminSaveSettingsBtn: 'Сохранить настройки',
    adminEditServiceTitle: 'Редактировать услугу',
    adminServicePriceLabel: 'Отображаемая цена',
    adminServiceStatusLabel: 'Активность услуги',
    adminActive: 'Активна',
    adminInactive: 'Временно отключена',
    adminSave: 'Сохранить',
    adminCancel: 'Отмена',
    adminPasswordChange: 'Изменить пароль',
    adminNewPasswordLabel: 'Новый пароль',
    adminUpdatePasswordBtn: 'Обновить пароль',
  },
  en: {
    brandName: 'VizonYORDAMCHI',
    brandTagline: 'Intelligent assistant for your digital services',
    navServices: 'Services',
    navWhyUs: 'Advantages',
    navOrder: 'Order Now',
    navPromo: 'Featured Offer',
    navContact: 'Contact',
    adminLoginNav: 'Admin Portal',

    heroBadge: 'Innovative AI & Digital Services Hub',
    heroTitle: 'VizonYORDAMCHI — Smart assistant for your',
    heroHighlight: 'digital services',
    heroSubtitle: 'YouTube, AI video, AI music, and modern websites — at affordable prices, all in one place.',
    heroCtaServices: 'Explore Services',
    heroCtaOrder: 'Place Order',
    heroCtaYoutube: 'Our YouTube Channel',
    heroStatOrders: '100% Reliable Assistance',
    heroStatSatisfaction: 'Rapid Delivery',
    heroStatSpeed: 'Continuous Support',

    servicesSectionTitle: 'Services & Transparent Pricing',
    servicesSectionSubtitle: 'All digital services are delivered professionally, with top quality and fast turnaround.',
    serviceOrderBtn: 'Place Order',
    servicePriceFrom: 'from',
    servicePopularBadge: 'Popular',
    legalDisclaimerTitle: 'Legal & Secure Process',
    legalDisclaimerText: 'Only lawful, authorized verification services in full compliance with platform guidelines are provided. Subject to phone availability.',

    srvYtNumberTitle: 'YouTube Phone Verification',
    srvYtNumberDesc: 'Lawful phone verification using suitable international numbers to unlock advanced YouTube channel features.',
    srvYtConfigTitle: 'YouTube Account Optimization',
    srvYtConfigDesc: 'Professional assistance with optimizing your YouTube channel settings and starting your creator journey.',
    srvAiVideoTitle: 'AI Video Production',
    srvAiVideoDesc: 'Creative AI-generated video and promo clips crafted from your creative brief and concept.',
    srvAiMusicTitle: 'AI Music Generation',
    srvAiMusicDesc: 'Turn your thoughts, lyrics, or concept into full-fledged songs using advanced AI neural audio synthesis.',
    srvWebsiteTitle: 'Modern Website Development',
    srvWebsiteDesc: 'Modern responsive websites for businesses, educational initiatives, and personal projects.',

    countryUsa: 'USA number — 25,000 UZS',
    countryId: 'Indonesia number — 14,990 UZS',
    countryOther: 'Other countries — 15,000–25,000 UZS',
    countrySelectLabel: 'Select Country',
    countrySelectPlaceholder: 'Choose a country...',

    modalTitle: 'Place an Order',
    modalSubtitle: 'Please provide your details, and our specialist will reach out to you promptly.',
    labelName: 'Name or Nickname',
    placeholderName: 'e.g. Behruz',
    labelPhone: 'Phone Number',
    placeholderPhone: '+998 90 123 45 67',
    labelService: 'Selected Service',
    labelCountry: 'Country Choice (for Phone Verification)',
    labelNotes: 'Additional Details & Notes',
    placeholderNotes: 'Tell us about your project or specific requirements...',
    btnSubmitOrder: 'Confirm Order',
    btnSubmitting: 'Submitting...',
    orderSuccessTitle: 'Order Successfully Received!',
    orderSuccessDesc: 'Your order has been recorded in our system. Our team will contact you shortly.',
    orderIdLabel: 'Order ID',
    orderContactTitle: 'Contact Us Regarding Your Order:',
    orderContactCall: 'Direct Phone Call',
    orderContactTelegram: 'Message on Telegram',
    orderContactYoutube: 'Visit YouTube Channel',
    orderCloseBtn: 'Close',
    errorPhoneRequired: 'Please enter a valid phone number (+998...)',
    errorGeneric: 'An error occurred while submitting your order. Please try again.',

    bannerCenterTitle: 'VizonYORDAMCHI',
    bannerSubtitle: 'Your trusted partner in digital services and artificial intelligence',
    bannerContactLabel: 'Inquiries & Contact',
    bannerPhone: '+998 99 556 26 26',
    bannerYoutubeLabel: 'YouTube Channel: VizonAI',
    bannerTelegramLabel: 'Connect via Telegram',
    bannerCtaOrder: 'Order Now',
    bannerCtaChannel: 'YouTube Channel',
    bannerFeatureFast: 'Fast & High Quality',
    bannerFeatureSecurity: '100% Reliable',
    bannerFeatureSupport: 'Direct Communication',

    footerServicesTitle: 'Our Services',
    footerContactTitle: 'Contact Information',
    footerAboutText: 'VizonYORDAMCHI — a professional platform offering YouTube channel growth, AI video & music generation, and modern web development.',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Service',
    footerRights: 'All rights reserved.',
    footerAdminLink: 'Admin Control Center',

    adminTitle: 'VizonYORDAMCHI Control Center',
    adminSubtitle: 'Orders, services, private notes, and site configurations',
    adminTabOrders: 'Orders',
    adminTabServices: 'Service Management',
    adminTabSaved: 'Saved Notes',
    adminTabSettings: 'Site Settings',
    adminLogout: 'Log Out',
    adminLoginTitle: 'Admin Portal Login',
    adminLoginDesc: 'Protected system accessible only to authorized administrators.',
    adminUsernameLabel: 'Username',
    adminPasswordLabel: 'Password',
    adminLoginBtn: 'Log In',
    adminLoginError: 'Invalid credentials!',
    adminNewOrdersCount: 'new orders',
    adminSearchOrders: 'Search by customer, phone, or order ID...',
    adminFilterAll: 'All',
    adminFilterNew: 'New',
    adminFilterInProgress: 'In Progress',
    adminFilterCompleted: 'Completed',
    adminFilterCancelled: 'Cancelled',
    adminEmptyOrders: 'No orders found matching criteria.',
    adminOrderId: 'ID',
    adminCustomer: 'Customer',
    adminPhone: 'Phone',
    adminService: 'Service',
    adminDate: 'Date',
    adminStatus: 'Status',
    adminActions: 'Actions',
    adminStatusNew: 'New',
    adminStatusInProgress: 'In Progress',
    adminStatusCompleted: 'Completed',
    adminStatusCancelled: 'Cancelled',
    adminDeleteConfirm: 'Are you sure you want to delete this order permanently?',
    adminSavedTitle: 'Private Saved Notes & Items',
    adminSavedDesc: 'Exclusive encrypted admin notes, private client details, and internal memoranda.',
    adminAddSavedBtn: 'Add Note',
    adminSaveNoteTitle: 'Title',
    adminSaveNoteContent: 'Content / Details',
    adminSaveNoteCategory: 'Category',
    adminEmptySaved: 'No private notes saved yet.',
    adminSettingsSavedNotice: 'Settings saved successfully!',
    adminSaveSettingsBtn: 'Save Settings',
    adminEditServiceTitle: 'Edit Service',
    adminServicePriceLabel: 'Display Price String',
    adminServiceStatusLabel: 'Service Status',
    adminActive: 'Active',
    adminInactive: 'Temporarily Disabled',
    adminSave: 'Save Changes',
    adminCancel: 'Cancel',
    adminPasswordChange: 'Update Password',
    adminNewPasswordLabel: 'New Password',
    adminUpdatePasswordBtn: 'Change Password',
  },
  tj: {
    brandName: 'VizonYORDAMCHI',
    brandTagline: 'Ёрдамчии ҳушманд барои хидматҳои рақамии шумо',
    navServices: 'Хидматҳо',
    navWhyUs: 'Бартариятҳо',
    navOrder: 'Фармоиш додан',
    navPromo: 'Пешниҳоди махсус',
    navContact: 'Тамос',
    adminLoginNav: 'Панели мудир',

    heroBadge: 'Маркази инноватсионии AI ва хидматҳои рақамӣ',
    heroTitle: 'VizonYORDAMCHI — Ёрдамчии ҳушманд барои',
    heroHighlight: 'хидматҳои рақамии шумо',
    heroSubtitle: 'YouTube, AI видео, AI мусиқӣ ва сохтани вебсайтҳои муосир — бо нархҳои дастрас дар як ҷо.',
    heroCtaServices: 'Дидани хидматҳо',
    heroCtaOrder: 'Фармоиш додан',
    heroCtaYoutube: 'Канали YouTube-и мо',
    heroStatOrders: '100% Кӯмаки боэътимод',
    heroStatSatisfaction: 'Иҷрои босуръат',
    heroStatSpeed: 'Дастгирии ҳамешагӣ',

    servicesSectionTitle: 'Хидматҳо ва Нархномаи шаффоф',
    servicesSectionSubtitle: 'Ҳамаи хидматҳои рақамии мо бо сатҳи касбӣ, сифати баланд ва дар муҳлати кӯтоҳ иҷро мешаванд.',
    serviceOrderBtn: 'Фармоиш додан',
    servicePriceFrom: 'аз',
    servicePopularBadge: 'Маъруф',
    legalDisclaimerTitle: 'Хидмати қонунӣ ва бехатар',
    legalDisclaimerText: 'Танҳо хидматҳои қонунӣ бо ризояти корбар мувофиқи қоидаҳои платформа расонида мешаванд.',

    srvYtNumberTitle: 'Тасдиқи YouTube бо рақам',
    srvYtNumberDesc: 'Тасдиқи қонунӣ тавассути рақамҳои мувофиқи хориҷӣ барои фарох кардани имкониятҳои канали YouTube.',
    srvYtConfigTitle: 'Танзими дурусти ҳисоби YouTube',
    srvYtConfigDesc: 'Кӯмак дар танзими дурусти канали YouTube ва оғози фаъолият.',
    srvAiVideoTitle: 'Омода кардани видео бо AI',
    srvAiVideoDesc: 'Эҷоди видео ва наворҳои таблиғотии эҷодӣ дар асоси идеяи шумо бо зеҳни сунъӣ.',
    srvAiMusicTitle: 'Эҷоди мусиқӣ бо AI',
    srvAiMusicDesc: 'Табдил додани фикр, матн ё идеяи шумо ба суруди мукаммал бо кӯмаки AI.',
    srvWebsiteTitle: 'Сохтани вебсайт',
    srvWebsiteDesc: 'Вебсайтҳои муосир барои тиҷорат, таҳсилот ва лоиҳаҳои шахсӣ.',

    countryUsa: 'Рақами ИМА — 25 000 сӯм',
    countryId: 'Рақами Индонезия — 14 990 сӯм',
    countryOther: 'Дигар рақамҳо — 15 000–25 000 сӯм',
    countrySelectLabel: 'Кишварро интихоб кунед',
    countrySelectPlaceholder: 'Интихоби кишвар...',

    modalTitle: 'Сабти фармоиш',
    modalSubtitle: 'Маълумоти заруриро ворид кунед, мутахассиси мо зуд бо шумо дар тамос мешавад.',
    labelName: 'Ном ё лақаб',
    placeholderName: 'Масалан: Беҳрӯз',
    labelPhone: 'Рақами телефон',
    placeholderPhone: '+998 90 123 45 67',
    labelService: 'Хидмати интихобшуда',
    labelCountry: 'Интихоби кишвар (барои тасдиқи рақам)',
    labelNotes: 'Маълумоти иловагӣ ё хоҳишҳо',
    placeholderNotes: 'Дар бораи фармоиши худ муфассал нависед...',
    btnSubmitOrder: 'Тасдиқи фармоиш',
    btnSubmitting: 'Фиристода истодааст...',
    orderSuccessTitle: 'Фармоиши шумо бомуваффақият қабул шуд!',
    orderSuccessDesc: 'Фармоиши шумо дар пойгоҳ сабт шуд. Мутахассиси мо ба зудӣ бо шумо тамос мегирад.',
    orderIdLabel: 'Рақами фармоиш (ID)',
    orderContactTitle: 'Барои тамос оид ба фармоиши шумо:',
    orderContactCall: 'Занг задан',
    orderContactTelegram: 'Навиштан ба Telegram',
    orderContactYoutube: 'Канали YouTube',
    orderCloseBtn: 'Пӯшидан',
    errorPhoneRequired: 'Лутфан, рақами телефони дурустро ворид кунед (+998...)',
    errorGeneric: 'Ҳангоми фиристодан хатогӣ рух дод. Лутфан, аз нав кӯшиш кунед.',

    bannerCenterTitle: 'VizonYORDAMCHI',
    bannerSubtitle: 'Шарики боэътимоди шумо дар хидматҳои рақамӣ ва зеҳни сунъӣ',
    bannerContactLabel: 'Барои тамос',
    bannerPhone: '+998 99 556 26 26',
    bannerYoutubeLabel: 'Канали YouTube: VizonAI',
    bannerTelegramLabel: 'Тамос тавассути Telegram',
    bannerCtaOrder: 'Ҳозир фармоиш диҳед',
    bannerCtaChannel: 'Канали YouTube',
    bannerFeatureFast: 'Зуд ва босифат',
    bannerFeatureSecurity: '100% Боэътимод',
    bannerFeatureSupport: 'Алоқаи доимӣ',

    footerServicesTitle: 'Хидматҳои мо',
    footerContactTitle: 'Тамос ва нишонӣ',
    footerAboutText: 'VizonYORDAMCHI — платформаи касбӣ барои рушди каналҳои YouTube, эҷоди AI видео ва мусиқӣ ва сохтани вебсайтҳои муосир.',
    footerPrivacy: 'Сиёсати махфият',
    footerTerms: 'Шартҳои истифода',
    footerRights: 'Ҳамаи ҳуқуқҳо ҳифз шудаанд.',
    footerAdminLink: 'Панели мудир',

    adminTitle: 'Маркази идораи VizonYORDAMCHI',
    adminSubtitle: 'Фармоишҳо, хидматҳо, ёддоштҳо ва танзимоти сайт',
    adminTabOrders: 'Фармоишҳо',
    adminTabServices: 'Идораи хидматҳо',
    adminTabSaved: 'Ёддоштҳои маҳфуз',
    adminTabSettings: 'Танзимоти сайт',
    adminLogout: 'Баромадан',
    adminLoginTitle: 'Вуруд ба панели мудир',
    adminLoginDesc: 'Танҳо барои мудири ваколатдор дастрас аст.',
    adminUsernameLabel: 'Логин',
    adminPasswordLabel: 'Парол',
    adminLoginBtn: 'Вуруд',
    adminLoginError: 'Логин ё пароли нодуруст!',
    adminNewOrdersCount: 'фармоиши нав',
    adminSearchOrders: 'Ҷустуҷӯ аз рӯи ном, телефон ё ID...',
    adminFilterAll: 'Ҳама',
    adminFilterNew: 'Нав',
    adminFilterInProgress: 'Дар раванд',
    adminFilterCompleted: 'Иҷрошуда',
    adminFilterCancelled: 'Бекоршуда',
    adminEmptyOrders: 'Ҳеҷ фармоиш ёфт нашуд.',
    adminOrderId: 'ID',
    adminCustomer: 'Мизоҷ',
    adminPhone: 'Телефон',
    adminService: 'Хидмат',
    adminDate: 'Сана',
    adminStatus: 'Ҳолат',
    adminActions: 'Амалҳо',
    adminStatusNew: 'Нав',
    adminStatusInProgress: 'Дар раванд',
    adminStatusCompleted: 'Иҷрошуда',
    adminStatusCancelled: 'Бекоршуда',
    adminDeleteConfirm: 'Оё шумо воқеан мехоҳед ин фармоишро нест кунед?',
    adminSavedTitle: 'Ёддоштҳои маҳфузи мудир',
    adminSavedDesc: 'Маълумотҳои махфӣ барои мудир, ёддоштҳо оид ба мизоҷон ва нақшаҳои лоиҳа.',
    adminAddSavedBtn: 'Илова кардани ёддошт',
    adminSaveNoteTitle: 'Сарлавҳа',
    adminSaveNoteContent: 'Матн / Маълумот',
    adminSaveNoteCategory: 'Гурӯҳ',
    adminEmptySaved: 'Ҳоло маълумоти сабтшуда нест.',
    adminSettingsSavedNotice: 'Танзимот бомуваффақият сабт шуд!',
    adminSaveSettingsBtn: 'Сабти танзимот',
    adminEditServiceTitle: 'Таҳрири хидмат',
    adminServicePriceLabel: 'Матни намоиши нарх',
    adminServiceStatusLabel: 'Фаъолияти хидмат',
    adminActive: 'Фаъол',
    adminInactive: 'Муваққатан хомӯш',
    adminSave: 'Сабт кардан',
    adminCancel: 'Бекор кардан',
    adminPasswordChange: 'Иваз кардани парол',
    adminNewPasswordLabel: 'Пароли нав',
    adminUpdatePasswordBtn: 'Навсозии парол',
  },
};
