import React, { useState } from 'react';
import { 
  KeyRound, 
  Copy, 
  Check, 
  ExternalLink, 
  BrainCircuit, 
  Zap, 
  Sparkles, 
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';

interface TokenCardProps {
  title: string;
  subtitle: string;
  token: string;
  description: string;
  url: string;
  buttonText: string;
  accentColor: 'cyan' | 'pink';
  icon: React.ElementType;
  badge: string;
}

function TokenCard({
  title,
  subtitle,
  token,
  description,
  url,
  buttonText,
  accentColor,
  icon: Icon,
  badge
}: TokenCardProps) {
  const [copied, setCopied] = useState(false);
  const [showToken, setShowToken] = useState(true);

  const isCyan = accentColor === 'cyan';
  const themeColorHex = isCyan ? '#00e5ff' : '#ff007f';

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative w-full rounded-[24px] md:rounded-[32px] p-[1px] overflow-hidden transition-all duration-500 hover:-translate-y-1.5 shadow-2xl">
      {/* Dynamic Border Gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${
          isCyan ? 'from-[#00e5ff]/50' : 'from-[#ff007f]/50'
        } via-white/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500`} 
      />

      <div className="relative w-full h-full bg-[#0a0a0f] rounded-[23px] md:rounded-[31px] p-6 md:p-8 flex flex-col justify-between z-10 overflow-hidden border border-white/5">
        
        {/* Glow corner */}
        <div 
          className={`absolute -top-24 -right-24 w-56 h-56 rounded-full blur-[90px] pointer-events-none transition-all duration-700 ${
            isCyan ? 'bg-[#00e5ff]/15 group-hover:bg-[#00e5ff]/25' : 'bg-[#ff007f]/15 group-hover:bg-[#ff007f]/25'
          }`} 
        />

        {/* Giant background icon */}
        <Icon 
          className="absolute -right-6 -bottom-6 w-44 h-44 text-white/[0.02] group-hover:text-white/[0.04] transition-colors duration-500 rotate-12 pointer-events-none" 
        />

        <div>
          {/* Header row */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <div 
              className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-lg ${
                isCyan 
                  ? 'bg-[#00e5ff]/10 border-[#00e5ff]/30 text-[#00e5ff] group-hover:bg-[#00e5ff]/20' 
                  : 'bg-[#ff007f]/10 border-[#ff007f]/30 text-[#ff007f] group-hover:bg-[#ff007f]/20'
              }`}
            >
              <Icon className="w-7 h-7" />
            </div>

            <span 
              className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border shadow-sm ${
                isCyan 
                  ? 'bg-[#00e5ff]/10 text-[#00e5ff] border-[#00e5ff]/30' 
                  : 'bg-[#ff007f]/10 text-[#ff007f] border-[#ff007f]/30'
              }`}
            >
              {badge}
            </span>
          </div>

          {/* Titles */}
          <span className="text-[11px] font-bold uppercase tracking-wider text-white/40 block mb-1">
            {subtitle}
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
            {title}
          </h3>
          <p className="text-xs md:text-sm text-white/60 leading-relaxed mb-6">
            {description}
          </p>

          {/* Token Display Box */}
          <div className="space-y-2 mb-6">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/50 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-white/60" />
              Token de Acesso Exclusivo
            </label>

            <div className="relative flex items-center bg-[#030303] border border-white/10 rounded-2xl p-2.5 pl-4 gap-3 focus-within:border-white/20 transition-all shadow-inner">
              <span 
                className={`font-mono text-base md:text-lg font-black tracking-wider select-all flex-1 truncate ${
                  isCyan ? 'text-[#00e5ff]' : 'text-[#ff007f]'
                }`}
              >
                {showToken ? token : '••••••••••'}
              </span>

              <button
                type="button"
                onClick={() => setShowToken(!showToken)}
                className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all"
                title={showToken ? 'Ocultar token' : 'Mostrar token'}
              >
                {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-md ${
                  copied
                    ? 'bg-[#00ff66] text-black shadow-[#00ff66]/30'
                    : isCyan
                      ? 'bg-[#00e5ff] hover:bg-[#00c3d9] text-black shadow-[#00e5ff]/20'
                      : 'bg-[#ff007f] hover:bg-[#e0006f] text-white shadow-[#ff007f]/20'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Direct Link Button */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-black text-xs uppercase tracking-wider transition-all duration-300 group-hover:scale-[1.01]"
        >
          <span>{buttonText}</span>
          <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
        </a>

      </div>
    </div>
  );
}

export function Tokens() {
  return (
    <div className="w-full min-h-[calc(100vh-120px)] flex flex-col items-center justify-center relative pb-16">
      
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[700px] h-[700px] bg-[#00e5ff]/5 rounded-full blur-[160px] absolute -top-40 -left-32" />
        <div className="w-[700px] h-[700px] bg-[#ff007f]/5 rounded-full blur-[160px] absolute -bottom-40 -right-32" />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center animate-in fade-in zoom-in-95 duration-700">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-[11px] font-black uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#00e5ff]" />
            Acesso às Ferramentas VIP
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3 md:mb-4 px-4">
            Tokens de Acesso
          </h1>
          <p className="text-white/50 text-sm md:text-base max-w-xl leading-relaxed">
            Copie os seus tokens exclusivos abaixo para desbloquear e utilizar as ferramentas da nossa plataforma sem restrições.
          </p>
        </div>

        {/* 2 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
          
          {/* Card 1: Biblioteca de Prompts */}
          <TokenCard
            title="Biblioteca de Prompts"
            subtitle="Plataforma de Prompts de IA"
            token="#MVZ01"
            description="Acesse centenas de prompts validados para gerar criativos de alta conversão, modelos virtuais e roteiros de vendas."
            url="https://promptsmvz.site/dashboard.html"
            buttonText="Acessar Biblioteca de Prompts"
            accentColor="cyan"
            icon={BrainCircuit}
            badge="VIP Alunos"
          />

          {/* Card 2: MVZ Hooks (Gerador de Headline) */}
          <TokenCard
            title="MVZ Hooks"
            subtitle="Gerador de Headline & Ganchos"
            token="mvzhooks"
            description="Gerador automático de ganchos virais e headlines magnéticas para prender a atenção do público nos primeiros 3 segundos."
            url="https://mvzhooks.site/"
            buttonText="Acessar Gerador MVZ Hooks"
            accentColor="pink"
            icon={Zap}
            badge="Headline Pro"
          />

        </div>

        {/* Info Footer Callout */}
        <div className="mt-10 p-4 md:p-5 rounded-2xl bg-[#0a0a0f] border border-white/5 max-w-2xl w-full flex items-center gap-3.5 text-white/50 text-xs shadow-lg">
          <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-white/70">
            <ShieldCheck className="w-4 h-4 text-[#00ff66]" />
          </div>
          <p className="leading-relaxed">
            <strong className="text-white">Instruções:</strong> Ao abrir qualquer uma das ferramentas, cole o token correspondente no campo de ativação solicitado na página. Se precisar de auxílio, nosso suporte está disponível na aba <span className="text-white font-bold">Suporte</span>.
          </p>
        </div>

      </div>

    </div>
  );
}
