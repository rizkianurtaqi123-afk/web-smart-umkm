import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, ShoppingBag, DollarSign, Box, ArrowUpRight, ArrowDownRight, 
  TrendingUp, Bell, LogOut, User, Menu, X, CheckCircle, AlertTriangle, 
  RefreshCw, ChevronDown, Sparkles, Filter, Home, PieChart, Users, Settings
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend, Cell
} from 'recharts';
import { Transaction, Product, User as UserType } from '../types';

interface DashboardProps {
  currentUser: UserType | null;
  onLogout: () => void;
  isDarkMode: boolean;
}

const initialTransactions: Transaction[] = [
  { id: 'TX-1001', date: '2026-05-19', type: 'sale', item: 'Kopi Susu Gula Aren (Pack)', amount: 150000, quantity: 10, status: 'completed' },
  { id: 'TX-1002', date: '2026-05-18', type: 'sale', item: 'Keripik Tempe Rejeki', amount: 85000, quantity: 5, status: 'completed' },
  { id: 'TX-1003', date: '2026-05-18', type: 'expense', item: 'Kemasan Plastik Premium', amount: 45000, quantity: 1, status: 'completed' },
  { id: 'TX-1004', date: '2026-05-17', type: 'sale', item: 'Sambal Korek Botol', amount: 120000, quantity: 4, status: 'completed' },
  { id: 'TX-1005', date: '2026-05-16', type: 'sale', item: 'Roti Bakar Bandung Mix', amount: 95000, quantity: 3, status: 'completed' },
  { id: 'TX-1006', date: '2026-05-15', type: 'expense', item: 'Gas LPG 3kg', amount: 22000, quantity: 1, status: 'completed' },
];

const initialProducts: Product[] = [
  { id: 'P-001', name: 'Kopi Susu Gula Aren', stock: 42, price: 15000, category: 'Beverage' },
  { id: 'P-002', name: 'Keripik Tempe Premium', stock: 8, price: 17000, category: 'Snack' },
  { id: 'P-003', name: 'Sambal Korek Botol', stock: 15, price: 30000, category: 'Food' },
  { id: 'P-004', name: 'Roti Bakar Bandung', stock: 3, price: 25000, category: 'Food' },
  { id: 'P-005', name: 'Crispy Cassava Chips', stock: 64, price: 12000, category: 'Snack' },
];

const initialMonthlyData = [
  { name: 'Jan', Sales: 4200000, Expense: 2100000, Revenue: 2100000 },
  { name: 'Feb', Sales: 5100000, Expense: 2300000, Revenue: 2800000 },
  { name: 'Mar', Sales: 6800000, Expense: 3100000, Revenue: 3700000 },
  { name: 'Apr', Sales: 8200000, Expense: 3400000, Revenue: 4800000 },
  { name: 'May', Sales: 9500000, Expense: 4000000, Revenue: 5500000 },
];

export default function Dashboard({ currentUser, onLogout, isDarkMode }: DashboardProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  
  // States for new transaction
  const [newTxItem, setNewTxItem] = useState('');
  const [newTxAmount, setNewTxAmount] = useState('');
  const [newTxQuantity, setNewTxQuantity] = useState('1');
  const [newTxType, setNewTxType] = useState<'sale' | 'expense'>('sale');

  // States for new product
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Food');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdStock, setNewProdStock] = useState('');

  // Notifications
  const [notifications, setNotifications] = useState<Array<{ id: string; text: string; time: string; read: boolean; type: 'info' | 'warning' | 'success' }>>([
    { id: '1', text: 'Stok Keripik Tempe Premium menipis (tinggal 8 pcs)', time: '10 menit yang lalu', read: false, type: 'warning' },
    { id: '2', text: 'Stok Roti Bakar Bandung tersisa 3 pcs!', time: '1 jam yang lalu', read: false, type: 'warning' },
    { id: '3', text: 'Backup otomatis database cloud berhasil dilakukan', time: 'Hari ini, 08:00', read: true, type: 'success' },
    { id: '4', text: 'Penjualan Kopi Susu melesat naik 24% minggu ini', time: 'Kemarin', read: true, type: 'info' }
  ]);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  // Calculate stats
  const totalSalesVal = transactions
    .filter(t => t.type === 'sale' && t.status === 'completed')
    .reduce((sum, current) => sum + current.amount, 0);

  const totalExpensesVal = transactions
    .filter(t => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, current) => sum + current.amount, 0);

  const netRevenue = totalSalesVal - totalExpensesVal;

  const lowStockProducts = products.filter(p => p.stock <= 10);

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTxItem || !newTxAmount || !newTxQuantity) {
      showToast('Harap lengkapi semua field transaksi!', 'error');
      return;
    }

    const price = Number(newTxAmount);
    const qty = Number(newTxQuantity);
    const totalAmount = price * qty;

    const newTx: Transaction = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      type: newTxType,
      item: newTxItem,
      amount: totalAmount,
      quantity: qty,
      status: 'completed'
    };

    setTransactions([newTx, ...transactions]);
    setShowAddTransactionModal(false);
    
    // Reset forms
    setNewTxItem('');
    setNewTxAmount('');
    setNewTxQuantity('1');
    setNewTxType('sale');

    showToast('Transaksi berhasil dicatat secara realtime!', 'success');

    // Add notification
    setNotifications([
      {
        id: Date.now().toString(),
        text: `Transaksi baru dicatat: ${newTxItem} (${qty}x)`,
        time: 'Baru saja',
        read: false,
        type: 'success'
      },
      ...notifications
    ]);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice || !newProdStock) {
      showToast('Harap lengkapi informasi produk!', 'error');
      return;
    }

    const newP: Product = {
      id: `P-${Math.floor(100 + Math.random() * 900)}`,
      name: newProdName,
      stock: Number(newProdStock),
      price: Number(newProdPrice),
      category: newProdCategory
    };

    setProducts([newP, ...products]);
    setShowAddProductModal(false);

    // Reset forms
    setNewProdName('');
    setNewProdPrice('');
    setNewProdStock('');
    setNewProdCategory('Food');

    showToast(`Produk '${newP.name}' berhasil dimasukkan ke inventori!`, 'success');
  };

  const handleRestock = (productId: string) => {
    setProducts(products.map(p => {
      if (p.id === productId) {
        showToast(`Stok ${p.name} ditambah 20 secara instan!`, 'success');
        return { ...p, stock: p.stock + 20 };
      }
      return p;
    }));
  };

  const clearNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    showToast('Semua notifikasi ditandai sebagai dibaca', 'success');
  };

  // Filter transactions search
  const filteredTransactions = transactions.filter(t => 
    t.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50/60 text-slate-800'}`}>
      
      {/* Toast overlay */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 animate-bounce shadow-2xl rounded-xl p-4 flex items-center gap-3 border bg-white/90 backdrop-blur-md dark:bg-slate-900/90 text-sm font-semibold text-slate-900 dark:text-gray-100 max-w-sm border-pink-200">
          {toast.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-pink-100/40 dark:border-slate-800/60 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                 {currentUser?.businessType || 'General Store'} Platform
              </span>
              <span className="flex items-center gap-1 text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 px-2 py-0.5 rounded-full font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Connected to Cloud
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Aman & Nyaman, <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">{currentUser?.name || 'Partner UMKM'}</span> 👋
            </h1>
            <p className="text-sm opacity-70 mt-1">Mengelola operasional bisnis <strong className="text-pink-500">{currentUser?.businessName || 'Smart Toko'}</strong> secara terintegrasi.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => setShowAddTransactionModal(true)}
              className="bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-medium text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-pink-500/10 flex items-center gap-2 transition duration-300"
            >
              <Plus className="w-4 h-4" />
              Catat Transaksi
            </button>
            <button 
              onClick={() => setShowAddProductModal(true)}
              className="bg-slate-100 dark:bg-slate-800 hover:bg-pink-100 dark:hover:bg-pink-950 hover:text-pink-600 dark:hover:text-pink-300 font-medium text-sm px-4 py-2.5 rounded-xl transition duration-300 flex items-center gap-2"
            >
              <Box className="w-4 h-4" />
              Tambah Produk
            </button>
            <button 
              onClick={onLogout}
              className="border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80 p-2.5 rounded-xl transition cursor-pointer"
              title="Logout dari SmartUMKM"
            >
              <LogOut className="w-5 h-5 text-rose-500" />
            </button>
          </div>
        </div>

        {/* Dashboard Grid Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Card Total Sales */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-100 dark:border-slate-800/40 p-6 rounded-2xl shadow-sm hover:translate-y-[-2px] transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100/30 dark:bg-pink-950/20 rounded-full blur-2xl"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium opacity-60">Total Penjualan (Realtime)</span>
              <div className="p-3 bg-pink-50 dark:bg-pink-950/40 rounded-xl text-pink-500">
                <ShoppingBag className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">{formatIDR(totalSalesVal)}</h3>
            <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1 font-semibold">
              <ArrowUpRight className="w-4 h-4" /> +12.4% vs minggu lalu
            </p>
          </div>

          {/* Card Net Profits */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-100 dark:border-slate-800/40 p-6 rounded-2xl shadow-sm hover:translate-y-[-2px] transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/30 dark:bg-emerald-950/20 rounded-full blur-2xl"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium opacity-60">Revenue Bersih</span>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-emerald-500">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">{formatIDR(netRevenue)}</h3>
            <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1 font-semibold">
              <ArrowUpRight className="w-4 h-4" /> +18.2% bulan ini
            </p>
          </div>

          {/* Card Products Health */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-100 dark:border-slate-800/40 p-6 rounded-2xl shadow-sm hover:translate-y-[-2px] transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/30 dark:bg-amber-950/20 rounded-full blur-2xl"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium opacity-60">Total Varian Produk</span>
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-amber-500">
                <Box className="w-6 h-6" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">{products.length} Items</h3>
            </div>
            {lowStockProducts.length > 0 ? (
              <p className="text-xs text-rose-500 mt-2 flex items-center gap-1 font-semibold animate-pulse">
                <AlertTriangle className="w-4 h-4" /> {lowStockProducts.length} Produk butuh restock
              </p>
            ) : (
              <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1 font-semibold">
                <CheckCircle className="w-4 h-4" /> Semua stok aman
              </p>
            )}
          </div>

        </div>

        {/* Dashboard Analytics & System Alerts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Main Analytics Graph - Col span 2 */}
          <div className="lg:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-100 dark:border-slate-800/40 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-lg font-bold">Tren Omset & Pengeluaran</h4>
                <p className="text-xs opacity-60">Analisis finansial 5 bulan terakhir secara visual</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs bg-pink-50 dark:bg-pink-950/30 text-pink-500 px-3 py-1.5 rounded-full font-bold">
                <TrendingUp className="w-4 h-4" /> Live Chart
              </div>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={initialMonthlyData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#334155' : '#f1f1f1'} />
                  <XAxis dataKey="name" stroke={isDarkMode ? '#94a3b8' : '#64748b'} fontSize={12} />
                  <YAxis stroke={isDarkMode ? '#94a3b8' : '#64748b'} fontSize={12} tickFormatter={(val) => `Rp ${val/1000000}M`} />
                  <Tooltip 
                    formatter={(value: any) => [formatIDR(value as number), '']}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #fbcfe8', background: isDarkMode ? '#1e293b' : 'white' }} 
                  />
                  <Area type="monotone" dataKey="Sales" name="Total Penjualan" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                  <Area type="monotone" dataKey="Expense" name="Pengeluaran" stroke="#f43f5e" strokeWidth={1.5} fillOpacity={1} fill="url(#colorExpense)" strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Side Alert / Live Notifications widget */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-100 dark:border-slate-800/40 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-pink-50 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-pink-500 animate-swing" />
                  <h4 className="font-bold">Notifikasi Asisten AI</h4>
                </div>
                <button 
                  onClick={markAllNotificationsAsRead}
                  className="text-xs text-pink-500 hover:text-pink-600 font-semibold transition"
                >
                  Tandai Dibaca
                </button>
              </div>

              <div className="space-y-3.5 overflow-y-auto max-h-[220px] pr-1">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={`p-3 rounded-xl border transition text-sm flex items-start gap-2.5 ${
                      notif.read 
                        ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 opacity-60' 
                        : 'bg-pink-50/40 dark:bg-pink-950/20 border-pink-100/30'
                    }`}
                  >
                    <div className="mt-0.5">
                      {notif.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                      {notif.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      {notif.type === 'info' && <Sparkles className="w-4 h-4 text-pink-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-xs leading-relaxed">{notif.text}</p>
                      <span className="text-[10px] opacity-50 block mt-1">{notif.time}</span>
                    </div>
                    <button 
                      onClick={() => clearNotification(notif.id)}
                      className="text-slate-400 hover:text-rose-500 transition ml-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <span className="text-xs opacity-50 block italic">Sistem Cloud auto-sinkronisasi aktif</span>
            </div>
          </div>

        </div>

        {/* Bottom Panel - Inventory Monitor & Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Inventory warning Panel - Stock alert */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-100 dark:border-slate-800/40 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-lg">Pemantau Inventori</h4>
              <span className="text-xs bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-300 px-2.5 py-1 rounded-full font-bold">ID & Stok</span>
            </div>
            
            <p className="text-xs opacity-60 mb-4">Stok terupdate per jam. Tombol restock langsung mensinkronasikan Cloud Data.</p>
            
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60">
                  <div>
                    <h5 className="font-bold text-sm">{product.name}</h5>
                    <p className="text-xs opacity-50">{product.category} • {formatIDR(product.price)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-extrabold ${
                      product.stock <= 5 
                        ? 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 animate-pulse' 
                        : product.stock <= 10 
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-300' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {product.stock} pcs
                    </span>
                    <button 
                      onClick={() => handleRestock(product.id)}
                      className="text-xs text-pink-500 hover:text-pink-600 hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Restock
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transactions Record Table - Col span 2 */}
          <div className="lg:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-100 dark:border-slate-800/40 p-6 rounded-2xl shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h4 className="text-lg font-bold">Catatan Transaksi Terbaru</h4>
                <p className="text-xs opacity-60">Pencarian instan dari seluruh database transaksi penjualan</p>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Cari transaksi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 pl-9 pr-4 py-1.5 rounded-xl text-sm focus:outline-none focus:border-pink-500 transition w-full sm:w-60"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-pink-50 dark:border-slate-800 opacity-60 text-xs uppercase font-extrabold">
                    <th className="py-3 px-2">ID</th>
                    <th className="py-3 px-2">Tanggal</th>
                    <th className="py-3 px-2">Keterangan Produk</th>
                    <th className="py-3 px-2">Tipe</th>
                    <th className="py-3 px-2">Jumlah Belanja</th>
                    <th className="py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/40 dark:divide-slate-800/40">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/10 transition">
                      <td className="py-3 px-2 font-mono text-xs">{tx.id}</td>
                      <td className="py-3 px-2 text-xs opacity-75">{tx.date}</td>
                      <td className="py-3 px-2 font-bold">{tx.item} <span className="font-normal opacity-55">({tx.quantity}x)</span></td>
                      <td className="py-3 px-2">
                        <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${
                          tx.type === 'sale' 
                            ? 'bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-300' 
                            : 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300'
                        }`}>
                          {tx.type === 'sale' ? 'Penjualan' : 'Beban'}
                        </span>
                      </td>
                      <td className="py-3 px-2 font-extrabold">{formatIDR(tx.amount)}</td>
                      <td className="py-3 px-2">
                        <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-semibold">
                          <CheckCircle className="w-3.5 h-3.5" /> Berhasil
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredTransactions.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center opacity-50 font-bold">
                        Pencarian tidak ditemukan. Saring kata kunci Anda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

      {/* Record Transaction Modal */}
      {showAddTransactionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-pink-100/40 dark:border-slate-800">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Plus className="w-5 h-5 text-pink-500" />
                Catat Transaksi Baru
              </h3>
              <button 
                onClick={() => setShowAddTransactionModal(false)}
                className="text-slate-400 hover:text-rose-500 cursor-pointer p-1 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-extrabold opacity-60 mb-1.5">Jenis Transaksi</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewTxType('sale')}
                    className={`p-3 rounded-xl font-bold text-sm border flex items-center justify-center gap-2 transition ${
                      newTxType === 'sale'
                        ? 'bg-pink-50 dark:bg-pink-950/40 border-pink-400 text-pink-600 dark:text-pink-300'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    Sale (Penjualan)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewTxType('expense')}
                    className={`p-3 rounded-xl font-bold text-sm border flex items-center justify-center gap-2 transition ${
                      newTxType === 'expense'
                        ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-600 dark:text-rose-300'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    Expense (Beban umum)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-extrabold opacity-60 mb-1.5">Nama Barang / Deskripsi</label>
                <input 
                  type="text" 
                  value={newTxItem}
                  onChange={(e) => setNewTxItem(e.target.value)}
                  placeholder="Contoh: Kopi Susu Aren"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-extrabold opacity-60 mb-1.5">Harga Per Item (Rp)</label>
                  <input 
                    type="number" 
                    value={newTxAmount}
                    onChange={(e) => setNewTxAmount(e.target.value)}
                    placeholder="15000"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-pink-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-extrabold opacity-60 mb-1.5">Kuantitas (Qty)</label>
                  <input 
                    type="number" 
                    value={newTxQuantity}
                    onChange={(e) => setNewTxQuantity(e.target.value)}
                    min="1"
                    placeholder="1"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-pink-500"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddTransactionModal(false)}
                  className="w-1/2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl py-3 text-sm font-semibold transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white rounded-xl py-3 text-sm font-bold transition shadow-lg shadow-pink-500/15"
                >
                  Simpan Transaksi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-pink-100/40 dark:border-slate-800">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Box className="w-5 h-5 text-pink-500" />
                Tambah Produk Inventori Baru
              </h3>
              <button 
                onClick={() => setShowAddProductModal(false)}
                className="text-slate-400 hover:text-rose-500 cursor-pointer p-1 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-extrabold opacity-60 mb-1.5">Nama Produk</label>
                <input 
                  type="text" 
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="Contoh: Keripik Singkong"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-extrabold opacity-60 mb-1.5">Kategori</label>
                <select 
                  value={newProdCategory} 
                  onChange={(e) => setNewProdCategory(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-pink-500"
                >
                  <option value="Food">Makanan (Food)</option>
                  <option value="Beverage">Minuman (Beverage)</option>
                  <option value="Snack">Camilan (Snack)</option>
                  <option value="Pack">Kemasan / Lainnya</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-extrabold opacity-60 mb-1.5">Harga Jual (Rp)</label>
                  <input 
                    type="number" 
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    placeholder="12000"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-pink-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-extrabold opacity-60 mb-1.5">Stok Awal (Pcs)</label>
                  <input 
                    type="number" 
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                    placeholder="25"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-pink-500"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="w-1/2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl py-3 text-sm font-semibold transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white rounded-xl py-3 text-sm font-bold transition shadow-lg shadow-pink-500/15"
                >
                  Tambah Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
