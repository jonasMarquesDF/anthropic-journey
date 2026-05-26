# Hospedar no domínio HostGator (com login e admin)

Guia passo a passo para colocar o site com sistema de autenticação no `novitaads.com.br/anthropic`.

> **Importante**: você compartilhou senhas em mensagem. **Troque a senha do WordPress agora** no cPanel. Esta nova instalação tem login próprio, separado do WordPress.

---

## 1. Verifique pré-requisitos no cPanel da HostGator

1. Acesse o cPanel da sua hospedagem (geralmente `https://novitaads.com.br:2083` ou via painel da HostGator)
2. Procure por **Selecionar versão do PHP**
3. Confirme que está em PHP 7.4 ou superior (ideal 8.x)
4. Em extensões PHP, confirme que **pdo_sqlite** está habilitado. Se não aparecer marcado, marque e clique em **Salvar**

Quase todos os planos da HostGator já vêm com SQLite habilitado.

---

## 2. Onde colocar os arquivos

Você quer o site em `novitaads.com.br/anthropic`. No cPanel:

1. Abra **Gerenciador de Arquivos**
2. Entre em `public_html`
3. Crie uma pasta nova chamada **anthropic**
4. Entre dentro dela

Esse é o destino dos arquivos.

---

## 3. Subir os arquivos

Você tem duas opções: upload manual no cPanel, ou via FTP/SFTP.

### Opção A — Upload manual (mais simples)

1. No seu computador, selecione todos os arquivos desta pasta exceto:
   - `.git/` (pasta oculta)
   - `_db/` (se existir, é banco local de teste)
   - `server.js` (não precisa em produção)
   - `Anthropic-Journey-...jpg` (screenshot local)
   - `node_modules/` (se existir)
2. Clique direito → Enviar para → Pasta compactada (.zip)
3. No Gerenciador de Arquivos do cPanel, dentro de `public_html/anthropic`, clique em **Carregar**
4. Envie o ZIP
5. Volte ao Gerenciador, clique direito no ZIP → **Extract**
6. Confirme. Apague o ZIP depois

### Opção B — Via FTP

1. Use FileZilla ou similar
2. Conecte com os dados FTP da sua HostGator (cPanel → Contas FTP)
3. Vá em `public_html/anthropic`
4. Arraste os arquivos do projeto

---

## 4. Conferir permissões

No Gerenciador de Arquivos:

1. Os arquivos **.php** e **.html** devem estar em **644**
2. As pastas devem estar em **755**
3. **NÃO precisa criar a pasta `_db/` manualmente** — o `api.php` cria sozinho na primeira chamada com permissão 700, dentro do diretório do site

Para conferir/ajustar: clique direito no arquivo → **Permissões**.

---

## 5. Primeiro acesso e cadastro do admin

1. Abra `https://novitaads.com.br/anthropic/login.html` no navegador
2. Clique em **Criar conta**
3. Use exatamente este e-mail: `jonas@novitaads.com.br`
4. Crie um nome e uma senha forte (no mínimo 8 caracteres). **Use uma senha NOVA, diferente da do WordPress**
5. Clique em **Criar conta →**
6. Como o e-mail está na lista de admins, você é aprovado automaticamente e já fica logado

Pronto. Você é o administrador.

---

## 6. Painel administrativo

1. Estando logado, no canto superior direito do site clique no ícone **⚙ (engrenagem)**, ou abra `https://novitaads.com.br/anthropic/admin.html`
2. Você verá:
   - Estatísticas (aguardando, aprovados, negados, total)
   - Tabela de todos os usuários, com nome, e-mail, status, função, data de cadastro, último acesso e progresso
   - Histórico de acessos (últimas 200 ações)

### O que cada botão faz

- **Aprovar**: libera acesso para um usuário pendente
- **Negar / Bloquear**: bloqueia o usuário (não pode mais entrar). Pode ser desfeito clicando em **Reativar**
- **Progresso**: abre um modal mostrando exatamente quais cursos o usuário marcou como em andamento e concluídos
- **Tornar admin / Remover admin**: muda função do usuário
- **Excluir**: apaga definitivamente a conta e todo o progresso

### Onde ver quem entrou

Na seção **Histórico de acessos** aparece tudo: cada login bem-sucedido, cada tentativa falha, cada aprovação, cada exclusão. Com IP e navegador.

---

## 7. Como novos usuários se cadastram

1. Você divulga `https://novitaads.com.br/anthropic` ou `https://novitaads.com.br/anthropic/login.html`
2. A pessoa clica em **Criar conta**, preenche nome, e-mail e senha
3. Aparece a mensagem "Sua conta está aguardando aprovação do administrador"
4. **Você** vê o cadastro pendente na sua tabela de admin
5. Clica em **Aprovar**
6. A pessoa pode então entrar e usar o site
7. O progresso dela fica salvo no servidor automaticamente

---

## 8. Atualizar o site no futuro

Quando você fizer mudanças nos arquivos (texto, novo curso, etc.):

### Via Gerenciador de Arquivos do cPanel

1. Faça as mudanças no seu computador
2. Compacte os arquivos alterados em ZIP
3. Suba e extraia em `public_html/anthropic`, sobrescrevendo os existentes

### Via FTP

1. Arraste os arquivos novos por cima dos antigos no FileZilla
2. Confirme sobrescrita

**Nunca apague a pasta `_db/`**: ela tem o banco com todos os usuários e progressos. Se quiser resetar tudo, apague só ela.

---

## 9. Backup do banco de usuários

A pasta `_db/users.sqlite` é o seu banco. Para fazer backup:

1. No Gerenciador de Arquivos, entre em `public_html/anthropic/_db`
2. Clique direito em `users.sqlite` → **Baixar**
3. Guarde em local seguro

Recomendo fazer isso ao menos uma vez por mês, ou antes de mudanças grandes.

---

## 10. Solução de problemas

### "erro 500 internal server" ao tentar acessar

- Verifique a versão do PHP em **Selecionar versão do PHP** (precisa ser 7.4+)
- Confirme que **pdo_sqlite** está habilitado nas extensões
- Veja o log de erro em **Erros** no cPanel

### Página em branco no `login.html`

- Confirme que o `auth.js` foi enviado junto
- Limpe cache do navegador (Ctrl+F5)

### "sem conexão com o servidor" ao tentar logar

- O `api.php` não está acessível. Confirme que está em `public_html/anthropic/api.php`
- Tente abrir `https://novitaads.com.br/anthropic/api.php?action=health` direto no navegador. Deve responder JSON com `ok: true`

### Esqueci a senha de admin

Como ainda não há recuperação automática por e-mail, abra o cPanel → **Gerenciador de Arquivos** → `public_html/anthropic/_db/users.sqlite`. Baixe o arquivo, abra com [DB Browser for SQLite](https://sqlitebrowser.org), apague a linha do usuário admin e suba o arquivo de volta. Depois cadastre novamente com o mesmo e-mail.

### Não consigo executar SQL pelo cPanel

SQLite não usa MySQL. Não use **phpMyAdmin** com este sistema. Para administrar, use o painel admin do próprio site, ou DB Browser for SQLite no seu computador.

---

## 11. Como funciona em paralelo no GitHub Pages

O mesmo código funciona em dois lugares:

- **HostGator** (`novitaads.com.br/anthropic`): com login, admin, banco de usuários
- **GitHub Pages** (`jonasmarquesdf.github.io/anthropic-journey`): sem PHP, então o site detecta e funciona em modo local. Cada visitante tem progresso salvo apenas no próprio navegador, sem cadastro

Os dois ambientes são independentes. Mantenha a HostGator como sua versão pessoal com login, e o GitHub Pages como vitrine pública.

---

## 12. Segurança — atenção

- A senha do WordPress que você compartilhou está comprometida. Troque hoje no cPanel
- O sistema novo usa hashing bcrypt para senhas, então senhas no banco não ficam em texto puro
- O `.htaccess` impede acesso direto ao banco SQLite
- Sessões duram 30 dias por padrão (configurável em `api.php`)
- Recomendado ativar **HTTPS** para o domínio se ainda não estiver. No cPanel, **SSL/TLS** → Let's Encrypt grátis

Pronto. Qualquer dúvida, volte na seção 10.

---

## 13. Notificações por e-mail e WhatsApp (cadastros novos)

Toda vez que alguém se cadastrar e ficar pendente, você recebe automaticamente:

- **E-mail** em `jonas@novitaads.com.br` (já vem ativado)
- **WhatsApp** em `+55 61 99959-2673` (precisa de setup único de 2 minutos)

E quando você aprovar um usuário no painel, ele recebe um **e-mail confirmando** que o acesso foi liberado.

### Ativar o WhatsApp (CallMeBot)

CallMeBot é um serviço gratuito que envia mensagens para você no WhatsApp. Setup único:

1. **Adicione o contato** `+34 644 25 21 73` na sua agenda do celular como `CallMeBot`
2. Abra o WhatsApp no celular do número `+55 61 99959-2673`
3. Mande para o CallMeBot a mensagem exata:
   ```
   I allow callmebot to send me messages
   ```
4. **Aguarde** uma resposta automática. Em segundos chega algo como:
   ```
   API Activated for your phone number.
   Your APIKEY is 1234567
   ```
5. **Copie esse APIKEY** (só números)

Agora ative no servidor:

6. No cPanel da HostGator, abra o **Gerenciador de Arquivos**
7. Vá em `public_html/anthropic/` (ou onde instalou)
8. Clique direito em `api.php` → **Edit** ou **Editar**
9. Procure pela linha:
   ```php
   const CALLMEBOT_APIKEY  = '';
   ```
10. Cole sua APIKEY entre as aspas:
    ```php
    const CALLMEBOT_APIKEY  = '1234567';
    ```
11. Clique em **Save Changes** no editor

Pronto. A próxima pessoa que se cadastrar dispara mensagem para você no WhatsApp.

### Testar

1. Abra uma janela anônima no navegador
2. Vá em `https://novitaads.com.br/anthropic/login.html`
3. Crie uma conta com qualquer e-mail (ex: o seu pessoal)
4. **Você deve receber em segundos**: e-mail em `jonas@novitaads.com.br` + mensagem no WhatsApp 61 99959-2673

### O e-mail não chegou?

- Cheque a aba de spam
- Em alguns provedores, e-mail saindo de servidor compartilhado da HostGator pode demorar alguns minutos
- Se nunca chegar, abra o cPanel → **Track Delivery** ou **Email Logs** para ver o status

### O WhatsApp não chegou?

- Confirme que mandou a mensagem `I allow callmebot to send me messages` exatamente, em inglês
- Confirme que o número configurado em `CALLMEBOT_PHONE` (em `api.php`) é o mesmo que recebeu a APIKEY
- O CallMeBot tem limite de 1 mensagem por minuto. Se testar muito rápido, espera 60 segundos
- Se ainda não funcionar, abra `https://api.callmebot.com/whatsapp.php?phone=+5561999592673&text=teste&apikey=SUA_APIKEY` direto no navegador. Deve responder JSON com sucesso ou erro

### Desativar notificações

Se quiser desligar temporariamente, edite `api.php`:

- E-mail: deixe `NOTIFY_EMAIL_TO = ''` (string vazia)
- WhatsApp: deixe `CALLMEBOT_APIKEY = ''` (string vazia)

Salve. Notificações param de ser enviadas até você reativar.
