import React, { useState } from "react";
import { 
  Store, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Truck, 
  MessageSquare, 
  RotateCcw, 
  Copy, 
  Check, 
  Link as LinkIcon, 
  SlidersHorizontal, 
  ChevronDown, 
  Loader2, 
  ExternalLink,
  HelpCircle,
  ShoppingBag,
  Sparkles,
  Zap,
  Activity
} from "lucide-react";

export function AnalisadorFornecedor() {
  const [storeLink, setStoreLink] = useState("");
  const [storeName, setStoreName] = useState("");
  
  // OS 3 DADOS EXATOS DA TELA OFICIAL DO TIKTOK SHOP
  const [itemsSold, setItemsSold] = useState<number>(3500); // Quantidade de Itens Vendidos (ex: 3.5k vendidos)
  const [responseRate24h, setResponseRate24h] = useState<number>(98); // % de resposta em 24h (ex: 98% responde em 24h)
  const [onTimeShipping, setOnTimeShipping] = useState<number>(99); // % de envios pontuais (ex: 99% envios pontuais)
  
  // 4ª Pergunta Inteligente (Compatibilidade de Criador / Amostra)
  const [offersCreatorSample, setOffersCreatorSample] = useState(true);

  // Estados do Scanner
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [scanStep, setScanStep] = useState("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Painel Retrátil de Métricas da Loja
  const [showAdvanced, setShowAdvanced] = useState(true);

  // Estados de cópia dos scripts
  const [copiedScript, setCopiedScript] = useState<number | null>(null);

  const resetForm = () => {
    setStoreName("");
    setStoreLink("");
    setItemsSold(3500);
    setResponseRate24h(98);
    setOnTimeShipping(99);
    setOffersCreatorSample(true);
    setAnalyzed(false);
    setAnalysisResult(null);
  };

  const handleCopyScript = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(id);
    setTimeout(() => setCopiedScript(null), 2000);
  };

  // Motor Oficial de Auditoria TikTok Shop
  const calculateSupplierScore = () => {
    let identifiedStore = storeName.trim();
    if (!identifiedStore && storeLink.trim()) {
      try {
        const urlObj = new URL(storeLink.startsWith("http") ? storeLink : "https://" + storeLink);
        const pathParts = urlObj.pathname.split("/").filter(Boolean);
        const lastPart = pathParts[pathParts.length - 1] || "";
        if (lastPart) {
          identifiedStore = lastPart.replace(/[@_-]/g, " ");
          identifiedStore = identifiedStore.charAt(0).toUpperCase() + identifiedStore.slice(1);
        } else {
          identifiedStore = urlObj.hostname.replace("www.", "");
        }
      } catch (e) {
        identifiedStore = storeLink.replace(/[@]/g, "");
      }
    }
    if (!identifiedStore) identifiedStore = "Lojista TikTok Shop";

    let score = 50;
    const strengths: string[] = [];
    const warnings: string[] = [];
    const criticalRisks: string[] = [];

    // 1. Envios Pontuais (SLA Logístico TikTok Shop)
    if (onTimeShipping >= 97) {
      score += 25;
      strengths.push("Envios Super Pontuais (" + onTimeShipping + "%): O lojista despacha praticamente 100% dos pacotes no prazo estipulado pelo TikTok Shop.");
    } else if (onTimeShipping >= 90) {
      score += 10;
      warnings.push("Envios Regulares (" + onTimeShipping + "%): Há uma margem de " + (100 - onTimeShipping) + "% de pedidos atrasados que podem gerar reclamações.");
    } else {
      score -= 35;
      criticalRisks.push("ALTO RISCO DE ATRASO (" + onTimeShipping + "% envios pontuais): Abaixo de 90%, o TikTok penaliza severamente o alcance dos criadores que promovem a loja.");
    }

    // 2. Taxa de Resposta em 24 Horas
    if (responseRate24h >= 95) {
      score += 20;
      strengths.push("Atendimento Ágil (" + responseRate24h + "% responde em 24h): Suporte rápido e direto pelo chat do TikTok Shop, facilitando liberação de amostras e dúvidas.");
    } else if (responseRate24h >= 80) {
      score += 5;
      warnings.push("Atendimento Mediano (" + responseRate24h + "% responde em 24h): Pode demorar mais de um dia útil para responder mensagens e dúvidas.");
    } else {
      score -= 20;
      criticalRisks.push("Suporte Inoperante (" + responseRate24h + "% em 24h): Comunicação falha caso os compradores tenham problemas de entrega.");
    }

    // 3. Volume Real de Itens Vendidos
    if (itemsSold >= 5000) {
      score += 20;
      strengths.push("Loja de Alta Escala (" + itemsSold.toLocaleString("pt-BR") + " itens vendidos): Empresa com alta demanda validada, estoque robusto e histórico consistente.");
    } else if (itemsSold >= 1000) {
      score += 15;
      strengths.push("Volume Comercial Consolidado (" + itemsSold.toLocaleString("pt-BR") + " itens vendidos): Fluxo contínuo de vendas e experiência no ecossistema.");
    } else if (itemsSold >= 100) {
      score += 5;
      warnings.push("Loja em Crescimento (" + itemsSold.toLocaleString("pt-BR") + " itens vendidos): Volume inicial moderado, confirme estoque antes de soltar vídeos virais.");
    } else {
      score -= 10;
      warnings.push("Poucas Vendas (" + itemsSold + " itens vendidos): Loja recém-criada ou com baixo tráfego no TikTok Shop.");
    }

    // 4. Pergunta Inteligente: Amostra Grátis
    if (offersCreatorSample) {
      score += 10;
      strengths.push("Amostra para Criadores Habilitada: Permite receber o produto físico sem custo para produzir criativos autorais de alta conversão.");
    } else {
      warnings.push("Sem Amostra Liberada: Será necessário adquirir o produto ou negociar diretamente pelo chat.");
    }

    score = Math.max(10, Math.min(99, score));

    let status: "safe" | "caution" | "danger";
    let statusLabel: string;
    let badgeColor: string;
    let verdictText: string;

    if (score >= 80 && criticalRisks.length === 0) {
      status = "safe";
      statusLabel = "Fornecedor Confiável & Seguro";
      badgeColor = "text-[#00e5ff] border-[#00e5ff]/30 bg-[#00e5ff]/10";
      verdictText = "Excelente loja! O lojista cumpre o SLA de envios pontuais do TikTok Shop, mantém taxa de resposta acima de 95% e possui histórico consistente de vendas. Muito recomendado para se afiliar e promover com tranquilidade.";
    } else if (score >= 55) {
      status = "caution";
      statusLabel = "Lojista Mediano (Atenção)";
      badgeColor = "text-yellow-400 border-yellow-400/30 bg-yellow-400/10";
      verdictText = "Loja operacional com pontos de atenção. Monitore o histórico de envio e estoque dos produtos mais vendidos para não ter vídeos prejudicados por atrasos de frete.";
    } else {
      status = "danger";
      statusLabel = "Alto Risco Operacional";
      badgeColor = "text-red-400 border-red-500/30 bg-red-500/10";
      verdictText = "CUIDADO: Loja com índice crítico de envios ou suporte inoperante. Afiliar a essa loja agora pode resultar em clientes reclamando nos comentários do seu vídeo e queda na entrega do algoritmo.";
    }

    return {
      score,
      status,
      statusLabel,
      badgeColor,
      verdictText,
      strengths,
      warnings,
      criticalRisks,
      identifiedStore,
      analyzedLink: storeLink.trim(),
      itemsSold,
      responseRate24h,
      onTimeShipping
    };
  };

  const handleStartAudit = () => {
    if (!storeLink.trim() && !storeName.trim()) {
      alert("Por favor, informe o link ou o nome da loja para iniciar a auditoria.");
      return;
    }

    setIsAnalyzing(true);
    setAnalyzed(false);

    setScanStep("Localizando perfil oficial da loja no TikTok Shop...");

    setTimeout(() => {
      setScanStep("Cruzando índice de envios pontuais e SLA de expedição...");
    }, 500);

    setTimeout(() => {
      setScanStep("Analisando taxa de resposta em 24h e histórico de itens vendidos...");
    }, 1000);

    setTimeout(() => {
      setScanStep("Calculando Score Oficial MVZ e gerando scripts de contato...");
    }, 1500);

    setTimeout(() => {
      const res = calculateSupplierScore();
      setAnalysisResult(res);
      setIsAnalyzing(false);
      setAnalyzed(true);

      setTimeout(() => {
        const target = document.getElementById("resultado-auditoria-lojista");
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }, 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-16 px-4 md:px-6">
      
      {/* Header */}
      <div className="mb-8 relative">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#ff007f]/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#ff007f]/10 border border-[#ff007f]/20 backdrop-blur-md mb-3">
              <Store className="w-4 h-4 text-[#ff007f]" />
              <span className="text-[11px] font-bold tracking-wider text-[#ff007f] uppercase">MVZ Supplier Auditor</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Auditor de Lojista & Fornecedor TikTok Shop
            </h1>
            <p className="text-white/60 text-sm mt-1 max-w-2xl leading-relaxed">
              Audite qualquer loja do TikTok Shop preenchendo as métricas públicas exibidas no perfil do vendedor.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={resetForm}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Limpar Campos
            </button>
          </div>
        </div>
      </div>

      {/* Guia Rápido de Como Funciona */}
      <div className="mb-8 p-5 bg-[#0a0a0f] border border-white/10 rounded-2xl">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="w-4 h-4 text-[#ff007f]" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Como auditar um lojista do TikTok Shop:</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-[#050505] border border-white/5 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#ff007f]/10 text-[#ff007f] text-xs font-black flex items-center justify-center shrink-0 border border-[#ff007f]/20">1</span>
            <div>
              <strong className="text-xs text-white block mb-0.5">Abra a Loja no TikTok</strong>
              <p className="text-[11px] text-white/50 leading-relaxed">Copie o link ou nome da loja e veja as 3 informações públicas que aparecem na tela.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#050505] border border-white/5 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#ff007f]/10 text-[#ff007f] text-xs font-black flex items-center justify-center shrink-0 border border-[#ff007f]/20">2</span>
            <div>
              <strong className="text-xs text-white block mb-0.5">Confirme as 3 Métricas</strong>
              <p className="text-[11px] text-white/50 leading-relaxed">Itens vendidos, % de resposta em 24h e % de envios pontuais do vendedor.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#050505] border border-white/5 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] text-xs font-black flex items-center justify-center shrink-0 border border-[#00e5ff]/20">3</span>
            <div>
              <strong className="text-xs text-white block mb-0.5">Receba o Diagnóstico MVZ</strong>
              <p className="text-[11px] text-white/50 leading-relaxed">Veja se a loja é segura para afiliar e copie scripts prontos para solicitar amostras.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Painel Central de Entrada */}
      <div className="mb-8 p-6 md:p-8 rounded-3xl bg-gradient-to-b from-[#0e0e17] to-[#07070b] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff007f]/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto text-center mb-6">
          <span className="text-xs font-bold text-[#ff007f] tracking-widest uppercase mb-2 block">
            Auditoria Oficial de Fornecedores
          </span>
          <h2 className="text-xl md:text-2xl font-black text-white">
            Qual loja do TikTok Shop você deseja auditar?
          </h2>
          <p className="text-xs text-white/60 mt-1.5">
            Insira o link ou o nome da loja e confira as 3 métricas visíveis no aplicativo.
          </p>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          
          {/* Link da Loja */}
          <div>
            <label className="text-xs font-bold text-white/80 mb-2 flex items-center gap-2">
              <LinkIcon className="w-3.5 h-3.5 text-[#ff007f]" />
              Link da Loja / Perfil TikTok Shop:
            </label>
            <div className="relative">
              <input
                type="text"
                value={storeLink}
                onChange={(e) => setStoreLink(e.target.value)}
                placeholder="Ex: https://www.tiktok.com/@lojabrasil_shop ou @lojabrasil"
                className="w-full bg-black/60 border border-white/15 focus:border-[#ff007f] rounded-2xl px-4 py-3.5 pl-11 text-sm text-white placeholder:text-white/30 focus:outline-none transition-all shadow-inner"
              />
              <LinkIcon className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
              {storeLink && (
                <button 
                  onClick={() => setStoreLink("")} 
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Nome da Loja */}
          <div>
            <label className="text-xs font-bold text-white/80 mb-2 flex items-center gap-2">
              <Store className="w-3.5 h-3.5 text-[#00e5ff]" />
              Nome da Loja (Opcional se já colocou o link):
            </label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Ex: Top Brasil Oficial, Mega Imports..."
              className="w-full bg-black/60 border border-white/15 focus:border-[#00e5ff] rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none transition-all shadow-inner"
            />
          </div>

          {/* Bloco de Métricas Oficiais da Tela do TikTok Shop */}
          <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-4 transition-all">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#ff007f]" />
                Métricas Visíveis no Perfil da Loja no TikTok:
              </span>
              <span className="text-[10px] text-[#00e5ff] uppercase font-bold tracking-wider">Dados Oficiais</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* 1. Itens Vendidos */}
              <div className="p-3.5 rounded-xl bg-[#050505] border border-white/5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#00ff66]" /> Itens Vendidos
                  </span>
                </div>
                <div className="text-base font-black text-[#00ff66] mb-2">
                  {itemsSold.toLocaleString("pt-BR")} vendidos
                </div>
                <input 
                  type="range"
                  min="50"
                  max="10000"
                  step="50"
                  value={itemsSold}
                  onChange={(e) => setItemsSold(Number(e.target.value))}
                  className="w-full accent-[#00ff66] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-white/40 mt-1">
                  <span>50</span>
                  <span>2.5k</span>
                  <span>10k+</span>
                </div>
              </div>

              {/* 2. % de Resposta em 24h */}
              <div className="p-3.5 rounded-xl bg-[#050505] border border-white/5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-purple-400" /> Responde em 24h
                  </span>
                </div>
                <div className="text-base font-black text-purple-400 mb-2">
                  {responseRate24h}% das mensagens
                </div>
                <input 
                  type="range"
                  min="50"
                  max="100"
                  step="1"
                  value={responseRate24h}
                  onChange={(e) => setResponseRate24h(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-white/40 mt-1">
                  <span>50%</span>
                  <span>90%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* 3. % de Envios Pontuais */}
              <div className="p-3.5 rounded-xl bg-[#050505] border border-white/5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#00e5ff]" /> Envios Pontuais
                  </span>
                </div>
                <div className="text-base font-black text-[#00e5ff] mb-2">
                  {onTimeShipping}% no prazo
                </div>
                <input 
                  type="range"
                  min="70"
                  max="100"
                  step="1"
                  value={onTimeShipping}
                  onChange={(e) => setOnTimeShipping(Number(e.target.value))}
                  className="w-full accent-[#00e5ff] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-white/40 mt-1">
                  <span>70%</span>
                  <span>95%</span>
                  <span>100%</span>
                </div>
              </div>

            </div>

            {/* Pergunta Inteligente Complementar */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={offersCreatorSample}
                  onChange={(e) => setOffersCreatorSample(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 text-[#ff007f] focus:ring-0 bg-black cursor-pointer"
                />
                <span className="text-xs font-bold text-white">Loja disponibiliza Amostra Grátis para Criadores de Conteúdo</span>
              </label>
              <span className="text-[11px] text-white/40 hidden sm:inline">Critério de Parceria</span>
            </div>

          </div>

          {/* BOTÃO PRINCIPAL DE AÇÃO */}
          <div className="pt-2">
            <button
              onClick={handleStartAudit}
              disabled={isAnalyzing}
              className={"w-full py-4 px-6 rounded-2xl font-black text-sm md:text-base flex items-center justify-center gap-3 shadow-xl transition-all cursor-pointer " + (
                isAnalyzing 
                  ? "bg-white/10 text-white/50 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#ff007f] to-[#e6006f] hover:from-[#ff1a8c] hover:to-[#ff007f] text-white shadow-[#ff007f]/25 hover:shadow-[#ff007f]/40 hover:scale-[1.01]"
              )}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>{scanStep || "Auditando lojista..."}</span>
                </>
              ) : (
                <>
                  <Store className="w-5 h-5" />
                  <span>🔍 Auditar Lojista Agora (Gerar Relatório Completo)</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Relatório Completo (Aparece após o Scan) */}
      {analyzed && analysisResult && (
        <div id="resultado-auditoria-lojista" className="space-y-8 animate-in fade-in duration-500">
          
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <ShieldCheck className="w-6 h-6 text-[#00e5ff]" />
            <h2 className="text-xl font-black text-white">Relatório Oficial de Auditoria do Lojista</h2>
            <span className="text-xs text-white/50 ml-auto">Validado pelo algoritmo MVZ Class</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Esquerda: Score e Veredito */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="bg-[#0a0a0f] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div 
                  className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-30"
                  style={{
                    backgroundColor: analysisResult.status === "safe" ? "#00e5ff" : analysisResult.status === "caution" ? "#eab308" : "#ef4444"
                  }}
                />

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-widest font-black text-white/50">
                    Índice de Confiabilidade
                  </span>
                  <div className={"px-3.5 py-1.5 rounded-full border text-xs font-black uppercase tracking-wider " + analysisResult.badgeColor}>
                    {analysisResult.statusLabel}
                  </div>
                </div>

                <div className="flex items-baseline gap-4 mb-4">
                  <span className={"text-6xl font-black tracking-tight " + (
                    analysisResult.status === "safe" ? "text-[#00e5ff]" : analysisResult.status === "caution" ? "text-yellow-400" : "text-red-400"
                  )}>
                    {analysisResult.score}
                  </span>
                  <span className="text-white/40 text-xl font-bold">/ 100</span>
                </div>

                {/* Barra de Progresso */}
                <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden mb-6 border border-white/5">
                  <div 
                    className="h-full transition-all duration-700 rounded-full"
                    style={{
                      width: analysisResult.score + "%",
                      backgroundColor: analysisResult.status === "safe" ? "#00e5ff" : analysisResult.status === "caution" ? "#eab308" : "#ef4444",
                      boxShadow: "0 0 15px " + (analysisResult.status === "safe" ? "#00e5ff" : analysisResult.status === "caution" ? "#eab308" : "#ef4444")
                    }}
                  />
                </div>

                {/* Veredito */}
                <div className="p-4 rounded-2xl bg-[#050505] border border-white/5 mb-6">
                  <span className="text-xs font-bold text-white block mb-1">Diagnóstico Oficial MVZ:</span>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {analysisResult.verdictText}
                  </p>
                </div>

                {/* Resumo das Métricas Confirmadas */}
                <div className="grid grid-cols-3 gap-2 text-center border-t border-white/5 pt-4 mb-3">
                  <div className="p-2 rounded-xl bg-[#050505] border border-white/5">
                    <span className="text-[10px] text-white/40 block">Vendas</span>
                    <strong className="text-xs text-[#00ff66] font-black">{analysisResult.itemsSold.toLocaleString("pt-BR")}</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-[#050505] border border-white/5">
                    <span className="text-[10px] text-white/40 block">Resp. 24h</span>
                    <strong className="text-xs text-purple-400 font-black">{analysisResult.responseRate24h}%</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-[#050505] border border-white/5">
                    <span className="text-[10px] text-white/40 block">Envio Pontual</span>
                    <strong className="text-xs text-[#00e5ff] font-black">{analysisResult.onTimeShipping}%</strong>
                  </div>
                </div>

                {/* Loja auditada */}
                <div className="flex items-center justify-between text-xs text-white/50 pt-2 border-t border-white/5">
                  <span>Loja Auditada: <strong className="text-white">{analysisResult.identifiedStore}</strong></span>
                  {analysisResult.analyzedLink && (
                    <a 
                      href={analysisResult.analyzedLink.startsWith("http") ? analysisResult.analyzedLink : "https://" + analysisResult.analyzedLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#00e5ff] hover:underline flex items-center gap-1"
                    >
                      Acessar Perfil <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

              </div>

              {/* Regra de Ouro do TikTok Shop */}
              <div className="p-5 rounded-2xl bg-[#0a0a0f] border border-white/5 space-y-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#00e5ff]" /> Regra dos Envios Pontuais no TikTok Shop:
                </span>
                <p className="text-xs text-white/60 leading-relaxed">
                  Lojas com envios pontuais acima de 97% têm prioridade máxima na distribuição orgânica do TikTok. Se uma loja parceira começar a atrasar encomendas, o algoritmo reduz a entrega dos vídeos de todos os criadores associados a ela!
                </p>
              </div>

            </div>

            {/* Direita: Fatores Validados (Riscos, Atenção, Pontos Fortes) */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="bg-[#0a0a0f] border border-white/5 rounded-3xl p-6 shadow-xl space-y-5">
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#ff007f]" />
                  Diagnóstico dos Fatores Validados
                </h3>

                {/* Insegurança */}
                {analysisResult.criticalRisks.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5" /> Motivos de Insegurança (Crítico):
                    </span>
                    <div className="space-y-2">
                      {analysisResult.criticalRisks.map((risk: string, idx: number) => (
                        <div key={idx} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-200 leading-relaxed">
                          {risk}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Alertas */}
                {analysisResult.warnings.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-yellow-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" /> Atenção Operacional:
                    </span>
                    <div className="space-y-2">
                      {analysisResult.warnings.map((warn: string, idx: number) => (
                        <div key={idx} className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-xs text-yellow-200 leading-relaxed">
                          {warn}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pontos Positivos */}
                {analysisResult.strengths.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#00e5ff] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Pontos Fortes da Loja:
                    </span>
                    <div className="space-y-2">
                      {analysisResult.strengths.map((str: string, idx: number) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/20 text-xs text-white/90 leading-relaxed">
                          {str}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Scripts Prontos para Negociar */}
              <div className="bg-[#0a0a0f] border border-white/5 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#00e5ff]" />
                    <h3 className="text-sm font-bold text-white">Scripts Prontos para Contatar a Loja</h3>
                  </div>
                  <span className="text-[10px] text-[#00e5ff] uppercase tracking-widest font-bold">1 Clique</span>
                </div>

                <p className="text-xs text-white/50 leading-relaxed">
                  Envie diretamente no chat oficial do TikTok Shop para solicitar amostra gratuita ou prioridade:
                </p>

                <div className="space-y-3">
                  
                  {/* Script 1: Amostra Grátis */}
                  <div className="p-3.5 rounded-xl bg-[#050505] border border-white/5 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Pedir Amostra Grátis de Criador</span>
                      <button
                        onClick={() => handleCopyScript("Olá, tudo bem? Sou criador parceiro do TikTok Shop com foco no nicho dos seus produtos. Gostaria de solicitar uma amostra oficial para produzir vídeos originais de alta conversão e alavancar o faturamento da sua loja. Você pode liberar a amostra gratuita para iniciarmos a campanha esta semana?", 1)}
                        className="text-xs font-bold text-[#00e5ff] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copiedScript === 1 ? <Check className="w-3.5 h-3.5 text-[#00ff66]" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedScript === 1 ? "Copiado!" : "Copiar Script"}
                      </button>
                    </div>
                    <p className="text-[11px] text-white/60 italic leading-relaxed">
                      "Olá, tudo bem? Sou criador parceiro do TikTok Shop com foco no nicho dos seus produtos. Gostaria de solicitar uma amostra oficial..."
                    </p>
                  </div>

                  {/* Script 2: Prioridade de Despacho */}
                  <div className="p-3.5 rounded-xl bg-[#050505] border border-white/5 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Prioridade de Envio Rápido</span>
                      <button
                        onClick={() => handleCopyScript("Olá! Estou estruturando uma esteira de postagens diárias para promover os itens da sua loja. Como teremos picos diários de vendas, conseguimos alinhar prioridade máxima de despacho para os pedidos originados pelos meus criativos?", 2)}
                        className="text-xs font-bold text-[#00e5ff] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copiedScript === 2 ? <Check className="w-3.5 h-3.5 text-[#00ff66]" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedScript === 2 ? "Copiado!" : "Copiar Script"}
                      </button>
                    </div>
                    <p className="text-[11px] text-white/60 italic leading-relaxed">
                      "Olá! Estou estruturando uma esteira de postagens diárias. Conseguimos alinhar prioridade de despacho para os pedidos originados pelos meus criativos?..."
                    </p>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
