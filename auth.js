/* =========================================================
   auth.js — cliente da API + helpers compartilhados.
   Funciona em login.html, admin.html e index.html.
   ========================================================= */

(function (global) {

  // Aplica tema claro como padrão antes de qualquer renderização
  (function setDefaultTheme() {
    try {
      const saved = localStorage.getItem("anthropic-journey-theme");
      document.documentElement.setAttribute("data-theme", saved === "dark" ? "dark" : "light");
    } catch (_) {
      document.documentElement.setAttribute("data-theme", "light");
    }
  })();

  // Detecta automaticamente se temos backend disponível.
  // Em produção (HostGator) o api.php fica na mesma origem.
  // Em GitHub Pages (sem PHP) o site funciona em modo local.
  const API_URL = "api.php";
  const TOKEN_KEY = "aj_token";

  function getToken() {
    try { return localStorage.getItem(TOKEN_KEY) || ""; } catch (_) { return ""; }
  }
  function setToken(t) {
    try {
      if (t) localStorage.setItem(TOKEN_KEY, t);
      else localStorage.removeItem(TOKEN_KEY);
    } catch (_) {}
  }

  async function api(action, options = {}) {
    const url = `${API_URL}?action=${encodeURIComponent(action)}` + (options.query || "");
    const init = {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": getToken(),
      },
      credentials: "include",
    };
    if (options.body) init.body = JSON.stringify(options.body);
    let r;
    try { r = await fetch(url, init); }
    catch (e) { throw new Error("sem conexão com o servidor"); }
    let data = {};
    try { data = await r.json(); } catch (_) {}
    if (!r.ok) {
      const msg = (data && data.error) ? data.error : `erro ${r.status}`;
      const err = new Error(msg);
      err.status = r.status;
      throw err;
    }
    return data;
  }

  /** Verifica sessão atual. Retorna user ou null. */
  async function whoami() {
    if (!getToken()) return null;
    try {
      const r = await api("me");
      return r.user || null;
    } catch (_) {
      setToken("");
      return null;
    }
  }

  /** Detecta se o backend existe. Útil para o site funcionar sem login no GitHub Pages. */
  async function hasBackend() {
    try {
      const r = await fetch(`${API_URL}?action=health`, { method: "GET" });
      if (!r.ok) return false;
      const d = await r.json();
      return !!d.ok;
    } catch (_) { return false; }
  }

  function toast(msg, isError) {
    const el = document.getElementById("toast");
    if (!el) { alert(msg); return; }
    el.textContent = msg;
    el.style.background = isError ? "#ff453a" : "";
    el.classList.add("is-show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("is-show"), 2800);
  }

  /* ===== UI da página de login ===== */
  function bindLoginPage() {
    if (!document.body.classList.contains("auth-body")) return;

    function showPending() {
      const pending = document.getElementById("authPending");
      const card = document.getElementById("authCard");
      if (pending) pending.hidden = false;
      if (card) card.style.display = "none";
    }
    function showLogin() {
      const pending = document.getElementById("authPending");
      const card = document.getElementById("authCard");
      if (pending) pending.hidden = true;
      if (card) card.style.display = "";
    }

    // Mensagem se chegou aqui após cadastro pendente
    const params = new URLSearchParams(window.location.search);
    if (params.get("pending") === "1") {
      showPending();
    }

    // Botão "já fui aprovado, entrar"
    document.getElementById("backToLogin")?.addEventListener("click", () => {
      // Limpa a URL e mostra o form de login
      window.history.replaceState({}, "", window.location.pathname);
      showLogin();
      // foca no campo de e-mail
      const tab = document.querySelector('.auth__tab[data-tab="login"]');
      if (tab) tab.click();
      const emailInput = document.querySelector('#formLogin input[name="email"]');
      if (emailInput) setTimeout(() => emailInput.focus(), 100);
    });

    // já logado e aprovado? redireciona
    whoami().then(u => {
      if (u && u.status === "approved") {
        window.location.replace(u.role === "admin" ? "admin.html" : "index.html");
      } else if (u && u.status === "pending") {
        // Conta pendente: mostra a tela bonita e desloga sessão
        setToken("");
        showPending();
      }
    });

    document.querySelectorAll(".auth__tab").forEach(b => {
      b.addEventListener("click", () => {
        const tab = b.getAttribute("data-tab");
        document.querySelectorAll(".auth__tab").forEach(x => x.classList.toggle("is-active", x === b));
        document.querySelectorAll(".auth__form").forEach(f => {
          f.classList.toggle("is-active", f.id === (tab === "login" ? "formLogin" : "formSignup"));
        });
      });
    });

    const formLogin  = document.getElementById("formLogin");
    const formSignup = document.getElementById("formSignup");
    const msgLogin   = document.getElementById("loginMsg");
    const msgSignup  = document.getElementById("signupMsg");

    formLogin?.addEventListener("submit", async e => {
      e.preventDefault();
      msgLogin.textContent = "";
      msgLogin.className = "auth__msg";
      const fd = new FormData(formLogin);
      try {
        const r = await api("login", { method: "POST", body: { email: fd.get("email"), password: fd.get("password") } });
        if (r.token) setToken(r.token);
        window.location.replace(r.user && r.user.role === "admin" ? "admin.html" : "index.html");
      } catch (err) {
        msgLogin.textContent = err.message;
        msgLogin.classList.add("is-error");
      }
    });

    formSignup?.addEventListener("submit", async e => {
      e.preventDefault();
      msgSignup.textContent = "";
      msgSignup.className = "auth__msg";
      const fd = new FormData(formSignup);
      try {
        const r = await api("signup", { method: "POST", body: {
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          password: fd.get("password")
        }});
        if (r.status === "approved" && r.token) {
          setToken(r.token);
          window.location.replace(r.user && r.user.role === "admin" ? "admin.html" : "index.html");
          return;
        }
        // Pendente: mostra a tela editorial bonita
        formSignup.reset();
        showPending();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        msgSignup.textContent = err.message;
        msgSignup.classList.add("is-error");
      }
    });

    // Máscara de telefone enquanto digita: (DD) 9XXXX-XXXX
    const phoneInput = formSignup?.querySelector('input[name="phone"]');
    if (phoneInput) {
      phoneInput.addEventListener("input", e => {
        let v = e.target.value.replace(/\D/g, "");
        if (v.length > 11) v = v.slice(0, 11);
        let f = v;
        if (v.length > 0) f = "(" + v.slice(0, 2);
        if (v.length >= 3) f += ") " + v.slice(2, v.length >= 11 ? 7 : 6);
        if (v.length >= 7) {
          const split = v.length === 11 ? 7 : 6;
          f += "-" + v.slice(split, split + 4);
        }
        e.target.value = f;
      });
    }
  }

  async function logout() {
    try { await api("logout", { method: "POST" }); } catch (_) {}
    setToken("");
    window.location.href = "login.html";
  }

  /* expõe API global */
  global.AJ = {
    api,
    whoami,
    hasBackend,
    getToken,
    setToken,
    logout,
    toast,
  };

  document.addEventListener("DOMContentLoaded", bindLoginPage);
})(window);
