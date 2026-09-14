import React from 'react';
import { ScanSearch, ExternalLink, TrendingUp, Users, Video } from 'lucide-react';

export function Scanner() {
  // Contas virais reais mapeadas
  const profiles = [
    {
      id: 1,
      username: '@duda_rodriiguees',
      niche: 'Moda Feminina',
      followers: '8.906',
      likes: '110,1 mil',
      link: 'https://www.tiktok.com/@duda_rodriiguees?_r=1&_t=ZS-99epnzEGTCs',
      image: 'https://i.imgur.com/9VAuAev.jpeg',
    },
    {
      id: 2,
      username: '@eunandalooks',
      niche: 'Moda Feminina',
      followers: '24,8 mil',
      likes: '1,1 mi',
      link: 'https://www.tiktok.com/@eunandalooks?_r=1&_t=ZS-99epsENHOUy',
      image: 'https://i.imgur.com/itEVSUP.jpeg',
    },
    {
      id: 3,
      username: '@mayalluzz',
      niche: 'Moda Feminina',
      followers: '9.491',
      likes: '113,9 mil',
      link: 'https://www.tiktok.com/@mayalluzz?_r=1&_t=ZS-99epu4fvwUK',
      image: 'https://i.imgur.com/tAY3Sm4.jpeg',
    },
    {
      id: 4,
      username: '@annamaria_767',
      niche: 'Moda Feminina',
      followers: '35 mil',
      likes: '469,5 mil',
      link: 'https://www.tiktok.com/@annamaria_767?_r=1&_t=ZS-99epx9nwOx8',
      image: 'https://i.imgur.com/7Bjmzb9.jpeg',
    },
    {
      id: 5,
      username: '@eubiamunizz',
      niche: 'Moda Feminina',
      followers: '24,3 mil',
      likes: '352,7 mil',
      link: 'https://www.tiktok.com/@eubiamunizz?_r=1&_t=ZS-99epyoigp6N',
      image: 'https://i.imgur.com/qzxIXRO.jpeg',
    },
    {
      id: 6,
      username: '@dicasdabeca.m',
      niche: 'Moda Feminina',
      followers: '13,3 mil',
      likes: '237,1 mil',
      link: 'https://www.tiktok.com/@dicasdabeca.m?_r=1&_t=ZS-99eq8Aau9Vi',
      image: 'https://i.imgur.com/5wMghDw.jpeg',
    },
    {
      id: 7,
      username: '@looksdalicia',
      niche: 'Moda Feminina',
      followers: '6.105',
      likes: '197,8 mil',
      link: 'https://www.tiktok.com/@looksdalicia?_r=1&_t=ZS-99eqBbKPcWN',
      image: 'https://i.imgur.com/mUFuDVE.jpeg',
    },
    {
      id: 8,
      username: '@eurayjusto',
      niche: 'Moda Feminina',
      followers: '16,4 mil',
      likes: '116,5 mil',
      link: 'https://www.tiktok.com/@eurayjusto?_r=1&_t=ZS-99eqKsnapOy',
      image: '/eurayjusto.jpg', 
    },
    {
      id: 9,
      username: '@dailyperlla',
      niche: 'Moda Feminina',
      followers: '5.064',
      likes: '119,6 mil',
      link: 'https://www.tiktok.com/@dailyperlla?_r=1&_t=ZS-99eqQH1eP60',
      image: 'https://i.imgur.com/5t0w2dT.jpeg',
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto pb-12">
      
      {/* Header */}
      <div className="mb-12 relative">
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#00e5ff]/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-xl">
            <ScanSearch className="w-5 h-5 text-[#00e5ff]" />
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-white/80 uppercase">MVZ Scanner</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-4 drop-shadow-2xl leading-[1.05]">
            Modelagem <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#ff007f]">Viral</span>
          </h1>
          
          <p className="text-white/60 text-base max-w-xl font-medium leading-relaxed drop-shadow-lg">
            Aqui estão os perfis que mais estão vendendo no mercado atual. Analise os hooks, a estrutura dos vídeos e modele o sucesso para a sua operação.
          </p>
        </div>
      </div>

      {/* Grid de Perfis (9:16 Aspect Ratio) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {profiles.map((profile) => (
          <div 
            key={profile.id} 
            className="group relative w-full aspect-[9/16] rounded-2xl md:rounded-[32px] overflow-hidden cursor-pointer shadow-2xl hover:shadow-[0_20px_50px_-10px_rgba(0,229,255,0.2)] transition-all duration-700 hover:-translate-y-2 border border-white/5"
          >
            {/* Background Image (TikTok/Reels print) */}
            <img 
              src={profile.image} 
              alt={profile.username} 
              className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700" 
            />
            
            {/* Dark Gradient overlays to ensure readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/60 via-transparent to-transparent opacity-60" />

            {/* Inner Border glow on hover */}
            <div className="absolute inset-0 border-[2px] border-white/5 group-hover:border-[#00e5ff]/30 rounded-[32px] transition-colors duration-700 pointer-events-none z-20" />

            {/* Top Section: Niche Badge */}
            <div className="absolute top-6 left-6 z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest shadow-lg">
                {profile.niche}
              </div>
            </div>

            {/* Content overlaid at the bottom */}
            <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end h-full z-10">
              
              {/* Profile Name */}
              <h3 className="font-black text-lg md:text-2xl text-white group-hover:text-[#00e5ff] transition-colors duration-500 mb-2 md:mb-4 drop-shadow-2xl flex items-center gap-2">
                {profile.username}
              </h3>
              
              {/* Profile Stats */}
              <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-6">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 mb-1 text-white/50">
                    <Users className="w-3 h-3" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Seguidores</span>
                  </div>
                  <span className="text-sm md:text-lg font-black text-white">{profile.followers}</span>
                </div>
                <div className="w-[1px] h-8 bg-white/10" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 mb-1 text-[#00e5ff]">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Curtidas</span>
                  </div>
                  <span className="text-lg font-black text-white">{profile.likes}</span>
                </div>
              </div>
              
              {/* Action Button */}
              <a 
                href={profile.link}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] text-white bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-[#00e5ff] group-hover:text-black group-hover:border-[#00e5ff] transition-all duration-500 flex items-center justify-center gap-2 overflow-hidden relative shadow-[0_0_20px_rgba(0,0,0,0.3)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Analisar Perfil
                </span>
                {/* Hover fill effect */}
                <div 
                  className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                />
              </a>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
