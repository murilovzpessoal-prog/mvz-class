import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Sparkles, Zap, MessageCircle, Gamepad2, ArrowRight, PlayCircle, ExternalLink } from 'lucide-react';
import { modulesData } from '../data/modules';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full pb-24 flex flex-col -mt-4">
      
      {/* 1. CINEMATIC HERO BANNER */}
      <div className="relative w-full h-[450px] md:h-[500px] rounded-3xl overflow-hidden group border border-white/5 bg-[#030303] shadow-2xl">
        <img 
          src="https://i.imgur.com/co7xEie.png" 
          alt="Banner" 
          className="absolute inset-0 w-full h-full object-cover object-[center_30%] opacity-90 brightness-110 group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
        />
        
        {/* Soft Vignette and Gradient for Text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/30 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent z-10 opacity-70" />
        
        {/* Ambient Glows */}
        <div className="absolute -left-32 -top-32 w-96 h-96 bg-[#ff007f]/20 rounded-full blur-[100px] z-10 pointer-events-none" />

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-4 md:px-16 w-[80%] sm:w-[70%] md:w-full max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 md:mb-6 w-max shadow-lg">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-[#00e5ff]" />
            <span className="text-[9px] md:text-[10px] font-black text-white tracking-[0.2em] uppercase">Membros MVZ</span>
          </div>
          
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tighter mb-3 md:mb-4 drop-shadow-2xl">
            A MENTE ENXERGA.<br/>
            A EXECUÇÃO PROVA.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#ff007f]">OS NÚMEROS FALAM.</span>
          </h1>
          
          <p className="text-white/60 text-xs md:text-base font-medium max-w-[240px] md:max-w-md leading-relaxed mb-6 md:mb-8">
            Venda sem aparecer, domine o algoritmo e construa sua operação no TikTok Shop.
          </p>
          
          <button 
            onClick={() => navigate('/aula/1')}
            className="flex items-center gap-2 md:gap-3 bg-white text-black px-6 py-3 md:px-8 md:py-4 rounded-full font-black text-xs md:text-sm w-max hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            <Play className="w-4 h-4" fill="currentColor" />
            Começar Agora
          </button>
        </div>
      </div>

      {/* 2. DASHBOARD GRID (Strictly below the banner, NO OVERLAP) */}
      <div className="w-full px-4 md:px-10 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* WIDE CARD: Continue Watching (Premium Dual-Pane) */}
        <div 
          onClick={() => navigate('/aula/1')}
          className="lg:col-span-2 bg-[#050505] border border-white/10 rounded-[24px] overflow-hidden group cursor-pointer hover:border-[#00e5ff]/50 transition-all duration-300 shadow-2xl flex flex-col md:flex-row"
        >
          {/* Left Side: Seamless Thumbnail */}
          <div className="w-full md:w-2/5 h-[180px] md:h-full relative overflow-hidden shrink-0 bg-[#050505]">
            <img 
              src={modulesData[0].image} 
              alt="Thumbnail" 
              className="absolute inset-0 w-full h-full object-cover object-center scale-[1.2] opacity-80 group-hover:scale-[1.25] transition-transform duration-700" 
            />
            
            {/* Soft mask for top text */}
            <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-[#050505] via-[#050505]/90 to-transparent z-10 pointer-events-none" />
            {/* Soft mask for bottom text */}
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent z-10 pointer-events-none" />
            {/* Fade into the right side */}
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#050505] to-transparent hidden md:block z-10" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
            
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#00e5ff]/20 group-hover:border-[#00e5ff]/50 transition-all duration-300 shadow-xl">
                <Play className="w-5 h-5 text-white group-hover:text-[#00e5ff] translate-x-0.5" fill="currentColor" />
              </div>
            </div>
          </div>
          
          {/* Right Side: Details */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-center relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00e5ff]/5 rounded-full blur-[80px] group-hover:bg-[#00e5ff]/15 transition-colors pointer-events-none" />
            
            <h3 className="text-[10px] font-black text-[#00e5ff] uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
              Continue Assistindo
            </h3>
            
            <h2 className="text-xl md:text-2xl font-black text-white mb-2 leading-tight">Introdução à Comunidade</h2>
            <p className="text-[11px] text-white/50 font-bold uppercase tracking-wider mb-6">Módulo 01 • Aula 01</p>
            
            <div className="flex items-center gap-4 mt-auto">
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00e5ff] to-[#00ff66] w-[36%] shadow-[0_0_10px_#00e5ff]" />
              </div>
              <span className="text-[10px] font-black text-white/60">36%</span>
            </div>
          </div>
        </div>

        {/* TALL CARD: Sua Jornada (Restored perfectly to previous state) */}
        <div className="lg:col-span-1 bg-[#0a0a0f]/90 backdrop-blur-2xl border border-white/10 rounded-[24px] p-6 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all duration-300 flex flex-col justify-between">
          <h3 className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-4 text-center">Progresso Geral</h3>
          
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="relative flex items-center justify-center">
              <svg className="w-24 h-24 -rotate-90 transform">
                <circle cx="48" cy="48" r="44" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="transparent" />
                <circle cx="48" cy="48" r="44" stroke="#ff007f" strokeWidth="6" fill="transparent" strokeDasharray="276" strokeDashoffset="240" className="drop-shadow-[0_0_15px_rgba(255,0,127,0.5)] transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-white leading-none">12<span className="text-sm">%</span></span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-2 pt-4 border-t border-white/10">
            <div className="text-center">
              <span className="block text-xl font-black text-white">19</span>
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Módulos</span>
            </div>
            <div className="text-center">
              <span className="block text-xl font-black text-white">64</span>
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Aulas</span>
            </div>
            <div className="text-center">
              <span className="block text-xl font-black text-white">3</span>
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Certifs</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. EXCLUSIVE TOOLS & COMMUNITIES (Premium Cards) */}
      <div className="mt-12 px-4 md:px-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black text-white flex items-center gap-3">
            <Zap className="w-5 h-5 text-[#ff00ff]" />
            Ferramentas & Comunidade
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          
          {/* Prompts Tool */}
          <a 
            href="https://promptsmvz.site/dashboard.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative h-[220px] rounded-2xl overflow-hidden bg-[#050505] border border-white/5 hover:border-[#00e5ff]/50 transition-all duration-300 shadow-xl"
          >
            <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800" alt="Prompts" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700 mix-blend-screen grayscale group-hover:grayscale-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
              <div className="w-10 h-10 rounded-full bg-[#00e5ff]/20 backdrop-blur-md border border-[#00e5ff]/30 flex items-center justify-center mb-auto shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                <Sparkles className="w-5 h-5 text-[#00e5ff]" />
              </div>
              <h3 className="text-lg font-black text-white mb-1">Biblioteca de Prompts</h3>
              <p className="text-[11px] text-white/50 font-medium mb-4 line-clamp-2">Inteligência artificial configurada com os nossos melhores prompts validados.</p>
              <div className="flex items-center gap-2 text-[10px] font-black text-[#00e5ff] uppercase tracking-widest">
                Acessar <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </a>

          {/* Hooks Tool */}
          <a 
            href="https://mvzhooks.site/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative h-[220px] rounded-2xl overflow-hidden bg-[#050505] border border-white/5 hover:border-[#ff00ff]/50 transition-all duration-300 shadow-xl"
          >
            <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" alt="Hooks" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700 mix-blend-screen grayscale group-hover:grayscale-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
              <div className="w-10 h-10 rounded-full bg-[#ff00ff]/20 backdrop-blur-md border border-[#ff00ff]/30 flex items-center justify-center mb-auto shadow-[0_0_20px_rgba(255,0,255,0.3)]">
                <Zap className="w-5 h-5 text-[#ff00ff]" />
              </div>
              <h3 className="text-lg font-black text-white mb-1">MVZ Hooks</h3>
              <p className="text-[11px] text-white/50 font-medium mb-4 line-clamp-2">Gere ganchos magnéticos infalíveis para reter a atenção nos primeiros segundos.</p>
              <div className="flex items-center gap-2 text-[10px] font-black text-[#ff00ff] uppercase tracking-widest">
                Acessar <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </a>

          {/* WhatsApp */}
          <a 
            href="https://chat.whatsapp.com/IhGpLowoewmATKktHv2Fo3" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative h-[220px] rounded-2xl overflow-hidden bg-[#050505] border border-white/5 hover:border-[#00ff66]/50 transition-all duration-300 shadow-xl"
          >
            <img src="/whatsapp-bg.jpg" alt="WhatsApp" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700 mix-blend-screen grayscale group-hover:grayscale-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
              <div className="w-10 h-10 rounded-full bg-[#00ff66]/20 backdrop-blur-md border border-[#00ff66]/30 flex items-center justify-center mb-auto shadow-[0_0_20px_rgba(0,255,102,0.3)]">
                <MessageCircle className="w-5 h-5 text-[#00ff66]" />
              </div>
              <h3 className="text-lg font-black text-white mb-1">Grupo VIP</h3>
              <p className="text-[11px] text-white/50 font-medium mb-4 line-clamp-2">Entre no grupo oficial do WhatsApp para receber avisos, novidades e fazer network.</p>
              <div className="flex items-center gap-2 text-[10px] font-black text-[#00ff66] uppercase tracking-widest">
                Participar <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </a>

          {/* Discord */}
          <a 
            href="https://discord.gg/z2bdhZwKRS" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative h-[220px] rounded-2xl overflow-hidden bg-[#050505] border border-white/5 hover:border-[#5865F2]/50 transition-all duration-300 shadow-xl"
          >
            <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" alt="Discord" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700 mix-blend-screen grayscale group-hover:grayscale-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
              <div className="w-10 h-10 rounded-full bg-[#5865F2]/20 backdrop-blur-md border border-[#5865F2]/30 flex items-center justify-center mb-auto shadow-[0_0_20px_rgba(88,101,242,0.3)]">
                <Gamepad2 className="w-5 h-5 text-[#5865F2]" />
              </div>
              <h3 className="text-lg font-black text-white mb-1">Comunidade</h3>
              <p className="text-[11px] text-white/50 font-medium mb-4 line-clamp-2">Acesse nosso servidor no Discord, participe de calls, tire dúvidas e acesse materiais.</p>
              <div className="flex items-center gap-2 text-[10px] font-black text-[#5865F2] uppercase tracking-widest">
                Conectar <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </a>

        </div>
      </div>

    </div>
  );
}
