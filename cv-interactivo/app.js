/* Motor mínimo de hipertexto al estilo Twine. Sin dependencias. */
(() => {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const store = {
    get(k, fb) { try { return JSON.parse(localStorage.getItem(k)) ?? fb; } catch { return fb; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };

  const browserLang = (navigator.language || "en").toLowerCase().startsWith("es") ? "es" : "en";
  const state = {
    lang: store.get("cv.lang", browserLang),
    visited: new Set(store.get("cv.visited", [])),
    trail: [],
    current: null,
  };

  const els = {
    passage: $("#passage"), trail: $("#trail"), counter: $("#counter"),
    back: $("#btn-back"), lang: $("#btn-lang"), mapBtn: $("#btn-map"),
    map: $("#map"), mapClose: $("#btn-map-close"), mapSvg: $("#map-svg"),
  };

  const ids = Object.keys(STORY.en);
  const t = (k) => UI[state.lang][k];
  const P = (id) => STORY[state.lang][id];

  /* ---------- Texto ---------- */
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function inline(src) {
    return esc(src)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\[\[(.+?)-&gt;([\w-]+)\]\]/g, (_, label, to) =>
        `<a class="link${state.visited.has(to) ? " seen" : ""}" href="#/${to}">${label}</a>`);
  }
  const paragraphs = (body) =>
    body.trim() ? body.trim().split(/\n\s*\n/).map((p) => `<p>${inline(p)}</p>`).join("") : "";

  /* ---------- Render ---------- */
  function render(id, { fromHistory = false } = {}) {
    if (!STORY.en[id]) id = "start";
    const p = P(id);

    if (!fromHistory || state.trail[state.trail.length - 1] !== id) {
      const i = state.trail.lastIndexOf(id);
      if (fromHistory && i !== -1) state.trail = state.trail.slice(0, i + 1);
      else state.trail.push(id);
    }
    state.current = id;
    state.visited.add(id);
    store.set("cv.visited", [...state.visited]);

    const photo = p.photo ? `
      <figure class="portrait">
        <div class="portrait-frame">
          <img src="assets/foto.jpg" alt="${t("photoAlt")}" onerror="this.parentElement.classList.add('no-photo');this.remove()" />
          <span class="initials">JM</span>
        </div>
      </figure>` : "";

    const bullets = p.bullets?.length
      ? `<ul class="bullets">${p.bullets.map((b) => `<li>${inline(b)}</li>`).join("")}</ul>` : "";

    const contact = p.contact ? `
      <div class="contact">
        <div class="contact-row">
          <span class="k">${t("email")}</span>
          <a href="mailto:${CONTACT.email}">${CONTACT.email}</a>
          <button class="copy" type="button" data-copy="${CONTACT.email}">${t("copy")}</button>
        </div>
        <div class="contact-row">
          <span class="k">${t("phone")}</span>
          <a href="tel:${CONTACT.phone.replace(/\s/g, "")}">${CONTACT.phone}</a>
          <button class="copy" type="button" data-copy="${CONTACT.phone}">${t("copy")}</button>
        </div>
        <a class="download" href="${CONTACT.pdf}" download>${t("download")} <span aria-hidden="true">↓</span></a>
      </div>` : "";

    const choices = p.choices.map((c, i) => {
      const seen = c.to !== "@map" && state.visited.has(c.to);
      const href = c.to === "@map" ? "#" : `#/${c.to}`;
      return `<li><a class="choice${seen ? " seen" : ""}" href="${href}" data-to="${c.to}">
        <span class="num">${String(i + 1).padStart(2, "0")}</span>
        <span class="label">${esc(c.label)}</span>
        ${c.note ? `<span class="note">${esc(c.note)}</span>` : ""}
        <span class="arrow" aria-hidden="true">→</span>
      </a></li>`;
    }).join("");

    els.passage.classList.remove("in");
    els.passage.innerHTML = `
      <header class="p-head">
        <span class="tag">::${id}</span>
        <span class="meta">${esc(p.meta || "")}</span>
      </header>
      ${photo}
      <h1 class="${p.photo ? "big" : ""}">${esc(p.title)}</h1>
      <div class="body">${paragraphs(p.body)}${bullets}${contact}</div>
      <ol class="choices">${choices}</ol>`;
    void els.passage.offsetWidth;
    els.passage.classList.add("in");

    document.title = id === "start" ? "Javier Maldonado Reig — CV" : `${p.title} · Javier Maldonado Reig`;
    renderTrail();
    renderCounter();
    els.back.disabled = state.trail.length < 2;
    if (els.map.open) drawMap();
  }

  function renderTrail() {
    const last = state.trail.slice(-5);
    const cut = state.trail.length > 5;
    els.trail.innerHTML = (cut ? `<span class="crumb more">…</span>` : "") + last.map((id, i) => {
      const isLast = i === last.length - 1;
      return isLast
        ? `<span class="crumb current">${esc(P(id).title)}</span>`
        : `<a class="crumb" href="#/${id}">${esc(P(id).title)}</a>`;
    }).join(`<span class="sep">/</span>`);
  }

  function renderCounter() {
    els.counter.textContent = `${state.visited.size} / ${ids.length}`;
  }

  /* ---------- Mapa ---------- */
  function linksOf(id) {
    const p = STORY.en[id];
    const out = new Set(p.choices.map((c) => c.to).filter((x) => x !== "@map"));
    for (const m of p.body.matchAll(/\[\[.+?->([\w-]+)\]\]/g)) out.add(m[1]);
    return [...out];
  }

  const HUBS = new Set(["start", "experience", "education"]);
  function drawMap() {
    const W = 120, H = 38;
    const svg = els.mapSvg;
    const xs = Object.values(MAP_POS).map((p) => p[0]);
    const ys = Object.values(MAP_POS).map((p) => p[1]);
    const vw = Math.max(...xs) + W + 20, vh = Math.max(...ys) + H + 20;
    svg.setAttribute("viewBox", `-10 -10 ${vw} ${vh}`);

    let edges = "", nodes = "";
    const drawn = new Set();
    for (const a of ids) {
      for (const b of linksOf(a)) {
        const key = [a, b].sort().join("|");
        // Los enlaces de "volver" a los índices se omiten para que el mapa respire
        if (a !== "start" && HUBS.has(b)) continue;
        if (drawn.has(key) || !MAP_POS[b]) continue;
        drawn.add(key);
        const [x1, y1] = MAP_POS[a], [x2, y2] = MAP_POS[b];
        const ax = x1 + W / 2, ay = y1 + H / 2, bx = x2 + W / 2, by = y2 + H / 2;
        const mx = (ax + bx) / 2, my = (ay + by) / 2 - Math.abs(ax - bx) * 0.08;
        const walked = state.visited.has(a) && state.visited.has(b);
        edges += `<path class="edge${walked ? " walked" : ""}" d="M${ax},${ay} Q${mx},${my} ${bx},${by}"/>`;
      }
    }
    for (const id of ids) {
      const [x, y] = MAP_POS[id];
      const cls = id === state.current ? "here" : state.visited.has(id) ? "visited" : "";
      const label = STORY[state.lang][id].title;
      const short = label.length > 17 ? label.slice(0, 16) + "…" : label;
      nodes += `<g class="node ${cls}" data-to="${id}" tabindex="0" role="link" aria-label="${esc(label)}">
        <title>${esc(label)}</title>
        <rect x="${x}" y="${y}" width="${W}" height="${H}" rx="7"/>
        <text x="${x + 10}" y="${y + 15}" class="nid">${id}</text>
        <text x="${x + 10}" y="${y + 29}" class="nlabel">${esc(short)}</text>
      </g>`;
    }
    svg.innerHTML = `<g class="edges">${edges}</g><g class="nodes">${nodes}</g>`;
  }

  function openMap() { drawMap(); els.map.showModal(); }
  function closeMap() { els.map.close(); }

  /* ---------- Idioma ---------- */
  function applyLang() {
    document.documentElement.lang = state.lang;
    els.lang.textContent = state.lang === "en" ? "ES" : "EN";
    els.lang.setAttribute("aria-label", state.lang === "en" ? "Cambiar a español" : "Switch to English");
    document.querySelectorAll("[data-i18n]").forEach((n) => (n.textContent = t(n.dataset.i18n)));
  }

  /* ---------- Navegación ---------- */
  const currentHash = () => (location.hash.match(/^#\/([\w-]+)/) || [])[1] || "start";
  function go(id) {
    if (id === "@map") return openMap();
    if (`#/${id}` === location.hash) return;
    location.hash = `/${id}`;
  }

  window.addEventListener("hashchange", () => {
    render(currentHash(), { fromHistory: true });
    window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  });

  document.addEventListener("click", (e) => {
    const copy = e.target.closest("[data-copy]");
    if (copy) {
      navigator.clipboard?.writeText(copy.dataset.copy).then(() => {
        copy.textContent = t("copied");
        setTimeout(() => (copy.textContent = t("copy")), 1400);
      });
      return;
    }
    const a = e.target.closest("[data-to]");
    if (a) {
      e.preventDefault();
      const to = a.dataset.to;
      if (a.closest("#map")) closeMap();
      go(to);
    }
  });

  els.mapSvg.addEventListener("keydown", (e) => {
    const n = e.target.closest("[data-to]");
    if (n && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); closeMap(); go(n.dataset.to); }
  });

  els.back.addEventListener("click", () => history.back());
  els.mapBtn.addEventListener("click", openMap);
  els.mapClose.addEventListener("click", closeMap);
  els.map.addEventListener("click", (e) => { if (e.target === els.map) closeMap(); });
  els.lang.addEventListener("click", () => {
    state.lang = state.lang === "en" ? "es" : "en";
    store.set("cv.lang", state.lang);
    applyLang();
    render(state.current, { fromHistory: true });
  });

  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (/input|textarea/i.test(document.activeElement?.tagName)) return;
    if (els.map.open) return;
    if (/^[1-9]$/.test(e.key)) {
      const c = els.passage.querySelectorAll(".choice")[+e.key - 1];
      if (c) { e.preventDefault(); go(c.dataset.to); }
    } else if (e.key === "m" || e.key === "M") {
      openMap();
    }
  });

  applyLang();
  render(currentHash());
})();
