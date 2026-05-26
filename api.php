<?php
/* =========================================================
   Anthropic Journey — Backend único (PHP + SQLite)
   Endpoints (action via query string):
     POST  ?action=signup           { email, name, password }
     POST  ?action=login            { email, password }
     POST  ?action=logout
     GET   ?action=me
     GET   ?action=progress.get
     POST  ?action=progress.save    { state: {...} }
     GET   ?action=admin.users
     POST  ?action=admin.approve    { id }
     POST  ?action=admin.reject     { id }
     POST  ?action=admin.delete     { id }
     POST  ?action=admin.role       { id, role }    role = "user" | "admin"
     GET   ?action=admin.user_progress&id=123
     GET   ?action=admin.activity
   ========================================================= */
declare(strict_types=1);

/* ----- CONFIG (edite só se precisar) ----- */
const ADMIN_EMAILS = ['jonas@novitaads.com.br'];
const SESSION_DAYS = 30;
const DB_DIR = __DIR__ . '/_db';
const DB_PATH = DB_DIR . '/users.sqlite';

/* ----- NOTIFICAÇÕES (e-mail + WhatsApp) ----- */
// E-mail: deixe '' para desabilitar
const NOTIFY_EMAIL_TO   = 'jonas@novitaads.com.br';
const NOTIFY_EMAIL_FROM = 'no-reply@novitaads.com.br';
const SITE_URL          = 'https://novitaads.com.br/anthropic';

// WhatsApp via CallMeBot (grátis, requer setup uma vez — ver HOSPEDAGEM-HOSTGATOR.md)
// Telefone com +código do país, sem espaços. Deixe APIKEY como '' para desabilitar
// até você ter feito o setup do CallMeBot.
const CALLMEBOT_PHONE   = '+5561999592673';
const CALLMEBOT_APIKEY  = ''; // <— preencher após o setup do CallMeBot

/* ----- BOOTSTRAP ----- */
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
    header('Vary: Origin');
}
header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Authorization');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') { http_response_code(204); exit; }

if (!is_dir(DB_DIR)) { @mkdir(DB_DIR, 0700, true); }

function db(): PDO {
    static $pdo = null;
    if ($pdo) return $pdo;
    $pdo = new PDO('sqlite:' . DB_PATH);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec('PRAGMA journal_mode = WAL');
    $pdo->exec('PRAGMA foreign_keys = ON');
    $pdo->exec('
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT "user",
            status TEXT NOT NULL DEFAULT "pending",
            created_at TEXT NOT NULL,
            last_login_at TEXT
        );
        CREATE TABLE IF NOT EXISTS sessions (
            token TEXT PRIMARY KEY,
            user_id INTEGER NOT NULL,
            created_at TEXT NOT NULL,
            expires_at TEXT NOT NULL,
            ip TEXT,
            user_agent TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        CREATE TABLE IF NOT EXISTS progress (
            user_id INTEGER PRIMARY KEY,
            data TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        CREATE TABLE IF NOT EXISTS access_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            email TEXT,
            action TEXT NOT NULL,
            ip TEXT,
            user_agent TEXT,
            created_at TEXT NOT NULL
        );
        CREATE INDEX IF NOT EXISTS idx_log_created ON access_log(created_at);
        CREATE INDEX IF NOT EXISTS idx_sessions_exp ON sessions(expires_at);
    ');
    return $pdo;
}

function json_input(): array {
    $raw = file_get_contents('php://input') ?: '';
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}
function out(int $code, array $payload): void {
    http_response_code($code);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
function err(int $code, string $message): void { out($code, ['error' => $message]); }

function client_ip(): string {
    foreach (['HTTP_CF_CONNECTING_IP','HTTP_X_FORWARDED_FOR','REMOTE_ADDR'] as $k) {
        if (!empty($_SERVER[$k])) {
            $ip = explode(',', $_SERVER[$k])[0];
            return trim($ip);
        }
    }
    return '0.0.0.0';
}
function ua(): string { return substr((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 500); }
function now_iso(): string { return gmdate('Y-m-d\TH:i:s\Z'); }

function log_action(?int $userId, ?string $email, string $action): void {
    $stmt = db()->prepare('INSERT INTO access_log (user_id, email, action, ip, user_agent, created_at) VALUES (?,?,?,?,?,?)');
    $stmt->execute([$userId, $email, $action, client_ip(), ua(), now_iso()]);
}

/* ----- NOTIFICAÇÕES ----- */

/** Dispara notificações sem travar o usuário se algo falhar. */
function notify_new_signup(string $name, string $email): void {
    @notify_email(
        "Novo cadastro · Anthropic Journey",
        "Olá Jonas,\n\nUma nova pessoa se cadastrou na plataforma e está aguardando sua aprovação:\n\n" .
        "Nome:  {$name}\n" .
        "E-mail: {$email}\n" .
        "Data:   " . date('d/m/Y H:i') . "\n\n" .
        "Acesse o painel admin para aprovar ou negar:\n" .
        SITE_URL . "/admin.html\n\n— Anthropic Journey"
    );
    @notify_whatsapp(
        "🔔 *Novo cadastro pendente*\n\n" .
        "👤 *{$name}*\n" .
        "✉️ {$email}\n\n" .
        "Aprovar em: " . SITE_URL . "/admin.html"
    );
}

function notify_email(string $subject, string $message): bool {
    if (NOTIFY_EMAIL_TO === '') return false;
    if (!function_exists('mail')) return false;
    $headers  = "From: " . NOTIFY_EMAIL_FROM . "\r\n";
    $headers .= "Reply-To: " . NOTIFY_EMAIL_FROM . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: AnthropicJourney/1.0\r\n";
    return @mail(NOTIFY_EMAIL_TO, '=?UTF-8?B?' . base64_encode($subject) . '?=', $message, $headers);
}

function notify_whatsapp(string $text): bool {
    if (CALLMEBOT_APIKEY === '' || CALLMEBOT_PHONE === '') return false;
    $url = 'https://api.callmebot.com/whatsapp.php?' . http_build_query([
        'phone'  => CALLMEBOT_PHONE,
        'text'   => $text,
        'apikey' => CALLMEBOT_APIKEY,
    ]);
    $ctx = stream_context_create(['http' => ['timeout' => 5, 'ignore_errors' => true]]);
    $resp = @file_get_contents($url, false, $ctx);
    return $resp !== false;
}

/** Avisa o usuário que o acesso foi liberado. */
function notify_user_approved(string $userEmail, string $userName): bool {
    if (!filter_var($userEmail, FILTER_VALIDATE_EMAIL)) return false;
    if (!function_exists('mail')) return false;
    $subject = "Seu acesso foi liberado · Anthropic Journey";
    $message = "Olá {$userName},\n\n" .
        "Seu cadastro na Anthropic Journey foi aprovado pelo administrador.\n" .
        "Você já pode entrar e começar sua jornada de estudos.\n\n" .
        "Acesse: " . SITE_URL . "/login.html\n\n" .
        "Bons estudos.\n— Anthropic Journey";
    $headers  = "From: " . NOTIFY_EMAIL_FROM . "\r\n";
    $headers .= "Reply-To: " . NOTIFY_EMAIL_FROM . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: AnthropicJourney/1.0\r\n";
    return @mail($userEmail, '=?UTF-8?B?' . base64_encode($subject) . '?=', $message, $headers);
}

function token_from_request(): ?string {
    $h = $_SERVER['HTTP_X_AUTH_TOKEN'] ?? '';
    if ($h) return $h;
    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (stripos($auth, 'Bearer ') === 0) return substr($auth, 7);
    if (!empty($_COOKIE['aj_token'])) return $_COOKIE['aj_token'];
    return null;
}
function set_token_cookie(string $token): void {
    setcookie('aj_token', $token, [
        'expires'  => time() + SESSION_DAYS * 86400,
        'path'     => '/',
        'secure'   => (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off'),
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}
function clear_token_cookie(): void {
    setcookie('aj_token', '', ['expires' => time() - 3600, 'path' => '/']);
}

function require_session(bool $requireApproved = true): array {
    $token = token_from_request();
    if (!$token) err(401, 'não autenticado');
    $stmt = db()->prepare('SELECT s.token, s.user_id, u.email, u.name, u.role, u.status FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = ? AND s.expires_at > ?');
    $stmt->execute([$token, now_iso()]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row) err(401, 'sessão inválida ou expirada');
    if ($requireApproved && $row['status'] !== 'approved') err(403, 'aguardando aprovação');
    return $row;
}
function require_admin(): array {
    $s = require_session();
    if ($s['role'] !== 'admin') err(403, 'sem permissão de admin');
    return $s;
}

/* ----- HANDLERS ----- */
$action = $_GET['action'] ?? '';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    switch ($action) {

        case 'signup': {
            if ($method !== 'POST') err(405, 'método inválido');
            $in = json_input();
            $email = strtolower(trim((string)($in['email'] ?? '')));
            $name  = trim((string)($in['name'] ?? ''));
            $pwd   = (string)($in['password'] ?? '');

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) err(400, 'e-mail inválido');
            if (strlen($name) < 2) err(400, 'nome muito curto');
            if (strlen($pwd) < 8)  err(400, 'senha precisa de pelo menos 8 caracteres');

            $isAdmin = in_array($email, ADMIN_EMAILS, true);
            $role    = $isAdmin ? 'admin' : 'user';
            $status  = $isAdmin ? 'approved' : 'pending';
            $hash    = password_hash($pwd, PASSWORD_BCRYPT);

            try {
                $stmt = db()->prepare('INSERT INTO users (email, name, password_hash, role, status, created_at) VALUES (?,?,?,?,?,?)');
                $stmt->execute([$email, $name, $hash, $role, $status, now_iso()]);
            } catch (PDOException $e) {
                if (strpos($e->getMessage(), 'UNIQUE') !== false) err(409, 'já existe conta com esse e-mail');
                throw $e;
            }
            $id = (int)db()->lastInsertId();
            log_action($id, $email, 'signup');

            // se já é admin, faz login direto
            if ($status === 'approved') {
                $token = bin2hex(random_bytes(32));
                $exp = gmdate('Y-m-d\TH:i:s\Z', time() + SESSION_DAYS * 86400);
                $st = db()->prepare('INSERT INTO sessions (token, user_id, created_at, expires_at, ip, user_agent) VALUES (?,?,?,?,?,?)');
                $st->execute([$token, $id, now_iso(), $exp, client_ip(), ua()]);
                set_token_cookie($token);
                log_action($id, $email, 'login');
                out(200, ['ok' => true, 'status' => 'approved', 'token' => $token, 'user' => ['email'=>$email,'name'=>$name,'role'=>$role,'status'=>$status]]);
            }

            // Cadastro pendente: notifica o admin (e-mail + WhatsApp)
            notify_new_signup($name, $email);
            out(200, ['ok' => true, 'status' => 'pending']);
            break;
        }

        case 'login': {
            if ($method !== 'POST') err(405, 'método inválido');
            $in = json_input();
            $email = strtolower(trim((string)($in['email'] ?? '')));
            $pwd   = (string)($in['password'] ?? '');
            if (!$email || !$pwd) err(400, 'preencha e-mail e senha');

            $stmt = db()->prepare('SELECT id, email, name, password_hash, role, status FROM users WHERE email = ?');
            $stmt->execute([$email]);
            $u = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$u || !password_verify($pwd, $u['password_hash'])) {
                log_action(null, $email, 'login_fail');
                err(401, 'e-mail ou senha incorretos');
            }
            if ($u['status'] === 'rejected')  err(403, 'acesso negado');
            if ($u['status'] === 'pending')   err(403, 'sua conta ainda está aguardando aprovação do administrador');

            $token = bin2hex(random_bytes(32));
            $exp = gmdate('Y-m-d\TH:i:s\Z', time() + SESSION_DAYS * 86400);
            $st = db()->prepare('INSERT INTO sessions (token, user_id, created_at, expires_at, ip, user_agent) VALUES (?,?,?,?,?,?)');
            $st->execute([$token, (int)$u['id'], now_iso(), $exp, client_ip(), ua()]);
            db()->prepare('UPDATE users SET last_login_at = ? WHERE id = ?')->execute([now_iso(), (int)$u['id']]);
            set_token_cookie($token);
            log_action((int)$u['id'], $email, 'login');
            out(200, ['ok'=>true,'token'=>$token,'user'=>['email'=>$u['email'],'name'=>$u['name'],'role'=>$u['role'],'status'=>$u['status']]]);
            break;
        }

        case 'logout': {
            $token = token_from_request();
            if ($token) {
                $st = db()->prepare('DELETE FROM sessions WHERE token = ?');
                $st->execute([$token]);
                log_action(null, null, 'logout');
            }
            clear_token_cookie();
            out(200, ['ok'=>true]);
            break;
        }

        case 'me': {
            $s = require_session(false);
            out(200, ['user'=>['email'=>$s['email'],'name'=>$s['name'],'role'=>$s['role'],'status'=>$s['status']]]);
            break;
        }

        case 'progress.get': {
            $s = require_session();
            $stmt = db()->prepare('SELECT data, updated_at FROM progress WHERE user_id = ?');
            $stmt->execute([(int)$s['user_id']]);
            $r = $stmt->fetch(PDO::FETCH_ASSOC);
            $state = $r ? json_decode($r['data'], true) : null;
            out(200, ['state'=>$state, 'updated_at'=>$r['updated_at'] ?? null]);
            break;
        }

        case 'progress.save': {
            if ($method !== 'POST') err(405, 'método inválido');
            $s = require_session();
            $in = json_input();
            $state = $in['state'] ?? null;
            if (!is_array($state)) err(400, 'state inválido');
            $json = json_encode($state, JSON_UNESCAPED_UNICODE);
            $now = now_iso();
            $stmt = db()->prepare('INSERT INTO progress (user_id, data, updated_at) VALUES (?,?,?) ON CONFLICT(user_id) DO UPDATE SET data=excluded.data, updated_at=excluded.updated_at');
            $stmt->execute([(int)$s['user_id'], $json, $now]);
            out(200, ['ok'=>true,'updated_at'=>$now]);
            break;
        }

        case 'admin.users': {
            require_admin();
            $rows = db()->query('SELECT u.id, u.email, u.name, u.role, u.status, u.created_at, u.last_login_at, (SELECT updated_at FROM progress p WHERE p.user_id = u.id) AS progress_updated_at FROM users u ORDER BY u.created_at DESC')->fetchAll(PDO::FETCH_ASSOC);
            out(200, ['users'=>$rows]);
            break;
        }

        case 'admin.approve': {
            if ($method !== 'POST') err(405, 'método inválido');
            $a = require_admin();
            $id = (int)(json_input()['id'] ?? 0);
            if (!$id) err(400, 'id obrigatório');
            db()->prepare('UPDATE users SET status = "approved" WHERE id = ?')->execute([$id]);
            log_action($id, null, 'approved_by_admin');

            // Avisa o usuário aprovado
            $u = db()->prepare('SELECT email, name FROM users WHERE id = ?');
            $u->execute([$id]);
            if ($row = $u->fetch(PDO::FETCH_ASSOC)) {
                @notify_user_approved($row['email'], $row['name']);
            }

            out(200, ['ok'=>true]);
            break;
        }

        case 'admin.reject': {
            if ($method !== 'POST') err(405, 'método inválido');
            $a = require_admin();
            $id = (int)(json_input()['id'] ?? 0);
            if (!$id) err(400, 'id obrigatório');
            db()->prepare('UPDATE users SET status = "rejected" WHERE id = ?')->execute([$id]);
            db()->prepare('DELETE FROM sessions WHERE user_id = ?')->execute([$id]);
            log_action($id, null, 'rejected_by_admin');
            out(200, ['ok'=>true]);
            break;
        }

        case 'admin.delete': {
            if ($method !== 'POST') err(405, 'método inválido');
            $a = require_admin();
            $id = (int)(json_input()['id'] ?? 0);
            if (!$id) err(400, 'id obrigatório');
            if ($id === (int)$a['user_id']) err(400, 'não pode excluir a própria conta');
            db()->prepare('DELETE FROM users WHERE id = ?')->execute([$id]);
            log_action($id, null, 'deleted_by_admin');
            out(200, ['ok'=>true]);
            break;
        }

        case 'admin.role': {
            if ($method !== 'POST') err(405, 'método inválido');
            $a = require_admin();
            $in = json_input();
            $id = (int)($in['id'] ?? 0);
            $role = (string)($in['role'] ?? '');
            if (!$id || !in_array($role, ['user','admin'], true)) err(400, 'parâmetros inválidos');
            db()->prepare('UPDATE users SET role = ? WHERE id = ?')->execute([$role, $id]);
            log_action($id, null, 'role_changed_to_' . $role);
            out(200, ['ok'=>true]);
            break;
        }

        case 'admin.user_progress': {
            require_admin();
            $id = (int)($_GET['id'] ?? 0);
            if (!$id) err(400, 'id obrigatório');
            $stmt = db()->prepare('SELECT p.data, p.updated_at, u.name, u.email FROM users u LEFT JOIN progress p ON p.user_id = u.id WHERE u.id = ?');
            $stmt->execute([$id]);
            $r = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$r) err(404, 'usuário não encontrado');
            out(200, ['name'=>$r['name'],'email'=>$r['email'],'state'=>$r['data'] ? json_decode($r['data'], true) : null,'updated_at'=>$r['updated_at']]);
            break;
        }

        case 'admin.activity': {
            require_admin();
            $rows = db()->query('SELECT id, user_id, email, action, ip, user_agent, created_at FROM access_log ORDER BY id DESC LIMIT 200')->fetchAll(PDO::FETCH_ASSOC);
            out(200, ['log'=>$rows]);
            break;
        }

        case 'health': {
            out(200, ['ok'=>true,'time'=>now_iso()]);
            break;
        }

        default:
            err(404, 'ação desconhecida');
    }
} catch (Throwable $e) {
    error_log('[anthropic-journey api] ' . $e->getMessage());
    err(500, 'erro interno');
}
