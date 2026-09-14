import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Play, CheckCircle2, Circle, Star, ChevronRight, PlayCircle, Settings, Maximize, Search } from 'lucide-react';
import Hls from 'hls.js';
import { modulesData, type LessonItem } from '../data/modules';
import { supabase } from '../lib/supabase';
import { SearchPalette } from '../components/SearchPalette';

function VideoPlayer({ url }: { url: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !url) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        maxBufferLength: 30,
        enableWorker: true,
      });
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(e => console.warn('Autoplay prevented by browser', e));
      });
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls?.recoverMediaError();
              break;
            default:
              hls?.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(e => console.warn('Autoplay prevented by browser', e));
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [url]);

  return (
    <video 
      ref={videoRef} 
      controls 
      className="w-full h-full object-contain bg-black outline-none"
      playsInline
    />
  );
}

export function Aula() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login');
      }
    });
  }, [navigate]);

  // Listen for Cmd+K inside Aula view as well
  useEffect(() => {
    const handleGlobalSearch = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalSearch);
    return () => window.removeEventListener('keydown', handleGlobalSearch);
  }, []);

  const searchParams = new URLSearchParams(location.search);
  const lessonParam = searchParams.get('lesson');
  
  // States
  const [activeModule, setActiveModule] = useState(Number(id) || 1);
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);

  // Sync module if route param :id changes (e.g. via search or navigation)
  useEffect(() => {
    if (id) {
      const parsedMod = Number(id);
      if (!isNaN(parsedMod)) {
        setActiveModule(parsedMod);
      }
    }
  }, [id]);

  const currentModule = modulesData.find(m => m.id === activeModule) || modulesData[0];
  const currentLessons: LessonItem[] = currentModule?.aulas || [];

  // When activeModule, lessonParam, or currentLessons change, set the active lesson
  useEffect(() => {
    if (lessonParam) {
      const parsedLesson = Number(lessonParam);
      const exists = currentLessons.some(l => l.id === parsedLesson);
      if (exists) {
        setActiveLessonId(parsedLesson);
        return;
      }
    }
    // Default to first lesson of module
    if (currentLessons.length > 0) {
      setActiveLessonId(currentLessons[0].id);
    } else {
      setActiveLessonId(null);
    }
  }, [activeModule, lessonParam, currentLessons]);

  const activeLessonData: LessonItem | undefined = currentLessons.find(l => l.id === activeLessonId) || currentLessons[0];

  // Helper to switch lesson and keep URL sync
  const selectLesson = (lessonId: number) => {
    setActiveLessonId(lessonId);
    navigate(`/aula/${activeModule}?lesson=${lessonId}`, { replace: true });
  };

  // Next/Prev Logic
  const currentIndex = currentLessons.findIndex(l => l.id === activeLessonId);
  const handlePrev = () => {
    if (currentIndex > 0) {
      selectLesson(currentLessons[currentIndex - 1].id);
    }
  };
  const handleNext = () => {
    if (currentIndex < currentLessons.length - 1) {
      selectLesson(currentLessons[currentIndex + 1].id);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#030303] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden absolute inset-0 z-50">
      
      {/* Search Palette inside Aula */}
      <SearchPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* LEFT SIDE: VIDEO PLAYER & DETAILS */}
      <div className="flex-1 flex flex-col flex-shrink-0 md:h-full md:overflow-y-auto bg-[#0a0a0f] relative scrollbar-hide">
        {/* Top Header */}
        <div className="p-4 md:p-6 flex items-center justify-between z-10 border-b border-white/5 bg-[#030303]/80 backdrop-blur-md sticky top-0">
          <button 
            onClick={() => navigate('/modulos')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-bold tracking-wide"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar aos Módulos
          </button>

          {/* Search Button in Aula Header */}
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-3.5 py-1.5 rounded-xl text-xs text-white/60 hover:text-white transition-all cursor-pointer shadow-sm"
          >
            <Search className="w-3.5 h-3.5 text-[#00e5ff]" />
            <span className="hidden sm:inline">Buscar aula ou material...</span>
            <span className="sm:hidden">Buscar</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-white/10 rounded text-[9px] font-bold text-white/50">⌘K</kbd>
          </button>
        </div>

        {/* Video or Content Area */}
        <div className="px-6 md:px-12 w-full max-w-6xl mx-auto flex flex-col pb-12">
          
          <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/5 group flex items-center justify-center">
            {activeLessonData?.content ? (
              
              // Community Access Card
              <div className="flex flex-col items-center justify-center w-full h-full relative overflow-hidden bg-[#050505]">
                {/* Background Glow based on type */}
                <div 
                  className={`absolute inset-0 blur-[120px] rounded-full pointer-events-none opacity-20 ${
                    activeLessonData.content.type === 'whatsapp' ? 'bg-[#25D366]' : 'bg-[#5865F2]'
                  }`} 
                />
                
                <div className="relative z-10 flex flex-col items-center text-center max-w-lg p-8">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 border shadow-2xl ${
                    activeLessonData.content.type === 'whatsapp' 
                      ? 'bg-[#25D366]/10 border-[#25D366]/30 shadow-[#25D366]/20' 
                      : 'bg-[#5865F2]/10 border-[#5865F2]/30 shadow-[#5865F2]/20'
                  }`}>
                    {activeLessonData.content.type === 'whatsapp' ? (
                      <svg className="w-12 h-12 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                    ) : (
                      <svg className="w-12 h-12 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
                    )}
                  </div>
                  
                  <h2 className="text-3xl font-black text-white mb-4">
                    Comunidade VIP no {activeLessonData.content.type === 'whatsapp' ? 'WhatsApp' : 'Discord'}
                  </h2>
                  <p className="text-white/60 mb-8 font-medium">
                    Acesse o grupo exclusivo para alunos para fazer networking, tirar suas dúvidas diretamente e receber atualizações em tempo real da operação.
                  </p>
                  
                  <a 
                    href={activeLessonData.content.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`font-black uppercase tracking-widest px-8 py-4 rounded-xl hover:scale-105 transition-transform flex items-center justify-center w-full shadow-2xl ${
                      activeLessonData.content.type === 'whatsapp' ? 'bg-[#25D366] text-black shadow-[#25D366]/20' : 'bg-[#5865F2] text-white shadow-[#5865F2]/20'
                    }`}
                  >
                    Entrar no Grupo Agora
                  </a>
                  
                  {activeLessonData.content.support && (
                    <div className="mt-8 text-sm text-white/40 flex flex-col items-center gap-2 border-t border-white/10 pt-6 w-full">
                      <span>Problemas para entrar?</span>
                      <a 
                        href={`https://wa.me/55${activeLessonData.content.support.replace(/\D/g,'')}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-[#25D366] hover:underline font-bold"
                      >
                        Chamar Suporte: {activeLessonData.content.support}
                      </a>
                    </div>
                  )}
                </div>
              </div>

            ) : activeLessonData?.videoUrl ? (
              <VideoPlayer url={activeLessonData.videoUrl} />
            ) : (
              <div className="text-white/30 flex flex-col items-center gap-4">
                <PlayCircle className="w-16 h-16 opacity-50" />
                <span className="font-bold tracking-widest uppercase">Aula em breve</span>
              </div>
            )}
          </div>

          {/* Video Info Section */}
          <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-[#111]">
                <img src={currentModule.image} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-1">
                  {currentModule.titleMain} {currentModule.titleSub}
                </span>
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  {activeLessonData?.title || 'Conteúdo Indisponível'}
                </h1>
              </div>
            </div>
            
            {/* Rating Stars */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className="w-5 h-5 text-white/20 hover:text-yellow-400 cursor-pointer transition-colors" fill="currentColor" />
              ))}
            </div>
          </div>

          {/* Lesson Description & Link */}
          {(activeLessonData?.description || activeLessonData?.linkUrl) && (
            <div className="mt-6 bg-[#050505] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-[#ff007f]" />
                  Descrição da Aula
                </h3>
                {activeLessonData?.description && (
                  <p className="text-white/60 text-sm leading-relaxed mb-5">
                    {activeLessonData.description}
                  </p>
                )}
                {activeLessonData?.linkUrl && (
                  <a 
                    href={activeLessonData.linkUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`inline-flex items-center gap-2 font-black uppercase tracking-widest text-[11px] py-3 px-6 rounded-lg transition-transform hover:scale-105 shadow-xl ${
                      activeLessonData.linkUrl.includes('discord') 
                        ? 'bg-[#5865F2] text-white shadow-[#5865F2]/20' 
                        : 'bg-white/10 text-white shadow-black/20 hover:bg-white/20'
                    }`}
                  >
                    {activeLessonData.linkUrl.includes('discord') 
                      ? 'Acessar Servidor Discord' 
                      : activeLessonData.linkUrl.includes('docs.google')
                        ? 'Acessar Material Complementar'
                        : activeLessonData.linkUrl.includes('promptsmvz')
                          ? 'Acessar Biblioteca'
                          : activeLessonData.linkUrl.includes('mvzhooks')
                            ? 'Acessar Gerador'
                            : activeLessonData.linkUrl.includes('magnific')
                              ? 'Acessar Ferramenta (Magnific)'
                              : 'Acessar Link Oficial'}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <button className="flex items-center justify-center gap-2 bg-[#00d074] text-black w-full md:w-auto px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,208,116,0.2)]">
              <CheckCircle2 className="w-5 h-5" />
              Concluir aula
            </button>
            
            <div className="grid grid-cols-2 md:flex md:items-center gap-3 w-full md:w-auto">
              <button 
                onClick={handlePrev}
                disabled={currentIndex <= 0}
                className="flex items-center justify-center gap-2 border border-white/10 text-white/60 w-full px-5 py-3 rounded-full font-bold text-sm hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 shrink-0" />
                <span className="truncate">Anterior</span>
              </button>
              <button 
                onClick={handleNext}
                disabled={currentIndex >= currentLessons.length - 1}
                className="flex items-center justify-center gap-2 bg-white text-black w-full px-5 py-3 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span className="truncate">Próximo</span>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: MODULES ACCORDION */}
      <div className="w-full md:w-[380px] md:h-full bg-[#030303] border-l border-white/5 flex flex-col flex-shrink-0 relative md:overflow-y-auto scrollbar-hide pb-20 md:pb-0">
        
        {/* Header (Progress) */}
        <div className="sticky top-0 bg-[#030303]/95 backdrop-blur-sm z-20 p-6 border-b border-white/5 flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full border-2 border-white/10 flex items-center justify-center shrink-0">
            {/* Fake progress ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-[#8b5cf6]" strokeDasharray="138" strokeDashoffset="138" />
            </svg>
            <span className="text-[10px] font-black text-white">0%</span>
          </div>
          <span className="text-sm font-bold text-white">Comunidade MVZ</span>
        </div>

        {/* Modules List */}
        <div className="p-4 flex flex-col gap-2">
          {modulesData.map((mod, index) => {
            const isExpanded = activeModule === mod.id;
            const hasLessons = mod.aulas && mod.aulas.length > 0;
            
            return (
              <div key={mod.id} className="relative pl-6">
                
                {/* Vertical connecting line */}
                {index !== modulesData.length - 1 && (
                  <div className="absolute left-[11px] top-[30px] bottom-[-20px] w-[2px] border-l-2 border-dashed border-white/10" />
                )}

                {/* Module Header */}
                <div 
                  className={`relative z-10 flex items-center justify-between cursor-pointer py-3 rounded-lg transition-colors ${isExpanded ? 'text-[#8b5cf6]' : 'text-white/60 hover:text-white'}`}
                  onClick={() => {
                    setActiveModule(mod.id);
                    navigate(`/aula/${mod.id}`);
                  }}
                >
                  {/* Status Circle */}
                  <div className={`absolute -left-6 w-5 h-5 rounded-full border-2 flex items-center justify-center bg-[#030303] ${isExpanded ? 'border-[#8b5cf6]' : 'border-white/20'}`}>
                    {isExpanded && <div className="w-2 h-2 rounded-full bg-[#8b5cf6]" />}
                  </div>

                  <span className="text-sm font-bold capitalize">
                    {mod.titleMain.toLowerCase()} {mod.titleSub.toLowerCase()}
                  </span>
                  
                  <div className={`w-6 h-6 rounded flex items-center justify-center transition-transform ${isExpanded ? 'bg-[#8b5cf6]/20 text-[#8b5cf6] rotate-180' : 'bg-white/5 text-white/40'}`}>
                    <ChevronLeft className="w-4 h-4 -rotate-90" />
                  </div>
                </div>

                {/* Lessons Dropdown */}
                {isExpanded && hasLessons && (
                  <div className="mt-2 mb-4 flex flex-col gap-1">
                    {mod.aulas.map((lesson) => {
                      const isActive = activeLessonId === lesson.id;
                      return (
                        <div 
                          key={lesson.id} 
                          onClick={() => selectLesson(lesson.id)}
                          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${isActive ? 'bg-[#8b5cf6]/20 border border-[#8b5cf6]/30' : 'hover:bg-white/5 border border-transparent'}`}
                        >
                          <Circle className="w-5 h-5 text-white/20 shrink-0" />
                          
                          {/* Title & Icon */}
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-medium truncate ${isActive ? 'text-[#8b5cf6]' : 'text-white/80'}`}>
                              {lesson.title}
                            </p>
                          </div>
                          
                          <PlayCircle className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#8b5cf6]' : 'text-white/20'}`} />
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {/* Empty State for Modules with no lessons */}
                {isExpanded && !hasLessons && (
                  <div className="mt-2 mb-4 p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                    <p className="text-xs text-white/30 font-bold uppercase tracking-widest">Em Breve</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
