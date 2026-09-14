import React from 'react';
import { Users, MessageSquare, Heart, Share2 } from 'lucide-react';

export function Comunidade() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2 border-b border-border pb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Users className="w-8 h-8 text-primary" />
          Comunidade MVZ
        </h1>
        <p className="text-text-muted">Conecte-se, tire dúvidas e faça networking com outros membros.</p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-4 flex gap-4 items-start">
        <div className="w-10 h-10 rounded-full bg-background overflow-hidden border border-border flex-shrink-0">
          <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <textarea 
            className="w-full bg-background border border-border rounded-lg p-3 text-sm focus:outline-none focus:border-primary/50 min-h-[100px] resize-none"
            placeholder="Compartilhe um insight, dúvida ou vitória com a comunidade..."
          ></textarea>
          <div className="flex justify-end mt-3">
            <button className="bg-primary text-black font-semibold px-4 py-2 rounded-lg text-sm hover:bg-primary-hover transition-colors">
              Publicar
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {[1, 2, 3].map((post) => (
          <div key={post} className="bg-surface border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-background overflow-hidden border border-border">
                <img src={`https://i.pravatar.cc/150?img=${post + 20}`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Membro VIP {post}</h4>
                <p className="text-xs text-text-muted">Há {post * 2} horas</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              Acabei de aplicar a estratégia do módulo 2 e já consegui fechar minha primeira venda pelo TikTok Shop! A chave foi realmente acertar a hook do vídeo conforme o Henrique explicou. Muito obrigado a todos que me ajudaram tirando dúvidas aqui ontem! 🚀
            </p>

            <div className="flex items-center gap-6 pt-4 border-t border-border/50 text-text-muted">
              <button className="flex items-center gap-2 text-xs hover:text-primary transition-colors">
                <Heart className="w-4 h-4" /> 24 curtidas
              </button>
              <button className="flex items-center gap-2 text-xs hover:text-primary transition-colors">
                <MessageSquare className="w-4 h-4" /> 5 comentários
              </button>
              <button className="flex items-center gap-2 text-xs hover:text-white transition-colors ml-auto">
                <Share2 className="w-4 h-4" /> Compartilhar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
