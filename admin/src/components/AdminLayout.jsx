import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Package, 
  MessageSquareText, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  Compass, 
  Bell, 
  Search, 
  ShieldCheck, 
  ChevronDown,
  User
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Bookings', path: '/bookings', icon: CalendarCheck, badge: '7' },
    { name: 'Packages', path: '/packages', icon: Package },
    { name: 'Custom Enquiries', path: '/enquiries', icon: MessageSquareText, badge: '3' },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('aryavarta_admin_auth');
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/dashboard' && (location.pathname === '/dashboard' || location.pathname === '/')) return true;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* Mobile Top Header */}
      <div className="md:hidden bg-slate-900 text-white p-3.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="h-10 w-auto p-0.5 bg-white rounded-xl shadow-md border border-white/20 flex items-center justify-center overflow-hidden">
            <img src="/logo.png" alt="Aryavarta Travel" className="h-9 w-auto object-contain rounded-lg" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white font-serif leading-none">
              Aryavarta <span className="text-amber-400">Travel</span>
            </span>
            <span className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold mt-1">
              Admin Panel
            </span>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar (Desktop & Mobile drawer) */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 bg-slate-900 text-slate-300 flex flex-col justify-between transition-all duration-300 border-r border-slate-800
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${sidebarCollapsed ? 'w-20' : 'w-64'}
      `}>
        {/* Sidebar Header */}
        <div>
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className={`flex items-center space-x-3 overflow-hidden ${sidebarCollapsed ? 'justify-center w-full' : ''}`}>
              <div className="h-11 sm:h-12 w-auto p-0.5 bg-white rounded-xl shadow-md border border-white/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="Aryavarta Travel"
                  className="h-10 sm:h-11 w-auto object-contain rounded-lg"
                />
              </div>
              {!sidebarCollapsed && (
                <div className="flex flex-col">
                  <span className="font-bold text-base text-white font-serif tracking-tight leading-none">
                    Aryavarta <span className="text-amber-400">Travel</span>
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-1">
                    Admin Panel
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center rounded-xl px-3.5 py-3 text-sm font-semibold transition-all group ${
                    active
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  } ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-slate-950' : 'text-slate-400 group-hover:text-amber-400'}`} />
                    {!sidebarCollapsed && <span>{item.name}</span>}
                  </div>

                  {!sidebarCollapsed && item.badge && (
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      active ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-800 space-y-2">
          {/* View Public Website */}
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ${
              sidebarCollapsed ? 'justify-center' : 'justify-between'
            }`}
            title="Open Client Website"
          >
            <div className="flex items-center space-x-2">
              <ExternalLink className="w-4 h-4 text-amber-400" />
              {!sidebarCollapsed && <span>Live Public Site</span>}
            </div>
          </a>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors ${
              sidebarCollapsed ? 'justify-center' : 'space-x-2'
            }`}
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
          
          <div className="flex items-center space-x-3">
            {/* Desktop collapse toggle */}
            <button
              type="button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden md:flex p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              aria-label="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Quick search input */}
            <div className="relative hidden sm:block w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search bookings, travelers, permits..."
                className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Live Client Link */}
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-200"
            >
              <span>Visit Client Website</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1.5 text-amber-600" />
            </a>

            {/* Notification Bell */}
            <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            </button>

            {/* User Profile dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-xs">
                  SN
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-xs font-bold text-slate-900">Stanzin Norbu</div>
                  <div className="text-[10px] text-slate-500">Expedition Ops Lead</div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 text-xs text-slate-700 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <div className="font-bold text-slate-900">Stanzin Norbu</div>
                    <div className="text-[11px] text-slate-500">operations@aryavartatravel.com</div>
                  </div>
                  <Link
                    to="/settings"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="block px-4 py-2.5 hover:bg-slate-50 font-medium"
                  >
                    Business Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 hover:bg-rose-50 text-rose-600 font-semibold border-t border-slate-100"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>

          </div>

        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
