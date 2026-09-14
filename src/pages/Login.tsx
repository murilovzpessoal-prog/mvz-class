import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ShieldCheck, CheckCircle2, Info } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Tenta fazer login normalmente
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          // Pode ser senha errada, OU o usuário não existe (primeiro acesso)
          // Vamos tentar criar a conta:
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
          });

          if (signUpError) {
            if (signUpError.message.includes('already registered')) {
              // Se ele já estava registrado, então no passo 1 era a senha que estava errada!
              setErrorMsg('Senha incorreta.');
            } else if (signUpError.message.includes('Acesso negado') || signUpError.message.includes('Database error') || signUpError.message.includes('trigger')) {
              // Barrado pela nossa trigger de compras
              setErrorMsg('Acesso negado: E-mail não possui compra ativa.');
            } else {
              setErrorMsg(signUpError.message);
            }
          } else {
            // Sucesso no SignUp! Se o Supabase estiver configurado para auto-login sem confirmação de e-mail:
            if (signUpData.session) {
              navigate('/');
            } else {
              setErrorMsg('Acesso criado! Você precisa desabilitar "Confirm email" no painel do Supabase para logar direto.');
            }
          }
        } else {
          setErrorMsg(signInError.message);
        }
      } else {
        // Login normal com sucesso!
        navigate('/');
      }
    } catch (err: any) {
      setErrorMsg('Erro inesperado: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex relative bg-[#030303] font-sans">
      
      {/* LEFT SIDE: Image (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Dark vignette to blend the edge into the right side */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#030303]/50 to-[#030303] z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent z-10 opacity-80" />
        
        {/* Main Image */}
        <img 
          src="https://i.imgur.com/wdnnfZd.png" 
          alt="MVZ Workspace" 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
        />


      </div>

      {/* RIGHT SIDE: Authentication Form */}
      
      {/* MOBILE BACKGROUND: Image (Hidden on Desktop) */}
      <div className="absolute inset-0 flex lg:hidden overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/10 via-[#030303]/80 to-[#030303] z-10" />
        <img 
          src="https://i.imgur.com/wdnnfZd.png" 
          alt="MVZ Workspace Mobile" 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
        />
      </div>

      {/* RIGHT SIDE: Authentication Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10 lg:overflow-hidden lg:bg-[#030303]">
        
        {/* Subtle Ambient Glow matching the warm sunset outside */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#f59e0b]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="w-full max-w-sm relative z-10 animate-in fade-in zoom-in-95 duration-700 bg-[#050505]/60 lg:bg-transparent p-8 lg:p-0 rounded-[32px] lg:rounded-none backdrop-blur-2xl lg:backdrop-blur-none border border-white/10 lg:border-none shadow-2xl lg:shadow-none mt-16 lg:mt-0">
          
          {/* Logo / Title */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-normal text-white tracking-tight mb-3">
              Bem-vindo ao <br/>
              <span className="font-black text-white">MVZ System</span>
            </h1>
            <p className="text-white/40 text-sm font-light">Insira suas credenciais para continuar.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold px-4 py-3 rounded-xl text-center">
                {errorMsg}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">E-mail</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-white/20 group-focus-within:text-white/70 transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all placeholder:text-white/20 font-light"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Senha <span className="normal-case tracking-normal font-medium text-white/30 ml-1">ou crie uma agora</span></label>
                <a href="#" className="text-[10px] font-medium text-white/40 hover:text-white transition-colors">Esqueceu a senha?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-white/20 group-focus-within:text-white/70 transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all placeholder:text-white/20 font-light"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 pb-4 ml-1">
              <div className="w-4 h-4 rounded border border-white/20 flex items-center justify-center bg-transparent cursor-pointer hover:border-white/50 transition-colors">
                <CheckCircle2 className="w-3 h-3 text-transparent" />
              </div>
              <span className="text-xs text-white/40 font-light cursor-pointer hover:text-white/70 transition-colors">Lembrar neste dispositivo</span>
            </div>

            
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 mb-2 flex gap-3 items-start">
              <Info className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
              <p className="text-[11px] text-white/50 leading-relaxed font-light">
                <strong className="text-white/80 font-medium">Primeiro acesso?</strong> Digite o e-mail exato usado na sua compra e invente uma senha. O sistema vai validar e criar sua conta na mesma hora.
              </p>
            </div>

            <button
              type="submit"
              className="group relative w-full h-12 rounded-xl flex items-center justify-center overflow-hidden transition-all active:scale-[0.98] bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <span className="relative z-10 flex items-center gap-2 font-bold text-[13px] tracking-wide">
                {loading ? "Autenticando..." : "Acessar Plataforma"} {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </span>
            </button>
            
          </form>

          <p className="text-center md:text-left text-[11px] text-white/30 font-light mt-10">
            Acesso monitorado. Não tem uma conta? <a href="https://comunidadeamvz.com.br" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-medium">Assine agora</a>
          </p>
        </div>
      </div>
    </div>
  );
}
