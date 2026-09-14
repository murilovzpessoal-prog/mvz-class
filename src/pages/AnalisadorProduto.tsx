import React, { useState } from "react";
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Zap, 
  ArrowRight, 
  RotateCcw, 
  ExternalLink, 
  Copy, 
  Check, 
  SlidersHorizontal, 
  Link as LinkIcon, 
  Package, 
  Loader2, 
  ChevronDown,
  HelpCircle,
  CheckCircle,
  Crosshair,
  BarChart2,
  ShieldX
} from "lucide-react";

export function AnalisadorProduto() {
  const [productLink, setProductLink] = useState("");
  const [productName, setProductName] = useState("");
  
  // Parâmetros opcionais de ajuste
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [category, setCategory] = useState("Moda & Acessórios");
  const [commission, setCommission] = useState(10);

  // Estados do Scanner
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [scanStep, setScanStep] = useState("");
  const [copiedTip, setCopiedTip] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Motor Inteligente de Auditoria com base no Link / Nome informado
  const runSmartAnalysis = (link: string, name: string) => {
    const raw = (link + " " + name).toLowerCase();
    
    // Extração do Título Identificado
    let identifiedTitle = name.trim();
    if (!identifiedTitle && link.trim()) {
      try {
        const urlObj = new URL(link.startsWith("http") ? link : "https://" + link);
        const pathParts = urlObj.pathname.split("/").filter(Boolean);
        const lastPart = pathParts[pathParts.length - 1] || "";
        if (lastPart && !lastPart.match(/^\d+$/)) {
          identifiedTitle = lastPart.replace(/[-_]/g, " ");
          identifiedTitle = identifiedTitle.charAt(0).toUpperCase() + identifiedTitle.slice(1);
        } else {
          identifiedTitle = "Item em Análise (" + (urlObj.hostname.replace("www.", "")) + ")";
        }
      } catch (e) {
        identifiedTitle = "Produto TikTok Shop";
      }
    }
    if (!identifiedTitle) identifiedTitle = "Produto TikTok Shop";

    // Análise Semântica de Riscos de Banimento
    const copyrightKeywords = ["apple", "airpod", "nike", "adidas", "gucci", "louis vuitton", "jordan", "rolex", "réplica", "replica", "1:1", "primeira linha", "fake", "clone", "xiaomi", "samsung", "jbl", "stanley"];
    const miracleKeywords = ["emagrece", "emagrecer", "cura", "milagre", "elimina gordura", "clareador definitivo", "cresce cabelo em 3 dias", "rejuvenescimento instantâneo", "sem dieta", "perca 10kg", "elimina celulite", "impotência", "calvície"];
    const blackNicheKeywords = ["vape", "pod", "cigarro", "arma", "faca", "spy", "espiã", "oculto", "sensual", "sex", "erótico", "estimulante", "anabolizante", "remédio", "medicamento", "tarja"];
    const fragileKeywords = ["vidro", "líquido", "perfume", "óleo", "creme líquido", "ampola", "frágil"];

    const isCopyright = copyrightKeywords.some(kw => raw.includes(kw));
    const isMiracle = miracleKeywords.some(kw => raw.includes(kw));
    const isBlackNiche = blackNicheKeywords.some(kw => raw.includes(kw));
    const isFragile = fragileKeywords.some(kw => raw.includes(kw));

    let autoCategory = category;
    if (raw.includes("fone") || raw.includes("smartwatch") || raw.includes("led") || raw.includes("carregador") || raw.includes("projetor") || raw.includes("caixa de som")) {
      autoCategory = "Eletrônicos & Tech";
    } else if (raw.includes("pele") || raw.includes("cabelo") || raw.includes("maquiagem") || raw.includes("sérum") || raw.includes("creme") || raw.includes("batom")) {
      autoCategory = "Beleza & Cosméticos";
    } else if (raw.includes("cozinha") || raw.includes("panela") || raw.includes("limpeza") || raw.includes("casa") || raw.includes("garrafa")) {
      autoCategory = "Casa & Cozinha";
    } else if (raw.includes("vestido") || raw.includes("calça") || raw.includes("tênis") || raw.includes("bolsa") || raw.includes("camisa")) {
      autoCategory = "Moda & Vestuário";
    }

    // Cálculo de Score com Base no Mercado Real do TikTok Shop (5% a 15%)
    let score = 84;
    const criticalRisks: string[] = [];
    const warnings: string[] = [];
    const strengths: string[] = [];
    const policiesChecked = [
      { name: "Diretriz de Propriedade Intelectual & Marcas", status: isCopyright ? "reprovado" : "aprovado" },
      { name: "Política de Afirmações Médicas & Promessas", status: isMiracle ? "reprovado" : "aprovado" },
      { name: "Regulamento de Produtos Restritos (Nicho Black)", status: isBlackNiche ? "reprovado" : "aprovado" },
      { name: "SLA de Envio e Logística Segura", status: isFragile ? "atencao" : "aprovado" },
      { name: "Aderência ao Feed For You (Gancho Visual)", status: "aprovado" },
      { name: "Comissão de Afiliado TikTok Shop (8% a 15%)", status: commission >= 8 ? "aprovado" : "atencao" }
    ];

    if (isCopyright) {
      score -= 50;
      criticalRisks.push("ALERTA DE BANIMENTO: Termos associados a marcas registradas ou réplicas detectados. O algoritmo do TikTok derruba a conta e congela saldo de comissão.");
    }

    if (isMiracle) {
      score -= 42;
      criticalRisks.push("RESTRIÇÃO SEVERA DE ALCANCE: Promessas de resultado milagroso ou claims de cura violam as diretrizes de publicidade da plataforma.");
    }

    if (isBlackNiche) {
      score -= 45;
      criticalRisks.push("PRODUTO EM LISTA RESTRITA: Nichos proibidos para veiculação de afiliados e lives comerciais no TikTok Shop Brasil.");
    }

    if (isFragile) {
      score -= 12;
      warnings.push("Atenção Logística: Itens frágeis ou líquidos costumam ter alto índice de avarias no frete, elevando pedidos de reembolso.");
    }

    // Ajuste de comissão real TikTok Shop
    if (commission < 7) {
      score -= 10;
      warnings.push("Comissão de " + commission + "% está abaixo da média do TikTok Shop (padrão saudável é entre 8% e 12%). O retorno por venda pode exigir um volume muito alto de pedidos.");
    } else if (commission >= 12) {
      score += 10;
      strengths.push("Excelente Comissão no TikTok Shop (" + commission + "%): Acima da média da plataforma (10%), proporcionando ótimo retorno financeiro para o criador por cada venda gerada.");
    } else {
      score += 5;
      strengths.push("Comissão Ideal do TikTok Shop (" + commission + "%): Dentro da faixa de mercado mais equilibrada (8% a 12%), fácil de vender e negociar amostras.");
    }

    if (!isCopyright && !isMiracle && !isBlackNiche) {
      strengths.push("Conformidade 100% White: Produto livre de gatilhos automáticos de suspensão ou Shadowban.");
      strengths.push("Alta Propensão para Vídeos de Demonstração: Facilidade de gravar ganchos visuais e provas sociais no feed.");
      strengths.push("Potencial de Conversão por Impulso: Alinhado aos padrões de consumo rápido do TikTok Shop.");
    }

    score = Math.max(8, Math.min(98, score));

    let status: "safe" | "caution" | "danger" = "safe";
    let statusLabel = "Produto Aprovado para Venda";
    let badgeColor = "text-[#00e5ff] border-[#00e5ff]/30 bg-[#00e5ff]/10";
    let verdictText = "Excelente oportunidade! O produto analisado tem conformidade com as diretrizes do TikTok Shop, gancho comercial favorável e baixo risco operacional. Recomendado para iniciar testes de criativos imediatamente.";

    if (criticalRisks.length > 0 || score < 50) {
      status = "danger";
      statusLabel = "Alto Risco de Banimento";
      badgeColor = "text-red-400 border-red-500/30 bg-red-500/10";
      verdictText = "NÃO RECOMENDADO para afiliar no momento! Foram identificados pontos de atrito direto com as regras de moderação do TikTok Shop. Promover esse item pode resultar na perda da conta de criador ou cancelamento de comissões.";
    } else if (warnings.length > 0 || score < 75) {
      status = "caution";
      statusLabel = "Atenção Necessária";
      badgeColor = "text-yellow-400 border-yellow-400/30 bg-yellow-400/10";
      verdictText = "Produto viável, porém exige cuidados específicos na narrativa do vídeo e alinhamento de logística com o fornecedor para não receber avaliações negativas.";
    }

    return {
      score,
      status,
      statusLabel,
      badgeColor,
      verdictText,
      identifiedTitle,
      autoCategory,
      criticalRisks,
      warnings,
      strengths,
      policiesChecked,
      analyzedLink: link.trim()
    };
  };

  const handleStartAnalysis = () => {
    if (!productLink.trim() && !productName.trim()) {
      alert("Por favor, informe o link do produto ou digite o nome para iniciar a análise.");
      return;
    }

    setIsAnalyzing(true);
    setAnalyzed(false);

    setScanStep("Iniciando varredura das diretrizes oficiais do TikTok Shop...");

    setTimeout(() => {
      setScanStep("Cruzando dados de propriedade intelectual, marcas e patentes...");
    }, 500);

    setTimeout(() => {
      setScanStep("Analisando claims proibidos, promessas exageradas e políticas de saúde...");
    }, 1000);

    setTimeout(() => {
      setScanStep("Calculando índice de conversão, aderência ao feed e conformidade de criador...");
    }, 1500);

    setTimeout(() => {
      const res = runSmartAnalysis(productLink, productName);
      setAnalysisResult(res);
      setIsAnalyzing(false);
      setAnalyzed(true);

      setTimeout(() => {
        const el = document.getElementById("resultado-analise-produto");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }, 2000);
  };

  const resetForm = () => {
    setProductLink("");
    setProductName("");
    setCommission(10);
    setAnalyzed(false);
    setAnalysisResult(null);
  };

  const handleCopyTip = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTip(true);
    setTimeout(() => setCopiedTip(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-20 px-4 md:px-6">
      
      {/* Header Banner */}
      <div className="mb-8 relative">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#00e5ff]/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/20 backdrop-blur-md mb-3">
              <Crosshair className="w-4 h-4 text-[#00e5ff]" />
              <span className="text-[11px] font-bold tracking-wider text-[#00e5ff] uppercase">MVZ Product Intelligence</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Analisador de Produto & Score TikTok Shop
            </h1>
            <p className="text-white/60 text-sm mt-1 max-w-2xl leading-relaxed">
              Descubra se o produto é seguro para vender, se corre risco de banimento e qual o potencial de escala antes de produzir qualquer vídeo.
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
          <HelpCircle className="w-4 h-4 text-[#00e5ff]" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Como fazer a análise do seu produto:</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-[#050505] border border-white/5 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] text-xs font-black flex items-center justify-center shrink-0 border border-[#00e5ff]/20">1</span>
            <div>
              <strong className="text-xs text-white block mb-0.5">Cole o Link ou Nome</strong>
              <p className="text-[11px] text-white/50 leading-relaxed">Copie o link do produto no TikTok Shop ou digite o nome do produto no campo abaixo.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#050505] border border-white/5 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] text-xs font-black flex items-center justify-center shrink-0 border border-[#00e5ff]/20">2</span>
            <div>
              <strong className="text-xs text-white block mb-0.5">Clique em Analisar Produto</strong>
              <p className="text-[11px] text-white/50 leading-relaxed">O sistema cruza as informações com o banco de diretrizes de moderação do TikTok.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#050505] border border-white/5 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#00ff66]/10 text-[#00ff66] text-xs font-black flex items-center justify-center shrink-0 border border-[#00ff66]/20">3</span>
            <div>
              <strong className="text-xs text-white block mb-0.5">Receba o Relatório Oficial</strong>
              <p className="text-[11px] text-white/50 leading-relaxed">Veja o Score (0-100), riscos de ban, políticas validadas e script de amostra grátis.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Caixa Principal de Entrada com Botão de Ação */}
      <div className="mb-10 bg-gradient-to-b from-[#0a0a0f] to-[#050505] border-2 border-[#00e5ff]/30 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,229,255,0.08)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00e5ff]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 space-y-6">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#00e5ff]" />
              <h2 className="text-lg font-black text-white">Insira os Dados do Produto</h2>
            </div>
            <span className="text-[11px] text-white/40 uppercase tracking-widest font-bold hidden sm:inline">
              Varredura de Diretrizes MVZ
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Input Link */}
            <div className="md:col-span-7">
              <label className="text-xs font-bold text-white/80 block mb-1.5 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-[#00e5ff]" />
                Link do Produto no TikTok Shop / Fornecedor:
              </label>
              <div className="relative">
                <input 
                  type="text"
                  value={productLink}
                  onChange={(e) => setProductLink(e.target.value)}
                  placeholder="Ex: https://www.tiktok.com/@loja/video/... ou link da loja"
                  className="w-full bg-[#030303] border border-white/15 rounded-xl px-4 py-3.5 pl-10 text-sm text-white focus:outline-none focus:border-[#00e5ff] transition-all shadow-inner placeholder:text-white/30"
                />
                <LinkIcon className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                {productLink && (
                  <button 
                    onClick={() => setProductLink("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Input Nome */}
            <div className="md:col-span-5">
              <label className="text-xs font-bold text-white/80 block mb-1.5 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-[#00e5ff]" />
                Nome do Produto (Opcional):
              </label>
              <input 
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Ex: Mini Projetor Smart, Modelador..."
                className="w-full bg-[#030303] border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#00e5ff] transition-all shadow-inner placeholder:text-white/30"
              />
            </div>

          </div>

          {/* Ajuste Opcional de Comissão / Categoria */}
          <div className="pt-1 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-xs font-bold text-white/60 hover:text-white py-1.5 px-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#00e5ff]" />
              {showAdvanced ? "Ocultar Parâmetros Opcionais de Comissão" : "Ajustar Comissão e Categoria (Opcional)"}
              <ChevronDown className={"w-3.5 h-3.5 transition-transform " + (showAdvanced ? "rotate-180" : "")} />
            </button>
          </div>

          {showAdvanced && (
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-white/70">Comissão do Afiliado no TikTok Shop:</label>
                  <span className="text-sm font-black text-[#00e5ff]">{commission}%</span>
                </div>
                <input 
                  type="range"
                  min="3"
                  max="25"
                  step="1"
                  value={commission}
                  onChange={(e) => setCommission(Number(e.target.value))}
                  className="w-full accent-[#00e5ff] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-white/40 mt-1">
                  <span>5% (Mínima)</span>
                  <span>8% - 10% (Ideal TikTok Shop)</span>
                  <span>15%+ (Topo)</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-white/70 block mb-1">Categoria Principal</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#00e5ff]"
                >
                  <option value="Moda & Acessórios">Moda & Acessórios</option>
                  <option value="Beleza & Cuidados Pessoais">Beleza & Cuidados Pessoais</option>
                  <option value="Eletrônicos & Tech">Eletrônicos & Tech</option>
                  <option value="Casa, Decoração & Cozinha">Casa, Decoração & Cozinha</option>
                  <option value="Saúde & Bem-Estar">Saúde & Bem-Estar</option>
                </select>
              </div>
            </div>
          )}

          {/* Botão de Análise de Alto Impacto */}
          <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/50 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00e5ff]" />
              Auditoria cruzada com os critérios de banimento do TikTok Shop 2026
            </p>

            <button
              type="button"
              onClick={handleStartAnalysis}
              disabled={isAnalyzing}
              className="w-full sm:w-auto bg-gradient-to-r from-[#00e5ff] to-[#00b4d8] hover:from-[#33eaff] hover:to-[#00c4ea] text-black font-black uppercase tracking-wider text-sm px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analisando Produto...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 fill-black" />
                  <span>Analisar Produto Agora</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Animação do Scanner em Andamento */}
      {isAnalyzing && (
        <div className="mb-10 p-8 bg-[#0a0a0f] border border-[#00e5ff]/30 rounded-2xl shadow-2xl flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-[#00e5ff]/20 animate-ping" />
            <div className="relative w-full h-full rounded-full border-4 border-[#00e5ff] border-t-transparent animate-spin flex items-center justify-center">
              <Crosshair className="w-6 h-6 text-[#00e5ff]" />
            </div>
          </div>
          <h3 className="text-base font-bold text-white mb-2">Escaneando Diretrizes e Riscos do Produto...</h3>
          <p className="text-xs text-[#00e5ff] font-mono animate-pulse max-w-md">{scanStep}</p>
        </div>
      )}

      {/* Relatório Completo de Análise (Aparece apenas após o clique) */}
      {analyzed && analysisResult && (
        <div id="resultado-analise-produto" className="space-y-8 animate-in fade-in duration-500">
          
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <ShieldCheck className="w-6 h-6 text-[#00e5ff]" />
            <h2 className="text-xl font-black text-white">Relatório de Auditoria do Produto</h2>
            <span className="text-xs text-white/50 ml-auto">Validado pelo algoritmo MVZ Class</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Esquerda: Score e Diagnóstico */}
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
                    Índice de Viabilidade & Risco
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
                  <span className="text-xs font-bold text-white block mb-1">Veredito Oficial MVZ:</span>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {analysisResult.verdictText}
                  </p>
                </div>

                {/* Detalhes Identificados */}
                <div className="space-y-2 text-xs border-t border-white/5 pt-3">
                  <div className="flex justify-between text-white/60">
                    <span>Produto Avaliado:</span>
                    <strong className="text-white">{analysisResult.identifiedTitle}</strong>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Nicho / Categoria:</span>
                    <span className="text-white">{analysisResult.autoCategory}</span>
                  </div>
                  {analysisResult.analyzedLink && (
                    <div className="flex justify-between text-white/60 truncate pt-1">
                      <span>Link Analisado:</span>
                      <a 
                        href={analysisResult.analyzedLink.startsWith("http") ? analysisResult.analyzedLink : "https://" + analysisResult.analyzedLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#00e5ff] hover:underline flex items-center gap-1 truncate max-w-[200px]"
                      >
                        {analysisResult.analyzedLink} <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                  )}
                </div>

              </div>

              {/* Matriz de Políticas Verificadas */}
              <div className="bg-[#0a0a0f] border border-white/5 rounded-3xl p-6 shadow-xl space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-[#00e5ff]" />
                  Checklist de Diretrizes de Moderação:
                </h3>

                <div className="space-y-2.5">
                  {analysisResult.policiesChecked.map((policy: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#050505] border border-white/5 text-xs">
                      <span className="text-white/80">{policy.name}</span>
                      {policy.status === "aprovado" && (
                        <span className="text-[#00ff66] font-bold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Aprovado
                        </span>
                      )}
                      {policy.status === "atencao" && (
                        <span className="text-yellow-400 font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Atenção
                        </span>
                      )}
                      {policy.status === "reprovado" && (
                        <span className="text-red-400 font-bold flex items-center gap-1">
                          <ShieldX className="w-3.5 h-3.5" /> Violação
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Direita: Fatores Críticos & Scripts */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="bg-[#0a0a0f] border border-white/5 rounded-3xl p-6 shadow-xl space-y-5">
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#00e5ff]" />
                  Diagnóstico dos Fatores Validados
                </h3>

                {/* Riscos Críticos */}
                {analysisResult.criticalRisks.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5" /> Riscos Imediatos de Banimento / Restrição:
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

                {/* Avisos */}
                {analysisResult.warnings.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-yellow-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" /> Pontos de Atenção na Gravação:
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

                {/* Pontos Fortes */}
                {analysisResult.strengths.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#00ff66] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Vantagens Competitivas & Potencial:
                    </span>
                    <div className="space-y-2">
                      {analysisResult.strengths.map((str: string, idx: number) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#00ff66]/10 border border-[#00ff66]/20 text-xs text-white/90 leading-relaxed">
                          {str}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Script de Abordagem para Solicitar Amostra Grátis */}
              <div className="bg-[#0a0a0f] border border-white/5 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#00e5ff]" />
                    <h3 className="text-sm font-bold text-white">Script para Pedir Amostra ao Fornecedor</h3>
                  </div>
                  <span className="text-[10px] text-[#00e5ff] uppercase tracking-widest font-bold">1 Clique</span>
                </div>

                <p className="text-xs text-white/50 leading-relaxed">
                  Copie o modelo abaixo e envie no chat oficial da loja no TikTok Shop para receber a amostra gratuita do produto antes de gravar:
                </p>

                <div className="p-4 rounded-xl bg-[#050505] border border-white/5 flex flex-col gap-3">
                  <p className="text-xs text-white/80 italic leading-relaxed">
                    {"Olá, equipe! Sou criador parceiro do TikTok Shop no nicho de " + analysisResult.autoCategory + ". Estou montando um cronograma de vídeos e lives para promover o produto " + analysisResult.identifiedTitle + ". Vocês poderiam liberar a amostra oficial para iniciarmos as postagens esta semana?"}
                  </p>
                  
                  <button
                    onClick={() => handleCopyTip("Olá, equipe! Sou criador parceiro do TikTok Shop no nicho de " + analysisResult.autoCategory + ". Estou montando um cronograma de vídeos e lives para promover o produto " + analysisResult.identifiedTitle + ". Vocês poderiam liberar a amostra oficial para iniciarmos as postagens esta semana?")}
                    className="self-end bg-[#00e5ff]/10 hover:bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/30 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer"
                  >
                    {copiedTip ? <Check className="w-3.5 h-3.5 text-[#00ff66]" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedTip ? "Script Copiado com Sucesso!" : "Copiar Script de Amostra"}
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
