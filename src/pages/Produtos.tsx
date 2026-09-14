import React from 'react';
import { Package, ExternalLink, TrendingUp, Tag, ShoppingCart } from 'lucide-react';

export function Produtos() {
  // Dados reais dos produtos
  const produtos = [
    {
      id: 1,
      name: 'KIT CALÇA BICOLOR FEMININA FORRADA COM LISTAS',
      link: 'https://vt.tiktok.com/ZS9SQ6bJTfKjN-aZz8R/',
      image: 'https://i.imgur.com/VQLdkyT.jpeg',
    },
    {
      id: 2,
      name: 'CROPPED FITNESS MANGA CURTA SUPLEX ZÍPER',
      link: 'https://vt.tiktok.com/ZS9SQ6waHUdWW-vL3Ma/',
      image: 'https://i.imgur.com/yC7xIQq.jpeg',
    },
    {
      id: 3,
      name: 'CORSELET SUPLEX COM TOQUE DE POLIAMIDA',
      link: 'https://vt.tiktok.com/ZS9SQMNkK8SkU-Hk4M5/',
      image: 'https://i.imgur.com/CEQRiPT.jpeg',
    },
    {
      id: 4,
      name: 'VESTIDO MIDI TOMARA QUE CAIA FEMININO CANELADO',
      link: 'https://vt.tiktok.com/ZS9SQMAJ3Q5F8-cEYjc/',
      image: 'https://i.imgur.com/hMA8ouq.jpeg',
    },
    {
      id: 5,
      name: 'VESTIDO FEMININO TUBINHO BÁSICO SUPLEX PREMIUM',
      link: 'https://vt.tiktok.com/ZS9SQMm6x2a36-NdyVc/',
      image: 'https://i.imgur.com/rSfPva6.jpeg',
    },
    {
      id: 6,
      name: 'CALÇA ALFAIATARIA FEMININA BÁSICA',
      link: 'https://vt.tiktok.com/ZS9SQMqXy2Wu5-qO2uU/',
      image: 'https://i.imgur.com/Z57M2dq.jpeg',
    },
    {
      id: 7,
      name: 'SHORT SAIA FEMININO COM DETALHE DOURADO NA FIVELA',
      link: 'https://vt.tiktok.com/ZS9SQMwAdxXN2-zEwvL/',
      image: 'https://i.imgur.com/XoTyLMa.jpeg',
    },
    {
      id: 8,
      name: 'KIT 3 SHORT FITNESS FEMININO CANELADO',
      link: 'https://vt.tiktok.com/ZS9SQrRGEt619-hyUKM/',
      image: 'https://i.imgur.com/uVUNQrI.jpeg',
    },
    {
      id: 9,
      name: 'SAÍDA DE PRAIA CURTA COM FRANJA EM TRICOT',
      link: 'https://vt.tiktok.com/ZS9SQrksvaL4j-jR4OL/',
      image: 'https://i.imgur.com/RuLaJF1.jpeg',
    },
    {
      id: 10,
      name: 'CONJUNTO 1 BODY GOLA QUADRADA BRANCO + SHORT ALFAIATARIA COM CINTO',
      link: 'https://vt.tiktok.com/ZS9SQr5ThfAxN-Y98sf/',
      image: 'https://i.imgur.com/YsoaeHO.jpeg',
    },
    {
      id: 11,
      name: 'VESTIDO FEMININO ELEGANTE COM ESTAMPA, UM OMBRO SÓ, RECORTES E AMARRAÇÃO',
      link: 'https://vt.tiktok.com/ZS9SQheSE1GXe-5SBL8/',
      image: 'https://i.imgur.com/kY7NUrT.jpeg',
      isPlusSize: true,
    },
    {
      id: 12,
      name: 'VESTIDO PLUS SIZE PRETO ENVELOPE AMARRAÇÃO MANGA LONGA DECOTE V',
      link: 'https://vt.tiktok.com/ZS9SQhU2D3mTu-KD5JG/',
      image: 'https://i.imgur.com/FVPD0PI.jpeg',
      isPlusSize: true,
    },
    {
      id: 13,
      name: 'CALÇA FEMININA PLUS SIZE PANTALONA WIDE CINTURA ALTA COM LISTRAS BRANCAS',
      link: 'https://vt.tiktok.com/ZS9SQhqjJofwo-Bnqmc/',
      image: 'https://i.imgur.com/LnZXr2H.jpeg',
      isPlusSize: true,
    },
    {
      id: 14,
      name: 'VESTIDO FEMININO MIDI PLUS SIZE ESTAMPADO FLORAL',
      link: 'https://vt.tiktok.com/ZS9SQh3bMwqbA-lCrCE/',
      image: 'https://i.imgur.com/8mP4FVi.jpeg',
      isPlusSize: true,
    },
    {
      id: 15,
      name: 'MACAQUINHO PLUS SIZE SHORTS SAIA ELEGANTE CURTO',
      link: 'https://vt.tiktok.com/ZS9SQkMYJTCNx-hfLHT/',
      image: 'https://i.imgur.com/8dJGAKD.jpeg',
      isPlusSize: true,
    },
    {
      id: 16,
      name: 'SHORTINHO SAIA COURO COURINO FEMININO CURTO',
      link: 'https://vt.tiktok.com/ZS9SQkHPC87Sx-yyyQ6/',
      image: 'https://i.imgur.com/UU3inyg.jpeg',
      isPlusSize: true,
    },
    {
      id: 17,
      name: 'VESTIDO ALÇA LONGO FENDA LATERAL CANELADO',
      link: 'https://vt.tiktok.com/ZS9SQkWm5kbEp-rcjFa/',
      image: 'https://i.imgur.com/jK20L85.jpeg',
      isPlusSize: true,
    },
    {
      id: 18,
      name: 'CONJUNTO SHORT SAIA E TOP DO SLIM AO PLUS SIZE',
      link: 'https://vt.tiktok.com/ZS9SQBdY9m54L-RUpdu/',
      image: 'https://i.imgur.com/kNHD8as.jpeg',
      isPlusSize: true,
    },
    {
      id: 19,
      name: 'CONJUNTO FEMININO PLUS SIZE SAIA',
      link: 'https://vt.tiktok.com/ZS9SQBMKaFKqA-qmRdY/',
      image: 'https://i.imgur.com/SMs59jw.jpeg',
      isPlusSize: true,
    },
    {
      id: 20,
      name: 'BLUSA CROPPED BATA BABADO PLUS SIZE',
      link: 'https://vt.tiktok.com/ZS9SQByCRpdTf-VAf8D/',
      image: 'https://i.imgur.com/105FPvT.jpeg',
      isPlusSize: true,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto pb-12">
      
      {/* Header */}
      <div className="mb-12 relative">
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#00e5ff]/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-xl">
            <Package className="w-5 h-5 text-[#00e5ff]" />
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-white/80 uppercase">Arsenal de Vendas</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-4 drop-shadow-2xl leading-[1.05]">
            Produtos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#ff007f]">Vencedores</span>
          </h1>
          
          <p className="text-white/60 text-base max-w-xl font-medium leading-relaxed drop-shadow-lg">
            Acesse os produtos validados que estão gerando mais lucro no mercado. Modele as ofertas ou adicione-os diretamente na sua esteira de vendas.
          </p>
        </div>
      </div>

      {/* Grid de Produtos - Layout Exclusivo de Imagem + Botão Inferior */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10 pt-4">
        {produtos.map((produto) => (
          <div key={produto.id} className="flex flex-col group">
            
            {/* Card EXCLUSIVO para a Imagem (Formato Vertical Super Arredondado) */}
            <div className="relative w-full aspect-[3/4] rounded-2xl md:rounded-[32px] overflow-hidden border border-white/10 shadow-2xl hover:shadow-[0_20px_50px_-10px_rgba(0,229,255,0.25)] transition-all duration-500 hover:-translate-y-2 mb-5">
              
              <img 
                src={produto.image} 
                alt={produto.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />

              {/* Etiqueta PLUS SIZE (Aparece apenas nos itens mapeados como plus) */}
              {produto.isPlusSize && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#ff007f] to-[#ff4d4d] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(255,0,127,0.5)] z-20">
                  PLUS
                </div>
              )}
              
              {/* Degradê escuro embaixo apenas para ler o nome */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/30 to-transparent opacity-90" />
              
              {/* Overlay de Hover (Glow Ciano) */}
              <div className="absolute inset-0 bg-[#00e5ff]/0 group-hover:bg-[#00e5ff]/10 mix-blend-overlay transition-colors duration-500" />
              
              {/* Nome do Produto sobreposto na Imagem (Pequenininho) */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center justify-end text-center z-10">
                <h3 className="font-bold text-xs md:text-sm tracking-wide text-white/90 group-hover:text-white transition-colors duration-300 drop-shadow-md leading-snug">
                  {produto.name}
                </h3>
              </div>

            </div>
            
            {/* Botão de Ação de Vidro (Glassmorphism Premium) */}
            <a 
              href={produto.link}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/90 hover:text-white bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] relative overflow-hidden group/btn"
            >
              {/* Efeito de iluminação interna (brilho de vidro no topo) */}
              <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] pointer-events-none" />
              <ExternalLink className="w-4 h-4 text-white/70 group-hover/btn:text-white transition-colors" />
              <span className="relative z-10">Acessar Produto</span>
            </a>
            
          </div>
        ))}
      </div>

    </div>
  );
}
