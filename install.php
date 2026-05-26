<?php
/* =========================================================
   install.php — diagnóstico e auto-configuração
   Acesse uma vez em https://seu-dominio/anthropic/install.php
   após fazer upload dos arquivos. Apaga sozinho ao final.
   ========================================================= */
declare(strict_types=1);
header('Content-Type: text/html; charset=utf-8');

$checks = [];

// 1) Versão do PHP
$phpVer = PHP_VERSION;
$checks[] = [
    'name' => "PHP $phpVer",
    'ok'   => version_compare($phpVer, '7.4', '>='),
    'msg'  => version_compare($phpVer, '7.4', '>=')
        ? "Versão suportada"
        : "Atualize para PHP 7.4 ou superior no cPanel → Selecionar versão do PHP"
];

// 2) PDO SQLite
$hasPdoSqlite = extension_loaded('pdo_sqlite');
$checks[] = [
    'name' => "Extensão pdo_sqlite",
    'ok'   => $hasPdoSqlite,
    'msg'  => $hasPdoSqlite
        ? "Disponível"
        : "Habilite em cPanel → Selecionar versão do PHP → aba Extensions, marque pdo_sqlite e Save"
];

// 3) Diretório _db gravável
$dbDir = __DIR__ . '/_db';
$createdDir = false;
if (!is_dir($dbDir)) {
    $createdDir = @mkdir($dbDir, 0700, true);
}
$dbWritable = is_dir($dbDir) && is_writable($dbDir);
$checks[] = [
    'name' => "Pasta _db (banco)",
    'ok'   => $dbWritable,
    'msg'  => $dbWritable
        ? ($createdDir ? "Criada e gravável" : "Existente e gravável")
        : "Sem permissão de escrita. No cPanel ajuste permissão da pasta para 700 ou 755"
];

// 4) Tenta criar a tabela
$dbTest = false;
$dbError = '';
if ($hasPdoSqlite && $dbWritable) {
    try {
        $pdo = new PDO('sqlite:' . $dbDir . '/users.sqlite');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->exec('CREATE TABLE IF NOT EXISTS _check (id INTEGER)');
        $pdo->exec('DROP TABLE _check');
        $dbTest = true;
    } catch (Throwable $e) {
        $dbError = $e->getMessage();
    }
}
$checks[] = [
    'name' => "Banco SQLite (escrita/leitura)",
    'ok'   => $dbTest,
    'msg'  => $dbTest ? "OK — tabela criada e removida com sucesso" : ("Erro: " . ($dbError ?: 'pré-requisitos acima'))
];

// 5) .htaccess presente
$htaccess = is_file(__DIR__ . '/.htaccess');
$checks[] = [
    'name' => ".htaccess (segurança do banco)",
    'ok'   => $htaccess,
    'msg'  => $htaccess ? "Presente" : "Faltando — faça upload do arquivo .htaccess junto"
];

// 6) Arquivos essenciais
$essential = ['index.html','login.html','admin.html','api.php','styles.css','script.js','data.js','audiobook.js','auth.js','admin.js'];
$missing = array_filter($essential, fn($f) => !is_file(__DIR__ . '/' . $f));
$checks[] = [
    'name' => "Arquivos essenciais",
    'ok'   => empty($missing),
    'msg'  => empty($missing) ? "Todos presentes" : "Faltando: " . implode(', ', $missing)
];

// 7) HTTPS ativo
$httpsOn = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || ($_SERVER['SERVER_PORT'] ?? '') == '443';
$checks[] = [
    'name' => "HTTPS",
    'ok'   => $httpsOn,
    'msg'  => $httpsOn ? "Ativo" : "Recomendado: ative SSL grátis em cPanel → SSL/TLS Status (Let's Encrypt)"
];

$allOk = !in_array(false, array_column($checks, 'ok'), true);

// Auto-apaga após 5 verificações OK consecutivas via lock file
$selfDelete = false;
if ($allOk && isset($_GET['done'])) {
    $selfDelete = @unlink(__FILE__);
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Instalação — Anthropic Journey</title>
<style>
* { box-sizing: border-box; }
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: #F0EEE6;
    color: #141413;
    margin: 0;
    padding: 40px 20px;
    line-height: 1.5;
}
.wrap { max-width: 720px; margin: 0 auto; }
h1 {
    font-family: Georgia, serif;
    font-size: 36px;
    margin: 0 0 6px;
    letter-spacing: -0.02em;
}
h1 em { color: #D97757; font-style: italic; }
.lead { color: #57544D; margin: 0 0 32px; }
.check {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 20px;
    background: white;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 14px;
    margin-bottom: 8px;
}
.check.ok { border-color: rgba(29,185,84,0.35); }
.check.fail { border-color: rgba(255,69,58,0.35); background: #fff7f6; }
.icon {
    width: 32px; height: 32px;
    border-radius: 50%;
    display: grid; place-items: center;
    color: white; font-weight: 700; flex-shrink: 0;
}
.check.ok .icon { background: #1db954; }
.check.fail .icon { background: #ff453a; }
.check__name { font-weight: 600; }
.check__msg { color: #57544D; font-size: 14px; margin-top: 2px; }
.box {
    margin-top: 32px;
    padding: 28px;
    background: #fff;
    border-radius: 16px;
    border: 1px solid rgba(0,0,0,0.08);
}
.box.success { background: linear-gradient(135deg, #fff, #fff5f0); border-color: rgba(217,119,87,0.4); }
.btn {
    display: inline-block;
    padding: 14px 28px;
    background: #141413;
    color: #F0EEE6;
    text-decoration: none;
    border-radius: 999px;
    margin-top: 14px;
    font-weight: 500;
}
.btn:hover { background: #D97757; }
code {
    background: #f5f5f7;
    padding: 2px 8px;
    border-radius: 6px;
    font-family: "JetBrains Mono", monospace;
    font-size: 12px;
}
.warn {
    background: #fff8e1;
    border: 1px solid #ffd54f;
    padding: 16px;
    border-radius: 12px;
    margin-top: 20px;
    font-size: 14px;
}
</style>
</head>
<body>
<div class="wrap">
    <h1><em>Diagnóstico</em> da instalação</h1>
    <p class="lead">Verificação automática do ambiente da HostGator antes do primeiro acesso.</p>

    <?php foreach ($checks as $c): ?>
        <div class="check <?= $c['ok'] ? 'ok' : 'fail' ?>">
            <div class="icon"><?= $c['ok'] ? '✓' : '✕' ?></div>
            <div>
                <div class="check__name"><?= htmlspecialchars($c['name']) ?></div>
                <div class="check__msg"><?= htmlspecialchars($c['msg']) ?></div>
            </div>
        </div>
    <?php endforeach; ?>

    <?php if ($allOk): ?>
        <?php if ($selfDelete): ?>
            <div class="box success">
                <h2 style="margin:0 0 8px;font-family:Georgia,serif;font-size:24px">Tudo pronto.</h2>
                <p style="margin:0;color:#57544D">O instalador apagou a si mesmo. Já pode acessar a tela de login.</p>
                <a href="login.html" class="btn">Ir para o login →</a>
            </div>
        <?php else: ?>
            <div class="box success">
                <h2 style="margin:0 0 8px;font-family:Georgia,serif;font-size:24px">✦ Ambiente OK</h2>
                <p style="margin:0 0 14px;color:#57544D">Tudo certo. Clique no botão abaixo para finalizar a instalação. Este arquivo será apagado automaticamente.</p>
                <a href="?done=1" class="btn">Finalizar instalação →</a>
            </div>
            <div class="warn">
                <strong>Próximo passo</strong>: depois de clicar em "Finalizar instalação", acesse <code>login.html</code> e cadastre-se com <code>jonas@novitaads.com.br</code>. Você é aprovado automaticamente como administrador.
            </div>
        <?php endif; ?>
    <?php else: ?>
        <div class="box">
            <h2 style="margin:0 0 8px;font-family:Georgia,serif;font-size:24px;color:#c0392b">Corrija os itens acima</h2>
            <p style="margin:0;color:#57544D">Após resolver, recarregue esta página. O instalador roda quantas vezes forem necessárias até tudo ficar verde.</p>
        </div>
    <?php endif; ?>

    <p style="text-align:center;margin-top:40px;font-size:12px;color:#86868b">Anthropic Journey · instalador único</p>
</div>
</body>
</html>
