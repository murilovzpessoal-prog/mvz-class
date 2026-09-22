import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  Play, 
  Pause,
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronDown, 
  Sparkles, 
  KeyRound, 
  Mail, 
  Gauge,
  Volume2,
  VolumeX,
  Maximize
} from "lucide-react";
import Hls from "hls.js";

export function BoasVindasVSL() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const maxTimeWatched = useRef<number>(0);

  const videoUrl = "https://stream.cakto.com.br/f14d08c7-39ac-4e5a-97c3-66d565d73be0/1080p/video.m3u8";

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        maxBufferLength: 30,
        enableWorker: true,
      });
      hlsRef.current = hls;
      hls.loadSource(videoUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoUrl;
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [videoUrl]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!hasStarted) {
      setHasStarted(true);
    }

    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log("Play error", err));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (!document.fullscreenElement) {
      videoRef.current.parentElement?.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;

      // Trava de VSL: impede avançar além do que já foi assistido
      if (current > maxTimeWatched.current + 1.5) {
        videoRef.current.currentTime = maxTimeWatched.current;
      } else {
        maxTimeWatched.current = Math.max(maxTimeWatched.current, current);
      }

      setProgress((videoRef.current.currentTime / duration) * 100);
    }
  };

  // Trava contra atalhos de teclado (setas do teclado que pulam vídeo)
  const handleSeeking = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      if (current > maxTimeWatched.current + 1) {
        videoRef.current.currentTime = maxTimeWatched.current;
      }
    }
  };

  const faqs = [
    {
      q: "Como sei qual é o meu e-mail de acesso?",
      a: "O e-mail de acesso é exatamente o mesmo que você informou no momento da compra na plataforma da Cakto."
    },
    {
      q: "É o meu primeiro acesso, onde crio minha senha?",
      a: "Basta clicar no botão 'Acessar Plataforma' abaixo. Na tela de login, digite o e-mail da compra e defina sua senha no campo correspondente. O sistema criará seu acesso automaticamente."
    },
    {
      q: "Apareceu 'Senha Incorreta', o que fazer?",
      a: "Se você já concluiu o primeiro acesso antes, digite a senha que você escolheu na primeira vez que entrou."
    },
    {
      q: "Onde encontro os grupos e materiais complementares?",
      a: "Dentro da plataforma, na aba lateral e no menu inicial, você terá acesso imediato aos links dos grupos, ferramentas e atualizações."
    }
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-[#00e5ff]/20 selection:text-white relative overflow-x-hidden font-sans">
      
      {/* Grid de Fundo Sutil */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] -z-0"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />
      
      {/* Glows Ambientes Suaves em Azul / Cyan */}
      <div 
        className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[850px] h-[450px] pointer-events-none -z-0 opacity-20 blur-[150px]" 
        style={{ background: 'radial-gradient(ellipse at center, #00e5ff 0%, #0077ff 50%, transparent 80%)' }}
      />
      <div 
        className="fixed bottom-0 right-[-10%] w-[500px] h-[500px] pointer-events-none -z-0 opacity-15 blur-[160px]" 
        style={{ background: 'radial-gradient(circle, #00e5ff 0%, transparent 70%)' }}
      />

      {/* HEADER FIXO ELEGANTE */}
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 py-4 md:py-6">
        <div className="w-full max-w-5xl bg-[#0a0a0e]/85 backdrop-blur-xl border border-white/10 rounded-2xl px-5 md:px-8 h-14 md:h-16 flex items-center justify-between shadow-[0_10px_35px_rgba(0,0,0,0.7)]">
          
          {/* Logo Oficial em PNG */}
          <div className="flex items-center gap-3">
            <img 
              src="https://i.imgur.com/Hx7t3PI.png" 
              alt="Comunidade MVZ" 
              className="h-7 md:h-8 w-auto object-contain"
            />
            <div className="h-4 w-px bg-white/15 mx-1 hidden sm:block" />
            <span className="text-[11px] text-white/50 tracking-wider uppercase font-semibold hidden sm:inline">
              Portal do Aluno
            </span>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Acesso Liberado</span>
            </div>

            {/* Botão Entrar */}
            <Link
              to="/login"
              className="px-4 py-2 md:px-5 md:py-2 rounded-xl bg-white text-black font-bold text-xs md:text-sm hover:bg-neutral-200 active:scale-95 transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Entrar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="relative z-10 pt-28 md:pt-36 pb-20 px-4 max-w-5xl mx-auto">
        
        {/* HERO HEADER */}
        <div className="text-center space-y-4 mb-8 md:mb-12">
          
          {/* Badge em Cyan Suave */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00e5ff]/25 bg-[#00e5ff]/5 text-[#38bdf8] text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#00e5ff]" />
            <span>Passo Obrigatório • Primeiro Acesso</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-[1.15] text-white max-w-3xl mx-auto">
            Bem-vindo à Comunidade. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-[#38bdf8]">
              Veja como acessar a sua conta
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Assista ao tutorial abaixo para entender como ativar a sua senha e liberar as aulas.
          </p>

        </div>

        {/* VSL PLAYER SECTION */}
        <div className="relative mx-auto max-w-4xl mb-12">
          
          {/* Glow de fundo em azul suave atrás do vídeo */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#00e5ff]/15 via-[#0077ff]/10 to-[#00e5ff]/15 blur-xl opacity-80 pointer-events-none" />

          <div className="relative rounded-2xl md:rounded-3xl bg-[#0c0c10] border border-white/10 p-2 md:p-3 shadow-2xl overflow-hidden backdrop-blur-xl">
            
            {/* Top Bar da Janela de Vídeo */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-white/5 mb-2 text-xs text-white/50">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="ml-2 font-medium text-[11px] text-white/60 hidden sm:inline">Vídeo de Integração Oficial</span>
              </div>

              {/* Botões de Velocidade com destaque para 2x */}
              <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-lg border border-white/10">
                <Gauge className="w-3.5 h-3.5 text-[#00e5ff] ml-1 mr-0.5" />
                <span className="text-[11px] text-white/40 mr-1 hidden sm:inline">Velocidade:</span>
                {[1, 1.25, 1.5, 2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => handleSpeedChange(spd)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                      playbackSpeed === spd
                        ? "bg-[#00e5ff] text-black shadow-sm"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {spd === 2 ? "2x 🔥" : `${spd}x`}
                  </button>
                ))}
              </div>
            </div>

            {/* Container do Vídeo 16:9 */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#050505] flex items-center justify-center group shadow-inner select-none">
              
              <video
                ref={videoRef}
                className="w-full h-full object-contain cursor-pointer"
                playsInline
                preload="auto"
                onTimeUpdate={handleTimeUpdate}
                onSeeking={handleSeeking}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClick={togglePlay}
              />

              {/* Barra de Controles Customizada VSL: Apenas exibição de progresso, sem permissão para pular */}
              <div className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 sm:p-4 transition-opacity duration-300 ${hasStarted ? "opacity-100 group-hover:opacity-100" : "opacity-0 pointer-events-none"}`}>
                
                {/* Linha de Progresso Contínua VSL (Apenas visual, bloqueada para clique/avanço) */}
                <div 
                  className="w-full h-1.5 bg-white/20 rounded-full mb-3 relative overflow-hidden pointer-events-none"
                  title="Vídeo protegido contra avanço"
                >
                  <div 
                    className="h-full bg-[#00e5ff] rounded-full transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Controles: Play/Pause, Mudo e Tela Cheia (Sem tempo numérico) */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="text-white hover:text-[#00e5ff] transition-colors p-1"
                      aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                      )}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="text-white/80 hover:text-white transition-colors p-1"
                      aria-label="Silenciar"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                      ) : (
                        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                  </div>

                  <button
                    onClick={toggleFullscreen}
                    className="text-white/80 hover:text-white transition-colors p-1"
                    aria-label="Tela cheia"
                  >
                    <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

              </div>

              {/* Botão de Play sobreposto antes de começar */}
              {!hasStarted && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-black/10"
                >
                  <button
                    onClick={togglePlay}
                    className="relative z-20 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black/70 backdrop-blur-md border border-cyan/50 hover:border-cyan flex items-center justify-center shadow-[0_0_35px_rgba(0,229,255,0.3)] hover:scale-105 active:scale-95 transition-all group/btn cursor-pointer"
                    aria-label="Assistir tutorial"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cyan/20 flex items-center justify-center group-hover/btn:bg-cyan/30 transition-colors">
                      <Play className="w-8 h-8 sm:w-9 sm:h-9 text-white fill-white ml-1 transition-transform group-hover/btn:scale-110" />
                    </div>
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* BOTÃO PRINCIPAL DE AÇÃO (CTA) */}
        <div className="flex flex-col items-center justify-center gap-3.5 mb-16 text-center px-4">
          
          <Link
            to="/login"
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-black bg-white hover:bg-neutral-100 rounded-xl border border-white/60 shadow-[0_6px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_30px_rgba(0,229,255,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 w-full sm:w-auto cursor-pointer"
          >
            <span>ACESSAR A PLATAFORMA AGORA</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="flex items-center gap-2 text-xs text-white/50">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ambiente seguro • Ativação automática de login</span>
          </div>

        </div>

        {/* 3 PASSOS SIMPLES (CARD SECTION) */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
              Como funciona o seu acesso em 3 etapas
            </h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Simples e direto ao ponto. Siga os passos para liberar suas aulas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Card 1 */}
            <div className="relative rounded-2xl bg-[#0c0c10] border border-white/10 p-6 backdrop-blur-xl hover:border-[#00e5ff]/30 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/20 flex items-center justify-center text-[#00e5ff] font-bold text-sm mb-4 group-hover:scale-105 transition-transform">
                01
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-[#00e5ff]" />
                <h3 className="font-bold text-base text-white">Insira seu E-mail</h3>
              </div>
              <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                Digite exatamente o e-mail informado no momento da sua compra na Cakto.
              </p>
            </div>

            {/* Card 2 */}
            <div className="relative rounded-2xl bg-[#0c0c10] border border-white/10 p-6 backdrop-blur-xl hover:border-[#00e5ff]/30 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/20 flex items-center justify-center text-[#00e5ff] font-bold text-sm mb-4 group-hover:scale-105 transition-transform">
                02
              </div>
              <div className="flex items-center gap-2 mb-2">
                <KeyRound className="w-4 h-4 text-[#00e5ff]" />
                <h3 className="font-bold text-base text-white">Defina sua Senha</h3>
              </div>
              <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                No primeiro acesso, digite a senha que deseja utilizar (mínimo de 6 dígitos).
              </p>
            </div>

            {/* Card 3 */}
            <div className="relative rounded-2xl bg-[#0c0c10] border border-white/10 p-6 backdrop-blur-xl hover:border-emerald-400/30 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm mb-4 group-hover:scale-105 transition-transform">
                03
              </div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-base text-white">Comece a Estudar</h3>
              </div>
              <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                Sua conta será autenticada e você terá acesso direto aos módulos e ferramentas.
              </p>
            </div>

          </div>
        </div>

        {/* FAQ - PERGUNTAS FREQUENTES */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Dúvidas Frequentes
            </h2>
            <p className="text-sm text-white/40">
              Respostas rápidas sobre o primeiro login e ativação.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-[#0c0c10] border border-white/10 overflow-hidden transition-all hover:border-white/20"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <span className="font-medium text-sm sm:text-base text-white/90">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-white/40 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#00e5ff]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-white/60 leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 px-4 text-center text-xs text-white/40 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Comunidade MVZ</span>
            <span>• Todos os direitos reservados</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="hover:text-white transition-colors">Login</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
