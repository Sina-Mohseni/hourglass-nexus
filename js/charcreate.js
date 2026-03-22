"use strict";

/* ══════════ CHARACTER CREATION ══════════ */
var ccAvatarData = "";
var ccDialogIdx = 0;
var ccPhase = "intro"; // intro | choice | creation | avatar | name | region | city | farewell
var ccSelectedRegion = "";
var ccSelectedCity = "";
var ccSelectedJob = "";

var CC_INTRO = [
  "Bienvenue, voyageur. Je suis <span class='hl'>A.T.O.M.</span>, l'Architecte Temporel des Origines Mécaniques.",
  "Tu te trouves aux portes du <span class='hl'>Nexus</span> — un carrefour entre les mondes, forgé dans les abysses de <span class='hlr'>Kael-Norath</span>.",
  "Ici, les <span class='hlr'>récits</span> prennent forme et les <span class='hlc'>jeux</span> deviennent des épreuves légendaires."
];
var CC_CHOICE_DIALOG = "Que souhaites-tu faire ?";
var CC_CREATION = [
  "Très bien. Un nouveau chemin s'ouvre devant toi…",
  "Mais avant d'aller plus loin, j'ai besoin de savoir <span class='hl'>qui</span> tu es.",
  "Choisis un <span class='hl'>portrait</span> qui te représente — ou reste dans l'ombre, si c'est ton souhait."
];

var CC_SCENARIO_INTROS = {
  "lambda": [
    "Tu as choisi le chemin d'un <span class='hl'>Lambda</span> — un simple voyageur, sans titre ni prétention.",
    "C'est un chemin modeste, mais ne te méprends pas… les plus grandes légendes sont nées de l'ombre.",
    "Choisis un <span class='hl'>portrait</span> qui te représente."
  ],
  "champion": [
    "Tu as choisi le chemin d'un <span class='hl'>Champion</span> — un guerrier d'élite, forgé pour la victoire.",
    "Le tournoi t'attend de pied ferme. Les <span class='hlr'>quarante</span> te reconnaîtront comme un rival redoutable.",
    "Choisis un <span class='hl'>portrait</span> digne de ta renommée."
  ],
  "rebelle": [
    "Tu as choisi le chemin d'un <span class='hlr'>Rebelle</span> — un dissident qui défie l'ordre établi.",
    "Le tournoi n'est qu'une façade pour toi. Tu y cherches la <span class='hlr'>vérité</span> que les puissants cachent.",
    "Choisis un <span class='hl'>portrait</span> pour masquer tes intentions."
  ],
  "apprenti-morkar": [
    "Tu as choisi le chemin d'un <span class='hlc'>Apprenti de Morkar</span> — un novice dans les arcanes.",
    "Les secrets de <span class='hlc'>Morkar</span> sont vastes et dangereux. Ton maître t'a envoyé ici pour faire tes preuves.",
    "Choisis un <span class='hl'>portrait</span> qui te représente, jeune apprenti."
  ],
  "veteran-morkar": [
    "Tu as choisi le chemin d'un <span class='hlc'>Vétéran de Morkar</span> — un maître aguerri des mystères.",
    "Tu connais les <span class='hlc'>arcanes</span> mieux que quiconque. Le tournoi sera ton terrain de chasse.",
    "Choisis un <span class='hl'>portrait</span> digne de ton rang, Vétéran."
  ]
};
var CC_NAME_DIALOG = "Bien. Maintenant, dis-moi… quel <span class='hl'>nom</span> portes-tu ?";
var CC_REGION_DIALOG = "Chaque voyageur vient de quelque part. De quelle <span class='hl'>contrée</span> es-tu originaire ?";
var CC_CITY_DIALOG = "Et dans cette contrée… quelle <span class='hl'>cité</span> appelles-tu ton foyer ?";
var CC_FAREWELL = "Bienvenue dans le Nexus, <span class='hl'>%NAME%</span> — <span class='hlc'>%JOB%</span> de <span class='hlc'>%CITY%</span>, contrée de <span class='hlr'>%REGION%</span>. Ton voyage commence <span class='hl'>maintenant</span>.";

function initCharCreate(){
  var screen = document.getElementById("charcreate-screen");
  if(!screen) return;

  _prepareCharCreateScreen(screen);

  ccDialogIdx = 0;
  ccPhase = "intro";
  showCCDialog(CC_INTRO[0]);
  showCCTapHint(true);

  var zone = document.querySelector(".cc-dialog-zone");
  if(zone) zone.onclick = function(e){
    if(e.target.closest("input, button, .cc-avatar-ring, .cc-avatar-label")) return;
    advanceCCDialog();
  };

  // Wire choice buttons (legacy, kept for fallback)
  var newBtn = document.getElementById("cc-choice-new");
  if(newBtn) newBtn.onclick = function(){
    ccPhase = "creation";
    ccDialogIdx = 0;
    hideCCChoiceZone();
    showCCDialog(CC_CREATION[0]);
    showCCTapHint(true);
  };
  var resumeBtn = document.getElementById("cc-choice-resume");
  var hasSave = acDB.get("ac_saveExists") === "1" || acDB.get("ac_charCreated") === "1";
  if(resumeBtn && hasSave) resumeBtn.disabled = false;
  if(resumeBtn) resumeBtn.onclick = function(){
    if(resumeBtn.disabled) return;
    if(acDB.get("ac_saveExists") === "1"){
      loadGameSave();
    } else {
      var screen = document.getElementById("charcreate-screen");
      if(screen){
        screen.classList.add("exiting");
        setTimeout(function(){ screen.remove(); enterMainApp() }, 600);
      }
    }
  };
}

/* New voyage: portrait+name already done, skip to scenario dialog then region */
function initCharCreateNewVoyage(){
  var screen = document.getElementById("charcreate-screen");
  if(!screen) return;

  _prepareCharCreateScreen(screen);

  // Hide the choice zone and avatar/name zones (already done before scenario)
  var choiceZone = document.getElementById("cc-choice-zone");
  if(choiceZone) choiceZone.style.display = "none";
  var avatarZone = document.getElementById("cc-avatar-zone");
  if(avatarZone) avatarZone.style.display = "none";
  var nameZone = document.getElementById("cc-name-zone");
  if(nameZone) nameZone.style.display = "none";

  // Use scenario-specific dialog
  var scenario = window._chosenScenario || "lambda";
  var scenarioDialogs = CC_SCENARIO_INTROS[scenario] || CC_CREATION;
  window._ccScenarioDialogs = scenarioDialogs;

  // Save scenario to user data
  var u = loadUser();
  u.scenario = scenario;
  saveUser(u);

  // Show scenario intro dialogs, then go straight to region
  ccDialogIdx = 0;
  ccPhase = "creation";
  showCCDialog(scenarioDialogs[0]);
  showCCTapHint(true);

  var zone = document.querySelector(".cc-dialog-zone");
  if(zone) zone.onclick = function(e){
    if(e.target.closest("input, button, .cc-avatar-ring, .cc-avatar-label")) return;
    advanceCCDialog();
  };
}

function _prepareCharCreateScreen(screen){
  screen.style.display = "";

  // Wire guide music volume toggle
  var ccVolBtn = document.getElementById("cc-volume-btn");
  var ccVolOn = document.getElementById("cc-vol-on");
  var ccVolOff = document.getElementById("cc-vol-off");
  var guideAudio = document.getElementById("guide-music");
  if(ccVolBtn && guideAudio){
    ccVolBtn.onclick = function(){
      guideAudio.muted = !guideAudio.muted;
      if(ccVolOn) ccVolOn.style.display = guideAudio.muted ? "none" : "";
      if(ccVolOff) ccVolOff.style.display = guideAudio.muted ? "" : "none";
    };
  }

  // Inject CC region/city animations if not already present
  if(!document.getElementById("cc-extra-styles")){
    var sty = document.createElement("style");
    sty.id = "cc-extra-styles";
    sty.textContent = "@keyframes ccFadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}"
      + "@keyframes ccFadeOut{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-8px)}}"
      + ".cc-region-zone::-webkit-scrollbar,.cc-city-zone::-webkit-scrollbar{width:3px}"
      + ".cc-region-zone::-webkit-scrollbar-thumb,.cc-city-zone::-webkit-scrollbar-thumb{background:rgba(201,160,74,.25);border-radius:4px}";
    document.head.appendChild(sty);
  }

  var guide = getGuidePersona();
  var portraitEl = document.getElementById("cc-guide-portrait");
  var titleEl = document.getElementById("cc-guide-title");
  if(guide && guide.avatar && portraitEl) portraitEl.innerHTML = '<img src="'+esc(guide.avatar)+'">';
  if(guide && titleEl) titleEl.textContent = guide.name;

  // Dialog zone starts hidden, fades in
  var zone = document.querySelector(".cc-dialog-zone");
  if(zone){
    zone.style.opacity = "0";
    zone.style.transform = "translateY(16px)";
    setTimeout(function(){
      zone.style.transition = "opacity .6s ease, transform .6s ease";
      zone.style.opacity = "1";
      zone.style.transform = "translateY(0)";
    }, 400);
  }
}

function showCCDialog(html){
  var textEl = document.getElementById("cc-dialog-text");
  if(!textEl) return;
  textEl.style.animation = "none";
  textEl.offsetHeight;
  textEl.style.animation = "";
  textEl.innerHTML = html;
}

function showCCTapHint(show){
  var hint = document.getElementById("cc-tap-hint");
  if(hint) hint.classList.toggle("visible", show);
}

function showCCChoiceZone(){
  var zone = document.getElementById("cc-choice-zone");
  if(zone) zone.classList.add("visible");
}
function hideCCChoiceZone(){
  var zone = document.getElementById("cc-choice-zone");
  if(zone){ zone.classList.remove("visible"); zone.style.display = "none" }
}

function advanceCCDialog(){
  if(ccPhase === "intro"){
    ccDialogIdx++;
    if(ccDialogIdx < CC_INTRO.length){
      showCCDialog(CC_INTRO[ccDialogIdx]);
    } else {
      // Show choice
      ccPhase = "choice";
      showCCDialog(CC_CHOICE_DIALOG);
      showCCTapHint(false);
      showCCChoiceZone();
    }
  } else if(ccPhase === "creation"){
    var dialogs = window._ccScenarioDialogs || CC_CREATION;
    ccDialogIdx++;
    if(ccDialogIdx < dialogs.length){
      showCCDialog(dialogs[ccDialogIdx]);
    } else {
      // Portrait+name already done before scenario choice → go to region
      goToRegionPhase();
    }
  } else if(ccPhase === "farewell"){
    var screen = document.getElementById("charcreate-screen");
    if(screen){
      screen.classList.add("exiting");
      setTimeout(function(){ screen.remove(); enterMainApp() }, 600);
    }
  }
}

/* ══════════ SAVE / LOAD SYSTEM ══════════ */
function saveGame(){
  var u = loadUser();
  var saveData = {
    user: u,
    team: teamIds,
    city: currentCityId,
    activeLoc: activeLocId,
    page: curPage,
    timestamp: new Date().toISOString()
  };
  acDB.set("ac_gameSave", JSON.stringify(saveData));
  acDB.set("ac_saveExists", "1");
  return saveData;
}

function loadGameSave(){
  var raw = acDB.get("ac_gameSave");
  if(!raw) return;
  try {
    var save = JSON.parse(raw);
    // Restore user data
    if(save.user){
      var pairs = [];
      Object.keys(USER_KEYS).forEach(function(k){
        if(k === "avatar") return;
        var v = save.user[k];
        if(typeof v === "object") v = JSON.stringify(v);
        pairs.push([USER_KEYS[k], String(v != null ? v : "")]);
      });
      acDB.setMany(pairs);
    }
    if(save.team) { teamIds = save.team; acDB.set("ac_team", JSON.stringify(teamIds)) }
    if(save.city) { currentCityId = save.city; acDB.set("ac_city", save.city) }
    if(save.activeLoc) { activeLocId = save.activeLoc; acDB.set("ac_activeLoc", save.activeLoc) }

    acDB.set("ac_charCreated", "1");

    var screen = document.getElementById("charcreate-screen");
    if(screen){
      screen.classList.add("exiting");
      setTimeout(function(){ screen.remove(); enterMainApp() }, 600);
    }
  } catch(e){ console.warn("Load save error:", e) }
}

function wireAvatarEvents(){
  var ring = document.querySelector(".cc-avatar-ring");
  var fileInput = document.getElementById("cc-file-input");
  var preview = document.getElementById("cc-avatar-preview");
  var label = document.querySelector(".cc-avatar-label");
  var skipBtn = document.getElementById("cc-skip-avatar");

  if(ring && fileInput){
    ring.onclick = function(){ fileInput.click() };
  }
  if(label && fileInput){
    label.onclick = function(){ fileInput.click() };
  }
  if(fileInput){
    fileInput.onchange = function(){
      var file = fileInput.files[0]; if(!file) return;
      var reader = new FileReader();
      reader.onload = function(e){
        ccAvatarData = e.target.result;
        if(preview) preview.innerHTML = '<img src="'+ccAvatarData+'">';
        goToNamePhase();
      };
      reader.readAsDataURL(file);
    };
  }
  if(skipBtn){
    skipBtn.onclick = function(){ goToNamePhase() };
  }
}

function goToNamePhase(){
  ccPhase = "name";
  showCCDialog(CC_NAME_DIALOG);

  var avatarZone = document.getElementById("cc-avatar-zone");
  if(avatarZone) avatarZone.style.display = "none";

  var nameZone = document.getElementById("cc-name-zone");
  if(nameZone) nameZone.classList.add("visible");

  var nameInput = document.getElementById("cc-name-input");
  var confirmBtn = document.getElementById("cc-confirm-btn");

  if(nameInput && confirmBtn){
    nameInput.addEventListener("input", function(){
      confirmBtn.disabled = nameInput.value.trim().length < 2;
    });
    confirmBtn.onclick = function(){
      if(nameInput.value.trim().length < 2) return;
      finishCharCreate(nameInput.value.trim());
    };
  }
  showCCTapHint(false);
}

async function finishCharCreate(name){
  var confirmBtn = document.getElementById("cc-confirm-btn");
  if(confirmBtn) confirmBtn.disabled = true;

  var nameZone = document.getElementById("cc-name-zone");
  if(nameZone) nameZone.style.display = "none";

  // Save name + avatar (but don't mark as created yet)
  var u = loadUser();
  u.name = name;
  saveUser(u);
  if(ccAvatarData) await saveAvatar(ccAvatarData);

  // Go to region selection (job comes after region+city)
  goToRegionPhase();
}

function goToJobPhase(){
  ccPhase = "job";
  var region = getRegionById(ccSelectedRegion);
  var city = getCities().find(function(c){ return c.id === ccSelectedCity });
  var regionName = region ? region.name : "";
  var cityName = city ? city.name : "";
  showCCDialog("Tu viens de <span class='hlc'>"+esc(cityName)+"</span> en <span class='hlr'>"+esc(regionName)+"</span>. Quel <span class='hl'>métier</span> pratiques-tu ?");
  showCCTapHint(false);

  var allJobs = getJobs();
  var zone = document.querySelector(".cc-dialog-zone");
  if(!zone) return;

  // Remove previous dynamic zones
  var old = zone.querySelector(".cc-job-zone");
  if(old) old.remove();

  // Filter jobs by availability: universal + matching region/city
  var availableJobs = [];
  var exclusiveJobs = [];
  var lockedJobs = [];
  allJobs.forEach(function(j){
    var hasRegionLock = j.unlockRegions && j.unlockRegions.length > 0;
    var hasCityLock = j.unlockCities && j.unlockCities.length > 0;
    if(!hasRegionLock && !hasCityLock){
      // Universal job
      availableJobs.push({job:j, exclusive:false});
    } else {
      var regionMatch = hasRegionLock && j.unlockRegions.indexOf(ccSelectedRegion) >= 0;
      var cityMatch = hasCityLock && j.unlockCities.indexOf(ccSelectedCity) >= 0;
      if(regionMatch || cityMatch){
        availableJobs.push({job:j, exclusive:true});
        exclusiveJobs.push(j);
      } else {
        lockedJobs.push(j);
      }
    }
  });

  // Group by category
  var cats = {};
  availableJobs.forEach(function(entry){
    var j = entry.job;
    if(!cats[j.category]) cats[j.category] = [];
    cats[j.category].push(entry);
  });
  var catOrder = ["Combat","Magie","Artisanat","Social","Exploration"];
  var catIcons = {"Combat":"⚔️","Magie":"🔮","Artisanat":"🔨","Social":"🤝","Exploration":"🧭"};

  var div = document.createElement("div");
  div.className = "cc-job-zone";
  div.style.cssText = "padding:8px 16px;max-height:48vh;overflow-y:auto;animation:ccFadeUp .4s ease both";

  // Exclusive banner
  if(exclusiveJobs.length > 0){
    var exBanner = document.createElement("div");
    exBanner.style.cssText = "background:rgba(201,160,74,.08);border:1px solid rgba(201,160,74,.2);border-radius:8px;padding:6px 10px;margin-bottom:8px;font-size:9.5px;color:var(--gold-light);line-height:1.4";
    exBanner.innerHTML = "⭐ <b>Métiers exclusifs débloqués</b> grâce à votre origine : " + exclusiveJobs.map(function(j){ return j.icon + " " + esc(j.name) }).join(", ");
    div.appendChild(exBanner);
  }

  // Category tabs
  var tabBar = document.createElement("div");
  tabBar.style.cssText = "display:flex;gap:4px;margin-bottom:8px;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:4px";
  var firstVisibleCat = "";
  catOrder.forEach(function(cat){
    if(!cats[cat] || cats[cat].length === 0) return;
    if(!firstVisibleCat) firstVisibleCat = cat;
    var isFirst = (cat === firstVisibleCat);
    var tab = document.createElement("button");
    tab.setAttribute("data-jcat", cat);
    tab.style.cssText = "flex-shrink:0;padding:5px 10px;border:1px solid rgba(201,160,74,.2);border-radius:16px;background:"+(isFirst?"rgba(201,160,74,.15)":"rgba(255,255,255,.03)")+";color:"+(isFirst?"var(--gold-light)":"var(--bone-dim)")+";font-size:10px;cursor:pointer;font-family:var(--font-heading,Poppins,sans-serif);transition:all .2s";
    tab.textContent = (catIcons[cat]||"") + " " + cat + " (" + cats[cat].length + ")";
    tab.onclick = function(e){
      e.stopPropagation();
      tabBar.querySelectorAll("button").forEach(function(b){ b.style.background="rgba(255,255,255,.03)"; b.style.color="var(--bone-dim)" });
      tab.style.background="rgba(201,160,74,.15)"; tab.style.color="var(--gold-light)";
      grid.querySelectorAll(".cc-job-btn").forEach(function(b){ b.style.display = b.getAttribute("data-jcat")===cat ? "" : "none" });
    };
    tabBar.appendChild(tab);
  });
  div.appendChild(tabBar);

  // Jobs grid
  var grid = document.createElement("div");
  grid.style.cssText = "display:grid;grid-template-columns:1fr 1fr;gap:6px";
  availableJobs.forEach(function(entry){
    var j = entry.job;
    var isExcl = entry.exclusive;
    var btn = document.createElement("button");
    btn.className = "cc-job-btn";
    btn.setAttribute("data-jid", j.id);
    btn.setAttribute("data-jcat", j.category);
    btn.style.cssText = "background:rgba(255,255,255,.04);border:1.5px solid "+j.color+"40;border-radius:10px;padding:10px 8px;cursor:pointer;text-align:left;transition:all .25s ease;position:relative"
      + (j.category !== firstVisibleCat ? ";display:none" : "");
    btn.innerHTML = (isExcl ? '<div style="position:absolute;top:4px;right:4px;font-size:8px;background:rgba(201,160,74,.2);color:var(--gold-light);padding:1px 5px;border-radius:8px">⭐ Exclusif</div>' : '')
      + '<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px"><span style="font-size:18px">'+j.icon+'</span>'
      + '<span style="font-size:11px;font-weight:700;color:'+esc(j.color)+';font-family:var(--font-heading,Poppins,sans-serif)">'+esc(j.name)+'</span></div>'
      + '<div style="font-size:8.5px;color:rgba(255,255,255,.4);line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">'+esc(j.desc)+'</div>';
    btn.onclick = function(e){
      e.stopPropagation();
      ccSelectedJob = j.id;
      grid.querySelectorAll(".cc-job-btn").forEach(function(b){
        var sel = b.getAttribute("data-jid") === j.id;
        b.style.borderColor = sel ? j.color : "rgba(255,255,255,.08)";
        b.style.background = sel ? j.color+"22" : "rgba(255,255,255,.02)";
        b.style.opacity = sel ? "1" : "0.4";
      });
      setTimeout(function(){
        div.style.animation = "ccFadeOut .3s ease both";
        setTimeout(function(){ div.remove(); completeCCFinal() }, 300);
      }, 400);
    };
    grid.appendChild(btn);
  });
  div.appendChild(grid);

  // Locked jobs section
  if(lockedJobs.length > 0){
    var ls = document.createElement("div");
    ls.style.cssText = "margin-top:10px;padding:8px;border-radius:8px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06)";
    ls.innerHTML = '<div style="font-size:9px;color:var(--bone-dim);text-align:center;margin-bottom:4px">🔒 '+lockedJobs.length+' métier'+(lockedJobs.length>1?'s':'')+' verrouillé'+(lockedJobs.length>1?'s':'')+' pour cette origine</div>'
      + '<div style="display:flex;flex-wrap:wrap;gap:4px;justify-content:center">'
      + lockedJobs.map(function(j){ return '<span style="font-size:8px;padding:2px 6px;border-radius:4px;background:rgba(255,255,255,.04);color:var(--bone-dim);opacity:.5" title="'+esc(j.unlockNote||'')+'">'+j.icon+' '+esc(j.name)+'</span>' }).join('')
      + '</div>';
    div.appendChild(ls);
  }

  zone.appendChild(div);
}

function completeCCFinal(){
  // Save everything: region, city, job, passes, stats, reputation, affinities
  var u = loadUser();
  u.region = ccSelectedRegion;
  u.startCity = ccSelectedCity;
  u.job = ccSelectedJob;
  if(u.borderPasses.indexOf(ccSelectedRegion) < 0) u.borderPasses.push(ccSelectedRegion);

  // Apply job stat bonuses/maluses
  var job = getJobById(ccSelectedJob);
  if(job){
    if(job.statBonus) Object.keys(job.statBonus).forEach(function(k){ u["stat"+k] = Math.max(1, Math.min(99, (u["stat"+k]||50) + job.statBonus[k])) });
    if(job.statMalus) Object.keys(job.statMalus).forEach(function(k){ u["stat"+k] = Math.max(1, Math.min(99, (u["stat"+k]||50) + job.statMalus[k])) });
  }

  // Initialize reputation: home region 25, home city 30
  u.reputation["r_"+ccSelectedRegion] = 25;
  u.reputation["c_"+ccSelectedCity] = 30;

  // Initialize persona affinities
  getPersonas().forEach(function(p){
    if(p.role === "Guide") return;
    u.personaAffinities[p.id] = 0;
  });

  saveUser(u);
  currentCityId = ccSelectedCity;
  acDB.set("ac_city", ccSelectedCity);
  // Set initial map position to starting city
  var startC = getCities().find(function(c){ return c.id === ccSelectedCity });
  if(startC){ u.mapX = startC.wx; u.mapY = startC.wy; }
  u.gameDay = 1;
  u.gameHour = 8;
  saveUser(u);
  acDB.set("ac_charCreated", "1");

  // Farewell
  var region = getRegionById(ccSelectedRegion);
  var city = getCities().find(function(c){ return c.id === ccSelectedCity });
  var farewell = CC_FAREWELL
    .replace("%NAME%", esc(u.name))
    .replace("%JOB%", job ? esc(job.name) : "???")
    .replace("%CITY%", city ? esc(city.name) : "???")
    .replace("%REGION%", region ? esc(region.name) : "???");

  ccPhase = "farewell";
  showCCDialog(farewell);
  showCCTapHint(true);
}

function goToRegionPhase(){
  ccPhase = "region";
  showCCDialog(CC_REGION_DIALOG);
  showCCTapHint(false);

  var regions = getRegions();
  var zone = document.querySelector(".cc-dialog-zone");
  if(!zone) return;

  var old = zone.querySelector(".cc-region-zone");
  if(old) old.remove();
  old = zone.querySelector(".cc-city-zone");
  if(old) old.remove();

  // Build minimap with regions positioned like on worldmap
  var div = document.createElement("div");
  div.className = "cc-region-zone visible";
  div.style.cssText = "position:relative;width:100%;max-width:340px;margin:12px auto;aspect-ratio:4/3;background:url(assets/worldmap.png) center/cover no-repeat;border-radius:12px;border:1px solid rgba(201,160,74,.2);overflow:hidden;animation:ccFadeUp .4s ease both";

  // Dark overlay for contrast
  var overlay = document.createElement("div");
  overlay.style.cssText = "position:absolute;inset:0;background:rgba(10,8,6,.55);border-radius:12px";
  div.appendChild(overlay);

  regions.forEach(function(r){
    var btn = document.createElement("button");
    btn.className = "cc-region-pin";
    btn.setAttribute("data-rid", r.id);
    // Position using region wx/wy (adjusted for the extended map borders)
    btn.style.cssText = "position:absolute;left:"+r.wx+"%;top:"+r.wy+"%;transform:translate(-50%,-50%);"
      + "background:rgba(13,11,8,.85);border:1.5px solid "+r.color+"50;border-radius:8px;"
      + "padding:4px 8px;cursor:pointer;z-index:2;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);"
      + "transition:all .25s ease;white-space:nowrap";
    btn.innerHTML = '<div style="font-size:10px;font-weight:700;color:'+esc(r.color)+';font-family:var(--font-heading,Poppins,sans-serif);line-height:1.2">'+esc(r.name)+'</div>';
    btn.onmouseenter = function(){ btn.style.borderColor = r.color; btn.style.background = r.color+"22"; btn.style.transform = "translate(-50%,-50%) scale(1.1)" };
    btn.onmouseleave = function(){ btn.style.borderColor = r.color+"50"; btn.style.background = "rgba(13,11,8,.85)"; btn.style.transform = "translate(-50%,-50%) scale(1)" };
    btn.onclick = function(e){
      e.stopPropagation();
      ccSelectedRegion = r.id;
      // Highlight selected
      div.querySelectorAll(".cc-region-pin").forEach(function(b){
        var sel = b.getAttribute("data-rid") === r.id;
        b.style.borderColor = sel ? r.color : "rgba(255,255,255,.08)";
        b.style.background = sel ? r.color+"30" : "rgba(13,11,8,.5)";
        b.style.opacity = sel ? "1" : "0.35";
        b.style.transform = sel ? "translate(-50%,-50%) scale(1.15)" : "translate(-50%,-50%) scale(0.9)";
      });
      setTimeout(function(){ goToCityPhase() }, 500);
    };
    div.appendChild(btn);
  });
  zone.appendChild(div);
}

function goToCityPhase(){
  ccPhase = "city";
  var region = getRegionById(ccSelectedRegion);
  var regionName = region ? region.name : "???";
  showCCDialog(CC_CITY_DIALOG);
  showCCTapHint(false);

  var zone = document.querySelector(".cc-dialog-zone");
  if(!zone) return;

  // Remove region zone
  var oldR = zone.querySelector(".cc-region-zone");
  if(oldR){ oldR.style.animation = "ccFadeOut .3s ease both"; setTimeout(function(){ oldR.remove() }, 300) }

  var cities = getCitiesByRegion(ccSelectedRegion);

  setTimeout(function(){
    var old = zone.querySelector(".cc-city-zone");
    if(old) old.remove();

    var div = document.createElement("div");
    div.className = "cc-city-zone";
    div.style.cssText = "display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:12px 16px;max-height:45vh;overflow-y:auto;animation:ccFadeUp .4s ease both";

    // Back button
    var back = document.createElement("button");
    back.style.cssText = "grid-column:1/-1;background:none;border:1px solid rgba(201,160,74,.25);border-radius:8px;padding:6px;color:rgba(201,160,74,.7);font-size:11px;cursor:pointer;font-family:var(--font-heading,Poppins,sans-serif)";
    back.textContent = "← Changer de contrée";
    back.onclick = function(e){ e.stopPropagation(); div.remove(); goToRegionPhase() };
    div.appendChild(back);

    // Region header
    var header = document.createElement("div");
    header.style.cssText = "grid-column:1/-1;text-align:center;font-size:11px;color:"+(region?region.color:"#c9a04a")+";font-weight:600;padding:2px 0";
    header.textContent = "🌍 " + regionName;
    div.appendChild(header);

    cities.forEach(function(c){
      var btn = document.createElement("button");
      btn.className = "cc-city-btn";
      btn.setAttribute("data-cid", c.id);
      btn.style.cssText = "background:rgba(255,255,255,.04);border:1.5px solid "+c.color+"40;border-radius:10px;padding:12px 8px;cursor:pointer;text-align:center;transition:all .25s ease";
      btn.innerHTML = '<div style="font-size:18px;margin-bottom:4px">🏙️</div>'
        + '<div style="font-size:11px;font-weight:700;color:'+esc(c.color)+';font-family:var(--font-heading,Poppins,sans-serif)">'+esc(c.name)+'</div>'
        + '<div style="font-size:8.5px;color:rgba(255,255,255,.4);margin-top:3px;line-height:1.2;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">'+esc(c.desc)+'</div>';
      btn.onmouseenter = function(){ btn.style.borderColor = c.color; btn.style.background = c.color+"18" };
      btn.onmouseleave = function(){ if(ccSelectedCity !== c.id){ btn.style.borderColor = c.color+"40"; btn.style.background = "rgba(255,255,255,.04)" }};
      btn.onclick = function(e){
        e.stopPropagation();
        ccSelectedCity = c.id;
        // Highlight
        div.querySelectorAll(".cc-city-btn").forEach(function(b){
          b.style.borderColor = b.getAttribute("data-cid") === c.id ? c.color : "rgba(255,255,255,.08)";
          b.style.background = b.getAttribute("data-cid") === c.id ? c.color+"22" : "rgba(255,255,255,.02)";
          b.style.opacity = b.getAttribute("data-cid") === c.id ? "1" : "0.4";
        });
        setTimeout(function(){ completeCCOrigin() }, 400);
      };
      div.appendChild(btn);
    });
    zone.appendChild(div);
  }, 350);
}

function completeCCOrigin(){
  var zone = document.querySelector(".cc-dialog-zone");
  if(zone){
    var cz = zone.querySelector(".cc-city-zone");
    if(cz){ cz.style.animation = "ccFadeOut .3s ease both"; setTimeout(function(){ cz.remove() }, 300) }
  }

  // Save region + city temporarily (job comes next)
  var u = loadUser();
  u.region = ccSelectedRegion;
  u.startCity = ccSelectedCity;
  saveUser(u);

  // Go to job phase — now we know region + city for filtering
  setTimeout(function(){ goToJobPhase() }, 350);
}

function enterMainApp(){
  // Fade out guide music if playing
  var guideAudio = document.getElementById("guide-music");
  if(guideAudio && !guideAudio.paused){
    audioFade(guideAudio, 0, 1200, function(){ guideAudio.volume = 0.4; });
  }
  showAppBackgrounds();
  buildAccueil();
  buildUserPage();
  buildWorldmapPage();
  buildInventoryPage();
  showPage(acDB.get("ac_page") || "accueil");
  updateOrbLabels();
  // Préparer le contenu du tiroir header pour la page courante
  updateDrawerContent();

  // Reveal app content
  var contentArea = $(".content-area");
  var headerAsm = $("#header-assembly");
  var footer = $("#footer-assembly");
  if(contentArea) contentArea.style.visibility = "";
  if(headerAsm) headerAsm.style.visibility = "";
  if(footer) footer.style.visibility = "";
}

