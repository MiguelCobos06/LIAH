import React, { useState } from 'react';
import { AcquisitionProgress, ActiveScreen } from '../types';
import { DEFAULT_ACQUISITION } from '../data/mockData';
import { ShieldCheck, CheckCircle2, Upload, FileText, UserCheck, CreditCard, ArrowRight, Clock, MessageSquare, PhoneCall } from 'lucide-react';

interface AcquisitionProgressViewProps {
  acquisition?: AcquisitionProgress;
  setActiveScreen: (screen: ActiveScreen) => void;
}

export const AcquisitionProgressView: React.FC<AcquisitionProgressViewProps> = ({
  acquisition = DEFAULT_ACQUISITION,
  setActiveScreen
}) => {
  const [currentStep, setCurrentStep] = useState<number>(acquisition.currentStepIndex);
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: boolean }>({
    'Identificación Oficial (INE / Pasaporte)': true
  });

  const handleSimulateUpload = (docName: string) => {
    setUploadedFiles(prev => ({ ...prev, [docName]: true }));
  };

  const handleAdvanceStep = () => {
    if (currentStep < acquisition.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setActiveScreen('MI_LIAH');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-24">
      {/* Header Banner */}
      <div className="bg-[#252425] text-white rounded-3xl p-6 md:p-8 space-y-3 border border-[#66C2F1]/30 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] uppercase font-bold text-[#66C2F1] tracking-wider block">
            Adquisición Patrimonial • Folio Fiduciario Liah
          </span>
          <span className="bg-[#66C2F1] text-[#252425] font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
            En Progreso
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <img src={acquisition.propertyImage} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/20" />
          <div>
            <h1 className="font-georama text-xl md:text-2xl font-extrabold text-white">
              {acquisition.propertyTitle}
            </h1>
            <p className="text-xs text-sky-200">
              {acquisition.fractionCode} • Inversión: ${acquisition.totalPriceUSD.toLocaleString('en-US')} USD
            </p>
          </div>
        </div>
      </div>

      {/* Progress Timeline Stepper */}
      <div className="bg-white rounded-2xl border border-sky-100 p-6 space-y-6">
        <h2 className="font-georama text-lg font-bold text-[#252425] flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-[#66C2F1]" />
          <span>Línea del Tiempo de Formalización Liah</span>
        </h2>

        <div className="space-y-4">
          {acquisition.steps.map((step, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;
            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all flex items-start space-x-4 ${
                  isCurrent
                    ? 'bg-sky-50 border-[#66C2F1] ring-1 ring-[#66C2F1]'
                    : isDone
                    ? 'bg-gray-50 border-gray-200 opacity-80'
                    : 'bg-white border-gray-100 opacity-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                  isDone
                    ? 'bg-emerald-500 text-white'
                    : isCurrent
                    ? 'bg-[#252425] text-[#66C2F1]'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-georama text-sm font-bold text-[#252425]">
                      {step.title}
                    </h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      isDone
                        ? 'bg-emerald-100 text-emerald-800'
                        : isCurrent
                        ? 'bg-sky-200 text-[#0F2942]'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {isDone ? 'Completado' : isCurrent ? 'Paso Actual' : 'Pendiente'}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500">{step.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actionable Documents Repository for Current Step */}
      <div className="bg-white rounded-2xl border border-sky-100 p-6 space-y-4">
        <h3 className="font-georama text-base font-bold text-[#252425]">
          Documentos Requeridos para el Expediente
        </h3>

        <div className="space-y-3">
          {acquisition.documents.map((doc, idx) => {
            const isUploaded = uploadedFiles[doc.name] || doc.uploaded;
            return (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50 text-xs">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-[#66C2F1]" />
                  <div>
                    <span className="font-bold text-[#252425] block">{doc.name}</span>
                    <span className="text-[10px] text-gray-400">{doc.type}</span>
                  </div>
                </div>

                {isUploaded ? (
                  <span className="text-emerald-600 font-bold text-xs flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" /> <span>Cargado</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleSimulateUpload(doc.name)}
                    className="bg-[#252425] text-white hover:bg-[#66C2F1] hover:text-[#252425] px-3 py-1.5 rounded-lg font-bold text-xs flex items-center space-x-1"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Cargar PDF</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* DOMINANT ACTION BUTTON FOR CURRENT STEP */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Paso {currentStep + 1} de 6 • Asesor asignado: <strong>{acquisition.advisorName}</strong>
          </div>

          <button
            onClick={handleAdvanceStep}
            className="bg-[#252425] hover:bg-[#66C2F1] text-white hover:text-[#252425] px-6 py-3 rounded-xl font-georama font-bold text-xs transition-all flex items-center space-x-2 cursor-pointer shadow-md"
          >
            <span>Avance de Paso Siguiente</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
