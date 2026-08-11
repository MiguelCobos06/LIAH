import React, { useState } from 'react';
import { ActiveScreen, FractionalOption, Property } from '../types';
import { MOCK_PROPERTIES, DEFAULT_ACQUISITION } from '../data/mockData';
import { UserCheck, ShieldCheck, Award, Heart, Gift, Bell, ArrowRight, FileText, Calendar } from 'lucide-react';

interface MiLiahViewProps {
  setActiveScreen: (screen: ActiveScreen) => void;
}

export const MiLiahView: React.FC<MiLiahViewProps> = ({ setActiveScreen }) => {
  const [activeTab, setActiveTab] = useState<'fracciones' | 'adquisiciones' | 'favoritos' | 'perfil'>('fracciones');

  // Sample acquired user fraction (Adhering strictly to terminology rules from PDF Page 4)
  const sampleFraction: FractionalOption = MOCK_PROPERTIES[0].fractions![0];
  const sampleProperty: Property = MOCK_PROPERTIES[0];

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-[#66C2F1]/30 p-6 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-[#252425] text-[#66C2F1] font-georama font-extrabold text-xl flex items-center justify-center border-2 border-[#66C2F1]">
            MC
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-georama text-xl font-extrabold text-[#252425]">Miguel Cobos</h1>
              <span className="bg-sky-100 text-[#0F2942] font-bold text-[10px] px-2 py-0.5 rounded-md uppercase">
                Socio Propietario
              </span>
            </div>
            <p className="text-xs text-gray-500">miguel.cobos@ticmac.com • Miembro Liah desde 2026</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveScreen('09_MI_ADQUISICION')}
            className="bg-sky-50 text-[#0F2942] hover:bg-sky-100 border border-sky-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
          >
            Ver Adquisición en Proceso
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center space-x-2 border-b border-gray-200 pb-2 overflow-x-auto no-scrollbar text-xs font-bold">
        <button
          onClick={() => setActiveTab('fracciones')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'fracciones'
              ? 'bg-[#252425] text-[#66C2F1]'
              : 'text-gray-600 hover:text-[#252425]'
          }`}
        >
          Mis Fracciones (Patrimonio)
        </button>
        <button
          onClick={() => setActiveTab('adquisiciones')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'adquisiciones'
              ? 'bg-[#252425] text-[#66C2F1]'
              : 'text-gray-600 hover:text-[#252425]'
          }`}
        >
          Trámites & Adquisiciones
        </button>
        <button
          onClick={() => setActiveTab('favoritos')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'favoritos'
              ? 'bg-[#252425] text-[#66C2F1]'
              : 'text-gray-600 hover:text-[#252425]'
          }`}
        >
          Favoritos & Colecciones
        </button>
      </div>

      {/* Tab 1: Mis Fracciones (Strict adherence to Page 4 requirements) */}
      {activeTab === 'fracciones' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-georama text-lg font-bold text-[#252425]">
              Mis Fracciones Patrimoniales
            </h2>
            <span className="text-xs text-gray-500">1 Fracción Activa Escrita en Fideicomiso</span>
          </div>

          <div className="bg-white rounded-2xl border-2 border-[#66C2F1]/30 overflow-hidden shadow-xs space-y-4 p-5">
            <div className="flex flex-col md:flex-row gap-5">
              <img
                src={sampleProperty.heroImage}
                alt=""
                className="w-full md:w-52 h-40 object-cover rounded-xl shrink-0"
              />

              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="bg-sky-100 text-[#0F2942] font-bold text-[10px] px-2.5 py-0.5 rounded-md uppercase">
                    Fracción Individual del Propietario
                  </span>
                  <span className="text-xs text-gray-500 font-mono">
                    Escritura Fiduciaria #88192
                  </span>
                </div>

                <h3 className="font-georama text-xl font-bold text-[#252425]">
                  {sampleProperty.title}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Fracción / Periodo</span>
                    <span className="font-bold text-[#252425]">{sampleFraction.fractionCode}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Tipología</span>
                    <span className="font-bold text-[#252425]">{sampleFraction.typology}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Experiencia de Propiedad</span>
                    <span className="font-bold text-[#252425]">{sampleProperty.propertyExperience}</span>
                  </div>
                </div>

                {/* Certification shown ONLY if applies (Rule Page 4) */}
                {sampleFraction.certification && (
                  <div className="bg-sky-50 p-3 rounded-xl border border-sky-150 flex items-center space-x-2 text-xs">
                    <Award className="w-4 h-4 text-[#66C2F1] shrink-0" />
                    <div>
                      <span className="font-bold text-[#0F2942] block">
                        Certificación Liah {sampleFraction.certification.type}
                      </span>
                      <span className="text-gray-600 text-[11px]">
                        {sampleFraction.certification.description}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-[#66C2F1]" />
                <span>Administración Integral Liah activa • Sin tareas operativas para ti</span>
              </span>

              <button
                onClick={() => {
                  setActiveScreen('06_FICHA_PATRIMONIAL');
                }}
                className="font-bold text-[#66C2F1] hover:underline"
              >
                Ver Ficha Integral
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Trámites & Adquisiciones */}
      {activeTab === 'adquisiciones' && (
        <div className="bg-white rounded-2xl border border-sky-100 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-georama text-lg font-bold text-[#252425]">
              Adquisición en Proceso Liah
            </h3>
            <button
              onClick={() => setActiveScreen('09_MI_ADQUISICION')}
              className="bg-[#252425] text-white hover:bg-[#66C2F1] hover:text-[#252425] px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1"
            >
              <span>Continuar Trámite</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-sky-50 p-4 rounded-xl border border-sky-150 text-xs space-y-2">
            <span className="font-bold text-[#0F2942]">Estatus: Paso 2 de 6 — Carga de Expediente KYC</span>
            <p className="text-gray-600">
              Carga tu comprobante de domicilio para avanzar a la redacción del contrato de fideicomiso fiduciario.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Favoritos */}
      {activeTab === 'favoritos' && (
        <div className="bg-white rounded-2xl border border-sky-100 p-6 text-center space-y-3">
          <Heart className="w-8 h-8 text-red-500 mx-auto" />
          <h3 className="font-georama text-base font-bold text-[#252425]">
            Colección de Experiencias Guardadas
          </h3>
          <p className="text-xs text-gray-500">
            Has guardado {MOCK_PROPERTIES.length} experiencias para explorar en tu siguiente viaje.
          </p>
        </div>
      )}
    </div>
  );
};
