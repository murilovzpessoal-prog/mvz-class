export interface LessonContent {
  type: string;
  link: string;
  support?: string;
}

export interface LessonItem {
  id: number;
  title: string;
  videoUrl?: string;
  description?: string;
  linkUrl?: string;
  content?: LessonContent;
}

export interface ModuleItem {
  id: number;
  tag: string;
  topText: string;
  subText: string;
  image: string;
  titleMain: string;
  titleSub: string;
  colorHex: string;
  aulas: LessonItem[];
}

export const modulesData: ModuleItem[] = [
  { 
    id: 1, tag: 'MÓDULO 01', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/252f9788-a9b1-4179-a028-86e63bfd9773.png', titleMain: 'SEJA BEM VINDO', titleSub: '', colorHex: '#ff007f',
    aulas: [
      { id: 101, title: 'Introdução à Comunidade', videoUrl: 'https://stream.cakto.com.br/9129cd6d-f024-48f5-a4bd-5d801cc2f23e/1080p/video.m3u8' },
      { id: 102, title: 'Direcionamento', videoUrl: 'https://stream.cakto.com.br/b50a1aa6-f9cb-4164-8b77-9b53e7d8346a/360p/video.m3u8' },
      { id: 103, title: 'Como ativar o shop', videoUrl: 'https://stream.cakto.com.br/010ff3a9-bf19-45ae-acb0-b7dca09d43e9/playlist.m3u8' },
      { id: 104, title: 'Conhecendo o tiktok shop', videoUrl: 'https://stream.cakto.com.br/5ad5cbb9-54fc-4c66-a5bd-c08d027fdd0f/playlist.m3u8' },
      { id: 105, title: 'Configurando dados bancarios', videoUrl: 'https://stream.cakto.com.br/010ff3a9-bf19-45ae-acb0-b7dca09d43e9/playlist.m3u8' },
      { id: 106, title: 'Aprendo sobre integridade da conta', videoUrl: 'https://stream.cakto.com.br/bfb00553-6456-4920-9484-e57ec42c4a18/360p/video.m3u8' }
    ]
  },
  { 
    id: 2, tag: 'MÓDULO 02', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/17c3942d-5a69-419a-bfd3-205ddaed1261.png', titleMain: 'NICHOS', titleSub: 'virais', colorHex: '#00e5ff',
    aulas: [
      { id: 201, title: 'AVISO !', videoUrl: 'https://stream.cakto.com.br/802fbc6d-46c0-45ef-975e-1c9b01d92ff5/720p/video.m3u8' },
      { id: 202, title: 'Nicho de presentes', videoUrl: 'https://stream.cakto.com.br/0990ee46-78c1-4387-aa09-e44b4c273049/360p/video.m3u8' },
      { id: 203, title: 'Nicho de moda', videoUrl: 'https://stream.cakto.com.br/cfea1c18-a138-4f57-8dee-1eb473fcc160/1080p/video.m3u8' },
      { id: 204, title: 'Nicho infantil', videoUrl: 'https://stream.cakto.com.br/6394101e-42de-42cf-9cfc-18af3cddb982/360p/video.m3u8' },
      { id: 205, title: 'Dicas para aplicação', videoUrl: 'https://stream.cakto.com.br/dac37033-1d1a-44b0-9f09-8f39a4b5b7c7/720p/video.m3u8' }
    ]
  },
  { 
    id: 3, tag: 'MÓDULO 03', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/f7da23fe-cacc-49b4-a663-882c28b203dd.png', titleMain: 'COMUNIDADE', titleSub: 'whatsapp', colorHex: '#00ff66', 
    aulas: [
      { 
        id: 301, 
        title: 'Acesso Exclusivo à Comunidade', 
        content: { type: 'whatsapp', link: 'https://chat.whatsapp.com/IhGpLowoewmATKktHv2Fo3', support: '35 998919654' }
      }
    ]
  },
  { 
    id: 4, tag: 'MÓDULO 04', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/7ccc3f8d-29ff-4374-987c-9a0c64c6fecb.png', titleMain: 'DISCORD', titleSub: '', colorHex: '#ff3333', 
    aulas: [
      { 
        id: 401, 
        title: 'Explicação sobre o Discord', 
        videoUrl: 'https://stream.cakto.com.br/6f4388b3-be8b-446d-bc1d-151a9a2ace36/1080p/video.m3u8',
        description: 'Assista a explicação e depois acesse nosso servidor oficial:',
        linkUrl: 'https://discord.com/invite/z2bdhZwKRS'
      },
      { 
        id: 402, 
        title: 'Como entrar dentro do nosso Discord', 
        videoUrl: 'https://stream.cakto.com.br/a519e709-0b7e-4e44-98b0-68caf3930957/360p/video.m3u8',
        description: 'Siga o passo a passo do vídeo para acessar através do link oficial:',
        linkUrl: 'https://discord.com/invite/z2bdhZwKRS'
      }
    ]
  },
  { 
    id: 5, tag: 'MÓDULO 05', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/ed478f83-3b57-4926-a633-f3418d518cb9.png', titleMain: 'FLOW', titleSub: 'ultra', colorHex: '#ff00ff', 
    aulas: [
      {
        id: 501,
        title: 'Flow e rateios',
        videoUrl: 'https://stream.cakto.com.br/526bde73-f61c-4c91-bb81-ea9c12b57ac0/720p/video.m3u8'
      }
    ]
  },
  { 
    id: 6, tag: 'MÓDULO 06', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/c2a1c850-f423-412c-af69-a5776a3a0db1.png', titleMain: 'ESCOLHENDO', titleSub: 'os produtos', colorHex: '#00e5ff', 
    aulas: [
      {
        id: 601,
        title: 'Os produtos mais vendidos',
        videoUrl: 'https://stream.cakto.com.br/9e186269-b0e8-48bf-ba7c-a5ea41982642/720p/video.m3u8'
      },
      {
        id: 602,
        title: 'identificando um bom produto [ na prática ]',
        videoUrl: 'https://stream.cakto.com.br/4b95978f-7af4-457c-a1d2-574ab4df53e0/360p/video.m3u8'
      },
      {
        id: 603,
        title: 'Encontrando ambientes',
        videoUrl: 'https://stream.cakto.com.br/76a2127c-8e9b-4bc6-9151-525d14c3c013/360p/video.m3u8'
      }
    ]
  },
  { 
    id: 7, tag: 'MÓDULO 07', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/046220dd-1d06-44a1-92fa-0debdafd4850.png', titleMain: 'ESTRUTURA', titleSub: 'validada', colorHex: '#ffaa00', 
    aulas: [
      {
        id: 701,
        title: 'Estratégias de postagem para aumentar suas vendas',
        videoUrl: 'https://stream.cakto.com.br/d33e0d63-efd7-49e2-9c87-536a3e3dd8b1/720p/video.m3u8'
      }
    ]
  },
  { 
    id: 8, tag: 'MÓDULO 08', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/59063f88-4867-486f-95e8-6cb4d1ed0f2b.png', titleMain: 'BIBLIOTECA', titleSub: 'de prompts', colorHex: '#ff007f', 
    aulas: [
      {
        id: 801,
        title: 'Acessando Biblioteca',
        videoUrl: 'https://stream.cakto.com.br/01c59e23-3b60-4cac-b8d9-1b4d0cc181c5/720p/video.m3u8',
        description: 'Clique no botão abaixo para acessar a Biblioteca e coloque esse token de acesso: #MVZ01',
        linkUrl: 'https://promptsmvz.site/'
      }
    ]
  },
  { 
    id: 9, tag: 'MÓDULO 09', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/fe011b06-0185-4b23-aeb0-b51b72a91e00.png', titleMain: 'ESTILO', titleSub: 'pov', colorHex: '#00ff66', 
    aulas: [
      {
        id: 901,
        title: 'Dominando cenário',
        videoUrl: 'https://stream.cakto.com.br/57e20173-b04b-4788-a6ae-563d4029cc60/1080p/video.m3u8'
      },
      {
        id: 902,
        title: 'Gerando videos',
        videoUrl: 'https://stream.cakto.com.br/96e616d0-0946-42ec-82fb-1ccf31ac4b84/360p/video.m3u8'
      },
      {
        id: 903,
        title: 'Editando e Postando',
        videoUrl: 'https://stream.cakto.com.br/f6d6f978-5a1b-490e-a75e-98df23b7cd0c/playlist.m3u8'
      },
      {
        id: 904,
        title: 'POV + YTB',
        videoUrl: 'https://stream.cakto.com.br/134d24f5-6807-43e8-9890-e193135644ec/playlist.m3u8'
      }
    ]
  },
  { 
    id: 10, tag: 'MÓDULO 10', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/b09a8a12-f1ae-45a0-a077-eeec4ec7babe.png', titleMain: 'CABIDE', titleSub: '', colorHex: '#00e5ff', 
    aulas: [
      {
        id: 1001,
        title: 'Introdução',
        videoUrl: 'https://stream.cakto.com.br/302d41df-700f-4a03-b714-b9b1d9fc1649/720p/video.m3u8'
      },
      {
        id: 1002,
        title: 'criando cenário',
        videoUrl: 'https://stream.cakto.com.br/e71eb732-fb18-44b0-a366-f832704d6f32/360p/video.m3u8'
      },
      {
        id: 1003,
        title: 'colocando roupa no cabide',
        videoUrl: 'https://stream.cakto.com.br/56f0596c-7f16-435c-95a7-e25aba03abcf/playlist.m3u8'
      },
      {
        id: 1004,
        title: 'Gerando video',
        videoUrl: 'https://stream.cakto.com.br/011c0587-f7a0-49cc-92da-5c08809af0bb/playlist.m3u8'
      },
      {
        id: 1005,
        title: 'Editando e Postando',
        videoUrl: 'https://stream.cakto.com.br/2b41a4eb-bbfa-4c8e-8a1e-7eecb5f44e33/playlist.m3u8'
      }
    ]
  },
  { 
    id: 11, tag: 'MÓDULO 11', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/7daef890-76c3-401f-8154-d0953f492b60.png', titleMain: 'BUMERANGUE', titleSub: '', colorHex: '#ff3333', 
    aulas: [
      {
        id: 1101,
        title: 'Introdução',
        videoUrl: 'https://stream.cakto.com.br/8e5b5302-ef76-4942-a0c0-dc24850fdcfd/720p/video.m3u8'
      },
      {
        id: 1102,
        title: 'Pegando cenário',
        videoUrl: 'https://stream.cakto.com.br/edf36bc0-947f-4f4e-94a9-c8c9d8c97682/360p/video.m3u8'
      },
      {
        id: 1103,
        title: 'Modificando roupas',
        videoUrl: 'https://stream.cakto.com.br/7db42a8c-83e4-435e-bc1d-f458f26909b6/playlist.m3u8'
      },
      {
        id: 1104,
        title: 'Gerando video',
        videoUrl: 'https://stream.cakto.com.br/b5673c9f-0a1a-4e29-a8e3-50c921c8b95e/360p/video.m3u8'
      },
      {
        id: 1105,
        title: 'Editando e postando',
        videoUrl: 'https://stream.cakto.com.br/4f3059e8-92a1-4356-b60c-478440c9a158/720p/video.m3u8'
      }
    ]
  },
  { 
    id: 12, tag: 'MÓDULO 12', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/662f6afa-d669-4d94-99dc-c068c60d91ee.png', titleMain: 'PLUS SIZE', titleSub: '', colorHex: '#ff00ff', 
    aulas: [
      {
        id: 1201,
        title: 'Introdução',
        videoUrl: 'https://stream.cakto.com.br/c5d9c8c9-ac47-4495-a60c-fe8334b74a08/720p/video.m3u8'
      },
      {
        id: 1202,
        title: 'Criando influencer',
        videoUrl: 'https://stream.cakto.com.br/84657f2b-ced1-408e-88ae-7b5cd7962f20/720p/video.m3u8'
      },
      {
        id: 1203,
        title: 'Colocando roupa',
        videoUrl: 'https://stream.cakto.com.br/38c593ff-25e9-474c-86d1-34a511ba5a99/720p/video.m3u8'
      },
      {
        id: 1204,
        title: 'Gerando video',
        videoUrl: 'https://stream.cakto.com.br/222acaea-b4c7-4557-b9df-ff035a68c65f/720p/video.m3u8'
      },
      {
        id: 1205,
        title: 'Editando video',
        videoUrl: 'https://stream.cakto.com.br/c97cbb9f-99b6-4073-ae57-f0a9be9d3ed7/720p/video.m3u8'
      }
    ]
  },
  { 
    id: 13, tag: 'MÓDULO 13', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/bd817c26-83bd-44a4-a5e8-8931dc606fa3.png', titleMain: 'ZERO CUSTO', titleSub: '', colorHex: '#ffaa00', 
    aulas: [
      {
        id: 1301,
        title: 'Introdução',
        videoUrl: 'https://stream.cakto.com.br/ea68b277-3f6f-4c39-9494-490ee9af0216/720p/video.m3u8'
      },
      {
        id: 1302,
        title: 'Criando influencer | atualizado',
        videoUrl: 'https://stream.cakto.com.br/43b9ea5e-8268-430f-9308-f8342c4f0ca7/720p/video.m3u8',
        description: 'Clique no botão para acessar e coloque esse token: #MVZ01',
        linkUrl: 'https://promptsmvz.site/'
      },
      {
        id: 1303,
        title: 'Colocando roupa e cenario | Atualizado',
        videoUrl: 'https://stream.cakto.com.br/5c93db7c-83d5-41db-82fa-044f05aff764/720p/video.m3u8',
        description: 'Clique no botão para acessar e coloque esse token: #MVZ01',
        linkUrl: 'https://promptsmvz.site/'
      },
      {
        id: 1304,
        title: 'Gerando video 0 custo | Atualizado',
        videoUrl: 'https://stream.cakto.com.br/4396709d-cd54-405b-83e5-c5756cd0f77d/720p/video.m3u8',
        description: 'Clique no botão para acessar e coloque esse token: #MVZ01',
        linkUrl: 'https://promptsmvz.site/'
      },
      {
        id: 1305,
        title: 'Videos gratuitos ilimitados',
        videoUrl: 'https://stream.cakto.com.br/ce95ae50-9afd-4a1d-a18d-5857e1e71b7a/720p/video.m3u8'
      },
      {
        id: 1306,
        title: 'Biblioteca de prompts',
        videoUrl: 'https://stream.cakto.com.br/859e2bb6-d0fb-4173-810b-57d66399ee89/720p/video.m3u8',
        description: 'Clique no botão para acessar e coloque esse token: #MVZ01',
        linkUrl: 'https://promptsmvz.site/'
      },
      {
        id: 1307,
        title: 'Criando Influencer | 0 custo (Antigo)',
        videoUrl: 'https://stream.cakto.com.br/83f64f63-25a9-4537-9013-e65ad79bfd20/720p/video.m3u8',
        description: 'Acesse os prompts utilizados na aula através do link abaixo:',
        linkUrl: 'https://docs.google.com/document/d/1gdn4LH7UX2e5ykHK-K09Aco1h48yklMWGOLM4mEIyPM/edit?usp=sharing'
      },
      {
        id: 1308,
        title: 'Roupa e Cenário | 0 custo (Antigo)',
        videoUrl: 'https://stream.cakto.com.br/965bd897-fcf3-4e2d-9adc-710337546f52/720p/video.m3u8',
        description: 'Acesse os prompts utilizados na aula através do link abaixo:',
        linkUrl: 'https://docs.google.com/document/d/1gdn4LH7UX2e5ykHK-K09Aco1h48yklMWGOLM4mEIyPM/edit?usp=sharing'
      },
      {
        id: 1309,
        title: 'Gerando video | 0 custo (Antigo)',
        videoUrl: 'https://stream.cakto.com.br/1e9a580d-e203-49fb-858d-9622a53e7a1f/720p/video.m3u8',
        description: 'Acesse os prompts utilizados na aula através do link abaixo:',
        linkUrl: 'https://docs.google.com/document/d/1zaV0rQz6MMhyMQpPMIulCbxv1n-eMRkohFpZm1SuSpo/edit?usp=sharing'
      }
    ]
  },
  { 
    id: 14, tag: 'MÓDULO 14', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/07e9a80a-ceec-4b53-b7e4-994816c0989f.png', titleMain: 'GERADOR DE', titleSub: 'headline', colorHex: '#00e5ff', 
    aulas: [
      {
        id: 1401,
        title: 'Gerador',
        videoUrl: 'https://stream.cakto.com.br/48abec41-43b5-4691-8b0a-4d19b71bfe9a/1080p/video.m3u8',
        description: 'Clique no botão abaixo para acessar o gerador. Utilize o token de acesso: mvzhooks',
        linkUrl: 'https://mvzhooks.site/'
      }
    ]
  },
  { 
    id: 15, tag: 'MÓDULO 15', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/e95155f2-e00d-4c5f-8fb8-8c0e63f6ab45.png', titleMain: 'ONE PROMPT', titleSub: '', colorHex: '#ff007f', 
    aulas: [
      {
        id: 1501,
        title: 'Introdução',
        videoUrl: 'https://stream.cakto.com.br/e9ce1d8e-27c5-4a6c-b37b-030bfa5e564d/1080p/video.m3u8'
      },
      {
        id: 1502,
        title: 'Gerando Video',
        videoUrl: 'https://stream.cakto.com.br/7dee051a-55d5-4440-a787-5da948b29732/1080p/video.m3u8'
      },
      {
        id: 1503,
        title: 'Pegando Prompt',
        videoUrl: 'https://stream.cakto.com.br/841308cb-5138-4690-bc30-b0340f4642bc/1080p/video.m3u8'
      }
    ]
  },
  { 
    id: 16, tag: 'MÓDULO 16', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/406ba02c-bb02-4b04-8531-dec3bf672a57.png', titleMain: 'ALGORITMO', titleSub: 'tiktok shop', colorHex: '#00ff66', 
    aulas: [
      {
        id: 1601,
        title: 'Aprendendo sobre Algoritimo',
        videoUrl: 'https://stream.cakto.com.br/cbfcbe04-db3d-4955-b5e8-89b409d579d8/720p/video.m3u8'
      },
      {
        id: 1602,
        title: 'Metas',
        videoUrl: 'https://stream.cakto.com.br/88b5b3b5-9af3-4b27-98a2-9a9a19ed923b/720p/video.m3u8'
      },
      {
        id: 1603,
        title: 'Organização',
        videoUrl: 'https://stream.cakto.com.br/359320fc-f7dd-413a-b64b-0531a1d9ee47/720p/video.m3u8'
      },
      {
        id: 1604,
        title: 'Propósito',
        videoUrl: 'https://stream.cakto.com.br/2ebab4c0-9f8e-4978-a79d-f84d080efb4a/720p/video.m3u8'
      }
    ]
  },
  { 
    id: 17, tag: 'MÓDULO 17', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/ceab9adb-a74c-4b61-9c62-c28dc5ae6b84.png', titleMain: '1K EM 30 DIAS', titleSub: '', colorHex: '#ff3333', 
    aulas: [
      {
        id: 1701,
        title: 'Bem vindo ao desafio !',
        videoUrl: 'https://stream.cakto.com.br/e51b0efc-f1a7-473f-9294-1536843a1fa1/720p/video.m3u8'
      },
      {
        id: 1702,
        title: 'Criando sua modelo ultra realista',
        videoUrl: 'https://stream.cakto.com.br/8f28436a-9081-4dfe-ad1f-12a555207e8c/720p/video.m3u8'
      },
      {
        id: 1703,
        title: 'Como animar sua modelo',
        videoUrl: 'https://stream.cakto.com.br/8e698f47-980c-466b-8e5d-836fab18bdfd/720p/video.m3u8'
      },
      {
        id: 1704,
        title: 'Aprendendo a editar',
        videoUrl: 'https://stream.cakto.com.br/050371b0-e101-4294-84f8-e9a8d4ca644c/720p/video.m3u8'
      },
      {
        id: 1705,
        title: 'Plano / Direcionamento',
        videoUrl: 'https://stream.cakto.com.br/40e7227d-b145-4c9e-98f0-cdc2cf0dc11f/720p/video.m3u8'
      },
      {
        id: 1706,
        title: 'Grok',
        videoUrl: 'https://stream.cakto.com.br/16ae0160-76c9-4047-8508-44a5cf4a48d0/720p/video.m3u8',
        description: 'Acesse os PROMPTS utilizados na aula:',
        linkUrl: 'https://docs.google.com/document/d/1gdn4LH7UX2e5ykHK-K09Aco1h48yklMWGOLM4mEIyPM/edit?usp=sharing'
      },
      {
        id: 1707,
        title: 'Freepink',
        videoUrl: 'https://stream.cakto.com.br/df4ba060-89f3-46cd-a997-e37b60495a89/720p/video.m3u8',
        description: 'LINK DE ACESSO à ferramenta:',
        linkUrl: 'https://www.magnific.com/app/spaces/a1dba314-f454-4e15-8194-d65e9271dfcd/invite?payload=eyJpdiI6Ijh3OFJTWWVVSUdwOXFnZHNETEhSTnc9PSIsInZhbHVlIjoiRzg0Tk5EN2xLNEhEWDUvNDdNOFVjNkNkem9KRE9rN0N5a2dZcWVwZXA0Z0dnUWZxWnBrNU1IRlpLZ0xObTVTSHE0TWNtMjNKeEpPczhjNHFBRlZXRG45Zm82eml0ZG5ZYTdEclNkQVI0dVZ6Sml5Q0lCNWlHZVEydElzemJDd2kiLCJtYWMiOiI0ZmVjNGJiZGMwYjFhYWViMmZmYTFkODU3M2UyNzVkYzRhOWNiNjc3MDE1MDViMDM2NWMzMGE2NTI4YTNhZWQyIiwidGFnIjoiIn0%3D'
      },
      {
        id: 1708,
        title: 'Youtube create / 0 custo',
        videoUrl: 'https://stream.cakto.com.br/0a9118da-3ec7-475a-aa7e-57e9b9988141/720p/video.m3u8',
        description: 'LINK DOS PROMPTS:',
        linkUrl: 'https://docs.google.com/document/d/1zaV0rQz6MMhyMQpPMIulCbxv1n-eMRkohFpZm1SuSpo/edit?usp=sharing'
      },
      {
        id: 1709,
        title: 'Criando modelo ultra realista | atualizado',
        videoUrl: 'https://stream.cakto.com.br/43b9ea5e-8268-430f-9308-f8342c4f0ca7/720p/video.m3u8',
        description: 'Clique aqui e coloque esse token: #MVZ01',
        linkUrl: 'https://promptsmvz.site/'
      }
    ]
  },
  { 
    id: 18, tag: 'MÓDULO 18', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/31d6f521-48b4-4d68-a0d9-5859b89f63dd.png', titleMain: 'ESCALA', titleSub: '', colorHex: '#00e5ff', 
    aulas: [
      {
        id: 1801,
        title: 'Contando sobre a escala (introdução)',
        videoUrl: 'https://stream.cakto.com.br/8cf86be1-71a2-4775-9e0f-aa36e28c6ce3/720p/video.m3u8'
      },
      {
        id: 1802,
        title: 'Analisando dados',
        videoUrl: 'https://stream.cakto.com.br/e3810b51-25e3-436b-ac9e-f040f42645d4/720p/video.m3u8'
      },
      {
        id: 1803,
        title: 'Mentalidade',
        videoUrl: 'https://stream.cakto.com.br/e2e325a6-a7e3-4ef0-b54d-4ce818297fda/720p/video.m3u8'
      },
      {
        id: 1804,
        title: 'Estratégia 3,3,3',
        videoUrl: 'https://stream.cakto.com.br/1a9de576-9189-437c-8a95-908624ce80f0/720p/video.m3u8'
      }
    ]
  },
  { 
    id: 19, tag: 'MÓDULO 19', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/447e2fcf-054d-49ff-ab84-c996b132e894.png', titleMain: 'BÔNUS', titleSub: '', colorHex: '#ff00ff', 
    aulas: [
      {
        id: 1901,
        title: 'Viralpulse PC',
        videoUrl: 'https://stream.cakto.com.br/4028efa1-6739-4170-a984-30a40703eda8/1080p/video.m3u8'
      },
      {
        id: 1902,
        title: 'Viralpulse Celular',
        videoUrl: 'https://stream.cakto.com.br/46216a35-2453-4283-b45e-bf6cfc5ab080/1080p/video.m3u8'
      }
    ]
  },
  { 
    id: 20, tag: 'MÓDULO 20', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/9ffd0bef-38fd-41ec-84f6-fb4df749f871.png', titleMain: '2K DE', titleSub: 'seguidores', colorHex: '#ffaa00', 
    aulas: [
      {
        id: 2001,
        title: 'Metodologia na prática',
        videoUrl: 'https://stream.cakto.com.br/5c04ccd8-eeec-40c8-b04d-38f9e19c0d1e/720p/video.m3u8'
      }
    ]
  },
  { id: 21, tag: 'MÓDULO 21', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/6449bf18-4ab9-4970-8951-b7d6d8d9a521.png', titleMain: 'BÔNUS AVATAR', titleSub: 'dançando', colorHex: '#00e5ff', aulas: [] },
  { id: 22, tag: 'MÓDULO 22', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/25202d0e-7aa9-48b4-b7ac-4d5145d7e67a.png', titleMain: 'BÔNUS', titleSub: 'motion', colorHex: '#ff007f', aulas: [] },
  { id: 23, tag: 'MÓDULO 23', topText: 'MVZ Shop', subText: 'COMUNIDADE OFICIAL', image: 'https://cdn-checkout.cakto.com.br/images/b4a5a9b1-d7ab-41b8-9a45-b4840fc5338d.png', titleMain: 'REUNIÕES', titleSub: 'gravadas', colorHex: '#00ff66', aulas: [] }
];
