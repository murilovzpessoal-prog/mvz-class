import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, ChevronLeft, ShoppingBag, TrendingUp, MessageCircle, Gamepad2, FlaskConical, 
  Laptop, Box, FileText, Camera, Smartphone, Zap, Users, Shield, PenTool, 
  Terminal, Play, Target, Rocket, Gift, UserPlus, Video, Monitor, Mic 
} from 'lucide-react';

export function Modulos() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 1.5 : clientWidth / 1.5;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const neonCards = [
    { id: 1, tag: 'MÓDULO 01', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/252f9788-a9b1-4179-a028-86e63bfd9773.png', titleMain: 'SEJA BEM VINDO', titleSub: '', colorHex: '#ff007f' },
    { id: 2, tag: 'MÓDULO 02', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/17c3942d-5a69-419a-bfd3-205ddaed1261.png', titleMain: 'NICHOS', titleSub: 'virais', colorHex: '#00e5ff' },
    { id: 3, tag: 'MÓDULO 03', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/f7da23fe-cacc-49b4-a663-882c28b203dd.png', titleMain: 'COMUNIDADE', titleSub: 'whatsapp', colorHex: '#00ff66' },
    { id: 4, tag: 'MÓDULO 04', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/7ccc3f8d-29ff-4374-987c-9a0c64c6fecb.png', titleMain: 'DISCORD', titleSub: '', colorHex: '#ff3333' },
    { id: 5, tag: 'MÓDULO 05', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/ed478f83-3b57-4926-a633-f3418d518cb9.png', titleMain: 'FLOW', titleSub: 'ultra', colorHex: '#ff00ff' },
    { id: 6, tag: 'MÓDULO 06', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/c2a1c850-f423-412c-af69-a5776a3a0db1.png', titleMain: 'ESCOLHENDO', titleSub: 'os produtos', colorHex: '#00e5ff' },
    { id: 7, tag: 'MÓDULO 07', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/046220dd-1d06-44a1-92fa-0debdafd4850.png', titleMain: 'ESTRUTURA', titleSub: 'validada', colorHex: '#ffaa00' },
    { id: 8, tag: 'MÓDULO 08', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/59063f88-4867-486f-95e8-6cb4d1ed0f2b.png', titleMain: 'BIBLIOTECA', titleSub: 'de prompts', colorHex: '#ff007f' },
    { id: 9, tag: 'MÓDULO 09', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/fe011b06-0185-4b23-aeb0-b51b72a91e00.png', titleMain: 'ESTILO', titleSub: 'pov', colorHex: '#00ff66' },
    { id: 10, tag: 'MÓDULO 10', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/b09a8a12-f1ae-45a0-a077-eeec4ec7babe.png', titleMain: 'CABIDE', titleSub: '', colorHex: '#00e5ff' },
    { id: 11, tag: 'MÓDULO 11', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/7daef890-76c3-401f-8154-d0953f492b60.png', titleMain: 'BUMERANGUE', titleSub: '', colorHex: '#ff3333' },
    { id: 12, tag: 'MÓDULO 12', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/662f6afa-d669-4d94-99dc-c068c60d91ee.png', titleMain: 'PLUS SIZE', titleSub: '', colorHex: '#ff00ff' },
    { id: 13, tag: 'MÓDULO 13', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/bd817c26-83bd-44a4-a5e8-8931dc606fa3.png', titleMain: 'ZERO CUSTO', titleSub: '', colorHex: '#ffaa00' },
    { id: 14, tag: 'MÓDULO 14', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/07e9a80a-ceec-4b53-b7e4-994816c0989f.png', titleMain: 'GERADOR DE', titleSub: 'headline', colorHex: '#00e5ff' },
    { id: 15, tag: 'MÓDULO 15', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/e95155f2-e00d-4c5f-8fb8-8c0e63f6ab45.png', titleMain: 'ONE PROMPT', titleSub: '', colorHex: '#ff007f' },
    { id: 16, tag: 'MÓDULO 16', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/406ba02c-bb02-4b04-8531-dec3bf672a57.png', titleMain: 'ALGORITMO', titleSub: 'tiktok shop', colorHex: '#00ff66' },
    { id: 17, tag: 'MÓDULO 17', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/ceab9adb-a74c-4b61-9c62-c28dc5ae6b84.png', titleMain: '1K EM 30 DIAS', titleSub: '', colorHex: '#ff3333' },
    { id: 18, tag: 'MÓDULO 18', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/31d6f521-48b4-4d68-a0d9-5859b89f63dd.png', titleMain: 'ESCALA', titleSub: '', colorHex: '#00e5ff' },
    { id: 19, tag: 'MÓDULO 19', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/447e2fcf-054d-49ff-ab84-c996b132e894.png', titleMain: 'BÔNUS', titleSub: '', colorHex: '#ff00ff' },
    { id: 20, tag: 'MÓDULO 20', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/9ffd0bef-38fd-41ec-84f6-fb4df749f871.png', titleMain: '10K EM', titleSub: 'seguidores', colorHex: '#ffaa00' },
    { id: 21, tag: 'MÓDULO 21', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/6449bf18-4ab9-4970-8951-b7d6d8d9a521.png', titleMain: 'BÔNUS AVATAR', titleSub: 'dançando', colorHex: '#00e5ff' },
    { id: 22, tag: 'MÓDULO 22', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/25202d0e-7aa9-48b4-b7ac-4d5145d7e67a.png', titleMain: 'BÔNUS', titleSub: 'motion', colorHex: '#ff007f' },
    { id: 23, tag: 'MÓDULO 23', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/b4a5a9b1-d7ab-41b8-9a45-b4840fc5338d.png', titleMain: 'REUNIÕES', titleSub: 'gravadas', colorHex: '#00ff66' },
  ];


  return (
    <div className="w-full h-full flex flex-col -mt-4">
      
      {/* Hero Banner Area */}
      <div className="relative w-full h-[400px] md:h-[480px] rounded-xl overflow-hidden mb-24 md:mb-32 flex-shrink-0 bg-[#050505]">
        
        <div className="absolute inset-0">
          <img 
            src="https://cdn-checkout.cakto.com.br/images/97d4e6d4-597c-4cbf-8110-8d5ce2df9643.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover object-[center_30%]"
          />
          {/* Subtle gradient only at the very bottom so text is readable, no side gradients hiding the logo */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/30 to-transparent opacity-90" />
        </div>


      </div>

      {/* Scrollable Cards Section */}
      <div className="relative flex-1 w-full group/slider flex flex-col justify-center min-h-[350px]">
        
        {/* Custom scrollbar hiding and snap behavior */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-10 px-8 scroll-smooth"
        >
          {neonCards.map((card) => (
            <div 
              key={card.id} 
              onClick={() => navigate(`/aula/${card.id}`)}
              className="relative w-[180px] md:w-[200px] h-[280px] md:h-[300px] shrink-0 rounded-[20px] overflow-hidden group/card cursor-pointer snap-start bg-[#050505] border border-white/5"
              style={{
                boxShadow: `0 0 20px rgba(0, 229, 255, 0.05), inset 0 0 25px rgba(0, 229, 255, 0.05)`
              }}
            >
              {/* Glowing border effect on hover */}
              <div className="absolute inset-0 rounded-[20px] border-2 border-transparent group-hover/card:border-white/20 transition-colors z-20 pointer-events-none" />

              {/* Full Cover Image */}
              <div className="absolute inset-0 z-10 bg-[#050505]">
                <img 
                  src={card.image} 
                  alt={card.titleMain}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow Overlay */}
        <div className="absolute left-4 top-[45%] -translate-y-1/2 z-30 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button 
            onClick={() => scroll('left')}
            className="w-14 h-14 rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-center hover:bg-black/90 hover:scale-110 transition-all cursor-pointer pointer-events-auto shadow-2xl"
          >
            <ChevronLeft className="w-8 h-8 text-[#00e5ff]" style={{ filter: 'drop-shadow(0 0 10px #00e5ff)' }} />
          </button>
        </div>

        {/* Right Arrow Overlay */}
        <div className="absolute right-4 top-[45%] -translate-y-1/2 z-30 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button 
            onClick={() => scroll('right')}
            className="w-14 h-14 rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-center hover:bg-black/90 hover:scale-110 transition-all cursor-pointer pointer-events-auto shadow-2xl"
          >
            <ChevronRight className="w-8 h-8 text-[#00e5ff]" style={{ filter: 'drop-shadow(0 0 10px #00e5ff)' }} />
          </button>
        </div>
      </div>

    </div>
  );
}
