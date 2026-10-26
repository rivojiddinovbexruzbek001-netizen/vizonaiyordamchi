import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  LogOut,
  ShoppingBag,
  Layers,
  Bookmark,
  Sliders,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Trash2,
  Edit2,
  Plus,
  RefreshCw,
  Phone,
  Send,
  Youtube,
  Key,
  Save,
  Check,
} from 'lucide-react';
import { Language, Order, OrderStatus, SavedItem, ServiceItem, SiteSettings } from '../types';
import { translations } from '../utils/translations';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  token: string | null;
  onLoginSuccess: (token: string) => void;
  onLogout: () => void;
  onSettingsUpdated: (settings: SiteSettings) => void;
  onServicesUpdated: (services: ServiceItem[]) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  lang,
  token,
  onLoginSuccess,
  onLogout,
  onSettingsUpdated,
  onServicesUpdated,
}) => {
  const t = translations[lang];

  // Auth State
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Tabs: 'orders' | 'services' | 'saved' | 'settings'
  const [activeTab, setActiveTab] = useState<'orders' | 'services' | 'saved' | 'settings'>('orders');

  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  // Services State
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);

  // Saved Items State
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [savedLoading, setSavedLoading] = useState(false);
  const [editingNote, setEditingNote] = useState<Partial<SavedItem> | null>(null);

  // Settings State
  const [settingsForm, setSettingsForm] = useState<SiteSettings | null>(null);
  const [settingsSavedNotice, setSettingsSavedNotice] = useState(false);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [passwordChangeNotice, setPasswordChangeNotice] = useState<string | null>(null);

  // Fetch admin data when logged in
  useEffect(() => {
    if (isOpen && token) {
      fetchOrders();
      fetchAdminServices();
      fetchSavedItems();
      fetchSettings();
    }
  }, [isOpen, token]);

  const fetchOrders = async () => {
    if (!token) return;
    setOrdersLoading(true);
    try {
      const res = await fetch('/api/admin/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      } else if (res.status === 401) {
        onLogout();
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setOrdersLoading(false);
    }
  };

  const fetchAdminServices = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/admin/services', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setServices(data.services || []);
        onServicesUpdated(data.services || []);
      }
    } catch (err) {
      console.error('Failed to fetch services:', err);
    }
  };

  const fetchSavedItems = async () => {
    if (!token) return;
    setSavedLoading(true);
    try {
      const res = await fetch('/api/admin/notes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSavedItems(data.notes || []);
      }
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    } finally {
      setSavedLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/public/config');
      if (res.ok) {
        const data = await res.json();
        setSettingsForm(data.settings);
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || t.adminLoginError);
      }

      onLoginSuccess(data.token);
      setPassword('');
    } catch (err: any) {
      setLoginError(err.message || t.adminLoginError);
    } finally {
      setLoginLoading(false);
    }
  };

  // Orders Actions
  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        if (selectedOrderDetails?.id === orderId) {
          setSelectedOrderDetails((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!token || !window.confirm(t.adminDeleteConfirm)) return;
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setOrders((prev) => prev.filter((o) => o.id !== orderId));
        if (selectedOrderDetails?.id === orderId) {
          setSelectedOrderDetails(null);
        }
      }
    } catch (err) {
      console.error('Failed to delete order:', err);
    }
  };

  // Services Actions
  const handleSaveService = async (service: ServiceItem) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/services/${service.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(service),
      });
      if (res.ok) {
        await fetchAdminServices();
        setEditingService(null);
      }
    } catch (err) {
      console.error('Failed to save service:', err);
    }
  };

  // Saved Notes Actions
  const handleSaveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editingNote || !editingNote.title || !editingNote.content) return;

    try {
      if (editingNote.id) {
        // Update existing note
        const res = await fetch(`/api/admin/notes/${editingNote.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editingNote),
        });
        if (res.ok) {
          await fetchSavedItems();
          setEditingNote(null);
        }
      } else {
        // Create new note
        const res = await fetch('/api/admin/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editingNote),
        });
        if (res.ok) {
          await fetchSavedItems();
          setEditingNote(null);
        }
      }
    } catch (err) {
      console.error('Failed to save note:', err);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!token || !window.confirm('Eslatmani o‘chirmoqchimisiz?')) return;
    try {
      const res = await fetch(`/api/admin/notes/${noteId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setSavedItems((prev) => prev.filter((n) => n.id !== noteId));
      }
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  // Settings Actions
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !settingsForm) return;

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settingsForm),
      });
      if (res.ok) {
        const data = await res.json();
        onSettingsUpdated(data.settings);
        setSettingsSavedNotice(true);
        setTimeout(() => setSettingsSavedNotice(false), 3000);
      }
    } catch (err) {
      console.error('Failed to save settings:', err);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || newPasswordInput.length < 6) return;

    try {
      const res = await fetch('/api/admin/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword: newPasswordInput }),
      });
      const data = await res.json();
      if (res.ok) {
        setPasswordChangeNotice('Parol muvaffaqiyatli yangilandi!');
        setNewPasswordInput('');
        setTimeout(() => setPasswordChangeNotice(null), 3000);
      } else {
        setPasswordChangeNotice(data.error || 'Parolni yangilashda xatolik!');
      }
    } catch (err) {
      setPasswordChangeNotice('Server bilan aloqa xatosi!');
    }
  };

  if (!isOpen) return null;

  // Filter orders
  const newOrdersCount = orders.filter((o) => o.status === 'new').length;
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesQuery =
      !searchQuery ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.phone.includes(searchQuery) ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-5xl h-[92vh] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Bar */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{t.adminTitle}</span>
                {token && newOrdersCount > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                    {newOrdersCount} {t.adminNewOrdersCount}
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-500">{t.adminSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {token && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors"
                title={t.adminLogout}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.adminLogout}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Unauthenticated View: Login Modal */}
        {!token ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
            <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-7 shadow-xl">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-3">
                  <Key className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  {t.adminLoginTitle}
                </h3>
                <p className="text-xs text-slate-500">{t.adminLoginDesc}</p>
              </div>

              {loginError && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.adminUsernameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.adminPasswordLabel}
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-2.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-500/20 active:scale-[0.98] disabled:opacity-50 mt-2"
                >
                  {loginLoading ? 'Kirilmoqda...' : t.adminLoginBtn}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 p-3 flex md:flex-col gap-1.5 shrink-0 bg-slate-50 dark:bg-slate-950 overflow-x-auto">
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 text-left ${
                  activeTab === 'orders'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900'
                }`}
              >
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span>{t.adminTabOrders}</span>
                {newOrdersCount > 0 && (
                  <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.2 rounded-full ${activeTab === 'orders' ? 'bg-slate-950 text-amber-400' : 'bg-amber-500 text-slate-950'}`}>
                    {newOrdersCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 text-left ${
                  activeTab === 'services'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900'
                }`}
              >
                <Layers className="w-4 h-4 shrink-0" />
                <span>{t.adminTabServices}</span>
              </button>

              <button
                onClick={() => setActiveTab('saved')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 text-left ${
                  activeTab === 'saved'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900'
                }`}
              >
                <Bookmark className="w-4 h-4 shrink-0" />
                <span>{t.adminTabSaved}</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 text-left ${
                  activeTab === 'settings'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900'
                }`}
              >
                <Sliders className="w-4 h-4 shrink-0" />
                <span>{t.adminTabSettings}</span>
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-5 sm:p-6 overflow-y-auto bg-white dark:bg-slate-900">
              {/* TAB 1: ORDERS */}
              {activeTab === 'orders' && (
                <div>
                  {/* Search and Filters Toolbar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t.adminSearchOrders}
                        className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                      {(['all', 'new', 'in_progress', 'completed', 'cancelled'] as (
                        | 'all'
                        | OrderStatus
                      )[]).map((st) => (
                        <button
                          key={st}
                          onClick={() => setStatusFilter(st)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                            statusFilter === st
                              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {st === 'all'
                            ? t.adminFilterAll
                            : st === 'new'
                            ? t.adminFilterNew
                            : st === 'in_progress'
                            ? t.adminFilterInProgress
                            : st === 'completed'
                            ? t.adminFilterCompleted
                            : t.adminFilterCancelled}
                        </button>
                      ))}

                      <button
                        onClick={fetchOrders}
                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-amber-500 transition-colors"
                        title="Yangilash"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${ordersLoading ? 'animate-spin' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Orders List Table */}
                  {filteredOrders.length === 0 ? (
                    <div className="text-center py-16 text-slate-400">
                      <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">{t.adminEmptyOrders}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredOrders.map((order) => (
                        <div
                          key={order.id}
                          className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-amber-500/40 transition-colors"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                                {order.id}
                              </span>
                              <span className="text-xs text-slate-400">
                                {new Date(order.createdAt).toLocaleString()}
                              </span>
                              {order.country && (
                                <span className="text-[11px] text-slate-500 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded">
                                  {order.country}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                {order.customerName}
                              </h4>
                              <a
                                href={`tel:${order.phone.replace(/\s+/g, '')}`}
                                className="text-xs font-mono font-medium text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                              >
                                <Phone className="w-3 h-3" />
                                {order.phone}
                              </a>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              <span className="font-medium text-slate-700 dark:text-slate-300">
                                {order.serviceTitle}
                              </span>
                              {order.notes && <span> — “{order.notes}”</span>}
                            </p>
                          </div>

                          {/* Status and Action Buttons */}
                          <div className="flex items-center gap-2 sm:self-center">
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)
                              }
                              className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border focus:outline-none ${
                                order.status === 'new'
                                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400'
                                  : order.status === 'in_progress'
                                  ? 'bg-sky-500/15 border-sky-500/40 text-sky-600 dark:text-sky-400'
                                  : order.status === 'completed'
                                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                                  : 'bg-red-500/15 border-red-500/40 text-red-600 dark:text-red-400'
                              }`}
                            >
                              <option value="new">{t.adminStatusNew}</option>
                              <option value="in_progress">{t.adminStatusInProgress}</option>
                              <option value="completed">{t.adminStatusCompleted}</option>
                              <option value="cancelled">{t.adminStatusCancelled}</option>
                            </select>

                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                              title="O‘chirish"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: SERVICES MANAGEMENT */}
              {activeTab === 'services' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {t.adminTabServices}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {services.map((srv) => (
                      <div
                        key={srv.id}
                        className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                              {srv.titleUz}
                            </h4>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                srv.isActive
                                  ? 'bg-emerald-500/15 text-emerald-500'
                                  : 'bg-red-500/15 text-red-500'
                              }`}
                            >
                              {srv.isActive ? t.adminActive : t.adminInactive}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">{srv.descUz}</p>
                          <p className="text-xs font-semibold text-amber-500">
                            Narx: {srv.priceDisplayUz}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleSaveService({ ...srv, isActive: !srv.isActive })
                            }
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                              srv.isActive
                                ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                                : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                            }`}
                          >
                            {srv.isActive ? t.adminInactive : t.adminActive}
                          </button>
                          <button
                            onClick={() => setEditingService(srv)}
                            className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors"
                            title="Tahrirlash"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Edit Service Modal */}
                  {editingService && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
                        <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                          {t.adminEditServiceTitle}: {editingService.titleUz}
                        </h4>

                        <div className="space-y-3.5">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              {t.adminServicePriceLabel} (UZ)
                            </label>
                            <input
                              type="text"
                              value={editingService.priceDisplayUz}
                              onChange={(e) =>
                                setEditingService({
                                  ...editingService,
                                  priceDisplayUz: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Tavsif (UZ)
                            </label>
                            <textarea
                              rows={2}
                              value={editingService.descUz}
                              onChange={(e) =>
                                setEditingService({
                                  ...editingService,
                                  descUz: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white resize-none"
                            />
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-3">
                            <button
                              type="button"
                              onClick={() => setEditingService(null)}
                              className="px-3.5 py-2 text-xs font-medium rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                              {t.adminCancel}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSaveService(editingService)}
                              className="px-4 py-2 text-xs font-bold rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300"
                            >
                              {t.adminSave}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: SAVED ITEMS ("Saqlangan narsalar" - Secret Private Notes) */}
              {activeTab === 'saved' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {t.adminSavedTitle}
                      </h3>
                      <p className="text-xs text-slate-500">{t.adminSavedDesc}</p>
                    </div>
                    <button
                      onClick={() =>
                        setEditingNote({
                          title: '',
                          content: '',
                          category: 'eslatma',
                        })
                      }
                      className="px-3.5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-amber-300 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{t.adminAddSavedBtn}</span>
                    </button>
                  </div>

                  {/* Note Creator / Editor Modal */}
                  {editingNote && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                      <form
                        onSubmit={handleSaveNote}
                        className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl"
                      >
                        <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                          {editingNote.id ? 'Eslatmani tahrirlash' : t.adminAddSavedBtn}
                        </h4>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              {t.adminSaveNoteTitle}
                            </label>
                            <input
                              type="text"
                              required
                              value={editingNote.title || ''}
                              onChange={(e) =>
                                setEditingNote({ ...editingNote, title: e.target.value })
                              }
                              placeholder="Masalan: YouTube VIP mijoz kelishuvi"
                              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              {t.adminSaveNoteCategory}
                            </label>
                            <select
                              value={editingNote.category || 'eslatma'}
                              onChange={(e) =>
                                setEditingNote({
                                  ...editingNote,
                                  category: e.target.value as any,
                                })
                              }
                              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                            >
                              <option value="eslatma">Eslatma</option>
                              <option value="mijoz">Mijoz ma’lumoti</option>
                              <option value="loyiha">Loyiha rejasi</option>
                              <option value="boshqa">Boshqa</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              {t.adminSaveNoteContent}
                            </label>
                            <textarea
                              rows={5}
                              required
                              value={editingNote.content || ''}
                              onChange={(e) =>
                                setEditingNote({ ...editingNote, content: e.target.value })
                              }
                              placeholder="Shaxsiy ma’lumotlar, parollar, mijoz raqamlari yoki eslatmalar..."
                              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white resize-none font-sans"
                            />
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-3">
                            <button
                              type="button"
                              onClick={() => setEditingNote(null)}
                              className="px-3.5 py-2 text-xs font-medium rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                              {t.adminCancel}
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 text-xs font-bold rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300"
                            >
                              {t.adminSave}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}

                  {savedItems.length === 0 ? (
                    <div className="text-center py-16 text-slate-400">
                      <Bookmark className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">{t.adminEmptySaved}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {savedItems.map((note) => (
                        <div
                          key={note.id}
                          className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex flex-col justify-between hover:border-amber-500/40 transition-colors"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                                {note.category}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {new Date(note.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                              {note.title}
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                              {note.content}
                            </p>
                          </div>

                          <div className="flex items-center justify-end gap-1 mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/60">
                            <button
                              onClick={() => setEditingNote(note)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 transition-colors"
                              title="Tahrirlash"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteNote(note.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                              title="O‘chirish"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: SITE SETTINGS */}
              {activeTab === 'settings' && settingsForm && (
                <div className="max-w-xl space-y-8">
                  {settingsSavedNotice && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{t.adminSettingsSavedNotice}</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveSettings} className="space-y-4">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Aloqa va Manzillar
                    </h3>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Aloqa telefon raqami
                      </label>
                      <input
                        type="text"
                        value={settingsForm.contactPhone}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, contactPhone: e.target.value })
                        }
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Telegram username (masalan: VizonAI_admin yoki bo‘sh qoldiring)
                      </label>
                      <input
                        type="text"
                        value={settingsForm.telegramUsername}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, telegramUsername: e.target.value })
                        }
                        placeholder="VizonAI_admin"
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        YouTube kanal havolasi
                      </label>
                      <input
                        type="text"
                        value={settingsForm.youtubeUrl}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, youtubeUrl: e.target.value })
                        }
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        YouTube kanal nomi
                      </label>
                      <input
                        type="text"
                        value={settingsForm.youtubeChannelName}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, youtubeChannelName: e.target.value })
                        }
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 text-xs font-bold rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>{t.adminSaveSettingsBtn}</span>
                    </button>
                  </form>

                  {/* Password update section */}
                  <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                      {t.adminPasswordChange}
                    </h3>

                    {passwordChangeNotice && (
                      <div className="mb-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs">
                        {passwordChangeNotice}
                      </div>
                    )}

                    <form onSubmit={handleChangePassword} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          {t.adminNewPasswordLabel}
                        </label>
                        <input
                          type="password"
                          required
                          value={newPasswordInput}
                          onChange={(e) => setNewPasswordInput(e.target.value)}
                          placeholder="Kamida 6 belgi"
                          className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 transition-colors"
                      >
                        {t.adminUpdatePasswordBtn}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
