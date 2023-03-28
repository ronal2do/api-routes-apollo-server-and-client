export type QuoteType = {
  id: Number,
  title: String,
  phrase: String,
}

export const QUOTES: Array<QuoteType | null> = [
  {id: 1, title: 'Separação', phrase: 'Tenha em casa duas lixeiras, uma para o lixo reciclável e outra para o lixo comum. E vale colar nelas os adesivos de identificação fornecidos de graça pelo ReciclaAPP. Além de informar os tipos de resíduos, eles estimulam as crianças a também separarem.'},
  {id: 2, title: 'Reciclagem', phrase: 'Uma bituca de cigarro leva 5 anos para se decompor. O correto é descartar numa lixeira, verificando antes se ela está apagada. Mas a melhor saída segue sendo parar de fumar. Sua saúde agradece.'},
  {id: 3, title: 'Reciclagem', phrase: 'Nunca descarte no ralo o óleo de cozinha usado, pois ele vai entupir seu encanamento. Coloque-o com um funil numa garrafa PET e depois leve a um ponto de coleta. O óleo de cozinha pode ser reaproveitando para fazer sabão.'},
  {id: 4, title: 'Separação', phrase: 'Quando for descartar papel, no lugar de amassar ou dobrar, prefira rasgar as folhas e desmontar as caixas. E, no lugar de jogar fora, veja se não vale usar o verso de uma impressão ou reutilizar a caixa.'},
  {id: 5, title: 'Separação', phrase: 'Prefira acomodar vidros e metais pontiagudos em caixas de papelão. Volumes menores podem ir em caixas de leite e os cacos em garrafas PET. Fazendo isso você facilita seu transporte e evita acidentes na hora da coleta e da triagem.'},
  {id: 6, title: 'Meio ambiente', phrase: 'Ainda que o uso doméstico seja responsável por apenas 10% do consumo de água, temos sempre o dever de racionar. Ao escovar o dente ou fazer a barba, deixe a torneira fechada. Não demore no banho e lave o carro com um balde no lugar da mangueira.'},
  {id: 7, title: 'Reciclagem', phrase: 'Um copo plástico descartável é usado por 8 minutos, tempo médio de consumo de uma bebida, e leva 100 anos para se decompor. Prefira canecas de vidro ou cerâmica. Além de reutilizáveis, elas são mais higiênicas e conservam melhor a temperatura das bebidas.'},
  {id: 8, title: 'Reciclagem', phrase: 'Muitas vezes imprimimos sem necessidade textos e documentos que podem ser lidos em tela. E, pior, depois o jogamos fora sem utilizar seu verso como rascunho. Ao fazer isso, geramos mais gastos e mais lixo.'},
  {id: 9, title: 'Reciclagem', phrase: 'Bolo de casca de banana, pão com talo de agrião, chips de casca de abóbora. Os livros de receitas nos ensinam diversas delícias utilizando ingredientes que normalmente descartamos. Pesquise, economize e ajude a reduzir a geração de resíduos orgânicos.'},
  {id: 10, title: 'Meio ambiente', phrase: 'Quem tem lavadora e vaso sanitário com caixa acoplada pode economizar água e dar novo uso aos galões de água mineral. Basta enchê-los com o último enxague da máquina e depois despejar na caixa até a boia subir. Uma lavagem enche até 5 galões de 6 litros.'},
  {id: 11, title: 'Serviços', phrase: 'No app, no site, no 996 479 495 do WhatsApp, tire a sua dúvida sobre o que é reciclável, dias das coletas comum e seletiva, locais do PEV e do Ecoponto, denúncia de descarte irregular e o que mais você quiser saber sobre nossos serviços.'},
  {id: 12, title: 'Serviços', phrase: 'Grandes volumes como móveis e eletrodomésticos velhos e podas de árvores têm um jeito certo de descartar. Basta ligar no 3169.2900 e agendar com o pessoal da coleta de resíduos sólidos especiais da Ambiental.'},
  {id: 13, title: 'Reciclagem', phrase: 'Tão importante quanto separar é reduzir a geração de resíduos. Na hora das compras, prefira sacolas reutilizáveis no lugar das sacolas plásticas. Elas são mais resistentes, espaçosas e charmosas.'},
  {id: 14, title: 'Meio ambiente', phrase: 'Lugar de PET é na lixeira de recicláveis. Quando descartada de forma errada, ela vai se acumular em um aterro sanitário ou, pior, irá entupir um bueiro, virar criadouro do mosquito da dengue ou maltratar a vida marinha.'},
  {id: 15, title: 'Separação', phrase: 'Antes de descartar embalagens recicláveis, veja se o material está limpo e seco, sem resto de alimentos, produtos, gordura, cola ou adesivos. Fazer isso na hora da triagem é mais custoso.'},
  {id: 16, title: 'Serviços', phrase: 'Pneus velhos de motos, bicicletas e carros podem ser descartados no PEV do pátio da Secretaria de Obras (Rua Bento Cunha, 360) em horário comercial. Lembre-se: pneus largados de qualquer jeito são criadouros do mosquito da dengue.'},
  {id: 17, title: 'Serviços', phrase: 'Quem, por qualquer razão, preferir conversar diretamente conosco, basta ir, das 8h às 18h, ao nosso posto de atendimento da Ambiental (Relação com Usuários) na Rua 2028, nº 80, no Centro de Balneário.'},
  {id: 18, title: 'Separação', phrase: 'O lixo comum como restos de alimentos, cascas, folhas, papel higiênico, fraldas e absorventes usados é recolhido pelas equipes da coleta regular de resíduos sólidos. Cuidado para não misturar os recicláveis com esse lixo comum.'},
  {id: 19, title: 'Serviços', phrase: 'Perder um animal de estimação faz parte da vida. E, nesses casos, entre em contato com a equipe da Ambiental pelo 3169.2900. Eles saberão dar um destino adequado ao animal morto.'},
  {id: 20, title: 'Separação', phrase: 'As lojas que vendem pilhas normalmente têm uma lixeira especial para recolher pilhas e baterias usadas. Caso você não encontre uma lixeira dessas numa loja próxima, leve as pilhas usadas ao Ecoponto ou ao PEV ou fale a gente pelo 996 479 495 (WhatsApp).'},
  {id: 21, title: 'Separação', phrase: 'Ainda que seja tudo lixo comum, o lixo orgânico (cascas e restos de alimentos) pode, por exemplo, virar adubo. Já o rejeito (fralda, absorvente e preservativo usados), pela dificuldade ou impossibilidade de reutilização, vai parar no aterro sanitário.'},
  {id: 22, title: 'Reciclagem', phrase: 'Com ou sem lei proibindo a uso dos canudos plásticos descartáveis, prefira sempre os canudos reutilizáveis. De madeira, bambu, metal, eles são práticos e higiênicos e, claro, ajudam a preservar o meio ambiente.'},
  {id: 23, title: 'Reciclagem', phrase: 'Tampas e garrafas plásticas, caixas de papel e tiras de pano podem ser matérias primas de bonecos, casas e carros de brinquedo. Além do reaproveitamento de materiais, a atividade estimula a criatividade e a interação entre pais e filhos.'},
  {id: 24, title: 'Meio ambiente', phrase: 'Aparelhos, baterias e acessórios de celulares velhos não devem ser colocados no lixo comum nem no lixo reciclável. Eles devem ser devolvidos direto nas lojas que vendem celulares.'},
  {id: 25, title: 'Meio ambiente', phrase: 'Tão importante quanto deixar um planeta melhor para nossos filhos é deixarmos filhos melhores para o nosso planeta. Em casa, com os amigos, na escola, vamos conversar e estimular as boas práticas ambientais.'},
  {id: 26, title: 'Separação', phrase: 'Remédio vencido não é lixo comum nem lixo reciclável. Farmácias e unidades de saúde normalmente possuem lixeiras especiais para medicamentos vencidos. Na dúvida, fale com a gente pelo 996 479 495 (WhatsApp).'},
  {id: 27, title: 'Reciclagem', phrase: 'Balneário Camboriú recicla hoje apenas 6% do seu lixo. Com a participação de todos, queremos elevar esse índice para 30%, uma mudança que passa pela separação do lixo comum do reciclável. Vamos dar o exemplo.'},
  {id: 28, title: 'Meio ambiente', phrase: 'Reduzir a geração de lixo. Reutilizar materiais e embalagens. Reciclar os resíduos separados. Quando a gente pratica os 3Rs, economiza em casa, ajuda o próximo, cuida da cidade e respeita a natureza.'},
  {id: 29, title: 'Meio ambiente', phrase: 'Rio e praias não são lixeiras. Garantir sua limpeza é cuidar da qualidade da água que consumimos, do mar onde nos banhamos e do habitat de inúmeros seres vivos. Não se engane: uma sujeira a mais faz a diferença.'},
  {id: 30, title: 'Meio ambiente', phrase: 'Em restaurantes ou em casa, atenção com a quantidade de comida que você coloca no prato. O desperdício, além de pesar no seu bolso, pesa na consciência e no volume dos resíduos orgânicos que se acumulam no aterro sanitário.'},
]

export const CUPOMS_MOCK = [
  {id: 1, number: 123123, serie: 'A', color: '#EA4C35'},
  {id: 2, number: 323123, serie: 'A', color: '#EA4C35'},
  {id: 3, number: 413123, serie: 'B', color: '#F59C00'},
  {id: 4, number: 123123, serie: 'A', color: '#EA4C35'},
  {id: 5, number: 323123, serie: 'A', color: '#EA4C35'},
  {id: 6, number: 413123, serie: 'B', color: '#F59C00'},
]

export const LIXO_COMUM_MOCK = [
  { id: 1,
    title: 'Orgânico',
    text: [
      '• Restos de alimento',
      '• Cascas de frutas',
      '• Ovos',
      '• Legumes']
    },
  { id: 2,
    title: 'Rejeito',
    text: [
      '• Absorvente ',
      '• Preservativo',
      '• Fralda e papel higiênico usados',
      '• Fita adesiva e fita crepe',
      '• Plástico filme e adesivos em geral',
      '• Pratos e porcelanas quebradas',
      '• Esponjas e palhas de aço',
  ] }
]

export const LIXO_RECICLAVEL_MOCK = [
  { id: 1, title: 'Vidros', text: [
    '• Frascos e garrafas',
    '• Vidros de conserva ou de produtos de limpeza',
    '• Copos quebrados',
    '• Lâmpadas incandescentes ',
  ] },
  { id: 2, title: 'Metais', text: [
    '• Latas de bebidas',
    '• Tampas de garrafas',
    '• Latas de alimentos',
    '• Pregos e parafusos',
    '• Fios e arames',
  ] },
  { id: 3, title: 'Plásticos', text: [
    '• Garrafas',
    '• Embalagens de alimentos ou de produtos de limpeza',
    '• Potes de cremes e xampus',
    '• Tubos e canos',
    '• Brinquedos',
    '• Sacos, sacolas e saquinhos de leite',
  ] },
  { id: 4, title: 'Papéis', text: [
    '• Jornais e revistas',
    '• Folhas e impressos em geral',
    '• Caixas de papelão',
    '• Embalagens longa-vida',
    '• Embrulhos',
  ] },
]

export const COLETA_MOCK = [
  {
    id: 1,
    group: 'centro',
    place: 'Avenidas Atlântica e Brasil',
    date: 'Todos os dias*' },
  {
    id: 2,
    group: 'centro',
    place: 'Transversais Atlântica e Brasil',
    date: 'Segundas-feiras' },
  {
    id: 3,
    group: 'centro',
    place: 'Rua 1500 até Rua 10, entre Terceira Av. e Av. do Estado, todas as ruas',
    date: 'Terças-feiras de manhã'
  },
  {
    id: 4,
    group: 'centro',
    place: 'Rua 3100 até Rua 1542, entre Terceira Av. e Marginal, todas as ruas',
    date: 'Quartas-feiras de manhã'
  },
  {
    id: 5,
    group: 'centro',
    place: 'Rua Osmar Nunes até Rua 1500, entre Av. Brasil e Av. do Estado/Terceira Av., todas as ruas',
    date: 'Quintas-feiras de manhã'
  },
  {
    id: 6,
    group: 'centro',
    place: 'Rua 3500 até Rua 3700, entre Av. Brasil e Marginal, todas as ruas',
    date: 'Sextas-feiras de manhã'
  },
  {
    id: 7,
    group: 'vila',
    place:  'Rua Dom Afonso',
    date: 'Todos os dias',
  },
  {
    id: 8,
    group: 'vila',
    place:  'Demais ruas da Vila Real e Iate Clube',
    date: 'Quartas-feiras à tarde',
  },
{ id: 9,
  group: 'nacoes',
place: 'Rua Itália até Rua Tailândia, entre Av. Martin Luther e Av. Palestina',
date: 'Terças-feiras de manhã',
},
{ id: 10,
  group: 'nacoes',
place: 'Rua Itália até Rua Venezuela, entre Av. Martin Luther e Av. do Estado',
date: 'Terças-feiras à tarde',
},
{ id: 11,
  group: 'nacoes',
place: 'Rua Carcará até Irlanda do Norte	',
date: 'Terças-feiras à tarde',
},
{ id: 12,
  group: 'outros',
place: 'Bandeirantes, Nova Esperança',
date: 'Quintas-feiras à tarde',
},
{ id: 13,
  group: 'outros',
place: 'Bairro dos Estados',
date: 'Quartas-feiras à tarde',
},
{ id: 14,
  group: 'outros',
place: 'Loteamento Schultz',
date: 'Quintas-feiras à tarde',
},
{ id: 15,
  group: 'outros',
place: 'Pioneiros, Bruno Silva até Valmor Boaventura',
date: 'Quintas-feiras à tarde',
},
{ id: 16,
  group: 'outros',
place: 'Municípios',
date: 'Sextas-feiras à tarde',
},
{ id: 17,
  group: 'outros',
place: 'Ariribá',
date: 'Sextas-feiras à tarde',
},
{ id: 18,
  group: 'outros',
place: 'Barra, São Judas, Interpraias',
date: 'Sábados',
},
{ id: 19,
  group: 'outros',
place: 'Praia dos Amores',
date: 'Segundas-feiras',
},
]

export const QUESTIONS_MOCK = [
  {
    id: 0,
    introduction: "Diferente das matérias orgânicas (plantas, fungos, animais), o metal, o vidro e o plástico não são decompostos por agentes de putrefação como bactérias e protozoários. Com o tempo, o atrito, a luz e as reações químicas “quebram” sua massa em pequenas partículas.",
    label: "Quanto tempo leva um canudo plástico para se decompor?",
    answers: [
      '60 anos',
      '150 anos',
      '320 anos',
      '500 anos'
    ],
    correctAnswer: 4,
    level: 'HARD'
  },
  {
    id: 1,
    introduction: "Metal maleável, leve e resistente, o alumínio é um dos preferidos da indústria de embalagens. Outra vantagem dele é sua reutilização quase infinita, ou seja, ele pode ser processado várias vezes com perda perto de zero.",
    label: "Qual o país é campeão na reciclagem de alumínio?",
    answers: [
      'Brasil',
      'Holanda',
      'Japão',
      'Estados Unidos',
    ],
    correctAnswer: 1,
    level: 'MEDIUM'
  },
  {
    id: 2,
    introduction: "Alguns itens parecem recicláveis, mas, na verdade, não são. Um produto químico (cola, resina, tinta), uma base tóxica ou um resto de alimento podem contaminar um resíduo dificultando sua reciclagem ou mesmo impedindo seu reaproveitamento.",
    label: "Qual desses resíduos é reciclável?",
    answers: [
      'Papel filme',
      'Lâmpada fluorescente',
      'Lâmpada incandescente',
      'Esponja de aço',
    ],
    correctAnswer: 1,
    level: 'HARD'
  },
  {
    id: 3,
    introduction: "Além de Balneário Camboriú, as equipes da Ambiental estão presentes em Indaial, Itajaí, Camboriú, São Francisco do Sul, Jaraguá do Sul, Itapema e Joinville realizando diversos serviços.",
    label: "Assinale a alternativa que inclui serviços realizados pela Ambiental em Balneário:",
    answers: [
      'Limpeza de calçadas e ruas e coleta de resíduos sólidos comuns.',
      'Coleta de resíduos recicláveis e de resíduos especiais.',
      'Coleta de resíduos de serviços de saúde e limpeza de praias.',
      'Todas as alternativas acima.',
    ],
    correctAnswer: 4,
    level: 'SOFT'
  }
]