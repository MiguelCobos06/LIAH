import React from 'react';
import { ActiveScreen } from '../types';
import { 
  X, User, ShieldCheck, Luggage, FileText, CreditCard, 
  LogOut, ChevronRight, Sparkles, PhoneCall
} from 'lucide-react';

interface MiLiahSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveScreen: (screen: ActiveScreen) => void;
  userName: string;
  isLoggedIn: boolean;
  onOpenLoginModal: () => void;
  onOpenAiConcierge: () => void;
}

export const MiLiahSidebar: React.FC<MiLiahSidebarProps> = ({
  isOpen,
  onClose,
  setActiveScreen,
  userName,
  isLoggedIn,
  onOpenLoginModal,
  onOpenAiConcierge,
}) => {
  if (!isOpen) return null;

  const handleNavigate = (screen: ActiveScreen) => {
    setActiveScreen(screen);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Darkened Backdrop Blur */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-sky-100 text-[#252425] animate-in slide-in-from-right duration-300">
          
          {/* Header Section */}
          <div className="p-6 bg-[#252425] text-white border-b border-gray-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-georama text-2xl font-black text-white">liah</span>
                <span className="text-[10px] tracking-widest font-extrabold text-[#66C2F1] uppercase bg-[#66C2F1]/10 px-2 py-0.5 rounded-md border border-[#66C2F1]/30">
                  MI PERFIL
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Profile Info Badge */}
            {isLoggedIn ? (
              <div className="bg-white/10 border border-white/15 rounded-2xl p-4 flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#66C2F1] to-sky-300 text-[#252425] font-black text-lg flex items-center justify-center shrink-0 shadow-inner">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-georama text-base font-bold text-white truncate">
                    {userName}
                  </h3>
                  <p className="text-[11px] text-[#66C2F1] font-semibold flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Miembro Fractional</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 border border-white/15 rounded-2xl p-4 text-center space-y-2">
                <p className="text-xs text-gray-300">Inicia sesión para gestionar tus estancias y certificados Fractional</p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenLoginModal();
                  }}
                  className="w-full bg-[#66C2F1] text-[#252425] hover:bg-white py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Iniciar Sesión
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Body Menu Options */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Core Account Menu List */}
            <div className="space-y-2.5">
              <span className="text-[10px] uppercase font-extrabold text-gray-400 tracking-wider block px-1">
                Gobernanza & Mi Liah
              </span>

              <button
                onClick={() => handleNavigate('09_MI_ADQUISICION')}
                className="w-full bg-white hover:bg-sky-50 border border-gray-200 hover:border-[#66C2F1] p-3.5 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#252425] group-hover:text-[#66C2F1]">
                      Mi Adquisición Patrimonial
                    </h4>
                    <p className="text-[10px] text-gray-500">
                      Avance de Escrituración (85% Completado)
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleNavigate('10_VIAJE_ACTIVO')}
                className="w-full bg-white hover:bg-sky-50 border border-gray-200 hover:border-[#66C2F1] p-3.5 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-sky-50 text-[#0F2942]">
                    <Luggage className="w-5 h-5 text-[#66C2F1]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#252425] group-hover:text-[#66C2F1]">
                      Viaje Activo & Experiencias
                    </h4>
                    <p className="text-[10px] text-gray-500">
                      Check-in, acceso digital y servicio Concierge
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleNavigate('VIAJES')}
                className="w-full bg-white hover:bg-sky-50 border border-gray-200 hover:border-[#66C2F1] p-3.5 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-gray-100 text-gray-700">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#252425] group-hover:text-[#66C2F1]">
                      Mis Reservaciones Liah
                    </h4>
                    <p className="text-[10px] text-gray-500">
                      Historial de estancias e itinerarios
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleNavigate('MI_LIAH')}
                className="w-full bg-white hover:bg-sky-50 border border-gray-200 hover:border-[#66C2F1] p-3.5 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-gray-100 text-gray-700">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#252425] group-hover:text-[#66C2F1]">
                      Fideicomiso & Mantenimiento
                    </h4>
                    <p className="text-[10px] text-gray-500">
                      Estado de cuenta y cuotas de administración
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* AI Assistant Banner inside Sidebar */}
            <div className="bg-gradient-to-r from-[#252425] to-[#0F2942] text-white p-4.5 rounded-2xl space-y-2 shadow-lg">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#66C2F1]" />
                <h4 className="text-xs font-bold text-white">Asistente Concierge Liah IA</h4>
              </div>
              <p className="text-[11px] text-gray-300">
                Consulta en tiempo real recomendaciones de restaurantes, dudas de adquisición fractional o itinerarios.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenAiConcierge();
                }}
                className="w-full bg-[#66C2F1] text-[#252425] hover:bg-white py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Abrir Concierge Virtual
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-gray-500">
              <PhoneCall className="w-3.5 h-3.5 text-[#66C2F1]" />
              <span className="text-[11px]">Soporte Liah: 800-LIAH-PATRIMONIO</span>
            </div>

            {isLoggedIn && (
              <button
                onClick={() => {
                  onClose();
                  onOpenLoginModal();
                }}
                className="text-red-600 hover:text-red-700 font-bold text-[11px] flex items-center space-x-1 cursor-pointer"
              >
                <LogOut className="w-3 h-3" />
                <span>Salir</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
