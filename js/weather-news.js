"use strict";

/* ══════════ WEATHER SYSTEM ══════════ */
var weatherCycle = "auto"; // auto | jour | nuit

function getTodayWeather(){
  var u = loadUser();
  var types = weatherData && weatherData.types ? weatherData.types : {};
  var def = weatherData && weatherData.default ? weatherData.default : "eclat";
  // Use game day to cycle weather deterministically
  var weatherKeys = Object.keys(types);
  if(!weatherKeys.length) return {id:"eclat",name:"Éclat Solaire",icon:"☀️",color:"#fbbf24",desc:"Le ciel est dégagé.",effects:[],stats:{temp:"Doux",vent:"Calme",mana:"Stable"},night_variant:{name:"Nuit Claire",icon:"🌙",desc:"Les étoiles brillent."}};
  var idx = ((u.gameDay * 7 + 3) % weatherKeys.length);
  return types[weatherKeys[idx]] || types[def] || types[weatherKeys[0]];
}

function isNightInGame(){
  var u = loadUser();
  return u.gameHour < 6 || u.gameHour >= 21;
}

/* ══════════ DAILY INFO / NEWS SYSTEM ══════════ */
var NEWS_TEMPLATES = [
  {cat:"Politique",icon:"🏛️",templates:[
    "Le Conseil de %REGION% débat d'une nouvelle alliance avec %REGION2%.",
    "Tensions croissantes à la frontière entre %REGION% et %REGION2%.",
    "Le gouverneur de %CITY% annonce une réforme des tarifs douaniers.",
    "Élections anticipées dans la contrée de %REGION%. Les factions s'organisent.",
    "Un traité de non-agression a été signé entre %CITY% et %CITY2%.",
    "Le Haut Conseil du Nexus convoque une assemblée extraordinaire."
  ]},
  {cat:"Faits divers",icon:"📰",templates:[
    "Un mystérieux voyageur a été aperçu aux portes de %CITY%.",
    "Disparition inexpliquée d'un convoi de marchands près de %REGION%.",
    "Les habitants de %CITY% signalent des lumières étranges dans le ciel nocturne.",
    "Un artefact ancien a été découvert dans les ruines au nord de %CITY%.",
    "Le plus vieux chêne de %REGION% s'est effondré après 800 ans.",
    "Des tremblements de terre inhabituels secouent la contrée de %REGION%."
  ]},
  {cat:"Économie",icon:"💰",templates:[
    "Le cours du Sablon atteint un nouveau record à %CITY%.",
    "Pénurie de cristaux d'ombre dans toute la contrée de %REGION%.",
    "Les forgerons de %CITY% augmentent leurs prix de 15%.",
    "Ouverture d'une nouvelle route commerciale entre %CITY% et %CITY2%.",
    "Le marché noir de %CITY% a été démantelé par la garde locale.",
    "Les récoltes de %REGION% promettent une année exceptionnelle."
  ]},
  {cat:"Science & Magie",icon:"🔮",templates:[
    "Les chronomanciens de %CITY% détectent une anomalie temporelle.",
    "Un nouveau sort de guérison a été développé à l'académie de %CITY%.",
    "Des chercheurs de %REGION% affirment avoir cartographié un plan astral inconnu.",
    "Le flux de mana est instable dans toute la contrée de %REGION%.",
    "Une machine à vapeur consciente a été construite à %CITY%.",
    "Les alchimistes de %CITY% synthétisent un nouveau métal hybride."
  ]},
  {cat:"Culture",icon:"🎭",templates:[
    "Le Festival des Lumières débute à %CITY% pour trois jours.",
    "Le barde %PERSONA% donne un concert historique à %CITY%.",
    "Inauguration d'un nouveau théâtre dans la cité de %CITY%.",
    "Le concours annuel de poésie de %REGION% a couronné un inconnu.",
    "Une fresque murale géante apparaît sur les murs de %CITY%.",
    "Les conteurs d'Orianen publient un nouveau tome de l'Histoire du Nexus."
  ]},
  {cat:"Aventure",icon:"⚔️",templates:[
    "Une quête de rang S a été affichée au tableau de %CITY%.",
    "Des créatures inconnues ont été repérées aux abords de %REGION%.",
    "Le donjon de %CITY% a été nettoyé par un groupe d'aventuriers anonymes.",
    "Avis de recherche : prime de 500§ pour la capture d'un fugitif à %CITY%.",
    "Le gardien de %CITY% lance un appel aux volontaires pour une expédition.",
    "Un portail dimensionnel instable s'est ouvert près de %CITY%."
  ]},
  {cat:"Météo",icon:"🌤️",templates:[
    "Ciel dégagé sur %REGION%. Températures douces attendues.",
    "Alerte tempête : vents violents prévus dans la contrée de %REGION%.",
    "Chutes de neige exceptionnelles à %CITY% et ses environs.",
    "Brouillard magique dense sur toute la contrée de %REGION%.",
    "Les aurores boréales seront visibles depuis %CITY% ce soir.",
    "Pluies acides signalées aux frontières de %REGION%. Restez à couvert."
  ]}
];

function generateDailyNews(gameDay){
  // Generate 5-7 news items for a given day (deterministic by day)
  var regions = getRegions();
  var cities = getCities();
  var personas = getNonGuidePersonas();
  if(!regions.length || !cities.length) return [];

  function seededRandom(seed){
    var x = Math.sin(seed) * 43758.5453;
    return x - Math.floor(x);
  }

  var count = 5 + Math.floor(seededRandom(gameDay * 17) * 3); // 5-7 items
  var news = [];

  for(var i = 0; i < count; i++){
    var seed = gameDay * 100 + i * 13;
    var catIdx = Math.floor(seededRandom(seed) * NEWS_TEMPLATES.length);
    var cat = NEWS_TEMPLATES[catIdx];
    var tplIdx = Math.floor(seededRandom(seed + 7) * cat.templates.length);
    var tpl = cat.templates[tplIdx];

    var r1 = regions[Math.floor(seededRandom(seed + 11) * regions.length)];
    var r2 = regions[Math.floor(seededRandom(seed + 23) * regions.length)];
    if(r2.id === r1.id) r2 = regions[(regions.indexOf(r1) + 1) % regions.length];
    var c1 = cities[Math.floor(seededRandom(seed + 31) * cities.length)];
    var c2 = cities[Math.floor(seededRandom(seed + 43) * cities.length)];
    if(c2.id === c1.id) c2 = cities[(cities.indexOf(c1) + 1) % cities.length];
    var pe = personas[Math.floor(seededRandom(seed + 53) * personas.length)];

    var text = tpl
      .replace("%REGION%", r1.name).replace("%REGION2%", r2.name)
      .replace("%CITY%", c1.name).replace("%CITY2%", c2.name)
      .replace("%PERSONA%", pe ? pe.name : "un inconnu");

    // Generate a hour for the news (spread across the day)
    var hour = Math.floor(seededRandom(seed + 71) * 20) + 4; // 4h-23h
    if(hour > 23) hour = 23;

    news.push({
      cat: cat.cat,
      icon: cat.icon,
      text: text,
      hour: hour,
      region: r1.id,
      city: c1.id
    });
  }

  // Sort by hour
  news.sort(function(a, b){ return b.hour - a.hour });
  return news;
}

function initWeather(){
  var btn = document.getElementById("orb-weather-btn");
  var wrap = document.getElementById("orb-weather-wrap");
  updateWeatherIcon();
  function doOpen(e){ e.stopPropagation(); openDailyInfoPanel() }
  if(btn) btn.addEventListener("click", doOpen);
  if(wrap) wrap.addEventListener("click", doOpen);
}

function updateWeatherIcon(){
  var ico = document.getElementById("orb-weather-icon");
  if(!ico) return;
  ico.textContent = "📰"; // Changed from weather to news icon
}

function openDailyInfoPanel(){
  var html = buildDailyInfoHTML();
  setFooterPanelContent(html);
  wireDailyInfoActions();
  var asm = document.getElementById("footer-assembly");
  if(asm){
    asm.classList.add("snapping");
    asm.style.transform = "translateY(0px)";
    window._fpOpen = true;
    setTimeout(function(){ asm.classList.remove("snapping") }, 450);
  }
  setDiamondImage(null, "📰");
  var wBtn = document.getElementById("orb-weather-wrap");
  if(wBtn) wBtn.classList.add("active");
  var cBtn = document.getElementById("orb-cal-wrap");
  if(cBtn) cBtn.classList.remove("active");
}

function buildDailyInfoHTML(){
  var u = loadUser();
  var w = getTodayWeather();
  var night = isNightInGame();
  var wIcon = night && w.night_variant ? w.night_variant.icon : w.icon;
  var wName = night && w.night_variant ? w.night_variant.name : w.name;
  var wDesc = night && w.night_variant ? w.night_variant.desc : w.desc;
  var wCol = w.color || "#c9a04a";
  var dateStr = getGameDate(u.gameDay, u.gameHour);

  var h = '<div class="daily-info-wrap">';

  // Header with date
  h += '<div style="text-align:center;padding:8px 0 12px">'
    + '<div style="font-size:11px;color:var(--bone-dim);letter-spacing:1px;text-transform:uppercase">Gazette d\'Extelua</div>'
    + '<div style="font-size:14px;font-weight:700;color:var(--gold-light);font-family:var(--font-heading)">'+esc(dateStr)+'</div></div>';

  // Weather card (compact)
  h += '<div style="display:flex;align-items:center;gap:10px;padding:10px;margin:0 0 12px;background:linear-gradient(145deg,rgba(30,24,18,.9),rgba(20,16,12,.95));border:1px solid '+wCol+'25;border-radius:10px">'
    + '<div style="font-size:28px">'+wIcon+'</div>'
    + '<div style="flex:1"><div style="font-size:11px;font-weight:600;color:'+esc(wCol)+'">'+esc(wName)+'</div>'
    + '<div style="font-size:10px;color:var(--bone-dim);line-height:1.4">'+esc(wDesc)+'</div></div>';
  if(w.stats){
    h += '<div style="display:flex;flex-direction:column;gap:2px;font-size:9px;color:var(--bone-dim);text-align:right">';
    if(w.stats.temp) h += '<div>🌡️ '+esc(w.stats.temp)+'</div>';
    if(w.stats.vent) h += '<div>💨 '+esc(w.stats.vent)+'</div>';
    if(w.stats.mana) h += '<div>🔮 '+esc(w.stats.mana)+'</div>';
    h += '</div>';
  }
  h += '</div>';

  // Today's news
  var todayNews = generateDailyNews(u.gameDay);
  h += '<div class="section-title" style="padding:0 0 6px">Actualités du jour</div>';
  h += '<div style="display:grid;gap:6px">';
  todayNews.forEach(function(n){
    var onlyPast = n.hour <= u.gameHour; // Only show news from hours already passed
    if(!onlyPast) return;
    h += '<div class="daily-news-item" style="display:flex;gap:8px;padding:8px 10px;background:rgba(255,255,255,.03);border-radius:8px;border:1px solid rgba(255,255,255,.05)">'
      + '<div style="font-size:16px;flex-shrink:0;padding-top:2px">'+n.icon+'</div>'
      + '<div style="flex:1;min-width:0"><div style="font-size:10px;color:var(--gold-light);font-weight:600;margin-bottom:2px">'+esc(n.cat)+' — '+String(n.hour).padStart(2,"0")+'h</div>'
      + '<div style="font-size:10.5px;color:var(--bone-dim);line-height:1.45">'+esc(n.text)+'</div></div></div>';
  });
  // If no news yet (too early)
  var visibleCount = todayNews.filter(function(n){ return n.hour <= u.gameHour }).length;
  if(visibleCount === 0){
    h += '<div style="text-align:center;color:var(--bone-dim);padding:16px 0;font-size:11px;font-style:italic">Aucune actualité pour le moment. Revenez plus tard dans la journée.</div>';
  }
  h += '</div>';

  // Yesterday's news (if day > 1)
  if(u.gameDay > 1){
    var yesterdayNews = generateDailyNews(u.gameDay - 1);
    var yDateStr = getGameDate(u.gameDay - 1);
    h += '<div class="section-title" style="padding:12px 0 6px">Hier — '+esc(yDateStr)+'</div>';
    h += '<div style="display:grid;gap:4px;opacity:.7">';
    yesterdayNews.forEach(function(n){
      h += '<div style="display:flex;gap:6px;padding:6px 8px;font-size:10px;color:var(--bone-dim);background:rgba(255,255,255,.02);border-radius:6px">'
        + '<span>'+n.icon+'</span><span>'+esc(n.text)+'</span></div>';
    });
    h += '</div>';
  }

  h += '</div>';
  return h;
}

function wireDailyInfoActions(){
  // Future: clickable news items, filters, etc.
}

