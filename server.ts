import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'url';
import { validatePhoneNumber, sanitizeText } from './src/utils/phoneValidator.js';
import { initialServices, defaultSiteSettings } from './src/data/defaultData.js';
import { Order, SavedItem, ServiceItem, SiteSettings } from './src/types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Persistent Database Directory & File
const DATA_DIR = path.resolve(__dirname, 'data');
const DB_FILE = path.resolve(DATA_DIR, 'db.json');

interface DatabaseSchema {
  admin: {
    username: string;
    salt: string;
    passwordHash: string;
  };
  services: ServiceItem[];
  orders: Order[];
  savedItems: SavedItem[];
  settings: SiteSettings;
  activeSessions: Record<string, { username: string; expiresAt: number }>;
}

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

function initDatabase(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      return parsed;
    } catch (e) {
      console.error('Error reading db.json, recreating with defaults:', e);
    }
  }

  // Create initial admin with a secure default or env override
  const initialAdminPass = process.env.ADMIN_PASSWORD || 'vizon2026!';
  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(initialAdminPass, salt);

  const initialDb: DatabaseSchema = {
    admin: {
      username: 'admin',
      salt,
      passwordHash,
    },
    services: initialServices,
    orders: [
      {
        id: 'VZ-108420',
        customerName: 'Sardorbek',
        phone: '+998 90 123 45 67',
        serviceId: 'srv-yt-verify',
        serviceTitle: 'YouTube raqam bilan tasdiqlash',
        country: 'AQSH (USA)',
        notes: 'AQSH raqami orqali kanalni tasdiqlash zarur',
        status: 'in_progress',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'VZ-109753',
        customerName: 'Javohir',
        phone: '+998 93 456 78 90',
        serviceId: 'srv-ai-video',
        serviceTitle: 'AI video tayyorlash',
        notes: 'Instagram Reels uchun 15 soniyalik reklama roligi',
        status: 'new',
        createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    savedItems: [
      {
        id: 'note-1',
        title: 'Mijozlar bilan ishlash qoidalari',
        content: 'Har bir kelgan yangi buyurtmaga 15 daqiqa ichida qo‘ng‘iroq qilib, reja va narxni tasdiqlash kerak.',
        category: 'eslatma',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'note-2',
        title: 'YouTube raqamlar partiyasi',
        content: 'AQSH va Indoneziya raqamlarining yangi partiyasi tekshirildi, barcha SMS kodlar 100% kelmoqda.',
        category: 'loyiha',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    settings: defaultSiteSettings,
    activeSessions: {},
  };

  fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
  return initialDb;
}

let db: DatabaseSchema = initDatabase();

function saveDatabase(): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save db.json:', err);
  }
}

// Authentication Middleware
function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization || (req.headers['x-admin-token'] as string);
  if (!authHeader) {
    res.status(401).json({ error: 'Ruxsat berilmagan. Iltimos, admin sifatida tizimga kiring.' });
    return;
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  const session = db.activeSessions[token];

  if (!session || session.expiresAt < Date.now()) {
    if (session) {
      delete db.activeSessions[token];
      saveDatabase();
    }
    res.status(401).json({ error: 'Sessiya muddati tugagan yoki noto‘g‘ri token.' });
    return;
  }

  // Valid session
  next();
}

// ---------------- API ROUTES ----------------

// 1. Public Config
app.get('/api/public/config', (_req: Request, res: Response) => {
  res.json({
    services: db.services.filter((s) => s.isActive),
    settings: db.settings,
  });
});

// 2. Submit Order
app.post('/api/orders', (req: Request, res: Response) => {
  const { customerName, phone, serviceId, country, notes } = req.body;

  const phoneValidation = validatePhoneNumber(phone);
  if (!phoneValidation.isValid) {
    res.status(400).json({ error: phoneValidation.error || 'Telefon raqami noto‘g‘ri kiritilgan.' });
    return;
  }

  const matchedService = db.services.find((s) => s.id === serviceId);
  const serviceTitle = matchedService ? matchedService.titleUz : sanitizeText(serviceId || 'Boshqa xizmat');

  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  const orderId = `VZ-${randomDigits}`;

  const newOrder: Order = {
    id: orderId,
    customerName: sanitizeText(customerName || 'Mijoz', 80),
    phone: phoneValidation.formatted,
    serviceId: sanitizeText(serviceId, 50),
    serviceTitle,
    country: country ? sanitizeText(country, 60) : undefined,
    notes: notes ? sanitizeText(notes, 500) : undefined,
    status: 'new',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.orders.unshift(newOrder);
  saveDatabase();

  res.status(201).json({
    success: true,
    message: 'Buyurtmangiz muvaffaqiyatli qabul qilindi!',
    order: newOrder,
    contactInfo: {
      phone: db.settings.contactPhone,
      telegram: db.settings.telegramUsername
        ? `https://t.me/${db.settings.telegramUsername}`
        : `tel:${db.settings.telegramPhone.replace(/\s+/g, '')}`,
      telegramDisplay: db.settings.telegramUsername ? `@${db.settings.telegramUsername}` : db.settings.telegramPhone,
      youtube: db.settings.youtubeUrl,
      youtubeName: db.settings.youtubeChannelName,
    },
  });
});

// 3. Admin Login
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: 'Login va parolni kiriting.' });
    return;
  }

  if (username !== db.admin.username) {
    res.status(401).json({ error: 'Login yoki parol xato!' });
    return;
  }

  const hash = hashPassword(password, db.admin.salt);
  if (hash !== db.admin.passwordHash) {
    res.status(401).json({ error: 'Login yoki parol xato!' });
    return;
  }

  // Create session token (valid for 7 days)
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;

  db.activeSessions[token] = {
    username: db.admin.username,
    expiresAt,
  };
  saveDatabase();

  res.json({
    success: true,
    token,
    user: { username: db.admin.username },
  });
});

// 4. Admin Session Check
app.get('/api/admin/me', requireAdmin, (_req: Request, res: Response) => {
  res.json({
    authenticated: true,
    username: db.admin.username,
  });
});

// 5. Admin Logout
app.post('/api/admin/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization || (req.headers['x-admin-token'] as string);
  if (authHeader) {
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    delete db.activeSessions[token];
    saveDatabase();
  }
  res.json({ success: true });
});

// 6. Admin Orders
app.get('/api/admin/orders', requireAdmin, (_req: Request, res: Response) => {
  res.json({ orders: db.orders });
});

app.patch('/api/admin/orders/:id/status', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['new', 'in_progress', 'completed', 'cancelled'];
  if (!validStatuses.includes(status)) {
    res.status(400).json({ error: 'Noto‘g‘ri holat tanlandi.' });
    return;
  }

  const order = db.orders.find((o) => o.id === id);
  if (!order) {
    res.status(404).json({ error: 'Buyurtma topilmadi.' });
    return;
  }

  order.status = status;
  order.updatedAt = new Date().toISOString();
  saveDatabase();

  res.json({ success: true, order });
});

app.delete('/api/admin/orders/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLen = db.orders.length;
  db.orders = db.orders.filter((o) => o.id !== id);

  if (db.orders.length === initialLen) {
    res.status(404).json({ error: 'Buyurtma topilmadi.' });
    return;
  }

  saveDatabase();
  res.json({ success: true, message: 'Buyurtma o‘chirildi.' });
});

// 7. Admin Services Management
app.get('/api/admin/services', requireAdmin, (_req: Request, res: Response) => {
  res.json({ services: db.services });
});

app.put('/api/admin/services/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const serviceIndex = db.services.findIndex((s) => s.id === id);
  if (serviceIndex === -1) {
    res.status(404).json({ error: 'Xizmat topilmadi.' });
    return;
  }

  const current = db.services[serviceIndex];
  db.services[serviceIndex] = {
    ...current,
    ...req.body,
    id: current.id, // prevent changing id
  };
  saveDatabase();

  res.json({ success: true, service: db.services[serviceIndex] });
});

app.post('/api/admin/services', requireAdmin, (req: Request, res: Response) => {
  const newService: ServiceItem = {
    id: `srv-${Date.now()}`,
    titleUz: req.body.titleUz || 'Yangi xizmat',
    titleRu: req.body.titleRu || req.body.titleUz,
    titleEn: req.body.titleEn || req.body.titleUz,
    titleTj: req.body.titleTj || req.body.titleUz,
    descUz: req.body.descUz || '',
    descRu: req.body.descRu || '',
    descEn: req.body.descEn || '',
    descTj: req.body.descTj || '',
    priceDisplayUz: req.body.priceDisplayUz || 'Kelishilgan narxda',
    priceDisplayRu: req.body.priceDisplayRu || 'По договоренности',
    priceDisplayEn: req.body.priceDisplayEn || 'Negotiable',
    priceDisplayTj: req.body.priceDisplayTj || 'Бо маслиҳат',
    basePrice: req.body.basePrice || 0,
    category: req.body.category || 'web',
    iconName: req.body.iconName || 'Sparkles',
    isActive: req.body.isActive !== false,
  };

  db.services.push(newService);
  saveDatabase();
  res.status(201).json({ success: true, service: newService });
});

app.delete('/api/admin/services/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  db.services = db.services.filter((s) => s.id !== id);
  saveDatabase();
  res.json({ success: true });
});

// 8. Admin Saved Items ("Saqlangan narsalar")
app.get('/api/admin/notes', requireAdmin, (_req: Request, res: Response) => {
  res.json({ notes: db.savedItems });
});

app.post('/api/admin/notes', requireAdmin, (req: Request, res: Response) => {
  const { title, content, category } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: 'Sarlavha va matn kiritilishi shart.' });
    return;
  }

  const newNote: SavedItem = {
    id: `note-${Date.now()}`,
    title: sanitizeText(title, 120),
    content: sanitizeText(content, 2000),
    category: category || 'eslatma',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.savedItems.unshift(newNote);
  saveDatabase();
  res.status(201).json({ success: true, note: newNote });
});

app.put('/api/admin/notes/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const note = db.savedItems.find((n) => n.id === id);
  if (!note) {
    res.status(404).json({ error: 'Eslatma topilmadi.' });
    return;
  }

  if (req.body.title) note.title = sanitizeText(req.body.title, 120);
  if (req.body.content) note.content = sanitizeText(req.body.content, 2000);
  if (req.body.category) note.category = req.body.category;
  note.updatedAt = new Date().toISOString();

  saveDatabase();
  res.json({ success: true, note });
});

app.delete('/api/admin/notes/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  db.savedItems = db.savedItems.filter((n) => n.id !== id);
  saveDatabase();
  res.json({ success: true });
});

// 9. Admin Site Settings
app.put('/api/admin/settings', requireAdmin, (req: Request, res: Response) => {
  db.settings = {
    ...db.settings,
    ...req.body,
  };
  saveDatabase();
  res.json({ success: true, settings: db.settings });
});

// 10. Admin Password Change
app.put('/api/admin/password', requireAdmin, (req: Request, res: Response) => {
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 6) {
    res.status(400).json({ error: 'Parol kamida 6 belgidan iborat bo‘lishi kerak.' });
    return;
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(newPassword, salt);
  db.admin.salt = salt;
  db.admin.passwordHash = passwordHash;
  saveDatabase();

  res.json({ success: true, message: 'Parol muvaffaqiyatli o‘zgartirildi.' });
});

// ---------------- VITE / STATIC INTEGRATION ----------------
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
