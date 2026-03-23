"use strict";

/* ══════════ ACCUEIL ══════════ */
function buildAccueil(){
  var p = $("#page-accueil"); if(!p) return;
  var guide = getGuidePersona();

  var h = '<div class="welcome-hero">'
    + '<div class="logo-container"><img src="assets/ealogo.png" alt="HN"><div class="logo-ring"></div></div>'
    + '<h1 class="welcome-title">HOURGLASS <span class="accent">NEXUS</span></h1>'
    + '<p class="welcome-subtitle">Histoires \u00B7 Jeux \u00B7 \u00c9preuves</p></div>';

  h += '<div class="story-card">'
    + '<div class="story-card-title">\u2726 Bienvenue dans le Sanctuaire</div>'
    + '<p>Il existe un lieu entre les mondes, un carrefour o\u00f9 les <span class="sa">r\u00e9cits</span> prennent vie et o\u00f9 les <span class="sc">jeux</span> deviennent des \u00e9preuves l\u00e9gendaires.</p>'
    + '<p>Ce lieu, c\'est le <span class="sg">Nexus</span> \u2014 forg\u00e9 dans les profondeurs de Kael-Norath, gard\u00e9 par les \u00e2mes anciennes.</p></div>';

  if(guide){
    h += '<div class="accueil-guide"><div class="accueil-guide-header">'
      + '<img class="ag-avatar" src="'+esc(guide.avatar)+'">'
      + '<div class="ag-info"><div class="ag-name">'+esc(guide.name)+'</div>'
      + '<div class="ag-title">'+esc(guide.title)+'</div></div></div>'
      + '<div class="ag-bio">'+esc(guide.bio)+'</div></div>';
  }

  h += '<div id="accueil-team"></div>';
  p.innerHTML = h;
  renderAccueilTeam();
}

function renderAccueilTeam(){
  var area = $("#accueil-team"); if(!area) return;
  if(teamIds.length === 0){
    area.innerHTML = '<div class="accueil-team-hint">Composez votre \u00e9quipe dans l\'onglet Personas</div>';
    return;
  }
  var h = '<div class="accueil-team-bar"><span class="at-label">\u2694\ufe0f \u00c9quipe</span>';
  teamIds.forEach(function(id){
    var pe = getPersonaById(id); if(!pe) return;
    h += '<div class="at-member" style="border-color:'+esc(pe.color)+'">';
    if(pe.avatar) h += '<img src="'+esc(pe.avatar)+'">';
    else h += '<span style="color:'+esc(pe.color)+'">'+pe.name.substring(0,2).toUpperCase()+'</span>';
    h += '</div>';
  });
  h += '</div>'; area.innerHTML = h;
}

/* ══════════ USER PAGE ══════════ */
var allTcgCards = [];

/* Sync active state on banners + grid sections */
function syncUserPageActive(section){
  var pc = document.getElementById("profil-card");
  var ac = document.getElementById("atom-card");
  var jc = document.getElementById("job-card");
  var cc = document.getElementById("camp-card");
  if(pc) pc.classList.toggle("active-banner", section === "profil");
  if(ac) ac.classList.toggle("active-banner", section === "guide");
  if(jc) jc.classList.toggle("active-banner", section === "metier");
  if(cc) cc.classList.toggle("active-banner", section === "campement");
  var p = document.getElementById("page-user");
  if(p) p.querySelectorAll(".dr-user-section").forEach(function(x){
    x.classList.toggle("selected", x.getAttribute("data-modal") === section);
  });
}

function buildUserPage(){
  var p = $("#page-user"); if(!p) return;
  var u = loadUser(), col = u.cardColor || "#c9a04a", cur = getCurrency();
  var guide = getGuidePersona();

  var h = '';
  var userJob = getJobById(u.job);
  var jobLabel = userJob ? userJob.icon + ' ' + userJob.name : '';

  // ★ 1. A.T.O.M. — Bandelette en premier
  if(guide){
    h += '<div class="accueil-guide" style="margin:8px 12px 4px;cursor:pointer" id="atom-card">'
      + '<div class="accueil-guide-header">'
      + '<img class="ag-avatar" src="'+esc(guide.avatar)+'">'
      + '<div class="ag-info"><div class="ag-name">'+esc(guide.name)+'</div>'
      + '<div class="ag-title">'+esc(guide.title)+'</div></div>'
      + '<span style="font-size:16px;color:var(--gold-dark)">\u203a</span>'
      + '</div></div>';
  }

  // ★ 2. Profil — Bandelette utilisateur
  var profAvHtml = u.avatar
    ? '<img class="ag-avatar" src="'+esc(u.avatar)+'" style="border-color:'+esc(col)+'">'
    : '<div class="ag-avatar" style="display:flex;align-items:center;justify-content:center;font-size:22px;background:var(--stone);border-color:'+esc(col)+'">👤</div>';
  h += '<div class="accueil-guide" style="margin:4px 12px;cursor:pointer" id="profil-card" data-col="'+esc(col)+'">'
    + '<div class="accueil-guide-header">'
    + profAvHtml
    + '<div class="ag-info"><div class="ag-name" style="color:'+esc(col)+'">'+esc(u.name||"Voyageur")+'</div>'
    + '<div class="ag-title">Niv. '+u.level+' \u2022 '+esc(u.title||"Voyageur")+(jobLabel?' \u2022 '+jobLabel:'')+'</div></div>'
    + '<span style="font-size:16px;color:var(--gold-dark)">\u203a</span>'
    + '</div></div>';

  // ★ 2b. Campement — Bandelette campement
  h += '<div class="accueil-guide camp-banner" style="margin:4px 12px;cursor:pointer" id="camp-card">'
    + '<div class="accueil-guide-header">'
    + '<div class="ag-avatar" style="display:flex;align-items:center;justify-content:center;font-size:22px;background:rgba(201,160,74,.1);border-color:var(--gold-dark)">\u26fa</div>'
    + '<div class="ag-info"><div class="ag-name" style="color:var(--gold-light)">Campement</div>'
    + '<div class="ag-title">\u00c9quipe \u2022 Inventaire \u2022 Repos</div></div>'
    + '<span style="font-size:16px;color:var(--gold-dark)">\u203a</span>'
    + '</div></div>';

  // ★ 2c. Métier — Bandelette métier
  if(userJob){
    var jCol = userJob.color || "#c9a04a";
    var userRegion = getRegionById(u.region);
    var originLabel = userRegion ? userRegion.name : "";
    // Check if job is exclusive to user's origin
    var isExcl = userJob.availability !== "universal";
    h += '<div class="accueil-guide job-banner" style="margin:4px 12px;cursor:pointer" id="job-card">'
      + '<div class="accueil-guide-header">'
      + '<div class="ag-avatar" style="display:flex;align-items:center;justify-content:center;font-size:22px;background:'+esc(jCol)+'15;border-color:'+esc(jCol)+'">'
      + userJob.icon + '</div>'
      + '<div class="ag-info"><div class="ag-name" style="color:'+esc(jCol)+'">'+esc(userJob.name)+'</div>'
      + '<div class="ag-title">'+esc(userJob.category)+(isExcl ? ' \u2022 ⭐ Exclusif '+esc(originLabel) : '')+'</div></div>'
      + '<span style="font-size:16px;color:var(--gold-dark)">\u203a</span>'
      + '</div></div>';
  }

  // ★ 3. Stats bar juste sous les bandelettes
  h += '<div class="user-stats-bar" style="margin:4px 12px 10px">'
    + '<div class="us-stat"><div class="us-stat-val">'+Object.keys(u.visited).length+'</div><div class="us-stat-lbl">Salles</div></div>'
    + '<div class="us-stat"><div class="us-stat-val">'+cur.icon+' '+u.coins+'</div><div class="us-stat-lbl">'+esc(cur.name)+'</div></div>'
    + '<div class="us-stat"><div class="us-stat-val">\u25b2 '+u.floorsUp+'</div><div class="us-stat-lbl">Mont\u00e9s</div></div>'
    + '<div class="us-stat"><div class="us-stat-val">Niv. '+u.level+'</div><div class="us-stat-lbl">Niveau</div></div></div>';

  // Section grid — Accès rapide
  h += '<div class="section-title">Acc\u00e8s rapide</div>';
  h += '<div class="dr-user-sections" style="padding:0 12px">';
  h += '<div class="dr-user-section" data-modal="taverne"><div class="us-icon">\ud83c\udf7a</div><div class="us-name">Taverne</div></div>'
    + '<div class="dr-user-section" data-modal="guilde"><div class="us-icon">\u2694\ufe0f</div><div class="us-name">Guilde</div></div>'
    + '<div class="dr-user-section" data-modal="marche"><div class="us-icon">\ud83e\udea9</div><div class="us-name">March\u00e9</div></div>'
    + '<div class="dr-user-section" data-modal="camp-metier"><div class="us-icon">'+(userJob ? userJob.icon : '\ud83d\udee0\ufe0f')+'</div><div class="us-name">Camp '+(userJob ? esc(userJob.name) : 'M\u00e9tier')+'</div></div>'
    + '</div>';

  h += '<div class="section-title">D\u00e9couvertes</div>';
  h += '<div class="dr-user-sections" style="padding:0 12px">'
    + '<div class="dr-user-section" data-modal="elements"><div class="us-icon">\u2726</div><div class="us-name">\u00c9l\u00e9ments</div></div>'
    + '<div class="dr-user-section" data-modal="jeux"><div class="us-icon">\ud83c\udfae</div><div class="us-name">Jeux</div></div>'
    + '<div class="dr-user-section" data-modal="personas"><div class="us-icon"><img src="assets/anim.png" style="width:28px;height:28px;object-fit:contain"></div><div class="us-name">Personas</div></div>'
    + '<div class="dr-user-section" data-modal="cites"><div class="us-icon">\ud83c\udfd9\ufe0f</div><div class="us-name">Contr\u00e9es</div></div>'
    + '</div>';


  p.innerHTML = h;

  // Wire handlers with unified active state management
  function activateSection(section){
    userSection = section;
    selectedCard = null; selectedPersona = null; selectedGame = null; selectedElement = null;
    syncUserPageActive(section);
  }

  // Profil card click
  var profilCard = document.getElementById("profil-card");
  if(profilCard) profilCard.onclick = function(){
    activateSection("profil");
    var _u = loadUser();
    if(_u.avatar) setDiamondImage(_u.avatar, null);
    else setDiamondImage(null, "\ud83d\udc64");
    updateDrawerContent();
  };

  // A.T.O.M. card click
  var atomCard = document.getElementById("atom-card");
  if(atomCard) atomCard.onclick = function(){
    activateSection("guide");
    var g = getGuidePersona();
    if(g && g.avatar) setDiamondImage(g.avatar, null);
    updateDrawerContent();
  };

  // Job card click
  var jobCard = document.getElementById("job-card");
  if(jobCard) jobCard.onclick = function(){
    activateSection("metier");
    var _j = getJobById(loadUser().job);
    if(_j) setDiamondImage(null, _j.icon);
    updateDrawerContent();
  };

  // Campement card click
  var campCard = document.getElementById("camp-card");
  if(campCard) campCard.onclick = function(){
    activateSection("campement");
    setDiamondImage(null, "\u26fa");
    updateDrawerContent();
  };

  p.querySelectorAll(".dr-user-section").forEach(function(s){
    s.onclick = function(){
      var which = s.getAttribute("data-modal");
      activateSection(which);
      var iconEl = s.querySelector(".us-icon");
      var imgEl = iconEl ? iconEl.querySelector("img") : null;
      if(imgEl) setDiamondImage(imgEl.src, null);
      else if(iconEl) setDiamondImage(null, iconEl.textContent.trim());
      updateDrawerContent();
    };
  });

  // Appliquer l'état actif initial
  syncUserPageActive(userSection || "profil");

}

/* ══════════ PROFILE PAGE ══════════ */
function buildProfilePage(){
  var p = $("#page-profile"); if(!p) return;
  var u = loadUser(), col = u.cardColor || "#c9a04a", cur = getCurrency();

  var avHtml = u.avatar
    ? '<img src="'+esc(u.avatar)+'">'
    : '<div class="prof-avatar-empty">👤</div>';

  var h = '<div class="profile-page">';

  // Header card with avatar
  h += '<div class="prof-header">'
    + '<div class="prof-header-glow" style="background:linear-gradient(90deg,transparent,'+esc(col)+',transparent)"></div>'
    + '<div class="prof-avatar-wrap" id="prof-avatar-wrap">'
    + avHtml
    + '<div class="prof-avatar-overlay">Changer le portrait</div>'
    + '</div>'
    + '<span class="prof-rarity" style="background:'+esc(col)+'">'+esc(u.title||"Voyageur")+'</span>'
    + '<div class="prof-info-overlay">'
    + '<div class="prof-name" style="color:'+esc(col)+'">'+esc(u.name||"Voyageur")+'</div>'
    + '<div class="prof-subtitle">Niv. '+u.level+' \u2022 '+esc(u.title||"Voyageur")+'</div>'
    + '</div></div>';

  h += '<input type="file" accept="image/*" id="prof-file-input" style="position:absolute;width:0;height:0;opacity:0;pointer-events:none">';

  // Quote
  if(u.quote) h += '<div class="prof-quote-display">"'+esc(u.quote)+'"</div>';

  // Stats summary
  h += '<div class="prof-stats-grid">'
    + '<div class="prof-stat-cell"><div class="prof-stat-val">'+Object.keys(u.visited).length+'</div><div class="prof-stat-lbl">Salles</div></div>'
    + '<div class="prof-stat-cell"><div class="prof-stat-val">'+cur.icon+' '+u.coins+'</div><div class="prof-stat-lbl">'+esc(cur.name)+'</div></div>'
    + '<div class="prof-stat-cell"><div class="prof-stat-val">Niv. '+u.level+'</div><div class="prof-stat-lbl">Niveau</div></div>'
    + '<div class="prof-stat-cell"><div class="prof-stat-val">\u25b2 '+u.floorsUp+'</div><div class="prof-stat-lbl">Mont\u00e9s</div></div></div>';

  // Attributes
  h += '<div class="section-title">Attributs</div>';
  h += '<div class="prof-attrs">';
  var stats = [
    {key:"CRE", val:u.statCRE, color:"#9b59b6"},
    {key:"SAG", val:u.statSAG, color:"#5dade2"},
    {key:"CHA", val:u.statCHA, color:"#e8a838"},
    {key:"FOR", val:u.statFOR, color:"#e74c3c"},
    {key:"AGI", val:u.statAGI, color:"#27ae60"}
  ];
  stats.forEach(function(s){
    h += '<div class="dr-stat-bar">'
      + '<span class="dr-stat-label">'+s.key+'</span>'
      + '<div class="dr-stat-track"><div class="dr-stat-fill" style="width:'+s.val+'%;background:linear-gradient(90deg,'+s.color+','+s.color+'88)"></div></div>'
      + '<span class="dr-stat-val">'+s.val+'</span></div>';
  });
  h += '</div>';

  // Edit form
  h += '<div class="section-title">Modifier le profil</div>';
  h += '<div class="prof-form">';

  h += '<div><label class="prof-field-label">Nom</label>'
    + '<input type="text" class="prof-input" id="prof-edit-name" value="'+esc(u.name)+'"></div>';

  h += '<div><label class="prof-field-label">Titre</label>'
    + '<input type="text" class="prof-input" id="prof-edit-title" value="'+esc(u.title)+'"></div>';

  h += '<div><label class="prof-field-label">Citation / Slogan</label>'
    + '<input type="text" class="prof-input" id="prof-edit-quote" value="'+esc(u.quote)+'"></div>';

  h += '<div><label class="prof-field-label">Couleur de carte</label>'
    + '<div class="prof-colors">';
  CARD_COLORS.forEach(function(c){
    var sel = (c.id === col) ? " selected" : "";
    h += '<div class="prof-cc'+sel+'" data-cc="'+esc(c.id)+'" style="background:'+esc(c.id)+'" title="'+esc(c.name)+'"></div>';
  });
  h += '</div></div>';
  h += '</div>';

  h += '<button class="prof-save-btn" id="prof-save-btn">\u2714 Sauvegarder</button>';
  h += '<div class="prof-save-status" id="prof-save-status"></div>';

  // Quick links
  h += '<div class="section-title">Navigation</div>';
  h += '<div class="prof-section-card" id="prof-goto-inv">'
    + '<div class="prof-section-icon">\ud83d\udee1\ufe0f</div>'
    + '<div class="prof-section-info"><div class="prof-section-name">\u00c9quipement</div>'
    + '<div class="prof-section-desc">Armure, armes & attributs</div></div>'
    + '<span class="prof-section-arrow">\u203a</span></div>';

  h += '<div class="prof-section-card" id="prof-goto-ency">'
    + '<div class="prof-section-icon">\ud83d\udcd6</div>'
    + '<div class="prof-section-info"><div class="prof-section-name">Codex</div>'
    + '<div class="prof-section-desc">Dossiers & archives du Nexus</div></div>'
    + '<span class="prof-section-arrow">\u203a</span></div>';

  // Back button
  h += '<button class="prof-back-btn" id="prof-back-btn">\u2190 Retour</button>';

  // Reset button
  h += '<button class="prof-reset-btn" id="prof-reset-btn">\u26a0 R\u00e9initialiser le personnage</button>';

  h += '</div>';
  p.innerHTML = h;
  wireProfilePage();
}

function wireProfilePage(){
  // Avatar upload
  var wrap = document.getElementById("prof-avatar-wrap");
  var fileUp = document.getElementById("prof-file-input");
  if(wrap && fileUp){
    wrap.onclick = function(){ fileUp.click() };
    fileUp.onchange = function(){
      var file = fileUp.files[0]; if(!file) return;
      var status = document.getElementById("prof-save-status");
      if(status) status.innerHTML = '<span style="color:var(--frost)">Chargement…</span>';
      var reader = new FileReader();
      reader.onload = async function(e){
        var ok = await saveAvatar(e.target.result);
        if(status) status.innerHTML = ok
          ? '<span style="color:var(--poison)">\u2714 Portrait sauvegard\u00e9</span>'
          : '<span style="color:var(--blood-glow)">\u2718 Erreur</span>';
        var u2 = loadUser();
        if(u2.avatar) setDiamondImage(u2.avatar, null); else setDiamondImage(null,"\ud83d\udc64");
        updateWorldmapAvatar();
        updateOrbLabels(); buildUserPage(); buildInventoryPage(); buildProfilePage(); buildAccueil();
        updateDrawerContent();
      };
      reader.readAsDataURL(file);
    };
  }

  // Save button
  var saveBtn = document.getElementById("prof-save-btn");
  if(saveBtn) saveBtn.onclick = function(){
    var u = loadUser();
    var ni = document.getElementById("prof-edit-name");
    var ti = document.getElementById("prof-edit-title");
    var qi = document.getElementById("prof-edit-quote");
    if(ni) u.name = ni.value;
    if(ti) u.title = ti.value;
    if(qi) u.quote = qi.value;
    saveUser(u);
    var status = document.getElementById("prof-save-status");
    if(status) status.innerHTML = '<span style="color:var(--poison)">\u2714 Profil sauvegard\u00e9 !</span>';
    buildUserPage(); buildInventoryPage(); buildAccueil();
    updateDrawerContent();
    setTimeout(function(){ if(status) status.textContent = "" }, 2000);
    // Refresh the header area
    buildProfilePage();
  };

  // Card color picker
  var p = document.getElementById("page-profile");
  if(p) p.querySelectorAll(".prof-cc").forEach(function(el){
    el.onclick = function(){
      var u = loadUser();
      u.cardColor = el.getAttribute("data-cc");
      saveUser(u);
      if(p) p.querySelectorAll(".prof-cc").forEach(function(x){ x.classList.remove("selected") });
      el.classList.add("selected");
      buildUserPage(); buildAccueil();
      updateDrawerContent();
    };
  });

  // Navigation
  var backBtn = document.getElementById("prof-back-btn");
  if(backBtn) backBtn.onclick = function(){ showPage("user") };

  var invBtn = document.getElementById("prof-goto-inv");
  if(invBtn) invBtn.onclick = function(){ buildEquipmentPage(); showPage("inventory") };

  var encyBtn = document.getElementById("prof-goto-ency");
  if(encyBtn) encyBtn.onclick = function(){
    showPage("user");
    setTimeout(function(){
      userSection = "encyclopedie";
      selectedCard = null;
      updateDrawerContent();
      setDiamondImage(null, "🃏");
    }, 100);
  };

  // Reset
  var resetBtn = document.getElementById("prof-reset-btn");
  if(resetBtn) resetBtn.onclick = function(){
    showConfirm("Réinitialiser tout le personnage ? Cette action est irréversible.", function(){
      acDB.clear();
      location.reload();
    });
  };
}

/* ══════════ EQUIPMENT PAGE (6 slots Diablo-style) ══════════ */
var EQUIP_SLOTS = [
  {id:"univers", label:"Univers", icon:"\ud83c\udf0c", cls:"inv-slot-top-l", color:"#9b59b6"},
  {id:"epoque", label:"\u00c9poque", icon:"\u23f3", cls:"inv-slot-top-r", color:"#5dade2"},
  {id:"theme", label:"Th\u00e8me", icon:"\ud83c\udfa8", cls:"inv-slot-mid-l", color:"#e8a838"},
  {id:"capacite", label:"Capacit\u00e9", icon:"\u26a1", cls:"inv-slot-mid-r", color:"#e74c3c"},
  {id:"deroulement", label:"D\u00e9roulement", icon:"\ud83d\udcdc", cls:"inv-slot-bot-l", color:"#27ae60"},
  {id:"objectif", label:"Objectif", icon:"\ud83c\udfaf", cls:"inv-slot-bot-r", color:"#e67e22"}
];

/* ══════════ EQUIPMENT PAGE ══════════ */
function buildEquipmentPage(){
  var p = $("#page-inventory"); if(!p) return;
  var u = loadUser();
  var equipped = JSON.parse(acDB.get("ac_equipped") || "{}");

  var h = '<div class="inv-page">';
  h += '<div class="inv-paperdoll inv-paperdoll-6">';

  // Full portrait background
  h += '<div class="inv-portrait-full">';
  if(u.avatar) h += '<img src="'+esc(u.avatar)+'">';
  else h += '<div class="inv-character-empty">\ud83d\udc64</div>';
  h += '</div>';

  // Vignette overlay
  h += '<div class="inv-portrait-vignette"></div>';

  // 6 slots positioned around portrait
  EQUIP_SLOTS.forEach(function(slot){
    var item = equipped[slot.id];
    var filled = item ? " filled" : "";
    h += '<div class="inv-slot inv-slot-6 '+slot.cls+filled+'" data-slot="'+slot.id+'" style="--slot-color:'+slot.color+'">'
      + '<span class="inv-slot-icon">'+(item ? esc(item.icon) : slot.icon)+'</span>'
      + '<span class="inv-slot-label">'+esc(slot.label)+'</span></div>';
  });

  // Player name overlay
  h += '<div class="inv-portrait-name">'+esc(u.name||"Voyageur")+'</div>';
  h += '</div></div>';

  p.innerHTML = h;
}

/* ══════════ INVENTAIRE PAGE (Item collection) ══════════ */
function buildInventoryPage(){
  var p = $("#page-inventory"); if(!p) return;
  var u = loadUser(), cur = getCurrency();

  var h = '<div class="loot-page">';

  // Header
  h += '<div class="loot-header">'
    + '<div class="loot-header-icon">\ud83c\udf92</div>'
    + '<div class="loot-header-info">'
    + '<div class="loot-header-title">Inventaire</div>'
    + '<div class="loot-header-sub">'+elementsData.length+' objet'+(elementsData.length>1?'s':'')+' \u2022 '+cur.icon+' '+u.coins+' '+esc(cur.name)+'</div>'
    + '</div></div>';

  // Rarity filter
  var rarities = ["Tout"];
  var seenR = {};
  elementsData.forEach(function(e){ if(!seenR[e.rarity]){ seenR[e.rarity]=1; rarities.push(e.rarity) } });
  h += '<div class="loot-filters">';
  rarities.forEach(function(r, i){
    h += '<button class="loot-filter'+(i===0?' active':'')+'" data-lf="'+esc(r)+'">'+esc(r)+'</button>';
  });
  h += '</div>';

  // Item cards
  if(elementsData.length === 0){
    h += '<div style="text-align:center;color:var(--bone-dim);padding:40px 0;font-style:italic;font-size:12px">Aucun objet dans l\'inventaire</div>';
  } else {
    h += '<div class="loot-list">';
    elementsData.forEach(function(el, i){
      var rarCol = el.color || "#c9a04a";
      h += '<div class="loot-card" data-lidx="'+i+'" data-lrar="'+esc(el.rarity)+'">'
        + '<div class="loot-card-accent" style="background:'+esc(rarCol)+'"></div>'
        + '<div class="loot-card-icon" style="background:'+esc(rarCol)+'12;border-color:'+esc(rarCol)+'30">'+el.icon+'</div>'
        + '<div class="loot-card-body">'
        + '<div class="loot-card-name" style="color:'+esc(rarCol)+'">'+esc(el.name)+'</div>'
        + '<div class="loot-card-meta">'+esc(el.type)+' \u2022 '+esc(el.rarity)+'</div>'
        + '<div class="loot-card-desc">'+esc(el.desc)+'</div>'
        + '</div>'
        + '<div class="loot-card-qty">x1</div>'
        + '</div>';
    });
    h += '</div>';
  }

  h += '</div>';
  p.innerHTML = h;

  // Wire filters
  p.querySelectorAll(".loot-filter").forEach(function(btn){
    btn.onclick = function(){
      p.querySelectorAll(".loot-filter").forEach(function(x){ x.classList.remove("active") });
      btn.classList.add("active");
      var f = btn.getAttribute("data-lf");
      p.querySelectorAll(".loot-card").forEach(function(c){
        c.style.display = (f==="Tout" || c.getAttribute("data-lrar")===f) ? "" : "none";
      });
    };
  });

  // Wire card clicks
  p.querySelectorAll(".loot-card").forEach(function(c){
    c.onclick = function(){
      var idx = parseInt(c.getAttribute("data-lidx"));
      if(isNaN(idx) || !elementsData[idx]) return;
      var el = elementsData[idx];
      showModal(el.icon + " " + el.name,
        '<div style="text-align:center;margin-bottom:8px"><span style="font-size:42px">'+el.icon+'</span></div>'
        + '<p style="font-family:var(--font-ui);font-size:10px;color:var(--bone-dim);text-align:center">'+esc(el.type)+' \u2022 '+esc(el.rarity)+'</p>'
        + '<p style="font-size:12px;color:var(--bone-dim);line-height:1.5;margin-top:10px">'+esc(el.desc)+'</p>'
      );
    };
  });
}

/* ══════════ GUILD PAGE ══════════ */
function buildGuildPage(){
  var p = $("#page-guild"); if(!p) return;
  var personas = getPersonas ? getPersonas() : [];
  var u = loadUser();

  var h = '<div class="guild-page-wrap">';

  /* — En-tête guilde — */
  h += '<div class="story-card" style="text-align:center">'
    + '<div style="font-size:36px;margin-bottom:6px">\ud83c\udff0</div>'
    + '<div class="story-card-title">La Guilde</div>'
    + '<p>Le refuge des \u00e2mes errantes, l\'\u00e9picentre des alliances et des intrigues.</p></div>';

  /* — Personas — */
  h += '<div class="guild-section"><div class="guild-section-title">\u2694\ufe0f Personas</div>';
  if(personas.length > 0){
    h += '<div class="guild-persona-grid">';
    personas.forEach(function(pe){
      var inTeam = teamIds.indexOf(pe.id) !== -1;
      h += '<div class="guild-persona-card'+(inTeam?' in-team':'')+'" data-pid="'+esc(pe.id)+'">'
        + '<div class="gpc-avatar" style="border-color:'+esc(pe.color)+'">';
      if(pe.avatar) h += '<img src="'+esc(pe.avatar)+'">';
      else h += '<span style="color:'+esc(pe.color)+'">'+pe.name.substring(0,2).toUpperCase()+'</span>';
      h += '</div><div class="gpc-name">'+esc(pe.name)+'</div>'
        + '<div class="gpc-title">'+esc(pe.title||"")+'</div></div>';
    });
    h += '</div>';
  } else {
    h += '<p style="color:var(--bone-dim);font-size:11px;text-align:center">Aucun persona d\u00e9couvert.</p>';
  }
  h += '</div>';

  /* — Camp — */
  h += '<div class="guild-section"><div class="guild-section-title">\u26fa Camp</div>'
    + '<div class="guild-card"><p>Le camp de votre guilde est votre base d\'op\u00e9rations. '
    + 'Consolidez vos ressources et pr\u00e9parez vos exp\u00e9ditions.</p></div></div>';

  /* — Guilde générale — */
  h += '<div class="guild-section"><div class="guild-section-title">\ud83d\udcdc Guilde G\u00e9n\u00e9rale</div>'
    + '<div class="guild-card"><p>Le tableau des qu\u00eates et des contrats. '
    + 'Acceptez des missions pour gagner en r\u00e9putation.</p></div></div>';

  /* — Marché — */
  h += '<div class="guild-section"><div class="guild-section-title">\ud83d\udcb0 March\u00e9</div>'
    + '<div class="guild-card"><p>\u00c9changez, achetez et vendez des objets rares avec les marchands ambulants.</p></div></div>';

  /* — Taverne — */
  h += '<div class="guild-section"><div class="guild-section-title">\ud83c\udf7a Taverne</div>'
    + '<div class="guild-card"><p>L\'\u00e2tre cr\u00e9pite, la bi\u00e8re coule. '
    + '\u00c9coutez les rumeurs et recrutez des compagnons.</p></div></div>';

  h += '</div>';
  p.innerHTML = h;
}

