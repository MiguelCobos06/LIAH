import React, { useState } from 'react';
import { ActiveScreen, ViewMode, PropertyExperienceCategory } from '../types';
import { 
  Search, Sparkles, Smartphone, Monitor, User, X,
  Compass, MapPin, Luggage, ShieldCheck, Globe, DollarSign, Menu
} from 'lucide-react';

interface HeaderProps {
  activeScreen: ActiveScreen;
  setActiveScreen: (screen: ActiveScreen) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  hasActiveTrip: boolean;
  setHasActiveTrip: (has: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenAiConcierge: () => void;
  isLoggedIn: boolean;
  userName: string;
  onOpenLoginModal: () => void;
  onOpenMiLiahSidebar: () => void;
  currency: 'MXN' | 'USD' | 'EUR';
  setCurrency: (c: 'MXN' | 'USD' | 'EUR') => void;
  language: 'ES' | 'EN';
  setLanguage: (l: 'ES' | 'EN') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  setActiveScreen,
  viewMode,
  setViewMode,
  hasActiveTrip,
  setHasActiveTrip,
  searchQuery,
  setSearchQuery,
  onOpenAiConcierge,
  isLoggedIn,
  userName,
  onOpenLoginModal,
  onOpenMiLiahSidebar,
  currency,
  setCurrency,
  language,
  setLanguage,
}) => {
  const [headerSearchInput, setHeaderSearchInput] = useState(searchQuery);

  const handleHeaderSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (setSearchQuery) setSearchQuery(headerSearchInput);
    setActiveScreen('02_RESULTADOS');
  };

  const showHeaderSearchInput = activeScreen !== '01_EXPLORAR';

  return (
    <header className="sticky top-0 z-40 bg-[#252425]/95 backdrop-blur-md text-white border-b border-gray-800 shadow-md">
      {/* Top Utility Announcement Bar & Language/Currency Controls */}
      <div className="bg-[#1a191a] text-gray-300 px-4 py-1.5 text-[11px] border-b border-gray-800/80 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#66C2F1] animate-pulse"></span>
          <span className="font-semibold text-gray-200 hidden sm:inline">
            Liah Ecosistema • Experiencias Vacacionales & Adquisición Fractional
          </span>
          <span className="font-semibold text-gray-200 sm:hidden">
            Liah Ecosistema
          </span>
        </div>

        {/* Currency & Language Controls + Trip Simulator */}
        <div className="flex items-center space-x-3">
          {/* Currency Switcher */}
          <div className="flex items-center bg-white/10 rounded-lg p-0.5 text-[10px] font-bold">
            {(['MXN', 'USD', 'EUR'] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-1.5 py-0.5 rounded-md transition-all cursor-pointer ${
                  currency === c ? 'bg-[#66C2F1] text-[#252425]' : 'text-gray-300 hover:text-white'
                }`}
                title={`Cambiar moneda a ${c}`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="hidden sm:flex items-center bg-white/10 rounded-lg p-0.5 text-[10px] font-bold">
            {(['ES', 'EN'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`px-1.5 py-0.5 rounded-md transition-all cursor-pointer ${
                  language === l ? 'bg-[#66C2F1] text-[#252425]' : 'text-gray-300 hover:text-white'
                }`}
                title={`Cambiar idioma a ${l === 'ES' ? 'Español' : 'English'}`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Simulate Active Trip */}
          <button
            onClick={() => {
              const next = !hasActiveTrip;
              setHasActiveTrip(next);
              if (next) setActiveScreen('10_VIAJE_ACTIVO');
            }}
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all flex items-center space-x-1 cursor-pointer ${
              hasActiveTrip
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${hasActiveTrip ? 'bg-white animate-ping' : 'bg-gray-400'}`}></span>
            <span className="hidden sm:inline">{hasActiveTrip ? 'Viaje Activo Hoy' : 'Simular Viaje'}</span>
          </button>

          {/* Mobile / Desktop view toggle */}
          <div className="hidden sm:flex items-center bg-white/10 rounded-md p-0.5">
            <button
              onClick={() => setViewMode('MOBILE')}
              className={`p-1 rounded-sm transition-all cursor-pointer ${
                viewMode === 'MOBILE' ? 'bg-[#66C2F1] text-[#252425]' : 'text-gray-400 hover:text-white'
              }`}
              title="Vista Móvil"
            >
              <Smartphone className="w-3 h-3" />
            </button>
            <button
              onClick={() => setViewMode('DESKTOP')}
              className={`p-1 rounded-sm transition-all cursor-pointer ${
                viewMode === 'DESKTOP' ? 'bg-[#66C2F1] text-[#252425]' : 'text-gray-400 hover:text-white'
              }`}
              title="Vista Escritorio"
            >
              <Monitor className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => {
            if (setSearchQuery) setSearchQuery('');
            setActiveScreen('01_EXPLORAR');
          }}
          className="cursor-pointer group flex items-center space-x-2 select-none shrink-0"
        >
          <span className="font-georama text-2xl font-black tracking-tight text-white group-hover:text-[#66C2F1] transition-colors">
            liah
          </span>
          <span className="text-[9px] tracking-widest font-extrabold text-[#66C2F1] uppercase bg-[#66C2F1]/10 border border-[#66C2F1]/30 px-2 py-0.5 rounded-md hidden sm:inline">
            TOMA EL CONTROL
          </span>
        </div>

        {/* Conditional Header Quick Search Input - Contextual based on screen */}
        {showHeaderSearchInput ? (
          <form onSubmit={handleHeaderSearch} className="flex-1 max-w-md relative hidden md:block">
            <div className="relative flex items-center">
              <input
                type="text"
                value={headerSearchInput}
                onChange={(e) => setHeaderSearchInput(e.target.value)}
                placeholder={
                  activeScreen === 'EXPERIENCIAS' || activeScreen === '10_VIAJE_ACTIVO'
                    ? '¿Qué quieres hacer hoy? (ej. "Cenote", "Cata", "Restaurante")...'
                    : activeScreen === 'DESTINOS'
                    ? '¿A dónde quieres ir? (ej. "Telchac", "Valladolid", "San Miguel")...'
                    : activeScreen === '07_FRACCIONES_DISPONIBLES' || activeScreen === '08_FRACCION_SIMULACION'
                    ? 'Buscar opciones Fractional...'
                    : '¿A dónde quieres ir? (ej. "Telchac", "Alberca", "Selva")...'
                }
                className="w-full bg-[#161516] border border-[#66C2F1]/30 focus:border-[#66C2F1] text-white rounded-full py-1.5 pl-9 pr-20 text-xs focus:outline-hidden transition-all placeholder:text-gray-400 font-medium shadow-inner"
              />
              <Search className="w-3.5 h-3.5 text-[#66C2F1] absolute left-3 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#66C2F1] text-[#252425] hover:bg-white px-3 py-1 rounded-full text-[10px] font-extrabold transition-all cursor-pointer shadow-xs"
              >
                Buscar
              </button>
            </div>
          </form>
        ) : (
          <div className="flex-1 hidden md:block"></div>
        )}

        {/* Navigation Tabs focused purely on Discovery */}
        <nav className="hidden lg:flex items-center space-x-5 text-xs font-semibold">
          <button
            onClick={() => {
              if (setSearchQuery) setSearchQuery('');
              setActiveScreen('01_EXPLORAR');
            }}
            className={`flex items-center space-x-1.5 py-1 px-2.5 rounded-lg transition-all cursor-pointer ${
              activeScreen === '01_EXPLORAR' ? 'bg-[#66C2F1] text-[#252425] font-bold' : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Explorar</span>
          </button>

          <button
            onClick={() => setActiveScreen('DESTINOS')}
            className={`flex items-center space-x-1.5 py-1 px-2.5 rounded-lg transition-all cursor-pointer ${
              activeScreen === 'DESTINOS' ? 'bg-[#66C2F1] text-[#252425] font-bold' : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Destinos</span>
          </button>

          <button
            onClick={() => setActiveScreen('EXPERIENCIAS')}
            className={`flex items-center space-x-1.5 py-1 px-2.5 rounded-lg transition-all cursor-pointer ${
              activeScreen === 'EXPERIENCIAS' ? 'bg-[#66C2F1] text-[#252425] font-bold' : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#66C2F1]" />
            <span>Experiencias</span>
          </button>

          <button
            onClick={() => setActiveScreen('07_FRACCIONES_DISPONIBLES')}
            className={`flex items-center space-x-1.5 py-1 px-2.5 rounded-lg transition-all cursor-pointer ${
              activeScreen === '07_FRACCIONES_DISPONIBLES' || activeScreen === '08_FRACCION_SIMULACION' ? 'bg-[#66C2F1] text-[#252425] font-bold' : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Fractional</span>
          </button>

          <button
            onClick={() => setActiveScreen('VIAJES')}
            className={`flex items-center space-x-1.5 py-1 px-2.5 rounded-lg transition-all cursor-pointer ${
              activeScreen === 'VIAJES' || activeScreen === '10_VIAJE_ACTIVO' ? 'bg-[#66C2F1] text-[#252425] font-bold' : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Luggage className="w-3.5 h-3.5" />
            <span>Mis Viajes</span>
          </button>
        </nav>

        {/* Right Action Buttons: AI Assistant + Mi Liah Sidebar Trigger */}
        <div className="flex items-center space-x-2">
          {/* AI Virtual Concierge Trigger Button */}
          <button
            onClick={onOpenAiConcierge}
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#66C2F1] to-sky-300 text-[#252425] hover:bg-white font-bold text-xs transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm hover:scale-105"
            title="Abrir Asistente Virtual Concierge Liah IA"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#252425]" />
            <span className="hidden sm:inline">Asistente IA</span>
          </button>

          {/* Mi Liah Sidebar Drawer Button */}
          <button
            onClick={onOpenMiLiahSidebar}
            className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#66C2F1] hover:text-[#252425] text-white font-bold text-xs border border-gray-700 transition-all flex items-center space-x-1.5 cursor-pointer"
            title="Abrir Mi Liah Sidebar Drawer"
          >
            <User className="w-3.5 h-3.5 text-[#66C2F1]" />
            <span className="hidden sm:inline">Mi Liah</span>
            <Menu className="w-3.5 h-3.5 opacity-70" />
          </button>
        </div>
      </div>
    </header>
  );
};
