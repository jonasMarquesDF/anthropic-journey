/* =========================================================
   script.js — Estado, render e interações do site
   ========================================================= */

(function () {
  const STORAGE_KEY = "anthropic-journey-state-v1";
  const GITHUB_KEY  = "anthropic-journey-github-v1";
  const VIDEOS_KEY  = "anthropic-journey-videos-v1";

  // status: "todo" | "doing" | "done"
  // Estado padrão: todos "todo".
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      // Garante que todos os Ns conhecidos existam.
      const def = defaultState();
      const merged = {
        ...def,
        ...parsed,
        items: { ...def.items, ...(parsed.items || {}) },
        phasesCompletedAt: { ...def.phasesCompletedAt, ...(parsed.phasesCompletedAt || {}) }
      };
      // Normaliza filtros legados que podem deixar a UI escondendo tudo.
      if (!["all", "todo", "doing", "done"].includes(merged.filter)) {
        merged.filter = "all";
      }
      return merged;
    } catch (e) {
      return defaultState();
    }
  }
  function defaultState() {
    const items = {};
    PHASES.forEach(p => p.items.forEach(it => { items[it.n] = "todo"; }));
    const phasesCompletedAt = {};
    PHASES.forEach(p => { phasesCompletedAt[p.id] = null; });
    return { items, filter: "all", phasesCompletedAt };
  }
  let saveState = function (s) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch (_) { /* ignore */ }
  };

  // ---------- vídeos personalizados (URL do YouTube) ----------
  function loadVideos() {
    try {
      const raw = localStorage.getItem(VIDEOS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (_) { return {}; }
  }
  function saveVideos(v) {
    try { localStorage.setItem(VIDEOS_KEY, JSON.stringify(v)); } catch (_) {}
  }
  let videos = loadVideos();

  /** Extrai o videoId de uma URL do YouTube (suporta youtu.be, watch, shorts, embed). */
  function parseYouTubeId(input) {
    if (!input) return "";
    const s = String(input).trim();
    // já é um id puro (11 chars válidos)
    if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
    try {
      const u = new URL(s);
      if (u.hostname.includes("youtu.be")) {
        return u.pathname.replace(/^\//, "").split("/")[0];
      }
      if (u.hostname.includes("youtube.com")) {
        if (u.searchParams.get("v")) return u.searchParams.get("v");
        const parts = u.pathname.split("/").filter(Boolean);
        const idx = parts.findIndex(p => ["embed", "shorts", "v"].includes(p));
        if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
      }
    } catch (_) { /* ignore */ }
    // tenta achar 11 chars contíguos
    const m = s.match(/[A-Za-z0-9_-]{11}/);
    return m ? m[0] : "";
  }

  function youtubeSearchUrl(query) {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}&sp=EgIYAg%253D%253D`;
    // EgIYAg%3D%3D = filtro "long" (mais de 20 min). Pode ser removido se quiser tudo.
  }

  let state = loadState();

  // ---------- helpers ----------
  const allItems = () => PHASES.flatMap(p => p.items.map(it => ({ ...it, phaseId: p.id, phaseTitle: p.title })));
  const totalCount = () => allItems().length;
  const doneCount = () => Object.values(state.items).filter(v => v === "done").length;
  const doingCount = () => Object.values(state.items).filter(v => v === "doing").length;
  const isDone = n => state.items[n] === "done";
  const isDoing = n => state.items[n] === "doing";

  function nextStatus(curr) {
    if (curr === "todo") return "doing";
    if (curr === "doing") return "done";
    return "todo";
  }

  function hoursDone() {
    let h = 0;
    for (const [n, st] of Object.entries(state.items)) {
      if (st === "done") h += (HOURS_BY_N[n] || 0);
    }
    return h;
  }

  function pctDone() {
    return Math.round((doneCount() / totalCount()) * 100);
  }

  // ---------- renders ----------
  function renderHero() {
    const done = doneCount();
    const total = totalCount();
    const pad2 = n => String(n).padStart(2, "0");
    const dEl = document.getElementById("m_done");
    const tEl = document.getElementById("m_total");
    const pEl = document.getElementById("m_pct");
    const hEl = document.getElementById("m_hours");
    if (dEl) dEl.textContent = pad2(done);
    if (tEl) tEl.textContent = pad2(total);
    if (pEl) pEl.innerHTML = pctDone() + '<small>%</small>';
    if (hEl) hEl.innerHTML = hoursDone() + '<small>h</small>';
  }

  function renderResume() {
    const root = document.getElementById("resume");
    if (!root) return;
    // "doing" tem prioridade. Senão, primeiro "todo".
    const all = allItems();
    let target = all.find(it => isDoing(it.n));
    if (!target) target = all.find(it => !isDone(it.n));
    if (!target) {
      // tudo concluído
      root.innerHTML = `
        <div class="resume__card">
          <div class="resume__icon">✓</div>
          <div class="resume__text">
            <div class="resume__lbl">Parabéns</div>
            <div class="resume__title">Você concluiu todos os ${totalCount()} recursos do roteiro.</div>
          </div>
          <a class="resume__cta" href="#portfolio">Ver portfólio</a>
        </div>
      `;
      return;
    }
    const lbl = isDoing(target.n) ? "Continue de onde parou" : "Próximo passo";
    root.innerHTML = `
      <div class="resume__card">
        <div class="resume__icon">▸</div>
        <div class="resume__text">
          <div class="resume__lbl">${lbl} · #${String(target.n).padStart(2,"0")}</div>
          <div class="resume__title">${escapeHtml(target.title)}</div>
        </div>
        <a class="resume__cta" href="#item-${target.n}">Ir para o recurso →</a>
      </div>
    `;
  }

  function renderPhasesGrid() {
    const root = document.getElementById("phasesGrid");
    if (!root) return;
    root.innerHTML = PHASES.map((p, idx) => {
      const items = p.items;
      const done = items.filter(it => isDone(it.n)).length;
      const pct = Math.round((done / items.length) * 100);
      return `
        <div class="phase-card">
          <div class="phase-card__num">${escapeHtml(p.tag)} · ${escapeHtml(p.weeks)}</div>
          <div class="phase-card__name">${escapeHtml(p.title)}</div>
          <div class="phase-card__bar"><div class="phase-card__fill" style="width:${pct}%"></div></div>
          <div class="phase-card__meta">
            <span>${done}/${items.length} concluídos</span>
            <span>${escapeHtml(p.hours)}</span>
          </div>
        </div>
      `;
    }).join("");
    // overall bar
    const fill = document.getElementById("overallFill");
    const lbl = document.getElementById("overallLabel");
    if (fill) fill.style.width = pctDone() + "%";
    if (lbl) lbl.textContent = `${doneCount()} de ${totalCount()} concluídos · ${hoursDone()}h de ~${TOTAL_CORE_HOURS}h`;
  }

  function pillClass(kind) {
    switch (kind) {
      case "academy": return "item__pill--academy";
      case "github":  return "item__pill--github";
      case "docs":    return "item__pill--docs";
      case "ext":     return "item__pill--ext";
      case "exam":    return "item__pill--exam";
      default: return "";
    }
  }

  function renderTracker() {
    const root = document.getElementById("phases");
    if (!root) return;
    root.innerHTML = PHASES.map(p => `
      <section class="phase" id="${p.id}">
        <div class="phase__head">
          <div class="phase__tag">${escapeHtml(p.tag)} · ${escapeHtml(p.weeks)} · ${escapeHtml(p.hours)}</div>
          <h3 class="phase__title">${escapeHtml(p.title)}</h3>
          <p class="phase__desc">${escapeHtml(p.desc)}</p>
        </div>
        <div class="items">
          ${p.items.map(it => itemHtml(it)).join("")}
        </div>
      </section>
    `).join("");
    bindCheckboxes();
    applyFilter();
    // Dispara a busca automática de vídeos para os itens que ainda não têm.
    autoFindMissingVideos(false);
  }

  function itemHtml(it) {
    const status = state.items[it.n] || "todo";
    const checkClass = status === "done" ? "is-done" : status === "doing" ? "is-doing" : "";
    const itemClass  = status === "done" ? "is-done" : status === "doing" ? "is-doing" : "";
    const links = (it.links || []).map(l =>
      `<a class="item__link" href="${escapeAttr(l.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(l.label)}</a>`
    ).join("");
    const hours = HOURS_BY_N[it.n] || 0;
    const videoId = videos[it.n] || "";
    const videoBlock = videoBlockHtml(it, videoId);
    const hasAudiobook = !!(typeof AUDIOBOOK_TEXT !== "undefined" && AUDIOBOOK_TEXT[it.n]);
    const audiobookBtn = hasAudiobook ? `
      <button class="ab-open" data-n="${it.n}" type="button" title="Estudar este curso ouvindo em português">
        <span class="ab-open__icon" aria-hidden="true">🎧</span>
        <span class="ab-open__txt">Estudar ouvindo</span>
      </button>` : "";
    return `
      <article class="item ${itemClass}" id="item-${it.n}" data-n="${it.n}" data-status="${status}">
        <button class="check ${checkClass}" data-n="${it.n}" aria-label="Marcar status do item ${it.n}" title="Clique: a fazer → em andamento → concluído"></button>
        <div class="item__body">
          <div class="item__head">
            <span class="item__num">#${String(it.n).padStart(2,"0")}</span>
            <span class="item__pill ${pillClass(it.kind)}">${escapeHtml(it.kindLabel)}</span>
            ${audiobookBtn}
          </div>
          <h4 class="item__title">${escapeHtml(it.title)}</h4>
          <p class="item__desc">${escapeHtml(it.desc)}</p>
          <div class="item__study">⏱ ${escapeHtml(it.study)}</div>
          <div class="item__links">${links}</div>
          ${videoBlock}
        </div>
        <div class="item__meta">
          <span class="item__hours">${hours}h</span>
          <span>tempo total</span>
        </div>
      </article>
    `;
  }

  function videoBlockHtml(it, videoId) {
    const query = it.videoQuery || it.title;
    const searchUrl = youtubeSearchUrl(query);
    if (videoId) {
      const thumb = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
      const watch = `https://www.youtube.com/watch?v=${videoId}`;
      return `
        <div class="video" data-n="${it.n}">
          <div class="video__head">
            <span class="video__lbl">▸ Aula em português</span>
            <div class="video__actions">
              <a class="video__action" href="${escapeAttr(watch)}" target="_blank" rel="noopener noreferrer">Abrir no YouTube</a>
              <button class="video__action video__refresh" data-n="${it.n}" type="button" title="Buscar outro vídeo">↻ Trocar</button>
              <button class="video__action video__remove" data-n="${it.n}" type="button">Remover</button>
            </div>
          </div>
          <div class="video__player" data-video-id="${escapeAttr(videoId)}" tabindex="0" role="button" aria-label="Reproduzir vídeo">
            <img class="video__thumb" loading="lazy" src="${escapeAttr(thumb)}" alt="" />
            <div class="video__play"><span>▶</span></div>
          </div>
        </div>
      `;
    }
    // Sem vídeo: card compacto, sem placeholder gigante.
    return `
      <div class="video video--empty" data-n="${it.n}" data-query="${escapeAttr(query)}">
        <div class="video__compact">
          <span class="video__compact-icon" aria-hidden="true">▶</span>
          <div class="video__compact-text">
            <span class="video__compact-title">Aula em português</span>
            <span class="video__compact-sub video__compact-sub--loading">Buscando automaticamente…</span>
          </div>
          <div class="video__compact-actions">
            <a class="video__action" href="${escapeAttr(searchUrl)}" target="_blank" rel="noopener noreferrer">Buscar no YouTube</a>
            <button class="video__action video__refresh" data-n="${it.n}" type="button" title="Tentar de novo">↻</button>
          </div>
        </div>
        <details class="video__manual">
          <summary>Cole a URL de um vídeo específico</summary>
          <div class="video__form">
            <div class="video__row">
              <input type="text" class="video__input" data-n="${it.n}" placeholder="https://www.youtube.com/watch?v=..." />
              <button class="video__save" data-n="${it.n}" type="button">Fixar</button>
            </div>
          </div>
        </details>
      </div>
    `;
  }

  function bindCheckboxes() {
    document.querySelectorAll(".check").forEach(btn => {
      btn.addEventListener("click", () => {
        const n = btn.getAttribute("data-n");
        const curr = state.items[n] || "todo";
        const nxt = nextStatus(curr);
        state.items[n] = nxt;
        // Detecta fases recém-concluídas para guardar a data do badge.
        updatePhaseCompletionDates();
        saveState(state);
        rerenderAll();
      });
    });
    bindVideoControls();
  }

  function bindVideoControls() {
    // Salvar URL fixada
    document.querySelectorAll(".video__save").forEach(btn => {
      btn.addEventListener("click", () => {
        const n = btn.getAttribute("data-n");
        const input = document.querySelector(`.video__input[data-n="${n}"]`);
        if (!input) return;
        const id = parseYouTubeId(input.value);
        if (!id) {
          toast("URL do YouTube inválida.", true);
          return;
        }
        videos[n] = id;
        saveVideos(videos);
        rerenderAll();
        toast("Aula fixada.");
      });
    });
    // Remover URL
    document.querySelectorAll(".video__remove").forEach(btn => {
      btn.addEventListener("click", () => {
        const n = btn.getAttribute("data-n");
        delete videos[n];
        saveVideos(videos);
        rerenderAll();
        toast("Aula removida.");
      });
    });
    // Trocar (refazer busca automática, ignorando cache)
    document.querySelectorAll(".video__refresh").forEach(btn => {
      btn.addEventListener("click", () => {
        const n = btn.getAttribute("data-n");
        delete videos[n];
        saveVideos(videos);
        autoFindMissingVideos(true);
        rerenderAll();
        toast("Buscando outro vídeo…");
      });
    });
    // Lazy-load do iframe (clique no thumbnail)
    document.querySelectorAll(".video__player").forEach(player => {
      const trigger = () => {
        const id = player.getAttribute("data-video-id");
        if (!id || player.classList.contains("is-loaded")) return;
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&hl=pt-BR&cc_lang_pref=pt-BR&cc_load_policy=1`;
        iframe.title = "Aula em português";
        iframe.loading = "lazy";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        player.innerHTML = "";
        player.appendChild(iframe);
        player.classList.add("is-loaded");
      };
      player.addEventListener("click", trigger);
      player.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); trigger(); }
      });
    });
    // Submit do input com Enter
    document.querySelectorAll(".video__input").forEach(input => {
      input.addEventListener("keydown", e => {
        if (e.key === "Enter") {
          e.preventDefault();
          const n = input.getAttribute("data-n");
          const btn = document.querySelector(`.video__save[data-n="${n}"]`);
          if (btn) btn.click();
        }
      });
    });
  }

  // ---------- Auto-busca de vídeos via Piped (espelho do YouTube com CORS aberto) ----------
  // Usamos múltiplos endpoints comunitários como fallback. Se todos falharem,
  // o bloco continua usável manualmente com o link de busca.
  const PIPED_ENDPOINTS = [
    "https://pipedapi.kavin.rocks",
    "https://api.piped.yt",
    "https://pipedapi.adminforge.de",
    "https://pipedapi.r4fo.com",
    "https://pipedapi.darkness.services"
  ];

  async function searchFirstVideo(query) {
    const q = encodeURIComponent(query + " português");
    for (const base of PIPED_ENDPOINTS) {
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 6000);
        const r = await fetch(`${base}/search?q=${q}&filter=videos`, { signal: ctrl.signal });
        clearTimeout(t);
        if (!r.ok) continue;
        const data = await r.json();
        const items = (data && data.items) || [];
        // Prefere vídeos longos (>5 min) e que não sejam shorts
        const candidates = items
          .filter(i => i && i.url && /\/watch\?v=/.test(i.url))
          .filter(i => !i.isShort)
          .sort((a, b) => (b.duration || 0) - (a.duration || 0));
        const pick = candidates[0] || items.find(i => i && i.url && /\/watch\?v=/.test(i.url));
        if (pick) {
          const m = pick.url.match(/v=([A-Za-z0-9_-]{11})/);
          if (m) return m[1];
        }
      } catch (_) { /* tenta próximo */ }
    }
    return null;
  }

  let autoFindRunning = false;
  async function autoFindMissingVideos(force) {
    if (autoFindRunning) return;
    autoFindRunning = true;
    try {
      const all = allItems();
      for (const it of all) {
        if (videos[it.n] && !force) continue;
        const block = document.querySelector(`.video--empty[data-n="${it.n}"]`);
        if (!block) continue;
        const query = it.videoQuery || it.title;
        try {
          const id = await searchFirstVideo(query);
          if (id) {
            videos[it.n] = id;
            saveVideos(videos);
            updateOneVideoBlock(it, id);
          } else {
            markVideoBlockFailed(it.n);
          }
        } catch (_) {
          markVideoBlockFailed(it.n);
        }
        // pausa pequena entre buscas
        await new Promise(r => setTimeout(r, 250));
      }
    } finally {
      autoFindRunning = false;
    }
  }

  function updateOneVideoBlock(it, videoId) {
    const block = document.querySelector(`.video[data-n="${it.n}"]`);
    if (!block) return;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = videoBlockHtml(it, videoId).trim();
    const fresh = wrapper.firstElementChild;
    block.replaceWith(fresh);
    bindVideoControls();
  }

  function markVideoBlockFailed(n) {
    const block = document.querySelector(`.video--empty[data-n="${n}"]`);
    if (!block) return;
    const sub = block.querySelector(".video__compact-sub");
    if (sub) {
      sub.classList.remove("video__compact-sub--loading");
      sub.textContent = "Sem resultado automático. Use os botões ao lado.";
    }
  }

  function updatePhaseCompletionDates() {
    PHASES.forEach(p => {
      const allDone = p.items.every(it => state.items[it.n] === "done");
      if (allDone && !state.phasesCompletedAt[p.id]) {
        state.phasesCompletedAt[p.id] = new Date().toISOString();
      } else if (!allDone && state.phasesCompletedAt[p.id]) {
        // Se voltou atrás em algum item, limpa a data.
        state.phasesCompletedAt[p.id] = null;
      }
    });
  }

  // ---------- badges ----------
  function renderBadges() {
    const root = document.getElementById("badgesGrid");
    if (!root) return;
    root.innerHTML = PHASES.map(p => {
      const items = p.items;
      const done = items.filter(it => isDone(it.n)).length;
      const total = items.length;
      const pct = Math.round((done / total) * 100);
      const earned = done === total;
      const inProgress = !earned && done > 0;
      const cls = earned ? "is-earned" : inProgress ? "is-progress" : "is-locked";
      const completedAt = state.phasesCompletedAt[p.id];
      const dateStr = completedAt ? `Conquistado em ${formatDate(completedAt)}` : "";
      const medal = earned ? "★" : inProgress ? p.tag.replace(/[^0-9]/g, "") : "?";
      return `
        <div class="badge ${cls}" data-phase="${escapeAttr(p.id)}">
          <div class="badge__medal">${escapeHtml(medal)}</div>
          <div class="badge__phase">${escapeHtml(p.tag)}</div>
          <div class="badge__name">${escapeHtml(p.title)}</div>
          <div class="badge__bar"><div class="badge__fill" style="width:${pct}%"></div></div>
          <div class="badge__progress">${done}/${total} · ${pct}%</div>
          ${earned ? `<div class="badge__date">${escapeHtml(dateStr)}</div>` : ""}
        </div>
      `;
    }).join("");
  }

  function formatDate(iso) {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
    } catch (_) { return iso; }
  }

  function renderTimeline() {
    const root = document.getElementById("timeline");
    if (!root) return;
    root.innerHTML = TIMELINE.map(t => `
      <div class="tl-card">
        <div class="tl-card__weeks">${escapeHtml(t.weeks)}</div>
        <div class="tl-card__title">${escapeHtml(t.title)}</div>
        <div class="tl-card__hours">${escapeHtml(t.hours)}</div>
      </div>
    `).join("");
  }

  // ---------- portfolio ----------
  function renderPortfolio() {
    const root = document.getElementById("portfolioBody");
    const ghSection = document.getElementById("githubSection");
    if (!root) return;

    // bloqueado até concluir o curso 1
    if (!isDone(1)) {
      const total = 1;
      const done = isDone(1) ? 1 : 0;
      root.innerHTML = `
        <div class="locked">
          <div class="locked__icon">🔒</div>
          <h3 class="locked__title">Portfólio bloqueado</h3>
          <p class="locked__sub">
            Conclua o primeiro curso (<strong>AI Capabilities and Limitations</strong>) para desbloquear esta seção.
            Conforme você concluir cada curso, novos cards de conhecimento aparecem aqui automaticamente.
          </p>
          <div class="locked__progress">${done} de ${total} requisito concluído</div>
          <a class="locked__cta" href="#item-1">Ir para o primeiro curso →</a>
        </div>
      `;
      if (ghSection) ghSection.classList.add("hidden");
      return;
    }
    if (ghSection) ghSection.classList.remove("hidden");

    // Filtra cards que tenham ao menos 1 require concluído.
    const visibleCards = PORTFOLIO_CARDS.filter(card =>
      card.requires.some(n => isDone(n))
    );

    if (visibleCards.length === 0) {
      // Caso raro: curso 1 concluído mas nenhum card cobre; tratamos como portfolio vazio.
      root.innerHTML = `
        <div class="locked">
          <div class="locked__icon">✦</div>
          <h3 class="locked__title">Comece a construir seu portfólio</h3>
          <p class="locked__sub">Marque mais cursos como concluídos para desbloquear cards do portfólio.</p>
        </div>
      `;
      return;
    }

    root.innerHTML = `<div class="portfolio-grid">${visibleCards.map(portfolioCardHtml).join("")}</div>`;
  }

  function portfolioCardHtml(card) {
    const items = card.requires.map(n => {
      const meta = allItems().find(it => it.n === n);
      const done = isDone(n);
      return { n, title: meta ? meta.title : `#${n}`, done };
    });
    const doneCnt = items.filter(i => i.done).length;
    const pct = Math.round((doneCnt / items.length) * 100);
    return `
      <article class="portfolio-card" data-color="${escapeAttr(card.color)}">
        <div class="portfolio-card__icon">${escapeHtml(card.icon)}</div>
        <h4 class="portfolio-card__title">${escapeHtml(card.title)}</h4>
        <p class="portfolio-card__sub">${escapeHtml(card.sub)}</p>
        <ul class="portfolio-card__list">
          ${items.map(i => `<li class="${i.done ? "" : "is-pending"}">${escapeHtml(i.title)}</li>`).join("")}
        </ul>
        <div class="portfolio-card__progress"><div class="portfolio-card__progress-fill" style="width:${pct}%"></div></div>
        <div class="portfolio-card__progress-lbl">${doneCnt} de ${items.length} cursos concluídos · ${pct}%</div>
      </article>
    `;
  }

  // ---------- filters ----------
  function applyFilter() {
    const f = state.filter;
    document.querySelectorAll(".item").forEach(el => {
      const st = el.getAttribute("data-status") || "todo";
      let show = true;
      if (f === "todo")  show = (st === "todo");
      if (f === "doing") show = (st === "doing");
      if (f === "done")  show = (st === "done");
      el.classList.toggle("hidden", !show);
    });
    document.querySelectorAll(".chip").forEach(b => {
      b.classList.toggle("is-active", b.getAttribute("data-filter") === f);
    });
  }
  function bindFilters() {
    document.querySelectorAll(".chip").forEach(b => {
      b.addEventListener("click", () => {
        state.filter = b.getAttribute("data-filter") || "all";
        saveState(state);
        applyFilter();
      });
    });
  }

  // ---------- reset ----------
  function bindReset() {
    const btn = document.getElementById("resetBtn");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const ok = confirm("Tem certeza que deseja resetar todo o seu progresso? Esta ação não pode ser desfeita.");
      if (!ok) return;
      state = defaultState();
      saveState(state);
      rerenderAll();
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast("Progresso resetado.");
    });
  }

  // ---------- export / import JSON ----------
  function bindExportImport() {
    const exportBtn = document.getElementById("exportBtn");
    const importBtn = document.getElementById("importBtn");
    const importInput = document.getElementById("importInput");

    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        const payload = {
          app: "anthropic-journey",
          version: 2,
          exportedAt: new Date().toISOString(),
          state,
          videos
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        const stamp = new Date().toISOString().slice(0, 10);
        a.href = url;
        a.download = `anthropic-journey-${stamp}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast("Progresso exportado.");
      });
    }

    if (importBtn && importInput) {
      importBtn.addEventListener("click", () => importInput.click());
      importInput.addEventListener("change", () => {
        const file = importInput.files && importInput.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const data = JSON.parse(String(reader.result || ""));
            const incoming = data && data.state ? data.state : data;
            if (!incoming || typeof incoming !== "object" || !incoming.items) {
              throw new Error("Arquivo inválido");
            }
            const def = defaultState();
            state = {
              ...def,
              ...incoming,
              items: { ...def.items, ...(incoming.items || {}) },
              phasesCompletedAt: { ...def.phasesCompletedAt, ...(incoming.phasesCompletedAt || {}) }
            };
            if (data && data.videos && typeof data.videos === "object") {
              videos = { ...videos, ...data.videos };
              saveVideos(videos);
            }
            updatePhaseCompletionDates();
            saveState(state);
            rerenderAll();
            toast("Progresso importado com sucesso.");
          } catch (err) {
            toast("Não foi possível importar este arquivo.", true);
          } finally {
            importInput.value = "";
          }
        };
        reader.readAsText(file);
      });
    }
  }

  // ---------- toast ----------
  let toastTimer;
  function toast(msg, isError) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.style.background = isError ? "#ff453a" : "";
    el.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-show"), 2400);
  }

  // ---------- GitHub integration ----------
  function loadGithubUser() {
    try { return localStorage.getItem(GITHUB_KEY) || ""; } catch (_) { return ""; }
  }
  function saveGithubUser(u) {
    try {
      if (u) localStorage.setItem(GITHUB_KEY, u);
      else localStorage.removeItem(GITHUB_KEY);
    } catch (_) { /* ignore */ }
  }

  function bindGithub() {
    const form = document.getElementById("githubForm");
    const input = document.getElementById("githubInput");
    const clearBtn = document.getElementById("githubClear");
    if (!form || !input) return;

    const saved = loadGithubUser();
    if (saved) {
      input.value = saved;
      fetchAndRenderRepos(saved);
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = (input.value || "").trim().replace(/^@/, "");
      if (!user) return;
      saveGithubUser(user);
      fetchAndRenderRepos(user);
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        saveGithubUser("");
        input.value = "";
        document.getElementById("githubGrid").innerHTML = "";
        document.getElementById("githubStatus").textContent = "";
        toast("GitHub desconectado.");
      });
    }
  }

  function fetchAndRenderRepos(username) {
    const status = document.getElementById("githubStatus");
    const grid = document.getElementById("githubGrid");
    if (!status || !grid) return;
    status.classList.remove("is-error");
    status.textContent = `Buscando repositórios públicos de @${username}…`;
    grid.innerHTML = "";

    const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`;
    fetch(url, { headers: { "Accept": "application/vnd.github+json" } })
      .then(r => {
        if (!r.ok) throw new Error(r.status === 404 ? "Usuário não encontrado." : `Erro ${r.status}`);
        return r.json();
      })
      .then(repos => {
        if (!Array.isArray(repos) || repos.length === 0) {
          status.textContent = `@${username} não tem repositórios públicos.`;
          return;
        }
        const visible = repos.filter(r => !r.fork && !r.archived).slice(0, 12);
        status.textContent = `${visible.length} repositórios de @${username}`;
        grid.innerHTML = visible.map(repoCardHtml).join("");
      })
      .catch(err => {
        status.classList.add("is-error");
        status.textContent = err.message || "Não foi possível carregar os repositórios.";
      });
  }

  function repoCardHtml(r) {
    const lang = r.language || "—";
    const desc = r.description || "Sem descrição.";
    const updated = r.updated_at ? new Date(r.updated_at).toLocaleDateString("pt-BR") : "";
    return `
      <article class="repo-card">
        <div class="repo-card__head">
          <h4 class="repo-card__name"><a href="${escapeAttr(r.html_url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(r.name)}</a></h4>
          <span class="repo-card__lang">${escapeHtml(lang)}</span>
        </div>
        <p class="repo-card__desc">${escapeHtml(desc)}</p>
        <div class="repo-card__meta">
          <span>★ ${r.stargazers_count || 0}</span>
          <span>⑂ ${r.forks_count || 0}</span>
          <span>↻ ${escapeHtml(updated)}</span>
        </div>
      </article>
    `;
  }

  // ---------- reveal on scroll ----------
  // (Removido. As seções agora usam animação CSS direta para evitar
  //  estados inconsistentes quando o usuário entra direto via #hash
  //  ou quando o conteúdo é renderizado dinamicamente.)
  function setupReveal() { /* no-op intencional */ }

  // ---------- safe HTML ----------
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }
  function escapeAttr(s) { return escapeHtml(s); }

  // ---------- main ----------
  function rerenderAll() {
    renderHero();
    renderResume();
    renderPhasesGrid();
    renderTracker();
    renderBadges();
    renderPortfolio();
  }

  // ---------- Audiobook (estudo em áudio por curso, em PT-BR) ----------
  const ABPREFS_KEY = "anthropic-journey-audiobook-v1";
  const abPrefs = (() => {
    try { return JSON.parse(localStorage.getItem(ABPREFS_KEY) || "{}"); }
    catch (_) { return {}; }
  })();
  function saveAbPrefs() {
    try { localStorage.setItem(ABPREFS_KEY, JSON.stringify(abPrefs)); } catch (_) {}
  }

  const ab = {
    n: null,
    sections: [],
    chunks: [],   // { text, sectionIdx, sectionTitle }
    idx: 0,
    playing: false,
    paused: false
  };

  /** Quebra o conteúdo em frases curtas, preservando a relação com a seção. */
  function buildAbChunks(sections) {
    const out = [];
    sections.forEach((sec, sIdx) => {
      // anuncia o título da seção como primeira frase do bloco
      out.push({ text: sec.title + ".", sectionIdx: sIdx, sectionTitle: sec.title, isHeader: true });
      const sentences = String(sec.body || "")
        .replace(/\s+/g, " ")
        .split(/(?<=[.!?])\s+/)
        .filter(Boolean);
      let buf = "";
      const max = 220;
      for (const s of sentences) {
        if ((buf + " " + s).trim().length > max) {
          if (buf) out.push({ text: buf.trim(), sectionIdx: sIdx, sectionTitle: sec.title });
          buf = s;
        } else {
          buf = buf ? buf + " " + s : s;
        }
      }
      if (buf) out.push({ text: buf.trim(), sectionIdx: sIdx, sectionTitle: sec.title });
    });
    return out;
  }

  function loadVoices() {
    if (!("speechSynthesis" in window)) return [];
    return window.speechSynthesis.getVoices() || [];
  }
  function ptVoices() {
    return loadVoices().filter(v => /^pt/i.test(v.lang)).sort((a, b) => {
      // PT-BR primeiro
      const aBR = /pt[-_]BR/i.test(a.lang) ? 0 : 1;
      const bBR = /pt[-_]BR/i.test(b.lang) ? 0 : 1;
      return aBR - bBR;
    });
  }
  function pickVoice() {
    const list = ptVoices();
    if (!list.length) return null;
    if (abPrefs.voice) {
      const found = list.find(v => v.name === abPrefs.voice);
      if (found) return found;
    }
    return list[0];
  }

  function openAudiobook(n) {
    const it = allItems().find(x => x.n === Number(n));
    if (!it) return;
    const sections = AUDIOBOOK_TEXT[Number(n)] || [{ title: it.title, body: it.desc }];
    ab.n = Number(n);
    ab.sections = sections;
    ab.chunks = buildAbChunks(sections);
    ab.idx = 0;
    ab.playing = false;
    ab.paused = false;

    // título
    const title = document.getElementById("abTitle");
    const kicker = document.getElementById("abKicker");
    if (title) title.textContent = it.title;
    if (kicker) kicker.textContent = `Curso ${String(n).padStart(2, "0")} · estudo em áudio`;

    // corpo (texto completo)
    renderAudiobookBody();

    // voz e velocidade
    populateVoiceSelect();
    const rateSel = document.getElementById("abRate");
    if (rateSel) rateSel.value = String(abPrefs.rate || 1);

    // metadados
    setAbMeta("Pronto para ouvir.");

    // abre modal
    const modal = document.getElementById("audiobook");
    if (modal) {
      modal.hidden = false;
      requestAnimationFrame(() => modal.classList.add("is-open"));
      document.body.style.overflow = "hidden";
    }
    updateAbUi();
  }

  function closeAudiobook() {
    stopAb(true);
    const modal = document.getElementById("audiobook");
    if (modal) {
      modal.classList.remove("is-open");
      setTimeout(() => { modal.hidden = true; }, 280);
    }
    document.body.style.overflow = "";
  }

  function renderAudiobookBody() {
    const body = document.getElementById("abBody");
    if (!body) return;
    body.innerHTML = ab.sections.map((sec, sIdx) => `
      <section class="ab-section" data-s="${sIdx}">
        <h3 class="ab-section__title">${escapeHtml(sec.title)}</h3>
        <p class="ab-section__body">${escapeHtml(sec.body)}</p>
      </section>
    `).join("");
  }

  function populateVoiceSelect() {
    const sel = document.getElementById("abVoice");
    if (!sel) return;
    const list = ptVoices();
    if (!list.length) {
      sel.innerHTML = `<option>Nenhuma voz em português detectada</option>`;
      sel.disabled = true;
      return;
    }
    sel.disabled = false;
    sel.innerHTML = list.map(v => {
      const sel2 = abPrefs.voice === v.name ? "selected" : "";
      return `<option value="${escapeAttr(v.name)}" ${sel2}>${escapeHtml(v.name)} (${escapeHtml(v.lang)})</option>`;
    }).join("");
  }

  function speakAbNext() {
    if (!ab.playing || ab.idx >= ab.chunks.length) {
      stopAb();
      return;
    }
    const chunk = ab.chunks[ab.idx];
    const u = new SpeechSynthesisUtterance(chunk.text);
    const v = pickVoice();
    if (v) u.voice = v;
    u.lang = "pt-BR";
    u.rate = abPrefs.rate || 1;
    u.pitch = 1;
    u.onend = () => {
      ab.idx++;
      updateAbUi();
      if (ab.playing) speakAbNext();
    };
    u.onerror = (e) => {
      if (e && e.error === "canceled") return;
      ab.idx++;
      if (ab.playing) speakAbNext();
    };
    window.speechSynthesis.speak(u);
    updateAbUi();
  }

  function playAb() {
    if (!("speechSynthesis" in window)) {
      toast("Seu navegador não suporta leitura por voz.", true);
      return;
    }
    if (ab.paused) {
      window.speechSynthesis.resume();
      ab.paused = false;
      updateAbUi();
      return;
    }
    if (ab.playing) {
      // já tocando: pausa
      window.speechSynthesis.pause();
      ab.paused = true;
      updateAbUi();
      return;
    }
    ab.playing = true;
    ab.paused = false;
    if (ab.idx >= ab.chunks.length) ab.idx = 0;
    speakAbNext();
  }

  function stopAb(silent) {
    try { window.speechSynthesis.cancel(); } catch (_) {}
    ab.playing = false;
    ab.paused = false;
    if (!silent) ab.idx = 0;
    updateAbUi();
  }

  function jumpAb(delta) {
    const newIdx = Math.max(0, Math.min(ab.chunks.length - 1, ab.idx + delta));
    if (newIdx === ab.idx) return;
    ab.idx = newIdx;
    if (ab.playing) {
      try { window.speechSynthesis.cancel(); } catch (_) {}
      speakAbNext();
    } else {
      updateAbUi();
    }
  }

  function setAbMeta(msg) {
    const m = document.getElementById("abMeta");
    if (m) m.textContent = msg;
  }

  function updateAbUi() {
    const btn = document.getElementById("abPlay");
    const prog = document.getElementById("abProgress");
    if (btn) {
      const isPlaying = ab.playing && !ab.paused;
      btn.textContent = isPlaying ? "⏸" : "▶";
      btn.setAttribute("aria-label", isPlaying ? "Pausar" : "Tocar");
    }
    if (prog) {
      const total = ab.chunks.length || 1;
      const pct = Math.round((ab.idx / total) * 100);
      prog.style.width = pct + "%";
    }
    // realça a seção em andamento
    const body = document.getElementById("abBody");
    if (body && ab.chunks.length) {
      const curr = ab.chunks[Math.min(ab.idx, ab.chunks.length - 1)];
      body.querySelectorAll(".ab-section").forEach(el => el.classList.remove("is-current"));
      const el = body.querySelector(`.ab-section[data-s="${curr.sectionIdx}"]`);
      if (el) {
        el.classList.add("is-current");
        // scroll suave dentro do modal
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      const total = ab.chunks.length;
      setAbMeta(`${curr.sectionTitle} · ${ab.idx + 1} de ${total}`);
    }
  }

  function bindAudiobook() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        populateVoiceSelect();
      };
    }
    // botões inline em cada item
    document.addEventListener("click", e => {
      const btn = e.target.closest && e.target.closest(".ab-open");
      if (!btn) return;
      e.preventDefault();
      openAudiobook(btn.getAttribute("data-n"));
    });

    // controles do modal
    const modal = document.getElementById("audiobook");
    if (modal) {
      modal.addEventListener("click", e => {
        if (e.target.matches("[data-close]")) closeAudiobook();
      });
      document.addEventListener("keydown", e => {
        if (modal.hidden) return;
        if (e.key === "Escape") closeAudiobook();
        if (e.key === " " && !["INPUT","SELECT","TEXTAREA"].includes(document.activeElement.tagName)) {
          e.preventDefault();
          playAb();
        }
      });
    }
    document.getElementById("abPlay")?.addEventListener("click", playAb);
    document.getElementById("abBack")?.addEventListener("click", () => jumpAb(-1));
    document.getElementById("abFwd")?.addEventListener("click", () => jumpAb(1));
    document.getElementById("abRate")?.addEventListener("change", e => {
      abPrefs.rate = parseFloat(e.target.value) || 1;
      saveAbPrefs();
      if (ab.playing && !ab.paused) {
        try { window.speechSynthesis.cancel(); } catch (_) {}
        speakAbNext();
      }
    });
    document.getElementById("abVoice")?.addEventListener("change", e => {
      abPrefs.voice = e.target.value;
      saveAbPrefs();
      if (ab.playing && !ab.paused) {
        try { window.speechSynthesis.cancel(); } catch (_) {}
        speakAbNext();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    // garante coerência das datas ao carregar
    updatePhaseCompletionDates();
    rerenderAll();
    renderTimeline();
    bindFilters();
    bindReset();
    bindExportImport();
    bindGithub();
    bindTheme();
    bindMagnetic();
    bindAudiobook();
    setupReveal();
    bindAuthIntegration();
  });

  // ---------- integração com backend (HostGator) ----------
  // Se a API existir e o usuário estiver logado, sincroniza o progresso.
  // Sem backend (GitHub Pages), tudo continua só no localStorage.
  async function bindAuthIntegration() {
    if (!window.AJ) return;
    let backend = false;
    try { backend = await window.AJ.hasBackend(); } catch (_) {}
    if (!backend) {
      // modo standalone — esconde botões de login
      document.getElementById("loginBtn")?.setAttribute("hidden", "");
      document.getElementById("logoutBtn")?.setAttribute("hidden", "");
      document.getElementById("adminLink")?.setAttribute("hidden", "");
      return;
    }

    const me = await window.AJ.whoami();
    if (!me || me.status !== "approved") {
      document.getElementById("loginBtn")?.removeAttribute("hidden");
      return;
    }

    // Logado: mostra usuário e troca botões
    const navUser = document.getElementById("navUser");
    if (navUser) {
      navUser.textContent = me.name;
      navUser.hidden = false;
    }
    document.getElementById("loginBtn")?.setAttribute("hidden", "");
    document.getElementById("logoutBtn")?.removeAttribute("hidden");
    if (me.role === "admin") document.getElementById("adminLink")?.removeAttribute("hidden");

    document.getElementById("logoutBtn")?.addEventListener("click", () => window.AJ.logout());

    // Carrega progresso salvo no servidor (sobrescreve local)
    try {
      const r = await window.AJ.api("progress.get");
      if (r.state && r.state.items) {
        const def = defaultState();
        state = {
          ...def,
          ...r.state,
          items: { ...def.items, ...(r.state.items || {}) },
          phasesCompletedAt: { ...def.phasesCompletedAt, ...(r.state.phasesCompletedAt || {}) }
        };
        if (!["all","todo","doing","done"].includes(state.filter)) state.filter = "all";
        saveState(state);
        rerenderAll();
      }
    } catch (e) { /* segue com o local */ }

    // Toda vez que salvar, manda também para o servidor (debounce 800ms)
    let pushTimer = null;
    const _saveState = saveState;
    window.__pushProgress = () => {
      clearTimeout(pushTimer);
      pushTimer = setTimeout(async () => {
        try { await window.AJ.api("progress.save", { method: "POST", body: { state } }); }
        catch (_) { /* tudo bem, está no local também */ }
      }, 800);
    };
    // Patch: hook após cada saveState chamando o push
    saveState = function(s) {
      _saveState(s);
      if (window.__pushProgress) window.__pushProgress();
    };
  }

  // ---------- theme toggle ----------
  const THEME_KEY = "anthropic-journey-theme";
  function bindTheme() {
    const btn = document.getElementById("themeBtn");
    const saved = (() => { try { return localStorage.getItem(THEME_KEY); } catch (_) { return null; } })();
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ? "dark" : "light");
    applyTheme(initial);
    if (btn) {
      btn.addEventListener("click", () => {
        const curr = document.documentElement.getAttribute("data-theme") || "light";
        const next = curr === "dark" ? "light" : "dark";
        applyTheme(next);
        try { localStorage.setItem(THEME_KEY, next); } catch (_) {}
      });
    }
  }
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "dark" ? "#141413" : "#F0EEE6");
  }

  // ---------- magnetic buttons ----------
  function bindMagnetic() {
    if (window.matchMedia && window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.querySelectorAll("[data-magnetic]").forEach(el => {
      const strength = 0.25;
      el.addEventListener("mousemove", e => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }
})();
