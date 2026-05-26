# Anthropic Journey

Site estático que organiza sua evolução do zero ao avançado no ecossistema Anthropic, com tracker de progresso, badges por fase, vídeos em português e modo audiolivro completo de cada curso. Visual editorial inspirado em sites premiados, com a paleta oficial da Anthropic.

Este README é um passo a passo **completo, botão a botão**, para você publicar este site no seu GitHub e deixar online via GitHub Pages, com atualizações automáticas a cada alteração.

---

## Sumário

1. [Pré-requisitos](#1-pré-requisitos)
2. [Testar localmente antes de publicar](#2-testar-localmente-antes-de-publicar)
3. [Criar conta no GitHub (se ainda não tem)](#3-criar-conta-no-github-se-ainda-não-tem)
4. [Instalar o Git no Windows](#4-instalar-o-git-no-windows)
5. [Criar o repositório no GitHub](#5-criar-o-repositório-no-github)
6. [Enviar os arquivos para o GitHub](#6-enviar-os-arquivos-para-o-github)
7. [Ativar o GitHub Pages](#7-ativar-o-github-pages)
8. [Acompanhar o deploy](#8-acompanhar-o-deploy)
9. [Atualizações automáticas a cada alteração](#9-atualizações-automáticas-a-cada-alteração)
10. [Solução de problemas comuns](#10-solução-de-problemas-comuns)
11. [Estrutura do projeto](#11-estrutura-do-projeto)

---

## 1. Pré-requisitos

Antes de começar, você precisa:

- Um computador com Windows, Mac ou Linux
- Conexão com internet
- Um navegador atualizado (Chrome, Edge ou Firefox)
- Cerca de 20 minutos de tempo

Você **não precisa** saber programar. Vamos passo a passo.

---

## 2. Testar localmente antes de publicar

Antes de subir para o GitHub, vamos confirmar que o site funciona na sua máquina.

### Opção A — Abrir direto no navegador

1. Abra o Explorador de Arquivos
2. Navegue até a pasta do projeto: `C:\Users\Jonas\OneDrive\Documentos\Apredizado Anthropic`
3. Clique duas vezes no arquivo `index.html`
4. O site abre no seu navegador padrão

Funciona, mas o leitor de áudio e a busca de vídeos podem não funcionar perfeitamente sem servidor.

### Opção B — Servidor local (recomendado)

1. Verifique se o Node.js está instalado: abra o **Prompt de Comando** (digite `cmd` no menu Iniciar) e digite:

   ```
   node --version
   ```

2. Se aparecer um número de versão (ex: `v24.15.0`), está instalado. Pule para o passo 4.

3. Se aparecer erro, instale o Node.js:
   - Acesse https://nodejs.org
   - Baixe a versão **LTS**
   - Execute o instalador, clique em **Next** em todas as telas
   - Reinicie o Prompt de Comando após a instalação

4. No Prompt de Comando, navegue até a pasta do projeto:

   ```
   cd "C:\Users\Jonas\OneDrive\Documentos\Apredizado Anthropic"
   ```

5. Inicie o servidor:

   ```
   node server.js
   ```

6. Você verá: `✦ Anthropic Journey rodando em http://localhost:8080`

7. Abra o navegador em http://localhost:8080

8. Para parar o servidor, volte ao Prompt e pressione `Ctrl+C`

---

## 3. Criar conta no GitHub (se ainda não tem)

1. Acesse https://github.com
2. Clique em **Sign up** (canto superior direito)
3. Digite seu e-mail e clique em **Continue**
4. Crie uma senha forte e clique em **Continue**
5. Escolha um nome de usuário (vai aparecer na URL do site, escolha algo simples). Clique em **Continue**
6. Resolva o captcha
7. Confirme o código que chega no seu e-mail
8. Pule as etapas de personalização (clique em **Skip personalization** ou **Continue for free**)

Pronto, você tem conta no GitHub.

---

## 4. Instalar o Git no Windows

O Git é a ferramenta que envia seus arquivos para o GitHub.

1. Acesse https://git-scm.com/download/win
2. O download começa automaticamente. Se não, clique em **64-bit Git for Windows Setup**
3. Execute o instalador baixado
4. Em todas as telas do instalador, clique em **Next** mantendo as opções padrão. Não precisa mudar nada
5. Na última tela, clique em **Install** e depois em **Finish**
6. Para confirmar, abra o **Prompt de Comando** e digite:

   ```
   git --version
   ```

7. Deve aparecer algo como `git version 2.40.0` ou similar

### Configurar Git pela primeira vez

No Prompt de Comando, rode estes dois comandos, substituindo pelos seus dados:

```
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

Use o mesmo e-mail que você usou na conta do GitHub.

---

## 5. Criar o repositório no GitHub

1. Acesse https://github.com e faça login se ainda não está logado
2. No canto superior direito, clique no **+** (sinal de mais)
3. No menu que aparece, clique em **New repository**
4. Preencha os campos:
   - **Repository name**: `anthropic-journey` (ou outro nome de sua preferência, sem espaços, só letras e hífens)
   - **Description**: pode deixar vazio ou escrever algo curto
   - Marque **Public** (precisa ser público para o GitHub Pages funcionar de graça)
   - **Não marque** "Add a README file"
   - **Não marque** "Add .gitignore"
   - **Não marque** "Choose a license"
5. Clique no botão verde **Create repository**

Você cai em uma página com instruções. Mantenha essa aba aberta — vamos usar.

**Anote a URL do repositório**, está no topo da página, algo como:
```
https://github.com/SEU-USUARIO/anthropic-journey
```

---

## 6. Enviar os arquivos para o GitHub

Agora vamos enviar os arquivos do site para o repositório que você criou.

1. Abra o **Prompt de Comando**

2. Navegue até a pasta do projeto:

   ```
   cd "C:\Users\Jonas\OneDrive\Documentos\Apredizado Anthropic"
   ```

3. Inicialize o repositório local:

   ```
   git init
   ```

4. Adicione todos os arquivos:

   ```
   git add .
   ```

5. Crie o primeiro commit (um "ponto de salvamento"):

   ```
   git commit -m "primeira versao do site"
   ```

6. Renomeie a branch principal para `main`:

   ```
   git branch -M main
   ```

7. Conecte com o repositório do GitHub. **Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub**:

   ```
   git remote add origin https://github.com/SEU-USUARIO/anthropic-journey.git
   ```

8. Envie tudo para o GitHub:

   ```
   git push -u origin main
   ```

9. Pode aparecer uma janela pedindo login. Use seu usuário e senha do GitHub. Se pedir token em vez de senha, siga a [seção de problemas](#token-em-vez-de-senha).

10. Quando terminar, atualize a página do repositório no navegador. Você deve ver todos os arquivos lá.

---

## 7. Ativar o GitHub Pages

Agora vamos colocar o site online.

1. Na página do seu repositório no GitHub, clique em **Settings** (ícone de engrenagem, na barra superior do repositório, não confundir com o Settings do seu perfil)

2. Na barra lateral esquerda, clique em **Pages**

3. Em **Build and deployment**, na seção **Source**, abra o menu suspenso e selecione **GitHub Actions**

4. Pronto. Não precisa configurar mais nada. O arquivo `.github/workflows/deploy.yml` que veio no projeto cuida do resto.

5. **Aguarde de 1 a 3 minutos** enquanto o GitHub processa

---

## 8. Acompanhar o deploy

Para ver se o site já está online:

1. Na página do repositório, clique na aba **Actions** (na barra superior do repositório)

2. Você verá uma lista de execuções. A mais recente, no topo, é o seu deploy

3. Clique nela para ver os detalhes

4. Aguarde os dois passos (`build` e `deploy`) ficarem com bolinha verde ✓

5. Quando concluir, volte em **Settings → Pages**

6. No topo da página aparece um aviso verde com o link do seu site, algo como:
   ```
   Your site is live at https://SEU-USUARIO.github.io/anthropic-journey/
   ```

7. Clique em **Visit site** ou abra essa URL no navegador

**Pronto, seu site está no ar.** Compartilhe a URL com quem quiser.

---

## 9. Atualizações automáticas a cada alteração

Sempre que você quiser mudar algo no site (texto, layout, novo curso), o fluxo é simples.

1. Edite os arquivos no seu computador

2. Teste localmente com `node server.js` em http://localhost:8080

3. Quando estiver satisfeito, abra o Prompt de Comando na pasta do projeto e rode:

   ```
   git add .
   git commit -m "descricao curta da alteracao"
   git push
   ```

4. **Em 1 a 3 minutos**, o site online é atualizado automaticamente

Não precisa mexer no GitHub Pages de novo. O workflow já está configurado.

### Exemplo de mensagens de commit

- `git commit -m "ajuste no titulo do hero"`
- `git commit -m "adiciona novo curso na fase 5"`
- `git commit -m "corrige link quebrado no curso 7"`

---

## 10. Solução de problemas comuns

### Token em vez de senha

Se ao rodar `git push` aparecer erro pedindo token em vez de senha:

1. Acesse https://github.com/settings/tokens
2. Clique em **Generate new token** → **Generate new token (classic)**
3. Em **Note**, escreva `meu-pc`
4. Em **Expiration**, escolha **No expiration** (ou um prazo longo)
5. Marque **repo** (todas as sub-opções) e **workflow**
6. Clique em **Generate token** no final da página
7. **Copie o token gerado imediatamente** (ele só aparece uma vez)
8. Quando o git pedir senha, cole o token no lugar
9. O Windows vai memorizar e não pedir mais

### O site no ar mostra página 404

- Aguarde 5 minutos. O GitHub Pages às vezes demora a propagar.
- Confirme em **Settings → Pages** que a Source está em **GitHub Actions**.
- Confirme em **Actions** que o último deploy ficou verde.
- Tente abrir em janela anônima do navegador (Ctrl+Shift+N).

### O site abre mas sem estilo

Confirme que os arquivos `styles.css`, `script.js`, `data.js` e `audiobook.js` estão no GitHub. Vá no repositório e veja se aparecem todos. Se faltar algum, rode `git add .` e `git push` de novo.

### O leitor de áudio diz "Nenhuma voz em português detectada"

Isso é do navegador, não do site. Soluções:

- **Windows**: vá em Configurações → Hora e idioma → Idioma → adicione **Português (Brasil)**. Reinicie o navegador.
- **Chrome/Edge**: o sistema operacional precisa ter a voz instalada para o navegador usar.
- Em Mac e iOS as vozes vêm pré-instaladas.

### Vídeos não carregam automaticamente

A busca automática usa serviços comunitários que às vezes ficam fora do ar. Você pode:

- Clicar em **↻** ao lado do bloco de vídeo para tentar de novo
- Clicar em **Buscar no YouTube**, escolher um vídeo, e colar a URL no campo de fixar manual

### Erro "Permission denied" no `git push`

Você está logado em outra conta no Git. Rode:

```
git config --global credential.helper manager
git push
```

Vai abrir uma janela para fazer login com a conta certa.

### Não consigo encontrar a pasta do projeto

A pasta padrão é `C:\Users\Jonas\OneDrive\Documentos\Apredizado Anthropic`. No seu computador pode ser diferente — substitua `Jonas` pelo seu usuário do Windows. Se ainda não achar, abra o Explorador de Arquivos e busque por `Apredizado Anthropic`.

---

## 11. Estrutura do projeto

```
anthropic-journey/
├── index.html              Estrutura visível do site
├── styles.css              Visual completo (paleta Anthropic, tipografia, layout)
├── data.js                 Roteiro: 6 fases, 22 recursos, links oficiais
├── audiobook.js            Conteúdo de áudio em português, integral, dos 22 cursos
├── script.js               Lógica: estado, render, persistência, vídeos, áudio
├── server.js               Servidor local Node.js para teste (não vai ao ar)
├── README.md               Este arquivo
├── .gitignore              Lista de arquivos ignorados pelo Git
└── .github/
    └── workflows/
        └── deploy.yml      Configuração do deploy automático no GitHub Pages
```

### O que cada arquivo faz

- **index.html** — a página em si. Não toca a menos que precise mudar a estrutura
- **styles.css** — todo o visual. Cores, tipografia, animações, layout responsivo
- **data.js** — os 22 cursos do roteiro com links, descrições e durações. **É aqui que você edita o conteúdo do tracker**
- **audiobook.js** — o texto que o leitor de áudio narra para cada curso. **Edite aqui se quiser adicionar ou expandir o conteúdo de áudio**
- **script.js** — todo o comportamento (cliques, salvar progresso, busca de vídeo, leitor)
- **server.js** — só serve para testar localmente, não vai para o GitHub Pages
- **deploy.yml** — diz ao GitHub para publicar o site automaticamente a cada push

---

## Recursos e atalhos do site

- **Tracker**: clique no círculo ao lado de cada curso para alternar entre A fazer → Em andamento → Concluído
- **Filtros**: no topo do tracker, filtre por status
- **Badges**: cada fase concluída ganha um badge dourado com a data
- **Portfólio**: bloqueado até concluir o primeiro curso. Depois cresce automaticamente
- **GitHub no portfólio**: cole seu usuário do GitHub e seus repos públicos viram parte do portfólio
- **Vídeos**: cada curso tem um bloco que busca aulas em português automaticamente. Pode trocar (↻) ou colar uma URL específica
- **Estudar ouvindo**: botão coral em cada curso, abre o audiolivro com player completo
- **Tema**: ◐ no topo alterna entre claro e escuro
- **Exportar/Importar**: ↓ baixa seu progresso em JSON, ↑ restaura
- **Reset**: ↻ apaga tudo (com confirmação)

Pronto. Qualquer dúvida na hospedagem, volte na [seção de problemas](#10-solução-de-problemas-comuns).
