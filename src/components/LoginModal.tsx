import React, { useState } from 'react';
import { X, User, Mail, Lock, ShieldCheck, ArrowRight, CheckCircle2, Sparkles, Smartphone } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  userName: string;
  setUserName: (name: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  isLoggedIn,
  setIsLoggedIn,
  userName,
  setUserName,
}) => {
  const [email, setEmail] = useState('miguel.cobos@ticmac.com');
  const [authStep, setAuthStep] = useState<'INITIAL' | 'OTP' | 'SUCCESS'>('INITIAL');
  const [otp, setOtp] = useState(['4', '8', '2', '1']);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthStep('OTP');
  };

  const handleVerifyOtp = () => {
    setAuthStep('SUCCESS');
    setTimeout(() => {
      setIsLoggedIn(true);
      setUserName('Miguel Cobos');
      setAuthStep('INITIAL');
      onClose();
    }, 1200);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#66C2F1]/30 relative overflow-hidden space-y-6 animate-fadeIn">
        {/* Header decoration */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0F2942] via-[#66C2F1] to-[#0F2942]"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#252425] p-1.5 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isLoggedIn ? (
          /* LOGGED IN USER PROFILE CARD */
          <div className="space-y-6 pt-2 text-center">
            <div className="w-16 h-16 bg-[#252425] text-[#66C2F1] rounded-full flex items-center justify-center mx-auto text-xl font-extrabold shadow-md">
              MC
            </div>

            <div className="space-y-1">
              <span className="bg-[#66C2F1]/15 text-[#0F2942] font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Cuenta Liah Verificada
              </span>
              <h3 className="font-georama text-2xl font-black text-[#252425]">
                {userName}
              </h3>
              <p className="text-xs text-gray-500">miguel.cobos@ticmac.com</p>
            </div>

            <div className="bg-sky-50 rounded-2xl p-4 border border-sky-150 text-left space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Perfil Único Unificado</span>
              </div>
              <p className="text-gray-600 text-[11px]">
                Tu cuenta acompaña todas tus estancias vacacionales, experiencias en destino y tus fracciones patrimoniales en un solo lugar.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Cerrar Sesión / Cambiar a Modo Invitado
            </button>
          </div>
        ) : (
          /* LOGIN FORM */
          <div className="space-y-5 pt-2">
            <div className="space-y-1 text-center">
              <span className="text-[10px] font-bold text-[#66C2F1] uppercase tracking-wider block">
                Filosofía de Acceso Liah
              </span>
              <h2 className="font-georama text-2xl font-black text-[#252425]">
                Inicia Sesión en Liah
              </h2>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Una sola cuenta para explorar, gestionar tus viajes y controlar tu patrimonio.
              </p>
            </div>

            {authStep === 'INITIAL' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Correo Electrónico o Teléfono
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@correo.com"
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#66C2F1] rounded-xl py-2.5 pl-10 pr-3 text-xs font-semibold text-[#252425] focus:outline-hidden"
                      />
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#252425] hover:bg-[#66C2F1] text-white hover:text-[#252425] py-3 rounded-xl font-georama font-bold text-xs transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Continuar con Magic Link o Código SMS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="shrink-0 mx-3 text-[10px] text-gray-400 font-bold uppercase">
                    O accede rápido
                  </span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoggedIn(true);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl border border-gray-200 hover:border-[#66C2F1] font-bold text-gray-700 flex items-center justify-center space-x-2 transition-all cursor-pointer bg-gray-50"
                  >
                    <Sparkles className="w-4 h-4 text-[#66C2F1]" />
                    <span>Demo Instantánea</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsLoggedIn(true);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl border border-gray-200 hover:border-[#66C2F1] font-bold text-gray-700 flex items-center justify-center space-x-2 transition-all cursor-pointer bg-gray-50"
                  >
                    <Smartphone className="w-4 h-4 text-[#252425]" />
                    <span>Apple / Google</span>
                  </button>
                </div>

                <div className="bg-sky-50 p-3 rounded-xl border border-sky-150 flex items-start space-x-2.5 text-[11px] text-gray-600">
                  <ShieldCheck className="w-4 h-4 text-[#66C2F1] shrink-0 mt-0.5" />
                  <span>
                    Puedes seguir navegando como invitado sin registrarte hasta el momento de reservar tu estancia o seleccionar una fracción.
                  </span>
                </div>
              </form>
            )}

            {authStep === 'OTP' && (
              <div className="space-y-4 text-center">
                <p className="text-xs text-gray-600">
                  Enviamos un código de verificación de 4 dígitos a <span className="font-bold text-[#252425]">{email}</span>
                </p>

                <div className="flex justify-center space-x-2 my-4">
                  {otp.map((num, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={num}
                      readOnly
                      className="w-12 h-12 text-center text-lg font-bold font-mono bg-sky-50 border-2 border-[#66C2F1] rounded-xl text-[#252425]"
                    />
                  ))}
                </div>

                <button
                  onClick={handleVerifyOtp}
                  className="w-full bg-[#252425] hover:bg-[#66C2F1] text-white hover:text-[#252425] py-3 rounded-xl font-georama font-bold text-xs transition-all shadow-md cursor-pointer"
                >
                  Verificar & Acceder
                </button>
              </div>
            )}

            {authStep === 'SUCCESS' && (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="font-georama text-lg font-bold text-[#252425]">
                  ¡Bienvenido de vuelta, Miguel!
                </h3>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
