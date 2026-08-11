import React, { useState } from 'react';
import { Property, FractionalOption, ActiveScreen } from '../types';
import { 
  ShieldCheck, Calendar, Award, ArrowRight, Check, Sparkles, 
  Info, Clock, Percent, Gem, Star, LayoutGrid, Table,
  SlidersHorizontal, Scale, X, ArrowUpDown, ChevronRight, CheckCircle2, Building2
} from 'lucide-react';

interface FractionsListViewProps {
  property: Property;
  setActiveScreen: (screen: ActiveScreen) => void;
  onSelectFraction: (fraction: FractionalOption) => void;
}

export const FractionsListView: React.FC<FractionsListViewProps> = ({
  property,
  setActiveScreen,
  onSelectFraction
}) => {
  const fractions = property.fractions || [];

  // State controls
  const [viewMode, setViewMode] = useState<'matrix' | 'cards'>('matrix');
  const [filterFrequency, setFilterFrequency] = useState<'TODAS' | 'Semanal' | 'Quincenal' | 'Mensual'>('TODAS');
  const [filterTier, setFilterTier] = useState<'TODOS' | 'Diamante' | 'Platino' | 'Oro' | 'Plata'>('TODOS');
  const [maxMonthlyBudget, setMaxMonthlyBudget] = useState<number>(10000);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);

  // Filter logic
  const filteredFractions = fractions.filter(frac => {
    if (filterFrequency !== 'TODAS' && frac.frequency !== filterFrequency) return false;
    if (filterTier !== 'TODOS' && frac.tier !== filterTier) return false;
    const monthlyMXN = frac.monthlyPaymentMXN || (frac.monthlyPaymentUSD * 20);
    if (monthlyMXN > maxMonthlyBudget) return false;
    return true;
  });

  const toggleCompare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter(item => item !== id));
    } else {
      if (selectedForCompare.length < 3) {
        setSelectedForCompare([...selectedForCompare, id]);
      }
    }
  };

  const comparedFractions = fractions.filter(f => selectedForCompare.includes(f.id));

  const getTierBadge = (tier?: string) => {
    switch (tier) {
      case 'Diamante':
        return (
          <div className="flex items-center space-x-1.5 bg-purple-900/90 text-purple-100 border border-purple-400/40 px-3 py-1 rounded-full font-black text-xs shadow-xs">
            <Gem className="w-3.5 h-3.5 text-purple-300" />
            <span>Diamante</span>
          </div>
        );
      case 'Platino':
        return (
          <div className="flex items-center space-x-1.5 bg-sky-900/90 text-sky-100 border border-sky-400/40 px-3 py-1 rounded-full font-black text-xs shadow-xs">
            <Star className="w-3.5 h-3.5 text-sky-300 fill-sky-300" />
            <span>Platino</span>
          </div>
        );
      case 'Oro':
        return (
          <div className="flex items-center space-x-1.5 bg-amber-900/90 text-amber-100 border border-amber-400/40 px-3 py-1 rounded-full font-black text-xs shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block shadow-xs"></span>
            <span>Oro</span>
          </div>
        );
      case 'Plata':
        return (
          <div className="flex items-center space-x-1.5 bg-slate-800 text-slate-100 border border-slate-500/40 px-3 py-1 rounded-full font-black text-xs shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block"></span>
            <span>Plata</span>
          </div>
        );
      default:
        return (
          <span className="bg-gray-800 text-gray-200 px-3 py-1 rounded-full font-bold text-xs">
            Fractional
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-28">
      {/* Top Banner & Property Showcase */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1C1B1C] via-[#252425] to-[#0F2942] text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-[#66C2F1]/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#66C2F1]/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-[#66C2F1]/20 rounded-xl text-[#66C2F1]">
                <Sparkles className="w-5 h-5" />
              </span>
              <span className="text-xs uppercase font-extrabold text-[#66C2F1] tracking-widest">
                Catálogo Oficial de Fracciones Vitalicias Liah
              </span>
            </div>

            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/15 text-xs text-gray-200 font-bold">
              <Building2 className="w-4 h-4 text-[#66C2F1]" />
              <span>{property.title} • 34 Fracciones Vitalicias</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <h1 className="font-georama text-2xl md:text-4xl font-black text-white leading-tight">
                Elige la fracción que más se parece a tus vacaciones.
              </h1>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-2xl">
                Cada fracción representa propiedad vitalicia en fideicomiso notarizado con derecho de uso, goce y rentabilidad programada en {property.title}.
              </p>
            </div>

            {/* Quick Spec Highlights */}
            <div className="lg:col-span-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center space-x-3 text-xs">
                <div className="p-2 bg-[#66C2F1]/20 text-[#66C2F1] rounded-xl">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Entrega Estimada</span>
                  <span className="font-black text-white">Diciembre 2029</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                  <Percent className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Enganche Inicial</span>
                  <span className="font-black text-white">30% de enganche</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <div className="p-2 bg-amber-500/20 text-amber-300 rounded-xl">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Financiamiento</span>
                  <span className="font-black text-white">36 meses sin intereses</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Filters & Mode Switcher Bar */}
          <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Left: View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-black/40 p-1.5 rounded-2xl border border-white/10">
              <button
                onClick={() => setViewMode('matrix')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                  viewMode === 'matrix'
                    ? 'bg-[#66C2F1] text-[#252425] shadow-md font-black'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Table className="w-4 h-4" />
                <span>Matriz Comparativa</span>
              </button>

              <button
                onClick={() => setViewMode('cards')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-[#66C2F1] text-[#252425] shadow-md font-black'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Tarjetas de Lujo</span>
              </button>
            </div>

            {/* Middle: Frequency Filters */}
            <div className="flex items-center flex-wrap gap-1.5 text-xs">
              <span className="text-gray-400 text-[11px] font-bold mr-1 hidden lg:inline">Estancia:</span>
              {(['TODAS', 'Semanal', 'Quincenal', 'Mensual'] as const).map(freq => (
                <button
                  key={freq}
                  onClick={() => setFilterFrequency(freq)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    filterFrequency === freq
                      ? 'bg-white text-[#252425] font-black shadow-xs'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {freq === 'TODAS' ? 'Todas' : freq === 'Semanal' ? '7 Noches' : freq === 'Quincenal' ? '14 Noches' : '30 Noches'}
                </button>
              ))}
            </div>

            {/* Right: Tier Filter dropdown/pills */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-gray-400 text-[11px] font-bold hidden lg:inline">Categoría:</span>
              <select
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value as any)}
                className="bg-black/50 text-white border border-white/20 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer focus:outline-none focus:border-[#66C2F1]"
              >
                <option value="TODOS">Todas las Categorías</option>
                <option value="Diamante">💎 Diamante</option>
                <option value="Platino">⭐ Platino</option>
                <option value="Oro">🟡 Oro</option>
                <option value="Plata">⚪ Plata</option>
              </select>
            </div>
          </div>

          {/* Monthly Budget Slider Filter */}
          <div className="bg-black/30 p-3.5 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2 text-gray-300 font-bold">
              <SlidersHorizontal className="w-4 h-4 text-[#66C2F1]" />
              <span>Filtrar por presupuesto mensual máximo:</span>
            </div>
            
            <div className="flex items-center space-x-3 grow max-w-md">
              <input
                type="range"
                min="3500"
                max="10000"
                step="500"
                value={maxMonthlyBudget}
                onChange={(e) => setMaxMonthlyBudget(Number(e.target.value))}
                className="grow accent-[#66C2F1] cursor-pointer h-2 bg-white/20 rounded-lg"
              />
              <span className="font-mono text-sm font-black text-[#66C2F1] min-w-[110px] text-right">
                hasta ${maxMonthlyBudget.toLocaleString('es-MX')} MXN/mes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MATRIX / TABLE COMPARISON VIEW */}
      {viewMode === 'matrix' ? (
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-md overflow-hidden">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Table className="w-5 h-5 text-[#66C2F1]" />
              <span className="font-georama text-sm font-extrabold text-white">
                Tabla Oficial de Opciones Fractional ({filteredFractions.length} Fracciones)
              </span>
            </div>
            <span className="text-[11px] text-gray-400 font-medium hidden sm:inline">
              Haz clic en cualquier fila para simular o reservar
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100 text-[#252425] font-black uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <th className="p-3.5">Comparar</th>
                  <th className="p-3.5">Categoría / Modalidad</th>
                  <th className="p-3.5">Estancia Anual</th>
                  <th className="p-3.5">Temporada / Ocupación</th>
                  <th className="p-3.5 text-right">Precio Fracción</th>
                  <th className="p-3.5 text-right">Enganche 30%</th>
                  <th className="p-3.5 text-right">36 MSI</th>
                  <th className="p-3.5 text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                {filteredFractions.map((frac) => {
                  const isChecked = selectedForCompare.includes(frac.id);
                  const priceMXN = frac.totalPriceMXN || (frac.totalPriceUSD * 20);
                  const downPaymentMXN = frac.downPaymentMXN || (frac.downPaymentUSD * 20);
                  const monthlyMXN = frac.monthlyPaymentMXN || (frac.monthlyPaymentUSD * 20);

                  return (
                    <tr
                      key={frac.id}
                      onClick={() => {
                        onSelectFraction(frac);
                        setActiveScreen('08_FRACCION_SIMULACION');
                      }}
                      className="hover:bg-sky-50/80 transition-colors cursor-pointer group"
                    >
                      {/* Checkbox for comparison */}
                      <td className="p-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => toggleCompare(frac.id, e as any)}
                          className="w-4 h-4 rounded text-[#66C2F1] focus:ring-[#66C2F1] cursor-pointer"
                        />
                      </td>

                      {/* Tier & Name */}
                      <td className="p-3.5 font-bold text-[#252425]">
                        <div className="flex items-center space-x-2">
                          {getTierBadge(frac.tier)}
                          <span className="font-extrabold group-hover:text-[#66C2F1] transition-colors">
                            {frac.fractionCode}
                          </span>
                        </div>
                      </td>

                      {/* Stay Nights */}
                      <td className="p-3.5 font-medium text-gray-700">
                        <span className="bg-sky-100/70 text-sky-900 border border-sky-200 font-extrabold px-2.5 py-1 rounded-lg">
                          {frac.nightsPerYear || (frac.weeksPerYear * 7)} noches/año
                        </span>
                      </td>

                      {/* Season & Occupancy */}
                      <td className="p-3.5 text-gray-700">
                        <div className="space-y-0.5">
                          <span className="font-bold block text-gray-800">
                            {frac.season === 'Top Demanda' ? '🔥 Top Demanda' : frac.season}
                          </span>
                          {frac.estimatedOccupancy && (
                            <span className="text-[10px] text-gray-500 block font-medium">
                              Ocupación est.: {frac.estimatedOccupancy}
                            </span>
                          )}
                          {frac.specificMonthsNote && (
                            <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 block font-bold">
                              {frac.specificMonthsNote}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Total Price */}
                      <td className="p-3.5 text-right font-georama font-black text-[#252425] text-sm">
                        ${priceMXN.toLocaleString('es-MX')} <span className="text-[10px] font-normal text-gray-500">MXN</span>
                      </td>

                      {/* Down Payment */}
                      <td className="p-3.5 text-right font-georama font-extrabold text-emerald-600 text-xs">
                        ${downPaymentMXN.toLocaleString('es-MX')} <span className="text-[10px] font-normal text-gray-500">MXN</span>
                      </td>

                      {/* Monthly Payment */}
                      <td className="p-3.5 text-right font-georama font-black text-[#66C2F1] text-sm bg-sky-50/50">
                        ${monthlyMXN.toLocaleString('es-MX')} <span className="text-[10px] font-normal text-gray-500">/mes</span>
                      </td>

                      {/* CTA Button */}
                      <td className="p-3.5 text-center">
                        <button className="bg-[#252425] text-white group-hover:bg-[#66C2F1] group-hover:text-[#252425] px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all flex items-center space-x-1 mx-auto shadow-xs">
                          <span>Elegir</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* CARDS GRID VIEW */
        <div className="space-y-4">
          {filteredFractions.map((frac) => {
            const isChecked = selectedForCompare.includes(frac.id);
            const priceMXN = frac.totalPriceMXN || (frac.totalPriceUSD * 20);
            const downPaymentMXN = frac.downPaymentMXN || (frac.downPaymentUSD * 20);
            const monthlyMXN = frac.monthlyPaymentMXN || (frac.monthlyPaymentUSD * 20);

            return (
              <div
                key={frac.id}
                onClick={() => {
                  onSelectFraction(frac);
                  setActiveScreen('08_FRACCION_SIMULACION');
                }}
                className="bg-white rounded-3xl p-6 border-2 border-slate-150 hover:border-[#66C2F1] shadow-xs hover:shadow-xl transition-all cursor-pointer space-y-4 group relative overflow-hidden"
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => toggleCompare(frac.id, e as any)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 rounded text-[#66C2F1] focus:ring-[#66C2F1] cursor-pointer"
                    />
                    {getTierBadge(frac.tier)}
                    <h3 className="font-georama text-lg md:text-xl font-extrabold text-[#252425] group-hover:text-[#66C2F1] transition-colors">
                      {frac.fractionCode}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2 text-xs">
                    <span className="bg-sky-50 text-sky-900 border border-sky-200 px-3 py-1 rounded-full font-bold">
                      {frac.nightsPerYear || (frac.weeksPerYear * 7)} noches al año
                    </span>
                    {frac.availableCount && (
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-3 py-1 rounded-full">
                        {frac.availableCount} {frac.availableCount === 1 ? 'disponible' : 'disponibles'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Middle Info & Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-5 space-y-2">
                    <div className="flex items-center space-x-2 text-xs text-gray-700">
                      <ShieldCheck className="w-4 h-4 text-[#66C2F1] shrink-0" />
                      <span className="font-semibold">
                        {frac.season === 'Top Demanda' ? 'Top en demanda turística' : `Temporada ${frac.season}`}
                      </span>
                    </div>

                    {frac.estimatedOccupancy && (
                      <p className="text-xs text-gray-500 font-medium">
                        Ocupación estimada: <strong className="text-gray-800">{frac.estimatedOccupancy}</strong>
                      </p>
                    )}

                    {frac.specificMonthsNote && (
                      <div className="bg-amber-50 text-amber-900 text-xs px-3 py-1.5 rounded-xl border border-amber-200 font-medium inline-block">
                        📌 {frac.specificMonthsNote}
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-7 bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-bold">Precio total</span>
                      <span className="font-georama text-lg font-black text-[#252425]">
                        ${priceMXN.toLocaleString('es-MX')} MXN
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase font-bold">Enganche 30%</span>
                      <span className="font-georama text-base font-extrabold text-emerald-600">
                        ${downPaymentMXN.toLocaleString('es-MX')} MXN
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase font-bold">36 Mensualidades</span>
                      <span className="font-georama text-base font-extrabold text-[#66C2F1]">
                        ${monthlyMXN.toLocaleString('es-MX')} MXN
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-gray-400 font-bold">
                    Escrituración en fideicomiso notarizado
                  </span>
                  <button className="bg-[#252425] text-white group-hover:bg-[#66C2F1] group-hover:text-[#252425] px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shadow-xs">
                    <span>Seleccionar esta Fracción</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FLOATING COMPARISON DOCK */}
      {selectedForCompare.length > 0 && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40 bg-[#252425] text-white border-2 border-[#66C2F1] p-4 rounded-2xl shadow-2xl flex items-center space-x-4 max-w-lg w-full">
          <div className="flex items-center space-x-2 grow">
            <Scale className="w-5 h-5 text-[#66C2F1] shrink-0 animate-pulse" />
            <div>
              <span className="text-xs font-bold block text-white">
                {selectedForCompare.length} {selectedForCompare.length === 1 ? 'Fracción seleccionada' : 'Fracciones seleccionadas'}
              </span>
              <span className="text-[10px] text-gray-300">Compara precios, estancias y enganches side-by-side</span>
            </div>
          </div>

          <button
            onClick={() => setShowCompareModal(true)}
            className="bg-[#66C2F1] text-[#252425] px-4 py-2 rounded-xl text-xs font-black hover:bg-white transition-all shadow-md cursor-pointer"
          >
            Ver Comparativa
          </button>

          <button
            onClick={() => setSelectedForCompare([])}
            className="text-gray-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* COMPARISON MODAL */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-sky-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center space-x-2">
                <Scale className="w-6 h-6 text-[#66C2F1]" />
                <div>
                  <h2 className="font-georama text-xl font-black text-[#252425]">
                    Comparativa Side-by-Side de Fracciones
                  </h2>
                  <p className="text-xs text-gray-500">
                    Evalúa la opción que mejor se adapta a tus metas de vacacionar e inversión.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowCompareModal(false)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparison Columns Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-${comparedFractions.length} gap-4`}>
              {comparedFractions.map((frac) => {
                const priceMXN = frac.totalPriceMXN || (frac.totalPriceUSD * 20);
                const downPaymentMXN = frac.downPaymentMXN || (frac.downPaymentUSD * 20);
                const monthlyMXN = frac.monthlyPaymentMXN || (frac.monthlyPaymentUSD * 20);

                return (
                  <div
                    key={frac.id}
                    className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        {getTierBadge(frac.tier)}
                        <span className="text-[10px] font-bold text-gray-400 uppercase">
                          {frac.frequency}
                        </span>
                      </div>

                      <h3 className="font-georama text-lg font-black text-[#252425]">
                        {frac.fractionCode}
                      </h3>

                      <div className="space-y-2 text-xs border-t border-slate-200 pt-3">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Noches al año:</span>
                          <span className="font-bold text-[#0F2942]">{frac.nightsPerYear || (frac.weeksPerYear * 7)} noches</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-500">Temporada:</span>
                          <span className="font-bold text-gray-800">{frac.season}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-500">Ocupación estimada:</span>
                          <span className="font-bold text-gray-800">{frac.estimatedOccupancy || '50%'}</span>
                        </div>

                        <div className="flex justify-between pt-2 border-t border-slate-200">
                          <span className="text-gray-500">Precio Total:</span>
                          <span className="font-black text-[#252425]">${priceMXN.toLocaleString('es-MX')} MXN</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-500">Enganche (30%):</span>
                          <span className="font-black text-emerald-600">${downPaymentMXN.toLocaleString('es-MX')} MXN</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-500">36 Mensualidades:</span>
                          <span className="font-black text-[#66C2F1]">${monthlyMXN.toLocaleString('es-MX')} MXN</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onSelectFraction(frac);
                        setShowCompareModal(false);
                        setActiveScreen('08_FRACCION_SIMULACION');
                      }}
                      className="w-full bg-[#252425] hover:bg-[#66C2F1] text-white hover:text-[#252425] py-3 rounded-xl font-bold text-xs transition-all shadow-xs flex items-center justify-center space-x-2"
                    >
                      <span>Seleccionar esta Fracción</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Explanatory Legend Footer Box */}
      <div className="bg-sky-50/80 border border-sky-200 rounded-3xl p-6 space-y-3">
        <div className="flex items-center space-x-2 text-sky-900 font-bold text-xs">
          <Info className="w-5 h-5 text-[#0F2942]" />
          <span>Información de Temporadas y Ocupación Estimada</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-700">
          <div className="p-3 bg-white rounded-xl border border-amber-200">
            <strong className="text-amber-800">Oro:</strong> temporada media alta con ocupación estimada del 55%.
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-200">
            <strong className="text-sky-800">Platino:</strong> temporada alta con ocupación estimada del 65%.
          </div>
          <div className="p-3 bg-white rounded-xl border border-purple-200">
            <strong className="text-purple-800">Diamante:</strong> semanas top en demanda turística con ocupación estimada del 85%.
          </div>
        </div>
      </div>

      {/* Inspiration Quote */}
      <div className="text-center py-4 space-y-1">
        <p className="font-georama text-xl font-extrabold text-[#252425]">
          No todas las vacaciones se viven igual.
        </p>
        <p className="text-sm font-medium text-gray-500">
          Por eso Casa Ananta ofrece 34 maneras de hacerla tuya.
        </p>
      </div>
    </div>
  );
};
