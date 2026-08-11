import React, { useState } from 'react';
import { ActiveScreen, TripBooking } from '../types';
import { DEFAULT_BOOKING } from '../data/mockData';
import { ShieldCheck, Calendar, Users, CreditCard, Lock, CheckCircle2, ArrowRight, ArrowLeft, Loader2, Sparkles, Clock, FileText, Check } from 'lucide-react';

interface CheckoutViewProps {
  setActiveScreen: (screen: ActiveScreen) => void;
  onConfirmBooking: (booking: TripBooking) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  setActiveScreen,
  onConfirmBooking
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [formData, setFormData] = useState({
    fullName: 'Miguel Cobos',
    email: 'miguel.cobos@ticmac.com',
    phone: '+52 55 1234 5678',
    arrivalEstimate: '15:00 - 17:00 hrs',
    specialNotes: 'Requerimos cuna para infante y preferencia por almohadas de pluma.',
    paymentMethod: 'card' as 'card' | 'spei' | 'apple',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvv: '•••'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(1);

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setProcessingStep(1);

    setTimeout(() => {
      setProcessingStep(2);
    }, 800);

    setTimeout(() => {
      setProcessingStep(3);
    }, 1600);

    setTimeout(() => {
      setIsProcessing(false);
      onConfirmBooking(DEFAULT_BOOKING);
      setActiveScreen('05_HOSPEDAJE_CONFIRMADO');
    }, 2400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 relative">
      {/* Processing Animated Overlay Modal */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl border border-[#66C2F1]/30">
            <div className="w-16 h-16 bg-[#252425] text-[#66C2F1] rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <Sparkles className="w-8 h-8 animate-pulse text-[#66C2F1]" />
            </div>

            <div className="space-y-2">
              <h3 className="font-georama text-2xl font-black text-[#252425]">
                Confirmando tu Estancia
              </h3>
              <p className="text-xs text-gray-500">
                Liah está procesando tu reservación en Casa Celesta.
              </p>
            </div>

            <div className="space-y-3 text-left text-xs bg-sky-50 p-4 rounded-2xl border border-sky-150">
              <div className={`flex items-center space-x-3 transition-opacity ${processingStep >= 1 ? 'opacity-100 text-[#0F2942] font-bold' : 'opacity-40 text-gray-400'}`}>
                {processingStep > 1 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <Loader2 className="w-4 h-4 animate-spin text-[#66C2F1] shrink-0" />
                )}
                <span>Verificando disponibilidad en Casa Celesta...</span>
              </div>

              <div className={`flex items-center space-x-3 transition-opacity ${processingStep >= 2 ? 'opacity-100 text-[#0F2942] font-bold' : 'opacity-40 text-gray-400'}`}>
                {processingStep > 2 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <Loader2 className="w-4 h-4 animate-spin text-[#66C2F1] shrink-0" />
                )}
                <span>Asegurando garantía y Concierge 24/7...</span>
              </div>

              <div className={`flex items-center space-x-3 transition-opacity ${processingStep >= 3 ? 'opacity-100 text-[#0F2942] font-bold' : 'opacity-40 text-gray-400'}`}>
                <Loader2 className="w-4 h-4 animate-spin text-[#66C2F1] shrink-0" />
                <span>Emitiendo itinerario de viaje #SMA-881...</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Header / Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            if (currentStep > 1) {
              setCurrentStep((currentStep - 1) as 1 | 2);
            } else {
              setActiveScreen('03_FICHA_HOSPEDAJE');
            }
          }}
          className="text-xs font-bold text-gray-600 hover:text-[#252425] flex items-center space-x-2 transition-colors cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-gray-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentStep === 1 ? 'Volver a la Experiencia' : 'Paso Anterior'}</span>
        </button>

        <span className="text-xs font-semibold text-gray-500">
          Paso <span className="text-[#252425] font-bold">{currentStep}</span> de 3
        </span>
      </div>

      {/* Progress Steps Header Bar */}
      <div className="bg-white rounded-2xl border border-[#66C2F1]/30 p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-3 gap-2 text-xs">
          {/* Step 1 Indicator */}
          <button
            onClick={() => setCurrentStep(1)}
            className={`p-3 rounded-xl border flex items-center space-x-2 transition-all cursor-pointer text-left ${
              currentStep === 1
                ? 'bg-[#252425] text-white border-[#252425] shadow-xs'
                : currentStep > 1
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-gray-50 text-gray-400 border-gray-200'
            }`}
          >
            <span className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-[10px] shrink-0 ${
              currentStep === 1 ? 'bg-[#66C2F1] text-[#252425]' : currentStep > 1 ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > 1 ? <Check className="w-3.5 h-3.5" /> : '1'}
            </span>
            <div className="hidden sm:block">
              <span className="block font-bold text-xs leading-none">Revisa tu Estancia</span>
              <span className="text-[10px] opacity-80">Fechas & Fechas</span>
            </div>
          </button>

          {/* Step 2 Indicator */}
          <button
            onClick={() => {
              if (currentStep >= 1) setCurrentStep(2);
            }}
            className={`p-3 rounded-xl border flex items-center space-x-2 transition-all cursor-pointer text-left ${
              currentStep === 2
                ? 'bg-[#252425] text-white border-[#252425] shadow-xs'
                : currentStep > 2
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-gray-50 text-gray-400 border-gray-200'
            }`}
          >
            <span className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-[10px] shrink-0 ${
              currentStep === 2 ? 'bg-[#66C2F1] text-[#252425]' : currentStep > 2 ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > 2 ? <Check className="w-3.5 h-3.5" /> : '2'}
            </span>
            <div className="hidden sm:block">
              <span className="block font-bold text-xs leading-none">Datos del Titular</span>
              <span className="text-[10px] opacity-80">Contacto & Notas</span>
            </div>
          </button>

          {/* Step 3 Indicator */}
          <button
            onClick={() => {
              if (currentStep >= 2) setCurrentStep(3);
            }}
            className={`p-3 rounded-xl border flex items-center space-x-2 transition-all cursor-pointer text-left ${
              currentStep === 3
                ? 'bg-[#252425] text-white border-[#252425] shadow-xs'
                : 'bg-gray-50 text-gray-400 border-gray-200'
            }`}
          >
            <span className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-[10px] shrink-0 ${
              currentStep === 3 ? 'bg-[#66C2F1] text-[#252425]' : 'bg-gray-200 text-gray-500'
            }`}>
              3
            </span>
            <div className="hidden sm:block">
              <span className="block font-bold text-xs leading-none">Garantía & Pago</span>
              <span className="text-[10px] opacity-80">Confirma seguro</span>
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Booking Summary Card (Always Visible) */}
        <div className="md:col-span-1 bg-gradient-to-br from-[#E0F2FE]/50 via-white to-white rounded-2xl border border-[#66C2F1]/30 p-5 space-y-4 shadow-xs">
          <div className="relative h-36 rounded-xl overflow-hidden border border-gray-100">
            <img src={DEFAULT_BOOKING.propertyImage} alt="" className="w-full h-full object-cover" />
            <span className="absolute top-2 left-2 bg-[#252425]/80 backdrop-blur-xs text-[#66C2F1] text-[10px] font-bold px-2 py-0.5 rounded-full">
              Liah Guaranteed
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-[#66C2F1] uppercase tracking-wider">{DEFAULT_BOOKING.destination}</span>
            <h3 className="font-georama text-base font-bold text-[#252425] leading-snug">
              {DEFAULT_BOOKING.propertyTitle}
            </h3>
          </div>

          <div className="space-y-2 text-xs border-t border-b border-gray-100 py-3 text-gray-600">
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-1"><Calendar className="w-3.5 h-3.5 text-[#66C2F1]" /> <span>Fechas:</span></span>
              <span className="font-bold text-[#252425]">20 - 24 Ago (4 noches)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-1"><Users className="w-3.5 h-3.5 text-[#66C2F1]" /> <span>Huéspedes:</span></span>
              <span className="font-bold text-[#252425]">4 personas</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Noches ($14,500 MXN x 4)</span>
              <span className="font-medium">$58,000 MXN</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Limpieza profesional Liah</span>
              <span className="font-medium">$2,200 MXN</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Concierge & Servicio 24/7</span>
              <span className="font-medium">$3,100 MXN</span>
            </div>
            <div className="flex justify-between font-extrabold text-sm text-[#252425] pt-2 border-t border-gray-200">
              <span>Total Transparente</span>
              <span className="text-[#0F2942] text-base">$63,300 MXN</span>
            </div>
          </div>

          <div className="bg-sky-50 p-3 rounded-xl border border-sky-150 flex items-start space-x-2 text-[11px] text-gray-600">
            <ShieldCheck className="w-4 h-4 text-[#66C2F1] shrink-0 mt-0.5" />
            <span>Cancelación flexible sin penalización hasta 14 días antes del check-in.</span>
          </div>
        </div>

        {/* Dynamic Wizard Steps Column */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-sky-100 p-6 space-y-6 shadow-xs">
          {/* STEP 1: REVIEW STAY & DETAILS */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <span className="text-[10px] font-bold text-[#66C2F1] uppercase tracking-wider block">Paso 1 de 3</span>
                <h2 className="font-georama text-xl font-extrabold text-[#252425]">
                  Revisa los detalles de tu estancia
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Asegúrate de que tus fechas y cantidad de huéspedes coincidan con tus planes.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <div>
                    <span className="text-gray-400 block text-[10px] font-bold uppercase">Check-in</span>
                    <span className="font-bold text-[#252425]">Jueves, 20 Ago 2026 (15:00)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 block text-[10px] font-bold uppercase">Check-out</span>
                    <span className="font-bold text-[#252425]">Lunes, 24 Ago 2026 (12:00)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Capacidad de la Experiencia:</span>
                  <span className="font-bold text-[#252425]">Hasta 8 huéspedes (4 recámaras)</span>
                </div>
              </div>

              {/* Special Requests / Preferences */}
              <div className="space-y-3">
                <h3 className="font-georama text-sm font-bold text-[#252425] flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#66C2F1]" />
                  <span>Preferencias de Llegada & Concierge</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Horario estimado de llegada</label>
                    <select
                      value={formData.arrivalEstimate}
                      onChange={(e) => setFormData({ ...formData, arrivalEstimate: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-medium text-[#252425] focus:outline-hidden focus:border-[#66C2F1]"
                    >
                      <option value="15:00 - 17:00 hrs">15:00 - 17:00 hrs (Check-in estándar)</option>
                      <option value="17:00 - 19:00 hrs">17:00 - 19:00 hrs (Tarde)</option>
                      <option value="19:00 - 21:00 hrs">19:00 - 21:00 hrs (Noche)</option>
                      <option value="Apertura remota con cerradura digital Liah">Apertura remota con cerradura digital Liah</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Peticiones especiales o notas para el anfitrión</label>
                    <textarea
                      rows={2}
                      value={formData.specialNotes}
                      onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                      placeholder="Ej. Cuna de bebé, alergias alimentarias para la bienvenida..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-medium text-[#252425] focus:outline-hidden focus:border-[#66C2F1]"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                className="w-full bg-[#252425] hover:bg-[#66C2F1] text-white hover:text-[#252425] py-3.5 rounded-xl font-georama font-bold text-xs transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Continuar a Datos del Titular</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: GUEST DATA & PROFILE */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <span className="text-[10px] font-bold text-[#66C2F1] uppercase tracking-wider block">Paso 2 de 3</span>
                <h2 className="font-georama text-xl font-extrabold text-[#252425]">
                  Datos del Titular de la Reservación
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  En Liah solicitamos tu información personal únicamente cuando estás listo para confirmar.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Nombre Completo del Titular</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#66C2F1] rounded-xl p-3 font-semibold text-[#252425] focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Correo Electrónico (Para itinerario)</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#66C2F1] rounded-xl p-3 font-semibold text-[#252425] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Teléfono Móvil (WhatsApp Concierge)</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#66C2F1] rounded-xl p-3 font-semibold text-[#252425] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="bg-sky-50 p-3 rounded-xl border border-sky-150 flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <span className="font-bold text-[#0F2942] block">Vinculado a tu cuenta Liah</span>
                    <span className="text-gray-500 text-[11px]">Tus reservas e itinerarios se consolidarán automáticamente en "Mi Liah".</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-xl font-bold text-xs transition-all cursor-pointer"
                >
                  Atrás
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="w-2/3 bg-[#252425] hover:bg-[#66C2F1] text-white hover:text-[#252425] py-3.5 rounded-xl font-georama font-bold text-xs transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Continuar a Método de Pago</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD & CONFIRMATION */}
          {currentStep === 3 && (
            <form onSubmit={handleFinalSubmit} className="space-y-6 animate-fadeIn">
              <div>
                <span className="text-[10px] font-bold text-[#66C2F1] uppercase tracking-wider block">Paso 3 de 3</span>
                <h2 className="font-georama text-xl font-extrabold text-[#252425] flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-[#66C2F1]" />
                  <span>Método de Pago & Garantía Liah</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Transacción 100% encriptada y protegida bajo los estándares de seguridad Liah.
                </p>
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                    formData.paymentMethod === 'card'
                      ? 'bg-[#252425] text-[#66C2F1] border-[#252425]'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  Tarjeta de Crédito / Débito
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'spei' })}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                    formData.paymentMethod === 'spei'
                      ? 'bg-[#252425] text-[#66C2F1] border-[#252425]'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  Transferencia SPEI
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'apple' })}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                    formData.paymentMethod === 'apple'
                      ? 'bg-[#252425] text-[#66C2F1] border-[#252425]'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  Apple Pay / Google Pay
                </button>
              </div>

              {/* Payment Inputs */}
              {formData.paymentMethod === 'card' && (
                <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-150 space-y-3 text-xs">
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Número de Tarjeta</label>
                    <input
                      type="text"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full bg-white border border-gray-200 focus:border-[#66C2F1] rounded-xl p-2.5 font-mono text-[#252425] focus:outline-hidden"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-600 font-medium mb-1">Expiración (MM/AA)</label>
                      <input
                        type="text"
                        required
                        value={formData.expDate}
                        onChange={(e) => setFormData({ ...formData, expDate: e.target.value })}
                        className="w-full bg-white border border-gray-200 focus:border-[#66C2F1] rounded-xl p-2.5 font-mono text-[#252425] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 font-medium mb-1">Código de Seguridad (CVV)</label>
                      <input
                        type="text"
                        required
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        className="w-full bg-white border border-gray-200 focus:border-[#66C2F1] rounded-xl p-2.5 font-mono text-[#252425] focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'spei' && (
                <div className="bg-sky-50 p-4 rounded-2xl border border-sky-150 text-xs space-y-2">
                  <span className="font-bold text-[#0F2942] block">SPEI Directo Banorte Liah S.A.P.I.</span>
                  <p className="text-gray-600">
                    Al dar clic en confirmar, recibirás tu CLABE interbancaria personalizada de 18 dígitos con vigencia de 24 horas para garantizar tu reservación.
                  </p>
                </div>
              )}

              {formData.paymentMethod === 'apple' && (
                <div className="bg-sky-50 p-4 rounded-2xl border border-sky-150 text-xs space-y-2 text-center">
                  <span className="font-bold text-[#0F2942] block">Autenticación Biométrica Rápida</span>
                  <p className="text-gray-600">
                    Utiliza FaceID / TouchID para autorizar tu estancia sin ingresar números manualmente.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                <span className="flex items-center space-x-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Encriptación SSL 256-Bit</span>
                </span>
                <span>Procesado por Stripe Liah Security</span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-xl font-bold text-xs transition-all cursor-pointer"
                >
                  Atrás
                </button>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-2/3 bg-[#252425] hover:bg-[#66C2F1] text-white hover:text-[#252425] py-3.5 rounded-xl font-georama font-bold text-xs transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  <span>Confirmar & Pagar $63,300 MXN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

