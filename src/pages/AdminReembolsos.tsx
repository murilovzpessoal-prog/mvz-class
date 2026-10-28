import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  RotateCcw, 
  Users, 
  Search, 
  RefreshCw, 
  Trash2, 
  Copy, 
  Check, 
  ArrowLeft, 
  LogOut, 
  Clock, 
  Calendar, 
  Mail, 
  ShieldCheck,
  XCircle,
  FileText
} from 'lucide-react';
import { getStoredRefunds, saveStoredRefunds, type RefundRequest } from '../components/HelpRefundModal';

export function AdminReembolsos() {
  const navigate = useNavigate();
  const [refunds, setRefunds] = useState<RefundRequest[]>([]);
  const [activeTab, setActiveTab] = useState<'todos' | 'em_analise' | 'cancelados'>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Initial mock fallback if empty
  const loadData = () => {
    let list = getStoredRefunds();
    if (list.length === 0) {
      const demoList: RefundRequest[] = [
        {
          id: 'ref_1',
          name: 'Eliete de Jesus barbosa',
          email: 'elietedejesusbarbosa26@gmail.com',
          purchaseDate: '25/10/2026',
          reason: 'O aplicativo não funciona. Quero meu dinheiro de volta.',
          requestedAt: '2026-10-28T13:03:00.000Z',
          status: 'em_analise'
        },
        {
          id: 'ref_2',
          name: 'Sheila Fonseca de Castro',
          email: 'acessocursos77@gmail.com',
          purchaseDate: '20/10/2026',
          reason: 'Não desejo prosseguir por esse caminho, que essa ferramenta trabalha, estou dentro do prazo de 7 dias.',
          requestedAt: '2026-10-26T18:56:00.000Z',
          status: 'em_analise'
        }
      ];
      saveStoredRefunds(demoList);
      list = demoList;
    }
    setRefunds(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCopy = (r: RefundRequest) => {
    const text = `Solicitação de Reembolso MVZ:
Nome: ${r.name}
E-mail: ${r.email}
Data da Compra: ${r.purchaseDate}
Motivo: ${r.reason}
Solicitado em: ${new Date(r.requestedAt).toLocaleString('pt-BR')}`;
    
    navigator.clipboard.writeText(text);
    setCopiedId(r.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRemove = (id: string) => {
    if (!window.confirm('Deseja realmente concluir e remover esta solicitação da lista?')) return;
    const updated = refunds.filter(r => r.id !== id);
    saveStoredRefunds(updated);
    setRefunds(updated);
  };

  const filtered = refunds.filter(r => {
    if (activeTab === 'em_analise' && r.status !== 'em_analise') return false;
    if (activeTab === 'cancelados' && r.status !== 'cancelado') return false;
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.purchaseDate.includes(q)
    );
  });

  const totalEmAnalise = refunds.filter(r => r.status === 'em_analise').length;
  const totalCancelados = refunds.filter(r => r.status === 'cancelado').length;

  return (
    <div className="min-h-screen bg-[#030303] text-white p-4 sm:p-8 flex flex-col items-center">
      
      {/* Container */}
      <div className="w-full max-w-4xl space-y-6">
        
        {/* Top Header Card */}
        <div className="bg-[#0c0c0e] border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff] shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-white">Painel Admin</h1>
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#00ff66]/15 text-[#00ff66] border border-[#00ff66]/30 px-2 py-0.5 rounded-full">
                  Administrador
                </span>
              </div>
              <p className="text-xs text-white/50 mt-0.5">
                Gerencie solicitações de reembolso e clientes da plataforma
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => navigate('/')}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Ir para o App
            </button>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-bold text-red-400 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sair
            </button>
          </div>
        </div>

        {/* Top Stats Tab Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button 
            className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-[#ffaa00] to-[#ff8800] text-black font-black shadow-lg shadow-[#ffaa00]/20 transition-transform cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider">Solicitações de Reembolso</span>
            <span className="bg-black/30 text-white text-xs px-2.5 py-0.5 rounded-full">
              {refunds.length}
            </span>
          </button>

          <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-[#0c0c0e] border border-white/10 text-white/60 font-bold">
            <Users className="w-5 h-5 text-white/40" />
            <span className="text-sm">Clientes Liberados</span>
            <span className="bg-white/10 text-white text-xs px-2.5 py-0.5 rounded-full">
              357
            </span>
          </div>
        </div>

        {/* Filter bar and Search */}
        <div className="bg-[#0c0c0e] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar por nome, e-mail ou data..."
                className="w-full bg-[#050505] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#00e5ff]/50 transition-colors"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-white/50 font-bold">
                Total: <strong className="text-white">{filtered.length}</strong>
              </span>

              <button
                onClick={loadData}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Atualizar
              </button>
            </div>

          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
            <button
              onClick={() => setActiveTab('todos')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'todos'
                  ? 'bg-white/20 text-white'
                  : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
              }`}
            >
              Todos ({refunds.length})
            </button>

            <button
              onClick={() => setActiveTab('em_analise')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'em_analise'
                  ? 'bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/40'
                  : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
              Em Análise ({totalEmAnalise})
            </button>

            <button
              onClick={() => setActiveTab('cancelados')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'cancelados'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                  : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              Pedidos Cancelados ({totalCancelados})
            </button>
          </div>

        </div>

        {/* Refunds List Cards */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="bg-[#0c0c0e] border border-white/10 rounded-2xl p-12 text-center text-white/40">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-bold text-white/70">Nenhuma solicitação encontrada</p>
              <p className="text-xs mt-1">Nenhum reembolso coincide com os filtros selecionados.</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="bg-[#0c0c0e] border border-[#ffaa00]/30 hover:border-[#ffaa00]/60 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-xl relative overflow-hidden"
              >
                
                {/* Header row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-black text-white">{item.name}</h3>
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                        item.status === 'em_analise'
                          ? 'bg-[#00ff66]/15 text-[#00ff66] border border-[#00ff66]/30'
                          : 'bg-red-500/15 text-red-400 border border-red-500/30'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {item.status === 'em_analise' ? 'Em Análise' : 'Cancelado pelo Aluno'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-white/60 mt-1">
                      <Mail className="w-3.5 h-3.5 text-white/40" />
                      <span>{item.email}</span>
                    </div>
                  </div>

                  {/* Requested date */}
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 flex items-center gap-1 sm:justify-end">
                      <Clock className="w-3 h-3 text-[#ffaa00]" />
                      Solicitado em:
                    </span>
                    <span className="text-xs font-black text-[#ffaa00]">
                      {new Date(item.requestedAt).toLocaleDateString('pt-BR')} às {new Date(item.requestedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                {/* Info Pill */}
                <div className="mb-4">
                  <div className="bg-[#050505] border border-white/5 rounded-xl p-3 flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[#00e5ff] shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-white/40 block">Data da Compra Informada:</span>
                      <span className="text-xs font-bold text-white">{item.purchaseDate}</span>
                    </div>
                  </div>
                </div>

                {/* Motivo do Reembolso */}
                <div className="mb-5">
                  <span className="text-[11px] font-bold text-[#ffaa00] uppercase tracking-wider flex items-center gap-1 mb-1.5">
                    <RotateCcw className="w-3 h-3" />
                    Motivo do Reembolso:
                  </span>
                  <div className="bg-[#050505] border border-white/5 rounded-xl p-3.5 text-xs text-white/80 leading-relaxed">
                    {item.reason}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <button
                    onClick={() => handleCopy(item)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all cursor-pointer"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#00ff66]" />
                        <span className="text-[#00ff66]">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Dados</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-bold text-red-400 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Concluir / Remover</span>
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}
