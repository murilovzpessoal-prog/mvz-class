import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, ShieldCheck, CheckCircle2, Info, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setErrorMsg("Por favor, insira o seu e-mail.");
      setLoading(false);
      return;
    }

    if (!password || password.length < 6) {
      setErrorMsg("A senha deve ter pelo menos 6 caracteres.");
      setLoading(false);
      return;
    }

    try {
      // 1. Tenta login normal com email e senha
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: password,
      });

      if (!signInError && signInData?.session) {
        navigate("/");
        return;
      }

      // 2. Se falhou o login, pode ser o primeiro acesso do comprador (ou senha errada)
      // Tentamos o cadastro automático da senha escolhida
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: cleanEmail,
        password: password,
      });

      if (!signUpError) {
        // Se criou e já retornou sessão, entra direto!
        if (signUpData?.session) {
          navigate("/");
          return;
        }
        
        // Se criou mas não retornou sessão na hora, tenta o signIn em seguida
        const { error: retrySignInError } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: password,
        });

        if (!retrySignInError) {
          navigate("/");
          return;
        } else {
          setErrorMsg("Conta ativada com sucesso! Clique em Entrar novamente.");
          return;
        }
      }

      // 3. Tratamento dos possíveis erros
      const errorText = (signUpError.message || "").toLowerCase();
      
      if (errorText.includes("already registered") || errorText.includes("already exists") || errorText.includes("user already")) {
        setErrorMsg("Senha incorreta. Se este é seu e-mail, digite a senha criada no seu primeiro acesso.");
      } else if (
        errorText.includes("acesso negado") || 
        errorText.includes("database error") || 
        errorText.includes("trigger") ||
        errorText.includes("compra ativa")
      ) {
        setErrorMsg("Acesso não liberado: Este e-mail não foi encontrado na lista de compras aprovadas da comunidade.");
      } else {
        setErrorMsg(signUpError.message || "Não foi possível validar suas credenciais.");
      }

    } catch (err: any) {
      setErrorMsg("Erro de conexão: " + (err.message || "Tente novamente em instantes."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex relative bg-[#030303] font-sans">
      
      {/* LEFT SIDE: Image (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#030303]/50 to-[#030303] z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent z-10 opacity-80" />
        
        <img 
          src="https://i.imgur.com/wdnnfZd.png" 
          alt="MVZ Workspace" 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
        />
      </div>

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
        
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#f59e0b]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="w-full max-w-sm relative z-10 animate-in fade-in zoom-in-95 duration-700 bg-[#050505]/60 lg:bg-transparent p-8 lg:p-0 rounded-[32px] lg:rounded-none backdrop-blur-2xl lg:backdrop-blur-none border border-white/10 lg:border-none shadow-2xl lg:shadow-none mt-16 lg:mt-0">
          
          {/* Logo / Title */}
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-normal text-white tracking-tight mb-2">
              Área de Membros <br/>
              <span className="font-black text-white">MVZ Class</span>
            </h1>
            <p className="text-white/50 text-xs">
              Primeiro acesso? Digite o e-mail da sua compra e crie sua senha de acesso agora.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold px-4 py-3 rounded-xl text-center animate-in fade-in duration-300">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="text-[11px] font-bold text-white/70 uppercase tracking-wider block mb-1.5">
                E-mail da Compra
              </label>
              <div className="relative">
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@email.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#00e5ff] transition-all shadow-inner"
                />
                <Mail className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-white/70 uppercase tracking-wider block mb-1.5">
                Senha de Acesso
              </label>
              <div className="relative">
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha (mínimo 6 dígitos)"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#00e5ff] transition-all shadow-inner"
                />
                <Lock className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-white text-black font-black text-sm uppercase tracking-wider hover:bg-white/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Verificando Acesso...</span>
                </>
              ) : (
                <>
                  <span>Acessar Plataforma</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Aviso Seguro */}
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2.5 text-[11px] text-white/40 justify-center">
            <ShieldCheck className="w-4 h-4 text-[#00ff66]" />
            <span>Acesso exclusivo para compradores aprovados.</span>
          </div>

        </div>
      </div>

    </div>
  );
}
