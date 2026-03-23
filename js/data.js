"use strict";

/* Load all JSON files */
async function loadAllData(){
  try {
    var r = await fetch("datas/bundle.json");
    if(!r.ok) throw new Error("bundle fetch failed: " + r.status);
    var bundle = await r.json();
    if(bundle.authors) authData = bundle.authors;
    if(bundle.encyclopedia) encyData = bundle.encyclopedia;
    if(bundle.personas) personasData = bundle.personas;
    if(bundle.locations) locsData = bundle.locations;
    if(bundle.games) gamesData = bundle.games;
    if(bundle.elements) elementsData = bundle.elements;
    if(bundle.dialog) dialogData = bundle.dialog;
    if(bundle.projects) projectsData = bundle.projects;
    if(bundle.calendar) calendarData = bundle.calendar;
    if(bundle.weather) weatherData = bundle.weather;
    if(bundle.jobs) jobsData = bundle.jobs;
  } catch(e){
    console.warn("Bundle load failed, falling back to individual files:", e);
    async function loadJSON(path){
      try { var r = await fetch(path); if(r.ok) return await r.json(); } catch(e){}
      return null;
    }
    var [auth, ency, personas, locs, games, elems, dialog, projects, calendar, weather, jobs] = await Promise.all([
      loadJSON("datas/authors.json"),
      loadJSON("datas/encyclopedia.json"),
      loadJSON("datas/personas.json"),
      loadJSON("datas/locations.json"),
      loadJSON("datas/games.json"),
      loadJSON("datas/elements.json"),
      loadJSON("datas/dialog.json"),
      loadJSON("datas/projects.json"),
      loadJSON("datas/calendar.json"),
      loadJSON("datas/weather.json"),
      loadJSON("datas/jobs.json")
    ]);
    if(auth) authData = auth;
    if(ency) encyData = ency;
    if(personas) personasData = personas;
    if(locs) locsData = locs;
    if(games) gamesData = games;
    if(elems) elementsData = elems;
    if(dialog) dialogData = dialog;
    if(projects) projectsData = projects;
    if(calendar) calendarData = calendar;
    if(weather) weatherData = weather;
    if(jobs) jobsData = jobs;
  }
  if(authData.author) avatarMap[authData.author.id] = authData.author.avatar;
  (authData.guides||[]).forEach(function(g){ if(g && g.avatar) avatarMap[g.id] = g.avatar });
  getPersonas().forEach(function(p){ if(p.avatar) avatarMap[p.id] = p.avatar });
}

/* DATA HELPERS */
function getPersonas(){ return (personasData && personasData.personas) || [] }
function getGuideId(){ return (personasData && personasData.guide) || "atom" }
function getLocations(){ return (locsData && locsData.locations) || [] }
function getCities(){ return (locsData && locsData.cities) || [] }
function getRegions(){ return (locsData && locsData.regions) || [] }
function getRegionById(id){ return getRegions().find(function(r){ return r.id === id }) || null }
function getCitiesByRegion(rid){ return getCities().filter(function(c){ return c.region === rid && !c.hidden }) }
function getJobs(){ return (jobsData && jobsData.jobs) || [] }
function getJobById(id){ return getJobs().find(function(j){ return j.id === id }) || null }
function getReputationTiers(){ return (locsData && locsData.reputationTiers) || [] }
function getRepTier(value){
  var tiers = getReputationTiers();
  var tier = tiers[0] || {id:"inconnu",name:"Inconnu",icon:"❓",color:"#64748b"};
  for(var i = tiers.length - 1; i >= 0; i--){
    if(value >= tiers[i].min){ tier = tiers[i]; break }
  }
  return tier;
}
function getCurrency(){ return (locsData && locsData.currency) || {name:"Sablons",icon:"S",symbol:"S"} }
function getGames(){ return (gamesData && gamesData.games) || [] }
function getEncyCards(){ return (encyData && encyData.cards) || [] }
function getEncyCats(){ return (encyData && encyData.categories) || [] }
function getGuidePersona(){ return getPersonas().find(function(p){ return p.id === getGuideId() }) || null }
function getNonGuidePersonas(){ var gid = getGuideId(); return getPersonas().filter(function(p){ return p.id !== gid }) }
function getPersonaById(id){ return getPersonas().find(function(p){ return p.id === id }) || null }

/* USER */
var USER_KEYS = {
  name:"ac_name", avatar:"ac_avatar", floor:"ac_floor", coins:"ac_coins",
  visited:"ac_visited", floorsUp:"ac_fup", floorsDown:"ac_fdn",
  title:"ac_title", quote:"ac_quote", cardColor:"ac_ccolor",
  statCRE:"ac_cre", statSAG:"ac_sag", statCHA:"ac_cha",
  statFOR:"ac_for", statAGI:"ac_agi", level:"ac_level", xp:"ac_xp",
  region:"ac_region", startCity:"ac_startCity", borderPasses:"ac_borderPasses",
  job:"ac_job", reputation:"ac_reputation", personaAffinities:"ac_affinities",
  gameDay:"ac_gameDay", gameHour:"ac_gameHour", gameMinute:"ac_gameMinute", gameSecond:"ac_gameSecond", mapX:"ac_mapX", mapY:"ac_mapY",
  worldName:"ac_worldName", className:"ac_className"
};
function loadUser(){
  return {
    name: acDB.get(USER_KEYS.name) || "",
    avatar: acDB.get(USER_KEYS.avatar) || "",
    floor: parseInt(acDB.get(USER_KEYS.floor)) || 0,
    coins: parseInt(acDB.get(USER_KEYS.coins)) || 250,
    visited: JSON.parse(acDB.get(USER_KEYS.visited) || "{}"),
    floorsUp: parseInt(acDB.get(USER_KEYS.floorsUp)) || 0,
    floorsDown: parseInt(acDB.get(USER_KEYS.floorsDown)) || 0,
    title: acDB.get(USER_KEYS.title) || "Voyageur",
    quote: acDB.get(USER_KEYS.quote) || "Chaque porte ouverte est un pas vers l'inconnu.",
    cardColor: acDB.get(USER_KEYS.cardColor) || "#c9a04a",
    statCRE: parseInt(acDB.get(USER_KEYS.statCRE)) || 50,
    statSAG: parseInt(acDB.get(USER_KEYS.statSAG)) || 50,
    statCHA: parseInt(acDB.get(USER_KEYS.statCHA)) || 50,
    statFOR: parseInt(acDB.get(USER_KEYS.statFOR)) || 50,
    statAGI: parseInt(acDB.get(USER_KEYS.statAGI)) || 50,
    level: parseInt(acDB.get(USER_KEYS.level)) || 1,
    xp: parseInt(acDB.get(USER_KEYS.xp)) || 0,
    region: acDB.get(USER_KEYS.region) || "",
    startCity: acDB.get(USER_KEYS.startCity) || "",
    borderPasses: JSON.parse(acDB.get(USER_KEYS.borderPasses) || "[]"),
    job: acDB.get(USER_KEYS.job) || "",
    reputation: JSON.parse(acDB.get(USER_KEYS.reputation) || "{}"),
    personaAffinities: JSON.parse(acDB.get(USER_KEYS.personaAffinities) || "{}"),
    gameDay: parseInt(acDB.get(USER_KEYS.gameDay)) || 1,
    gameHour: parseInt(acDB.get(USER_KEYS.gameHour)) || 8,
    gameMinute: parseInt(acDB.get(USER_KEYS.gameMinute)) || 0,
    gameSecond: parseInt(acDB.get(USER_KEYS.gameSecond)) || 0,
    mapX: parseFloat(acDB.get(USER_KEYS.mapX)) || 0,
    mapY: parseFloat(acDB.get(USER_KEYS.mapY)) || 0,
    worldName: acDB.get(USER_KEYS.worldName) || "",
    className: acDB.get(USER_KEYS.className) || ""
  };
}
function saveUser(u){
  var pairs = [];
  Object.keys(USER_KEYS).forEach(function(k){
    if(k === "avatar") return;
    var v = u[k];
    if(typeof v === "object") v = JSON.stringify(v);
    pairs.push([USER_KEYS[k], String(v != null ? v : "")]);
  });
  acDB.setMany(pairs);
  updateOrbLabels();
}
function saveAvatar(dataUrl){
  acDB._cache[USER_KEYS.avatar] = dataUrl;
  return acDB.setBig(USER_KEYS.avatar, dataUrl);
}

var CARD_COLORS = [
  {id:"#c9a04a",name:"Or"},{id:"#8b1a1a",name:"Sang"},
  {id:"#2e5ea6",name:"Mana"},{id:"#27ae60",name:"Poison"},
  {id:"#9b59b6",name:"Arcane"},{id:"#e74c3c",name:"Feu"},
  {id:"#5dade2",name:"Givre"},{id:"#64748b",name:"Acier"}
];

function updateOrbLabels(){
  var u = loadUser();
  // Sync portrait
  var fp = document.getElementById("footer-portrait");
  var pImg = document.getElementById("orb-portrait-img");
  var pEmpty = document.getElementById("orb-portrait-empty");
  if(pImg && pEmpty && fp){
    if(u.avatar){
      pImg.src = u.avatar; pImg.style.display = "";
      pEmpty.style.display = "none";
      fp.style.opacity = "";
    } else {
      pImg.style.display = "none";
      pEmpty.style.display = "none";
      fp.style.opacity = "0";
    }
  }
  if(fp) fp.classList.toggle("active-page", curPage === "user" || curPage === "profile");
  // Update footer level display
  var flvl = document.getElementById("footer-level");
  if(flvl) flvl.textContent = "Niv. " + u.level;
}

