// ── Gacha Mod · Motor de avatares chibi (SVG) + catálogos ──────────
const SKINS = ["#ffe3d3","#ffd1b3","#f1c27d","#e0ac69","#c68642","#8d5524"];
const HAIR_COLORS = ["#3b2f2f","#6b4423","#b5651d","#f2c94c","#f299c2","#ff5d8f","#e33e3e","#ff8c42","#8e44ad","#5d6df2","#42c2f5","#3ddc97","#f5f5f5","#1abc9c"];
const CLOTH_COLORS = ["#ff5d8f","#5d6df2","#42c2f5","#3ddc97","#f2c94c","#ff8c42","#e33e3e","#8e44ad","#2d3436","#f5f5f5","#fd79a8","#00b894"];

const HAIRS = [
  {id:"corto", name:"Corto"}, {id:"largo", name:"Largo"}, {id:"coletas", name:"Coletas"},
  {id:"mono", name:"Moño"}, {id:"rizado", name:"Rizado"}, {id:"puntas", name:"De puntas"},
  {id:"trenza", name:"Trenza", lock:"hair:trenza"},
];
const EYES = [
  {id:"normal", name:"Normales"}, {id:"feliz", name:"Felices"}, {id:"estrella", name:"Estrella"},
  {id:"corazon", name:"Corazón"}, {id:"dormido", name:"Dormidos"}, {id:"guino", name:"Guiño"},
];
const MOUTHS = [
  {id:"sonrisa", name:"Sonrisa"}, {id:"abierta", name:"Alegre"}, {id:"o", name:"Sorpresa"},
  {id:"gato", name:"Gatito ω"}, {id:"lengua", name:"Lengua"}, {id:"timido", name:"Tímida"},
];
const OUTFITS = [
  {id:"camiseta", name:"Camiseta"}, {id:"sudadera", name:"Sudadera"}, {id:"vestido", name:"Vestido"},
  {id:"uniforme", name:"Uniforme"}, {id:"traje", name:"Traje elegante"},
  {id:"gala", name:"Gala real", lock:"outfit:gala"}, {id:"idol", name:"Ídolo pop", lock:"outfit:idol"},
];
const ACCESSORIES = [
  {id:"ninguno", name:"Ninguno"}, {id:"lazo", name:"Lazo"}, {id:"gorra", name:"Gorra"},
  {id:"orejas", name:"Orejas de gato"}, {id:"gafas", name:"Gafas"}, {id:"flores", name:"Flores"},
  {id:"corona", name:"Corona", lock:"acc:corona"}, {id:"cuernos", name:"Cuernos", lock:"acc:cuernos"},
];
const EXTRAS = [
  {id:"ninguno", name:"Ninguno"}, {id:"cola", name:"Cola de gato"},
  {id:"alas", name:"Alas", lock:"extra:alas"}, {id:"alas-demonio", name:"Alas de demonio", lock:"extra:alas-demonio"},
];
const POSES = [
  {id:"normal", name:"Normal"}, {id:"saludo", name:"Saludando"}, {id:"salto", name:"Saltando"},
  {id:"corazon", name:"Corazón"}, {id:"bailar", name:"Bailando"},
];
const CARD_BGS = [
  ["#a18cd1","#fbc2eb"],["#84fab0","#8fd3f4"],["#ff9a9e","#fecfef"],["#f6d365","#fda085"],
  ["#667eea","#764ba2"],["#89f7fe","#66a6ff"],["#fddb92","#d1fdff"],["#2c3e50","#4ca1af"],
];
const SCENES = [
  {id:"parque", name:"🌳 Parque", sky:["#8fd3f4","#e8f9ff"], ground:"#7ed957", props:"🌳 🌷 🌳 🦋 🌷"},
  {id:"playa", name:"🏖️ Playa", sky:["#ffe29f","#ffa99f"], ground:"#ffe3a3", props:"🏝️ ⛱️ 🐚 🌊 🦀"},
  {id:"escuela", name:"🏫 Escuela", sky:["#a1c4fd","#fdfbfb"], ground:"#b8c6db", props:"🏫 🌸 🎒 🌸 📚"},
  {id:"cafe", name:"☕ Cafetería", sky:["#fbc2eb","#f6d365"], ground:"#d4a373", props:"☕ 🧁 🪑 🍰 ☕"},
  {id:"escenario", name:"🎤 Escenario", sky:["#764ba2","#2c3e50"], ground:"#3b2f63", props:"🎤 ✨ 🎵 ✨ 🎸"},
  {id:"espacio", name:"🚀 Espacio", sky:["#0f2027","#2c5364"], ground:"#203a43", props:"🪐 ⭐ 🚀 ⭐ 🌙"},
  {id:"nieve", name:"⛄ Invierno", sky:["#e0eafc","#cfdef3"], ground:"#ffffff", props:"⛄ 🎄 ❄️ 🎄 ❄️"},
  {id:"ocaso", name:"🌅 Atardecer", sky:["#ff9966","#ff5e62"], ground:"#7f5539", props:"🌅 🌴 🧡 🌴 🌇"},
];

function defaultChar(name = "Nuevo personaje") {
  return { name, skin:SKINS[1], hair:"corto", hairColor:"#6b4423", eyes:"normal", eyeColor:"#3b2f2f",
    mouth:"sonrisa", blush:true, outfit:"camiseta", outfitColor:"#5d6df2", bottomColor:"#2d3436",
    shoes:"#f5f5f5", accessory:"ninguno", extra:"ninguno", pose:"normal", bg:0 };
}
const PRESETS = [
  {...defaultChar("Luni"), hair:"coletas", hairColor:"#42c2f5", eyes:"estrella", eyeColor:"#5d6df2", outfit:"vestido", outfitColor:"#ff5d8f", accessory:"lazo", pose:"saludo", bg:0},
  {...defaultChar("Senpaibuns"), hair:"largo", hairColor:"#f299c2", eyes:"corazon", eyeColor:"#e33e3e", outfit:"uniforme", outfitColor:"#f5f5f5", accessory:"orejas", extra:"cola", pose:"corazon", bg:2},
  {...defaultChar("Kai Dark"), hair:"puntas", hairColor:"#2d3436", eyes:"normal", eyeColor:"#e33e3e", outfit:"traje", outfitColor:"#2d3436", accessory:"cuernos", extra:"alas-demonio", pose:"normal", bg:7, skin:SKINS[0]},
  {...defaultChar("Mimi Neko"), hair:"mono", hairColor:"#f2c94c", eyes:"feliz", outfit:"sudadera", outfitColor:"#f2c94c", accessory:"orejas", extra:"cola", mouth:"gato", pose:"salto", bg:3},
  {...defaultChar("Princesa Aoi"), hair:"largo", hairColor:"#8e44ad", eyes:"normal", eyeColor:"#8e44ad", outfit:"gala", outfitColor:"#8e44ad", accessory:"corona", pose:"saludo", bg:4, skin:SKINS[0]},
  {...defaultChar("Rin Idol"), hair:"rizado", hairColor:"#ff5d8f", eyes:"estrella", eyeColor:"#ff5d8f", outfit:"idol", outfitColor:"#42c2f5", accessory:"flores", pose:"bailar", bg:5},
  {...defaultChar("Leo Sol"), hair:"corto", hairColor:"#ff8c42", eyes:"guino", outfit:"camiseta", outfitColor:"#3ddc97", accessory:"gorra", pose:"bailar", bg:1, skin:SKINS[3]},
  {...defaultChar("Yuki Ángel"), hair:"trenza", hairColor:"#f5f5f5", eyes:"dormido", outfit:"vestido", outfitColor:"#f5f5f5", accessory:"flores", extra:"alas", pose:"normal", bg:6, skin:SKINS[0]},
];

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

// Brazo: línea gruesa desde el hombro, con giro según pose
function arm(x, y, angle, skin, sleeve, hand = true) {
  return `<g transform="rotate(${angle} ${x} ${y})"><rect x="${x-7}" y="${y}" width="14" height="26" rx="7" fill="${sleeve}"/><rect x="${x-7}" y="${y+22}" width="14" height="22" rx="7" fill="${skin}"/></g>`;
}
function eyesSVG(c) {
  const y = 108, l = 82, r = 118, col = c.eyeColor;
  const pupil = x => `<ellipse cx="${x}" cy="${y}" rx="6" ry="9" fill="${col}"/><circle cx="${x+2}" cy="${y-3}" r="2.4" fill="#fff"/>`;
  switch(c.eyes){
    case "feliz": return `<path d="M${l-7} ${y} Q${l} ${y-9} ${l+7} ${y}" stroke="${col}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M${r-7} ${y} Q${r} ${y-9} ${r+7} ${y}" stroke="${col}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    case "dormido": return `<path d="M${l-7} ${y} Q${l} ${y+7} ${l+7} ${y}" stroke="${col}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M${r-7} ${y} Q${r} ${y+7} ${r+7} ${y}" stroke="${col}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    case "estrella": return [l,r].map(x=>`<text x="${x}" y="${y+6}" font-size="17" text-anchor="middle" fill="${col}">★</text>`).join("");
    case "corazon": return [l,r].map(x=>`<text x="${x}" y="${y+6}" font-size="15" text-anchor="middle" fill="#ff5d8f">♥</text>`).join("");
    case "guino": return `${pupil(l)}<path d="M${r-7} ${y} Q${r} ${y-8} ${r+7} ${y}" stroke="${col}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    default: return pupil(l)+pupil(r);
  }
}
function mouthSVG(c) {
  const y = 124;
  switch(c.mouth){
    case "abierta": return `<path d="M90 ${y} Q100 ${y+12} 110 ${y} Q100 ${y+4} 90 ${y}" fill="#8e3b3b"/><ellipse cx="100" cy="${y+5}" rx="5" ry="3" fill="#ff8fa3"/>`;
    case "o": return `<circle cx="100" cy="${y+3}" r="4.5" fill="none" stroke="#8e3b3b" stroke-width="2.5"/>`;
    case "gato": return `<path d="M92 ${y} Q96 ${y+5} 100 ${y} Q104 ${y+5} 108 ${y}" stroke="#8e3b3b" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    case "lengua": return `<path d="M91 ${y} Q100 ${y+6} 109 ${y}" stroke="#8e3b3b" stroke-width="2.5" fill="none" stroke-linecap="round"/><rect x="96" y="${y+3}" width="8" height="7" rx="3.5" fill="#ff8fa3"/>`;
    case "timido": return `<line x1="95" y1="${y+2}" x2="105" y2="${y+2}" stroke="#8e3b3b" stroke-width="2.5" stroke-linecap="round"/>`;
    default: return `<path d="M91 ${y} Q100 ${y+8} 109 ${y}" stroke="#8e3b3b" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
  }
}
function hairBack(c) {
  const col = c.hairColor;
  if (c.hair === "largo" || c.hair === "trenza") return `<path d="M52 92 Q48 170 62 196 L84 196 Q76 150 78 100 Z M148 92 Q152 170 138 196 L116 196 Q124 150 122 100 Z" fill="${col}"/>`;
  if (c.hair === "coletas") return `<path d="M54 84 Q30 120 40 168 Q52 176 60 160 Q52 118 62 92 Z M146 84 Q170 120 160 168 Q148 176 140 160 Q148 118 138 92 Z" fill="${col}"/>`;
  return "";
}
function hairFront(c) {
  const col = c.hairColor;
  const fringe = `<path d="M54 96 Q50 52 100 48 Q150 52 146 96 Q132 74 118 84 Q108 66 94 80 Q76 68 54 96Z" fill="${col}"/>`;
  switch(c.hair){
    case "mono": return fringe + `<circle cx="100" cy="42" r="17" fill="${col}"/>`;
    case "rizado": return fringe + `<circle cx="66" cy="66" r="14" fill="${col}"/><circle cx="86" cy="54" r="15" fill="${col}"/><circle cx="114" cy="54" r="15" fill="${col}"/><circle cx="134" cy="66" r="14" fill="${col}"/>`;
    case "puntas": return `<path d="M52 100 L58 58 L76 76 L86 50 L100 70 L114 48 L124 74 L140 56 L148 100 Q124 76 100 82 Q74 78 52 100Z" fill="${col}"/>`;
    case "trenza": return fringe + `<path d="M140 88 q16 34 4 66" stroke="${col}" stroke-width="13" fill="none" stroke-linecap="round" stroke-dasharray="10 7"/><circle cx="143" cy="158" r="6" fill="#ff5d8f"/>`;
    default: return fringe;
  }
}
function accessorySVG(c) {
  switch(c.accessory){
    case "lazo": return `<g transform="translate(128 52) rotate(18)"><ellipse cx="-11" cy="0" rx="11" ry="7" fill="#ff5d8f"/><ellipse cx="11" cy="0" rx="11" ry="7" fill="#ff5d8f"/><circle r="5" fill="#e33e7e"/></g>`;
    case "gorra": return `<path d="M62 66 Q100 34 138 66 L138 72 L62 72Z" fill="#e33e3e"/><rect x="128" y="64" width="34" height="8" rx="4" fill="#c22f2f"/>`;
    case "orejas": return `<path d="M62 62 L56 30 L84 46Z M138 62 L144 30 L116 46Z" fill="${c.hairColor}"/><path d="M64 54 L61 38 L76 47Z M136 54 L139 38 L124 47Z" fill="#ffb6c9"/>`;
    case "gafas": return `<g stroke="#2d3436" stroke-width="3" fill="rgba(255,255,255,.18)"><circle cx="82" cy="108" r="14"/><circle cx="118" cy="108" r="14"/><line x1="96" y1="108" x2="104" y2="108"/></g>`;
    case "flores": return `<text x="66" y="58" font-size="18">🌸</text><text x="120" y="50" font-size="15">🌼</text>`;
    case "corona": return `<path d="M74 52 L82 30 L94 46 L100 26 L106 46 L118 30 L126 52 Q100 42 74 52Z" fill="#f2c94c" stroke="#d4a017" stroke-width="2"/>`;
    case "cuernos": return `<path d="M64 58 Q48 34 62 22 Q74 36 74 54Z M136 58 Q152 34 138 22 Q126 36 126 54Z" fill="#e33e3e"/>`;
    default: return "";
  }
}
function outfitSVG(c) {
  const col = c.outfitColor, bot = c.bottomColor;
  const legs = `<rect x="82" y="196" width="14" height="34" rx="6" fill="${c.skin}"/><rect x="104" y="196" width="14" height="34" rx="6" fill="${c.skin}"/>
    <ellipse cx="88" cy="234" rx="13" ry="7" fill="${c.shoes}"/><ellipse cx="112" cy="234" rx="13" ry="7" fill="${c.shoes}"/>`;
  let bottom = "", top = "";
  if (c.outfit === "vestido" || c.outfit === "gala") {
    bottom = `<path d="M76 168 L124 168 L142 214 L58 214Z" fill="${col}"/>` + legs;
    top = `<path d="M74 138 Q100 128 126 138 L128 172 L72 172Z" fill="${col}"/>` + (c.outfit==="gala" ? `<path d="M72 168 L128 168 L132 180 L68 180Z" fill="rgba(255,255,255,.45)"/>` : "");
  } else {
    bottom = `<path d="M76 166 L124 166 L126 202 L106 202 L100 184 L94 202 L74 202Z" fill="${bot}"/>` +
      `<rect x="80" y="198" width="13" height="30" rx="5" fill="${bot}"/><rect x="107" y="198" width="13" height="30" rx="5" fill="${bot}"/>
       <ellipse cx="86" cy="234" rx="13" ry="7" fill="${c.shoes}"/><ellipse cx="114" cy="234" rx="13" ry="7" fill="${c.shoes}"/>`;
    if (c.outfit === "sudadera") top = `<path d="M72 136 Q100 126 128 136 L130 176 Q100 186 70 176Z" fill="${col}"/><rect x="86" y="158" width="28" height="16" rx="4" fill="rgba(0,0,0,.12)"/>`;
    else if (c.outfit === "uniforme") top = `<path d="M74 136 Q100 126 126 136 L128 174 L72 174Z" fill="${col}"/><path d="M92 132 L100 146 L108 132 L104 174 L96 174Z" fill="#e33e3e"/><path d="M88 130 L100 140 L112 130" stroke="#dfe6e9" stroke-width="5" fill="none"/>`;
    else if (c.outfit === "traje") top = `<path d="M74 136 Q100 126 126 136 L128 174 L72 174Z" fill="${col}"/><path d="M90 130 L100 148 L110 130 L106 174 L94 174Z" fill="#f5f5f5"/><rect x="97" y="146" width="6" height="16" fill="#e33e3e"/>`;
    else if (c.outfit === "idol") top = `<path d="M74 136 Q100 126 126 136 L128 168 L72 168Z" fill="${col}"/><text x="100" y="160" font-size="17" text-anchor="middle">⭐</text><path d="M76 168 L124 168 L136 198 L64 198Z" fill="${bot}"/>`;
    else top = `<path d="M74 136 Q100 126 126 136 L128 174 L72 174Z" fill="${col}"/><text x="100" y="164" font-size="16" text-anchor="middle">♥</text>`;
  }
  // brazos según pose
  let arms = "";
  const sleeve = col;
  if (c.pose === "saludo") arms = arm(70,142,18,c.skin,sleeve) + arm(130,142,168,c.skin,sleeve);
  else if (c.pose === "corazon") arms = arm(70,142,-38,c.skin,sleeve) + arm(130,142,38,c.skin,sleeve) + `<text x="100" y="128" font-size="20" text-anchor="middle">💖</text>`;
  else if (c.pose === "salto") arms = arm(70,142,145,c.skin,sleeve) + arm(130,142,-145,c.skin,sleeve);
  else if (c.pose === "bailar") arms = arm(70,142,120,c.skin,sleeve) + arm(130,142,55,c.skin,sleeve);
  else arms = arm(70,142,14,c.skin,sleeve) + arm(130,142,-14,c.skin,sleeve);
  return bottom + top + arms;
}
function renderAvatar(c, {bg = true} = {}) {
  const [b1, b2] = CARD_BGS[c.bg ?? 0] || CARD_BGS[0];
  const jump = c.pose === "salto" ? "translate(0 -8)" : "";
  return `<svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(c.name)}">
  ${bg ? `<defs><linearGradient id="bg${Math.random().toString(36).slice(2,8)}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient></defs><rect width="200" height="250" fill="${b2}"/><rect width="200" height="250" fill="${b1}" opacity=".55"/>` : ""}
  <ellipse cx="100" cy="238" rx="46" ry="7" fill="rgba(0,0,0,.15)"/>
  <g transform="${jump}">
    ${c.extra === "alas" ? `<path d="M66 140 Q20 110 34 74 Q62 92 72 122Z M134 140 Q180 110 166 74 Q138 92 128 122Z" fill="#ffffff" opacity=".92"/>` : ""}
    ${c.extra === "alas-demonio" ? `<path d="M66 140 Q18 118 30 70 Q52 96 60 84 Q66 112 72 126Z M134 140 Q182 118 170 70 Q148 96 140 84 Q134 112 128 126Z" fill="#2d3436"/>` : ""}
    ${c.extra === "cola" ? `<path d="M132 196 Q168 188 160 156" stroke="${c.hairColor}" stroke-width="10" fill="none" stroke-linecap="round"/>` : ""}
    ${hairBack(c)}
    ${outfitSVG(c)}
    <ellipse cx="55" cy="104" rx="8" ry="11" fill="${c.skin}"/><ellipse cx="145" cy="104" rx="8" ry="11" fill="${c.skin}"/>
    <ellipse cx="100" cy="102" rx="47" ry="44" fill="${c.skin}"/>
    ${c.blush ? `<ellipse cx="70" cy="120" rx="8" ry="4.5" fill="#ff9eb5" opacity=".8"/><ellipse cx="130" cy="120" rx="8" ry="4.5" fill="#ff9eb5" opacity=".8"/>` : ""}
    ${eyesSVG(c)}${mouthSVG(c)}
    <path d="M74 94 Q82 89 90 93 M110 93 Q118 89 126 94" stroke="${c.hairColor}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    ${hairFront(c)}${accessorySVG(c)}
  </g></svg>`;
}
window.GachaAvatar = { SKINS, HAIR_COLORS, CLOTH_COLORS, HAIRS, EYES, MOUTHS, OUTFITS, ACCESSORIES, EXTRAS, POSES, CARD_BGS, SCENES, PRESETS, defaultChar, renderAvatar, esc };
