/* =========================================================
   data.js — Conteúdo do roteiro Anthropic do zero ao avançado
   Todos os links foram verificados a partir de fontes oficiais
   (anthropic.skilljar.com, github.com/anthropics, docs.anthropic.com).
   ========================================================= */

/* eslint-disable */
const PHASES = [
  // ============== FASE 1 ==============
  {
    id: "p1",
    tag: "Fase 1",
    title: "Fundamentos absolutos",
    weeks: "Semanas 1–2",
    hours: "~7h",
    desc: "Sem pré-requisitos. Não precisa de conta Anthropic nem cartão. Crie conta em anthropic.skilljar.com e comece.",
    items: [
      {
        n: 1,
        title: "AI Capabilities and Limitations",
        kind: "academy",
        kindLabel: "Academy · ~30 min · Grátis",
        desc: "Como modelos de linguagem realmente funcionam: capacidades reais, limites operacionais, o que esperar e o que não esperar do Claude. Ponto de partida absoluto.",
        study: "30 min aula + 30 min lendo a documentação oficial. Total: ~1h.",
        videoQuery: "Claude AI capacidades limitações tutorial português",
        links: [
          { label: "Acessar curso", url: "https://anthropic.skilljar.com/ai-capabilities-and-limitations" },
          { label: "Docs · How Claude works", url: "https://docs.anthropic.com/en/docs/intro" }
        ]
      },
      {
        n: 2,
        title: "Claude 101",
        kind: "academy",
        kindLabel: "Academy · ~1h · Certificado",
        desc: "Primeiro contato prático: lições cobrindo projetos, artefatos, skills, pesquisa profunda, Cowork, Claude Code app e conexão com ferramentas de terceiros.",
        study: "1h aula + 2h de prática livre no claude.ai aplicando cada feature aprendida. Total: ~3h.",
        videoQuery: "Claude AI tutorial completo português iniciantes projetos artefatos",
        links: [
          { label: "Acessar curso", url: "https://anthropic.skilljar.com/claude-101" },
          { label: "Abrir claude.ai", url: "https://claude.ai" }
        ]
      },
      {
        n: 3,
        title: "AI Fluency: Framework & Foundations",
        kind: "academy",
        kindLabel: "Academy · ~2h · Certificado",
        desc: "Marco mental para trabalhar com qualquer IA: eficiência, ética, segurança. Co-desenvolvido com acadêmicos de Stanford, Yale, Rice e U Michigan. Base para os demais cursos.",
        study: "2h aula + 1h revisando e anotando os frameworks apresentados. Total: ~3h.",
        videoQuery: "AI fluency framework como trabalhar com IA português",
        links: [
          { label: "Acessar curso", url: "https://anthropic.skilljar.com/ai-fluency-framework-foundations" }
        ]
      }
    ]
  },

  // ============== FASE 2 ==============
  {
    id: "p2",
    tag: "Fase 2",
    title: "Prompt Engineering",
    weeks: "Semanas 3–5",
    hours: "~16h",
    desc: "Precisa de Python instalado e uma API key Anthropic para os cursos do GitHub (console.anthropic.com). Créditos gratuitos disponíveis para novos usuários.",
    items: [
      {
        n: 4,
        title: "Anthropic API Fundamentals",
        kind: "github",
        kindLabel: "GitHub · ~2h · Jupyter",
        desc: "Essenciais do SDK Claude: API key, parâmetros do modelo, prompts multimodais, streaming de respostas. Primeiro passo técnico antes de qualquer curso de desenvolvimento.",
        study: "2h executando notebooks + 1h de experimentação livre com a API. Total: ~3h.",
        videoQuery: "Anthropic API Claude Python SDK tutorial português",
        links: [
          { label: "Ver no GitHub", url: "https://github.com/anthropics/courses/tree/master/anthropic_api_fundamentals" },
          { label: "Console Anthropic", url: "https://console.anthropic.com" }
        ]
      },
      {
        n: 5,
        title: "Prompt Engineering Interactive Tutorial",
        kind: "github",
        kindLabel: "GitHub · ~4h · Jupyter / Sheets",
        desc: "9 capítulos com exercícios práticos: estrutura de prompt, clareza, XML tags, chain-of-thought, atribuição de roles, formatação de output e redução de alucinações. O mais completo para iniciantes técnicos.",
        study: "4h de tutorial + 2h refazendo os exercícios com seus próprios casos de uso. Total: ~6h.",
        videoQuery: "prompt engineering Claude tutorial completo português XML chain of thought",
        links: [
          { label: "Ver no GitHub", url: "https://github.com/anthropics/prompt-eng-interactive-tutorial" },
          { label: "Versão em courses/", url: "https://github.com/anthropics/courses/tree/master/prompt_engineering_interactive_tutorial" },
          { label: "Docs · Prompt Engineering", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview" }
        ]
      },
      {
        n: 6,
        title: "Real World Prompting",
        kind: "github",
        kindLabel: "GitHub · ~3h · Pré-req: 5",
        desc: "5 lições com prompts reais de produção: médico, suporte ao cliente, sumarização de chamadas. Exemplos de como prompts são usados em empresas reais.",
        study: "3h de tutorial + 1h adaptando os exemplos para o seu contexto. Total: ~4h.",
        videoQuery: "prompts produção Claude casos reais empresa português",
        links: [
          { label: "Ver no GitHub", url: "https://github.com/anthropics/courses/tree/master/real_world_prompting" }
        ]
      },
      {
        n: 7,
        title: "Prompt Evaluations",
        kind: "github",
        kindLabel: "GitHub · ~2h · Jupyter",
        desc: "Como escrever evals de produção para medir a qualidade dos seus prompts de forma sistemática. Essencial para quem vai lançar produtos com Claude. Mede consistência, acurácia e performance.",
        study: "2h de tutorial + 1h escrevendo evals para um projeto próprio. Total: ~3h.",
        videoQuery: "evals LLM avaliação prompts português qualidade produção",
        links: [
          { label: "Ver no GitHub", url: "https://github.com/anthropics/courses/tree/master/prompt_evaluations" }
        ]
      }
    ]
  },

  // ============== FASE 3 ==============
  {
    id: "p3",
    tag: "Fase 3",
    title: "API & Desenvolvimento",
    weeks: "Semanas 6–9",
    hours: "~22h",
    desc: "O maior investimento de tempo do roteiro. O curso da API tem 84 lições. Reserve blocos de 2h por sessão. Rode todos os exemplos localmente.",
    items: [
      {
        n: 8,
        title: "Tool Use (Function Calling)",
        kind: "github",
        kindLabel: "GitHub · ~3h · Jupyter",
        desc: "Tudo que você precisa para implementar tool use com Claude: definir ferramentas, interpretar resultados, tratar erros, encadear múltiplas chamadas. Pré-requisito para MCP e agentes.",
        study: "3h de tutorial + 2h construindo uma ferramenta própria (ex: consulta a API externa). Total: ~5h.",
        videoQuery: "function calling Claude tool use tutorial português",
        links: [
          { label: "Ver no GitHub", url: "https://github.com/anthropics/courses/tree/master/tool_use" },
          { label: "Docs · Tool use", url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview" }
        ]
      },
      {
        n: 9,
        title: "Building with the Claude API",
        kind: "academy",
        kindLabel: "Academy · +8h vídeo · 84 lições",
        desc: "O maior curso da Academy: 84 lições e mais de 8h de vídeo. Cobre todo o espectro: modelos, tool use, visão, RAG, prompt caching, Extended Thinking, MCP e padrões de agentes e workflows.",
        study: "8h+ de vídeo + 4h de prática reproduzindo os exemplos. Recomendado: 2h por dia, 6 dias. Total: ~14h.",
        videoQuery: "Claude API completo RAG tool use prompt caching português",
        links: [
          { label: "Acessar curso", url: "https://anthropic.skilljar.com/claude-with-the-anthropic-api" },
          { label: "Anthropic Cookbook", url: "https://github.com/anthropics/anthropic-cookbook" }
        ]
      },
      {
        n: 10,
        title: "Anthropic Cookbook (referência)",
        kind: "github",
        kindLabel: "GitHub Oficial · referência",
        desc: "Repositório oficial com notebooks Jupyter prontos para rodar: tool use, visão computacional, RAG, prompt caching, multiagentes e muito mais. Use como referência paralela durante toda a fase 3.",
        study: "Consulte durante os outros cursos. Dedique 2h explorando todos os notebooks disponíveis. Total: ~2h.",
        videoQuery: "Anthropic cookbook RAG agentes notebooks Claude português",
        links: [
          { label: "Ver no GitHub", url: "https://github.com/anthropics/anthropic-cookbook" }
        ]
      },
      {
        n: 11,
        title: "Prompt Engineering Docs (referência)",
        kind: "docs",
        kindLabel: "Docs · referência",
        desc: "Documentação oficial de prompt engineering: visão geral, técnicas avançadas, gerador automático de prompts, boas práticas. Mantenha aberta como referência constante.",
        study: "Leia uma vez do início ao fim (1h) e retorne sempre que precisar. Total: ~1h.",
        videoQuery: "técnicas avançadas prompt engineering Claude português",
        links: [
          { label: "Acessar docs (PT-BR)", url: "https://docs.claude.com/pt/docs/build-with-claude/prompt-engineering/overview" },
          { label: "Prompt Generator", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-generator" }
        ]
      }
    ]
  },

  // ============== FASE 4 ==============
  {
    id: "p4",
    tag: "Fase 4",
    title: "Claude Code & Agentes",
    weeks: "Semanas 10–11",
    hours: "~17h",
    desc: "Claude Code 101 exige plano Pro/Max ou API key para os exercícios práticos. Os outros cursos desta fase podem ser feitos sem custos extras além da API.",
    items: [
      {
        n: 12,
        title: "Claude Code 101",
        kind: "academy",
        kindLabel: "Academy · ~1h · Pro/API",
        desc: "Para quem nunca usou agente de código com IA. Cobre instalação em terminal/VS Code/JetBrains, approval mode, Plan Mode, CLAUDE.md, subagentes, skills, MCP e hooks. Fluxo: Explore → Plan → Code → Commit.",
        study: "1h aula + 2h aplicando o fluxo em um projeto real seu. Total: ~3h.",
        videoQuery: "Claude Code tutorial completo terminal VS Code português",
        links: [
          { label: "Acessar curso", url: "https://anthropic.skilljar.com/claude-code-101" },
          { label: "Docs · Claude Code", url: "https://docs.anthropic.com/en/docs/claude-code/overview" }
        ]
      },
      {
        n: 13,
        title: "Claude Code in Action",
        kind: "academy",
        kindLabel: "Academy · ~3h · 21 lições · Cert.",
        desc: "Aprofunda Claude Code: arquitetura como coding assistant, tool use, gerenciamento de contexto, visual inputs, comandos customizados, servidores MCP, GitHub workflows, hooks e Claude Code SDK.",
        study: "3h aula + 3h integrando Claude Code num projeto real com GitHub. Total: ~6h.",
        videoQuery: "Claude Code avançado MCP hooks SDK português",
        links: [
          { label: "Acessar curso", url: "https://anthropic.skilljar.com/claude-code-in-action" }
        ]
      },
      {
        n: 14,
        title: "Introduction to Claude Cowork",
        kind: "academy",
        kindLabel: "Academy · ~1h · Certificado",
        desc: "Agente desktop agentic para não-devs: tarefa loop do Cowork, plugins, skills, fluxos de arquivos e pesquisa, como dirigir trabalho multi-etapas com responsabilidade. Produtivo na primeira semana.",
        study: "1h aula + 1h explorando o Cowork com tarefas reais. Total: ~2h.",
        videoQuery: "Claude Cowork agente desktop tutorial português",
        links: [
          { label: "Acessar curso", url: "https://anthropic.skilljar.com/introduction-to-claude-cowork" }
        ]
      },
      {
        n: 15,
        title: "Introduction to Subagents",
        kind: "academy",
        kindLabel: "Academy · ~1h · Certificado",
        desc: "Como delegar tarefas a sub-agentes isolados para gerenciar contexto e reduzir ruído na sessão principal. Construção de workflows especializados que mantêm a conversa principal limpa e focada.",
        study: "1h aula + 1h desenhando um workflow multi-agente para um problema real. Total: ~2h.",
        videoQuery: "Claude subagents subagentes multi-agente workflow português",
        links: [
          { label: "Acessar curso", url: "https://anthropic.skilljar.com/introduction-to-subagents" }
        ]
      },
      {
        n: 16,
        title: "Introduction to Agent Skills",
        kind: "academy",
        kindLabel: "Academy · ~2h · Certificado",
        desc: "Como criar, configurar e compartilhar Skills no Claude Code: instruções markdown reutilizáveis que Claude aplica automaticamente. Da criação da primeira skill à distribuição para equipes.",
        study: "2h aula + 2h criando suas próprias skills para as tarefas do seu fluxo diário. Total: ~4h.",
        videoQuery: "Claude Skills agent skills criar tutorial português",
        links: [
          { label: "Acessar curso", url: "https://anthropic.skilljar.com/introduction-to-agent-skills" }
        ]
      }
    ]
  },

  // ============== FASE 5 ==============
  {
    id: "p5",
    tag: "Fase 5",
    title: "Model Context Protocol (MCP)",
    weeks: "Semanas 12–13",
    hours: "~10h",
    desc: "Os cursos de MCP requerem Python e entendimento de JSON/HTTP. São a fronteira mais avançada do ecossistema Claude. Considerada a skill mais rara e valiosa do mercado.",
    items: [
      {
        n: 17,
        title: "Introduction to Model Context Protocol",
        kind: "academy",
        kindLabel: "Academy · ~2h · Python · Cert.",
        desc: "Constrói servidores e clientes MCP do zero em Python. As 3 primitivas do protocolo: tools, resources e prompts. Como conectar Claude a serviços externos de forma padronizada.",
        study: "2h aula + 2h construindo um servidor MCP simples conectado a uma API real. Total: ~4h.",
        videoQuery: "MCP Model Context Protocol Claude tutorial Python português",
        links: [
          { label: "Acessar curso", url: "https://anthropic.skilljar.com/introduction-to-model-context-protocol" },
          { label: "Docs MCP", url: "https://modelcontextprotocol.io/" },
          { label: "MCP no GitHub", url: "https://github.com/modelcontextprotocol" }
        ]
      },
      {
        n: 18,
        title: "MCP: Advanced Topics",
        kind: "academy",
        kindLabel: "Academy · ~3h · Pré-req: 17",
        desc: "Padrões avançados de MCP para produção: sampling, notifications, acesso ao sistema de arquivos, mecanismos de transporte. Para quem quer construir servidores MCP de produção robustos.",
        study: "3h aula + 3h implementando um servidor MCP avançado para o seu contexto. Total: ~6h.",
        videoQuery: "MCP avançado servidor produção sampling notifications português",
        links: [
          { label: "Acessar curso", url: "https://anthropic.skilljar.com/mcp-advanced-topics" }
        ]
      }
    ]
  },

  // ============== FASE 6 ==============
  {
    id: "p6",
    tag: "Fase 6",
    title: "Cloud, Enterprise & Certificação",
    weeks: "Semana 14",
    hours: "~9h",
    desc: "Os cursos de cloud têm ~16 lições cada e se sobrepõem em ~7 lições. Faça apenas o que se aplica à sua infraestrutura. O Coursera é pago mas oferece certificado com peso diferente.",
    items: [
      {
        n: 19,
        title: "Claude with Amazon Bedrock",
        kind: "academy",
        kindLabel: "Academy · ~2h · 16 lições · AWS",
        desc: "Integração nativa AWS: chamadas de API, tool use e pipelines de retrieval no Bedrock. Criado originalmente como treinamento interno da AWS, agora público.",
        study: "2h aula + 1h configurando no console AWS. Total: ~3h.",
        videoQuery: "Claude Amazon Bedrock AWS tutorial português",
        links: [
          { label: "Acessar curso", url: "https://anthropic.skilljar.com/claude-with-amazon-bedrock" },
          { label: "AWS Bedrock", url: "https://aws.amazon.com/bedrock/claude/" }
        ]
      },
      {
        n: 20,
        title: "Claude with Google Cloud Vertex AI",
        kind: "academy",
        kindLabel: "Academy · ~2h · 16 lições · GCP",
        desc: "Deploy no GCP: streaming, tool use e funcionalidades avançadas via Vertex AI. Para times no ecossistema Google Cloud.",
        study: "2h aula + 1h no console GCP. Total: ~3h.",
        videoQuery: "Claude Vertex AI Google Cloud GCP tutorial português",
        links: [
          { label: "Acessar curso", url: "https://anthropic.skilljar.com/claude-with-google-cloud-vertex-ai" },
          { label: "Vertex AI · Claude", url: "https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/use-claude" }
        ]
      },
      {
        n: 21,
        title: "Vibe Coding with Claude Code (Coursera)",
        kind: "ext",
        kindLabel: "Coursera / Scrimba · pago",
        desc: "Curso externo no Coursera: hooks, slash commands, agentes, construção de um app de calendário real, integração MCP. Certificado Coursera.",
        study: "1h curso + 2h construindo o projeto do curso. Total: ~3h.",
        videoQuery: "vibe coding Claude Code projeto real português",
        links: [
          { label: "Ver no Coursera", url: "https://www.coursera.org/learn/vibe-coding-with-claude-code" }
        ]
      },
      {
        n: 22,
        title: "Claude Certified Architect — Foundations",
        kind: "exam",
        kindLabel: "Exame oficial · Anthropic",
        desc: "Primeira certificação profissional da Anthropic para engenheiros que projetam soluções de produção com Claude. Os cursos da Academy são a preparação oficial.",
        study: "Revisão de todos os cursos das fases 3–5 + prática em projetos reais. Total: ~10h revisão.",
        videoQuery: "certificação Anthropic Claude arquiteto preparação português",
        links: [
          { label: "Preparar via Academy", url: "https://anthropic.skilljar.com/" },
          { label: "Programa de Parceiros", url: "https://www.anthropic.com/partners" }
        ]
      }
    ]
  }
];

/* Horas estimadas por item, na mesma ordem dos itens (n=1..22).
   Soma = 7 + 16 + 22 + 17 + 10 + 9 = ~81h totais (estudo + prática).
   Para o medidor "de ~55h" usamos o tempo "core" (somente aulas/leitura),
   já que prática é altamente individual. */
const HOURS_BY_N = {
  1: 1,  2: 3,  3: 3,
  4: 3,  5: 6,  6: 4, 7: 3,
  8: 5,  9: 14, 10: 2, 11: 1,
  12: 3, 13: 6, 14: 2, 15: 2, 16: 4,
  17: 4, 18: 6,
  19: 3, 20: 3, 21: 3, 22: 10
};

const TIMELINE = [
  { weeks: "Sem 1–2",   title: "Fundamentos",          hours: "~7h estudo"  },
  { weeks: "Sem 3–5",   title: "Prompt Engineering",   hours: "~16h estudo" },
  { weeks: "Sem 6–9",   title: "API & Dev",            hours: "~22h estudo" },
  { weeks: "Sem 10–11", title: "Code & Agentes",       hours: "~17h estudo" },
  { weeks: "Sem 12–13", title: "MCP",                  hours: "~10h estudo" },
  { weeks: "Sem 14",    title: "Cloud & Certificação", hours: "~9h estudo"  }
];

/* Cards do portfólio. Cada card representa uma área de domínio.
   Os "requires" referenciam o número (n) dos itens do roteiro.
   Quando todos os itens em "requires" estão concluídos, o card é "completo".
   O card só é renderizado se ao menos UM dos seus requires estiver concluído.
   Toda a seção do portfólio só é desbloqueada após o item 1 (curso 1) concluído. */
const PORTFOLIO_CARDS = [
  {
    id: "fundamentals",
    color: "blue",
    icon: "✦",
    title: "Fundamentos de IA",
    sub: "Como Claude pensa, o que ele pode e não pode fazer.",
    requires: [1, 2, 3]
  },
  {
    id: "prompting",
    color: "purple",
    icon: "✎",
    title: "Prompt Engineering",
    sub: "Da estrutura básica até evals de produção.",
    requires: [4, 5, 6, 7]
  },
  {
    id: "api",
    color: "cyan",
    icon: "</>",
    title: "Desenvolvimento com a API",
    sub: "Tool use, RAG, visão, prompt caching, Extended Thinking.",
    requires: [8, 9, 10, 11]
  },
  {
    id: "agents",
    color: "orange",
    icon: "◇",
    title: "Claude Code & Agentes",
    sub: "Subagentes, skills, hooks, Cowork, workflows.",
    requires: [12, 13, 14, 15, 16]
  },
  {
    id: "mcp",
    color: "pink",
    icon: "⌘",
    title: "Model Context Protocol",
    sub: "Servidores e clientes MCP em produção.",
    requires: [17, 18]
  },
  {
    id: "cloud",
    color: "green",
    icon: "☁",
    title: "Cloud & Enterprise",
    sub: "Bedrock, Vertex AI e certificação de arquiteto.",
    requires: [19, 20, 21, 22]
  }
];

/* Total de horas "core" para a barra de % do hero (~55h totais do roteiro). */
const TOTAL_CORE_HOURS = 55;
