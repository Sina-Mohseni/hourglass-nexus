"use strict";

/* ══════════ USER SECTION DRAWER BUILDERS ══════════ */
var userSectionCfg = {
  guide:{emoji:"",icon:"assets/settings.png",label:"Guide"},
  profil:{emoji:"\ud83d\udc64",label:"Profil"},
  equipement:{emoji:"\ud83d\udee1\ufe0f",label:"\u00c9quipement"},
  inventaire:{emoji:"\ud83c\udf92",label:"Inventaire"},
  equipe:{emoji:"\u2694\ufe0f",label:"\u00c9quipe"},
  encyclopedie:{emoji:"\ud83c\udccf",label:"Codex"},
  fusion:{emoji:"\u2697\ufe0f",label:"Fusion"},
  campement:{emoji:"\u26fa",label:"Campement"},
  taverne:{emoji:"\ud83c\udf7a",label:"Taverne"},
  guilde:{emoji:"\u2694\ufe0f",label:"Guilde"},
  musiques:{emoji:"\ud83c\udfb5",label:"Musiques"},
  marche:{emoji:"\ud83e\udea9",label:"March\u00e9"},
  elements:{emoji:"\u2726",label:"\u00c9l\u00e9ments"},
  jeux:{emoji:"\ud83c\udfae",label:"Jeux"},
  personas:{emoji:"\ud83d\udc64",label:"Personas"},
  cites:{emoji:"\ud83c\udfd9\ufe0f",label:"Contr\u00e9es & Cit\u00e9s"},
  rebelles:{emoji:"\u2694\ufe0f",label:"Rebelles"},
  metier:{emoji:"\ud83d\udee0\ufe0f",label:"M\u00e9tier"},
  "camp-metier":{emoji:"\ud83c\udfed",label:"Camp du M\u00e9tier"}
};

function buildDrawerUserSection(){
  if(!userSection) return buildDrawerUserFiche();
  if(userSection === "guide") return buildDrawerGuide();
  if(userSection === "profil") return buildDrawerProfile();
  if(userSection === "metier") return buildDrawerJob();
  if(userSection === "camp-metier") return buildDrawerCampMetier();
  if(userSection === "equipement") return buildDrawerEquipment();
  if(userSection === "inventaire") return buildDrawerInventory();
  if(userSection === "equipe") return buildDrawerEquipe();
  if(userSection === "campement") return buildDrawerCampement();
  if(userSection === "taverne") return buildDrawerTaverne();
  if(userSection === "encyclopedie") return buildDrawerEncyclopedie();
  if(userSection === "elements") return buildDrawerDiscElements();
  if(userSection === "jeux") return buildDrawerDiscJeux();
  if(userSection === "personas") return buildDrawerDiscPersonas();
  if(userSection === "cites") return buildDrawerDiscCites();
  if(userSection === "rebelles") return buildDrawerDiscRebelles();
  if(userSection === "musiques") return buildDrawerMusiques();
  var cfg = userSectionCfg[userSection] || {emoji:"?", label:userSection};
  return '<div class="dr-concept"><h3>'+cfg.emoji+' '+esc(cfg.label)+'</h3>'
    + '<p style="text-align:center;color:var(--bone-dim);padding:30px 0;font-style:italic">Bient\u00f4t disponible</p>'
    + '<button class="prof-back-btn" id="generic-back-btn">\u2190 Retour</button></div>';
}

/* ══════════ PROFIL (dans le tiroir) ══════════ */
function buildDrawerProfile(){
  var u = loadUser(), col = u.cardColor || "#c9a04a", cur = getCurrency();
  var avHtml = u.avatar ? '<img src="'+esc(u.avatar)+'">' : '<div class="uph-empty">\ud83d\udc64</div>';

  var h = '<div class="dr-fiche">';
  // ★ Grand portrait (déplacé depuis la page utilisateur)
  h += '<div class="user-profile-header" style="margin:0 0 12px">'
    + '<div class="uph-glow" style="background:linear-gradient(90deg,transparent,'+esc(col)+',transparent)"></div>'
    + '<div class="uph-portrait" id="prof-avatar-wrap">' + avHtml
    + '<div class="prof-avatar-overlay">Changer le portrait</div></div>'
    + '<span class="uph-rarity" style="background:'+esc(col)+'">'+esc(u.title||"Voyageur")+'</span>'
    + '<div class="uph-overlay"><div class="uph-name" style="color:'+esc(col)+'">'+esc(u.name||"Voyageur")+'</div>'
    + '<div class="uph-title">Niv. '+u.level+' \u2022 '+esc(u.title||"Voyageur")+'</div></div></div>';
  h += '<input type="file" accept="image/*" id="prof-file-input" style="position:absolute;width:0;height:0;opacity:0;pointer-events:none">';

  if(u.quote) h += '<div class="prof-quote-display">\u201c'+esc(u.quote)+'\u201d</div>';

  // Stats
  h += '<div class="prof-stats-grid">'
    + '<div class="prof-stat-cell"><div class="prof-stat-val">'+Object.keys(u.visited).length+'</div><div class="prof-stat-lbl">Salles</div></div>'
    + '<div class="prof-stat-cell"><div class="prof-stat-val">'+cur.icon+' '+u.coins+'</div><div class="prof-stat-lbl">'+esc(cur.name)+'</div></div>'
    + '<div class="prof-stat-cell"><div class="prof-stat-val">Niv. '+u.level+'</div><div class="prof-stat-lbl">Niveau</div></div></div>';

  // Attributes
  h += '<div class="section-title" style="padding:8px 0 4px">Attributs</div>';
  var stats = [
    {key:"CRE", val:u.statCRE, color:"#9b59b6"},{key:"SAG", val:u.statSAG, color:"#5dade2"},
    {key:"CHA", val:u.statCHA, color:"#e8a838"},{key:"FOR", val:u.statFOR, color:"#e74c3c"},
    {key:"AGI", val:u.statAGI, color:"#27ae60"}
  ];
  stats.forEach(function(s){
    h += '<div class="dr-stat-bar"><span class="dr-stat-label">'+s.key+'</span>'
      + '<div class="dr-stat-track"><div class="dr-stat-fill" style="width:'+s.val+'%;background:linear-gradient(90deg,'+s.color+','+s.color+'88)"></div></div>'
      + '<span class="dr-stat-val">'+s.val+'</span></div>';
  });

  // Edit form
  h += '<div class="section-title" style="padding:10px 0 4px">Modifier</div>';
  h += '<div class="prof-form">';
  h += '<div><label class="prof-field-label">Nom</label><input type="text" class="prof-input" id="prof-edit-name" value="'+esc(u.name)+'"></div>';
  h += '<div><label class="prof-field-label">Titre</label><input type="text" class="prof-input" id="prof-edit-title" value="'+esc(u.title)+'"></div>';
  h += '<div><label class="prof-field-label">Citation</label><input type="text" class="prof-input" id="prof-edit-quote" value="'+esc(u.quote)+'"></div>';
  h += '<div><label class="prof-field-label">Couleur de carte</label><div class="prof-colors">';
  CARD_COLORS.forEach(function(c){
    h += '<div class="prof-cc'+(c.id===col?" selected":"")+'" data-cc="'+esc(c.id)+'" style="background:'+esc(c.id)+'"></div>';
  });
  h += '</div></div></div>';
  h += '<button class="prof-save-btn" id="prof-save-btn">\u2714 Sauvegarder</button>';
  h += '<div class="prof-save-status" id="prof-save-status"></div>';

  // Navigation interne
  h += '<div style="display:grid;gap:6px;margin-top:10px">'
    + '<div class="prof-section-card" id="prof-goto-inv"><div class="prof-section-icon">\ud83d\udee1\ufe0f</div>'
    + '<div class="prof-section-info"><div class="prof-section-name">\u00c9quipement</div><div class="prof-section-desc">Armure, armes & attributs</div></div>'
    + '<span class="prof-section-arrow">\u203a</span></div>'
    + '<div class="prof-section-card" id="prof-goto-ency"><div class="prof-section-icon">\ud83c\udccf</div>'
    + '<div class="prof-section-info"><div class="prof-section-name">Encyclop\u00e9die</div><div class="prof-section-desc">Cartes du Nexus</div></div>'
    + '<span class="prof-section-arrow">\u203a</span></div></div>';

  h += '<button class="prof-reset-btn" id="prof-reset-btn">\u26a0 R\u00e9initialiser le personnage</button>';
  h += '<button class="prof-back-btn" id="fp-close-panel">\u2190 Fermer</button>';
  h += '</div>';
  return h;
}

/* ══════════ MÉTIER (dans le tiroir) ══════════ */
function buildDrawerJob(){
  var u = loadUser();
  var job = getJobById(u.job);
  if(!job) return '<div class="dr-concept"><h3>🛠️ Métier</h3><p style="text-align:center;color:var(--bone-dim);padding:30px 0;font-style:italic">Aucun métier sélectionné</p></div>';
  var col = job.color || "#c9a04a";
  var isExcl = job.availability !== "universal";
  var region = getRegionById(u.region);

  var h = '<div class="dr-fiche">';

  // Header
  h += '<div class="user-profile-header" style="margin:0 0 12px">'
    + '<div class="uph-glow" style="background:linear-gradient(90deg,transparent,'+col+',transparent)"></div>'
    + '<div class="uph-portrait"><div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:42px;background:'+col+'15">'+job.icon+'</div></div>'
    + '<span class="uph-rarity" style="background:'+col+'">'+esc(job.category)+'</span>'
    + '<div class="uph-overlay"><div class="uph-name" style="color:'+col+'">'+esc(job.name)+'</div>'
    + '<div class="uph-title">'+esc(job.category)+(isExcl && region ? ' \u2022 \u2b50 Exclusif '+esc(region.name) : '')+'</div></div></div>';

  // Description
  h += '<p class="dr-bio">'+esc(job.desc)+'</p>';

  // Advantages
  if(job.advantages && job.advantages.length){
    h += '<div style="margin-top:10px"><div style="font-size:10px;font-weight:600;color:#22c55e;margin-bottom:4px">✅ Avantages</div>';
    job.advantages.forEach(function(a){
      h += '<div style="font-size:10px;color:var(--bone-dim);padding:3px 0 3px 12px;border-left:2px solid #22c55e30">'+esc(a)+'</div>';
    });
    h += '</div>';
  }

  // Disadvantages
  if(job.disadvantages && job.disadvantages.length){
    h += '<div style="margin-top:8px"><div style="font-size:10px;font-weight:600;color:#ef4444;margin-bottom:4px">⛔ Inconvénients</div>';
    job.disadvantages.forEach(function(d){
      h += '<div style="font-size:10px;color:var(--bone-dim);padding:3px 0 3px 12px;border-left:2px solid #ef444430">'+esc(d)+'</div>';
    });
    h += '</div>';
  }

  // Stat modifiers
  var statLabels = {"CRE":"Créativité","SAG":"Sagesse","CHA":"Charisme","FOR":"Force","AGI":"Agilité"};
  var hasMods = (job.statBonus && Object.keys(job.statBonus).length) || (job.statMalus && Object.keys(job.statMalus).length);
  if(hasMods){
    h += '<div style="margin-top:10px"><div style="font-size:10px;font-weight:600;color:var(--gold-light);margin-bottom:6px">📊 Modificateurs de stats</div>'
      + '<div style="display:flex;flex-wrap:wrap;gap:6px">';
    if(job.statBonus) Object.keys(job.statBonus).forEach(function(k){
      var v = job.statBonus[k];
      h += '<div style="padding:4px 8px;border-radius:6px;background:#22c55e10;border:1px solid #22c55e25;font-size:10px">'
        + '<span style="color:#22c55e;font-weight:700">+'+v+'</span> <span style="color:var(--bone-dim)">'+esc(statLabels[k]||k)+'</span></div>';
    });
    if(job.statMalus) Object.keys(job.statMalus).forEach(function(k){
      var v = job.statMalus[k];
      h += '<div style="padding:4px 8px;border-radius:6px;background:#ef444410;border:1px solid #ef444425;font-size:10px">'
        + '<span style="color:#ef4444;font-weight:700">'+v+'</span> <span style="color:var(--bone-dim)">'+esc(statLabels[k]||k)+'</span></div>';
    });
    h += '</div></div>';
  }

  // Perks
  if(job.perks){
    var perkLabels = {
      borderDiscount:{name:"Frontières",icon:"🚧",unit:"%"},
      shopDiscount:{name:"Commerce",icon:"🪙",unit:"%"},
      arenaBonus:{name:"Arène",icon:"🏟️",unit:"%"},
      craftBonus:{name:"Artisanat",icon:"🔧",unit:"%"},
      socialBonus:{name:"Social",icon:"💬",unit:"%"}
    };
    h += '<div style="margin-top:10px"><div style="font-size:10px;font-weight:600;color:var(--gold-light);margin-bottom:6px">⚡ Bonus de métier</div>'
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">';
    Object.keys(perkLabels).forEach(function(pk){
      var val = job.perks[pk] || 0;
      if(val === 0) return;
      var pl = perkLabels[pk];
      var isPos = val > 0;
      h += '<div style="padding:5px 8px;border-radius:6px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);display:flex;align-items:center;gap:5px">'
        + '<span style="font-size:12px">'+pl.icon+'</span>'
        + '<div><div style="font-size:9px;color:var(--bone-dim)">'+esc(pl.name)+'</div>'
        + '<div style="font-size:11px;font-weight:700;color:'+(isPos?'#22c55e':'#ef4444')+'">'+(isPos?'+':'')+val+pl.unit+'</div></div></div>';
    });
    h += '</div></div>';
  }

  h += '<button class="prof-back-btn" id="job-back-btn">\u2190 Retour au profil</button>';
  h += '</div>';
  return h;
}

/* ══════════ CAMP DU MÉTIER (dans le tiroir) ══════════ */
function buildDrawerCampMetier(){
  var u = loadUser();
  var job = getJobById(u.job);
  if(!job) return '<div class="dr-concept"><h3>🏭 Camp du Métier</h3><p style="text-align:center;color:var(--bone-dim);padding:30px 0;font-style:italic">Aucun métier sélectionné</p></div>';
  var col = job.color || "#c9a04a";

  // Camp name and activities vary by category
  var campNames = {
    "Combat":"Terrain d'Entraînement","Magie":"Cercle d'Études","Artisanat":"Atelier",
    "Social":"Salon de Rencontres","Exploration":"Poste Avancé"
  };
  var campIcons = {
    "Combat":"⚔️","Magie":"🔮","Artisanat":"🔨","Social":"🤝","Exploration":"🧭"
  };
  var campActivities = {
    "Combat":[
      {icon:"🎯",name:"Entraînement",desc:"Améliorez vos stats de combat en vous exerçant."},
      {icon:"🏟️",name:"Défi d'arène",desc:"Affrontez un adversaire en duel pour gagner de l'XP."},
      {icon:"🛡️",name:"Réparer l'équipement",desc:"Entretenez vos armes et armures."}
    ],
    "Magie":[
      {icon:"📖",name:"Étudier un sort",desc:"Apprenez ou améliorez un sort existant."},
      {icon:"⚗️",name:"Expérimenter",desc:"Tentez une combinaison magique expérimentale."},
      {icon:"🧘",name:"Méditation",desc:"Restaurez votre mana et gagnez en sagesse."}
    ],
    "Artisanat":[
      {icon:"🔧",name:"Fabriquer",desc:"Créez un objet à partir de vos matériaux."},
      {icon:"🔨",name:"Améliorer",desc:"Améliorez un objet existant de votre inventaire."},
      {icon:"📐",name:"Plan de fabrication",desc:"Dessinez un nouveau plan pour débloquer une recette."}
    ],
    "Social":[
      {icon:"🗣️",name:"Négocier",desc:"Entraînez votre charisme et vos talents de persuasion."},
      {icon:"📜",name:"Rédiger un contrat",desc:"Créez un pacte commercial ou diplomatique."},
      {icon:"🎭",name:"Se déguiser",desc:"Préparez une identité alternative."}
    ],
    "Exploration":[
      {icon:"🗺️",name:"Cartographier",desc:"Marquez les zones explorées sur votre carte."},
      {icon:"🎒",name:"Préparer l'expédition",desc:"Organisez vos provisions pour le prochain voyage."},
      {icon:"🔭",name:"Reconnaître le terrain",desc:"Obtenez des infos sur les zones adjacentes."}
    ]
  };

  var campName = campNames[job.category] || "Camp du Métier";
  var campIcon = campIcons[job.category] || "🏭";
  var activities = campActivities[job.category] || [];

  var h = '<div class="dr-fiche">';

  // Header
  h += '<div style="text-align:center;margin-bottom:12px">'
    + '<div style="font-size:36px;margin-bottom:4px">'+campIcon+'</div>'
    + '<div class="dr-name" style="text-align:center;color:'+col+'">'+esc(campName)+'</div>'
    + '<div class="dr-sub" style="text-align:center">'+job.icon+' '+esc(job.name)+'</div></div>';

  // Job perks summary bar
  h += '<div style="display:flex;gap:6px;justify-content:center;margin-bottom:12px;flex-wrap:wrap">';
  var perkIcons = {craftBonus:"🔧",arenaBonus:"🏟️",socialBonus:"💬",shopDiscount:"🪙",borderDiscount:"🚧"};
  if(job.perks) Object.keys(perkIcons).forEach(function(pk){
    var val = job.perks[pk] || 0;
    if(val === 0) return;
    var isPos = val > 0;
    h += '<span style="font-size:9px;padding:3px 7px;border-radius:10px;background:'+(isPos?'#22c55e':'#ef4444')+'12;color:'+(isPos?'#22c55e':'#ef4444')+'">'+perkIcons[pk]+' '+(isPos?'+':'')+val+'%</span>';
  });
  h += '</div>';

  // Activities
  h += '<div class="section-title" style="padding:0 0 6px">Activités</div>';
  h += '<div style="display:grid;gap:6px">';
  activities.forEach(function(a){
    h += '<div class="game-card" style="cursor:pointer">'
      + '<div class="game-icon" style="background:'+col+'20;font-size:18px">'+a.icon+'</div>'
      + '<div class="game-info"><div class="game-name" style="color:'+col+'">'+esc(a.name)+'</div>'
      + '<div class="game-desc">'+esc(a.desc)+'</div></div>'
      + '<span class="game-status" style="color:var(--gold-dark)">\u203a</span></div>';
  });
  h += '</div>';

  // Back button
  h += '<button class="prof-back-btn" id="camp-metier-back">\u2190 Retour</button>';
  h += '</div>';
  return h;
}

/* ══════════ ÉQUIPEMENT (dans le tiroir) ══════════ */
function buildDrawerEquipment(){
  var u = loadUser();
  var equipped = JSON.parse(acDB.get("ac_equipped") || "{}");
  var slots = [
    {id:"univers", icon:"\ud83c\udf0c", name:"Univers", cls:"inv-slot-top-l", color:"#9b59b6"},
    {id:"epoque", icon:"\u23f3", name:"\u00c9poque", cls:"inv-slot-top-r", color:"#5dade2"},
    {id:"theme", icon:"\ud83c\udfa8", name:"Th\u00e8me", cls:"inv-slot-mid-l", color:"#e8a838"},
    {id:"capacite", icon:"\u26a1", name:"Capacit\u00e9", cls:"inv-slot-mid-r", color:"#e74c3c"},
    {id:"deroulement", icon:"\ud83d\udcdc", name:"D\u00e9roulement", cls:"inv-slot-bot-l", color:"#27ae60"},
    {id:"objectif", icon:"\ud83c\udfaf", name:"Objectif", cls:"inv-slot-bot-r", color:"#e67e22"}
  ];

  var h = '<div class="dr-fiche" style="padding:0">';
  h += '<div class="inv-paperdoll-6">';

  // Portrait background
  h += '<div class="inv-portrait-full">';
  if(u.avatar) h += '<img src="'+esc(u.avatar)+'">';
  else h += '<div class="inv-character-empty">\ud83d\udc64</div>';
  h += '</div>';
  h += '<div class="inv-portrait-vignette"></div>';

  // 6 slots
  slots.forEach(function(slot){
    var item = equipped[slot.id];
    var filled = item ? " filled" : "";
    h += '<div class="inv-slot inv-slot-6 '+slot.cls+filled+'" data-slot="'+slot.id+'" style="--slot-color:'+slot.color+'">'
      + '<span class="inv-slot-icon">'+(item ? esc(item.icon) : slot.icon)+'</span>'
      + '<span class="inv-slot-label">'+esc(slot.name)+'</span></div>';
  });

  // Player name
  h += '<div class="inv-portrait-name">'+esc(u.name||"Voyageur")+'</div>';
  h += '</div>';

  h += '<button class="prof-back-btn" id="equip-back-btn" style="margin-top:10px">\u2190 Retour au campement</button>';
  h += '</div>';
  return h;
}

/* ══════════ INVENTAIRE (dans le tiroir) ══════════ */
function buildDrawerInventory(){
  var u = loadUser(), cur = getCurrency();
  var inv = JSON.parse(acDB.get("ac_inventory") || "{}");
  var categories = [
    {id:"univers", icon:"\ud83c\udf0c", name:"Univers", color:"#9b59b6"},
    {id:"epoque", icon:"\u23f3", name:"\u00c9poque", color:"#5dade2"},
    {id:"theme", icon:"\ud83c\udfa8", name:"Th\u00e8me", color:"#e8a838"},
    {id:"capacite", icon:"\u26a1", name:"Capacit\u00e9", color:"#e74c3c"},
    {id:"deroulement", icon:"\ud83d\udcdc", name:"D\u00e9roulement", color:"#27ae60"},
    {id:"objectif", icon:"\ud83c\udfaf", name:"Objectif", color:"#e67e22"}
  ];
  var totalItems = 0;
  categories.forEach(function(c){ var items = inv[c.id]; if(items) totalItems += items.length; });

  var h = '<div class="dr-fiche">';
  h += '<div class="loot-header" style="margin-bottom:8px">'
    + '<div class="loot-header-icon">\ud83c\udf92</div>'
    + '<div class="loot-header-info"><div class="loot-header-title">Inventaire</div>'
    + '<div class="loot-header-sub">'+totalItems+' objet'+(totalItems>1?'s':'')+' \u2022 '+cur.icon+' '+u.coins+' '+esc(cur.name)+'</div></div></div>';

  h += '<div style="display:grid;gap:8px">';
  categories.forEach(function(cat){
    var items = inv[cat.id] || [];
    var count = items.length;
    h += '<div class="camp-item" style="border-left:3px solid '+cat.color+'" data-inv-cat="'+cat.id+'">'
      + '<div class="camp-item-icon" style="color:'+cat.color+'">'+cat.icon+'</div>'
      + '<div class="camp-item-info"><div class="camp-item-name">'+esc(cat.name)+'</div>'
      + '<div class="camp-item-desc">'+count+' objet'+(count>1?'s':'')+'</div></div>'
      + '<span class="camp-item-arrow">\u203a</span></div>';
  });
  h += '</div>';
  h += '<button class="prof-back-btn" id="inv-back-btn">\u2190 Retour au campement</button>';
  h += '</div>';
  return h;
}

/* ══════════ ÉQUIPE (dans le tiroir) ══════════ */
function buildDrawerEquipe(){
  var allP = getNonGuidePersonas();
  var h = '<div class="dr-fiche">';
  h += '<div style="text-align:center;margin-bottom:12px">'
    + '<div style="font-size:28px;margin-bottom:4px">\u2694\ufe0f</div>'
    + '<div class="dr-name" style="text-align:center">\u00c9quipe</div>'
    + '<div class="dr-sub" style="text-align:center">Composez votre \u00e9quipe de 3 personas</div></div>';

  // Team strip
  h += '<div class="team-strip" style="margin:0 0 12px"><span class="ts-label">\u00c9quipe ('+teamIds.length+'/3)</span><div class="ts-slots">';
  for(var s=0;s<3;s++){
    if(s < teamIds.length){
      var tm = getPersonaById(teamIds[s]);
      if(tm){
        h += '<div class="ts-slot filled" style="border-color:'+esc(tm.color)+'" data-rm="'+s+'">'
          + (tm.avatar ? '<img src="'+esc(tm.avatar)+'">' : '<span style="color:'+esc(tm.color)+'">'+tm.name.substring(0,2).toUpperCase()+'</span>')
          + '</div>';
      } else h += '<div class="ts-slot">?</div>';
    } else h += '<div class="ts-slot">+</div>';
  }
  h += '</div><button class="ts-auto" id="ts-auto">\u26a1</button></div>';

  // Persona grid
  h += '<div class="personas-grid">';
  allP.forEach(function(pe){ h += makePersonaCard(pe, false) });
  h += '</div>';

  h += '<button class="prof-back-btn" id="equipe-back-btn">\u2190 Retour au campement</button>';
  h += '</div>';
  return h;
}

/* ══════════ CAMPEMENT — Sub-options hub ══════════ */
function buildDrawerCampement(){
  var h = '<div class="dr-fiche">';
  h += '<div style="text-align:center;margin-bottom:12px">'
    + '<div style="font-size:28px;margin-bottom:4px">\u26fa</div>'
    + '<div class="dr-name" style="color:var(--gold-light);text-align:center">Campement</div>'
    + '<div class="dr-sub" style="text-align:center">Votre refuge entre les \u00e9preuves</div></div>';

  var items = [
    {id:"equipement", icon:"\ud83d\udee1\ufe0f", name:"\u00c9quipement", desc:"\u00c9quipez vos 6 cat\u00e9gories d'objets", color:"var(--blood-glow)"},
    {id:"inventaire", icon:"\ud83c\udf92", name:"Inventaire", desc:"Univers, \u00e9poque, th\u00e8me & plus", color:"var(--ember)"},
    {id:"equipe", icon:"\u2694\ufe0f", name:"\u00c9quipe", desc:"G\u00e9rer votre \u00e9quipe de personas", color:"var(--gold)"},
    {id:"encyclopedie", icon:"\ud83d\udcd6", name:"Codex", desc:"Dossiers & archives du Nexus", color:"var(--frost)"},
    {id:"fusion", icon:"\u2697\ufe0f", name:"Fusion", desc:"Combiner des \u00e9l\u00e9ments", color:"var(--arcane)"},
    {id:"musiques", icon:"\ud83c\udfb5", name:"Musiques", desc:"Ambiances sonores", color:"var(--poison)"}
  ];

  h += '<div style="display:grid;gap:8px">';
  items.forEach(function(it){
    h += '<div class="camp-item" data-camp="'+it.id+'">'
      + '<div class="camp-item-icon" style="color:'+it.color+'">'+it.icon+'</div>'
      + '<div class="camp-item-info"><div class="camp-item-name">'+esc(it.name)+'</div>'
      + '<div class="camp-item-desc">'+esc(it.desc)+'</div></div>'
      + '<span class="camp-item-arrow">\u203a</span></div>';
  });
  h += '</div>';
  h += '<button class="prof-back-btn" id="fp-close-panel">\u2190 Fermer</button>';
  h += '</div>';
  return h;
}

/* ══════════ TAVERNE ══════════ */
function buildDrawerTaverne(){
  var personas = getNonGuidePersonas();
  var guide = getGuidePersona();
  var h = '<div class="dr-fiche">';
  h += '<div style="text-align:center;margin-bottom:12px">'
    + '<div style="font-size:28px;margin-bottom:4px">\ud83c\udf7a</div>'
    + '<div class="dr-name" style="color:#f59e0b;text-align:center">Taverne</div>'
    + '<div class="dr-sub" style="text-align:center">Le c\u0153ur social du Nexus</div></div>';
  h += '<p style="font-size:11px;color:var(--bone-dim);line-height:1.6;margin-bottom:12px">'
    + 'Bienvenue \u00e0 la Taverne ! Ici, les personas se retrouvent pour \u00e9changer des rumeurs, partager des histoires et proposer des qu\u00eates.</p>';
  // Present personas in tavern
  h += '<div class="section-title" style="padding:6px 0">Qui est l\u00e0 ce soir ?</div>';
  h += '<div style="display:grid;gap:8px">';
  var present = personas.slice(0, 5);
  present.forEach(function(pe){
    h += '<div class="dr-loc-banner" style="cursor:pointer" data-tavpid="'+esc(pe.id)+'">'
      + '<div class="dr-loc-banner-icon" style="background:'+esc(pe.color)+'">'
      + (pe.avatar ? '<img src="'+esc(pe.avatar)+'" style="width:100%;height:100%;border-radius:50%;object-fit:cover">' : pe.name.charAt(0))
      + '</div>'
      + '<div class="dr-loc-banner-info"><div class="dr-loc-banner-name">'+esc(pe.name)+'</div>'
      + '<div class="dr-loc-banner-desc">'+esc(pe.title)+'</div></div>'
      + '<span class="dr-loc-banner-arrow">\u203a</span></div>';
  });
  h += '</div>';
  h += '<div style="margin-top:12px;padding:10px;background:var(--dark-stone);border:var(--border-stone);border-radius:var(--radius)">'
    + '<div style="font-family:var(--font-heading);font-size:11px;color:var(--gold);margin-bottom:4px">\ud83d\udcac Rumeur du jour</div>'
    + '<div style="font-size:11px;color:var(--bone-dim);font-style:italic;line-height:1.5">'
    + '"On raconte que les portes de Shar-Va\u00eblis s\'ouvriront bient\u00f4t aux voyageurs audacieux\u2026"</div></div>';
  h += '<button class="prof-back-btn" id="taverne-back-btn">\u2190 Retour au campement</button>';
  h += '</div>';
  return h;
}

function buildDrawerUserFiche(){
  var u = loadUser(), col = u.cardColor || "#c9a04a";
  var h = '<div class="dr-fiche">';
  h += '<div style="text-align:center;margin-bottom:12px"><div class="dr-name" style="color:'+esc(col)+'">'+esc(u.name||"Voyageur")+'</div>';
  h += '<div class="dr-sub">Niv. '+u.level+' \u2022 '+esc(u.title)+'</div></div>';
  if(u.quote) h += '<div class="tcg-quote" style="text-align:center">"'+esc(u.quote)+'"</div>';
  h += '<p style="text-align:center;margin-top:12px;font-size:11px;color:var(--bone-dim)">Ouvrez <strong style="color:var(--gold)">Profil</strong> pour personnaliser votre fiche.</p>';
  h += '</div>';
  return h;
}

function buildDrawerGuide(){
  var guide = getGuidePersona(); if(!guide) return '';
  return buildDrawerPersonaFiche(guide);
}

function buildDrawerEncyclopedie(){
  var h = '<div class="dr-fiche">';
  h += '<div style="text-align:center;margin-bottom:12px">'
    + '<div style="font-size:28px;margin-bottom:4px">\ud83d\udcd6</div>'
    + '<div class="dr-name" style="color:var(--gold-light);text-align:center">Codex</div>'
    + '<div class="dr-sub" style="text-align:center">Archives & dossiers du Nexus</div></div>';

  var dossiers = [
    {id:"elements", icon:"\ud83c\udf0d", name:"Dossier Extelua", desc:"Le monde, ses r\u00e9gions & ses secrets", color:"var(--gold)"},
    {id:"personas", icon:"\ud83d\udc64", name:"Dossier Personas", desc:"Personnages rencontr\u00e9s dans le Nexus", color:"var(--arcane)"},
    {id:"cites", icon:"\ud83c\udfd9\ufe0f", name:"Dossier Morkar", desc:"Contr\u00e9es, cit\u00e9s & lieux myst\u00e9rieux", color:"var(--ember)"},
    {id:"rebelles", icon:"\u2694\ufe0f", name:"Dossier des Rebelles", desc:"Factions, r\u00e9sistants & all\u00e9geances", color:"var(--blood-glow)"},
    {id:"jeux", icon:"\ud83c\udfae", name:"Dossier Jeux", desc:"Mini-jeux & \u00e9preuves du Nexus", color:"var(--frost)"}
  ];

  h += '<div style="display:grid;gap:8px">';
  dossiers.forEach(function(d){
    h += '<div class="camp-item" data-camp="'+d.id+'">'
      + '<div class="camp-item-icon" style="color:'+d.color+'">'+d.icon+'</div>'
      + '<div class="camp-item-info"><div class="camp-item-name">'+esc(d.name)+'</div>'
      + '<div class="camp-item-desc">'+esc(d.desc)+'</div></div>'
      + '<span class="camp-item-arrow">\u203a</span></div>';
  });
  h += '</div>';
  h += '<button class="prof-back-btn" id="codex-back-btn">\u2190 Retour au campement</button>';
  h += '</div>';
  return h;
}

function buildDrawerTCGCard(card){
  var col = card.rarityColor || "#c9a04a";
  var h = '<div class="dr-fiche">';
  if(card.image){
    h += '<div class="user-profile-header" style="margin:0 0 12px">'
      + '<div class="uph-glow" style="background:linear-gradient(90deg,transparent,'+col+',transparent)"></div>'
      + '<div class="uph-portrait"><img src="'+esc(card.image)+'"></div>'
      + '<span class="uph-rarity" style="background:'+col+'">'+esc(card.rarity)+'</span>'
      + '<div class="uph-overlay"><div class="uph-name" style="color:'+col+'">'+esc(card.name)+'</div>'
      + '<div class="uph-title">'+esc(card.type)+'</div></div></div>';
  }
  h += '<p class="dr-bio">'+esc(card.description||"")+'</p>';
  if(card.stats){
    h += '<div style="margin-top:10px">';
    Object.keys(card.stats).forEach(function(k){
      var v = card.stats[k];
      h += '<div class="dr-stat-bar"><span class="dr-stat-label">'+k+'</span>'
        + '<div class="dr-stat-track"><div class="dr-stat-fill" style="width:'+v+'%;background:linear-gradient(90deg,'+col+','+col+'88)"></div></div>'
        + '<span class="dr-stat-val">'+v+'</span></div>';
    });
    h += '</div>';
  }
  if(card.quote) h += '<div class="tcg-quote" style="margin-top:10px">"'+esc(card.quote)+'"</div>';
  h += '</div>';
  return h;
}

function buildDrawerDiscElements(){
  if(selectedElement) return buildDrawerElement(selectedElement)
    + '<button class="dr-team-btn" id="disc-back">\u2190 Retour</button>';

  var types = [], seen = {};
  elementsData.forEach(function(e){ if(!seen[e.type]){ seen[e.type]=1; types.push(e.type) } });

  var h = '<div class="dr-fiche">';
  h += '<div class="ency-filters"><button class="ency-filter active" data-etype="all">Tout</button>';
  types.forEach(function(t){ h += '<button class="ency-filter" data-etype="'+esc(t)+'">'+esc(t)+'</button>' });
  h += '</div><div style="display:grid;gap:6px">';
  elementsData.forEach(function(e, i){
    h += '<div class="element-card" data-eidx="'+i+'">'
      + '<div style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;background:'+esc(e.color)+'15;border:1px solid '+esc(e.color)+'30;flex-shrink:0">'+e.icon+'</div>'
      + '<div style="flex:1;min-width:0"><div style="font-family:var(--font-heading);font-size:11px;font-weight:600;color:'+esc(e.color)+'">'+esc(e.name)+'</div>'
      + '<div style="font-family:var(--font-ui);font-size:9px;color:var(--bone-dim)">'+esc(e.type)+' \u2022 '+esc(e.rarity)+'</div></div></div>';
  });
  h += '</div>';
  h += '<button class="prof-back-btn" id="disc-back">\u2190 Retour au Codex</button>';
  h += '</div>';
  return h;
}

function buildDrawerElement(el){
  var col = el.color || "#c9a04a";
  return '<div class="dr-fiche" style="text-align:center">'
    + '<div style="width:72px;height:72px;border-radius:50%;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:36px;background:'+esc(col)+'15;border:2px solid '+esc(col)+'40;box-shadow:0 0 20px '+esc(col)+'20">'+el.icon+'</div>'
    + '<div class="dr-name" style="color:'+esc(col)+';text-align:center">'+esc(el.name)+'</div>'
    + '<div class="dr-sub" style="text-align:center;margin-bottom:12px">'+esc(el.type)+' \u2022 '+esc(el.rarity)+'</div>'
    + '<p class="dr-bio" style="text-align:left">'+esc(el.desc)+'</p></div>';
}

function buildDrawerDiscJeux(){
  if(selectedGame) return buildDrawerGameDetail(selectedGame)
    + '<button class="dr-team-btn" id="disc-back">\u2190 Retour</button>';
  var games = getGames();
  var h = '<div class="dr-fiche"><div style="display:grid;gap:8px">';
  games.forEach(function(g){
    var cls = "game-card" + (g.status === "locked" ? " locked" : "");
    h += '<div class="'+cls+'" data-gid="'+esc(g.id)+'">'
      + '<div class="game-icon"><img src="'+esc(g.icon)+'"></div>'
      + '<div class="game-info"><div class="game-name">'+esc(g.name)+'</div>'
      + '<div class="game-desc">'+esc(g.desc)+'</div></div>'
      + '<span class="game-status">'+(g.status==="locked"?"🔒":"⚔️")+'</span></div>';
  });
  h += '</div>';
  h += '<button class="prof-back-btn" id="disc-back">\u2190 Retour au Codex</button>';
  h += '</div>';
  return h;
}

function buildDrawerGameDetail(g){
  return '<div class="dr-game"><div class="dr-game-icon"><img src="'+esc(g.icon)+'"></div>'
    + '<div class="dr-game-name">'+esc(g.name)+'</div>'
    + '<div class="dr-game-type">'+esc(g.type)+'</div>'
    + '<p class="dr-game-desc">'+esc(g.desc)+'</p>'
    + '<button class="dr-game-play" id="dr-game-play"'+(g.status==="locked"?' disabled':'')+'>'+
    (g.status==="locked"?'🔒 Bient\u00f4t':'▶ Jouer')+'</button></div>';
}

function buildDrawerDiscPersonas(){
  if(selectedPersona) return buildDrawerPersonaFiche(selectedPersona)
    + (selectedPersona.id !== getGuideId() ?
      '<button class="dr-team-btn" id="dr-team-btn">'+(teamIds.indexOf(selectedPersona.id)>=0?'Retirer de l\'\u00e9quipe':'Ajouter \u00e0 l\'\u00e9quipe')+'</button>' : '')
    + '<button class="dr-team-btn" id="disc-back" style="background:var(--dark-stone);color:var(--bone-dim)">\u2190 Retour</button>';

  var allP = getNonGuidePersonas();
  var h = '<div class="dr-fiche">';
  h += '<div class="team-strip" style="margin:0 0 8px"><span class="ts-label">\u00c9quipe ('+teamIds.length+'/3)</span><div class="ts-slots">';
  for(var s=0;s<3;s++){
    if(s < teamIds.length){
      var tm = getPersonaById(teamIds[s]);
      if(tm){
        h += '<div class="ts-slot filled" style="border-color:'+esc(tm.color)+'" data-rm="'+s+'">'
          + (tm.avatar ? '<img src="'+esc(tm.avatar)+'">' : '<span style="color:'+esc(tm.color)+'">'+tm.name.substring(0,2).toUpperCase()+'</span>')
          + '</div>';
      } else h += '<div class="ts-slot">?</div>';
    } else h += '<div class="ts-slot">+</div>';
  }
  h += '</div><button class="ts-auto" id="ts-auto">\u26a1</button></div>';
  h += '<div class="personas-grid">';
  allP.forEach(function(pe){ h += makePersonaCard(pe, false) });
  h += '</div>';
  h += '<button class="prof-back-btn" id="disc-back">\u2190 Retour au Codex</button>';
  h += '</div>';
  return h;
}

function buildDrawerDiscCites(){
  var regions = getRegions();
  var cities = getCities();
  var u = loadUser();
  var h = '<div class="dr-fiche"><div class="section-title" style="padding:0 0 6px">Contrées & Cités</div>';

  if(!regions.length){
    // Fallback: flat city list
    if(!cities.length) h += '<p style="font-size:11px;color:var(--bone-dim);text-align:center;padding:20px">Aucune cité</p>';
    else {
      h += '<div style="display:grid;gap:8px">';
      cities.forEach(function(c){
        var isCur = (currentCityId === c.id);
        h += '<div class="game-card'+(isCur?' selected':'')+'" style="cursor:default">'
          + '<div class="game-icon" style="background:'+esc(c.color)+'">🏙️</div>'
          + '<div class="game-info"><div class="game-name">'+esc(c.name)+'</div>'
          + '<div class="game-desc">'+esc(c.desc)+'</div></div>'
          + (isCur?'<span class="game-status">📍</span>':'')+'</div>';
      });
      h += '</div>';
    }
  } else {
    // User origin badge
    if(u.region){
      var uReg = getRegionById(u.region);
      var uCity = cities.find(function(c){ return c.id === u.startCity });
      if(uReg){
        h += '<div style="background:'+esc(uReg.color)+'12;border:1px solid '+esc(uReg.color)+'30;border-radius:10px;padding:8px 12px;margin-bottom:10px;display:flex;align-items:center;gap:8px">'
          + '<div style="font-size:22px">🏠</div>'
          + '<div><div style="font-size:11px;font-weight:700;color:'+esc(uReg.color)+'">Origine : '+esc(uReg.name)+'</div>'
          + '<div style="font-size:10px;color:var(--bone-dim)">'+(uCity ? esc(uCity.name) : 'Cité inconnue')+'</div></div></div>';
      }
    }

    // Region list
    regions.forEach(function(r){
      var rCities = cities.filter(function(c){ return c.region === r.id });
      var isUserRegion = (u.region === r.id);
      var hasPas = hasRegionPass(r.id);
      var passLabel = isUserRegion ? ' 🏠' : (hasPas ? ' ✅' : ' 🔒');
      h += '<div class="dr-region-block" style="margin-bottom:12px">'
        + '<div class="dr-region-header" data-rid="'+esc(r.id)+'" style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:10px;cursor:pointer;background:'+esc(r.color)+'0a;border:1px solid '+esc(r.color)+'20;transition:all .2s ease">'
        + '<div style="width:32px;height:32px;border-radius:50%;background:'+esc(r.color)+'20;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">🌍</div>'
        + '<div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:700;color:'+esc(r.color)+';font-family:var(--font-heading,Poppins,sans-serif)">'+esc(r.name)+passLabel+'</div>'
        + '<div style="font-size:9.5px;color:var(--bone-dim)">'+esc(r.desc)+' · '+rCities.length+' cités</div></div>'
        + '<span class="dr-region-arrow" style="color:'+esc(r.color)+';font-size:14px;transition:transform .2s">›</span></div>';

      // Collapsible content (hidden by default)
      h += '<div class="dr-region-content" data-rid="'+esc(r.id)+'" style="display:none;padding:6px 0 0">';

      // Pass status banner
      if(!isUserRegion){
        if(hasPas){
          h += '<div style="display:flex;align-items:center;gap:6px;padding:6px 10px;margin:0 4px 8px;border-radius:8px;background:#22c55e10;border:1px solid #22c55e25">'
            + '<span style="font-size:16px">'+esc(r.passIcon)+'</span>'
            + '<div><div style="font-size:10px;font-weight:600;color:#22c55e">'+esc(r.passName)+' — Acquis</div>'
            + '<div style="font-size:9px;color:var(--bone-dim)">Accès autorisé</div></div></div>';
        } else {
          h += '<div style="display:flex;align-items:center;gap:6px;padding:6px 10px;margin:0 4px 8px;border-radius:8px;background:#f59e0b08;border:1px solid #f59e0b25">'
            + '<span style="font-size:16px">'+esc(r.passIcon)+'</span>'
            + '<div style="flex:1"><div style="font-size:10px;font-weight:600;color:#f59e0b">'+esc(r.passName)+' — Requis</div>'
            + '<div style="font-size:9px;color:var(--bone-dim)">'+getCurrency().icon+' '+r.passCost+' Sablons</div></div>'
            + '<button class="dr-buy-pass" data-buy-region="'+esc(r.id)+'" style="padding:4px 10px;border:none;border-radius:6px;background:linear-gradient(145deg,#f59e0b,#d97706);color:#fff;font-size:10px;font-weight:700;cursor:pointer;white-space:nowrap">Acquérir</button></div>';
        }
      }

      // History
      if(r.history){
        h += '<div style="padding:6px 12px 10px;font-size:10px;color:var(--bone-dim);line-height:1.5;font-style:italic;border-left:2px solid '+esc(r.color)+'30;margin:0 8px 8px">'+esc(r.history)+'</div>';
      }

      // Cities grid
      h += '<div style="display:grid;gap:6px;padding:0 4px">';
      rCities.forEach(function(c){
        var isCur = (currentCityId === c.id);
        var isStart = (u.startCity === c.id);
        h += '<div class="game-card'+(isCur?' selected':'')+'" style="cursor:default">'
          + '<div class="game-icon" style="background:'+esc(c.color)+'">🏙️</div>'
          + '<div class="game-info"><div class="game-name">'+esc(c.name)+(isStart?' <span style="font-size:9px;opacity:.6">🏠</span>':'')+'</div>'
          + '<div class="game-desc">'+esc(c.desc)+'</div></div>'
          + (isCur?'<span class="game-status">📍</span>':'')+'</div>';
      });
      h += '</div></div></div>';
    });
  }

  h += '<button class="prof-back-btn" id="disc-back">\u2190 Retour au Codex</button>';
  h += '</div>';
  return h;
}

function buildDrawerDiscRebelles(){
  var h = '<div class="dr-fiche">';
  h += '<div style="text-align:center;margin-bottom:12px">'
    + '<div style="font-size:28px;margin-bottom:4px">\u2694\ufe0f</div>'
    + '<div class="dr-name" style="color:var(--blood-glow);text-align:center">Dossier des Rebelles</div>'
    + '<div class="dr-sub" style="text-align:center">Factions, r\u00e9sistants & all\u00e9geances</div></div>';
  h += '<p style="text-align:center;color:var(--bone-dim);padding:30px 0;font-style:italic;font-size:11px">Ce dossier est encore class\u00e9 secret\u2026 Bient\u00f4t disponible.</p>';
  h += '<button class="prof-back-btn" id="disc-back">\u2190 Retour au Codex</button>';
  h += '</div>';
  return h;
}

/* ══════════ MUSIQUES (player Diablo-style) ══════════ */
var MUSIC_TRACKS = [
  {id:"main-menu", title:"Tournoi d'Extelua", artist:"Menu Principal", src:"assets/music/extelua-tournament-main-menu.mp3", icon:"\ud83c\udfc6", color:"#c9a04a", duration:""},
  {id:"intro", title:"L'Appel du Nexus", artist:"Intro Narrative", src:"assets/music/extelua-intro.mp3", icon:"\ud83c\udf0c", color:"#9b59b6", duration:""},
  {id:"extelua", title:"Extelua", artist:"Ambiance du Monde", src:"assets/music/extelua.mp3", icon:"\ud83c\udf0d", color:"#5dade2", duration:""}
];

var _mpCurrentTrack = null;
var _mpAudio = null;
var _mpPlaying = false;
var _mpRepeatOne = false;  // repeat single track
var _mpShuffle = false;    // random order

function _getMpAudio(){
  if(!_mpAudio){
    _mpAudio = document.createElement("audio");
    _mpAudio.id = "mp-audio";
    _mpAudio.preload = "auto";
    document.body.appendChild(_mpAudio);
  }
  return _mpAudio;
}

function buildDrawerMusiques(){
  var h = '<div class="dr-fiche" style="padding:0">';

  // Header with currently playing
  h += '<div class="mp-header">';
  h += '<div class="mp-now-art" id="mp-now-art">'
    + (_mpCurrentTrack ? _mpCurrentTrack.icon : '\ud83c\udfb5')
    + '</div>';
  h += '<div class="mp-now-info">';
  h += '<div class="mp-now-title" id="mp-now-title">'
    + esc(_mpCurrentTrack ? _mpCurrentTrack.title : 'Aucune piste')
    + '</div>';
  h += '<div class="mp-now-artist" id="mp-now-artist">'
    + esc(_mpCurrentTrack ? _mpCurrentTrack.artist : 'S\u00e9lectionnez une musique')
    + '</div>';
  h += '</div></div>';

  // Progress bar
  h += '<div class="mp-progress-wrap" id="mp-progress-wrap">'
    + '<div class="mp-progress-bar" id="mp-progress-bar"></div></div>';

  // Controls
  h += '<div class="mp-controls">';
  h += '<button class="mp-ctrl-btn mp-ctrl-mode'
    + (_mpShuffle ? ' mp-mode-active' : '') + '" id="mp-shuffle" title="Al\u00e9atoire">'
    + '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'
    + '<path d="M16 3h5v5"/><path d="M4 20L21 3"/>'
    + '<path d="M21 16v5h-5"/><path d="M15 15l6 6"/>'
    + '<path d="M4 4l5 5"/></svg></button>';
  h += '<button class="mp-ctrl-btn mp-ctrl-sm" id="mp-prev">\u23ee</button>';
  h += '<button class="mp-ctrl-btn mp-ctrl-play" id="mp-play">'
    + (_mpPlaying ? '\u275a\u275a' : '\u25b6') + '</button>';
  h += '<button class="mp-ctrl-btn mp-ctrl-sm" id="mp-next">\u23ed</button>';
  h += '<button class="mp-ctrl-btn mp-ctrl-mode'
    + (_mpRepeatOne ? ' mp-mode-active' : '') + '" id="mp-repeat" title="R\u00e9p\u00e9ter le morceau">'
    + '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'
    + '<path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>'
    + '<path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>'
    + '<text x="12" y="15.5" text-anchor="middle" fill="currentColor" stroke="none" font-size="7" font-weight="bold">1</text>'
    + '</svg></button>';
  h += '</div>';

  // Track list
  h += '<div class="mp-tracklist">';
  MUSIC_TRACKS.forEach(function(t, i){
    var isActive = _mpCurrentTrack && _mpCurrentTrack.id === t.id;
    h += '<div class="mp-track'+(isActive ? ' mp-track-active' : '')+'" data-midx="'+i+'">'
      + '<div class="mp-track-icon" style="color:'+t.color+';border-color:'+t.color+'40;background:'+t.color+'10">'
      + (isActive && _mpPlaying ? '<span class="mp-eq">\u266a</span>' : t.icon)
      + '</div>'
      + '<div class="mp-track-info">'
      + '<div class="mp-track-title"'+(isActive ? ' style="color:'+t.color+'"' : '')+'>'+esc(t.title)+'</div>'
      + '<div class="mp-track-artist">'+esc(t.artist)+'</div>'
      + '</div>'
      + (isActive && _mpPlaying ? '<div class="mp-track-playing" style="color:'+t.color+'">\u266b</div>' : '')
      + '</div>';
  });
  h += '</div>';

  h += '<button class="prof-back-btn" id="musiques-back-btn">\u2190 Retour au campement</button>';
  h += '</div>';
  return h;
}

function buildDrawerPersonaFiche(pe){
  var col = pe.color || "#c9a04a", av = pe.avatar || "";
  var avHtml = av ? '<img src="'+esc(av)+'">' : '<div class="uph-empty" style="color:'+col+'">'+esc(pe.name.charAt(0))+'</div>';
  var peJob = pe.job ? getJobById(pe.job) : null;
  var h = '<div class="dr-fiche">'
    + '<div class="user-profile-header" style="margin:0 0 12px">'
    + '<div class="uph-glow" style="background:linear-gradient(90deg,transparent,'+col+',transparent)"></div>'
    + '<div class="uph-portrait">'+avHtml+'</div>'
    + '<span class="uph-rarity" style="background:'+col+'">'+esc(pe.difficulty)+'</span>'
    + '<div class="uph-overlay"><div class="uph-name" style="color:'+col+'">'+esc(pe.name)+'</div>'
    + '<div class="uph-title">'+esc(pe.element||"")+' \u2022 '+esc(pe.title)+'</div></div></div>';

  // Job badge
  if(peJob){
    h += '<div style="display:flex;align-items:center;gap:6px;padding:6px 10px;margin-bottom:8px;border-radius:8px;background:'+esc(peJob.color)+'10;border:1px solid '+esc(peJob.color)+'25">'
      + '<span style="font-size:16px">'+peJob.icon+'</span>'
      + '<div><div style="font-size:10px;font-weight:600;color:'+esc(peJob.color)+'">'+esc(peJob.name)+'</div>'
      + '<div style="font-size:9px;color:var(--bone-dim)">'+esc(peJob.category)+'</div></div></div>';
  }

  h += '<p class="dr-bio">'+esc(pe.bio)+'</p>';

  // Affinity with player
  var u = loadUser();
  var affVal = (u.personaAffinities && u.personaAffinities[pe.id]) || 0;
  if(pe.role !== "Guide"){
    h += '<div style="display:flex;align-items:center;gap:8px;margin-top:8px;padding:6px 8px;border-radius:6px;background:rgba(255,255,255,.03)">'
      + '<span style="font-size:12px">💛</span>'
      + '<div style="flex:1"><div style="font-size:9px;color:var(--bone-dim);margin-bottom:2px">Affinité</div>'
      + '<div class="dr-stat-track" style="height:4px"><div class="dr-stat-fill" style="width:'+Math.min(100,affVal)+'%;background:linear-gradient(90deg,'+col+','+col+'88)"></div></div></div>'
      + '<span style="font-size:10px;color:'+col+'">'+affVal+'</span></div>';
  }

  if(pe.stats){
    h += '<div style="margin-top:10px">';
    Object.keys(pe.stats).forEach(function(k){
      var v = pe.stats[k];
      h += '<div class="dr-stat-bar"><span class="dr-stat-label">'+k+'</span>'
        + '<div class="dr-stat-track"><div class="dr-stat-fill" style="width:'+v+'%;background:linear-gradient(90deg,'+col+','+col+'88)"></div></div>'
        + '<span class="dr-stat-val">'+v+'</span></div>';
    });
    h += '</div>';
  }
  if(pe.traits && pe.traits.length){
    h += '<div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:10px">';
    pe.traits.forEach(function(t){ h += '<span class="dr-trait" style="border-color:'+col+'40;color:'+col+'">'+esc(t)+'</span>' });
    h += '</div>';
  }
  if(pe.quote) h += '<div class="tcg-quote" style="margin-top:10px">"'+esc(pe.quote)+'"</div>';
  h += '</div>';
  return h;
}

function makePersonaCard(pe){
  var inTeam = teamIds.indexOf(pe.id) >= 0;
  var cls = "persona-card";
  if(inTeam) cls += " in-team";
  if(selectedPersona && selectedPersona.id === pe.id) cls += " selected";
  return '<div class="'+cls+'" data-pid="'+esc(pe.id)+'">'
    + '<div style="position:absolute;top:0;left:0;right:0;height:2px;background:'+esc(pe.color)+'"></div>'
    + '<div class="pc-avatar" style="background:'+esc(pe.color)+'20;color:'+esc(pe.color)+'">'
    + (pe.avatar ? '<img src="'+esc(pe.avatar)+'">' : esc(pe.name.charAt(0)))
    + '</div><div class="pc-name">'+esc(pe.name)+'</div>'
    + '<div class="pc-diff">'+esc(pe.difficulty)+'</div>'
    + (inTeam ? '<div class="pc-team-badge" style="position:absolute;top:4px;right:4px;font-size:10px">⚔️</div>' : '')
    + '</div>';
}

function toggleTeam(id){
  if(id === getGuideId()) return;
  var idx = teamIds.indexOf(id);
  if(idx >= 0) teamIds.splice(idx, 1);
  else { if(teamIds.length >= 3) return; teamIds.push(id) }
  acDB.set("ac_team", JSON.stringify(teamIds));
  renderAccueilTeam();
  updateDrawerContent();
}

