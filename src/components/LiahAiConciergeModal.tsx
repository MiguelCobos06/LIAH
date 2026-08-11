import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, Loader2 } from 'lucide-react';

interface LiahAiConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentContext?: any;
  onApplySearch?: (query: string) => void;
}

interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
}

export const LiahAiConciergeModal: React.FC<LiahAiConciergeModalProps> = ({
  isOpen,
  onClose,
  currentContext,
  onApplySearch
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'assistant',
      text: '¡Hola! Soy Liah IA, tu Asistente Virtual de Búsqueda, Hospedaje y Asesoría Patrimonial. Escríbeme qué tipo de lugar o experiencia buscas (p. ej. "Casa frente al mar en Telchac", "Bungalow con cenote en Valladolid", o "Fracciones Fractional") y te guiaré al instante.'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = textToSend || inputPrompt;
    if (!prompt.trim() || isLoading) return;

    const userMsg: ChatMessage = { sender: 'user', text: prompt };
    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/liah-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, context: currentContext })
      });

      const data = await response.json();

      if (data.reply) {
        setMessages(prev => [...prev, { sender: 'assistant', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, {
          sender: 'assistant',
          text: data.error || 'Lo siento, no pude comunicarme con el servidor Liah en este momento.'
        }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        sender: 'assistant',
        text: 'Error de red al consultar el Asistente Liah.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const starterPrompts = [
    '🌴 Buscar casa en Telchac frente al mar',
    '🌿 Buscar bungalow con cenote en Valladolid',
    '🛡️ ¿Cómo funciona la adquisición Fractional?',
    '🏛️ Experiencia colonial en San Miguel de Allende'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg h-[580px] flex flex-col overflow-hidden border border-[#66C2F1]/40 shadow-2xl">
        {/* Modal Header */}
        <div className="bg-[#252425] text-white p-4 flex items-center justify-between border-b border-[#66C2F1]/30">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-[#66C2F1] text-[#252425] rounded-xl">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-georama text-base font-bold text-white">Asistente Liah</h3>
              <p className="text-[10px] text-[#66C2F1]">IA Concierge & Asesor Patrimonial</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F5FDFF]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 bg-[#252425] text-[#66C2F1] rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#252425] text-white rounded-tr-none shadow-xs'
                    : 'bg-white text-[#252425] border border-sky-100 rounded-tl-none shadow-xs'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
              <Loader2 className="w-4 h-4 animate-spin text-[#66C2F1]" />
              <span>El Asistente Liah está redactando tu respuesta...</span>
            </div>
          )}
        </div>

        {/* Starter Prompts */}
        <div className="p-2 bg-sky-50/80 border-t border-sky-100 overflow-x-auto no-scrollbar flex items-center space-x-2">
          {starterPrompts.map((promptText, i) => (
            <button
              key={i}
              onClick={() => {
                handleSendMessage(promptText);
                if (onApplySearch && (promptText.includes('Telchac') || promptText.includes('Valladolid') || promptText.includes('San Miguel'))) {
                  const cleanQuery = promptText.replace(/^[^\w]+/, '').trim();
                  onApplySearch(cleanQuery);
                }
              }}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-[#252425] text-gray-700 hover:text-[#66C2F1] border border-sky-150 text-[10px] font-medium whitespace-nowrap transition-colors cursor-pointer"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Modal Input */}
        <div className="p-3 bg-white border-t border-gray-100 flex items-center space-x-2">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Pregunta sobre itinerarios, hospedaje o fracciones..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-xs text-[#252425] focus:outline-hidden focus:border-[#66C2F1]"
          />
          {onApplySearch && inputPrompt.trim() && (
            <button
              onClick={() => {
                onApplySearch(inputPrompt);
                handleSendMessage();
                onClose();
              }}
              title="Buscar en Liah con esta frase"
              className="bg-sky-50 text-[#0F2942] hover:bg-sky-100 border border-sky-200 px-3 py-2 rounded-full text-[10px] font-bold cursor-pointer transition-colors"
            >
              Buscar
            </button>
          )}
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputPrompt.trim()}
            className="bg-[#252425] hover:bg-[#66C2F1] text-white hover:text-[#252425] p-2.5 rounded-full transition-all disabled:opacity-40 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
