import React from 'react';
import { Mail, MessageCircle, ArrowRight } from 'lucide-react';

export function Suporte() {
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

        {/* The 2 Massive Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full px-2">
          
          {/* Card 1: WhatsApp */}
          <div className="group relative w-full rounded-[24px] md:rounded-[32px] p-[1px] cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(37,211,102,0.2)]">
            {/* Animated Border Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/40 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative w-full h-full bg-[#050508] rounded-[23px] md:rounded-[31px] p-6 md:p-12 flex flex-col items-start z-10 overflow-hidden">
              {/* Giant background icon */}
              <MessageCircle className="absolute -right-4 -bottom-4 md:-right-8 md:-bottom-8 w-48 h-48 md:w-64 md:h-64 text-[#25D366]/5 group-hover:text-[#25D366]/10 transition-colors duration-500 rotate-12" />
              
              <div className="w-16 h-16 rounded-2xl bg-[#25D366]/10 flex items-center justify-center mb-8 border border-[#25D366]/20 group-hover:bg-[#25D366]/20 transition-colors">
                <MessageCircle className="w-8 h-8 text-[#25D366]" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">WhatsApp</h3>
              <p className="text-sm md:text-base text-white/50 leading-relaxed mb-10 max-w-[80%] relative z-10">
                Fale com a nossa equipe agora mesmo. Atendimento humanizado rápido e direto, disponível de domingo a domingo.
              </p>
              
              <a href="https://w.app/gabimvz" target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center gap-3 text-[#25D366] font-bold text-sm tracking-widest uppercase group-hover:gap-5 transition-all relative z-10">
                Iniciar Conversa <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Card 2: E-mail */}
          <div className="group relative w-full rounded-[24px] md:rounded-[32px] p-[1px] cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,229,255,0.2)]">
            {/* Animated Border Gradient */}
            <div className="absolute inset-0 bg-gradient-to-bl from-[#00e5ff]/40 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative w-full h-full bg-[#050508] rounded-[23px] md:rounded-[31px] p-6 md:p-12 flex flex-col items-start z-10 overflow-hidden">
              {/* Giant background icon */}
              <Mail className="absolute -right-4 -bottom-4 md:-right-8 md:-bottom-8 w-48 h-48 md:w-64 md:h-64 text-[#00e5ff]/5 group-hover:text-[#00e5ff]/10 transition-colors duration-500 -rotate-12" />
              
              <div className="w-16 h-16 rounded-2xl bg-[#00e5ff]/10 flex items-center justify-center mb-8 border border-[#00e5ff]/20 group-hover:bg-[#00e5ff]/20 transition-colors">
                <Mail className="w-8 h-8 text-[#00e5ff]" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">E-mail Oficial</h3>
              <p className="text-sm md:text-base text-white/50 leading-relaxed mb-10 max-w-[80%] relative z-10">
                Prefere formalizar? Envie uma mensagem para nossa caixa de entrada caso queira mandar qualquer e-mail pra gente.
              </p>
              
              <a href="mailto:mvzsuporte1@gmail.com" className="mt-auto flex items-center gap-3 text-[#00e5ff] font-bold text-sm tracking-widest uppercase group-hover:gap-5 transition-all relative z-10">
                Enviar E-mail <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
