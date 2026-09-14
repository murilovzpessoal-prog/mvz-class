import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useEffect } from 'react';
import { 
  Home, 
  Map, 
  BookOpen, 
  Package,
  Users, 
  HeadphonesIcon, 
  Search, 
  ScanSearch,
  Bell, 
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Zap,
  BrainCircuit,
  Settings,
  Upload,
  Lock,
  LogOut,
  Check,
  Loader2,
  SlidersHorizontal,
  Store
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SearchPalette } from '../SearchPalette';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  to, 
  badge,
  onClick 
}: { 
  icon: any, 
  label: string, 
  to: string, 
  badge?: string,
  onClick?: () => void 
}) => (
  <NavLink 
    to={to} 
    onClick={onClick}
    className={({ isActive }) => cn(
      "flex items-center justify-between px-4 py-3 rounded-lg text-[13px] font-medium transition-all duration-300 group mb-1",
      isActive 
        ? "bg-white/10 text-white" 
        : "text-text-muted hover:text-white hover:bg-white/5"
    )}
  >
    {({ isActive }) => (
      <>
        <div className="flex items-center gap-3 min-w-0">
          <Icon className={cn("w-[18px] h-[18px] shrink-0", isActive ? "text-white" : "text-text-muted group-hover:text-white")} strokeWidth={isActive ? 2.5 : 2} />
          <span className="truncate">{label}</span>
        </div>
        {badge && (
          <span className="text-[9px] font-black uppercase tracking-wider bg-[#00e5ff]/15 text-[#00e5ff] border border-[#00e5ff]/30 px-1.5 py-0.5 rounded-md shrink-0">
            {badge}
          </span>
        )}
      </>
    )}
  </NavLink>
);

const ExternalSidebarItem = ({ icon: Icon, label, href }: { icon: any, label: string, href: string }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 px-4 py-3 rounded-lg text-[13px] font-medium transition-colors group mb-1 text-text-muted hover:text-white hover:bg-white/5"
  >
    <Icon className="w-[18px] h-[18px] text-text-muted group-hover:text-white" strokeWidth={2} />
    {label}
  </a>
);

export function AppLayout() {
  
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login');
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activeNotifications, setActiveNotifications] = useState<string[]>([]);

  const ALL_NOTIFICATIONS = [
    "Confira o módulo POV e domine a estrutura de vídeos que mais converte.",
    "Confira o módulo One Prompt e acelere sua pesquisa de produtos.",
    "Assista ao módulo Escala para aprender a dobrar seus resultados hoje.",
    "Novos produtos validados chegando na aba de produtos. Fique de olho!",
    "Utilize o gerador de headline para prender a atenção nos primeiros segundos.",
    "A consistência é a chave do jogo. Você já postou seus vídeos hoje?",
    "Não se apegue ao produto. O segredo está em testar diferentes abordagens.",
    "Lembre-se: teste o ambiente junto com o produto para achar o campeão.",
    "Sua loja passa credibilidade? Uma revisão rápida pode salvar vendas.",
    "Bora pra cima! O primeiro milhão começa com as pequenas execuções diárias."
  ];

  const handleToggleNotifications = () => {
    if (!isNotificationsOpen) {
      const shuffled = [...ALL_NOTIFICATIONS].sort(() => 0.5 - Math.random());
      setActiveNotifications(shuffled.slice(0, 3));
    }
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  
  // Perfil State
  const [userName, setUserName] = useState("Meu Perfil");
  const [userAvatar, setUserAvatar] = useState("https://i.pravatar.cc/150?img=11");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profileError, setProfileError] = useState("");

  // Carregar dados reais do usuário logado no Supabase
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        if (user.user_metadata?.full_name) {
          setUserName(user.user_metadata.full_name);
        } else if (user.email) {
          setUserName(user.email.split('@')[0]);
        }
        if (user.user_metadata?.avatar_url) {
          setUserAvatar(user.user_metadata.avatar_url);
        }
      }
    });
  }, []);

  // Redimensionar e comprimir a imagem para Base64 leve (máx 200x200)
  const processImageUpload = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
            resolve(dataUrl);
          } else {
            reject(new Error("Canvas context error"));
          }
        };
        img.onerror = () => reject(new Error("Falha ao carregar imagem"));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Erro ao ler arquivo"));
      reader.readAsDataURL(file);
    });
  };

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    setProfileError("");
    setSaveSuccess(false);

    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          full_name: userName.trim(),
          avatar_url: userAvatar
        }
      });

      if (error) {
        setProfileError(error.message);
      } else {
        if (data.user?.user_metadata?.full_name) {
          setUserName(data.user.user_metadata.full_name);
        }
        if (data.user?.user_metadata?.avatar_url) {
          setUserAvatar(data.user.user_metadata.avatar_url);
        }
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
          setIsSettingsOpen(false);
        }, 1200);
      }
    } catch (err: any) {
      setProfileError(err.message || "Erro ao salvar perfil");
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Close menu when route changes
  const location = useLocation();
  React.useEffect(() => {
    const handleGlobalSearch = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalSearch);
    return () => window.removeEventListener('keydown', handleGlobalSearch);
  }, []);

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex text-white font-sans overflow-hidden relative">
      
      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#00e5ff]" /> Configurações de Perfil
              </h2>
              <button onClick={() => setIsSettingsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              
              {/* Profile Picture Upload */}
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-widest block mb-3">Foto de Perfil</label>
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-[#111] border border-white/10 overflow-hidden shrink-0 shadow-lg">
                    <img src={userAvatar} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <label className="cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors w-fit">
                      <Upload className="w-4 h-4" />
                      Fazer Upload
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden" 
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            try {
                              const base64 = await processImageUpload(e.target.files[0]);
                              setUserAvatar(base64);
                            } catch (err) {
                              console.error("Erro ao carregar imagem:", err);
                            }
                          }
                        }}
                      />
                    </label>
                    <p className="text-[10px] text-white/40 mt-2">Formatos suportados: JPG, PNG, WEBP.</p>
                  </div>
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-widest block mb-2">Seu Nome</label>
                <input 
                  type="text" 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00e5ff]/50 transition-colors shadow-inner"
                  placeholder="Ex: Murilo Vaz"
                />
              </div>

              {profileError && (
                <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg">
                  {profileError}
                </p>
              )}

              {saveSuccess && (
                <p className="text-xs text-[#00e5ff] bg-[#00e5ff]/10 border border-[#00e5ff]/20 p-2.5 rounded-lg flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#00e5ff]" /> Perfil salvo no servidor com sucesso!
                </p>
              )}

              {/* Password Reset */}
              <div className="pt-4 border-t border-white/5">
                <label className="text-xs font-bold text-white/50 uppercase tracking-widest block mb-3">Segurança</label>
                <button 
                  onClick={async () => {
                    const { data: { user } } = await supabase.auth.getUser();
                    if (user?.email) {
                      await supabase.auth.resetPasswordForEmail(user.email);
                      alert(`Enviamos um e-mail de redefinição de senha para: ${user.email}`);
                    }
                  }}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-[#00e5ff]" />
                  Redefinir Senha
                </button>
              </div>

            </div>
            
            <button 
              onClick={handleSaveProfile}
              disabled={isSavingProfile}
              className="w-full mt-8 bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] hover:bg-[#00e5ff] hover:text-black font-black uppercase tracking-widest text-sm py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSavingProfile ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Salvando...
                </>
              ) : saveSuccess ? (
                <>
                  <Check className="w-4 h-4" /> Salvo!
                </>
              ) : (
                "Salvar Perfil"
              )}
            </button>

            <button 
              onClick={() => {
                setIsSettingsOpen(false);
                supabase.auth.signOut(); navigate('/login');
              }}
              className="w-full mt-4 bg-transparent border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40 font-black uppercase tracking-widest text-sm py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sair da Conta
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <aside className={cn(
        "fixed lg:static top-0 left-0 h-screen w-64 lg:w-[240px] bg-background border-r border-border flex flex-col z-50 transition-transform duration-300 ease-in-out shrink-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6 pb-8 flex items-center justify-between">
          <div className="flex items-center ml-12">
            <img 
              src="https://i.imgur.com/Hx7t3PI.png" 
              alt="MVZ Plataforma Logo" 
              className="w-24 h-auto object-contain"
            />
          </div>
          <button 
            className="lg:hidden p-2 text-text-muted hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 mt-1 overflow-y-auto scrollbar-hide">
          <SidebarItem icon={Home} label="Início" to="/" onClick={() => setIsMobileMenuOpen(false)} />
          <SidebarItem icon={BookOpen} label="Módulos" to="/modulos" onClick={() => setIsMobileMenuOpen(false)} />
          <SidebarItem icon={Map} label="Minha Jornada" to="/jornada" onClick={() => setIsMobileMenuOpen(false)} />
          <SidebarItem icon={Package} label="Produtos" to="/produtos" onClick={() => setIsMobileMenuOpen(false)} />
          <SidebarItem icon={ScanSearch} label="Scanner" to="/scanner" onClick={() => setIsMobileMenuOpen(false)} />
          <SidebarItem icon={SlidersHorizontal} label="Score Produto" to="/analisador-produto" badge="Novo" onClick={() => setIsMobileMenuOpen(false)} />
          <SidebarItem icon={Store} label="Score Lojista" to="/analisador-fornecedor" badge="Novo" onClick={() => setIsMobileMenuOpen(false)} />
          
          <div className="my-2 border-t border-white/5" />
          
          <ExternalSidebarItem icon={BrainCircuit} label="Biblioteca de Prompts" href="https://promptsmvz.site/dashboard.html" />
          <ExternalSidebarItem icon={Zap} label="MVZ Hooks" href="https://mvzhooks.site/" />
          
          <ExternalSidebarItem 
            icon={(props: any) => (
              <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
              </svg>
            )} 
            label="Grupo WhatsApp" 
            href="https://chat.whatsapp.com/IhGpLowoewmATKktHv2Fo3" 
          />
          
          <ExternalSidebarItem 
            icon={(props: any) => (
              <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12h.01M15 12h.01" />
                <path d="M7.5 4.27c2.15-1.07 4.58-1.07 6.73 0l1.24.62c2.45 1.22 3.86 3.66 4.3 6.3l.42 2.5a5.53 5.53 0 0 1-5.18 6.31h-6.2a5.53 5.53 0 0 1-5.18-6.3l.42-2.5c.44-2.64 1.85-5.08 4.3-6.3l1.24-.62Z" />
              </svg>
            )} 
            label="Grupo Discord" 
            href="https://discord.gg/z2bdhZwKRS" 
          />
          
          <SidebarItem icon={HeadphonesIcon} label="Suporte" to="/suporte" onClick={() => setIsMobileMenuOpen(false)} />
        </nav>

        {/* User Profile Settings Sidebar Button */}
        <div className="p-4 border-t border-border mt-2">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="w-full flex items-center justify-between bg-surface border border-border hover:border-white/20 hover:bg-white/5 rounded-xl p-3 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#111] border border-border overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                 <img src={userAvatar} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col items-start min-w-0">
                <span className="font-bold text-[13px] text-white truncate max-w-[120px]">{userName}</span>
                <span className="text-[11px] text-text-muted flex items-center gap-1">
                  <Settings className="w-3 h-3" /> Configurar
                </span>
              </div>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto overflow-x-hidden relative">
        {/* Topbar */}
        <header className="pt-6 pb-5 md:py-6 border-b border-border flex items-center justify-between gap-4 md:gap-6 px-4 md:px-6 lg:px-8 sticky top-0 bg-background/95 backdrop-blur-xl z-30">
          <div className="flex items-center gap-3 md:gap-4 w-full max-w-xl">
            <button 
              className="lg:hidden p-1 md:p-2 text-text-muted hover:text-white transition-colors shrink-0"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-10 h-10" />
            </button>
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-text-muted" />
              </div>
              <input 
                type="text" 
                readOnly
                onClick={() => setIsSearchOpen(true)}
                placeholder="Buscar..." 
                className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 sm:pr-14 py-2.5 text-[13px] focus:outline-none focus:border-white/20 transition-all placeholder:text-text-muted text-white cursor-text"
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 bg-[#18181b] border border-border rounded px-1.5 py-0.5">
                <span className="text-[9px] font-bold text-text-muted">⌘ K</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6 shrink-0 relative">
            <button 
              className="relative text-text-muted hover:text-white transition-colors"
              onClick={handleToggleNotifications}
            >
              <Bell className="w-7 h-7" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-pink rounded-full border-[2px] border-background animate-pulse"></span>
            </button>

            {isNotificationsOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsNotificationsOpen(false)}
                />
                <div className="absolute top-12 right-12 w-80 bg-[#0a0a0f]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                    <span className="text-[13px] font-bold text-white tracking-wide">Notificações</span>
                    <span className="text-[9px] uppercase tracking-widest text-[#00e5ff] font-bold bg-[#00e5ff]/10 border border-[#00e5ff]/20 px-2 py-1 rounded-md">{activeNotifications.length} Novas</span>
                  </div>
                  <div className="flex flex-col">
                    {activeNotifications.map((notif, i) => (
                      <div key={i} className="p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors flex gap-4">
                        <div className="w-2 h-2 rounded-full bg-[#00e5ff] shrink-0 mt-1 shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
                        <p className="text-xs text-white/70 leading-relaxed font-medium">
                          {notif}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div 
                    className="p-3 bg-black/40 text-center cursor-pointer hover:bg-white/5 transition-colors"
                    onClick={() => setIsNotificationsOpen(false)}
                  >
                    <span className="text-[10px] uppercase tracking-widest text-white/30 hover:text-white/60 font-bold transition-colors">Marcar como lidas</span>
                  </div>
                </div>
              </>
            )}

            <div 
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => setIsSettingsOpen(true)}
            >
              <div className="w-12 h-12 rounded-full bg-surface border border-border overflow-hidden ml-1 group-hover:border-[#00e5ff]/50 transition-colors shadow-sm">
                 <img src={userAvatar} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-6 lg:p-8 space-y-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
      <SearchPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
