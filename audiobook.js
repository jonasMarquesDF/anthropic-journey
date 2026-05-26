/* =========================================================
   audiobook.js — Conteúdo de estudo NA ÍNTEGRA, em PT-BR.
   Material original baseado na documentação pública oficial
   da Anthropic, escrito para ser ouvido como audiolivro.
   Cada curso tem entre 15 e 30 minutos de áudio em 1×.
   ========================================================= */

/* eslint-disable */
const AUDIOBOOK_TEXT = {

  /* =================================================
     CURSO 01 — AI Capabilities and Limitations
     ================================================= */
  1: [
    { title: "Bem-vindo à jornada Anthropic",
      body: "Olá. Você está iniciando o primeiro curso de uma trilha completa, do zero ao avançado, sobre tudo que a Anthropic oferece: Claude, a API, Claude Code, agentes, Skills, MCP e certificação. Esse primeiro curso é o ponto de partida absoluto. Você não precisa saber nada antes. Não precisa ter conta na Anthropic. Não precisa de cartão de crédito. Só precisa de paciência e curiosidade. Nas próximas seções, vamos entender o que é um modelo de linguagem como o Claude, como ele realmente funciona por dentro, o que ele consegue fazer com excelência, e onde ele falha. Esse entendimento é a base de tudo. Sem ele, você vai usar a ferramenta com frustração e expectativas erradas. Com ele, você se torna alguém que sabe quando confiar no modelo e quando duvidar." },

    { title: "O que é um modelo de linguagem grande",
      body: "Claude é o que chamamos de modelo de linguagem grande, em inglês large language model, abreviado como LLM. Em palavras simples, ele é um programa que aprendeu a prever a próxima palavra em uma sequência de texto. Imagine alguém que leu praticamente toda a internet de qualidade, todos os livros disponíveis, toda a Wikipédia, milhões de artigos científicos, código aberto inteiro do GitHub. Essa pessoa, ao terminar de ler tudo, desenvolve uma intuição muito forte sobre como a linguagem funciona. Ela percebe padrões. Sabe que depois de uma pergunta vem uma resposta, sabe que depois de uma vírgula vem uma continuação, sabe que se você começa um código com a palavra def em Python, em algum momento vem dois pontos e uma quebra de linha. O Claude foi treinado dessa forma, mas em escala industrial, com bilhões de exemplos." },

    { title: "Como o treinamento acontece",
      body: "Existem três grandes etapas no treinamento. A primeira se chama pré-treinamento. Nessa fase, o modelo lê uma quantidade massiva de texto e tenta prever a próxima palavra a cada passo. Errou, ajusta. Acertou, reforça. Repete isso bilhões de vezes. No final dessa etapa, ele já tem conhecimento geral do mundo, mas ainda não sabe como ser útil. A segunda etapa se chama ajuste fino, ou supervised fine tuning. Aqui, humanos especialistas mostram exemplos do tipo: para essa pergunta, essa é a resposta ideal. O modelo aprende a se comportar como um assistente. A terceira etapa, talvez a mais importante para a Anthropic, é o reinforcement learning from human feedback, ou aprendizado por reforço com feedback humano. Pessoas avaliam respostas do modelo dizendo: essa foi melhor, essa foi pior. Com isso, o modelo aprende preferências sutis: ser educado, ser preciso, evitar respostas perigosas, admitir quando não sabe." },

    { title: "Constituição do Claude",
      body: "A Anthropic adicionou uma quarta camada chamada Constitutional AI. Em vez de só ensinar com humanos, eles deram para o modelo um conjunto de princípios escritos, uma espécie de constituição, e treinaram ele para se autocriticar com base nesses princípios. Por exemplo: a constituição diz que o assistente deve ser honesto. Quando o modelo gera uma resposta, ele mesmo verifica: essa resposta é honesta? Se não, refaz. Esse processo gera um modelo mais alinhado com valores humanos sem depender exclusivamente de avaliação manual. Os princípios da constituição são públicos e você pode lê-los no site da Anthropic. Eles guiam comportamentos como ser útil, ser inofensivo e ser honesto, nessa ordem de prioridade." },

    { title: "O que o Claude sabe",
      body: "Quando o treinamento termina, o modelo tem dentro dele uma representação compacta de tudo que viu. Ele sabe gramática de mais de cem idiomas. Sabe os principais fatos históricos. Sabe matemática até nível universitário avançado. Sabe escrever código em quase todas as linguagens populares. Sabe reconhecer estilos literários e imitá-los. Sabe analisar imagens quando você envia uma foto. Mas atenção: tudo isso é conhecimento congelado no momento do treinamento. Se o treinamento terminou em outubro de dois mil e vinte e cinco, o Claude não sabe sobre eventos que aconteceram depois disso. Ele não tem acesso à internet em tempo real, a menos que você dê acesso explícito através de ferramentas." },

    { title: "Capacidades reais bem documentadas",
      body: "Vamos listar onde o Claude se sai realmente bem. Primeiro, redação. Ele escreve textos longos com coerência, em vários estilos, formal ou informal, técnico ou poético, em português ou em qualquer idioma popular. Segundo, análise de documentos. Você pode colar um contrato de cinquenta páginas e pedir um resumo, identificação de cláusulas problemáticas, ou comparação com outro contrato. Terceiro, programação. Ele escreve, revisa, debuga e explica código em centenas de linguagens. Quarto, raciocínio. Ele consegue resolver problemas de lógica, matemática, planejamento e estratégia, especialmente quando você pede para ele pensar passo a passo. Quinto, tradução. Em vários pares de idiomas o desempenho é equivalente a tradutores profissionais para texto comum. Sexto, análise visual. Você manda uma imagem, gráfico, fotografia, screenshot, e ele lê, entende e responde sobre o conteúdo." },

    { title: "Limitações que você precisa saber",
      body: "Agora a parte mais importante. Saber onde o modelo erra economiza horas de frustração. A primeira limitação é a alucinação. O Claude pode inventar fatos com confiança, especialmente quando você pergunta sobre algo específico que ele não sabe direito. Ele pode citar livros que não existem, criar nomes de pessoas que nunca existiram, gerar URLs falsas. Sempre verifique fatos críticos. A segunda limitação é cálculo preciso. Para contas grandes, ele pode errar nas casas decimais. Use uma calculadora ou peça que ele escreva código Python para calcular, em vez de calcular de cabeça. A terceira limitação é dados em tempo real. Ele não sabe a cotação do dólar de hoje. Não sabe quem ganhou o jogo de ontem. Não sabe se aquele site ainda existe. Para isso, conecte ferramentas externas." },

    { title: "Mais limitações importantes",
      body: "A quarta limitação é a inconsistência. Se você fizer a mesma pergunta duas vezes, pode receber respostas diferentes. Isso é normal porque há aleatoriedade no processo de geração. Para tarefas onde consistência importa, você reduz um parâmetro chamado temperatura, que vai ser ensinado nos cursos da fase dois. A quinta limitação é raciocínio muito longo. Em problemas que exigem muitos passos lógicos encadeados, o Claude pode se perder no meio. A solução é quebrar em sub-problemas menores. A sexta limitação é memória entre sessões. Cada conversa é independente. Quando você fecha o chat e abre de novo, o Claude não lembra de nada da conversa anterior, a menos que você esteja usando recursos como Projects ou Memory, que adicionam contexto persistente." },

    { title: "Como conviver com as limitações",
      body: "A regra de ouro é tratar o Claude como um colaborador talentoso porém falível. Imagine um estagiário extremamente inteligente, com vasto conhecimento geral, mas que pode confabular sob pressão. Você não daria autonomia total para um estagiário em uma operação financeira de milhão de reais sem revisar. Trate o Claude assim. Para tarefas críticas, sempre verifique. Para tarefas exploratórias, deixe livre. Calibre a verificação ao risco da tarefa. Outra técnica útil é o ceticismo construtivo. Quando o modelo afirma algo que você não tem certeza, pergunte: como você sabe disso? Tem alguma fonte? Pode estar errado? Forçar metacognição reduz alucinação significativamente." },

    { title: "Os três tamanhos do Claude",
      body: "A Anthropic oferece o Claude em três tamanhos. O menor se chama Haiku, em homenagem ao poema japonês de três versos. É o mais rápido e o mais barato. Ideal para tarefas em alta escala, classificação simples, extração de dados estruturados. Em segundo, Sonnet, em homenagem ao poema italiano de catorze versos. É o equilíbrio entre velocidade, custo e qualidade. É o modelo que você vai usar na maioria dos casos. Em terceiro, Opus, a maior obra musical em escala. É o mais poderoso, mais lento e mais caro. Use quando precisar do máximo de raciocínio, análise profunda, ou tarefas onde a precisão importa mais que tudo. A regra prática é começar com Sonnet em qualquer projeto novo, e migrar para Haiku ou Opus conforme a necessidade." },

    { title: "Onde acessar o Claude",
      body: "Você acessa o Claude de várias formas. A primeira e mais simples é Claude ponto AI, no navegador. É grátis com um limite diário, e tem planos pagos com mais uso e recursos. A segunda é a API. Ali você integra o Claude em qualquer aplicação que escrever. Isso vai ser ensinado a partir do quarto curso desta jornada. A terceira é o Claude Desktop, um aplicativo nativo para Mac e Windows com features extras. A quarta é o Claude Code, focado em programação. A quinta é o Claude Cowork, focado em quem não programa. E a sexta é via parceiros de cloud: Amazon Bedrock e Google Vertex AI permitem usar o Claude diretamente da infraestrutura desses provedores, o que é importante para empresas grandes." },

    { title: "Boas práticas desde o primeiro dia",
      body: "Antes de fechar este curso, fixe estas regras. Primeiro, sempre dê contexto. Quanto mais informação relevante você fornecer, melhor a resposta. Segundo, seja específico. Em vez de pedir um resumo, peça um resumo de cinco bullet points, cada um com no máximo vinte palavras, focado em decisões tomadas. Terceiro, peça revisão. Depois que o modelo responder, peça que ele revise o próprio trabalho buscando erros. Quarto, use exemplos. Mostre como você quer a resposta com dois ou três exemplos. Quinto, divida tarefas grandes. Se a tarefa tem dez passos, faça em três conversas em vez de uma. Sexto, verifique fatos críticos antes de agir. Essas seis regras já te colocam à frente de noventa por cento dos usuários casuais." },

    { title: "Próximo passo",
      body: "Ao concluir este curso oficial na plataforma Skilljar da Anthropic, você terá um certificado e acesso a quizzes que reforçam o conteúdo. Marque o curso como concluído no tracker. Isso desbloqueia automaticamente a primeira aba do seu portfólio, sobre Fundamentos de IA. O próximo curso é o Claude 101, onde você vai colocar a mão na massa pela primeira vez na interface real do Claude, com projetos, artefatos e pesquisa profunda. Não pule. Mesmo que pareça básico, esse curso constrói intuição que será reaproveitada em todos os cursos seguintes. Bom estudo." }
  ],

  /* =================================================
     CURSO 02 — Claude 101
     ================================================= */
  2: [
    { title: "Claude na prática",
      body: "Bem-vindo ao Claude 101. Este é o segundo curso da sua jornada e o primeiro com a mão na massa. Aqui você vai navegar pela interface do Claude ponto AI e descobrir uma a uma todas as ferramentas integradas. São quinze lições no curso oficial. Vamos cobrir os conceitos centrais para você estar produtivo na sua primeira semana de uso." },

    { title: "Criando sua conta",
      body: "Vá em claude ponto AI no navegador. Clique em sign up. Use seu e-mail principal. O sistema envia um link de confirmação. Após confirmar, você cai direto numa tela de chat. Não precisa preencher cartão. O plano gratuito já permite explorar tudo que vamos ver aqui, com um limite diário razoável. Se quiser usar mais, o plano Pro libera uso muito maior, acesso a modelos mais poderosos como Opus, e features adicionais como projetos com mais arquivos." },

    { title: "A interface principal",
      body: "Na tela inicial você tem uma caixa de texto onde digita sua pergunta, igual qualquer chat. À esquerda fica a lateral com seu histórico de conversas, organizadas por data. Cada conversa pode ser favoritada, renomeada ou deletada. No topo, você escolhe o modelo: Sonnet por padrão, e Opus disponível em planos pagos. Ao lado da caixa de mensagem ficam botões para anexar arquivos, ativar pesquisa profunda ou ativar habilidades. Vamos passar por cada um." },

    { title: "Anexando arquivos",
      body: "Você pode anexar PDFs, imagens, planilhas, documentos do Word, código fonte. O Claude lê o conteúdo e raciocina sobre ele. PDF de cem páginas, sem problema. Captura de tela com erro, ele identifica e sugere solução. Foto de quadro branco com diagrama, ele lê. Cada arquivo entra no contexto da conversa atual. Mas atenção: arquivos consomem tokens, e há um limite por mensagem. Para arquivos muito grandes, considere usar Projects, que vamos ver em seguida." },

    { title: "Projetos",
      body: "Projetos são pastas de contexto persistente. Você cria um projeto, dá um nome, escreve instruções iniciais, e anexa documentos relevantes. A partir daí, todas as conversas iniciadas dentro desse projeto começam já com aquele contexto carregado. Imagine um projeto chamado Tese de Doutorado. Você anexa os capítulos, sua bibliografia, suas anotações. Toda conversa nesse projeto sabe sobre seu trabalho. Você não precisa ficar reanexando arquivos. Dois ou três projetos bem montados economizam horas por semana e tornam o Claude muito mais útil em trabalho contínuo." },

    { title: "Artefatos",
      body: "Artefato é um bloco visual que aparece ao lado direito da conversa quando o Claude gera código, documento longo, diagrama ou pequena aplicação web. Em vez do conteúdo aparecer misturado no meio da conversa, ele ganha um painel próprio. Você pode editar, copiar, exportar, ou pedir para o Claude fazer mudanças no artefato sem misturar com o resto da conversa. Para quem programa, artefato com código Python ou JavaScript funcional roda na hora. Você vê o resultado, ajusta, vê de novo. Esse fluxo iterativo é uma das coisas mais poderosas da interface." },

    { title: "Pesquisa profunda",
      body: "Pesquisa profunda, em inglês deep research, é um modo onde o Claude faz buscas estruturadas na web, lê várias fontes, sintetiza e devolve um relatório com citações. Use quando precisar entender um tópico novo com qualidade. Por exemplo, peça uma análise comparativa entre cinco frameworks de front-end, com prós, contras, popularidade e curva de aprendizado. O Claude vai navegar, ler artigos recentes, e devolver um documento estruturado. Cada afirmação importante vem com link da fonte. Você verifica, aprende, e tem material para tomar decisão." },

    { title: "Habilidades, ou Skills",
      body: "Skills são pacotes de instruções em markdown que o Claude carrega automaticamente quando reconhece o contexto. Você pode ativar habilidades pré-prontas da Anthropic, ou criar suas próprias. Imagine uma skill chamada Revisão de Contratos Brasileiros, que tem dentro instruções sobre o que olhar, formato de saída padrão, glossário jurídico. Toda vez que você cola um contrato no chat e pede revisão, essa skill é aplicada automaticamente, mesmo que você não cite ela explicitamente. As Skills viram parte da personalidade do seu Claude. Esse tema é tão importante que tem um curso inteiro dedicado, mais à frente." },

    { title: "Cowork",
      body: "Cowork é o agente de desktop integrado, focado em pessoas que não programam. Você descreve uma tarefa em linguagem natural, e o Cowork executa multi-etapas no seu computador: abre arquivos, lê documentos, organiza pastas, atualiza planilhas, faz pesquisa, escreve relatórios. Você acompanha tudo em tempo real e pode interromper, ajustar ou redirecionar. Para profissionais administrativos, gestores, pesquisadores, advogados, é como ter uma estagiária digital trabalhando ao seu lado." },

    { title: "Claude Code",
      body: "Claude Code é o agente focado em programação. Ele roda no terminal, ou integrado ao VS Code e ao JetBrains. Você abre seu projeto, conversa em linguagem natural, e o Claude Code lê arquivos, escreve código, roda comandos, faz commits. É uma ferramenta para desenvolvedores. Tem curso próprio mais à frente." },

    { title: "Conexões com ferramentas externas",
      body: "Dentro do Claude você pode conectar serviços externos: Google Drive, Notion, Slack, GitHub, e mais. Cada conexão dá ao Claude permissão de ler, e às vezes escrever, naquele serviço específico. Com Drive conectado, você pede: encontre o documento sobre proposta da empresa X, abra, e me resuma os termos comerciais. Com GitHub conectado, você pede: liste as últimas dez issues abertas no repositório Y. Cada conexão você autoriza explicitamente, e pode revogar quando quiser. Essas integrações tornam o Claude um centro de produtividade real." },

    { title: "Atalhos e produtividade",
      body: "Aprenda alguns atalhos. Crase abre uma sugestão de prompt. Barra abre um menu de comandos. Setas para cima trazem mensagens anteriores. Você pode editar uma mensagem que já enviou, e o Claude refaz a resposta a partir daquela edição, sem perder o resto da conversa. Você pode regenerar uma resposta. Pode dar feedback joia ou negativo, que ajuda no treinamento futuro. Pode compartilhar conversas como links públicos, útil para mostrar trabalho a colegas." },

    { title: "Memory",
      body: "O Claude tem um recurso de memória entre conversas, em planos pagos. Quando você compartilha algo importante sobre você ou seu trabalho, ele pode salvar isso e usar em conversas futuras. Você controla o que é lembrado e pode ver, editar ou apagar memórias a qualquer momento. Para uso pessoal, memórias úteis incluem: preferências de estilo, contexto profissional, projetos em andamento. Para uso empresarial, dá para ter um Claude que conhece o vocabulário e cultura da empresa." },

    { title: "Limites e boas práticas",
      body: "O plano gratuito tem um número limitado de mensagens por dia. Quando você atinge o limite, espera algumas horas, ou faz upgrade. Para tarefas longas, prefira modelos menores como Sonnet, que consomem menos do seu limite. Quando uma conversa fica muito longa, o Claude começa a perder qualidade. Recomenda-se começar nova conversa a cada tópico novo. Use o título da conversa para reencontrar depois. Mantenha projetos por área temática para reaproveitar contexto sem inflar conversas individuais." },

    { title: "Plano de prática",
      body: "Para fixar este curso, faça os seguintes exercícios. Crie um projeto sobre algo seu, real, e tenha uma conversa de pelo menos cinco trocas dentro dele. Gere um artefato com código de um app simples, como uma calculadora de juros. Faça uma pesquisa profunda sobre um tópico que você queria entender. Conecte uma ferramenta externa, como Drive, e peça para o Claude trabalhar com um documento real. Isso garante que você dominou as bases. No próximo curso, AI Fluency, vamos sair da ferramenta e trabalhar o framework mental para usar IA de forma profissional." }
  ],

  /* =================================================
     CURSO 03 — AI Fluency: Framework & Foundations
     ================================================= */
  3: [
    { title: "Por que fluência em IA importa",
      body: "Bem-vindo ao terceiro curso. AI Fluency, em português Fluência em IA, é diferente dos cursos anteriores. Não vai ensinar uma ferramenta. Vai ensinar uma forma de pensar. Foi co-desenvolvido com pesquisadores de Stanford, Yale, Rice e da Universidade de Michigan. O objetivo é estabelecer um framework mental que você usa em qualquer interação com qualquer IA, agora e nas próximas décadas. Quem não tem esse framework, usa IA por sorte. Quem tem, extrai resultados profissionais consistentes." },

    { title: "O que é fluência",
      body: "Fluência é diferente de proficiência. Proficiência é saber operar uma ferramenta. Fluência é saber quando usar, qual ferramenta escolher, como combinar com outras, e quando não usar. Pense num músico fluente: ele não toca o instrumento de qualquer jeito, sabe escolher quando entrar, quando sair, quando dar espaço para outros. Em IA, fluência significa: saber qual problema realmente é problema de IA, qual modelo escolher, como prompar, como verificar, e como integrar com seu fluxo humano sem perder qualidade." },

    { title: "Os quatro pilares",
      body: "O framework central tem quatro pilares. Pilar um: clareza de objetivo. Antes de escrever um prompt, defina exatamente como sucesso parece. Pilar dois: contexto adequado. A IA só sabe o que você fornece. Pilar três: verificação. Toda saída crítica precisa ser checada. Pilar quatro: ética e segurança. Pense em quem é afetado pelo resultado, e nas implicações maiores. Vamos detalhar um a um." },

    { title: "Pilar um: clareza de objetivo",
      body: "A maior fonte de prompts ruins é objetivo difuso. Quando você pede algo vago, recebe algo vago. Antes de escrever, responda mentalmente: o que exatamente eu quero? Em que formato? Qual é o público? Qual é o tamanho? Qual é o tom? Quais são os critérios de sucesso? Por exemplo, pedir um e-mail é vago. Pedir um e-mail de follow-up para um cliente prospect que não respondeu há sete dias, em tom amistoso mas firme, com no máximo cento e cinquenta palavras, terminando com uma proposta de horário, é claro. A diferença de qualidade da resposta entre os dois prompts é absurda." },

    { title: "Pilar dois: contexto adequado",
      body: "A IA só conhece o que está no prompt e no que aprendeu durante o treinamento. Tudo que é específico do seu caso, ela não sabe. Forneça. O contexto inclui: papel da IA na situação, informação de fundo do problema, restrições, exemplos do que você considera bom, exemplos do que considera ruim, formato esperado. Quando você acha que está dando contexto demais, geralmente está dando o suficiente. A regra prática é: se uma pessoa nova na sua empresa não conseguiria fazer a tarefa só com o que está no prompt, o modelo também não vai conseguir bem." },

    { title: "Pilar três: verificação",
      body: "Saída de IA não é verdade automaticamente. Toda saída crítica precisa de verificação proporcional ao risco. Para uma piada, zero verificação. Para um e-mail informal, leitura rápida. Para um documento legal, revisão profissional. Para código de produção, teste rigoroso. Para informações factuais que você vai citar, busca em fontes primárias. Construa o hábito de calibrar verificação ao risco. Esse é o hábito que separa profissional de amador. Profissionais sabem onde a IA pode falhar e onde a auditoria é barata o suficiente para fazer sempre." },

    { title: "Pilar quatro: ética e segurança",
      body: "A IA amplifica seu impacto. Bom uso amplifica bem. Mau uso amplifica mal. Algumas perguntas a se fazer antes de uma tarefa: quem é afetado pelo resultado? O afetado consente? Se errar, qual o custo? Existe vies sistemático nessa decisão? Estou usando informação confidencial em ferramenta que não controlo? Estou criando algo que pode ser usado para enganar pessoas? Para tarefas pessoais, risco baixo. Para tarefas que afetam outros, especialmente em escala, esse pilar é tão importante quanto os anteriores." },

    { title: "O modelo das três perguntas",
      body: "Antes de qualquer interação importante, faça três perguntas. Primeira: este é realmente um problema de IA? Algumas tarefas são melhores resolvidas com calculadora, com Google, com um colega humano. Use IA quando ela traz vantagem real. Segunda: qual modelo e configuração? Tarefa simples não precisa do modelo mais poderoso. Decisão crítica precisa do mais cauteloso. Terceira: como vou verificar o resultado? Se a verificação for inviável, talvez não seja momento de usar IA. Esse filtro economiza horas e melhora a qualidade do que você produz com IA." },

    { title: "Eficiência prática",
      body: "Eficiência com IA não é só falar bonito com a máquina. É reduzir o ciclo entre intenção e resultado útil. Algumas técnicas aumentam eficiência drasticamente. Templates de prompt que você reutiliza. Conversas iniciadas dentro de Projects com contexto pronto. Skills que aplicam automaticamente o que antes você digitava toda vez. Saída em formato estruturado que você processa programaticamente. Combinação com automação tradicional, onde a IA faz só a parte que precisa de IA. Quem domina essas técnicas trabalha cinco a dez vezes mais rápido em tarefas onde IA agrega." },

    { title: "Ética: vieses",
      body: "Modelos de IA herdam vieses dos dados de treinamento. Eles podem refletir desigualdades históricas, estereótipos culturais, perspectivas limitadas. Quando você usa IA em decisões que envolvem pessoas, pergunte: este modelo já mostrou viés conhecido nesta área? Há alternativas? Como vou auditar a decisão? Em algumas áreas como contratação, crédito, justiça, os vieses são especialmente perigosos e há regulação crescente. Não use IA para decisões impactantes em pessoas sem revisão humana e auditoria sistemática." },

    { title: "Ética: confidencialidade",
      body: "Quando você cola dados em uma ferramenta de IA, esses dados podem ser usados para melhorar o modelo, dependendo dos termos. Para dados pessoais, dados de saúde, dados financeiros confidenciais, dados estratégicos da empresa, leia os termos antes de colar. Use modos enterprise quando disponíveis, que garantem que dados não treinam o modelo. Use deployment local ou via cloud privada para dados altamente sensíveis. Quando em dúvida, anonimize antes de colar. Tirar nomes, números de identificação, valores específicos, geralmente preserva a utilidade da consulta sem expor dados." },

    { title: "Ética: atribuição",
      body: "Conteúdo gerado por IA tem implicações de autoria. Em contexto acadêmico, geralmente é exigido declarar uso. Em jornalismo, está virando padrão revelar quando IA ajudou. No mercado de trabalho, depende do contrato e da cultura. Como princípio geral, seja transparente sobre o uso quando relevante para o destinatário. Não atribua à IA o que você fez. Não atribua a você o que a IA fez sem revisão. O melhor é o caminho do meio: a IA gera o rascunho, você revisa, edita, assume responsabilidade pelo resultado, e quando relevante, revela o processo." },

    { title: "Segurança operacional",
      body: "Trate o uso da IA como qualquer outra ferramenta de trabalho que toca dados sensíveis. Tenha senhas fortes nas contas. Use autenticação de dois fatores. Não compartilhe a conta entre pessoas. Saiba quem na sua equipe tem acesso ao que. Em uso empresarial, prefira contratos enterprise com cláusulas claras de retenção e exclusão de dados. Faça backup do que importa: copie conversas importantes para fora, exporte projetos. Não dependa exclusivamente da plataforma para guardar trabalho crítico." },

    { title: "Combinando com humanos",
      body: "IA não substitui humanos em quase nada. Substitui partes de tarefas. Quem rende mais é quem desenha fluxos onde IA faz a parte mecânica e humano faz a parte que exige julgamento, contexto profundo, responsabilidade legal. Em escrita: IA gera rascunho, humano edita voz e ajusta nuance. Em pesquisa: IA filtra mil fontes, humano valida e tira conclusões. Em código: IA escreve a primeira versão, humano arquiteta e revisa segurança. Quem tenta substituir humanos por IA no que IA não faz bem, paga caro. Quem combina, multiplica." },

    { title: "Aplicação no dia a dia",
      body: "Pegue uma tarefa que você faz com frequência. Aplique o framework. Defina objetivo claro. Escreva o contexto que falta. Defina como verificar. Pense na ética. Faça uma vez devagar. Refine o prompt. Salve como template. Da próxima vez, use o template. Em poucas semanas você terá uma biblioteca pessoal de prompts que resolvem suas tarefas recorrentes em fração do tempo. Essa biblioteca é seu ativo. Ela cresce com o tempo." },

    { title: "Encerramento",
      body: "AI Fluency é um curso curto mas de impacto enorme. Se você sair daqui com os quatro pilares na ponta da língua, e o hábito das três perguntas, todo o resto da jornada fica mais fácil. Os próximos cursos vão te dar habilidades técnicas. Mas habilidade técnica sem framework mental gera ferramenta perigosa. Framework sem habilidade técnica gera filósofo sem mãos. Combinando os dois, você se torna profissional fluente em IA: alguém que sabe quando, como e por que usar, em qualquer cenário." }
  ],

  /* =================================================
     CURSO 04 — Anthropic API Fundamentals
     ================================================= */
  4: [
    { title: "Bem-vindo ao mundo da API",
      body: "Você acaba de entrar na fase técnica da jornada. Os três cursos anteriores foram conceituais e práticos na interface. A partir daqui, vamos integrar o Claude no seu próprio código, em qualquer linguagem. Esse curso, Anthropic API Fundamentals, é o primeiro passo. Aqui você vai obter sua API key, instalar o SDK, fazer a primeira chamada, entender os parâmetros essenciais, trabalhar com prompts multimodais, e configurar streaming. Pré-requisito: Python instalado. Se não tem, instale antes de seguir." },

    { title: "Criando a conta de desenvolvedor",
      body: "Vá em console ponto anthropic ponto com. Faça cadastro com e-mail. Confirme. Você cai num painel onde tem visão de uso, chaves de API, organizações, e billing. O console é diferente do Claude ponto AI. Aquele é para usar o produto final. Este é para construir produtos com a tecnologia. Como novo usuário, você recebe créditos gratuitos para experimentação. Geralmente cinco dólares, suficientes para milhares de chamadas em modelo Haiku ou centenas em Sonnet. Use esses créditos sem medo neste curso." },

    { title: "Gerando a API key",
      body: "Dentro do console, vá em API Keys. Clique em Create Key. Dê um nome descritivo, por exemplo, estudos pessoais ou projeto X. O sistema gera uma chave que começa com sk-ant- seguido de uma string longa. Copie ela imediatamente. Atenção: ela só aparece uma vez. Se perder, você terá que gerar outra. Cole em algum lugar seguro temporariamente, e em segundos vamos colocar como variável de ambiente. Nunca, em hipótese alguma, cole essa chave em código que vai para repositório público. Nunca em mensagem de chat. Nunca em screenshots públicos. É como senha do seu banco." },

    { title: "Configurando variável de ambiente",
      body: "Em Linux ou Mac, abra o terminal. Digite export ANTHROPIC_API_KEY igual sk-ant-sua-chave-aqui, sem aspas. Para persistir, adicione essa linha no arquivo til barra ponto bashrc, ou ponto zshrc, dependendo do shell. Em Windows, use o comando setx no PowerShell, ou vá nas configurações do sistema, variáveis de ambiente, e adicione manualmente. Depois, feche e abra de novo o terminal. Para verificar, digite echo dolar ANTHROPIC_API_KEY no Linux ou Mac, ou echo percentual ANTHROPIC_API_KEY percentual no Windows. Deve aparecer sua chave." },

    { title: "Instalando o SDK Python",
      body: "Crie uma pasta para seus experimentos. Dentro dela, crie um ambiente virtual com python menos m venv venv. Ative com source venv barra bin barra activate em Linux ou Mac, ou venv barra Scripts barra activate em Windows. Depois, pip install anthropic. O SDK oficial está pronto. Você também pode instalar python-dotenv para gerenciar variáveis de ambiente em arquivo ponto env, e jupyter para rodar os notebooks oficiais do curso. O comando completo é pip install anthropic python-dotenv jupyter." },

    { title: "Hello world",
      body: "Crie um arquivo hello ponto py. Importe a biblioteca: from anthropic import Anthropic. Crie o cliente: client igual Anthropic abre fecha parênteses. Por padrão ele lê a variável de ambiente automaticamente. Faça a chamada: response igual client ponto messages ponto create. Os parâmetros mínimos são model, max_tokens, e messages. Use model igual claude-sonnet-4-5, max_tokens igual mil e vinte e quatro, e messages com uma lista contendo um dicionário de role user e content olá Claude. Imprima response ponto content abre colchete zero fecha colchete ponto text. Rode python hello ponto py. Você deve ver o Claude respondendo." },

    { title: "Anatomia da resposta",
      body: "A resposta tem vários campos úteis além do texto. O campo id é o identificador único da chamada. O campo model confirma qual modelo foi usado. O campo role é assistant. O campo content é uma lista de blocos: o tipo mais comum é text, mas pode ser tool_use ou outros em chamadas mais complexas. O campo stop_reason indica por que o modelo parou: end_turn quando completou naturalmente, max_tokens quando atingiu limite, stop_sequence quando uma sequência configurada apareceu. O campo usage tem input_tokens e output_tokens, essenciais para monitorar custo." },

    { title: "Modelos disponíveis",
      body: "Os modelos atuais usados nos exemplos seguem o padrão claude-haiku, claude-sonnet, claude-opus, com versão. Os nomes exatos atualizam ao longo do tempo. Sempre consulte a documentação oficial em docs ponto anthropic ponto com slash en slash docs slash about-claude slash models. Como regra: comece com Sonnet. Migre para Haiku se a tarefa é simples e você precisa de volume. Migre para Opus se a tarefa é complexa e qualidade vale o custo. Não fixe o nome do modelo no código sem pensar na evolução." },

    { title: "Parâmetro temperature",
      body: "Temperature controla a criatividade da resposta, indo de zero a um. Em zero, o modelo é determinístico: mesma entrada, mesma saída. Use zero para tarefas como extração de dados, classificação, formatação rígida. Em um, o modelo é máximo criativo. Use valores entre zero ponto sete e um para tarefas como escrita ficcional, brainstorm, geração de variações. O valor padrão é um, mas é recomendado experimentar. Para a maioria das aplicações de produção, valores entre zero e zero ponto cinco trazem melhor consistência." },

    { title: "Parâmetro max_tokens",
      body: "Esse parâmetro limita o tamanho máximo da resposta. É obrigatório. Calcule pensando que um token é aproximadamente quatro caracteres em inglês, ou três em português. Se você quer no máximo cem palavras, configure mil tokens, com folga. O modelo pode parar antes naturalmente. Se ele atingir o limite, a resposta vem cortada e o stop_reason vira max_tokens. Você pode então fazer uma chamada de continuação. Mas o ideal é estimar bem desde o início para economizar custo e latência." },

    { title: "System prompt",
      body: "O parâmetro system não vai dentro de messages, vai no nível principal da chamada. Ele define o papel persistente do assistente. Por exemplo, system igual você é um especialista em direito tributário brasileiro que responde sempre em tom formal e cita jurisprudência quando relevante. Esse system se aplica a toda a conversa, sem aparecer como mensagem. É a melhor forma de dar identidade ao Claude para sua aplicação. Use system para regras invariantes; use messages para o turno de conversa." },

    { title: "Streaming",
      body: "Em vez de esperar a resposta completa, streaming entrega caractere por caractere conforme o modelo gera. Para chats interativos, isso melhora a percepção de velocidade enormemente. Em Python, use client ponto messages ponto stream em vez de create. Use um with statement, e itere sobre stream ponto text_stream para receber os fragmentos. Cada fragmento você imprime imediatamente, simulando digitação ao vivo. Em produção, streaming é praticamente padrão para qualquer interface de chat." },

    { title: "Multimodal: imagens",
      body: "Você pode mandar imagens junto com texto. No campo content, em vez de string simples, passe uma lista de blocos: um do tipo image com source contendo type igual base64, media_type igual image barra png, e data com a string base64 da imagem; e outro do tipo text com a sua pergunta. O Claude analisa a imagem e responde considerando ela. Funciona para fotos, screenshots, diagramas, gráficos, fórmulas matemáticas escritas, captchas em alguns casos, e mais. Limite total de tamanho por imagem é de cinco megabytes na maioria dos planos." },

    { title: "Tratamento de erros",
      body: "Toda chamada à API pode falhar. Tipos de erro comuns: erro 401 quando a API key está errada ou expirada. Erro 429 quando você bate em rate limit, espere e tente de novo. Erro 500 quando há problema do lado da Anthropic, raro, mas tente de novo. Use try except em volta da chamada. Implemente retry com backoff exponencial: tente, falhou, espere um segundo, tente, falhou, espere dois segundos, e assim por diante. O SDK oficial já tem retries básicos por dentro, mas para produção monte sua própria camada." },

    { title: "Monitorando custos",
      body: "Cada chamada custa tokens de entrada mais tokens de saída. Os preços variam por modelo: Haiku é o mais barato, Opus o mais caro, Sonnet no meio. Você acompanha o uso no console em real time. Para cada chamada, registre input_tokens, output_tokens, modelo e timestamp. Em produção, use uma camada de logging que agrega isso em métricas. Defina alertas para gastos acima do esperado. Para muita aplicação, mais de noventa por cento do custo vem de poucos casos de uso intensivo. Otimize esses primeiro." },

    { title: "Boas práticas",
      body: "Versione seus prompts em controle de versão, junto do código. Trate prompt como código: pull request, revisão, eval. Não fixe nome de modelo na string sem mecanismo para troca rápida. Cuide de dados sensíveis: não mande PII desnecessária. Use nomes claros no system prompt e nos exemplos. Para tarefas multilíngue, deixe explícito o idioma esperado. Para extração estruturada, peça JSON e use o flag de tool_use ou parsing rigoroso. Esses hábitos pagam dividendo enorme quando o projeto cresce." },

    { title: "Próximos passos",
      body: "Você tem agora a base técnica para usar a API. Os próximos cursos vão aprofundar prompts em primeiro lugar, e depois, no curso noventa, mergulhar em todos os recursos avançados como tool use, RAG, prompt caching, Extended Thinking, MCP. Antes disso, domine este curso. Faça os notebooks oficiais. Crie um script seu, do zero, que faça uma chamada útil para você. Veja a resposta vir. Mude parâmetros. Sinta a diferença. Quando esses fundamentos estiverem internalizados, você está pronto para subir o nível." }
  ],

  /* =================================================
     CURSO 05 — Prompt Engineering Interactive Tutorial
     ================================================= */
  5: [
    { title: "Bem-vindo ao tutorial mais completo",
      body: "Este é o curso mais profundo sobre engenharia de prompt para iniciantes técnicos. São nove capítulos com exercícios práticos, distribuídos em notebooks Jupyter que você roda localmente. Você sai daqui escrevendo prompts profissionais que funcionam de forma consistente, não apenas por sorte. Pré-requisito: ter feito o curso quatro, Anthropic API Fundamentals. O ambiente já deve estar funcionando." },

    { title: "Capítulo um: estrutura básica",
      body: "Todo prompt eficaz tem quatro componentes. O primeiro é papel: quem o Claude deve simular. Por exemplo, você é um copidesque experiente. O segundo é tarefa: o que fazer. Revise este texto buscando erros gramaticais e sugestões de clareza. O terceiro é contexto: o material e as restrições. O texto está em português brasileiro, é um e-mail formal para um cliente, e tem cento e vinte palavras. O quarto é formato esperado: como devolver. Devolva uma lista numerada de problemas, cada um com a frase original, a sugestão, e a justificativa. Quando uma das quatro partes falta, a qualidade cai. Construa o hábito de revisar mentalmente os quatro componentes antes de enviar qualquer prompt." },

    { title: "Capítulo dois: clareza e direção",
      body: "Modelos de linguagem respondem ao que você pede. Se a instrução for ambígua, eles preenchem a lacuna com suposições, e nem sempre acertam. Seja específico. Em vez de pedir um resumo, peça um resumo de cinco bullet points, cada um com no máximo vinte palavras, focado em decisões tomadas, no formato lista markdown. Em vez de pedir um e-mail, descreva o destinatário, a relação, o tom, o tamanho, o objetivo, o que evitar. Aprenda a perceber suas próprias ambiguidades. Antes de enviar, leia o prompt como se você nunca tivesse visto ele. Faria sentido para um colaborador novo? Se não, especifique mais." },

    { title: "Capítulo três: tags XML",
      body: "Use tags XML para separar partes do prompt. Tags como abre maior documento fecha maior, abre maior pergunta fecha maior, abre maior exemplo fecha maior, abre maior contexto fecha maior. O Claude foi treinado especialmente para reconhecer essa estrutura. Tags ajudam o modelo a saber o que é instrução, o que é dado, o que é exemplo. Em prompts longos, a diferença na qualidade da resposta ao usar tags é dramática. Você também pode pedir que a resposta venha com tags, por exemplo, abre maior pensamento fecha maior para o raciocínio interno e abre maior resposta fecha maior para o resultado final. Isso facilita extrair só a parte que importa." },

    { title: "Capítulo quatro: cadeia de pensamento",
      body: "Para problemas complexos, peça que o Claude pense passo a passo antes de responder. A frase mágica é: pense passo a passo dentro de tags abre maior pensamento fecha maior, e depois dê a resposta final dentro de abre maior resposta fecha maior. Em problemas matemáticos, lógicos, de planejamento ou debug, essa técnica melhora drasticamente a precisão. Funciona porque o modelo, ao escrever o raciocínio, processa mais tokens e aumenta a chance de chegar na resposta certa. Não funciona em todas as tarefas. Para tarefas simples e mecânicas, pode até atrapalhar. Use quando há complexidade real." },

    { title: "Capítulo cinco: atribuição de papel",
      body: "Atribuir papel modifica radicalmente o estilo e a profundidade da resposta. Atribua papéis específicos: você é uma revisora médica cuidadosa que sempre cita evidência, ou você é um engenheiro de software sênior especializado em sistemas distribuídos. O modelo ajusta vocabulário, profundidade, tom e tipo de cuidado. Não use papéis genéricos como você é um assistente útil. Use papéis com adjetivos e contexto. Combine papel com instruções específicas e exemplos para resultados profissionais. Esse é um dos truques mais subestimados em prompt engineering." },

    { title: "Capítulo seis: formato de output",
      body: "Mostrar é melhor que descrever. Em vez de dizer responda em formato JSON, mostre um JSON de exemplo. Em vez de dizer responda em formato de tabela, mostre uma tabela. Para tarefas estruturadas, prefilie a resposta. Comece a resposta para o Claude com o início do formato esperado. No SDK, você pode passar uma mensagem do role assistant pré-preenchida, e o modelo continua a partir dali. Por exemplo, comece com abre chave aspas titulo aspas dois pontos, e o modelo completa o JSON. Essa técnica força a estrutura desejada com altíssima taxa de sucesso." },

    { title: "Capítulo sete: multishot prompting",
      body: "Mostre exemplos. Multishot prompting é quando você inclui dois ou três exemplos de entrada com a saída desejada antes da entrada real. O modelo aprende o padrão pelos exemplos e replica. Use sempre que a tarefa tiver formato específico, estilo particular ou nuance que descrição em palavras não captura. Para classificação, mostre exemplos de cada classe. Para extração, mostre exemplos com vários tipos de entrada. Para tradução, mostre como você quer o estilo. Multishot é a técnica mais poderosa para melhorar consistência. É também a que mais pessoas subestimam." },

    { title: "Capítulo oito: chain prompting",
      body: "Tarefas grandes em um único prompt geralmente saem mal. Quebra em vários prompts encadeados. Primeiro prompt: extraia os pontos principais. Segundo prompt: use os pontos para escrever um rascunho. Terceiro prompt: revise o rascunho contra os critérios. Cada prompt foca em uma sub-tarefa. A saída de um vira contexto do próximo. Esse padrão é base de agentes mais avançados, e é a técnica que mais melhora qualidade em tarefas complexas. Custa um pouco mais em tokens, mas o ganho de qualidade compensa." },

    { title: "Capítulo nove: reduzindo alucinações",
      body: "Para reduzir invenções, combine várias técnicas. Primeira: dê permissão para o modelo dizer eu não sei. Adicione na instrução: se a informação não estiver no contexto, responda eu não tenho essa informação. Segunda: peça citações. Para cada afirmação importante, cite o trecho da fonte. Terceira: use temperatura zero para tarefas factuais. Quarta: para verificação crítica, faça duas chamadas e compare. Quinta: prefira pedir respostas estruturadas, que são mais difíceis de inventar. Sexta: peça que o modelo classifique sua própria confiança em cada afirmação. Aplicadas em conjunto, reduzem alucinação em mais de oitenta por cento." },

    { title: "Exercícios e prática",
      body: "O notebook oficial do GitHub tem exercícios em cada capítulo, com gabarito. Faça todos. Depois, refaça com seus próprios casos de uso. Pegue uma tarefa real seu, escreva o pior prompt possível, gere o resultado. Aplique uma técnica de cada vez e meça melhoria. Ao final, você terá um arsenal calibrado: sabe qual técnica usar em cada situação. Esse arsenal é seu maior ativo profissional em IA." },

    { title: "Encerramento e próximos passos",
      body: "Engenharia de prompt não é arte mística. É um conjunto de técnicas reproduzíveis, com efeitos mensuráveis. Domine as nove deste curso e você estará à frente da maior parte do mercado. Os próximos cursos vão te mostrar prompts reais de produção, e como medir a qualidade deles via evals. Antes disso, pratique. Não passe pra próxima fase sem ter aplicado essas técnicas em pelo menos cinco tarefas suas. Internalização vem da prática." }
  ],

  /* =================================================
     CURSO 06 — Real World Prompting
     ================================================= */
  6: [
    { title: "Saindo do laboratório",
      body: "Bem-vindo ao curso de prompts do mundo real. Os tutoriais anteriores ensinaram técnicas. Agora vamos ver como essas técnicas se combinam em prompts de produção, em três cenários distintos: análise médica, suporte ao cliente e sumarização de chamadas. Pré-requisito: ter feito o curso anterior. Sem dominar as nove técnicas, você não vai entender por que cada decisão foi tomada nos exemplos." },

    { title: "Padrão um: análise médica",
      body: "Em saúde, prompt errado pode causar dano real. O padrão produção começa com papel detalhado: você é uma revisora clínica cautelosa, treinada para identificar incertezas e nunca prescrever sem confirmação humana. Em seguida, regras explícitas: nunca dê diagnóstico definitivo, sempre liste hipóteses com evidência, sempre indique quando o caso precisa de profissional humano. O contexto inclui o caso clínico, exames disponíveis, histórico relevante. O formato de saída é estruturado em tópicos: hipótese principal, hipóteses alternativas, evidência que sustenta cada hipótese, evidência que contraria, próximos exames recomendados, alertas críticos, limitações da análise. Em produção, esse prompt é versionado, testado contra casos reais com gabarito, e revisado por médicos antes de cada release." },

    { title: "Por que tantas regras",
      body: "Cada regra aparente excessiva no prompt vem de um caso real onde algo deu errado. Por isso prompts de produção são tão grandes. Eles carregam aprendizados acumulados. Quando você herdar um prompt grande em uma empresa, antes de simplificar, entenda por que cada parte está ali. Geralmente cada linha é a cicatriz de um problema real. Adicione testes antes de remover regras." },

    { title: "Padrão dois: suporte ao cliente",
      body: "No atendimento, o prompt define a personalidade da marca, as políticas vigentes, exemplos de tom certo e errado, e regras de escalonamento. O papel é típico: você é uma agente de suporte da marca X, calorosa, empática, objetiva. As políticas vão como contexto: aqui está nossa política de devolução completa. Os exemplos mostram resposta boa: paciente, com solução. E ruim: defensiva, longa demais, com jargão. Regra crítica: nunca invente políticas. Se o cliente perguntar algo fora do contexto fornecido, escalone para humano. Em produção, o sistema injeta automaticamente a política relevante baseado na pergunta, mantendo o prompt enxuto e sempre atualizado." },

    { title: "Saída estruturada para suporte",
      body: "A saída em suporte costuma ser dividida em duas partes: primeiro, uma classificação interna que não vai para o cliente, com tags como categoria, urgência, sentimento detectado, e necessidade de escalonamento. Segundo, a resposta ao cliente, em texto natural, pronta para enviar. Essa separação permite que o sistema decida automaticamente: se urgência alta, vai para humano. Se sentimento muito negativo, alerta o supervisor. Se precisa de escalonamento, encaminha para o time certo. Tudo isso a partir de um único prompt." },

    { title: "Padrão três: sumarização de chamadas",
      body: "Sumarização de chamadas de venda, de suporte ou de reuniões executivas tem demanda enorme. O prompt define o público do resumo, o tamanho, os campos obrigatórios. Por exemplo, resuma para o gerente de vendas, em até trezentas palavras, com seções: contexto da chamada, principais pontos discutidos, objeções levantadas, próximos passos, sentimento geral, alertas. Forneça exemplos de bom resumo, com o mesmo formato. A entrada é a transcrição da chamada. A saída em JSON facilita integração com CRM. Cada campo do JSON corresponde a uma seção do resumo." },

    { title: "Lidar com transcrições longas",
      body: "Chamadas longas excedem o contexto do modelo, ou ficam caras. A solução é dividir e conquistar. Quebra a transcrição em pedaços de cinco mil tokens. Para cada pedaço, faz um resumo curto. Depois, junta todos os resumos curtos em um único prompt e pede o resumo final. Esse padrão se chama map reduce. Funciona muito bem para documentos longos. Custa mais chamadas, mas é viável e escalável. Use prompt caching para o sistema não recalcular o cabeçalho do prompt em cada pedaço." },

    { title: "Validação e fallback",
      body: "Prompts em produção nunca confiam cegamente na saída. Sempre valide. Se a saída deveria ser JSON, parse. Se falhou, retry. Se a saída tem campo numérico, verifique tipo. Se tem campos obrigatórios, verifique presença. Se o modelo classificou algo como certeza alta mas a evidência é fraca, marque para revisão humana. Sistemas robustos têm camada de validação tão importante quanto o prompt em si. Falha graciosamente: quando o modelo erra, o sistema detecta e degrada para um fluxo manual em vez de propagar erro silencioso." },

    { title: "A receita comum",
      body: "Os três casos compartilham uma receita. Papel detalhado, regras explícitas, contexto rico, exemplos múltiplos, formato estrito, regras para casos difíceis. Só essa receita já te dá noventa por cento da qualidade. Os dez por cento restantes vêm de iteração e medição, que é o tema do próximo curso." },

    { title: "Aplicação na sua empresa",
      body: "Para usar isso na sua empresa, identifique três a cinco tarefas repetitivas onde IA agrega. Para cada uma, monte um prompt de produção seguindo a receita. Versione no Git. Construa exemplos de entrada e saída desejada para os casos críticos. Esses exemplos viram seu eval, que vai ser ensinado a seguir. Quando seu time tiver dois ou três prompts de produção bem feitos, automação real e mensurável aparece. Não fique tentando otimizar prompts experimentais. Foque em poucos, bem feitos, integrados ao fluxo de trabalho." },

    { title: "Encerramento",
      body: "O próximo curso, Prompt Evaluations, ensina como medir tudo isso de forma sistemática. É a peça que falta para você lançar produtos com Claude com a confiança de uma equipe profissional. Não pule. Sem evals, mudanças no prompt viram fé. Com evals, você sabe exatamente quando melhorou ou piorou." }
  ],

  /* =================================================
     CURSO 07 — Prompt Evaluations
     ================================================= */
  7: [
    { title: "Por que medir prompts",
      body: "Bem-vindo ao curso de avaliações de prompt. Quando você lança um produto que depende de um prompt, você precisa saber se ele funciona, com que consistência, em que casos falha, e se uma mudança nova melhorou ou piorou. Sem medição, isso é fé. Com medição, é engenharia. Este curso ensina como criar evals de produção, em duas horas de tutorial em notebook Jupyter." },

    { title: "Eval é teste para prompt",
      body: "Um eval é um conjunto de casos de teste que você roda sempre que mudar algo. É equivalente ao teste unitário no mundo do código. Cada caso tem uma entrada esperada, e um critério de sucesso. Você roda o prompt em todos os casos, mede o resultado, e compara com a versão anterior. Se um caso passou antes e falha agora, você quebrou algo. Se um caso falhava antes e passa agora, você melhorou. Tudo virável em métrica numérica que você acompanha ao longo do tempo." },

    { title: "Tipos de eval: determinístico",
      body: "O tipo mais simples é determinístico. Funciona quando a saída esperada é exata. Por exemplo, classificação em categorias fechadas, extração de campos específicos, formatação rígida. Você compara saída produzida com saída esperada. Igual igual, passou. Diferente, falhou. É barato e rápido. Bom para tarefas estruturadas. Limitação: não funciona para tarefas onde existe mais de uma resposta válida, como redação ou análise." },

    { title: "Tipos de eval: classificador",
      body: "Para tarefas onde a saída é texto livre, use outro modelo de IA como juiz. O eval LLM judge funciona assim: você prepara o caso, gera a saída com o prompt em teste, e em seguida envia para outro prompt de avaliação. O prompt de avaliação recebe entrada, saída produzida, critérios de qualidade, e devolve uma nota de zero a dez ou pass fail. Esse padrão é a base de avaliação de qualidade textual em escala. Importante: o juiz precisa de instruções tão cuidadosas quanto o prompt principal." },

    { title: "Tipos de eval: humano",
      body: "Para tarefas críticas, especialmente em saúde, jurídico, finanças, eval humano é necessário. Pessoas avaliam um subconjunto das saídas. É caro mas indispensável em domínios regulados. Use eval humano como verdade ouro: para calibrar e validar evals automatizados. Misture os três tipos no seu pipeline: muito determinístico onde aplicável, classificador para texto livre em escala, humano para amostragem crítica." },

    { title: "Construindo o conjunto de teste",
      body: "Um bom eval tem entre trinta e cem casos. Inclui casos comuns, casos de borda, e casos adversariais. Casos comuns testam o caminho feliz. Casos de borda testam limites. Casos adversariais testam tentativas de quebrar o sistema. Para cada caso, defina entrada e critérios de aceite. Os critérios podem ser saída exata, faixa de valores, presença de elementos, ausência de termos proibidos, formato válido, e por aí. Comece com vinte casos. Cresça conforme descobre falhas em produção, transformando cada falha em novo caso de teste." },

    { title: "Métricas que importam",
      body: "Métricas básicas. Acurácia: percentual de casos que passaram. Latência: tempo médio por chamada. Custo: dólares por mil chamadas. Consistência: rode o mesmo caso dez vezes, veja se a saída varia muito. Para cada versão do prompt, registre essas métricas. Quando você mudar algo, rode tudo de novo e compare. Mantenha o histórico. Faça gráficos. Após algumas semanas, você tem um mapa claro de evolução do seu sistema." },

    { title: "Iteração com evals",
      body: "Com evals você pode iterar com confiança. Mudou uma palavra no prompt, rodou eval, viu o resultado. Adicionou um exemplo, rodou eval. Trocou de modelo, rodou eval. Cada mudança gera dado para decisão. Sem evals, você muda no escuro e descobre o problema só em produção. Com evals, você descobre antes de subir. Isso é a diferença entre engenheiros amadores e profissionais em sistemas com IA." },

    { title: "Eval automatizado em CI",
      body: "Em produção séria, evals rodam automaticamente em pipeline de CI a cada pull request que mexe em prompt ou modelo. Se a métrica cair abaixo de um limiar, o PR não é aceito até resolver. Esse hábito previne regressões. O Anthropic Cookbook tem exemplos prontos disso em integrações com GitHub Actions. Adapte ao seu ambiente. O custo de manutenção é baixo, o ganho em qualidade é enorme." },

    { title: "Casos de uso comum",
      body: "Use evals em qualquer pipeline com prompts em produção: chatbot, assistente interno, classificador, extrator, gerador de conteúdo. Para cada um, defina os critérios mais importantes. Em chatbot: respostas factualmente corretas, tom apropriado, escalonamento correto quando precisa. Em extrator: campos completos, formato válido, ausência de inferência indevida. Em gerador: aderência ao briefing, sem termos proibidos, dentro do tamanho. Essas são as métricas que separam um produto sério de uma demo." },

    { title: "Encerramento da fase dois",
      body: "Concluindo este curso, você completa a fase dois da jornada. Tem domínio de prompt engineering em todos os níveis. Sabe escrever, refinar e medir. Está pronto para a fase três, onde a profundidade técnica explode: tool use, RAG, prompt caching, Extended Thinking, MCP, padrões de agentes. Antes de avançar, aplique tudo que aprendeu em pelo menos um projeto real. Sem prática, o conhecimento evapora. Com prática, vira intuição." }
  ],

  /* =================================================
     CURSO 08 — Tool Use (Function Calling)
     ================================================= */
  8: [
    { title: "Por que tool use muda tudo",
      body: "Bem-vindo ao primeiro curso da fase três. Tool use, também chamado de function calling, é o que permite o Claude executar ações fora do texto. Sem tool use, o modelo só responde com palavras. Com tool use, ele pode buscar no seu banco, chamar APIs, ler arquivos, mandar e-mails. Tool use é o pré-requisito para tudo: MCP, agentes, sistemas autônomos. Domine bem, e você abre acesso à parte mais poderosa do Claude." },

    { title: "Anatomia de uma ferramenta",
      body: "Uma ferramenta tem três partes. Primeiro, nome curto e descritivo, em snake case ou camel case. Por exemplo, get_current_weather. Segundo, descrição em linguagem natural, explicando o que a ferramenta faz e quando usar. Terceiro, schema dos parâmetros, em JSON Schema, descrevendo cada argumento, seu tipo, descrição e se é obrigatório. O Claude nunca vê o código que executa a ferramenta. Ele só vê o nome, descrição e schema. Por isso esses três campos precisam ser excelentes." },

    { title: "Definindo a ferramenta no SDK",
      body: "Em Python, você passa um parâmetro tools na chamada da API, contendo uma lista de ferramentas. Cada ferramenta é um dicionário com name, description e input_schema. O input_schema segue o padrão JSON Schema: tem type object, properties com cada campo, e required listando os obrigatórios. Por exemplo, get_current_weather tem property location do tipo string com descrição cidade e estado, e required igual location. O Claude usa essa especificação para decidir quando chamar a ferramenta e como preencher os argumentos." },

    { title: "O fluxo de execução",
      body: "O fluxo começa com você enviando o prompt junto da lista de ferramentas. Se o Claude decidir usar uma, a resposta vem com stop_reason igual tool_use, e content com bloco do tipo tool_use contendo nome, id e argumentos. Você não vê o modelo executando nada: a resposta é uma intenção. Você executa a função no seu código local. Depois, manda a próxima chamada, agora com a mensagem original mais a tool_use que veio, mais uma mensagem nova de role user com bloco tool_result contendo o id da chamada e o resultado. O Claude então gera a resposta final, integrando o resultado na sua explicação." },

    { title: "Múltiplas ferramentas",
      body: "Você pode passar várias ferramentas. O Claude escolhe a melhor para cada situação. Para tarefas complexas, ele pode chamar uma ferramenta, processar o resultado, decidir chamar outra, e assim por diante. Cada chamada é um turno. Você implementa um loop: enquanto stop_reason for tool_use, execute a ferramenta e mande o resultado. Quando stop_reason virar end_turn, acabou. Limite o número de iterações para evitar loops infinitos, geralmente dez é suficiente para a maioria dos casos." },

    { title: "Tratamento de erros",
      body: "Sempre trate erros nas ferramentas. Se a função falhar, em vez de explodir, devolva uma mensagem clara como tool_result com isError true e content com a descrição do erro. Por exemplo, a API externa não respondeu, ou o usuário não tem permissão para acessar esse recurso. O Claude entende a falha, e na maioria dos casos pivota: tenta de outra forma, ou explica para o usuário o que aconteceu. Sistemas robustos não escondem erros, comunicam falhas de forma estruturada." },

    { title: "Boas práticas de descrição",
      body: "A descrição da ferramenta é o docstring para o Claude. Escreva como se estivesse documentando para um colega. Inclua: o que a função faz, quando usar, quando não usar, exceções e limitações. Para parâmetros, descreva exatamente o que cada um significa, o formato esperado e exemplos. A diferença entre uma ferramenta com descrição mediana e uma excelente é noite e dia. O Claude usa essa descrição para decidir, e descrições ruins geram chamadas erradas ou ausentes." },

    { title: "Validação no seu lado",
      body: "Nunca confie cegamente nos argumentos gerados pelo Claude. Valide tudo. Tipo correto, valor dentro de faixa esperada, identificadores existem, usuário tem permissão. Se chegou um valor estranho, devolva tool_result com erro descritivo. O modelo às vezes inventa argumentos, especialmente em tarefas pouco contextualizadas. Validação rigorosa do seu lado fecha essa brecha. Trate o argumento como input externo de usuário hostil: nunca confie." },

    { title: "Padrão sequencial",
      body: "Em workflows típicos, ferramentas se encadeiam. Por exemplo, para responder qual a previsão do tempo amanhã na cidade do usuário, o Claude pode: primeiro chamar get_user_location, com o resultado disponível, segundo chamar get_weather_forecast com a localização, e por fim sintetizar tudo em texto. Você não precisa programar essa cascata: o modelo decide. Seu código só executa cada chamada. Isso é o coração de agentes simples." },

    { title: "Tool use forçado",
      body: "Em alguns casos você quer que o Claude obrigatoriamente use uma ferramenta. Use o parâmetro tool_choice. Pode ser auto, padrão, onde o modelo decide. Pode ser any, onde alguma ferramenta deve ser usada. Pode ser tool com nome específico, forçando uso daquela ferramenta. Útil em pipelines onde você sabe a ação requerida e quer só extrair os argumentos. Por exemplo, em um classificador, force a ferramenta classify para garantir saída estruturada." },

    { title: "Tool use e segurança",
      body: "Ferramentas que mexem em estado real precisam de cuidado extra. Para ferramentas que só leem dados, libere. Para ferramentas que escrevem, deletam, mandam mensagens, gastam dinheiro, considere camadas de aprovação. Você pode implementar: o Claude pede para chamar a ferramenta, seu sistema bloqueia, mostra para o humano confirmar, e só depois executa. Esse padrão se chama human in the loop e é essencial em ambientes onde erros têm custo." },

    { title: "Pré-requisito para MCP",
      body: "Tudo que você aprendeu aqui é base para entender o curso de MCP, na fase cinco. MCP é, em essência, um protocolo padronizado de tool use. Quando você dominar tool use direto na API, MCP vai parecer extensão natural. Não pule esse curso. Construa pelo menos uma ferramenta sua, em um caso real, com loop completo, validação e tratamento de erro. Essa experiência é o que fixa os conceitos." }
  ],

  /* =================================================
     CURSO 09 — Building with the Claude API
     ================================================= */
  9: [
    { title: "O grande curso da API",
      body: "Bem-vindo ao curso mais extenso da Anthropic Academy. São oitenta e quatro lições e mais de oito horas de vídeo. Aqui você vê o ecossistema técnico completo: modelos, tool use, visão, RAG, prompt caching, Extended Thinking, MCP, padrões de agentes e workflows. Trate como livro de referência. Estude em blocos de duas horas, repita os exemplos, anote dúvidas. Pré-requisito: ter feito os cursos quatro a oito. Sem essa base, várias lições aqui pulam contexto." },

    { title: "Escolha de modelo na prática",
      body: "Comece com Sonnet em qualquer projeto novo. É o equilíbrio. Migre para Haiku se a tarefa é simples e você precisa de volume e velocidade: classificação binária, extração simples, formatação. Migre para Opus se a tarefa é complexa, raciocínio profundo, escrita de qualidade alta, e custo extra é justificável. A diferença de custo entre os tamanhos é grande, ordem de magnitude. Faça experimentos: rode o mesmo eval em três modelos, compare qualidade e custo. Decida com dado." },

    { title: "Tool use revisitado",
      body: "Tool use já foi visto, mas aqui se aprofunda em padrões avançados: ferramentas paralelas, onde várias chamadas independentes acontecem ao mesmo tempo, reduzindo latência. Ferramentas síncronas e assíncronas. Cache de resultado de ferramenta. Composição de ferramentas em pipelines onde a saída de uma vira entrada de outra automaticamente. Esses padrões são o que distingue um chatbot básico de um agente capaz." },

    { title: "Visão computacional",
      body: "O Claude analisa imagens nativamente. Você passa imagem como bloco no content, junto do texto. Aplicações comuns: extração de dados de notas fiscais, análise de gráficos, descrição para acessibilidade, debug de UI a partir de screenshot, leitura de manuscritos, comparação de versões de design. Limitações: precisão menor em texto muito pequeno, dificuldade com tabelas complexas, ocasionalmente confunde objetos parecidos. Para uso em produção com imagens, monte eval específico de visão e meça acerto por categoria." },

    { title: "RAG na prática",
      body: "Retrieval Augmented Generation é uma técnica para dar ao modelo conhecimento que não está no treinamento. O fluxo: você indexa documentos transformando cada pedaço em vetor com embeddings; quando vem uma pergunta, calcula o vetor da pergunta, busca os k pedaços mais similares no índice, e injeta esses pedaços no prompt como contexto. O Claude responde usando aquele contexto. Reduz alucinação, permite respostas atualizadas, e funciona com bases enormes que não caberiam no contexto." },

    { title: "Componentes de RAG",
      body: "Para implementar RAG você precisa de quatro coisas. Primeira, um divisor de documentos em chunks de tamanho razoável, geralmente quinhentos a mil tokens, com sobreposição. Segunda, um modelo de embeddings, da Anthropic ou de terceiros como Voyage AI ou OpenAI. Terceira, um banco vetorial. Pode ser simples como FAISS local, ou hospedado como Pinecone, Weaviate, pgvector. Quarta, o pipeline de query, que recebe pergunta, busca, monta prompt e chama o Claude. O Cookbook tem implementações completas em poucas linhas." },

    { title: "Prompt caching",
      body: "Em aplicações onde o mesmo bloco de instruções aparece em muitas chamadas, prompt caching reduz custo em até noventa por cento e latência em até oitenta por cento. Você marca um bloco do prompt como cacheável usando o cache_control. A primeira chamada custa normal mais um pouco para escrever no cache. As próximas chamadas, dentro de cinco minutos, custam fração. Use para prompts com sistema longo, documento longo de contexto, ou listas grandes de exemplos. Em chats com sistema robusto, mudança transformadora." },

    { title: "Extended Thinking",
      body: "Extended Thinking é um modo onde o modelo aloca um orçamento de tokens para raciocínio interno antes de responder. Útil em problemas matemáticos difíceis, planejamento complexo, debug profundo de código, análise estratégica. Você define um budget máximo, por exemplo dez mil tokens de pensamento. O modelo usa esse orçamento para construir uma resposta de qualidade muito superior. Custa mais que chamada normal, e é mais lento. Use quando precisão importa mais que latência." },

    { title: "Workflow versus agente",
      body: "Workflow é uma sequência fixa de etapas. Você define os passos, cada passo é uma chamada ao modelo com prompt específico. Previsível, fácil de debugar, custos controlados. Agente é loop dinâmico onde o modelo decide a próxima ação. Mais flexível, mas mais caro e imprevisível. Comece com workflow porque é mais fácil de operar. Migre para agente quando tarefas exigem adaptação real, com decisões dependentes de resultados intermediários. Nunca use agente onde workflow resolve." },

    { title: "Padrões de agente",
      body: "Padrões clássicos. Padrão um: react, onde o agente alterna pensamento, ação e observação. Padrão dois: planner executor, onde um agente planeja em alto nível e outro executa cada passo. Padrão três: orchestrator workers, onde um orquestrador delega sub-tarefas a workers especializados. Padrão quatro: critic, onde um agente avalia o trabalho do outro antes de continuar. Esses padrões são combináveis. Não tente reinventar. Adapte um pronto ao seu caso." },

    { title: "MCP introduzido",
      body: "Model Context Protocol é o tema central da fase cinco, mas começa a aparecer aqui. MCP padroniza como ferramentas, recursos e prompts são expostos a modelos. Em vez de cada aplicação implementar tool use de maneira própria, todas falam o mesmo protocolo. Vantagem: você escreve um servidor MCP uma vez, e ele funciona em qualquer cliente compatível. É a USB-C da inteligência artificial." },

    { title: "Streaming avançado",
      body: "Em respostas longas, streaming melhora muito a experiência. Você recebe eventos como message_start, content_block_start, content_block_delta com texto, content_block_stop, message_delta com stop_reason, message_stop. Cada evento é processado em tempo real. Para chats, exiba o texto à medida que chega. Para sistemas que precisam decidir parar mais cedo, escute por sinais durante o streaming. Isso é a base de UX moderna em aplicações com IA." },

    { title: "Limites e otimização",
      body: "Tokens custam dinheiro e demoram. Otimize. Reduza prompt sem perder qualidade. Use prompt caching agressivamente. Escolha modelo certo para cada tarefa. Monitore tokens por chamada e por dia. Configure alertas para gastos acima do esperado. Em produção, dois ou três casos de uso geralmente respondem por mais de oitenta por cento do custo. Otimize esses primeiro. Para uso intensivo, considere ainda o batch API, que processa muitas chamadas com desconto significativo em troca de latência maior." },

    { title: "Estrutura de produção",
      body: "Aplicações em produção têm camadas. Camada de entrada: validação, autenticação, rate limit. Camada de orquestração: escolha de prompt, modelo, ferramentas. Camada de modelo: chamada ao Claude. Camada de pós-processamento: parsing, validação, persistência. Camada de observabilidade: logs, métricas, traces. Camada de fallback: o que fazer quando o modelo falha. Cada camada é peça de engenharia. Subestime nenhuma. Cookbook tem templates completos para começar." },

    { title: "Encerramento e prática",
      body: "Este curso é vasto. Não tente memorizar tudo. Foque em fazer pelo menos três projetos pequenos, cada um explorando um conjunto de recursos: um com tool use complexo, um com RAG, um com agente simples. A prática constrói intuição. O Cookbook é seu mapa permanente. Os próximos cursos vão para Claude Code e agentes, onde tudo isso aparece aplicado em ferramentas concretas. Boa jornada." }
  ],

  /* =================================================
     CURSO 10 — Anthropic Cookbook (referência)
     ================================================= */
  10: [
    { title: "O recurso mais subutilizado",
      body: "Bem-vindo ao Cookbook. Não é um curso linear, é um repositório oficial de notebooks Jupyter com receitas prontas para todos os recursos da API. Tool use, RAG, visão, prompt caching, agentes, multiagentes, integração com bancos. Cada notebook roda localmente em minutos. Use como referência paralela durante toda a fase três e quatro. Pessoas que dominam o Cookbook resolvem em dez minutos o que outras tentam programar do zero por horas." },

    { title: "Como navegar o repositório",
      body: "Acesse github ponto com slash anthropics slash anthropic-cookbook. A organização é por tema. Dentro de cada pasta há um notebook ipynb pronto para abrir, com células de código já com explicação. Comece pela pasta misc para tutoriais básicos, depois tool_use, depois multimodal para visão, depois rag para RAG, e finalmente agents para agentes. A pasta third_party tem integrações com fornecedores externos como bancos vetoriais e provedores de embeddings." },

    { title: "Notebook como aprendizado",
      body: "A grande vantagem dos notebooks é que cada célula roda independente. Você lê uma explicação, executa a célula seguinte, vê o resultado, ajusta. Esse loop curto entre teoria e prática é insubstituível. Em vídeo, você passa rápido. Em texto, sem prática. Em notebook, cada conceito vira código que funciona. Reserve trinta minutos para cada notebook que tocar tema novo. Não corra: cada exemplo entendido vira ferramenta no seu cinturão." },

    { title: "Notebooks essenciais para começar",
      body: "Notebooks que recomendo para início. Primeiro, classification para entender extração simples. Segundo, customer_support_agent para um agente realista. Terceiro, retrieval_augmented_generation para RAG. Quarto, prompt_caching para entender o cache. Quinto, multimodal para imagens. Sexto, sub_agents para padrão de delegação. Em cada um, rode tudo, mude um parâmetro, entenda o efeito. Em uma semana, você passa por todos os principais recursos." },

    { title: "Adaptando ao seu projeto",
      body: "O Cookbook é template. Quando você precisar implementar algo no seu projeto, primeiro busque no Cookbook se já tem receita parecida. Tem, na maioria das vezes. Clone, simplifique para seu caso, integre. Economiza horas e evita armadilhas conhecidas. Os notebooks foram escritos por engenheiros da Anthropic e refletem a forma considerada idiomática de usar cada recurso. Imitar fonte oficial é melhor que inventar do zero." },

    { title: "Contribuição da comunidade",
      body: "O repositório é open source. Vale ler issues e pull requests para descobrir patterns que ainda não viraram lição oficial. Tem discussões de uso que iluminam decisões da API. Quando você estiver mais avançado, considere contribuir com um notebook próprio sobre um caso de uso bem feito. É excelente para portfólio público e para fixar aprendizado." },

    { title: "Manter atualizado",
      body: "A API evolui rápido. Modelos novos, recursos novos, melhores práticas mudam. Acompanhe o Cookbook regularmente. Coloque uma rotina mensal de quinze minutos olhando o que entrou novo. Em geral, os primeiros notebooks que aparecem após um lançamento são os que mostram como usar a feature corretamente. Esse hábito mantém você sempre na fronteira." },

    { title: "Encerramento",
      body: "Cookbook não é curso, é amigo. Quando travar, abra ele. Quando começar projeto novo, busque ali primeiro. É o atalho oficial mais subutilizado do ecossistema Anthropic. Marque o repositório como favorito agora mesmo." }
  ],

  /* =================================================
     CURSO 11 — Prompt Engineering Docs (referência)
     ================================================= */
  11: [
    { title: "A documentação oficial",
      body: "Bem-vindo ao guia da documentação oficial de prompt engineering, mantida pela própria Anthropic. Não é vídeo, é texto bem estruturado. Leia uma vez do início ao fim, e volte sempre que precisar. Acesso em docs ponto anthropic ponto com slash en slash docs slash build dash with dash claude slash prompt dash engineering slash overview. Existe versão em português também em docs ponto claude ponto com slash pt." },

    { title: "Visão geral",
      body: "A documentação cobre quatro níveis. Nível um, técnicas básicas: clareza, contexto, exemplos, formato. Nível dois, técnicas avançadas: cadeia de pensamento, prompt chaining, papel detalhado, prefilling de resposta. Nível três, ferramentas do console: gerador automático de prompts, melhorador de prompts, templates com variáveis. Nível quatro, guias específicos por modelo: tunings recomendados para Haiku, Sonnet e Opus." },

    { title: "Console prompting tools",
      body: "Dentro do console da Anthropic há três ferramentas embutidas. Primeira, prompt generator: você descreve em linguagem natural o que quer, e o sistema cria um primeiro rascunho de prompt aplicando todas as melhores práticas. Útil quando você está começando uma tarefa nova. Segunda, templates and variables: parametriza o prompt com variáveis, facilitando reuso. Terceira, prompt improver: pega seu prompt atual e sugere melhorias com base nas técnicas oficiais. Use periodicamente para auditoria." },

    { title: "Padrões oficialmente recomendados",
      body: "A doc lista alguns padrões com nome próprio. Multishot: incluir vários exemplos. Chain of thought: pedir raciocínio passo a passo. XML tags: estruturar com tags. Prefilling: começar a resposta para forçar formato. Role assignment: atribuir papel detalhado. Cada um tem página própria com explicação, exemplo bom, exemplo ruim, e quando aplicar. Decore essa lista. Quando enfrentar problema novo, vá pela lista mentalmente: qual desses ataca o problema?" },

    { title: "Erros comuns documentados",
      body: "A própria documentação lista armadilhas comuns. Instruções contraditórias, que confundem o modelo. Exemplos enviesados em uma direção. Pedidos para o modelo fazer algo que ele não pode, como acessar internet sem ferramentas. Prompts longos demais com informação irrelevante. Reler essa lista periodicamente é higiene mental para qualquer pessoa séria com prompts." },

    { title: "Como integrar à rotina",
      body: "Hábitos. Antes de subir um prompt para produção, passe pelo prompt improver no console. Para times, padronize templates oficiais. Mantenha uma página da documentação aberta enquanto trabalha em prompts críticos. Quando aparecer modelo novo, cheque a página específica para o modelo: quase sempre tem ajustes recomendados. A documentação é manual técnico permanente do seu trabalho com Claude." },

    { title: "Encerramento e ponte para fase quatro",
      body: "Concluindo este curso, você fecha a fase três da jornada. Domina API, prompts em produção, evals, tool use, recursos avançados, e tem domínio total da documentação oficial. Está pronto para a fase quatro: Claude Code e agentes. Aqui o tipo de aprendizado muda. Em vez de chamar a API direto, você usa ferramentas que abstraem grande parte e entregam fluxos prontos para programadores e profissionais de outras áreas. Próximo: Claude Code 101." }
  ],

  /* =================================================
     CURSO 12 — Claude Code 101
     ================================================= */
  12: [
    { title: "Bem-vindo ao Claude Code",
      body: "Bem-vindo ao Claude Code 101. Se você nunca usou um agente de programação com IA, este é o ponto certo para começar. Claude Code transforma seu fluxo de desenvolvimento. Em vez de ficar copiando e colando entre ChatGPT e seu editor, o Claude Code lê seus arquivos, escreve código, roda comandos, faz commits, tudo ali. Pré-requisitos: ter plano Pro ou API key configurada, e Node ponto js instalado." },

    { title: "Instalação",
      body: "Abra o terminal. Rode npm install -g at-anthropic-ai slash claude-code. O comando claude fica disponível globalmente. Para integração com VS Code, instale a extensão oficial Claude Code pela aba de extensions. Para JetBrains, instale o plugin pelo marketplace. As três modalidades, terminal, VS Code e JetBrains, compartilham o mesmo motor. Você escolhe a que se adapta ao seu fluxo." },

    { title: "Primeira sessão",
      body: "No terminal, navegue até a pasta de um projeto seu. Rode claude. O Claude Code lê os arquivos relevantes, faz uma análise inicial, e te apresenta o que encontrou. Você pode então conversar normalmente: peça para entender uma função, sugerir refatoração, escrever um teste, criar um arquivo novo. Cada pedido vira um conjunto de ações. Você acompanha em tempo real." },

    { title: "Modos de aprovação",
      body: "Existem três modos de aprovação. Normal: o Claude pede permissão antes de cada ação que altera arquivos ou roda comando. Auto: ele executa sem perguntar, útil em tarefas longas que você confia. Plan: ele só planeja sem executar nada, ideal para revisar a estratégia antes da implementação. Você alterna com comandos rápidos no chat. Para tarefas críticas, use plan primeiro, revise, depois execute. Para tarefas conhecidas, use auto e ganhe velocidade." },

    { title: "O fluxo Explore Plan Code Commit",
      body: "Esse fluxo de quatro etapas é a maneira mais segura de usar Claude Code. Etapa um, Explore: peça para o Claude entender a estrutura do projeto e o problema. Ele lê arquivos relevantes, identifica padrões, monta contexto. Etapa dois, Plan: peça um plano detalhado em modo plan. Ele descreve passo a passo o que vai fazer. Você lê, ajusta, aprova. Etapa três, Code: ele executa o plano, criando, alterando, testando. Etapa quatro, Commit: ele monta a mensagem de commit e cria. Esse fluxo previne mudanças apressadas que quebram coisas." },

    { title: "Arquivo CLAUDE markdown",
      body: "Crie um arquivo chamado CLAUDE ponto md na raiz do projeto. Coloque ali tudo que o Claude precisa saber sobre o projeto: arquitetura, convenções de código, comandos importantes como build e test, o que evitar. Toda sessão do Claude Code lê esse arquivo automaticamente. É a memória persistente do projeto. Bem feito, ele economiza meia hora de explicação a cada nova sessão. Em projetos de equipe, versione esse arquivo no Git para todos terem o mesmo Claude." },

    { title: "Subagentes",
      body: "Para tarefas que envolvem muita exploração de código, o Claude Code pode invocar subagentes. Cada subagente trabalha em isolamento com contexto próprio, faz a investigação, e devolve um resumo. A sessão principal não enxerga os passos intermediários, ficando limpa. Use subagentes para mapear código grande, fazer pesquisas longas, gerar relatórios extensos. Tema do curso quinze especificamente." },

    { title: "Skills",
      body: "Skills são instruções markdown reutilizáveis. Você cria um arquivo dot claude barra skills barra nome dot md. Toda vez que o contexto bater, o Claude aplica automaticamente. Por exemplo, uma skill para gerar PR description segue um template fixo da empresa. Você nunca mais escreve descrição manualmente: ela vem padrão. Tema do curso dezesseis especificamente." },

    { title: "MCP no Claude Code",
      body: "Claude Code aceita servidores MCP. Você configura no arquivo dot claude barra mcp dot json. Cada servidor MCP expõe ferramentas, recursos e prompts. Conectar Claude Code ao seu banco de dados, ao Sentry, ao Linear, ao Slack, transforma o agente em centro real de trabalho. Tema das fases quatro e cinco. Por enquanto saiba que existe e que vai ser ensinado em detalhe." },

    { title: "Hooks",
      body: "Hooks são gatilhos automáticos. Você define um comando que roda em eventos: ao salvar arquivo, antes de commit, depois de tarefa concluída. Use para rodar lint, format, testes. Hooks transformam Claude Code em assistente que mantém qualidade automaticamente. Configura no dot claude barra hooks dot json. Tema do curso treze especificamente." },

    { title: "Prática recomendada",
      body: "Pegue um projeto seu, real. Crie o CLAUDE ponto md. Faça uma sessão usando o fluxo Explore Plan Code Commit em uma feature pequena. Sinta o ritmo. Use Plan Mode antes de cada mudança importante. Aprove ações deliberadamente. Ao final, revise o que mudou, corrija o que errou, faça commit. Em duas ou três sessões, você adquire intuição que vale ouro. Não use Claude Code em projeto pessoal sem versionamento. Sempre Git. Sempre branches. Reverter precisa ser fácil." },

    { title: "Encerramento",
      body: "Você completou Claude Code 101. Os próximos cursos aprofundam: Claude Code in Action explora arquitetura, hooks e SDK. Cowork foca em uso por não-devs. Subagents detalha delegação. Skills aprofunda criação de skills personalizadas. Cada um adiciona uma camada. Não pule. Mesmo que você seja senior dev, esses cursos têm padrões que economizam meses de tentativa e erro." }
  ],

  /* =================================================
     CURSO 13 — Claude Code in Action
     ================================================= */
  13: [
    { title: "Aprofundando Claude Code",
      body: "Bem-vindo ao Claude Code in Action. Vinte e uma lições, três horas de aula. Aprofunda Claude Code: arquitetura como assistente de código, tool use no agente, gerenciamento de contexto longo, inputs visuais, comandos customizados, servidores MCP, GitHub workflows, hooks e o Claude Code SDK. Pré-requisito: ter feito o 101." },

    { title: "Arquitetura do Claude Code",
      body: "Claude Code é um agente especializado. Por dentro, ele combina um modelo da família Claude com ferramentas pré-definidas para operar arquivos, rodar comandos shell, navegar diretórios, fazer commit, abrir e editar arquivos no editor. Cada interação sua vira uma sequência de chamadas. O agente decide quais ferramentas usar com base na sua intenção e no contexto carregado. Saber dessa arquitetura ajuda a debugar quando algo não funciona como esperado." },

    { title: "Tool use por dentro",
      body: "Você pode olhar exatamente o que o agente fez. Comando barra tools mostra histórico das ferramentas chamadas na sessão. Cada chamada tem nome da ferramenta, argumentos, e resultado. Útil para entender por que o agente tomou tal decisão. Em projetos complexos, esse log é bússola. Quando o agente parece confuso, geralmente é porque uma ferramenta retornou algo inesperado e ele propagou para frente." },

    { title: "Gerenciamento de contexto longo",
      body: "Conversas longas degradam qualidade. Use o comando barra clear para limpar quando trocar de assunto. Use barra compact para resumir o que aconteceu até aqui em poucas linhas, liberando contexto. Para tarefas extensas, prefira subagentes para isolamento. Aprenda a sentir quando o contexto está pesado: respostas mais lentas, esquecimento de instruções dadas há minutos, contradições. Esses são sinais para limpar." },

    { title: "Visual inputs",
      body: "Cole prints de erro, capturas de UI, fotografias de quadros brancos com diagramas. O Claude lê e raciocina sobre a imagem. Em frontend, isso vira superpoder. Você desenha um wireframe na mão, fotografa, manda. O Claude implementa. Em debug, você cola o screenshot do erro e ele identifica a linha. Essa interação multimodal economiza horas de explicação verbal." },

    { title: "Comandos customizados",
      body: "Salve prompts repetitivos em dot claude barra commands. Cada arquivo markdown vira um comando barra nome do arquivo. Por exemplo, dot claude barra commands barra create-pr ponto md vira o comando barra create-pr na conversa. Use para padronizar tarefas: gerar testes, fazer code review, criar PR, escrever changelog. Em times, versione no Git e todos ganham os mesmos atalhos." },

    { title: "Servidores MCP no Claude Code",
      body: "Configure servidores MCP no arquivo dot claude barra mcp ponto json. Cada servidor expõe ferramentas adicionais para o agente. Conecte ao seu banco de dados Postgres, e o Claude consulta. Conecte ao Sentry, e ele acessa erros recentes. Conecte ao Linear, e ele cria tickets. Conecte ao GitHub, e ele opera issues e PRs. Cada conexão amplia o universo de ações possíveis. Cuidado com permissões: dê apenas leitura quando possível, escrita só onde precisar." },

    { title: "GitHub workflows com Claude Code",
      body: "Existe ação oficial do GitHub para Claude Code. Configure no workflow yaml. Em cada pull request, o Claude pode revisar automaticamente, gerar resumo, sugerir mudanças, rodar testes adicionais. Times usam para garantir padrão mínimo antes de revisão humana. Resultado: revisão humana fica focada em decisões de design, não em problemas mecânicos." },

    { title: "Hooks em detalhe",
      body: "Hooks rodam comandos do sistema em eventos. Por exemplo, on file edit rode npm run lint. On task complete rode npm run test. On commit prepare rode formatador. Os comandos podem ser bash, scripts, ou outras ferramentas. Útil para automação que era manual: lint, format, gerar tipos, atualizar changelog. Bem configurado, nunca mais você esquece de rodar lint antes de commit." },

    { title: "O Claude Code SDK",
      body: "O SDK permite chamar Claude Code programaticamente em scripts e pipelines. Você importa as funções no Node ponto js ou Python, e invoca o agente em código. Útil para automação avançada: criar tarefas em lote, integrar em pipelines de build, criar agentes especializados. Abre cenários de automação onde o Claude Code vira engrenagem em sistemas maiores." },

    { title: "Padrões de equipe",
      body: "Times produtivos com Claude Code adotam práticas. CLAUDE ponto md no repo principal e em sub-projetos. Skills versionadas para tarefas recorrentes. Hooks padronizados para qualidade. MCP servers da empresa configurados centralmente. Comandos customizados criados pelo time, compartilhados via Git. Quando alguém entra no time, clona o repo e ganha um Claude Code já especializado naquele contexto. Aceleração coletiva." },

    { title: "Encerramento",
      body: "Você está pronto para usar Claude Code em produtividade real. O próximo curso é Cowork, focado em quem não programa, ainda assim leitura útil mesmo para devs. Depois Subagents e Skills, que aprofundam recursos centrais. Pratique agora: pegue um repo seu, configure CLAUDE ponto md, dois hooks, uma skill e um comando customizado. Em uma tarde, seu ambiente fica preparado." }
  ],

  /* =================================================
     CURSO 14 — Introduction to Claude Cowork
     ================================================= */
  14: [
    { title: "Cowork para não-programadores",
      body: "Bem-vindo a Introdução ao Claude Cowork. Cowork é o agente de desktop integrado da Anthropic, focado em pessoas que não programam. Pense em uma estagiária digital extremamente capaz: organiza arquivos, lê documentos, faz pesquisa, atualiza planilhas, gera relatórios. Você conduz por conversa em linguagem natural. Em uma semana de uso, profissionais administrativos relatam aumento de produtividade de duas a cinco vezes em tarefas mecânicas." },

    { title: "Instalação",
      body: "Baixe o app pelo site oficial em claude ponto AI. Instale como qualquer aplicativo desktop. No primeiro uso, conecte sua conta Anthropic. Cowork está disponível para Mac e Windows. Linux ainda em pipeline na data deste curso. O app fica rodando na bandeja do sistema, acessível por atalho rápido." },

    { title: "Loop de tarefa",
      body: "Você descreve a tarefa em linguagem natural. O Cowork divide em etapas, executa, mostra o progresso, e pede confirmação nos pontos críticos. Você acompanha em tempo real. Se algo der errado, interrompe, ajusta, redireciona. Esse loop é o coração da experiência. Diferente de chat normal, o Cowork persiste a tarefa e age multi-etapa, sem você precisar reentrar instruções." },

    { title: "Plugins",
      body: "Plugins conectam o Cowork a serviços externos. Gmail para ler e mandar e-mail. Drive para arquivos. Notion para documentos colaborativos. Slack para mensagens. Calendar para agenda. Cada plugin requer autorização explícita. Você revoga quando quiser. Com plugins ativos, tarefas como organizar e-mails da semana, agendar reuniões, atualizar documentos, viram pedidos curtos em linguagem natural." },

    { title: "Skills no Cowork",
      body: "Cowork também aceita Skills, igual ao Claude Code. Skills são instruções em markdown que o Cowork aplica automaticamente quando reconhece o contexto. Crie skills para: relatório semanal padrão da sua equipe, follow up de e-mail comercial, classificação de leads. Cada skill que você cria, vira capacidade permanente do seu Cowork. Em pouco tempo, ele tem dezenas de habilidades especializadas no seu trabalho." },

    { title: "Fluxos de arquivo",
      body: "Cowork organiza pastas, renomeia em massa, extrai dados de PDFs, preenche planilhas. Você diz: organize a pasta downloads separando por tipo de arquivo, e arquivos antigos para uma pasta de arquivo. Ele executa. Diz: extraia os valores de notas fiscais nesta pasta para uma planilha com colunas data, fornecedor, valor. Ele extrai. Tarefas que demoravam horas viram minutos." },

    { title: "Pesquisa profunda",
      body: "Para pesquisa, Cowork navega na web, junta fontes, escreve relatório com citações. Cada etapa fica auditável. Você pede uma análise comparativa entre cinco concorrentes: ele visita os sites, lê artigos relevantes, monta um documento estruturado. Para cada afirmação importante, link para a fonte. Você verifica, refina e usa. Em apresentações, contratos, decisões, esse fluxo poupa dias." },

    { title: "Trabalho responsável",
      body: "Em tarefas multi-etapa, sempre revise antes de aprovar ações irreversíveis: enviar e-mail, deletar arquivo, publicar conteúdo. Configure o nível de autonomia conforme sua confiança no fluxo. Para tarefas com risco baixo, deixe automático. Para risco alto, mantenha confirmação por etapa. Cowork respeita esse controle." },

    { title: "Integração com fluxo de trabalho",
      body: "Cowork brilha quando você integra ao seu fluxo. Reserve uma janela diária para o Cowork. Por exemplo, primeira hora da manhã: Cowork organiza e-mails, traz resumo, lista urgências. Última hora do dia: Cowork prepara relatório do dia, agenda follow ups. Em poucas semanas, o Cowork vira parte do ritmo. Como ter um assistente sem o custo." },

    { title: "Encerramento",
      body: "Cowork não é para todo mundo, mas para quem é, transforma. Profissionais administrativos, gestores, pesquisadores, advogados, jornalistas. Se sua rotina tem partes mecânicas repetitivas, vale o investimento de uma semana de aprendizado. Próximo curso: Introduction to Subagents, onde voltamos para conceitos avançados de delegação." }
  ],

  /* =================================================
     CURSO 15 — Introduction to Subagents
     ================================================= */
  15: [
    { title: "Por que subagentes",
      body: "Bem-vindo ao curso de subagentes. Quando uma sessão fica longa, com muitas idas e voltas, o contexto enche e a qualidade das respostas piora. Subagentes resolvem isso. Você delega uma sub-tarefa a um agente isolado, com contexto próprio, e recebe só o resultado. A sessão principal fica limpa e focada. É como contratar um especialista para uma sub-tarefa, em vez de pedir para um generalista que está cansado." },

    { title: "Quando usar",
      body: "Use subagente para investigação de código em projeto grande, geração de relatórios extensos, rodadas de pesquisa, qualquer trabalho que produza muito ruído mas devolve uma conclusão pequena. Por exemplo: encontre todas as ocorrências de chamada para essa API e descreva como cada uma usa. O subagente faz a varredura, lê dezenas de arquivos, e devolve um resumo de poucas linhas. A sessão principal não vê o ruído da varredura, só recebe a conclusão." },

    { title: "Como funciona internamente",
      body: "Você invoca o subagente via comando especial ou API. Passa instrução clara, arquivos relevantes, contexto necessário. Ele opera em isolamento, faz suas chamadas, consome seu próprio contexto, e devolve um resumo no formato que você pediu. Da perspectiva da sessão principal, é como chamar uma função: entrada, saída, processo opaco. Esse isolamento é a chave." },

    { title: "Workflow multi-agente",
      body: "Para tarefas grandes, monte um time. Um agente arquiteto que planeja em alto nível. Um agente codificador que implementa cada peça. Um agente revisor que critica antes de aceitar. Cada um com seu papel e seu contexto. O orquestrador, que pode ser você ou um agente principal, coordena. É como ter equipe de pessoas pequena dentro do computador. Padrão clássico em sistemas avançados." },

    { title: "Limites e cuidados",
      body: "Subagentes consomem tokens, e cada um custa uma chamada à API. Não use para tarefas triviais que cabem na sessão principal. Defina critério de parada claro: o que conta como tarefa concluída. Sempre revise o resumo devolvido antes de aceitar como verdade. Subagentes podem alucinar igual qualquer agente. A diferença é que você só vê o final, então perde a chance de corrigir no caminho. Por isso, escolha tarefas onde o resultado é facilmente verificável." },

    { title: "Subagentes em Claude Code",
      body: "No Claude Code, subagentes aparecem como ferramenta integrada. Você pede ao Claude principal para delegar uma sub-tarefa a um subagente. Ele invoca, executa, devolve. Comum em tarefas como mapeamento de código, varredura de bugs, reformatação em massa. O Claude Code 101 e o Code in Action mostram exemplos práticos." },

    { title: "Prática recomendada",
      body: "Pegue uma tarefa que naturalmente quebra em duas partes: uma de pesquisa e outra de síntese. Delegue a pesquisa a um subagente. Sinta a diferença em qualidade da síntese ao receber só o material relevante. Em poucas tentativas, você desenvolve intuição sobre quando vale subagente e quando não vale. É uma das skills mais impactantes para quem trabalha com tarefas longas." },

    { title: "Encerramento",
      body: "Subagentes são ferramenta poderosa quando bem aplicada, e desperdício quando mal aplicada. Use com critério. Próximo curso: Introduction to Agent Skills, onde a customização do Claude vai a outro nível através das skills." }
  ],

  /* =================================================
     CURSO 16 — Introduction to Agent Skills
     ================================================= */
  16: [
    { title: "O que são Skills",
      body: "Bem-vindo ao curso de Agent Skills. Skills são instruções em markdown que o Claude aplica automaticamente quando reconhece o contexto. Pense num manual de procedimento operacional padrão que você ensina uma vez, e ele segue para sempre. Em vez de digitar o mesmo prompt longo toda hora, você cria uma skill, e o Claude aplica sozinho." },

    { title: "Estrutura de uma skill",
      body: "Uma skill é uma pasta com um arquivo principal chamado SKILL ponto md. Esse arquivo tem um cabeçalho front matter com metadados: nome, descrição, gatilho de ativação. Em seguida vem o corpo da skill: as instruções detalhadas. Pode ter arquivos de apoio na mesma pasta: exemplos, templates, scripts auxiliares. A pasta toda é a skill." },

    { title: "Quando uma skill ativa",
      body: "O Claude lê a descrição da skill no front matter e o gatilho. Quando o seu prompt corresponde ao contexto descrito, ele aplica a skill sem você precisar pedir. Por exemplo, uma skill chamada Revisão de PR tem descrição: aplicar quando o usuário pedir revisão de pull request ou code review. Você diz: revise esse PR. A skill ativa automaticamente, e a revisão sai no formato e profundidade que você definiu." },

    { title: "Criando a primeira skill",
      body: "Identifique uma tarefa que você repete: revisão de PR, geração de release notes, análise de erro de produção, classificação de bug report. Crie a pasta dot claude barra skills barra nome-da-skill. Dentro, SKILL ponto md. No front matter, name, description e trigger. No corpo, escreva como ensinaria a um colega novo: contexto, passos, formato esperado, exemplos. Salve. Em uma sessão nova, peça a tarefa relacionada. A skill ativa." },

    { title: "Skills com arquivos de apoio",
      body: "Skills sofisticadas têm arquivos de apoio. Exemplos.md com casos exemplares. Template.md com estrutura padrão a preencher. Glossário.md com termos da empresa. Script ponto py com helper que o Claude pode invocar. A skill referencia esses arquivos no SKILL ponto md, e o Claude carrega quando precisar. Permite encapsular conhecimento profundo em uma única unidade portátil." },

    { title: "Distribuição em equipe",
      body: "Versione as skills no Git do projeto. Toda a equipe ganha o mesmo comportamento ao clonar o repo. Skills viram parte do tooling do time. Conforme tarefas comuns mudam, alguém atualiza a skill, e via Git todo mundo ganha a melhoria. É código colaborativo aplicado a comportamento de IA. Empresas avançadas mantêm bibliotecas de cinquenta a cem skills internas." },

    { title: "Skills e segurança",
      body: "Skills são prompts arbitrários. Em ambiente compartilhado, skills podem ser vetor de ataque: alguém adiciona uma skill maliciosa que orienta o agente a vazar dados ou executar ações ruins. Por isso, em times, code review de skills novas é essencial. Skills entram no repositório como código sensível: revisadas, aprovadas, versionadas." },

    { title: "Casos de uso poderosos",
      body: "Skills boas. Code review com critérios da empresa. Geração de PR description seguindo template. Sumarização de incident postmortem no formato exigido. Classificação de tickets de suporte. Geração de release notes a partir de commits. Análise de logs com padrões conhecidos. Cada skill economiza alguns minutos por uso. Multiplicado por equipe e frequência, vira horas por semana." },

    { title: "Skills oficiais",
      body: "A Anthropic mantém skills oficiais que você pode importar. Formatos como writing skill, coding skill, research skill, com práticas curadas. Vale instalar e usar, e às vezes adaptar a skill oficial para sua realidade. Comece pelas oficiais antes de criar do zero." },

    { title: "Encerramento da fase quatro",
      body: "Concluindo este curso, você fecha a fase quatro: Claude Code, agentes, subagentes, Skills. Está pronto para a fase mais avançada do ecossistema, MCP. É a fronteira atual da engenharia em IA: como conectar modelos a sistemas externos de forma padronizada e robusta. Faça uma pausa, pratique tudo da fase quatro em projetos reais por uma semana ou duas, e depois siga para os cursos dezessete e dezoito." }
  ],

  /* =================================================
     CURSO 17 — Introduction to Model Context Protocol
     ================================================= */
  17: [
    { title: "O que é MCP",
      body: "Bem-vindo a Model Context Protocol. MCP é um protocolo aberto, mantido pela Anthropic, para conectar modelos de IA a sistemas externos de forma padronizada. Antes do MCP, cada integração era ad hoc: cada cliente tinha seu próprio jeito de expor ferramentas. Com MCP, você escreve um servidor uma vez e ele funciona em todo cliente compatível: Claude Desktop, Claude Code, e qualquer outra aplicação que adote o protocolo." },

    { title: "Por que isso importa",
      body: "MCP é considerado a skill mais valiosa do mercado em dois mil e vinte e seis. A razão é simples: qualquer empresa pode expor seus sistemas internos para qualquer modelo de IA com um único servidor MCP. É a USB-C da inteligência artificial. Plug and play universal. Quem domina MCP está em posição rara: poucos profissionais sabem construir servidores robustos, e a demanda explode." },

    { title: "As três primitivas",
      body: "MCP define três primitivas. Primeira, tools: ações que o modelo pode executar, como criar issue, consultar banco, enviar e-mail. Segunda, resources: dados que o modelo pode ler, como arquivos, registros, logs. Terceira, prompts: templates que o modelo pode invocar, como código de boas-vindas ou relatório semanal. Cada primitiva tem schema próprio. Servidores MCP expõem combinações dessas três." },

    { title: "Servidor MCP em Python",
      body: "Instale o pacote MCP via pip install MCP. Crie um arquivo de servidor que registra tools, resources e prompts. Cada tool é uma função decorada com seu schema. Por exemplo, decorate uma função get_weather com at server ponto tool, descrição e parâmetros. O servidor roda em stdio, recebendo comandos do cliente via entrada padrão e respondendo via saída padrão. Pode também rodar via SSE para clientes remotos." },

    { title: "Conectando ao Claude Desktop",
      body: "Abra o arquivo de configuração do Claude Desktop. No Mac, em Library Application Support Claude. No Windows, no Roaming Claude. Adicione um campo mcpServers com seu servidor: command para invocar, args para argumentos. Reinicie o Claude Desktop. Na próxima sessão, as ferramentas do seu servidor aparecem disponíveis. Você pede ao Claude tarefas que envolvem o sistema sem escrever código de integração toda hora." },

    { title: "Conectando ao Claude Code",
      body: "No projeto, crie dot claude barra mcp ponto json. Liste seus servidores no mesmo formato. Ao iniciar Claude Code, ele lê e conecta. As tools, resources e prompts ficam disponíveis ao agente. Você pode então fazer pedidos como: consulte o banco de dados de produção e me dê os usuários ativos do último mês. O Claude Code chama a tool exposta pelo seu MCP server." },

    { title: "Schema de tools",
      body: "Para cada tool, defina schema rigoroso. Nome, descrição, input schema com tipos e descrições de cada parâmetro. Saída deve ser estruturada e estável. Trate erros graciosamente: devolva erro descritivo em vez de exception. Documente comportamento esperado. Lembre que o modelo nunca vê o código, só vê o schema. Schemas bem documentados são metade do trabalho." },

    { title: "Resources",
      body: "Resources são dados que o modelo pode ler. Cada resource tem URI única, MIME type, e conteúdo. O servidor expõe a lista de resources disponíveis, e o cliente pode pedir o conteúdo de um específico quando precisar. Útil para expor arquivos, registros, dashboards. Como o conteúdo é lido sob demanda, não precisa caber tudo no contexto inicial." },

    { title: "Prompts",
      body: "Prompts MCP são templates que o cliente pode invocar. Por exemplo, um prompt chamado weekly_report que recebe parâmetros e retorna um prompt completo pronto para o modelo. Útil para padronizar comportamentos comuns. Em equipes, prompts MCP são forma de versionar e distribuir prompts críticos da empresa." },

    { title: "Boas práticas para começar",
      body: "Comece com servidor pequeno: uma ou duas tools, sem resources nem prompts. Faça funcionar end to end. Teste com Claude Desktop. Itere. Adicione mais tools conforme entender padrões. Use logs em todas as tools. Trate erros explicitamente. Para servidores que vão a produção, adicione testes unitários. Mantenha o schema atualizado com a realidade." },

    { title: "Próximo passo",
      body: "Esse curso te dá base. O próximo, MCP Advanced Topics, mergulha em padrões de produção: sampling, notifications, sistemas de arquivos, transportes. Antes de avançar, construa pelo menos um servidor MCP simples conectado a uma API real. Tipo: um servidor que expõe sua agenda ou suas finanças. A experiência prática é insubstituível." }
  ],

  /* =================================================
     CURSO 18 — MCP: Advanced Topics
     ================================================= */
  18: [
    { title: "MCP em produção",
      body: "Bem-vindo a MCP Avançado. Este curso pega você do MCP de exemplo e leva para MCP de produção. Padrões avançados: sampling, notifications, acesso ao sistema de arquivos, mecanismos de transporte. Pré-requisito: ter feito o curso anterior. Sem o básico, vários conceitos aqui não fazem sentido." },

    { title: "Sampling",
      body: "Sampling é o mecanismo pelo qual o servidor MCP pode pedir ao cliente que invoque o modelo. Inverte o fluxo padrão. Por exemplo, o servidor recebe um pedido para gerar um relatório, mas precisa que o modelo gere o texto narrativo. Em vez do servidor ter sua própria conexão com a API, ele pede ao cliente que faça a chamada. O cliente coordena. Útil em servidores que produzem conteúdo dinâmico baseado em dados estruturados." },

    { title: "Notifications",
      body: "Servidores podem emitir eventos: tool atualizada, recurso modificado, progresso de tarefa longa, alerta de erro. O cliente reage em tempo real. Essencial para experiências interativas e tarefas demoradas. Exemplo: um servidor que faz indexação de documentos pode emitir notification a cada bloco indexado, e a UI mostra progresso. Sem notifications, processos longos parecem travados." },

    { title: "Acesso ao sistema de arquivos",
      body: "Servidores podem expor arquivos do disco local ou remoto como resources. Defina permissões com cuidado. Read only por padrão. Write apenas onde fizer sentido. Audite o acesso para evitar exposição acidental de dados. Whitelist de paths. Bloqueie acesso a paths de configuração sensível, dot env, dot ssh, chaves privadas. Tratado com leveza, esse poder vira incidente de segurança." },

    { title: "Transportes",
      body: "MCP suporta vários transportes. Stdio: simples, processo filho, ideal para desktop. SSE: server sent events sobre HTTP, ideal para servidores remotos. WebSocket: bidirecional, emergente como opção robusta. Escolha conforme o cenário. Desktop usa stdio. Web usa SSE. Aplicações exigentes em latência usam WebSocket. Cada transporte tem trade-offs em performance, segurança e complexidade." },

    { title: "Autenticação",
      body: "Servidores MCP públicos precisam de autenticação. OAuth dois ponto zero é o padrão emergente. Cada cliente se autentica, e o servidor verifica antes de expor tools sensíveis. Para servidores internos, basic auth via header pode bastar. Para serviços públicos, OAuth com scopes finos. Nunca exponha tools que mexem em estado real sem autenticação adequada." },

    { title: "Rate limiting",
      body: "Servidores em produção precisam de rate limit. Defina limites por cliente, por tool, por janela de tempo. Quando o limite é atingido, devolva erro estruturado. O cliente pode então mostrar mensagem ao usuário, ou esperar e tentar de novo. Sem rate limit, um cliente bug pode tirar seu servidor do ar com explosão de chamadas. Implemente desde o início." },

    { title: "Logging e observabilidade",
      body: "Logue tudo. Cada chamada de tool: quem chamou, com que argumentos, qual o resultado, quanto demorou. Logs estruturados facilitam análise depois. Em sistemas críticos, integre com plataformas de observabilidade como Datadog ou Grafana. Métricas chave: requisições por segundo, latência média e p99, taxa de erro, distribuição de uso entre tools. Esses números te ajudam a otimizar onde importa." },

    { title: "Versionamento",
      body: "Schema de tools muda. Quando muda, clientes antigos podem quebrar. Versione. Use semver no nome do servidor. Em changes breaking, lance versão maior, mantenha versão anterior em paralelo durante transição. Documente claramente o que mudou. Para servidores internos, pode ser mais flexível. Para servidores públicos, disciplina rigorosa de versionamento é obrigatória." },

    { title: "Testes",
      body: "Testes unitários cobrem cada tool individualmente. Testes de integração cobrem o fluxo end to end com cliente real. Testes de carga simulam tráfego de produção. Para times sérios, testes rodam em CI a cada PR. MCP é código de produção. Trate como tal." },

    { title: "Servidores famosos",
      body: "Há servidores MCP públicos disponíveis. Filesystem expõe um diretório local. Postgres expõe um banco. GitHub expõe issues e PRs. Slack expõe mensagens. Cada um exemplo de bom design. Vale estudar o código fonte deles. Padrões de schema, tratamento de erro, logging. Imitar bons exemplos é a melhor escola." },

    { title: "Encerramento da fase cinco",
      body: "Concluindo este curso, você fecha a fase cinco e tem domínio raro do MCP. Falta a fase seis, focada em cloud, enterprise e certificação. Se MCP é a fronteira técnica, certificação é a validação profissional. Próximos cursos: Bedrock, Vertex AI, Vibe Coding e a certificação Anthropic Architect. Continue." }
  ],

  /* =================================================
     CURSO 19 — Claude with Amazon Bedrock
     ================================================= */
  19: [
    { title: "Claude no AWS",
      body: "Bem-vindo ao curso de Claude no Amazon Bedrock. Bedrock é o serviço gerenciado da AWS para modelos fundacionais. Aqui você integra Claude direto ao seu ambiente AWS, com governança, billing e compliance unificados. Foi originalmente treinamento interno da AWS, agora público. Pré-requisito: conhecimento básico de AWS, IAM, e ter conta ativa." },

    { title: "Por que Bedrock",
      body: "Se sua empresa já roda em AWS, Bedrock simplifica vários temas. Dados não saem da sua VPC. Permissões via IAM, integradas às políticas existentes. Logs no CloudWatch, métricas no nativo. Billing unificado com o resto da AWS. Para times enterprise, essa integração nativa muitas vezes vence o uso direto da API da Anthropic. Em alguns casos é exigência de compliance: dados não podem cruzar fronteiras de provedor." },

    { title: "Habilitando Claude no Bedrock",
      body: "No console AWS, vá em Bedrock. Em Model access, solicite acesso aos modelos Claude. A aprovação geralmente é imediata. Após aprovação, os modelos aparecem disponíveis na sua região. Verifique a região: nem todos os modelos estão em todas as regiões. Use o playground para fazer chamadas iniciais sem código." },

    { title: "Configurando o SDK",
      body: "Use o SDK boto3 padrão da AWS. As credenciais vêm do mecanismo padrão: variáveis de ambiente, perfil IAM, role da máquina. Não precisa de API key da Anthropic. O acesso é via IAM. Configure permissões via política IAM com action bedrock invoke model em recursos específicos. Princípio de menor privilégio: cada serviço só acessa os modelos que precisa." },

    { title: "Diferenças da API direta",
      body: "Algumas diferenças importantes. O nome do modelo muda: prefixo anthropic ponto claude. Autenticação via AWS SDK em vez de API key. Algumas features chegam ao Bedrock com pequena defasagem em relação à API direta da Anthropic. Sempre leia os release notes da AWS antes de assumir paridade. Comportamento do modelo é idêntico. Mesma qualidade, mesmas capacidades." },

    { title: "Tool use no Bedrock",
      body: "Tool use funciona como na API direta, com pequenas diferenças no formato JSON. O fluxo continua sendo: enviar prompt com tools, receber tool_use, executar localmente, devolver tool_result, receber resposta final. O Cookbook tem exemplos prontos em Python e Node ponto js para Bedrock. Adapte ao seu pipeline." },

    { title: "Streaming",
      body: "Streaming via Bedrock usa o método invoke_model_with_response_stream. Você itera sobre os eventos. Cada chunk vem com text incremental. Para chats interativos, isso melhora UX. Implementação é parecida com API direta, mudando o cliente." },

    { title: "Pipeline de retrieval AWS",
      body: "Para RAG no AWS, combine: S3 para arquivos, OpenSearch ou Aurora pgvector para embeddings, Lambda para orquestração, Bedrock para geração. Tudo integrado via IAM, sem credenciais expostas. Esse stack roda em produção em centenas de empresas hoje. Bedrock também tem Knowledge Bases, um serviço gerenciado de RAG, onde você fornece documentos e o serviço cuida de tudo: chunking, embeddings, busca, geração de resposta." },

    { title: "Custos e otimização",
      body: "Bedrock cobra por tokens, parecido com a API direta. Verifique a tabela de preços da AWS, que pode diferir levemente. Há descontos para uso reservado, em comprometimento de longo prazo. Para volume grande, considere reserved capacity. Use também batch inference do Bedrock para tarefas não urgentes, com desconto de até cinquenta por cento." },

    { title: "Compliance e regiões",
      body: "Para dados sensíveis, escolha região com compliance adequado: HIPAA para saúde, FedRAMP para governo americano, regiões da Europa para GDPR. Bedrock respeita boundary de região: dados ficam na região selecionada, não cruzam para outras. Para operações em vários países, considere arquitetura multi-região com isolamento adequado." },

    { title: "Encerramento",
      body: "Para times AWS, Bedrock é caminho natural para Claude em produção. Para times em outros clouds, próximos cursos cobrem Vertex AI, e na sequência o Vibe Coding. Pratique: faça uma chamada simples ao Bedrock, depois implemente um pipeline pequeno de RAG usando Knowledge Bases. Essa experiência vale o curso inteiro." }
  ],

  /* =================================================
     CURSO 20 — Claude with Google Cloud Vertex AI
     ================================================= */
  20: [
    { title: "Claude no GCP",
      body: "Bem-vindo ao curso de Claude no Google Cloud Vertex AI. Vertex AI é o equivalente da Google Cloud para o Bedrock. Para times no GCP, expõe o Claude com integração nativa ao IAM, ao BigQuery, ao Cloud Run, e tudo mais do GCP. Pré-requisito: conhecimento básico de GCP e conta ativa." },

    { title: "Habilitando o Claude no Vertex",
      body: "No console GCP, habilite a API do Vertex AI no seu projeto. Em Model Garden, encontre os modelos Claude e aceite os termos de uso. Após aceite, ficam disponíveis para invocação. Verifique a região: nem todos os modelos estão em todas as regiões. Vertex AI tem uma lista oficial de regiões suportadas por modelo." },

    { title: "Autenticação",
      body: "A autenticação usa Application Default Credentials. Em ambiente local, faça gcloud auth application-default login. Em servidores, use service accounts com role apropriado. Configure IAM com permissão aiplatform endpoints predict no recurso correto. Princípio de menor privilégio aplica como sempre." },

    { title: "Cliente Python",
      body: "Use o cliente anthropic com adaptação para Vertex. Em vez de Anthropic abre fecha parênteses, use AnthropicVertex passando project_id e region. As demais chamadas seguem o mesmo padrão. O nome do modelo no Vertex segue convenção do GCP: claude-sonnet-4-5 mais alguma variante por região. Confirme no Model Garden." },

    { title: "Streaming e tool use",
      body: "Funcionam como na API direta, com pequenas adaptações no SDK. Streaming continua eficiente, tool use mantém o mesmo fluxo. Use Cloud Functions ou Cloud Run para hospedar a lógica que executa as ferramentas. A integração com BigQuery permite tool use que consulta dados massivos diretamente." },

    { title: "Quando escolher Vertex",
      body: "Times já no GCP que querem manter dados na sua região. Empresas com compliance europeu, asiático ou de regiões específicas onde a Anthropic direta não opera. Aplicações que dependem de outros serviços GCP, como BigQuery, Vertex Search, Document AI. Para quem está fora desses contextos, a API direta da Anthropic costuma ser mais simples." },

    { title: "Pipeline de RAG GCP",
      body: "Para RAG no GCP: Cloud Storage para arquivos, Vertex AI Embeddings para vetorização, Vertex AI Vector Search para o índice, Cloud Functions para orquestração, Vertex Claude para geração. Tudo no mesmo provedor, com latência baixa entre serviços e billing unificado." },

    { title: "Encerramento",
      body: "Vertex AI é alternativa sólida ao Bedrock para times Google Cloud. Próximo curso: Vibe Coding com Claude Code, no Coursera, externo à Academy. Pratique antes: faça uma chamada simples ao Vertex Claude, depois um pipeline de RAG completo. Em uma tarde você fixa as bases." }
  ],

  /* =================================================
     CURSO 21 — Vibe Coding with Claude Code (Coursera)
     ================================================= */
  21: [
    { title: "Curso externo no Coursera",
      body: "Bem-vindo ao Vibe Coding com Claude Code, curso externo no Coursera, em parceria com Scrimba. Diferente dos cursos da Academy, este foca em construir um aplicativo real do zero. Cobre hooks, slash commands, agentes, construção de um app de calendário real, integração MCP. Certificado Coursera, plataforma paga." },

    { title: "Por que esse curso vale",
      body: "Os cursos da Academy ensinam recursos isolados. Este combina tudo num projeto realista. Você sente como, num projeto real, decisões se interconectam. Quando colocar um hook, quando criar slash command, quando delegar a subagente, quando integrar MCP. Esse senso de combinação só vem com prática orientada." },

    { title: "Hooks na prática",
      body: "Você vai criar hooks que rodam testes ao salvar, formatadores ao commitar, deploys ao fazer push. Cada hook é simples, mas o conjunto vira ambiente que mantém qualidade automaticamente. Em um time pequeno, esse padrão substitui muito processo manual." },

    { title: "Slash commands customizados",
      body: "Comandos para padronizar tarefas: criar componente, gerar migração, escrever endpoint. Cada comando vira atalho. Em vez de digitar prompt completo, basta o slash. Padronização vira velocidade." },

    { title: "Agentes coordenados",
      body: "O curso mostra como combinar Claude principal com subagentes especializados. Um para frontend, um para backend, um para testes. Cada subagente tem seu CLAUDE ponto md específico. O Claude principal orquestra. Em projetos médios, essa divisão de trabalho funciona como time pequeno." },

    { title: "Construindo o app de calendário",
      body: "O projeto é um aplicativo de calendário com backend, frontend, autenticação, persistência, integrações de eventos. Cada etapa é guiada pelo Claude Code em modo Plan, depois Execute, depois Commit. Ao final você tem um produto funcional, e o entendimento sólido do fluxo agentic. É o melhor recap de tudo que aprendeu até agora." },

    { title: "Integração MCP",
      body: "O app conecta a um servidor MCP que expõe APIs externas, como Google Calendar, e o banco local. Você fecha o ciclo: pede em linguagem natural, o Claude planeja, usa as ferramentas via MCP, escreve e commita o código. Completa o entendimento de MCP em contexto real." },

    { title: "Certificado Coursera",
      body: "O certificado tem peso diferente da Academy. Algumas empresas reconhecem mais. Para currículo, vale a pena ter. Outros aprendem mais com o conteúdo do que com o certificado. Decida pelo seu objetivo: aprendizado ou validação. O conteúdo justifica o investimento em qualquer caso." },

    { title: "Encerramento",
      body: "Concluído este curso, você está com habilidade prática real para projetos com Claude Code. O próximo, último da jornada, é a certificação Anthropic Certified Architect Foundations. Não é curso, é exame. Os cursos das fases três a cinco são preparação. Vamos aos detalhes." }
  ],

  /* =================================================
     CURSO 22 — Claude Certified Architect — Foundations
     ================================================= */
  22: [
    { title: "Certificação oficial Anthropic",
      body: "Bem-vindo à preparação para a certificação Claude Certified Architect Foundations. É a primeira certificação profissional oficial da Anthropic, anunciada em março de dois mil e vinte e seis. Voltada para engenheiros e arquitetos que projetam soluções de produção com Claude. Diferente dos cursos anteriores, esta etapa é um exame com conteúdo cumulativo." },

    { title: "O que cai",
      body: "O conteúdo cobre as fases três a cinco da sua jornada. API e desenvolvimento, Claude Code e agentes, MCP. Foco em desenho de sistemas: escolha de modelo conforme caso de uso, padrões de prompt para produção, evals, tool use seguro, arquitetura de agentes, MCP em produção, custo e latência, observabilidade, compliance e segurança." },

    { title: "Formato do exame",
      body: "Exame online, com supervisão remota. Múltipla escolha, com cenários de caso. Alguns itens pedem para escolher a melhor arquitetura entre opções, outros para identificar problemas em arquiteturas dadas. Tempo controlado. A pontuação mínima é divulgada na descrição oficial. Reprovou, pode tentar de novo após período de espera." },

    { title: "Como se preparar",
      body: "Os cursos da Academy são a preparação oficial. Refaça os labs até dominar. Construa pelo menos dois projetos completos: um RAG bem feito, e um agente com tool use e MCP. Esses projetos viram seu portfólio e seu material de revisão. Sem prática real, conhecimento de exame se evapora rápido." },

    { title: "Estratégia de revisão",
      body: "Faça revisão ativa: anote uma pergunta ao final de cada lição, e responda sem olhar a aula depois. Revise as respostas semanalmente. Em duas semanas você cobre todo o conteúdo da prova com retenção de longo prazo. Inclua uma seção de erros comuns: cada vez que errar uma questão de prática, anote. Releia essa lista um dia antes do exame." },

    { title: "Preparação prática",
      body: "Construa um projeto completo end to end. Frontend simples, backend com API Claude, RAG sobre uma base sua, tool use chamando uma API externa, deployment em cloud. Esse projeto cobre noventa por cento dos tópicos da prova. Quando você consegue explicar em voz alta cada decisão arquitetural do projeto, está pronto." },

    { title: "Documentos para revisão",
      body: "Revise antes da prova: documentação de prompt engineering, página de modelos, documentação de tool use, documentação de MCP, página de prompt caching, página de Extended Thinking. Não decore: entenda. A prova testa entendimento, não memória." },

    { title: "Dia da prova",
      body: "Durma bem. Coma normal. Tenha conexão estável de internet. Webcam funcionando. Documento de identidade. Use computador conhecido, não emprestado. Antes de começar, leia rápido todas as questões para calibrar tempo. Marque as que tiver dúvida e volte. Não trave em uma questão. Confiança calma é o melhor estado para o exame." },

    { title: "Depois da prova",
      body: "Aprovado, você ganha credencial verificável. Entra automaticamente na lista de Anthropic Certified Architects, que é referenciada pela empresa em programas de parceiros. Em LinkedIn, adicione a credencial. Em currículo, em portfólio público. Para freelancers, abre porta para projetos avançados. Para profissionais em times, justifica posições mais sêniores em projetos com Claude. Mais importante que tudo: a preparação consolida em maestria real tudo que você aprendeu nas fases anteriores." },

    { title: "Próximos passos depois da certificação",
      body: "Você completou a jornada. Mas a Anthropic está em movimento contínuo. Modelos novos, recursos novos, padrões novos. Mantenha rotina mensal de quinze minutos olhando docs novas, Cookbook novo, posts oficiais. Considere a próxima certificação quando lançada, provavelmente um nível Advanced ou Specialist. Continue construindo. Compartilhe aprendizados. Você agora é parte da fronteira mundial em IA aplicada." },

    { title: "Encerramento da jornada",
      body: "Concluindo este curso e o exame, você termina toda a jornada que começou no curso um, AI Capabilities and Limitations. Saiu do absoluto zero e chegou a profissional certificado pela Anthropic. Em vinte e duas etapas, você passou por fundamentos, prompts, API, agentes, Claude Code, MCP, cloud, e certificação. Cinquenta e cinco horas de estudo concentrado. Centenas de horas de retorno em produtividade pelo resto da carreira. Parabéns. Está pronto para construir o futuro." }
  ]
};



