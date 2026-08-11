import React, { useState } from 'react';
import { Property, ActiveScreen } from '../types';
import { Star, MapPin, Users, BedDouble, Bath, Maximize2, ShieldCheck, Sparkles, Calendar, ChevronRight, ChevronLeft, CheckCircle2, ArrowRight, Heart, Share2, Award, Building2, Palmtree } from 'lucide-react';

interface PropertyDetailViewProps {
  property: Property;
  initialContext?: 'hospedaje' | 'patrimonial';
  setActiveScreen: (screen: ActiveScreen) => void;
  onSelectFraction?: (fractionId: string) => void;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({
  property,
  initialContext = 'hospedaje',
  setActiveScreen,
  onSelectFraction
}) => {
  const [activeContext, setActiveContext] = useState<'hospedaje' | 'patrimonial'>(initialContext);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [dates, setDates] = useState({ checkIn: '2026-08-20', checkOut: '2026-08-24' });
  const [guests, setGuests] = useState<number>(4);

  const isHospitality = activeContext === 'hospedaje';

  return (
    <div className="space-y-8 pb-28 max-w-6xl mx-auto">
      {/* STRATEGIC MODE SELECTOR BANNER */}
      <div className="bg-[#161516] text-white p-5 sm:p-6 rounded-3xl space-y-4 border-2 border-[#66C2F1]/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#66C2F1]/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10 border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <span className="bg-[#66C2F1] text-[#252425] font-black px-3 py-1 rounded-full text-[11px] uppercase tracking-wider">
              EXPERIENCIA LIAH
            </span>
            <span className="text-gray-200 font-bold text-xs sm:text-sm">
              Selecciona el modo en que deseas vivir esta experiencia:
            </span>
          </div>

          <span className="text-[11px] text-[#66C2F1] font-bold hidden md:inline">
            Dos modelos exclusivos • Un mismo nivel de lujo
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
          <button
            onClick={() => setActiveContext('hospedaje')}
            className={`p-4 rounded-2xl transition-all cursor-pointer text-left flex items-start space-x-3 border ${
              isHospitality
                ? 'bg-[#66C2F1] text-[#252425] border-[#66C2F1] shadow-lg font-black scale-[1.01]'
                : 'bg-white/5 text-gray-200 border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <div className={`p-2.5 rounded-xl shrink-0 ${isHospitality ? 'bg-[#252425] text-[#66C2F1]' : 'bg-white/10 text-white'}`}>
              <Palmtree className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-xs font-black uppercase tracking-wider block">
                1. Rentar por Noche (Hospedaje)
              </span>
              <p className={`text-[11px] ${isHospitality ? 'text-[#252425]/90 font-medium' : 'text-gray-300'}`}>
                Reserva estancias vacacionales exclusivas con atención Concierge de 5 estrellas.
              </p>
              <span className={`text-xs font-black block pt-1 ${isHospitality ? 'text-[#252425]' : 'text-[#66C2F1]'}`}>
                ${property.nightlyPriceMXN.toLocaleString('es-MX')} MXN / noche
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveContext('patrimonial')}
            className={`p-4 rounded-2xl transition-all cursor-pointer text-left flex items-start space-x-3 border ${
              !isHospitality
                ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg font-black scale-[1.01]'
                : 'bg-white/5 text-gray-200 border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <div className={`p-2.5 rounded-xl shrink-0 ${!isHospitality ? 'bg-white text-emerald-800' : 'bg-emerald-500/20 text-emerald-400'}`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-xs font-black uppercase tracking-wider block">
                2. Adquisición Fractional (Patrimonial)
              </span>
              <p className={`text-[11px] ${!isHospitality ? 'text-emerald-50 font-medium' : 'text-gray-300'}`}>
                Propiedad vitalicia escriturada en fideicomiso con semanas garantizadas al año.
              </p>
              <span className={`text-xs font-black block pt-1 ${!isHospitality ? 'text-white' : 'text-emerald-400'}`}>
                Fracciones desde ${property.fractionalStartPriceUSD?.toLocaleString('en-US')} USD
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Property Title Header */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="bg-sky-100 text-[#0F2942] px-3 py-1 rounded-full text-xs font-bold border border-sky-200">
              Experiencia: {property.propertyExperience}
            </span>
            {property.isLiahOriginal && (
              <span className="bg-[#252425] text-[#66C2F1] px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>Liah Original</span>
              </span>
            )}
          </div>

          <div className="flex items-center space-x-3 text-xs font-semibold text-gray-600">
            <button className="flex items-center space-x-1 hover:text-[#252425]"><Share2 className="w-4 h-4" /> <span>Compartir</span></button>
            <button className="flex items-center space-x-1 hover:text-red-500"><Heart className="w-4 h-4" /> <span>Guardar</span></button>
          </div>
        </div>

        <h1 className="font-georama text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252425] leading-tight">
          {property.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
          <span className="flex items-center space-x-1 font-bold text-gray-800">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>{property.rating} ({property.reviewsCount} reseñas Liah)</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1 text-[#252425] font-medium">
            <MapPin className="w-4 h-4 text-[#66C2F1]" />
            <span>{property.locationDetails}</span>
          </span>
        </div>
      </div>

      {/* Hero Image Gallery Carousel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-3xl overflow-hidden border border-slate-200 shadow-md">
        <div className="md:col-span-2 h-72 sm:h-96 md:h-[420px] overflow-hidden relative group">
          <img
            src={property.galleryImages[selectedImageIndex] || property.heroImage}
            alt={property.title}
            className="w-full h-full object-cover transition-all duration-300"
          />

          {/* Left Arrow */}
          <button
            onClick={() => setSelectedImageIndex((prev) => (prev - 1 + property.galleryImages.length) % property.galleryImages.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#66C2F1] text-white hover:text-[#252425] p-2 rounded-full backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-md"
            title="Foto anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => setSelectedImageIndex((prev) => (prev + 1) % property.galleryImages.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#66C2F1] text-white hover:text-[#252425] p-2 rounded-full backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-md"
            title="Siguiente foto"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Photo Counter Badge */}
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full border border-white/20">
            Foto {selectedImageIndex + 1} de {property.galleryImages.length}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-1 gap-3 h-auto md:h-[420px]">
          {property.galleryImages.slice(0, 3).map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              className={`relative h-28 md:h-[132px] overflow-hidden rounded-xl cursor-pointer border-2 transition-all ${
                selectedImageIndex === idx ? 'border-[#66C2F1] scale-98 ring-2 ring-[#66C2F1]/30' : 'border-transparent opacity-85 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Core Specs Bar */}
      <div className="bg-white rounded-2xl p-4 border border-sky-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-x divide-gray-100 text-xs">
        <div>
          <Users className="w-5 h-5 text-[#66C2F1] mx-auto mb-1" />
          <span className="font-bold text-[#252425] block">{property.capacityGuests} Huéspedes</span>
          <span className="text-gray-400 text-[10px]">Capacidad total</span>
        </div>
        <div>
          <BedDouble className="w-5 h-5 text-[#66C2F1] mx-auto mb-1" />
          <span className="font-bold text-[#252425] block">{property.bedrooms} Recámaras</span>
          <span className="text-gray-400 text-[10px]">Suites de lujo</span>
        </div>
        <div>
          <Bath className="w-5 h-5 text-[#66C2F1] mx-auto mb-1" />
          <span className="font-bold text-[#252425] block">{property.bathrooms} Baños</span>
          <span className="text-gray-400 text-[10px]">Piedra y mármol</span>
        </div>
        <div>
          <Maximize2 className="w-5 h-5 text-[#66C2F1] mx-auto mb-1" />
          <span className="font-bold text-[#252425] block">{property.areaSqM} m²</span>
          <span className="text-gray-400 text-[10px]">Construcción</span>
        </div>
      </div>

      {/* Main Grid Content & Dynamic CTA Side Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Experience & Architectural Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Subtitle & Description */}
          <div className="space-y-3 bg-white p-6 rounded-2xl border border-sky-100">
            <h2 className="font-georama text-xl font-bold text-[#252425]">
              Arquitectura & Concepto
            </h2>
            <p className="text-sm font-medium text-[#252425] leading-relaxed">
              {property.subtitle}
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Architectural Highlights */}
          <div className="space-y-3 bg-gradient-to-br from-[#E0F2FE]/40 via-white to-white p-6 rounded-2xl border border-sky-150">
            <h3 className="font-georama text-lg font-bold text-[#252425] flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-[#66C2F1]" />
              <span>Detalles Arquitectónicos de Autor</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
              {property.architectureHighlights.map((item, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dynamic Hierarchy Showcase (Rule B) */}
          {!isHospitality && property.hasFractionalOption && (
            <div className="bg-[#252425] text-white p-6 rounded-2xl space-y-4 border border-[#66C2F1]/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-6 h-6 text-[#66C2F1]" />
                  <h3 className="font-georama text-xl font-bold text-[#66C2F1]">
                    Modelo Adquisición Fractional Liah
                  </h3>
                </div>
                <span className="bg-white/10 text-xs px-3 py-1 rounded-full font-mono">
                  Fracción Vitalicia
                </span>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                Adquiera la propiedad escriturada en fideicomiso bancario de esta experiencia con pleno respaldo legal. Disfrute de semanas exclusivas al año sin preocuparse por mantenimiento, personal ni conservación: Liah opera el 100% de la propiedad.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-white/10 p-3 rounded-xl">
                  <span className="text-gray-400 block text-[10px]">Inversión desde</span>
                  <span className="font-georama text-base font-bold text-white">
                    ${property.fractionalStartPriceUSD?.toLocaleString('en-US')} USD
                  </span>
                </div>
                <div className="bg-white/10 p-3 rounded-xl">
                  <span className="text-gray-400 block text-[10px]">Enganche habitual</span>
                  <span className="font-georama text-base font-bold text-[#66C2F1]">
                    30% enganche
                  </span>
                </div>
                <div className="bg-white/10 p-3 rounded-xl">
                  <span className="text-gray-400 block text-[10px]">Financiamiento</span>
                  <span className="font-georama text-base font-bold text-white">
                    36 meses sin intereses
                  </span>
                </div>
              </div>

              {property.fractions?.[0]?.certification && (
                <div className="bg-sky-900/50 border border-[#66C2F1]/30 p-3 rounded-xl flex items-center space-x-3 text-xs">
                  <Award className="w-5 h-5 text-[#66C2F1] shrink-0" />
                  <div>
                    <span className="font-bold text-[#66C2F1] block">
                      {property.fractions[0].certification?.type === 'Freedom' ? 'Certificación Liah Freedom' : 'Certificación Liah Experience'}
                    </span>
                    <span className="text-gray-300 text-[11px]">
                      {property.fractions[0].certification?.description}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Amenities */}
          <div className="space-y-3 bg-white p-6 rounded-2xl border border-sky-100">
            <h3 className="font-georama text-lg font-bold text-[#252425]">
              Amenidades Integradas
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-gray-700">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center space-x-2 bg-sky-50/60 p-2.5 rounded-xl border border-sky-100">
                  <Sparkles className="w-3.5 h-3.5 text-[#66C2F1]" />
                  <span className="font-semibold text-[#252425]">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Action Form (Hospitality or Fractional) */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-xl space-y-6 sticky top-20">
            <div className="space-y-1 pb-4 border-b border-gray-100">
              <span className="text-[10px] font-extrabold uppercase text-[#66C2F1] tracking-wider block">
                {isHospitality ? 'Renta por Noche' : 'Adquisición Fractional'}
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="font-georama text-2xl font-black text-[#252425]">
                  {isHospitality ? (
                    <>${property.nightlyPriceMXN.toLocaleString('es-MX')} <span className="text-xs font-normal text-gray-500">MXN/noche</span></>
                  ) : (
                    <>${property.fractionalStartPriceUSD?.toLocaleString('en-US')} <span className="text-xs font-normal text-gray-500">USD</span></>
                  )}
                </span>
              </div>
            </div>

            {isHospitality ? (
              /* HOSPITALITY BOOKING FORM */
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block uppercase">Llegada</label>
                    <input
                      type="date"
                      value={dates.checkIn}
                      onChange={(e) => setDates({ ...dates, checkIn: e.target.value })}
                      className="w-full bg-transparent font-bold text-gray-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block uppercase">Salida</label>
                    <input
                      type="date"
                      value={dates.checkOut}
                      onChange={(e) => setDates({ ...dates, checkOut: e.target.value })}
                      className="w-full bg-transparent font-bold text-gray-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                  <label className="text-[10px] font-bold text-gray-400 block uppercase mb-1">Huéspedes</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-transparent font-bold text-gray-800 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>{n} Huéspedes (máx. {property.capacityGuests})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-100 text-gray-600">
                  <div className="flex justify-between">
                    <span>${property.nightlyPriceMXN.toLocaleString('es-MX')} MXN x 4 noches</span>
                    <span className="font-bold text-[#252425]">${(property.nightlyPriceMXN * 4).toLocaleString('es-MX')} MXN</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Servicio Concierge & Limpieza Liah</span>
                    <span className="font-bold text-emerald-600">Incluido</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-100 font-bold text-sm text-[#252425]">
                    <span>Total Estimado:</span>
                    <span>${(property.nightlyPriceMXN * 4).toLocaleString('es-MX')} MXN</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveScreen('04_CHECKOUT')}
                  className="w-full bg-[#252425] hover:bg-[#66C2F1] text-white hover:text-[#252425] py-4 rounded-xl font-georama font-extrabold text-sm transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#66C2F1]" />
                  <span>Reservar esta Estancia</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* FRACTIONAL PATRIMONIAL FORM */
              <div className="space-y-4 text-xs">
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-emerald-900 space-y-1">
                  <span className="font-bold text-xs block">Opciones de Fracciones Vitalicias</span>
                  <p className="text-[11px] leading-relaxed">
                    Acceda a la propiedad en esquema de 7, 14 o 30 noches anuales garantizadas.
                  </p>
                </div>

                {property.hasFractionalOption ? (
                  <button
                    onClick={() => setActiveScreen('07_FRACCIONES_DISPONIBLES')}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-georama font-extrabold text-sm transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-5 h-5 text-emerald-200" />
                    <span>Ver Fracciones Vitalicias</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="bg-gray-100 p-3 rounded-xl text-center text-gray-600 text-xs font-semibold">
                    Fracciones agotadas temporalmente en esta experiencia.
                  </div>
                )}

                {/* Switch to Hospitality Suggestion */}
                <div className="pt-2 border-t border-gray-100 text-center space-y-1">
                  <div className="flex items-center justify-center space-x-1 text-gray-500">
                    <Sparkles className="w-3.5 h-3.5 text-[#66C2F1]" />
                    <span>¿Te apasiona esta experiencia?</span>
                  </div>
                  <p className="text-[11px] text-gray-600">
                    Hazla tuya mediante adquisición fractional desde ${property.fractionalStartPriceUSD?.toLocaleString('en-US')} USD.
                  </p>
                </div>

                <div className="bg-sky-50 p-3 rounded-xl border border-sky-150 space-y-2">
                  <span className="text-[10px] font-bold text-[#66C2F1] uppercase block">Resumen Comercial</span>
                  <div className="flex justify-between">
                    <span>Valor por Fracción:</span>
                    <span className="font-extrabold text-[#252425]">${property.fractionalStartPriceUSD?.toLocaleString('en-US')} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Esquema:</span>
                    <span className="font-bold text-emerald-600">30% Enganche / 36 MSI</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
