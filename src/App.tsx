import React, { useState, useEffect } from 'react';
import { 
  Building2, ChevronRight, Check, Star, Mail, Phone, MapPin, 
  Menu, X, Sun, Moon, Sparkles, TrendingUp, ShieldCheck, CreditCard,
  MessageSquare, Users, Globe, Smartphone, Heart, ArrowRight, Video, Play,
  Cpu, Award, HelpCircle, CheckCircle, Database
} from 'lucide-react';
import { ViewType, User as UserType } from './types';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Forms
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Demo play state
  const [showDemoVideo, setShowDemoVideo] = useState(false);

  // Load auth state from localStorage initially
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    const savedUser = localStorage.getItem('smartumkm_current_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setCurrentView('dashboard');
    }
    return () => clearTimeout(timer);
  }, []);

  const handleUserAuthenticated = (user: UserType) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('smartumkm_current_user');
    setCurrentUser(null);
    setCurrentView('home');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactSubject('');
      setContactMsg('');
    }, 3500);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navigateToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    setCurrentView('home');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-bold text-slate-800 tracking-wide font-display">Mempersiapkan Platform SmartUMKM...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-white text-slate-800'}`}>
      
      {/* Sticky Header Navigation bar */}
      <nav className="glass-panel sticky top-0 z-40 w-full border-b border-pink-100/30 dark:border-slate-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            
            {/* Logo */}
            <div 
              onClick={() => setCurrentView('home')} 
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="h-9 w-9 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-xl flex items-center justify-center text-white font-extrabold shadow-md shadow-pink-500/25 group-hover:rotate-6 transition">
                S
              </div>
              <span className="font-display font-black text-lg tracking-tight bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                SmartUMKM
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              <button onClick={() => navigateToSection('hero_section')} className="text-xs uppercase font-extrabold tracking-wider hover:text-pink-500 transition cursor-pointer">Home</button>
              <button onClick={() => navigateToSection('features_section')} className="text-xs uppercase font-extrabold tracking-wider hover:text-pink-500 transition cursor-pointer">Features</button>
              <button onClick={() => navigateToSection('pricing_section')} className="text-xs uppercase font-extrabold tracking-wider hover:text-pink-500 transition cursor-pointer">Pricing</button>
              <button onClick={() => navigateToSection('testimonials_section')} className="text-xs uppercase font-extrabold tracking-wider hover:text-pink-500 transition cursor-pointer">Testimonials</button>
              <button onClick={() => navigateToSection('about_section')} className="text-xs uppercase font-extrabold tracking-wider hover:text-pink-500 transition cursor-pointer">About</button>
              <button onClick={() => navigateToSection('contact_section')} className="text-xs uppercase font-extrabold tracking-wider hover:text-pink-500 transition cursor-pointer">Contact</button>
            </div>

            {/* Right Buttons / Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Dark mode toggle */}
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer text-slate-600 dark:text-gray-300"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
              </button>

              {currentUser ? (
                <>
                  <button 
                    onClick={() => setCurrentView('dashboard')}
                    className="text-xs uppercase font-black text-pink-500 hover:text-pink-600 transition"
                  >
                    Dashboard Saya
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition hover:bg-rose-100 dark:hover:bg-rose-950 hover:text-rose-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setCurrentView('login')}
                    className="text-xs font-black uppercase text-slate-650 dark:text-gray-200 hover:text-pink-500 transition"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => setCurrentView('register')}
                    className="bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-black text-xs uppercase px-5 py-2.5 rounded-xl shadow-lg shadow-pink-500/15 transition cursor-pointer"
                  >
                    Join SmartUMKM
                  </button>
                </>
              )}
            </div>

            {/* Mobile Nav Trigger & Theme switch */}
            <div className="flex items-center gap-3 lg:hidden">
              <button onClick={toggleDarkMode} className="p-2 text-slate-600 dark:text-gray-300">
                {isDarkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5" />}
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 py-6 px-4 space-y-4 shadow-xl">
            <div className="flex flex-col gap-3">
              <button onClick={() => navigateToSection('hero_section')} className="text-left py-2 font-bold hover:text-pink-500 border-b border-slate-50 dark:border-slate-800">Home</button>
              <button onClick={() => navigateToSection('features_section')} className="text-left py-2 font-bold hover:text-pink-500 border-b border-slate-50 dark:border-slate-800">Features</button>
              <button onClick={() => navigateToSection('pricing_section')} className="text-left py-2 font-bold hover:text-pink-500 border-b border-slate-50 dark:border-slate-800">Pricing</button>
              <button onClick={() => navigateToSection('testimonials_section')} className="text-left py-2 font-bold hover:text-pink-500 border-b border-slate-50 dark:border-slate-800">Testimonials</button>
              <button onClick={() => navigateToSection('about_section')} className="text-left py-2 font-bold hover:text-pink-500 border-b border-slate-50 dark:border-slate-800">About</button>
              <button onClick={() => navigateToSection('contact_section')} className="text-left py-2 font-bold hover:text-pink-500 border-b border-slate-50 dark:border-slate-800">Contact</button>
            </div>
            <div className="flex flex-col gap-3.5 pt-4">
              {currentUser ? (
                <>
                  <button 
                    onClick={() => { setMobileMenuOpen(false); setCurrentView('dashboard'); }}
                    className="w-full text-center py-2.5 font-bold bg-pink-50 dark:bg-pink-950 text-pink-500 rounded-xl"
                  >
                    Ke Dashboard Anda
                  </button>
                  <button 
                    onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                    className="w-full text-center py-2.5 font-bold border border-slate-200 dark:border-slate-700 rounded-xl"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => { setMobileMenuOpen(false); setCurrentView('login'); }}
                    className="w-full text-center py-2.5 font-bold border border-slate-200 dark:border-slate-700 rounded-xl"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => { setMobileMenuOpen(false); setCurrentView('register'); }}
                    className="w-full text-center py-2.5 font-bold bg-gradient-to-r from-pink-500 to-rose-450 text-white rounded-xl shadow-md"
                  >
                    Join SmartUMKM
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Conditional Rendering (Dashboard or Landing/Auth Pages) */}
      {currentView === 'dashboard' ? (
        <Dashboard 
          currentUser={currentUser} 
          onLogout={handleLogout} 
          isDarkMode={isDarkMode} 
        />
      ) : (currentView === 'login' || currentView === 'register' || currentView === 'forgot') ? (
        <Auth 
          initialView={currentView}
          onUserAuthenticated={handleUserAuthenticated}
          onNavigateToView={(v) => v === 'home' ? setCurrentView('home') : setCurrentView(v)}
          isDarkMode={isDarkMode}
        />
      ) : (
        /* START LANDING SITE */
        <div>
          
          {/* Ambient Background Glow elements */}
          <div className="absolute top-20 left-1/4 -z-10 w-96 h-96 bg-pink-200/40 dark:bg-pink-950/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-[60vh] right-10 -z-10 w-80 h-80 bg-rose-200/30 dark:bg-indigo-950/10 rounded-full blur-3xl animate-pulse-slow"></div>

          {/* HERO SECTION */}
          <header id="hero_section" className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Hero Words */}
                <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-1.5 bg-pink-50 dark:bg-pink-950/30 text-pink-500 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider animate-float-slow">
                    <Sparkles className="w-4 h-4" /> Cloud-Based SME Management
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight">
                    SmartUMKM — <br className="hidden sm:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500">
                      Smart Digital Solution
                    </span> <br />
                    for Indonesian SMEs.
                  </h1>

                  <p className="text-base sm:text-lg opacity-85 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Membantu para pelaku usaha kecil dan menengah di Indonesia mengelola arus finansial, laporan penjualan real-time, stok inventori, serta business analytics tingkat lanjut dalam satu platform cloud yang aman, berkelas dunia, dan sangat mudah digunakan.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                    <button 
                      onClick={() => setCurrentView('register')}
                      className="w-full sm:w-auto bg-gradient-to-r from-pink-500 via-rose-500 to-rose-455 hover:opacity-90 text-white font-extrabold px-8 py-4 rounded-2xl shadow-xl shadow-pink-500/25 transition duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      Start Free Trial
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                    </button>
                    <button 
                      onClick={() => setShowDemoVideo(true)}
                      className="w-full sm:w-auto border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 font-extrabold px-8 py-4 rounded-2xl transition flex items-center justify-center gap-2.5 cursor-pointer"
                    >
                      <Play className="w-5 h-5 text-pink-500 fill-pink-500" />
                      Watch Demo
                    </button>
                  </div>

                  {/* Trust Metrics */}
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-900 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                    <div>
                      <h4 className="font-display font-black text-2xl text-pink-500">24,000+</h4>
                      <p className="text-[11px] opacity-65 font-bold uppercase">UMKM Bergabung</p>
                    </div>
                    <div>
                      <h4 className="font-display font-black text-2xl text-pink-500">Rp 4.2T+</h4>
                      <p className="text-[11px] opacity-65 font-bold uppercase">Volume Transaksi</p>
                    </div>
                    <div>
                      <h4 className="font-display font-black text-2xl text-pink-500">99.9%</h4>
                      <p className="text-[11px] opacity-65 font-bold uppercase">Cloud Uptime API</p>
                    </div>
                  </div>
                </div>

                {/* Hero SaaS dashboard Graphic Presentation */}
                <div className="lg:col-span-6 relative">
                  <div className="absolute inset-x-0 -top-12 -bottom-12 bg-pink-400/10 dark:bg-pink-900/10 rounded-3xl blur-3xl -z-10"></div>
                  
                  {/* Modern browser bar mockup */}
                  <div 
                    onClick={() => setCurrentView('login')}
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:border-pink-300 dark:hover:border-pink-950 cursor-pointer"
                  >
                    <div className="bg-slate-50 dark:bg-slate-800/80 px-4 py-3 flex items-center justify-between border-b border-pink-50 dark:border-slate-800">
                      <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                        <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                        <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                      </div>
                      <div className="text-[10px] font-mono opacity-50 bg-slate-100 dark:bg-slate-900 px-6 py-1 rounded-md">smartumkm.com/dashboard/analytics</div>
                      <div className="w-4"></div>
                    </div>

                    {/* Interactive Showcase representation of SaaS dashboard */}
                    <div className="p-4 sm:p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-sm tracking-tight">Omset Restoran Bu Nani (Realtime)</h4>
                          <p className="text-[10px] opacity-50">Laporan Keuangan Hari Ini</p>
                        </div>
                        <span className="bg-emerald-50 dark:bg-emerald-950 text-emerald-500 font-bold text-[10px] px-2.5 py-1 rounded-full">
                          +15% Meningkat
                        </span>
                      </div>

                      {/* Bar graph representation */}
                      <div className="grid grid-cols-4 gap-2.5 h-36 items-end pt-4 border-b border-pink-50 dark:border-slate-800 pb-2">
                        <div className="bg-pink-100 dark:bg-pink-950/40 rounded-t-lg h-[40%] text-center"><span className="text-[9px] font-mono">Sensasi</span></div>
                        <div className="bg-rose-300 dark:bg-slate-800 rounded-t-lg h-[65%] text-center"><span className="text-[9px] font-mono">Duo Soto</span></div>
                        <div className="bg-pink-500 rounded-t-lg h-[90%] text-center flex flex-col justify-end text-white pb-1"><span className="text-[9px] font-mono font-bold">Kopi</span></div>
                        <div className="bg-amber-400 rounded-t-lg h-[50%] text-center"><span className="text-[9px] font-mono">Gorengan</span></div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-pink-50/50 dark:bg-pink-950/20 p-2.5 rounded-xl border border-pink-50/40">
                          <span className="block text-[10px] opacity-60">Revenue Bersih</span>
                          <span className="block text-sm font-black text-pink-500">Rp 12.8 Jt</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl">
                          <span className="block text-[10px] opacity-60">Beban Operasional</span>
                          <span className="block text-sm font-black text-rose-500">Rp 4.1 Jt</span>
                        </div>
                        <div className="bg-emerald-50/55 dark:bg-emerald-950/20 p-2.5 rounded-xl">
                          <span className="block text-[10px] opacity-60">Laba Usaha</span>
                          <span className="block text-sm font-black text-emerald-500">Rp 8.7 Jt</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating badge */}
                  <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold leading-none">Otomasi Pajak PPh</span>
                      <span className="text-[10px] opacity-60">Sesuai aturan terbaru</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </header>

          {/* DYNAMIC SHOW DEMO MODAL */}
          {showDemoVideo && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl relative">
                <button 
                  onClick={() => setShowDemoVideo(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="mb-4">
                  <h4 className="text-xl font-bold flex items-center gap-2">
                    <Video className="w-5 h-5 text-pink-500" />
                    Demo Cara Kerja SmartUMKM
                  </h4>
                  <p className="text-xs opacity-60">Tonton panduan singkat selama 2 menit cara sinkronisasi kasir pintar dengan dashboard cloud.</p>
                </div>

                <div className="aspect-video bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-4 text-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 to-rose-450/5"></div>
                  <div className="w-16 h-16 rounded-full bg-pink-500 hover:scale-110 transition duration-300 text-white flex items-center justify-center shadow-lg shadow-pink-500/20 cursor-pointer">
                    <Play className="w-7 h-7 fill-white translate-x-0.5" />
                  </div>
                  <div>
                    <span className="block font-bold text-sm">Interactive SmartUMKM Platform Tour</span>
                    <span className="text-xs opacity-50">Menampilkan pencatatan sales otomatis & modul inventori handal</span>
                  </div>
                </div>

                <div className="mt-5 text-right">
                  <button 
                    onClick={() => { setShowDemoVideo(false); setCurrentView('register'); }}
                    className="bg-pink-500 text-white font-bold text-xs uppercase px-5 py-3 rounded-xl hover:bg-pink-600 transition"
                  >
                    Mulai Uji Coba Gratis
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FEATURES SECTION */}
          <section id="features_section" className="py-20 lg:py-28 bg-slate-50/50 dark:bg-slate-900/10 border-y border-pink-50/60 dark:border-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-pink-500 font-extrabold text-xs uppercase tracking-widest bg-pink-50 dark:bg-pink-950/40 px-3.5 py-1.5 rounded-full">
                  Fitur Unggulan Platform
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 dark:text-gray-100 mt-4 tracking-tight leading-tight">
                  Semua Kebutuhan Digitalisasi Bisnis <br className="hidden sm:inline" />
                  UMKM dalam Satu Genggaman.
                </h2>
                <p className="text-sm opacity-70 mt-3">
                  Dari pencatatan transaksi sederhana hingga analitik yang disajikan secara instan untuk melipatgandakan omset Anda.
                </p>
              </div>

              {/* Grid of features */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                
                {/* Feature 1 */}
                <div className="bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl hover:translate-y-[-4px] transition duration-300 hover:border-pink-200">
                  <div className="p-3 bg-pink-50 dark:bg-pink-950/40 text-pink-500 rounded-2xl w-fit mb-4">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Automatic Financial Recording</h4>
                  <p className="text-xs opacity-75 leading-relaxed">Pencatatan laba kotor, margin operasional, dan cashflow kasir secara real-time cloud tanpa kalkulator manual.</p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl hover:translate-y-[-4px] transition duration-300 hover:border-pink-200">
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/40 text-rose-500 rounded-2xl w-fit mb-4">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Inventory Management</h4>
                  <p className="text-xs opacity-75 leading-relaxed">Kontrol stok barang secara otomatis. Dapatkan alarm notifikasi asisten jika stok menipis dari ambang batas aman.</p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl hover:translate-y-[-4px] transition duration-300 hover:border-pink-200">
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 rounded-2xl w-fit mb-4">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Real-Time Sales Reports</h4>
                  <p className="text-xs opacity-75 leading-relaxed">Akses laporan penjualan harian, mingguan, bahkan bulanan dari mana saja secara mobile untuk memantau performa karyawan.</p>
                </div>

                {/* Feature 4 */}
                <div className="bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl hover:translate-y-[-4px] transition duration-300 hover:border-pink-200">
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-500 rounded-2xl w-fit mb-4">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Profit Analytics Dashboard</h4>
                  <p className="text-xs opacity-75 leading-relaxed">Grafik analitik yang memetakan jenis produk paling laris dan profit margin bersih bulanan secara interaktif.</p>
                </div>

                {/* Feature 5 */}
                <div className="bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl hover:translate-y-[-4px] transition duration-300 hover:border-pink-200">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 rounded-2xl w-fit mb-4">
                    <Database className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Cloud Data Backup</h4>
                  <p className="text-xs opacity-75 leading-relaxed">Seluruh arsip transaksi terlindungi dan ter-backup di server cloud Google Cloud Platform tanpa khawatir kehilangan data.</p>
                </div>

                {/* Feature 6 */}
                <div className="bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl hover:translate-y-[-4px] transition duration-300 hover:border-pink-200">
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/40 text-purple-500 rounded-2xl w-fit mb-4">
                    <Users className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Multi-User Access</h4>
                  <p className="text-xs opacity-75 leading-relaxed">Bagikan akses terpisah dengan tim admin kasir dan akuntan menggunakan hak otoritas berjenjang yang aman.</p>
                </div>

                {/* Feature 7 */}
                <div className="bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl hover:translate-y-[-4px] transition duration-300 hover:border-pink-200">
                  <div className="p-3 bg-pink-100 dark:bg-pink-950 text-pink-500 rounded-2xl w-fit mb-4">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Secure Authentication System</h4>
                  <p className="text-xs opacity-75 leading-relaxed">Enkripsi tingkat tinggi untuk mengamankan data rahasia finansial operasional dari pencurian digital.</p>
                </div>

                {/* Feature 8 */}
                <div className="bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl hover:translate-y-[-4px] transition duration-300 hover:border-pink-200">
                  <div className="p-3 bg-teal-50 dark:bg-teal-950/40 text-teal-500 rounded-2xl w-fit mb-4">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Mobile Friendly Dashboard</h4>
                  <p className="text-xs opacity-75 leading-relaxed">Kompatibel penuh untuk diletakkan di smartphone Anda saat memantau penjualan dari ranjang tidur sekalipun.</p>
                </div>

              </div>

            </div>
          </section>

          {/* PRICING PLANS */}
          <section id="pricing_section" className="py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-pink-500 font-extrabold text-xs uppercase tracking-widest bg-pink-50 dark:bg-pink-950/40 px-3.5 py-1.5 rounded-full">
                  Skema Berlangganan
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 dark:text-gray-100 mt-4 tracking-tight leading-tight">
                  Investasi Murah untuk <br /> Lonjakan Keuntungan Abadi.
                </h2>
                <p className="text-sm opacity-70 mt-3">
                  Pilih paket langganan yang paling adaptif untuk skala perkembangan toko ritel maupun kuliner Anda saat ini.
                </p>
              </div>

              {/* Subscriptions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
                
                {/* Plan 1 */}
                <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-pink-300 transition duration-300">
                  <div>
                    <span className="text-xs font-black uppercase opacity-60">Starter (Mikro)</span>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold">Rp 99rb</span>
                      <span className="text-xs opacity-60">/ bulan</span>
                    </div>
                    <p className="text-xs opacity-70 mt-3">Sangat cocok untuk UMKM pemula yang baru memulai digitalisasi mandiri.</p>
                    
                    <ul className="mt-8 space-y-3.5 text-xs">
                      <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-pink-500 shrink-0" /> Max 2 Cabang Toko</li>
                      <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-pink-500 shrink-0" /> Pencatatan Keuangan Dasar</li>
                      <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-pink-500 shrink-0" /> Backup Cloud Harian</li>
                      <li className="flex items-center gap-2.5 font-bold"><Check className="w-4 h-4 text-pink-500 shrink-0" /> Max 2 Pengguna Admin</li>
                    </ul>
                  </div>

                  <button 
                    onClick={() => setCurrentView('register')}
                    className="mt-10 w-full border border-pink-200 hover:bg-pink-50 dark:hover:bg-slate-800/50 hover:border-pink-500 rounded-2xl py-3.5 text-xs uppercase font-extrabold text-pink-500 hover:text-pink-600 transition cursor-pointer"
                  >
                    Mulai Uji Coba Gratis
                  </button>
                </div>

                {/* Plan 2 - Highlighted */}
                <div className="bg-white dark:bg-slate-900 border-2 border-pink-500 rounded-3xl p-8 flex flex-col justify-between relative shadow-2xl shadow-pink-500/10 hover:scale-[1.01] transition duration-300">
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 via-rose-500 to-rose-456 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap">
                    ⭐ PALING POPULER
                  </div>

                  <div>
                    <span className="text-xs font-black uppercase text-pink-500">Business (Owner)</span>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-black">Rp 199rb</span>
                      <span className="text-xs opacity-60">/ bulan</span>
                    </div>
                    <p className="text-xs opacity-70 mt-3">Relevan untuk merchant kuliner & ritel baju yang berkembang pesat.</p>

                    <ul className="mt-8 space-y-3.5 text-xs">
                      <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-pink-500 shrink-0" /> 10 Cabang Toko Terintegrasi</li>
                      <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-pink-500 shrink-0" /> Automasi Pajak & Laporan Cashflow</li>
                      <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-pink-500 shrink-0" /> Pendampingan Asisten AI Bulanan</li>
                      <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-pink-500 shrink-0" /> Monitor Inventori Realtime Multi-User</li>
                      <li className="flex items-center gap-2.5 font-bold text-pink-500"><Check className="w-4 h-4 text-pink-500 shrink-0" /> Support Premium Prioritasi</li>
                    </ul>
                  </div>

                  <button 
                    onClick={() => setCurrentView('register')}
                    className="mt-10 w-full bg-gradient-to-r from-pink-500 via-rose-500 to-rose-450 text-white rounded-2xl py-3.5 text-xs uppercase font-black tracking-wide shadow-lg shadow-pink-500/20 hover:opacity-90 transition cursor-pointer"
                  >
                    Mulai Berlangganan
                  </button>
                </div>

                {/* Plan 3 */}
                <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-pink-300 transition duration-300">
                  <div>
                    <span className="text-xs font-black uppercase opacity-60">Premium (Enterprise)</span>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold">Rp 399rb</span>
                      <span className="text-xs opacity-60">/ bulan</span>
                    </div>
                    <p className="text-xs opacity-70 mt-3">Pilihan mutakhir bagi bisnis waralaba multinasional yang butuh kustomisasi.</p>

                    <ul className="mt-8 space-y-3.5 text-xs">
                      <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-pink-500 shrink-0" /> Unlimited Cabang & Gudang</li>
                      <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-pink-500 shrink-0" /> Laporan Pajak Otomatis (E-Filing)</li>
                      <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-pink-500 shrink-0" /> Kustomisasi API Kasir Eksternal</li>
                      <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-pink-500 shrink-0" /> Akun Pengguna Tidak Terbatas</li>
                    </ul>
                  </div>

                  <button 
                    onClick={() => setCurrentView('register')}
                    className="mt-10 w-full border border-pink-200 hover:bg-pink-50 dark:hover:bg-slate-800/50 hover:border-pink-500 rounded-2xl py-3.5 text-xs uppercase font-extrabold text-pink-500 hover:text-pink-600 transition cursor-pointer"
                  >
                    Hubungi Sales Kami
                  </button>
                </div>

              </div>

            </div>
          </section>

          {/* TESTIMONIALS SECTION */}
          <section id="testimonials_section" className="py-20 lg:py-28 bg-slate-50/50 dark:bg-slate-900/10 border-y border-pink-50/65 dark:border-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-pink-500 font-extrabold text-xs uppercase tracking-widest bg-pink-50 dark:bg-pink-950/40 px-3.5 py-1.5 rounded-full">
                  Kisah Sukses Pengguna
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 dark:text-gray-100 mt-4 tracking-tight leading-tight">
                  Dipercaya oleh Ribuan <br /> Wirausahawan Hebat Indonesia.
                </h2>
              </div>

              {/* Grid of reviews */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                
                {/* Review 1 */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-pink-50/40 dark:border-slate-850">
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400" />
                  </div>
                  <p className="text-xs opacity-80 leading-relaxed italic mb-6">
                    "Semenjak pakai SmartUMKM, saya tidak perlu begadang di akhir bulan untuk menghitung kembalian dan stok bocor kopi katering saya. Data stok otomatis sinkron dengan cloud, asisten AI sangat membantu mengingatkan belanja bahan baku."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center font-bold text-pink-500 text-sm">
                      IA
                    </div>
                    <div>
                      <h4 className="font-bold text-sm leading-none">Ibu Asih</h4>
                      <span className="text-[10px] opacity-50">Pemilik Warung Bubur Ibu Asih</span>
                    </div>
                  </div>
                </div>

                {/* Review 2 */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-pink-50/40 dark:border-slate-850">
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400" />
                  </div>
                  <p className="text-xs opacity-80 leading-relaxed italic mb-6">
                    "Bisnis ritel fashion kami memiliki 4 toko fisik di Bandung. Memantau keuangan dengan dashboard SmartUMKM sangat mudah lewat HP. Karyawan kasir saya hanya butuh waktu 5 menit untuk training dan langsung fasih menggunakan inputnya."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center font-bold text-rose-500 text-sm">
                      BP
                    </div>
                    <div>
                      <h4 className="font-bold text-sm leading-none">Bapak Pradana</h4>
                      <span className="text-[10px] opacity-50">CEO Pradana Apparel Group</span>
                    </div>
                  </div>
                </div>

                {/* Review 3 */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-pink-50/40 dark:border-slate-850">
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400" />
                  </div>
                  <p className="text-xs opacity-80 leading-relaxed italic mb-6">
                    "Fitur multi-user kasir & pembatasan hak akses di tim akuntan kami sangat aman. Kami tidak khawatir mengenai kebocoran margin modal dagang, database cloud-nya luar biasa andal dan cepat dimuat."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-500 text-sm">
                      NY
                    </div>
                    <div>
                      <h4 className="font-bold text-sm leading-none">Neng Yuli</h4>
                      <span className="text-[10px] opacity-50">Founder Oleh-Oleh Pasundan</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* ABOUT SECTION */}
          <section id="about_section" className="py-20 lg:py-28 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Side graphic */}
                <div className="lg:col-span-5 relative order-last lg:order-first">
                  <div className="bg-pink-100 dark:bg-pink-950/40 p-8 rounded-3xl border border-pink-200/50">
                    <h4 className="font-display font-black text-xl text-pink-500 mb-4">Misi Sosio-Ekonomi SmartUMKM</h4>
                    <p className="text-xs opacity-80 leading-relaxed mb-6">
                      Ada lebih dari 64 juta pelaku UMKM di Indonesia, namun baru sebagian kecil yang melek finansial digital. Kami hadir untuk menutup kesenjangan itu demi kemakmuran nasional secara berkelanjutan lewat integrasi digital kasir & finansial cloud.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-pink-500">
                        <Award className="w-5 h-5 shrink-0" /> Terpilih Jadi Top Tech Startup 2026
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-pink-500">
                        <HelpCircle className="w-5 h-5 shrink-0" /> Layanan Bantuan Lokal Indonesia 24/7
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Words about SME */}
                <div className="lg:col-span-7 space-y-6">
                  <span className="text-pink-500 font-extrabold text-xs uppercase tracking-widest bg-pink-50 dark:bg-pink-950/40 px-3.5 py-1.5 rounded-full">
                    Tentang SmartUMKM
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-display font-black text-slate-900 dark:text-gray-100 tracking-tight">
                    Mendampingi Pertumbuhan 1 Juta UMKM Go-Digital Berkelas Dunia.
                  </h3>
                  <p className="text-sm opacity-75 leading-relaxed">
                    SmartUMKM bukan hanya sekadar aplikasi pencatatan buku kas konvensional. Kami adalah platform ekosistem bisnis modern yang didirikan di Indonesia untuk membimbing unit bisnis lokal agar memiliki tata laksana administrasi sekualitas korporat besar secara aman, cerdas, dan efisien.
                  </p>
                  <p className="text-sm opacity-75 leading-relaxed">
                    Didesain khusus untuk layar sentuh kasir POS maupun PC monitor Anda, SmartUMKM menjamin transisi digitalisasi yang mulus tanpa mengorbankan stabilitas kerja usaha dagang Anda sehari-hari.
                  </p>

                  <div className="pt-4">
                    <button 
                      onClick={() => navigateToSection('contact_section')}
                      className="inline-flex items-center gap-2 text-pink-500 font-extrabold text-sm hover:underline cursor-pointer"
                    >
                      Pelajari Solusi Kustom Kami <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* CONTACT SECTION */}
          <section id="contact_section" className="py-20 lg:py-28 bg-slate-50/50 dark:bg-slate-900/10 border-t border-pink-50/70 dark:border-slate-850">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Contact Info and social buttons - Col 5 */}
                <div className="lg:col-span-5 space-y-8">
                  <div>
                    <span className="text-pink-500 font-extrabold text-xs uppercase tracking-widest bg-pink-50 dark:bg-pink-950/40 px-3.5 py-1.5 rounded-full">
                      Hubungi Kami
                    </span>
                    <h3 className="text-3xl font-display font-black text-slate-900 dark:text-gray-100 mt-4 tracking-tight">
                      Konsultasi Instan Siap Melayani Anda.
                    </h3>
                    <p className="text-sm opacity-70 mt-3 leading-relaxed">
                      Tim Customer Relations kami yang ramah siap memandu pendirian unit kasir digital cloud untuk toko Anda sekarang juga.
                    </p>
                  </div>

                  <div className="space-y-4">
                    
                    {/* Phone card */}
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
                      <div className="p-3 bg-pink-50 dark:bg-pink-950 text-pink-500 rounded-xl">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-xs opacity-50 font-bold">Layanan WhatsApp Priority</span>
                        <a href="https://wa.me/628123456789" target="_blank" rel="noreferrer" className="block text-sm font-black text-pink-500 hover:underline">
                          +62 812-3456-789
                        </a>
                      </div>
                    </div>

                    {/* Email card */}
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
                      <div className="p-3 bg-rose-50 dark:bg-rose-950 text-rose-500 rounded-xl">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-xs opacity-50 font-bold">Email Informasi & Support</span>
                        <a href="mailto:support@smartumkm.com" className="block text-sm font-black text-rose-500 hover:underline">
                          support@smartumkm.com
                        </a>
                      </div>
                    </div>

                    {/* Office Location card */}
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
                      <div className="p-3 bg-amber-50 dark:bg-amber-950 text-amber-550 rounded-xl">
                        <MapPin className="w-5 h-5 text-amber-550" />
                      </div>
                      <div>
                        <span className="block text-xs opacity-50 font-bold">Headquarter Office</span>
                        <span className="block text-xs font-bold opacity-80 leading-snug">
                          Menara JKT Tech No. 12, DKI Jakarta, Indonesia
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Direct WhatsApp Action Button */}
                  <div className="pt-2">
                    <a 
                      href="https://wa.me/628123456789?text=Halo%20SmartUMKM,%20saya%20tertarik%20paket%20Owner%20untuk%20warung%20saya"
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-lg transition"
                    >
                      <Phone className="w-4 h-4 fill-white text-emerald-500 shrink-0" />
                      Tanya di WhatsApp Sekarang
                    </a>
                  </div>
                </div>

                {/* Premium Contact Form - Col 7 */}
                <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 sm:p-10 rounded-3xl shadow-lg">
                  <h4 className="font-bold text-lg mb-6">Kirim Pertanyaan Langsung ke Tim Manajemen</h4>
                  
                  {contactSubmitted ? (
                    <div className="p-8 rounded-2xl bg-pink-50 dark:bg-pink-950/20 text-center space-y-4 border border-pink-100/40">
                      <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                        <Check className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="font-bold text-base">Pesan Anda Terkirim Secara Handal!</h5>
                        <p className="text-xs opacity-65 mt-1">Sistem asisten SmartUMKM akan memproses pesan ini dalam kurun waktu 1 jam ke depan ke alamat email Anda.</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase font-extrabold opacity-60 mb-1.5">Nama Lengkap</label>
                          <input 
                            type="text" 
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="Contoh: Rian Hidayat"
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl text-xs focus:outline-none focus:border-pink-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase font-extrabold opacity-60 mb-1.5">Alamat Email Aktif</label>
                          <input 
                            type="email" 
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="rian@domain.com"
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl text-xs focus:outline-none focus:border-pink-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-extrabold opacity-60 mb-1.5">Subjek / Topik</label>
                        <input 
                          type="text" 
                          value={contactSubject}
                          onChange={(e) => setContactSubject(e.target.value)}
                          placeholder="Contoh: Kemitraan atau Konsultasi Sistem Kasir Cabang"
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl text-xs focus:outline-none focus:border-pink-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-extrabold opacity-60 mb-1.5">Detail Pesan / Pertanyaan</label>
                        <textarea 
                          rows={4}
                          value={contactMsg}
                          onChange={(e) => setContactMsg(e.target.value)}
                          placeholder="Ketikkan pertanyaan secara terperinci disini..."
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl text-xs focus:outline-none focus:border-pink-500"
                          required
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wide transition duration-300 shadow-lg shadow-pink-500/10 cursor-pointer"
                      >
                        Kirim Pesan Sekarang
                      </button>

                    </form>
                  )}

                </div>

              </div>
            </div>
          </section>

          {/* SASS START TRIAL CATCH-ALL CTA BANNER */}
          <section className="py-20 lg:py-24 bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight leading-tight">
                Mari Majukan UMKM Indonesia Bersama SmartUMKM
              </h3>
              <p className="text-sm max-w-xl mx-auto opacity-90 leading-relaxed">
                Bergabunglah bersama 24,000+ UMKM di 34 provinsi yang telah merestrukturisasi finansial mereka menjadi seratus persen go-digital hari ini.
              </p>
              <div className="pt-4">
                <button 
                  onClick={() => setCurrentView('register')}
                  className="bg-white hover:scale-105 transition text-pink-500 font-extrabold px-10 py-4 rounded-2xl shadow-xl text-sm uppercase tracking-wide cursor-pointer"
                >
                  Start My Free Trial
                </button>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                
                {/* Brand module */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 group">
                    <div className="h-8 w-8 bg-pink-500 rounded-lg flex items-center justify-center text-white font-extrabold">
                      S
                    </div>
                    <span className="font-display font-black text-lg text-white tracking-tight">SmartUMKM</span>
                  </div>
                  <p className="text-xs leading-relaxed opacity-70">
                    Sistem SaaS berkelas dunia yang didedikasikan sepenuhnya demi mendongkrak omset dan akuntabilitas akuntansi bagi pelaku usaha kecil menengah di Indonesia.
                  </p>
                </div>

                {/* Company links */}
                <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Quick Links</h4>
                  <ul className="space-y-2.5 text-xs">
                    <li><button onClick={() => navigateToSection('hero_section')} className="hover:text-pink-400 transition cursor-pointer">Laman Depan</button></li>
                    <li><button onClick={() => navigateToSection('features_section')} className="hover:text-pink-400 transition cursor-pointer">Fitur Utama</button></li>
                    <li><button onClick={() => navigateToSection('pricing_section')} className="hover:text-pink-400 transition cursor-pointer">Paket Langganan</button></li>
                    <li><button onClick={() => navigateToSection('testimonials_section')} className="hover:text-pink-400 transition cursor-pointer">Review Pelanggan</button></li>
                  </ul>
                </div>

                {/* Integration links */}
                <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Solusi Legalitas</h4>
                  <ul className="space-y-2.5 text-xs">
                    <li><span className="cursor-not-allowed hover:text-pink-400 transition block">Kebijakan Privasi (Privacy Policy)</span></li>
                    <li><span className="cursor-not-allowed hover:text-pink-400 transition block">Syarat Ketentuan Layanan (TOS)</span></li>
                    <li><span className="cursor-not-allowed hover:text-pink-400 transition block">Mitra Pemerintah Indonesia</span></li>
                    <li><span className="cursor-not-allowed hover:text-pink-400 transition block">Sertifikat Sertifikasi Keamanan</span></li>
                  </ul>
                </div>

                {/* SME Target stats */}
                <div className="space-y-4">
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider">Mendukung Program</h4>
                  <span className="block text-xs font-bold text-pink-400">#UMKMNaiKelas #BanggaBuatanIndonesia</span>
                  <div className="text-[10px] bg-slate-800 p-3 rounded-xl leading-relaxed opacity-60">
                    Didukung server tangguh Google Cloud Platform dengan jaminan enkripsi AES-256 tingkat perbankan komersial.
                  </div>
                </div>

              </div>

              {/* Bottom Copyright line */}
              <div className="pt-8 border-t border-slate-800 text-center text-xs opacity-60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span>© 2026 SmartUMKM Inc. Seluruh hak cipta dilindungi undang-undang.</span>
                <span className="flex items-center gap-1">
                  Didesain khusus dengan cinta <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> untuk UMKM Indonesia
                </span>
              </div>

            </div>
          </footer>

        </div>
        /* END LANDING SITE */
      )}

    </div>
  );
}
