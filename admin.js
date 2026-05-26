/* =========================================================
   admin.js — painel administrativo
   ========================================================= */

(async function () {
  const { api, whoami, logout, toast } = window.AJ;

  // exige login + admin
  const me = await whoami();
  if (!me) { window.location.replace("login.html"); return; }
  if (me.role !== "admin") { window.location.replace("index.html"); return; }

  document.getElementById("adminWho").textContent = me.name + " · admin";
  document.getElementById("logoutBtn")?.addEventListener("click", () => logout());

  function fmtDate(iso) {
    if (!iso) return "—";
    try {
      const d = new Date(iso);
      return d.toLocaleString("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
    } catch (_) { return iso; }
  }

  function calcProgress(state) {
    if (!state || !state.items || typeof PHASES === "undefined") return { done: 0, total: 0, pct: 0 };
    let done = 0, total = 0;
    PHASES.forEach(p => p.items.forEach(it => {
      total++;
      if (state.items[it.n] === "done") done++;
    }));
    return { done, total, pct: total ? Math.round(done / total * 100) : 0 };
  }

  function statusPill(s) {
    if (s === "approved") return `<span class="pill pill--ok">aprovado</span>`;
    if (s === "pending")  return `<span class="pill pill--warn">aguardando</span>`;
    if (s === "rejected") return `<span class="pill pill--bad">negado</span>`;
    return `<span class="pill">${s}</span>`;
  }

  async function loadUsers() {
    try {
      const r = await api("admin.users");
      renderUsers(r.users || []);
    } catch (e) {
      toast("Erro ao carregar usuários: " + e.message, true);
    }
  }

  function renderUsers(users) {
    const body = document.getElementById("usersBody");
    if (!users.length) {
      body.innerHTML = `<tr><td colspan="8" class="admin-empty">Nenhum usuário cadastrado ainda.</td></tr>`;
      return;
    }

    let pending = 0, approved = 0, rejected = 0;
    users.forEach(u => {
      if (u.status === "pending")  pending++;
      if (u.status === "approved") approved++;
      if (u.status === "rejected") rejected++;
    });
    document.getElementById("stPending").textContent  = pending;
    document.getElementById("stApproved").textContent = approved;
    document.getElementById("stRejected").textContent = rejected;
    document.getElementById("stTotal").textContent    = users.length;

    body.innerHTML = users.map(u => {
      const actions = [];
      if (u.status === "pending") {
        actions.push(`<button class="admin-btn admin-btn--ok" data-act="approve" data-id="${u.id}">Aprovar</button>`);
        actions.push(`<button class="admin-btn admin-btn--bad" data-act="reject" data-id="${u.id}">Negar</button>`);
      }
      if (u.status === "approved") {
        actions.push(`<button class="admin-btn" data-act="progress" data-id="${u.id}" data-name="${escAttr(u.name)}">Progresso</button>`);
        if (u.role === "user")  actions.push(`<button class="admin-btn" data-act="role" data-role="admin" data-id="${u.id}">Tornar admin</button>`);
        if (u.role === "admin") actions.push(`<button class="admin-btn" data-act="role" data-role="user" data-id="${u.id}">Remover admin</button>`);
        actions.push(`<button class="admin-btn admin-btn--bad" data-act="reject" data-id="${u.id}">Bloquear</button>`);
      }
      if (u.status === "rejected") {
        actions.push(`<button class="admin-btn admin-btn--ok" data-act="approve" data-id="${u.id}">Reativar</button>`);
      }
      actions.push(`<button class="admin-btn" data-act="delete" data-id="${u.id}">Excluir</button>`);

      return `
        <tr>
          <td>${esc(u.name)}</td>
          <td><a href="mailto:${escAttr(u.email)}" class="admin-link">${esc(u.email)}</a></td>
          <td>${statusPill(u.status)}</td>
          <td><span class="pill ${u.role === "admin" ? "pill--ink" : ""}">${u.role}</span></td>
          <td class="muted">${fmtDate(u.created_at)}</td>
          <td class="muted">${fmtDate(u.last_login_at)}</td>
          <td class="muted">${u.progress_updated_at ? fmtDate(u.progress_updated_at) : "—"}</td>
          <td class="admin-table__actions">${actions.join(" ")}</td>
        </tr>
      `;
    }).join("");

    body.querySelectorAll("[data-act]").forEach(b => {
      b.addEventListener("click", () => handleAction(b));
    });
  }

  async function handleAction(btn) {
    const act = btn.getAttribute("data-act");
    const id  = Number(btn.getAttribute("data-id"));
    if (!id) return;

    if (act === "approve") {
      await call("admin.approve", { id });
      toast("Usuário aprovado.");
    } else if (act === "reject") {
      if (!confirm("Bloquear/negar acesso deste usuário?")) return;
      await call("admin.reject", { id });
      toast("Usuário bloqueado.");
    } else if (act === "delete") {
      if (!confirm("Excluir definitivamente este usuário e todo seu progresso?")) return;
      await call("admin.delete", { id });
      toast("Usuário excluído.");
    } else if (act === "role") {
      const role = btn.getAttribute("data-role");
      await call("admin.role", { id, role });
      toast(`Função alterada para ${role}.`);
    } else if (act === "progress") {
      openProgress(id, btn.getAttribute("data-name"));
      return;
    }
    loadUsers();
    loadActivity();
  }

  async function call(action, body) {
    try { return await api(action, { method: "POST", body }); }
    catch (e) { toast(e.message, true); throw e; }
  }

  async function openProgress(id, name) {
    const modal = document.getElementById("progModal");
    const title = document.getElementById("progTitle");
    const body  = document.getElementById("progBody");
    title.textContent = name || "Usuário";
    body.innerHTML = `<p class="muted">Carregando…</p>`;
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("is-open"));

    try {
      const r = await api("admin.user_progress", { query: `&id=${id}` });
      const prog = calcProgress(r.state);
      const items = r.state && r.state.items ? r.state.items : {};
      const phases = (typeof PHASES !== "undefined") ? PHASES : [];
      let html = `
        <div class="prog-summary">
          <div><strong>${prog.done}</strong> de <strong>${prog.total}</strong> recursos · <strong>${prog.pct}%</strong></div>
          <div class="muted">Última atualização: ${fmtDate(r.updated_at)}</div>
        </div>
      `;
      phases.forEach(p => {
        const phaseDone = p.items.filter(it => items[it.n] === "done").length;
        html += `
          <section class="ab-section">
            <h3 class="ab-section__title">${esc(p.title)} <small class="muted">${phaseDone}/${p.items.length}</small></h3>
            <ul class="prog-list">
              ${p.items.map(it => {
                const st = items[it.n] || "todo";
                const dot = st === "done" ? "●" : st === "doing" ? "◐" : "○";
                const cls = "prog-item prog-item--" + st;
                return `<li class="${cls}"><span class="prog-dot">${dot}</span>#${String(it.n).padStart(2,"0")} — ${esc(it.title)}</li>`;
              }).join("")}
            </ul>
          </section>
        `;
      });
      body.innerHTML = html;
    } catch (e) {
      body.innerHTML = `<p class="error">${e.message}</p>`;
    }

    modal.addEventListener("click", e => {
      if (e.target.matches("[data-close]")) closeModal();
    }, { once: true });
    document.addEventListener("keydown", escClose);
    function closeModal() {
      modal.classList.remove("is-open");
      setTimeout(() => modal.hidden = true, 280);
      document.removeEventListener("keydown", escClose);
    }
    function escClose(e) { if (e.key === "Escape") closeModal(); }
  }

  async function loadActivity() {
    try {
      const r = await api("admin.activity");
      renderActivity(r.log || []);
    } catch (e) {
      toast("Erro ao carregar log: " + e.message, true);
    }
  }

  function renderActivity(rows) {
    const body = document.getElementById("activityBody");
    if (!rows.length) {
      body.innerHTML = `<tr><td colspan="5" class="admin-empty">Sem atividade ainda.</td></tr>`;
      return;
    }
    body.innerHTML = rows.map(l => `
      <tr>
        <td class="muted">${fmtDate(l.created_at)}</td>
        <td>${esc(l.email || "—")}</td>
        <td><span class="pill">${esc(l.action)}</span></td>
        <td class="muted">${esc(l.ip || "—")}</td>
        <td class="muted ua">${esc((l.user_agent || "").slice(0, 60))}</td>
      </tr>
    `).join("");
  }

  function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, c => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[c]));
  }
  function escAttr(s) { return esc(s); }

  loadUsers();
  loadActivity();
  // refresh leve a cada 30s
  setInterval(() => { loadUsers(); loadActivity(); }, 30000);
})();
