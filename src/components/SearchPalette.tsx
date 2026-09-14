import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  PlayCircle, 
  BookOpen, 
  X, 
  ChevronRight, 
  FileText, 
  Zap, 
  BrainCircuit, 
  MessageCircle, 
  ExternalLink,
  ScanSearch,
  Package,
  SlidersHorizontal,
  Store
} from 'lucide-react';
import { modulesData } from '../data/modules';

interface SearchPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchPalette({ isOpen, onClose }: SearchPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Flatten modulesData and platform resources into a rich searchable catalog
  const allResults = React.useMemo(() => {
    const results: any[] = [];

    // 1. Ferramentas & Materiais Principais da Plataforma
    results.push(
      {
        type: 'tool',
        id: 'tool-prompts',
        title: 'Biblioteca de Prompts',
        subtitle: 'Material & Ferramenta Exclusiva',
        description: 'Acesse centenas de prompts validados para gerar vídeos virais com IA',
        keywords: 'prompts biblioteca ia inteligencia artificial material gerador token mvz01',
        icon: BrainCircuit,
        colorHex: '#ff007f',
        url: 'https://promptsmvz.site/dashboard.html'
      },
      {
        type: 'tool',
        id: 'tool-hooks',
        title: 'MVZ Hooks - Gerador Viral',
        subtitle: 'Ferramenta de Ganchos',
        description: 'Gerador automático de ganchos virais para prender a atenção nos primeiros 3 segundos',
        keywords: 'hooks ganchos gerador viral retencao copies',
        icon: Zap,
        colorHex: '#00e5ff',
        url: 'https://mvzhooks.site/'
      },
      {
        type: 'community',
        id: 'comm-whatsapp',
        title: 'Comunidade VIP no WhatsApp',
        subtitle: 'Grupo Oficial de Alunos',
        description: 'Networking, alertas de tendências e suporte direto com a equipe',
        keywords: 'whatsapp grupo comunidade suporte networking alunos',
        icon: MessageCircle,
        colorHex: '#25D366',
        url: 'https://chat.whatsapp.com/IhGpLowoewmATKktHv2Fo3'
      },
      {
        type: 'community',
        id: 'comm-discord',
        title: 'Servidor Oficial no Discord',
        subtitle: 'Salas de Voz e Materiais',
        description: 'Canais de dúvidas, rateios, ferramentas e call ao vivo',
        keywords: 'discord servidor comunidade canais voz material rateio',
        icon: MessageCircle,
        colorHex: '#5865F2',
        url: 'https://discord.gg/z2bdhZwKRS'
      },
      {
        type: 'feature',
        id: 'feat-scanner',
        title: 'Scanner de Produtos Virais',
        subtitle: 'Ferramenta de Mineração',
        description: 'Encontre produtos em alta e tendências para vender no TikTok Shop',
        keywords: 'scanner mineracao produtos busca mercado vendas',
        icon: ScanSearch,
        colorHex: '#00e5ff',
        url: '/scanner'
      },
      {
        type: 'feature',
        id: 'feat-produtos',
        title: 'Catálogo de Produtos Recomendados',
        subtitle: 'Produtos Validados',
        description: 'Lista de produtos prontos para afiliação com alta margem de lucro',
        keywords: 'produtos catalogo minerados fornecedores afiliacao',
        icon: Package,
        colorHex: '#ffaa00',
        url: '/produtos'
      },
      {
        type: 'feature',
        id: 'feat-analisador-produto',
        title: 'Analisador de Produto (Score & Ban)',
        subtitle: 'Ferramenta Anti-Ban & Validação',
        description: 'Calcule o score do produto e evite violações das diretrizes do TikTok Shop',
        keywords: 'analisador score produto viabilidade ban banimento restricoes diretrizes tiktok',
        icon: SlidersHorizontal,
        colorHex: '#00e5ff',
        url: '/analisador-produto'
      },
      {
        type: 'feature',
        id: 'feat-analisador-fornecedor',
        title: 'Analisador de Lojista & Fornecedor',
        subtitle: 'Auditoria de Fornecedores TikTok Shop',
        description: 'Analise reputação, nota da loja, despacho em 48h e scripts de negociação',
        keywords: 'analisador fornecedor lojista reputacao nota despacho estoque amostra script negociacao',
        icon: Store,
        colorHex: '#ff007f',
        url: '/analisador-fornecedor'
      }
    );

    // 2. Módulos & Aulas
    modulesData.forEach(mod => {
      // Módulo em si (vai direto para a sala de aula do módulo)
      results.push({
        type: 'module',
        id: `mod-${mod.id}`,
        moduleId: mod.id,
        title: `${mod.tag}: ${mod.titleMain} ${mod.titleSub}`.trim(),
        subtitle: `Módulo com ${mod.aulas?.length || 0} aulas`,
        description: `${mod.titleMain} ${mod.titleSub}`,
        keywords: `modulo ${mod.tag} ${mod.titleMain} ${mod.titleSub} curso aulas`,
        icon: BookOpen,
        colorHex: mod.colorHex,
        url: `/aula/${mod.id}`
      });

      // Aulas do módulo
      if (mod.aulas) {
        mod.aulas.forEach(aula => {
          const hasMaterial = !!aula.linkUrl || !!aula.content;
          
          results.push({
            type: 'lesson',
            id: `aula-${aula.id}`,
            lessonId: aula.id,
            moduleId: mod.id,
            title: aula.title,
            subtitle: hasMaterial ? `Aula & Material • ${mod.tag}` : `Aula • ${mod.tag}`,
            description: aula.description || '',
            keywords: `aula ${aula.title} ${mod.tag} ${mod.titleMain} ${aula.description || ''} ${hasMaterial ? 'material link download doc' : ''}`,
            icon: hasMaterial ? FileText : PlayCircle,
            colorHex: mod.colorHex,
            url: `/aula/${mod.id}?lesson=${aula.id}`
          });
        });
      }
    });

    return results;
  }, []);

  const filteredResults = React.useMemo(() => {
    if (!query.trim()) return [];
    const searchTerms = query.toLowerCase().trim().split(/\s+/);
    return allResults.filter(item => {
      const matchText = `${item.title} ${item.subtitle} ${item.description || ''} ${item.keywords || ''}`.toLowerCase();
      return searchTerms.every(term => matchText.includes(term));
    }).slice(0, 10);
  }, [query, allResults]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          onClose(); // This is handled in parent usually, but we expose it just in case
        }
        return;
      }

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < filteredResults.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          handleSelect(filteredResults[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, onClose]);

  const handleSelect = (item: any) => {
    onClose();
    if (item.url.startsWith('http')) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(item.url);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-[#09090b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col mx-4 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input */}
        <div className="flex items-center px-4 py-4 border-b border-white/5">
          <Search className="w-5 h-5 text-white/40 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-lg text-white placeholder:text-white/40 outline-none"
            placeholder="O que você quer aprender hoje?"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        {query.trim() && (
          <div className="max-h-[60vh] overflow-y-auto py-2">
            {filteredResults.length === 0 ? (
              <div className="px-6 py-8 text-center text-white/40">
                <p>Nenhum resultado encontrado para "{query}"</p>
                <p className="text-sm mt-1">Tente pesquisar por palavras mais curtas ou sinônimos.</p>
              </div>
            ) : (
              <ul className="px-2">
                {filteredResults.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <li key={`${item.type}-${item.id}`}>
                      <button
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                          isSelected ? 'bg-white/10 shadow-lg' : 'hover:bg-white/5'
                        }`}
                        style={{
                          borderLeft: isSelected ? `3px solid ${item.colorHex}` : '3px solid transparent'
                        }}
                      >
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${item.colorHex}20` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: item.colorHex }} />
                        </div>
                        
                        <div className="flex flex-col flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white truncate">
                              {item.title}
                            </span>
                            {item.url.startsWith('http') && (
                              <ExternalLink className="w-3 h-3 text-white/40 shrink-0" />
                            )}
                          </div>
                          <span className="text-xs text-white/50 truncate">
                            {item.subtitle}
                          </span>
                          {item.description && (
                            <span className="text-[11px] text-white/30 truncate mt-0.5 font-light">
                              {item.description}
                            </span>
                          )}
                        </div>
                        
                        <ChevronRight className={`w-4 h-4 text-white/20 transition-transform ${isSelected ? 'translate-x-1 opacity-100' : 'opacity-0'}`} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
        
        {/* Footer shortcuts */}
        <div className="px-4 py-3 border-t border-white/5 bg-black/40 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-bold text-white/50">↵</kbd>
            <span className="text-[11px] text-white/40">Selecionar</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-bold text-white/50">↑</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-bold text-white/50">↓</kbd>
            <span className="text-[11px] text-white/40">Navegar</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-bold text-white/50">ESC</kbd>
            <span className="text-[11px] text-white/40">Fechar</span>
          </div>
        </div>

      </div>
    </div>
  );
}
