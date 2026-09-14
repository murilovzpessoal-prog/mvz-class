import React, { useState, useEffect } from 'react';
import { Target, Trophy, Flame, Rocket, DollarSign, TrendingUp, CheckCircle2, Plus, ArrowLeft, Lightbulb, Play, ChevronRight, Zap } from 'lucide-react';

export function Jornada() {
  const [view, setView] = useState<'selection' | 'dashboard'>('selection');
  const [activeGoal, setActiveGoal] = useState<number | null>(null);
  const [revenue, setRevenue] = useState('');

  // Stats persisting
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('mvz_jornada_stats_v2');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return {
      1: { chartData: [0, 0, 0, 0, 0, 0, 0], total: 0 },
      2: { chartData: [0, 0, 0, 0, 0, 0, 0], total: 0 },
      3: { chartData: [0, 0, 0, 0, 0, 0, 0], total: 0 }
    };
  });

  const handleRegisterRevenue = () => {
    if (!revenue || !activeGoal) return;
    const valueStr = revenue.replace(/\./g, '').replace(',', '.');
    const value = parseFloat(valueStr);
    if (isNaN(value) || value <= 0) return;

    setStats(prev => {
      const currentGoalStats = prev[activeGoal];
      const newChartData = [...currentGoalStats.chartData];
      
      // Update today's bar
      newChartData[newChartData.length - 1] += value;
      
      const newTotal = currentGoalStats.total + value;
      
      const nextStats = {
        ...prev,
        [activeGoal]: {
          chartData: newChartData,
          total: newTotal
        }
      };
      
      localStorage.setItem('mvz_jornada_stats_v2', JSON.stringify(nextStats));
      return nextStats;
    });
    
    setRevenue(''); // Clear input
  };

  const formatCurrency = (val) => {
    return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const goals = [
    {
      id: 1, icon: Target,
      title: 'Missão Iniciante',
      amount: '1K',
      period: 'por mês',
      image: 'https://i.imgur.com/Ewrl5P1.png',
      colorHex: '#cbd5e1', // Cinza / Prata (combinando com o símbolo)
      bgGradient: 'from-[#cbd5e1]/20 to-transparent',
      tips: 'Não tente acertar um vídeo perfeito. Encontre um formato replicável, teste produtos todos os dias e, quando uma combinação vender, pare de procurar novidade e escale o que funcionou.',
      plan: [
        { title: 'Domine o formato que mais converte', desc: 'Assista ao módulo Estilo POV e escolha uma estrutura de vídeo para replicar.' },
        { title: 'Escolha 3 produtos para atacar', desc: 'Selecione 3 produtos validados, com potencial de venda, e concentre sua produção neles. Nada de testar 15 produtos ao mesmo tempo.' },
        { title: 'Entre em modo de execução', desc: 'Publique 3 vídeos por dia, utilizando os formatos ensinados, e registre diariamente seu resultado no painel.' },
        { title: 'Identifique o vencedor e escale', desc: 'Ao encontrar produto ou vídeo gerando vendas, assista ao módulo Escala e multiplique o que funcionou até alcançar R$1.000 no mês.' },
      ],
      chartData: [0, 50, 120, 80, 200, 150, 400] // sample
    },
    {
      id: 2, icon: Rocket,
      title: 'Missão Intermediária',
      amount: '1K',
      period: 'por semana',
      image: 'https://i.imgur.com/BX2AO1g.png',
      colorHex: '#22c55e', // Verde (combinando com o símbolo esmeralda)
      bgGradient: 'from-[#22c55e]/20 to-transparent',
      tips: 'Agora o foco é repetição inteligente. Identifique os produtos e formatos que já venderam, replique os padrões vencedores e aumente o volume.',
      plan: [
        { title: 'Identifique o que já vendeu', desc: 'Analise seus últimos vídeos e encontre os produtos, formatos e hooks que mais geraram vendas.' },
        { title: 'Transforme acertos em padrão', desc: 'Crie novas variações dos vídeos vencedores, mantendo produto, estrutura e abordagem que já funcionaram.' },
        { title: 'Aumente o volume de conteúdo', desc: 'Publique de 6 a 9 vídeos por dia, no mínimo, priorizando os produtos e formatos que já demonstraram potencial de venda.' },
        { title: 'Escale até R$1K na semana', desc: 'Assista ao módulo Escala, aumente a produção dos vencedores e acompanhe diariamente seus ganhos no painel.' },
      ],
      chartData: [150, 300, 280, 500, 450, 700, 1000] // sample
    },
    {
      id: 3, icon: Trophy,
      title: 'Missão Elite',
      amount: '1K',
      period: 'por dia',
      image: 'https://i.imgur.com/O1rTGPJ.png',
      colorHex: '#c026d3', // Roxo / Ametista (combinando com o símbolo diamante roxo)
      bgGradient: 'from-[#c026d3]/20 to-transparent',
      tips: 'Escala vem de teste e repetição. Teste constantemente novos produtos e ambientes. Quando encontrar o que vende, pare de tratar como teste e multiplique o vencedor.',
      plan: [
        { title: 'Teste produtos todos os dias', desc: 'Aumente seu volume de testes e experimente diferentes produtos diariamente. Quanto mais testes, maiores as chances de encontrar novos vencedores.' },
        { title: 'Teste produto + ambiente', desc: 'Não teste apenas o produto. Varie cenários, ambientes e formas de apresentação para descobrir qual combinação gera mais vendas.' },
        { title: 'Encontrou um vencedor? Replique', desc: 'Quando um produto começar a vender, multiplique imediatamente o que funcionou, criando novas variações sem abandonar a estrutura vencedora.' },
        { title: 'Entre em volume de escala', desc: 'Publique de 12 a 26 vídeos por dia, no mínimo, concentrando a produção nos produtos que já estão vendendo e mantendo novos testes constantemente.' },
      ],
      chartData: [500, 800, 750, 900, 1200, 950, 1100] // sample
    }
  ];

  const handleSelectGoal = (id: number) => {
    setActiveGoal(id);
    setView('dashboard');
  };

  const handleBack = () => {
    setView('selection');
    setActiveGoal(null);
  };

  const selectedGoalData = activeGoal ? goals.find(g => g.id === activeGoal) : null;
  const currentStats = activeGoal ? stats[activeGoal] : null;
  const chartData = currentStats?.chartData || selectedGoalData?.chartData || [];
  const total30Days = currentStats?.total || 0;
  const maxChart = Math.max(...chartData, 1);

  // ================= VIEW 1: SELECTION =================
  if (view === 'selection') {
    return (
      <div className="w-full min-h-[calc(100vh-120px)] flex flex-col items-center justify-center relative">
        
        {/* Ambient Background Glows */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00e5ff]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ff007f]/10 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Top Banner Box */}
        <div className="relative z-10 max-w-6xl mx-auto mb-8 w-full px-4 animate-in fade-in slide-in-from-top-4 duration-700">
          {/* Subtle Outer glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#00e5ff]/10 to-[#ff007f]/5 rounded-2xl blur-xl" />
          
          {/* Glass frame */}
          <div className="relative p-[3px] rounded-2xl bg-white/5 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/20">
            {/* Top edge shine */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            
            <div className="relative w-full rounded-[13px] overflow-hidden z-10">
              <img 
                src="/banner-jornada.png" 
                alt="Banner Escolha seu Destino" 
                className="w-full h-[240px] md:h-auto md:aspect-auto object-cover"
              />
              
              {/* Overlay Gradient for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

              {/* Overlay Text */}
              <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-3xl">
                <div className="flex flex-col gap-4 md:gap-5">
                  <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-max shadow-xl">
                    <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-white/70">Plano de Ação</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tighter drop-shadow-2xl leading-[1.05]">
                    DEFINA A META.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#f43f5e]">
                      ACERTE O ALVO.
                    </span>
                  </h1>
                  
                  <p className="text-white/60 font-medium max-w-md text-sm md:text-base leading-relaxed drop-shadow-lg">
                    A estratégia é o seu arco. A execução é a sua flecha. Escolha o seu próximo destino abaixo e destrave o mapa tático para chegar lá.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl px-4 relative z-10">
          
          {goals.map((goal) => (
            <div 
              key={goal.id}
              onClick={() => handleSelectGoal(goal.id)}
              className="group relative w-full h-[400px] md:h-auto md:aspect-[4/5] rounded-3xl p-[1px] cursor-pointer overflow-hidden transition-all duration-700 hover:-translate-y-4 hover:scale-[1.02] flex-shrink-0 shadow-2xl"
              style={{
                boxShadow: `0 20px 40px -10px ${goal.colorHex}20`
              }}
            >
              <div className="relative w-full h-full bg-[#050505] rounded-[32px] overflow-hidden flex flex-col z-10 p-[2px]">
                
                {/* Imagem Nativa (Proporção Exata 4:5 Fornecida Pelo Usuário) */}
                <img 
                  src={goal.image} 
                  alt={goal.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 z-10 opacity-90 group-hover:scale-105 group-hover:opacity-100" 
                />

                {/* Degradê apenas no rodapé para o botão */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />

                <div className="relative z-20 flex flex-col h-full p-6">
                  {/* Escrita Minimalista */}
                  <div className="flex flex-col items-center text-center mt-2">
                    <span 
                      className="text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                      style={{ color: goal.colorHex }}
                    >
                      {goal.amount} {goal.period}
                    </span>
                  </div>

                  {/* Spacer empurrando o botão pro final */}
                  <div className="flex-1" />

                  {/* Action Button no Rodapé */}
                  <button 
                    className="w-full py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-700 flex items-center justify-center gap-2 shadow-2xl overflow-hidden border bg-black/40 backdrop-blur-md hover:bg-black/80"
                    style={{
                      borderColor: `${goal.colorHex}50`,
                      color: goal.colorHex,
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
                      <Zap className="w-4 h-4" />
                      Ativar Missão
                    </span>
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" 
                      style={{ backgroundColor: goal.colorHex }}
                    />
                  </button>
                </div>
              </div>
              
            </div>
          ))}

        </div>
      </div>
    );
  }

  // ================= VIEW 2: DEDICATED DASHBOARD =================
  if (!selectedGoalData) return null;

  return (
    <div className="w-full max-w-[1400px] mx-auto pb-10">
      
      {/* Back button & Header Area */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div>
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-3 md:mb-6 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Escolha de Metas
          </button>
          
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border shadow-xl"
              style={{ backgroundColor: `${selectedGoalData.colorHex}10`, borderColor: `${selectedGoalData.colorHex}40` }}
            >
              <selectedGoalData.icon className="w-6 h-6 md:w-8 md:h-8" style={{ color: selectedGoalData.colorHex, filter: `drop-shadow(0 0 15px ${selectedGoalData.colorHex})` }} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: selectedGoalData.colorHex }}>
                Missão Ativa
              </span>
              <h1 className="text-2xl md:text-5xl font-black text-white tracking-tight flex items-baseline gap-3 mt-1">
                {selectedGoalData.amount} <span className="text-lg md:text-2xl text-white/40 font-medium uppercase tracking-widest">{selectedGoalData.period}</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: Action Plan & Tips */}
        <div className="xl:col-span-1 flex flex-col gap-4 md:gap-6">
          
          {/* Tip Card */}
          <div className="bg-[#050505] border rounded-[20px] md:rounded-3xl p-5 md:p-6 relative overflow-hidden" style={{ borderColor: `${selectedGoalData.colorHex}30` }}>
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Lightbulb className="w-24 h-24" style={{ color: selectedGoalData.colorHex }} />
            </div>
            <div className="relative z-10">
              <h3 className="text-sm font-black uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" style={{ color: selectedGoalData.colorHex }} />
                Dica da Missão
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {selectedGoalData.tips}
              </p>
            </div>
          </div>

          {/* Action Plan */}
          <div className="bg-[#050505] border border-white/5 rounded-[20px] md:rounded-3xl p-5 md:p-7 flex-1">
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6" style={{ color: selectedGoalData.colorHex }} />
              Mapa de Execução
            </h2>
            
            <div className="space-y-5 md:space-y-6">
              {selectedGoalData.plan.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start group relative">
                  {/* Vertical line connecting steps */}
                  {idx !== selectedGoalData.plan.length - 1 && (
                    <div className="absolute left-[13px] top-8 bottom-[-20px] md:bottom-[-24px] w-[2px] bg-white/5" />
                  )}
                  <div 
                    className="w-7 h-7 rounded-full bg-[#111] border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 relative z-10"
                    style={{ borderColor: `${selectedGoalData.colorHex}60` }}
                  >
                    <span className="text-[11px] font-black" style={{ color: selectedGoalData.colorHex }}>
                      {idx + 1}
                    </span>
                  </div>
                  <div className="flex flex-col pt-0.5">
                    <span className="text-[14px] text-white font-bold mb-1">{step.title}</span>
                    <span className="text-[13px] text-white/60 leading-relaxed pr-4">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Gamification Dashboard */}
        <div className="xl:col-span-2 flex flex-col gap-4 md:gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            
            {/* Log Revenue Input Card */}
            <div className="bg-[#050505] border border-white/5 rounded-[20px] md:rounded-3xl p-5 md:p-7 flex flex-col justify-center relative overflow-hidden">
              <span className="text-xs font-bold uppercase text-white/40 tracking-widest mb-4 block">Registrar Ganhos Hoje</span>
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-white/40 font-bold text-lg">R$</span>
                  </div>
                  <input 
                    type="text" 
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value.replace(/[^0-9,]/g, ""))}
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white text-xl font-black focus:outline-none transition-colors shadow-inner"
                    style={{ focus: { borderColor: selectedGoalData.colorHex } } as any}
                    placeholder="0,00"
                  />
                </div>
                <button 
                  onClick={handleRegisterRevenue}
                  className="text-black w-14 h-14 rounded-2xl flex items-center justify-center hover:scale-105 transition-all shrink-0 active:scale-95"
                  style={{ backgroundColor: selectedGoalData.colorHex, boxShadow: `0 0 20px ${selectedGoalData.colorHex}60` }}
                >
                  <Plus className="w-7 h-7" strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* Total 30 Days Card */}
            <div className="bg-[#050505] border border-white/5 rounded-3xl p-7 flex items-center justify-between relative overflow-hidden">
              <div 
                className="absolute -bottom-16 -right-16 w-48 h-48 blur-[70px] opacity-20 rounded-full" 
                style={{ backgroundColor: selectedGoalData.colorHex }}
              />
              
              <div className="relative z-10">
                <span className="text-xs font-bold uppercase text-white/40 tracking-widest mb-3 block">Total últimos 30 Dias</span>
                <h3 className="text-4xl font-black text-white tracking-tight drop-shadow-md">
                  R$ {formatCurrency(total30Days).split(',')[0]}<span className="text-xl text-white/40">,{formatCurrency(total30Days).split(',')[1]}</span>
                </h3>
              </div>
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center border relative z-10"
                style={{ backgroundColor: `${selectedGoalData.colorHex}10`, borderColor: `${selectedGoalData.colorHex}30` }}
              >
                <DollarSign className="w-7 h-7" style={{ color: selectedGoalData.colorHex }} strokeWidth={2.5} />
              </div>
            </div>

          </div>

          {/* Gamified Chart Area */}
          <div className="bg-[#050505] border border-white/5 rounded-3xl p-8 flex-1 flex flex-col min-h-[300px]">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-lg font-bold text-white">Evolução Diária</h3>
                <span className="text-sm text-white/40">Últimos 7 dias registrados</span>
              </div>
              <div 
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border"
                style={{ backgroundColor: `${selectedGoalData.colorHex}10`, borderColor: `${selectedGoalData.colorHex}30` }}
              >
                <TrendingUp className="w-4 h-4" style={{ color: selectedGoalData.colorHex }} />
                <span className="text-xs font-bold" style={{ color: selectedGoalData.colorHex }}>+12% vs semana passada</span>
              </div>
            </div>
            
            <div className="flex-1 flex items-end gap-4 md:gap-8 mt-2 relative">
              {/* Horizontal guide lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="border-t border-white/5 w-full"></div>
                <div className="border-t border-white/5 w-full"></div>
                <div className="border-t border-white/5 w-full"></div>
                <div className="border-t border-white/5 w-full"></div>
              </div>

              {chartData.map((val, i) => {
                const height = (val / maxChart) * 100;
                const isLast = i === chartData.length - 1;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-4 relative z-10 group h-full justify-end">
                    {/* Hover tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-md transition-opacity whitespace-nowrap shadow-xl">
                      R$ {formatCurrency(val)}
                    </div>

                    {/* Bar container */}
                    <div className="w-full bg-[#0a0a0f] rounded-t-xl relative flex items-end overflow-hidden group-hover:bg-[#111] transition-colors" style={{ height: '100%' }}>
                      <div 
                        className={`w-full rounded-t-xl transition-all duration-1000 ease-out`}
                        style={{ 
                          height: `${height}%`,
                          backgroundColor: isLast ? selectedGoalData.colorHex : 'rgba(255,255,255,0.1)',
                          opacity: isLast ? 1 : 0.5
                        }}
                      >
                        {isLast && (
                          <div className="absolute top-0 inset-x-0 h-1 bg-white" style={{ boxShadow: `0 0 15px ${selectedGoalData.colorHex}` }} />
                        )}
                      </div>
                    </div>
                    {/* Label */}
                    <span className="text-xs text-white/50 font-bold uppercase tracking-widest">
                      {isLast ? 'Hoje' : `D-${chartData.length - 1 - i}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
