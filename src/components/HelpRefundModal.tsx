import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  RotateCcw, 
  X, 
  HelpCircle, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  Zap, 
  ChevronLeft,
  Mail,
  User,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export interface RefundRequest {
  id: string;
  name: string;
  email: string;
  purchaseDate: string;
  reason: string;
  requestedAt: string; // ISO
  status: 'em_analise' | 'cancelado' | 'concluido';
}

const STORAGE_KEY = 'mvz_refund_requests';
const USER_REFUND_KEY = 'mvz_current_user_refund';

export function getStoredRefunds(): RefundRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveStoredRefunds(list: RefundRequest[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Erro ao salvar reembolsos:', e);
  }
}

export function HelpRefundModal({ isOpen, onClose }: { isOpen: boolean; onClose: boolean | (() => void) }) {
  const close = typeof onClose === 'function' ? onClose : () => {};

  // View state: 'menu' | 'form' | 'details'
  const [view, setView] = useState<'menu' | 'form' | 'details'>('menu');
  
  // Current user's refund status
  const [userRefund, setUserRefund] = useState<RefundRequest | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [reason, setReason] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load user data & existing refund
  useEffect(() => {
    if (isOpen) {
      // Check Supabase or LocalStorage user
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          if (user.user_metadata?.full_name) setName(user.user_metadata.full_name);
          if (user.email) setEmail(user.email);
        } else {
          const storedEmail = localStorage.getItem('mvz_user_email');
          if (storedEmail) {
            setEmail(storedEmail);
            setName(storedEmail.split('@')[0]);
          }
        }
      });

      // Load user's active refund request
      const activeUserRefundId = localStorage.getItem(USER_REFUND_KEY);
      const all = getStoredRefunds();
      if (activeUserRefundId) {
        const found = all.find(r => r.id === activeUserRefundId && r.status === 'em_analise');
        setUserRefund(found || null);
      } else {
        const storedEmail = localStorage.getItem('mvz_user_email');
        if (storedEmail) {
          const found = all.find(r => r.email.toLowerCase() === storedEmail.toLowerCase() && r.status === 'em_analise');
          setUserRefund(found || null);
        }
      }
      setView('menu');
      setErrorMsg('');
    }
  }, [isOpen]);

  const handleSubmitRefund = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !purchaseDate || !reason.trim()) {
      setErrorMsg('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const newRequest: RefundRequest = {
      id: 'ref_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      name: name.trim(),
      email: email.trim(),
      purchaseDate: purchaseDate.split('-').reverse().join('/'), // YYYY-MM-DD -> DD/MM/YYYY
      reason: reason.trim(),
      requestedAt: new Date().toISOString(),
      status: 'em_analise'
    };

    // Save in LocalStorage
    const all = getStoredRefunds();
    const updated = [newRequest, ...all];
    saveStoredRefunds(updated);
    localStorage.setItem(USER_REFUND_KEY, newRequest.id);

    // Optional Supabase sync
    try {
      await supabase.from('reembolsos').insert([{
        id: newRequest.id,
        name: newRequest.name,
        email: newRequest.email,
        purchase_date: newRequest.purchaseDate,
        reason: newRequest.reason,
        status: newRequest.status,
        created_at: newRequest.requestedAt
      }]);
    } catch (e) {
      // Silently ignore if table doesn't exist
    }

    setUserRefund(newRequest);
    setIsSubmitting(false);
    setView('details');
  };

  const handleCancelRefund = () => {
    if (!userRefund) return;
    const confirm = window.confirm('Tem certeza que deseja cancelar sua solicitação de reembolso e continuar com seu acesso ativo?');
    if (!confirm) return;

    const all = getStoredRefunds();
    const updated = all.map(r => r.id === userRefund.id ? { ...r, status: 'cancelado' as const } : r);
    saveStoredRefunds(updated);
    localStorage.removeItem(USER_REFUND_KEY);
    setUserRefund(null);
    setView('menu');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-[460px] bg-[#0c0c0e] border border-white/10 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            {view !== 'menu' && (
              <button 
                onClick={() => setView('menu')}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors mr-1"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            <div className="w-8 h-8 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/20 flex items-center justify-center text-[#00e5ff]">
              <HelpCircle className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-sm tracking-wide">
              {view === 'menu' && 'Central de Ajuda'}
              {view === 'form' && 'Solicitar Reembolso'}
              {view === 'details' && 'Status do Reembolso'}
            </span>
          </div>

          <button 
            onClick={close}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto scrollbar-hide flex-1">
          
          {/* VIEW: MENU PRINCIPAL */}
          {view === 'menu' && (
            <div className="space-y-6">
              
              {/* Badge & Title */}
              <div className="text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/20 text-[#00e5ff] text-[10px] font-black uppercase tracking-widest mb-3">
                  <Zap className="w-3 h-3" />
                  Atendimento Oficial MVZ
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Como podemos te ajudar?
                </h3>
                <p className="text-xs text-white/50 mt-1 max-w-xs mx-auto">
                  Selecione uma das opções abaixo para iniciar seu atendimento:
                </p>
              </div>

              {/* Option 1: WhatsApp Suporte Oficial (Link oficial da aba Suporte: https://w.app/gabimvz) */}
              <a
                href="https://w.app/gabimvz"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-[#25D366]/40 transition-all duration-300 shadow-lg relative overflow-hidden"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center text-[#25D366] shrink-0 group-hover:scale-105 group-hover:bg-[#25D366]/20 transition-all">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-white group-hover:text-[#25D366] transition-colors">
                        Suporte no WhatsApp
                      </h4>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 px-2 py-0.5 rounded-full">
                        WhatsApp
                      </span>
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed">
                      Dúvidas gerais, ajuda com login, ferramentas e acesso imediato.
                    </p>
                  </div>
                </div>
              </a>

              {/* Option 2: Solicitar Reembolso OU Reembolso Solicitado (dinâmico) */}
              {userRefund ? (
                <div 
                  onClick={() => setView('details')}
                  className="group block p-4 rounded-2xl bg-[#00e5ff]/5 hover:bg-[#00e5ff]/10 border border-[#00e5ff]/30 transition-all duration-300 shadow-lg cursor-pointer relative overflow-hidden"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#00e5ff]/15 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff] shrink-0 group-hover:scale-105 transition-all">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-bold text-[#00e5ff]">
                          Reembolso Solicitado
                        </h4>
                        <span className="text-[10px] font-black uppercase tracking-wider bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-ping" />
                          Em Análise
                        </span>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed">
                        Sua solicitação já foi registrada e está em análise. Toque para ver detalhes.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => setView('form')}
                  className="group block p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-[#ffaa00]/40 transition-all duration-300 shadow-lg cursor-pointer relative overflow-hidden"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#ffaa00]/10 border border-[#ffaa00]/20 flex items-center justify-center text-[#ffaa00] shrink-0 group-hover:scale-105 group-hover:bg-[#ffaa00]/20 transition-all">
                      <RotateCcw className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-bold text-white group-hover:text-[#ffaa00] transition-colors">
                          Solicitar Reembolso
                        </h4>
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Formulário de cancelamento e solicitação de estorno.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Botão de WhatsApp adicional para contato rápido */}
              <div className="pt-2 text-center">
                <a
                  href="https://w.app/gabimvz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#25D366] hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Falar diretamente com um atendente
                </a>
              </div>

            </div>
          )}

          {/* VIEW: FORMULÁRIO DE REEMBOLSO */}
          {view === 'form' && (
            <form onSubmit={handleSubmitRefund} className="space-y-4">
              
              <div>
                <span className="text-xs font-bold text-[#ffaa00] uppercase tracking-wider block mb-1">
                  Cancelamento de Assinatura
                </span>
                <h3 className="text-lg font-black text-white">Dados da sua Compra</h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  Informe seus dados para localizarmos sua compra e realizarmos o estorno.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Nome Completo */}
              <div>
                <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block mb-1.5">
                  Nome Completo *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full bg-[#111] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#00e5ff]/50 transition-colors"
                  />
                </div>
              </div>

              {/* E-mail da Compra */}
              <div>
                <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block mb-1.5">
                  E-mail da Compra *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@gmail.com"
                    className="w-full bg-[#111] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#00e5ff]/50 transition-colors"
                  />
                </div>
              </div>

              {/* Data da Compra */}
              <div>
                <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block mb-1.5">
                  Data da Compra *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Motivo do Reembolso */}
              <div>
                <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block mb-1.5">
                  Motivo da Solicitação *
                </label>
                <textarea
                  required
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Explique o motivo do cancelamento e reembolso..."
                  className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#00e5ff]/50 transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#00e5ff] to-[#00ff66] text-black font-black uppercase tracking-wider text-xs py-3.5 rounded-xl hover:opacity-95 hover:scale-[1.01] transition-all shadow-lg shadow-[#00e5ff]/20 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Registrando Solicitação...' : 'Confirmar e Enviar Solicitação'}
                </button>

                <button
                  type="button"
                  onClick={() => setView('menu')}
                  className="w-full text-xs font-bold text-white/40 hover:text-white py-2 transition-colors text-center"
                >
                  Voltar para o menu de suporte
                </button>
              </div>

            </form>
          )}

          {/* VIEW: STATUS / DETALHES DO REEMBOLSO (Personalizado com o nome do cliente e informações corretas) */}
          {view === 'details' && userRefund && (
            <div className="space-y-4">
              
              {/* Card Header Status com nome dinâmico do cliente */}
              <div className="p-4 rounded-2xl bg-[#00e5ff]/10 border border-[#00e5ff]/20 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00e5ff] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-white mb-0.5">
                    Olá, <span className="text-[#00e5ff]">{userRefund.name}</span>! Sua solicitação foi registrada.
                  </p>
                  <p className="text-white/60 leading-relaxed">
                    Sua solicitação já foi registrada e está em análise. Os dados da compra em <strong className="text-white">{userRefund.purchaseDate}</strong> vinculados ao e-mail <strong className="text-white">{userRefund.email}</strong> foram encaminhados para a equipe financeira.
                  </p>
                </div>
              </div>

              {/* Prazos e como funciona o estorno (Exatamente como o print) */}
              <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs">
                <div className="text-[11px] font-bold uppercase tracking-wider text-white/40 flex items-center gap-1.5 mb-2">
                  <Clock className="w-3.5 h-3.5 text-[#ffaa00]" />
                  Prazos e como funciona o estorno:
                </div>

                <div className="flex items-start gap-2.5 text-white/80">
                  <Mail className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="text-white">Resposta por e-mail:</strong> em até <span className="text-[#00e5ff] font-bold">7 dias úteis</span> você receberá um e-mail com a confirmação e detalhes.
                  </p>
                </div>

                <div className="flex items-start gap-2.5 text-white/80">
                  <CreditCard className="w-4 h-4 text-[#ffaa00] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="text-white">Cartão de Crédito:</strong> o estorno constará na fatura atual ou na próxima.
                  </p>
                </div>

                <div className="flex items-start gap-2.5 text-white/80">
                  <Zap className="w-4 h-4 text-[#00ff66] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="text-white">Pix:</strong> o prazo para o valor cair na sua conta é de até <span className="text-[#00ff66] font-bold">7 dias</span>.
                  </p>
                </div>
              </div>

              {/* Link direto para o suporte no WhatsApp */}
              <a
                href="https://w.app/gabimvz"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 flex items-center justify-between text-xs text-[#25D366] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span className="font-bold">Falar com o Suporte no WhatsApp</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Warning Alert Box */}
              <div className="p-3.5 rounded-2xl bg-[#ffaa00]/10 border border-[#ffaa00]/25 flex items-start gap-2.5 text-xs text-[#ffaa00]">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11px]">
                  <strong>Importante:</strong> Não é necessário solicitar novamente, enviar novas mensagens ou perguntar sobre o andamento. Mensagens repetidas podem atrasar o atendimento.
                </p>
              </div>

              <p className="text-[11px] text-white/40 text-center">
                Fique atento(a) à caixa de entrada e também à pasta de <strong className="text-white/60">Spam / Promoções</strong> do seu e-mail.
              </p>

              {/* Bottom Buttons */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={close}
                  className="w-full bg-[#00e5ff] hover:bg-[#00c3d9] text-black font-black uppercase tracking-wider text-xs py-3 rounded-xl transition-all shadow-md shadow-[#00e5ff]/20 flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Entendido, fechar
                </button>

                <button
                  type="button"
                  onClick={handleCancelRefund}
                  className="w-full bg-[#ffaa00] hover:bg-[#e69900] text-black font-black uppercase tracking-wider text-xs py-3 rounded-xl transition-all shadow-md shadow-[#ffaa00]/20 flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  Cancelar reembolso
                </button>
              </div>

              <button
                type="button"
                onClick={() => setView('menu')}
                className="w-full text-[11px] font-bold text-white/40 hover:text-white py-1 transition-colors text-center block"
              >
                ← Voltar para o menu de suporte
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
