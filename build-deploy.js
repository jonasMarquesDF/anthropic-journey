/* =========================================================
   build-deploy.js — gera o pacote ZIP para upload na HostGator.
   Uso: node build-deploy.js
   Saída: anthropic-journey-deploy.zip
   ========================================================= */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const FILES = [
    "index.html",
    "login.html",
    "admin.html",
    "install.php",
    "api.php",
    "auth.js",
    "admin.js",
    "data.js",
    "audiobook.js",
    "script.js",
    "styles.css",
    ".htaccess",
];

const OUT = "anthropic-journey-deploy.zip";

console.log("\n  ✦ Anthropic Journey — Build de deploy\n");

// Verifica que tudo existe
const missing = FILES.filter(f => !fs.existsSync(f));
if (missing.length) {
    console.error("  Arquivos faltando:", missing.join(", "));
    process.exit(1);
}

// Apaga ZIP anterior
if (fs.existsSync(OUT)) {
    fs.unlinkSync(OUT);
    console.log("  (zip anterior removido)");
}

// Gera ZIP usando PowerShell (Windows nativo, sem dependências)
const fileList = FILES.map(f => `'${f}'`).join(",");
const cmd = `powershell -NoProfile -Command "Compress-Archive -Path ${fileList} -DestinationPath '${OUT}' -Force"`;

try {
    execSync(cmd, { stdio: "inherit" });
} catch (e) {
    console.error("  Erro ao compactar:", e.message);
    process.exit(1);
}

// Mostra tamanho do resultado
const size = (fs.statSync(OUT).size / 1024).toFixed(1);
console.log(`\n  ✓ ${OUT} criado (${size} KB)`);
console.log(`\n  Conteúdo do pacote:`);
FILES.forEach(f => {
    const s = (fs.statSync(f).size / 1024).toFixed(1);
    console.log(`     ${f.padEnd(20)} ${s} KB`);
});

console.log(`
  Próximos passos:
    1. Faça upload de ${OUT} no cPanel da HostGator
       Caminho: public_html/anthropic/
    2. Extraia o ZIP no cPanel (clique direito → Extract)
    3. Apague o ZIP depois de extrair
    4. Acesse https://novitaads.com.br/anthropic/install.php
    5. Siga as instruções na tela
`);
