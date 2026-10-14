// ── Gacha Mod · Lógica principal ───────────────────────────────────
const { SKINS, HAIR_COLORS, CLOTH_COLORS, HAIRS, EYES, MOUTHS, OUTFITS, ACCESSORIES, EXTRAS, POSES, CARD_BGS, SCENES, PRESETS, defaultChar, renderAvatar, esc } = window.GachaAvatar;
const KEY = "gachamod_v2";
const clone = o => (typeof structuredClone === "function" ? structuredClone(o) : JSON.parse(JSON.stringify(o)));
const ALL_LOCKS = [...HAIRS, ...OUTFITS, ...ACCESSORIES, ...EXTRAS].filter(i => i.lock).map(i => i.lock);
const LOCK_NAMES = {};
[...HAIRS, ...OUTFITS, ...ACCESSORIES, ...EXTRAS].forEach(i => { if (i.lock) LOCK_NAMES[i.lock] = i.name; });

let S;
function freshState() {
  return { gems: 2000, slots: [clone(PRESETS[0]), clone(PRESETS[3]), clone(PRESETS[6]), null, null, null, null, null, null, null],
    unlocked: [], daily: "", editing: 0, scene: { id: "parque", chars: [0, 1], texts: {} } };
}
function load() { try { const raw = localStorage.getItem(KEY); S = raw ? { ...freshState(), ...JSON.parse(raw) } : freshState(); } catch { S = freshState(); } }
function save() { localStorage.setItem(KEY, JSON.stringify(S)); }
load();
let draft = S.slots[S.editing] ? clone(S.slots[S.editing]) : defaultChar();
let currentCat = "pelo";

const $ = s => document.querySelector(s);
function toast(msg, ms = 2600) { const t = $("#toast"); t.textContent = msg; t.classList.remove("hidden"); clearTimeout(t._h); t._h = setTimeout(() => t.classList.add("hidden"), ms); }
const locked = item => item.lock && !S.unlocked.includes(item.lock);

// ── Descarga de imágenes (web + puente Android del APK) ───────────
function downloadPNG(svg, w, h, filename) {
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
  const img = new Image();
  img.onload = () => {
    const cv = document.createElement("canvas"); cv.width = w; cv.height = h;
    cv.getContext("2d").drawImage(img, 0, 0, w, h); URL.revokeObjectURL(url);
    const data = cv.toDataURL("image/png");
    if (window.AndroidBridge?.savePng) { window.AndroidBridge.savePng(data.split(",")[1], filename); toast("📸 Foto guardada en tus Descargas"); }
    else { const a = document.createElement("a"); a.href = data; a.download = filename; a.click(); toast("📸 Imagen descargada"); }
  };
  img.src = url;
}

// ── Navegación ─────────────────────────────────────────────────────
document.querySelectorAll(".tab").forEach(b => b.onclick = () => show(b.dataset.view));
function show(view) {
  document.querySelectorAll(".tab").forEach(b => b.classList.toggle("active", b.dataset.view === view));
  document.querySelectorAll(".view").forEach(v => v.classList.toggle("active", v.id === "view-" + view));
  if (view === "home") renderHome(); if (view === "create") renderEditor(); if (view === "gacha") renderGacha(); if (view === "scene") renderScene();
}

// ── Inicio / slots ─────────────────────────────────────────────────
function renderHome() {
  $("#gems").textContent = S.gems;
  const used = S.slots.filter(Boolean).length;
  $("#slotInfo").textContent = `· ${used}/10`;
  $("#slots").innerHTML = S.slots.map((c, i) => c
    ? `<div class="card" data-slot="${i}">${renderAvatar(c)}<div class="meta"><b>${esc(c.name)}</b><span>Toca para editar ✏️</span></div></div>`
    : `<div class="card empty" data-slot="${i}"><span class="plus">＋</span>Espacio vacío<br><small>Crear personaje</small></div>`).join("");
  document.querySelectorAll("[data-slot]").forEach(el => el.onclick = () => {
    S.editing = +el.dataset.slot;
    draft = S.slots[S.editing] ? clone(S.slots[S.editing]) : defaultChar();
    save(); show("create");
  });
}

// ── Editor ─────────────────────────────────────────────────────────
const CATS = [
  { id: "pelo", name: "💇 Pelo" }, { id: "cara", name: "😊 Cara" }, { id: "ropa", name: "👗 Ropa" },
  { id: "extra", name: "✨ Extra" }, { id: "fondo", name: "🖼️ Fondo" },
];
const swatches = (colors, key) => `<div class="opts">${colors.map(col => `<button type="button" class="swatch ${draft[key] === col ? "sel" : ""}" data-color="${key}:${col}" style="background:${col}" aria-label="${col}"></button>`).join("")}</div>`;
const opts = (items, key) => `<div class="opts">${items.map(it => `<button type="button" class="opt ${draft[key] === it.id ? "sel" : ""} ${locked(it) ? "locked" : ""}" data-opt="${key}:${it.id}">${locked(it) ? "🔒 " : ""}${it.name}</button>`).join("")}</div>`;
const group = (title, inner) => `<div class="opt-group"><h3>${title}</h3>${inner}</div>`;

function renderEditor() {
  $("#gems").textContent = S.gems;
  $("#preview").innerHTML = renderAvatar(draft);
  $("#charName").value = draft.name;
  $("#catTabs").innerHTML = CATS.map(c => `<button class="cat-tab ${c.id === currentCat ? "active" : ""}" data-cat="${c.id}">${c.name}</button>`).join("");
  document.querySelectorAll("[data-cat]").forEach(b => b.onclick = () => { currentCat = b.dataset.cat; renderEditor(); });
  const find = (arr, id) => arr.find(i => i.id === id);
  let html = "";
  if (currentCat === "pelo") html = group("Estilo", opts(HAIRS, "hair")) + group("Color de pelo", swatches(HAIR_COLORS, "hairColor"));
  if (currentCat === "cara") html = group("Tono de piel", swatches(SKINS, "skin")) + group("Ojos", opts(EYES, "eyes")) + group("Color de ojos", swatches(HAIR_COLORS, "eyeColor"))
    + group("Boca", opts(MOUTHS, "mouth")) + group("Rubor", `<div class="opts"><button class="opt ${draft.blush ? "sel" : ""}" data-toggle="blush">${draft.blush ? "💗 Con rubor" : "Sin rubor"}</button></div>`);
  if (currentCat === "ropa") html = group("Ropa", opts(OUTFITS, "outfit")) + group("Color de la ropa", swatches(CLOTH_COLORS, "outfitColor")) + group("Color del pantalón/falda", swatches(CLOTH_COLORS, "bottomColor")) + group("Zapatos", swatches(CLOTH_COLORS, "shoes"));
  if (currentCat === "extra") html = group("Accesorio", opts(ACCESSORIES, "accessory")) + group("Extra", opts(EXTRAS, "extra")) + group("Pose", opts(POSES, "pose"));
  if (currentCat === "fondo") html = group("Fondo de la carta", `<div class="opts">${CARD_BGS.map((g, i) => `<button class="swatch ${(draft.bg ?? 0) === i ? "sel" : ""}" data-bg="${i}" style="background:linear-gradient(135deg,${g[0]},${g[1]})" aria-label="Fondo ${i + 1}"></button>`).join("")}</div>`);
  $("#catBody").innerHTML = html;

  document.querySelectorAll("[data-opt]").forEach(b => b.onclick = () => {
    const [key, id] = b.dataset.opt.split(":");
    const item = find([...HAIRS, ...EYES, ...MOUTHS, ...OUTFITS, ...ACCESSORIES, ...EXTRAS, ...POSES], id);
    if (item && locked(item)) return toast("🔒 Está bloqueado. ¡Consíguelo en el 🎰 Gacha!");
    draft[key] = id; renderEditor();
  });
  document.querySelectorAll("[data-color]").forEach(b => b.onclick = () => { const [key, col] = b.dataset.color.split(":"); draft[key] = col; renderEditor(); });
  document.querySelectorAll("[data-bg]").forEach(b => b.onclick = () => { draft.bg = +b.dataset.bg; renderEditor(); });
  document.querySelectorAll("[data-toggle]").forEach(b => b.onclick = () => { draft.blush = !draft.blush; renderEditor(); });
}
$("#charName").addEventListener("input", e => { draft.name = e.target.value.trim() || "Sin nombre"; $("#preview").innerHTML = renderAvatar(draft); });
$("#saveChar").onclick = () => { S.slots[S.editing] = clone(draft); save(); renderHome(); toast(`💾 ${draft.name} guardado en el espacio ${S.editing + 1}`); };
$("#deleteChar").onclick = () => { if (!S.slots[S.editing]) return toast("Este espacio ya está vacío"); if (confirm(`¿Borrar a ${draft.name}?`)) { S.slots[S.editing] = null; draft = defaultChar(); save(); renderEditor(); toast("🗑️ Personaje borrado"); } };
$("#randomChar").onclick = () => {
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const free = a => a.filter(i => !locked(i));
  Object.assign(draft, { hair: pick(free(HAIRS)).id, hairColor: pick(HAIR_COLORS), skin: pick(SKINS), eyes: pick(EYES).id,
    mouth: pick(MOUTHS).id, outfit: pick(free(OUTFITS)).id, outfitColor: pick(CLOTH_COLORS), bottomColor: pick(CLOTH_COLORS),
    accessory: pick(free(ACCESSORIES)).id, extra: pick(free(EXTRAS)).id, pose: pick(POSES).id, bg: Math.floor(Math.random() * CARD_BGS.length) });
  renderEditor(); toast("🎲 ¡Personaje aleatorio!");
};
$("#pngChar").onclick = () => downloadPNG(renderAvatar(draft), 600, 750, (draft.name || "personaje").replace(/\s+/g, "_") + ".png");
$("#exportChar").onclick = () => {
  $("#codeBox").value = btoa(unescape(encodeURIComponent(JSON.stringify(draft))));
  $("#codeBox").select(); navigator.clipboard?.writeText($("#codeBox").value).catch(() => {});
  toast("📤 Código copiado. ¡Compártelo con quien quieras!");
};
$("#importChar").onclick = () => {
  try { const c = JSON.parse(decodeURIComponent(escape(atob($("#codeBox").value.trim())))); draft = { ...defaultChar(), ...c }; renderEditor(); toast(`📥 ¡${draft.name} importado! Pulsa Guardar.`); }
  catch { toast("❌ Ese código no es válido"); }
};

// ── Diario ─────────────────────────────────────────────────────────
$("#dailyBtn").onclick = () => {
  const today = new Date().toDateString();
  if (S.daily === today) return toast("🎁 Ya reclamaste hoy. ¡Vuelve mañana!");
  S.daily = today; S.gems += 300; save(); renderHome(); toast("🎁 +300 💎 ¡Recompensa diaria!");
};

// ── Gacha ──────────────────────────────────────────────────────────
function renderGacha() {
  $("#gems").textContent = S.gems;
  const left = ALL_LOCKS.filter(l => !S.unlocked.includes(l));
  $("#pityInfo").textContent = left.length ? `Te faltan ${left.length} desbloqueables especiales. Cada tirada puede traer uno ✨` : "🎉 ¡Ya desbloqueaste todo lo especial!";
  $("#unlockList").innerHTML = ALL_LOCKS.map(l => `<span class="unlock-chip ${S.unlocked.includes(l) ? "" : "no"}">${S.unlocked.includes(l) ? "✅" : "🔒"} ${LOCK_NAMES[l]}</span>`).join("");
}
function doPulls(n) {
  const cost = n === 1 ? 200 : 2000;
  if (S.gems < cost) return toast(`Te faltan 💎. Necesitas ${cost} y tienes ${S.gems}. Reclama el 🎁 diario.`);
  S.gems -= cost;
  const results = [];
  for (let k = 0; k < n; k++) {
    const leftLocks = ALL_LOCKS.filter(l => !S.unlocked.includes(l));
    if (leftLocks.length && Math.random() < 0.35) {
      const lock = leftLocks[Math.floor(Math.random() * leftLocks.length)];
      S.unlocked.push(lock); results.push({ type: "unlock", lock });
    } else {
      const preset = clone(PRESETS[Math.floor(Math.random() * PRESETS.length)]);
      const empty = S.slots.findIndex(s => !s), dupe = S.slots.some(s => s?.name === preset.name);
      if (!dupe && empty >= 0) { S.slots[empty] = preset; results.push({ type: "char", char: preset }); }
      else { S.gems += 100; results.push({ type: "dupe", char: preset }); }
    }
  }
  save(); renderGacha();
  if (n === 1) {
    const r = results[0];
    $("#revealTitle").textContent = r.type === "unlock" ? `🔓 ¡Desbloqueado: ${LOCK_NAMES[r.lock]}!` : r.type === "dupe" ? `✨ Repetido: ${r.char.name} (+100 💎)` : `🎉 ¡Nuevo personaje: ${r.char.name}!`;
    $("#revealCard").innerHTML = r.type === "unlock" ? `<div style="font-size:90px;padding:30px">🎁</div><p>Ya puedes usarlo en 🎨 Crear</p>` : renderAvatar(r.char);
    $("#reveal").classList.remove("hidden");
  } else {
    $("#pullResults").innerHTML = results.map(r => r.type === "unlock"
      ? `<div class="card"><div style="font-size:52px;text-align:center;padding:26px 0 6px">🎁</div><div class="meta"><b>${LOCK_NAMES[r.lock]}</b><span>¡Desbloqueado!</span></div></div>`
      : `<div class="card">${renderAvatar(r.char)}<div class="meta"><b>${esc(r.char.name)}</b><span>${r.type === "dupe" ? "Repetido +100💎" : "¡Nuevo! 🎉"}</span></div></div>`).join("");
    toast(`🎰 Tirada ×10 lista: ${results.filter(r => r.type === "char").length} nuevos, ${results.filter(r => r.type === "unlock").length} desbloqueos`);
  }
}
$("#pull1").onclick = () => doPulls(1);
$("#pull10").onclick = () => doPulls(10);
$("#revealClose").onclick = () => { $("#reveal").classList.add("hidden"); renderHome(); };

// ── Escenas ────────────────────────────────────────────────────────
function sceneSVG(forExport = false) {
  const sc = SCENES.find(s => s.id === S.scene.id) || SCENES[0];
  const chars = (S.scene.chars || []).map(i => S.slots[i]).filter(Boolean).slice(0, 4);
  const gid = forExport ? "ex" : "pg";
  const placed = chars.map((c, i) => {
    const w = 230, h = 288, x = chars.length === 1 ? 365 : 60 + i * ((960 - 120 - w) / Math.max(1, chars.length - 1)), y = 236;
    const avatar = renderAvatar(c, { bg: false }).replace("<svg ", `<svg x="${x}" y="${y}" width="${w}" height="${h}" `);
    const text = (S.scene.texts?.[Object.keys(S.scene.texts).find(k => S.slots[+k] === c)] || "").trim();
    let bubble = "";
    if (text) {
      const bw = Math.min(300, 26 + text.length * 8.5), bx = Math.max(8, Math.min(952 - bw, x + w / 2 - bw / 2));
      bubble = `<g><rect x="${bx}" y="168" width="${bw}" height="46" rx="16" fill="#fff" stroke="#2b2140" stroke-width="2.5"/><path d="M${x + w / 2 - 8} 212 L${x + w / 2 + 4} 212 L${x + w / 2} 226Z" fill="#fff" stroke="#2b2140" stroke-width="2"/><text x="${bx + bw / 2}" y="197" font-size="17" font-family="sans-serif" font-weight="700" fill="#2b2140" text-anchor="middle">${esc(text.slice(0, 34))}</text></g>`;
    }
    return avatar + bubble;
  }).join("");
  return `<svg viewBox="0 0 960 540" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sky${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sc.sky[0]}"/><stop offset="1" stop-color="${sc.sky[1]}"/></linearGradient></defs>
  <rect width="960" height="540" fill="url(#sky${gid})"/><rect y="420" width="960" height="120" fill="${sc.ground}"/>
  <text x="480" y="492" font-size="44" text-anchor="middle" letter-spacing="18">${sc.props}</text>${placed}</svg>`;
}
function renderScene() {
  $("#sceneSelect").innerHTML = SCENES.map(s => `<option value="${s.id}" ${s.id === S.scene.id ? "selected" : ""}>${s.name}</option>`).join("");
  $("#sceneChars").innerHTML = S.slots.map((c, i) => c ? `<label><input type="checkbox" data-scene-char="${i}" ${S.scene.chars.includes(i) ? "checked" : ""}> ${esc(c.name)}</label>` : "").join("") || "<small>No tienes personajes todavía</small>";
  document.querySelectorAll("[data-scene-char]").forEach(cb => cb.onchange = () => {
    const i = +cb.dataset.sceneChar;
    if (cb.checked) { if (S.scene.chars.length >= 4) { cb.checked = false; return toast("Máximo 4 personajes por escena"); } S.scene.chars.push(i); }
    else S.scene.chars = S.scene.chars.filter(x => x !== i);
    save(); renderScene();
  });
  $("#sceneTexts").innerHTML = S.scene.chars.map(i => S.slots[i] ? `<label>💬 ${esc(S.slots[i].name)}<input data-scene-text="${i}" maxlength="34" placeholder="Escribe su diálogo…" value="${esc(S.scene.texts?.[i] || "")}"></label>` : "").join("");
  document.querySelectorAll("[data-scene-text]").forEach(inp => inp.oninput = () => { S.scene.texts[inp.dataset.sceneText] = inp.value; save(); $("#sceneStage").innerHTML = sceneSVG(); });
  $("#sceneStage").innerHTML = sceneSVG();
}
$("#sceneSelect").onchange = e => { S.scene.id = e.target.value; save(); renderScene(); };
$("#photoBtn").onclick = () => { if (!S.scene.chars.length) return toast("Elige al menos un personaje"); downloadPNG(sceneSVG(true), 1280, 720, "gacha_mod_escena.png"); };

// ── PWA: instalar + offline ────────────────────────────────────────
let deferredInstall;
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferredInstall = e; $("#installBtn").hidden = false; });
$("#installBtn").onclick = async () => { if (deferredInstall) { deferredInstall.prompt(); deferredInstall = null; $("#installBtn").hidden = true; } };
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(() => {});

renderHome();
