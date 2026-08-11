import React, { useState } from 'react';
import { FractionalOption, Property, ActiveScreen } from '../types';
import { 
  ShieldCheck, Calculator, Award, Calendar as CalendarIcon, CheckCircle2, 
  ArrowRight, Clock, ChevronLeft, ChevronRight, Check, Sparkles
} from 'lucide-react';

interface FractionDetailViewProps {
  property: Property;
  fraction: FractionalOption;
  setActiveScreen: (screen: ActiveScreen) => void;
  onInitiateAcquisition: (fraction: FractionalOption) => void;
}

export const FractionDetailView: React.FC<FractionDetailViewProps> = ({
  property,
  fraction,
  setActiveScreen,
  onInitiateAcquisition
}) => {
  // Interactive Financial Simulator State (Defaults to 30% down, 36 months from official chart)
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(fraction.downPaymentPercent || 30);
  const [termMonths, setTermMonths] = useState<number>(fraction.termMonths || 36);

  // Fractional Calendar State
  const [stayPeriodType, setStayPeriodType] = useState<'SEMANA' | 'QUINCENA' | 'MES'>(
    fraction.frequency === 'Quincenal' ? 'QUINCENA' : fraction.frequency === 'Mensual' ? 'MES' : 'SEMANA'
  );
  const [selectedCalendarSlot, setSelectedCalendarSlot] = useState<string>('slot-1');

  // Live Financial Calculations in MXN & USD
  const basePriceMXN = fraction.totalPriceMXN || (fraction.totalPriceUSD * 20);
  const basePriceUSD = fraction.totalPriceUSD;

  const downPaymentMXN = (basePriceMXN * downPaymentPercent) / 100;
  const downPaymentUSD = (basePriceUSD * downPaymentPercent) / 100;

  const financedMXN = basePriceMXN - downPaymentMXN;
  const financedUSD = basePriceUSD - downPaymentUSD;

  // Monthly payments (36 months interest free or standard rate)
  const calculatedMonthlyMXN = termMonths === 36 && fraction.monthlyPaymentMXN && downPaymentPercent === 30
    ? fraction.monthlyPaymentMXN
    : Math.round(financedMXN / termMonths);

  const calculatedMonthlyUSD = Math.round(financedUSD / termMonths);

  // Calendar Slots Dataset based on stayPeriodType
  const calendarSlots = stayPeriodType === 'SEMANA' ? [
    { id: 'slot-1', title: 'Semana 12 (Primavera)', dates: '22 Mar - 29 Mar 2027', season: 'Alta / Semana Santa', status: 'Disponible' },
    { id: 'slot-2', title: 'Semana 26 (Verano)', dates: '28 Jun - 05 Jul 2027', season: 'Alta / Verano', status: 'Disponible' },
    { id: 'slot-3', title: 'Semana 40 (Otoño)', dates: '04 Oct - 11 Oct 2027', season: 'Media', status: 'Disponible' },
    { id: 'slot-4', title: 'Semana 51 (Fin de Año)', dates: '20 Dic - 27 Dic 2027', season: 'Prime / Navidad', status: 'Reservada' },
  ] : stayPeriodType === 'QUINCENA' ? [
    { id: 'slot-q1', title: 'Quincena 1 (Marzo)', dates: '01 Mar - 15 Mar 2027', season: 'Alta / Primavera', status: 'Disponible' },
    { id: 'slot-q2', title: 'Quincena 2 (Julio)', dates: '16 Jul - 31 Jul 2027', season: 'Alta / Verano', status: 'Disponible' },
    { id: 'slot-q3', title: 'Quincena 3 (Noviembre)', dates: '01 Nov - 15 Nov 2027', season: 'Media / Tradiciones', status: 'Disponible' },
  ] : [
    { id: 'slot-m1', title: 'Mes Completo (Enero)', dates: '01 Ene - 31 Ene 2027', season: 'Experiencia Temporada de Invierno', status: 'Disponible' },
    { id: 'slot-m2', title: 'Mes Completo (Agosto)', dates: '01 Ago - 31 Ago 2027', season: 'Experiencia Verano Familiar', status: 'Disponible' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-24">
      {/* Header */}
      <div className="bg-[#252425] text-white rounded-3xl p-6 md:p-8 space-y-4 border border-[#66C2F1]/30 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="bg-[#66C2F1] text-[#252425] font-extrabold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">
              Adquisición Fractional Liah
            </span>
            <span className="bg-white/10 text-white font-mono text-xs px-2.5 py-1 rounded-md">
              {fraction.fractionCode}
            </span>
          </div>

          <span className="text-xs text-[#66C2F1] font-bold">
            Entorno: {property.propertyExperience}
          </span>
        </div>

        <h1 className="font-georama text-2xl md:text-3xl font-extrabold text-white">
          {property.title}
        </h1>

        <p className="text-xs text-gray-300">
          Tipología: <strong>{fraction.typology}</strong> • {fraction.weeksPerYear} Semanas de uso exclusivo al año con administración operativa 100% Liah.
        </p>

        {fraction.certification && (
          <div className="bg-[#0F2942] border border-[#66C2F1]/40 p-3.5 rounded-2xl flex items-center space-x-3 text-xs">
            <Award className="w-5 h-5 text-[#66C2F1] shrink-0" />
            <div>
              <span className="font-bold text-[#66C2F1] block">
                Certificación Liah {fraction.certification.type}
              </span>
              <span className="text-gray-300 text-[11px]">
                {fraction.certification.description}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* FRACTIONAL SPECIFIC CALENDAR SELECTOR (SEMANA, QUINCENA, MES) */}
      <div className="bg-white rounded-3xl border border-sky-150 p-6 md:p-8 space-y-6 shadow-md">
        <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-sky-50 text-[#66C2F1] rounded-2xl border border-sky-200">
              <CalendarIcon className="w-6 h-6 text-[#0F2942]" />
            </div>
            <div>
              <h2 className="font-georama text-xl font-black text-[#252425]">
                Calendario de Semanas y Periodos Fractional
              </h2>
              <p className="text-xs text-gray-500">
                Selecciona la modalidad de estancia para programar tus días garantizados al año.
              </p>
            </div>
          </div>

          {/* Period Type Switcher */}
          <div className="bg-gray-100 p-1 rounded-2xl flex items-center space-x-1 border border-gray-200 shrink-0">
            <button
              onClick={() => setStayPeriodType('SEMANA')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                stayPeriodType === 'SEMANA'
                  ? 'bg-[#252425] text-[#66C2F1] shadow-xs'
                  : 'text-gray-600 hover:text-[#252425]'
              }`}
            >
              Semana (7 Días)
            </button>

            <button
              onClick={() => setStayPeriodType('QUINCENA')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                stayPeriodType === 'QUINCENA'
                  ? 'bg-[#252425] text-[#66C2F1] shadow-xs'
                  : 'text-gray-600 hover:text-[#252425]'
              }`}
            >
              Quincena (15 Días)
            </button>

            <button
              onClick={() => setStayPeriodType('MES')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                stayPeriodType === 'MES'
                  ? 'bg-[#252425] text-[#66C2F1] shadow-xs'
                  : 'text-gray-600 hover:text-[#252425]'
              }`}
            >
              Mes Completo
            </button>
          </div>
        </div>

        {/* CALENDAR SLOTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {calendarSlots.map((slot) => {
            const isSelected = selectedCalendarSlot === slot.id;
            const isAvailable = slot.status === 'Disponible';

            return (
              <div
                key={slot.id}
                onClick={() => isAvailable && setSelectedCalendarSlot(slot.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-sky-50 border-[#66C2F1] ring-2 ring-[#66C2F1]/40 shadow-sm'
                    : isAvailable
                    ? 'bg-white border-gray-200 hover:border-sky-300'
                    : 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-[#252425]">
                    {slot.title}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                      isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {slot.status}
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="font-bold text-[#0F2942] flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-[#66C2F1]" />
                    <span>{slot.dates}</span>
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">
                    Temporada: <span className="font-bold text-gray-700">{slot.season}</span>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">
                    Intercambio Liah Flex
                  </span>
                  {isSelected ? (
                    <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
                      <Check className="w-4 h-4" />
                      <span>Seleccionado</span>
                    </span>
                  ) : isAvailable ? (
                    <span className="text-xs font-bold text-[#66C2F1] underline">Elegir Periodo</span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Simulator: Financial Calculations */}
      <div className="bg-white rounded-3xl border border-sky-150 p-6 md:p-8 space-y-6 shadow-md">
        <div className="border-b border-gray-100 pb-4 flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-2xl">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-georama text-xl font-bold text-[#252425]">
              Simulador de Financiamiento Fractional
            </h2>
            <p className="text-xs text-gray-500">
              Personaliza el enganche y el plazo sin comisiones ocultas ni presiones comerciales.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sliders Control */}
          <div className="space-y-6">
            {/* Down Payment % Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#252425]">
                <span>Porcentaje de Enganche ({downPaymentPercent}%)</span>
                <span className="text-emerald-600 font-extrabold">${downPaymentMXN.toLocaleString('es-MX')} MXN</span>
              </div>
              <input
                type="range"
                min="15"
                max="50"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-[#66C2F1] cursor-pointer h-2 bg-gray-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                <span>15%</span>
                <span>20%</span>
                <span>30%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Term Months Selector */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#252425] block">Plazo de Financiamiento Directo</span>
              <div className="grid grid-cols-4 gap-2 text-xs">
                {[24, 36, 60, 120].map((months) => (
                  <button
                    key={months}
                    onClick={() => setTermMonths(months)}
                    className={`py-2 rounded-xl font-bold transition-all border cursor-pointer ${
                      termMonths === months
                        ? 'bg-[#252425] text-[#66C2F1] border-[#252425] shadow-xs'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {months} mes
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-sky-50 p-4 rounded-2xl border border-sky-150 space-y-2 text-xs text-gray-700">
              <span className="font-extrabold text-[#252425] block">Garantías de la Adquisición Fractional Liah:</span>
              <ul className="space-y-1 text-[11px] list-disc list-inside text-gray-600">
                <li>Escrituración directa ante notario público en fideicomiso bancario.</li>
                <li>Liah administra mantenimientos de forma automatizada.</li>
                <li>Derecho de reventa o transferencia en la plataforma Liah.</li>
              </ul>
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-gradient-to-br from-[#E0F2FE]/60 via-white to-white p-6 rounded-2xl border border-[#66C2F1]/40 flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center space-x-1 text-[#0F2942]">
                <Sparkles className="w-4 h-4 text-[#66C2F1]" />
                <span className="text-[10px] uppercase font-extrabold tracking-wider">
                  Resultado de la Simulación
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-xs text-gray-500 block">Mensualidad ({termMonths} meses)</span>
                  <span className="font-georama text-3xl font-black text-[#252425] block">
                    ${calculatedMonthlyMXN.toLocaleString('es-MX')} <span className="text-xs font-normal text-gray-500">MXN/mes</span>
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">
                    (~${calculatedMonthlyUSD.toLocaleString('en-US')} USD/mes)
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-200 space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Precio total de la fracción:</span>
                    <span className="font-bold text-[#252425]">${basePriceMXN.toLocaleString('es-MX')} MXN</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pago inicial (Enganche {downPaymentPercent}%):</span>
                    <span className="font-bold text-emerald-600">${downPaymentMXN.toLocaleString('es-MX')} MXN</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monto a financiar:</span>
                    <span className="font-bold text-[#252425]">${financedMXN.toLocaleString('es-MX')} MXN</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onInitiateAcquisition(fraction);
                setActiveScreen('09_MI_ADQUISICION');
              }}
              className="w-full bg-[#252425] hover:bg-[#66C2F1] text-white hover:text-[#252425] py-4 rounded-xl font-georama font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-[#66C2F1]" />
              <span>Apartar esta Fracción (${downPaymentMXN.toLocaleString('es-MX')} MXN)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
