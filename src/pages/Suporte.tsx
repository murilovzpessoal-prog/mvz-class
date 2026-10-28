import React, { useState } from 'react';
import { Mail, MessageCircle, ArrowRight, RotateCcw, HelpCircle } from 'lucide-react';
import { HelpRefundModal } from '../components/HelpRefundModal';

export function Suporte() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <div className="w-full min-h-[calc(100vh-120px)] flex flex-col items-center justify-center relative pb-20">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[800px] h-[800px] bg-[#25D366]/5 rounded-full blur-[150px] absolute -left-48" />
        <div className="w-[800px] h-[800px] bg-[#00e5ff]/5 rounded-full blur-[150px] absolute -right-48" />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center animate-in fade-in zoom-in-95 duration-1000">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3 md:mb-4 px-4">
            Como podemos te ajudar?
          </h1>
          <p className="text-white/50 text-base max-w-lg leading-relaxed">
            Escolha o melhor canal de atendimento para falar com o nosso time de especialistas.
          </p>
        </div>

        {/* The Contact & Refund Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full px-2">
          
          {/* Card 1: WhatsApp */}
          <div className="group relative w-full rounded-[24px] md:rounded-[32px] p-[1px] cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(37,211,102,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/40 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative w-full h-full bg-[#050508] rounded-[23px] md:rounded-[31px] p-6 md:p-8 flex flex-col items-start z-10 overflow-hidden">
              <MessageCircle className="absolute -right-4 -bottom-4 w-40 h-40 text-[#25D366]/5 group-hover:text-[#25D366]/10 transition-colors duration-500 rotate-12" />
              
              <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 flex items-center justify-center mb-6 border border-[#25D366]/20 group-hover:bg-[#25D366]/20 transition-colors">
                <MessageCircle className="w-7 h-7 text-[#25D366]" />
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">WhatsApp</h3>
              <p className="text-xs md:text-sm text-white/50 leading-relaxed mb-8 relative z-10">
                Fale com a equipe agora mesmo. Atendimento humanizado rápido e direto de domingo a domingo.
              </p>
              
              <a href="https://w.app/gabimvz" target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center gap-2 text-[#25D366] font-bold text-xs tracking-widest uppercase group-hover:gap-4 transition-all relative z-10">
                Iniciar Conversa <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 2: E-mail */}
          <div className="group relative w-full rounded-[24px] md:rounded-[32px] p-[1px] cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,229,255,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-bl from-[#00e5ff]/40 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative w-full h-full bg-[#050508] rounded-[23px] md:rounded-[31px] p-6 md:p-8 flex flex-col items-start z-10 overflow-hidden">
              <Mail className="absolute -right-4 -bottom-4 w-40 h-40 text-[#00e5ff]/5 group-hover:text-[#00e5ff]/10 transition-colors duration-500 -rotate-12" />
              
              <div className="w-14 h-14 rounded-2xl bg-[#00e5ff]/10 flex items-center justify-center mb-6 border border-[#00e5ff]/20 group-hover:bg-[#00e5ff]/20 transition-colors">
                <Mail className="w-7 h-7 text-[#00e5ff]" />
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">E-mail Oficial</h3>
              <p className="text-xs md:text-sm text-white/50 leading-relaxed mb-8 relative z-10">
                Prefere formalizar? Envie uma mensagem para nossa caixa de entrada caso precise de suporte formal.
              </p>
              
              <a href="mailto:mvzsuporte1@gmail.com" className="mt-auto flex items-center gap-2 text-[#00e5ff] font-bold text-xs tracking-widest uppercase group-hover:gap-4 transition-all relative z-10">
                Enviar E-mail <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 3: Solicitar Reembolso / Ajuda */}
          <div 
            onClick={() => setIsHelpOpen(true)}
            className="group relative w-full rounded-[24px] md:rounded-[32px] p-[1px] cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,170,0,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ffaa00]/40 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative w-full h-full bg-[#050508] rounded-[23px] md:rounded-[31px] p-6 md:p-8 flex flex-col items-start z-10 overflow-hidden">
              <RotateCcw className="absolute -right-4 -bottom-4 w-40 h-40 text-[#ffaa00]/5 group-hover:text-[#ffaa00]/10 transition-colors duration-500 rotate-45" />
              
              <div className="w-14 h-14 rounded-2xl bg-[#ffaa00]/10 flex items-center justify-center mb-6 border border-[#ffaa00]/20 group-hover:bg-[#ffaa00]/20 transition-colors">
                <RotateCcw className="w-7 h-7 text-[#ffaa00]" />
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Reembolso</h3>
              <p className="text-xs md:text-sm text-white/50 leading-relaxed mb-8 relative z-10">
                Formulário oficial de cancelamento, solicitação de estorno ou consulta de status do pedido.
              </p>
              
              <button 
                type="button" 
                className="mt-auto flex items-center gap-2 text-[#ffaa00] font-bold text-xs tracking-widest uppercase group-hover:gap-4 transition-all relative z-10"
              >
                Abrir Central de Ajuda <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      <HelpRefundModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}
