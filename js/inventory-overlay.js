"use strict";

/* ══════════ PRE-INVENTORY PAGE — Diablo 4 style ══════════
   Shown after guide placement on lock screen (new voyage).
   Displays player portrait, stats, and scenario-based inventory.
   Now rendered as a standard page (same structure as profile/equipment).
   ═══════════════════════════════════════════════════════════ */

var SCENARIO_LABELS = {
  "champion":"Champion", "lambda":"Isolé", "rebelle":"Dissident",
  "apprenti-morkar":"Recrue Morkar", "veteran-morkar":"Vétéran Morkar"
};

/* ── Equipment items per scenario (6 slots) ── */
var SCENARIO_EQUIPMENT = {
  "champion": {
    decors:   {name:"Arène Impériale",  desc:"Décors officiels du tournoi, tribunes monumentales et drapeaux planétaires."},
    epoque:   {name:"Ère Connectée",    desc:"Époque de prospérité technologique et d'échanges inter-mondes."},
    theme:    {name:"Gloire & Honneur",  desc:"Le champion porte les espoirs de son peuple sous les projecteurs."},
    capacite: {name:"Charisme Médiatique",desc:"Capacité à galvaniser les foules et attirer les sponsors."},
    scenario: {name:"Épreuve Officielle", desc:"Scénario sanctionné par le groupe Morkar, retransmis en direct."},
    objectif: {name:"Victoire Totale",   desc:"Remporter le tournoi et obtenir l'intégration au Réseau Universel."}
  },
  "lambda": {
    decors:   {name:"Terres Inconnues",  desc:"Paysages étranges et technologies jamais vues par ton peuple."},
    epoque:   {name:"Ère Primitive",     desc:"Ton monde vit en autarcie, sans contact avec le Réseau."},
    theme:    {name:"Découverte & Survie",desc:"Tout est nouveau, tout est dangereux, tout est fascinant."},
    capacite: {name:"Instinct Brut",     desc:"Capacité d'adaptation forgée par une vie sans technologie."},
    scenario: {name:"Candidat Isolé",    desc:"Sélectionné par les éclaireurs de Morkar sur une planète coupée."},
    objectif: {name:"Transformation",    desc:"Gagner pour offrir l'accès au Réseau à ton monde entier."}
  },
  "rebelle": {
    decors:   {name:"Coulisses du Tournoi",desc:"Les zones d'ombre que les caméras ne montrent jamais."},
    epoque:   {name:"Ère du Soupçon",   desc:"Les dissidents s'organisent dans l'ombre depuis des décennies."},
    theme:    {name:"Infiltration",      desc:"Chaque geste est calculé, chaque sourire est un masque."},
    capacite: {name:"Double Jeu",        desc:"Capacité à maintenir une couverture parfaite sous pression."},
    scenario: {name:"Mission Secrète",   desc:"Rassembler des preuves de la corruption du groupe Morkar."},
    objectif: {name:"Révélation",        desc:"Faire éclater la vérité sur les mensonges de Morkar."}
  },
  "apprenti-morkar": {
    decors:   {name:"Quartier Général",  desc:"Les installations secrètes du groupe Morkar, sous le tournoi."},
    epoque:   {name:"Ère de Contrôle",   desc:"Morkar étend son influence sur chaque monde connecté."},
    theme:    {name:"Loyauté & Ambition", desc:"Servir Morkar est un honneur — et une voie vers le pouvoir."},
    capacite: {name:"Observation Tactique",desc:"Capacité à détecter les comportements suspects et les infiltrés."},
    scenario: {name:"Recrutement Actif", desc:"Ta première mission de terrain pour le groupe Morkar."},
    objectif: {name:"Débusquer les Dissidents",desc:"Identifier et signaler tout agent de la résistance."}
  },
  "veteran-morkar": {
    decors:   {name:"Salle des Archives",desc:"Accès aux dossiers classifiés des éditions précédentes."},
    epoque:   {name:"Ère de Domination", desc:"Morkar contrôle le Tournoi depuis sa création."},
    theme:    {name:"Ordre & Terreur",   desc:"Ceux qui défient Morkar disparaissent sans laisser de traces."},
    capacite: {name:"Maîtrise du Terrain",desc:"Années d'expérience à traquer les dissidents en mission."},
    scenario: {name:"Opération Nettoyage",desc:"Éliminer toute menace dissidente avant qu'elle ne grandisse."},
    objectif: {name:"Neutralisation Totale",desc:"Aucun dissident ne doit quitter le tournoi libre."}
  }
};

/* ── Consumable (same for all) ── */
var CONSUMABLE_ITEM = {
  name: "Pilule de Compréhension",
  desc: "Permet de comprendre tous les langages de l'univers — à l'oral, à l'écrit et au parler. Effet permanent."
};

/* ── Misc items (scenario-dependent info documents) ── */
var SCENARIO_MISC = {
  "champion": [
    {name:"Briefing Officiel", desc:"Document du groupe Morkar détaillant les règles et attentes du tournoi."},
    {name:"Dossier des Adversaires", desc:"Aperçu des autres compétiteurs et de leurs mondes d'origine."}
  ],
  "lambda": [
    {name:"Message de Bienvenue", desc:"Note d'accueil adressée aux candidats des mondes isolés."},
    {name:"Guide de Survie", desc:"Ce qui vous attend dans le tournoi — l'essentiel à savoir."}
  ],
  "rebelle": [
    {name:"Identité de Couverture", desc:"Dossier falsifié pour maintenir ta couverture dans le tournoi."},
    {name:"Contacts du Réseau", desc:"Liste codée des alliés potentiels et points de rendez-vous."},
    {name:"L'Écho des Sillons", desc:"Article du journal indépendant sur les disparitions suspectes."}
  ],
  "apprenti-morkar": [
    {name:"Ordre de Mission", desc:"Briefing confidentiel de Morkar — détecter les éléments dissidents."},
    {name:"Profil des Menaces", desc:"Informations sur les méthodes et signes de reconnaissance des dissidents."}
  ],
  "veteran-morkar": [
    {name:"Directive Opérationnelle", desc:"Instructions de haut niveau pour la sécurité du tournoi."},
    {name:"Rapport Classifié", desc:"Dossier sur les infiltrations des éditions précédentes."},
    {name:"Protocole d'Extraction", desc:"Procédures d'urgence si un dissident est identifié."}
  ]
};

/* ── Equipment slot labels ── */
var PRE_INV_EQUIP_SLOTS = [
  {key:"decors",   icon:"\uD83C\uDFAD", label:"Décors"},
  {key:"epoque",   icon:"\u23F3",        label:"Époque"},
  {key:"theme",    icon:"\u2726",        label:"Thème"},
  {key:"capacite", icon:"\u26A1",        label:"Capacité"},
  {key:"scenario", icon:"\uD83D\uDCDC", label:"Scénario"},
  {key:"objectif", icon:"\uD83C\uDFAF", label:"Objectif"}
];

/* ── Callback stored for "Continuer" button ── */
var _preInvOnClose = null;

/* ══════════ BUILD PRE-INVENTORY PAGE ══════════ */
function buildPreInventoryPage(onClose){
  var p = document.getElementById("page-pre-inventory"); if(!p) return;
  if(onClose) _preInvOnClose = onClose;

  var u = loadUser();
  var scenario = window._chosenScenario || "lambda";
  var equip = SCENARIO_EQUIPMENT[scenario] || SCENARIO_EQUIPMENT["lambda"];
  var misc = SCENARIO_MISC[scenario] || [];

  var h = '<div class="profile-page pre-inv-page">';

  // ── Header card with avatar (same pattern as profile page) ──
  h += '<div class="prof-header">'
    + '<div class="prof-header-glow" style="background:linear-gradient(90deg,transparent,var(--gold-dark),transparent)"></div>'
    + '<div class="pre-inv-avatar-wrap">';
  if(u.avatar) h += '<img src="' + esc(u.avatar) + '">';
  else h += '<div class="prof-avatar-empty">\uD83D\uDC64</div>';
  h += '</div>'
    + '<span class="prof-rarity" style="background:var(--gold-dark)">' + esc(SCENARIO_LABELS[scenario] || "Voyageur") + '</span>'
    + '<div class="prof-info-overlay">'
    + '<div class="prof-name" style="color:var(--gold-light)">' + esc(u.name || "Voyageur") + '</div>'
    + '<div class="prof-subtitle">' + esc(SCENARIO_LABELS[scenario] || "Voyageur") + ' \u2022 Niv. ' + u.level + '</div>'
    + '</div></div>';

  // ── Stats summary (same pattern as profile page) ──
  h += '<div class="prof-stats-grid">'
    + '<div class="prof-stat-cell"><div class="prof-stat-val">Niv. ' + u.level + '</div><div class="prof-stat-lbl">Niveau</div></div>'
    + '<div class="prof-stat-cell"><div class="prof-stat-val">\uD83D\uDCB0 ' + u.coins + '</div><div class="prof-stat-lbl">Or</div></div>'
    + '<div class="prof-stat-cell"><div class="prof-stat-val">6</div><div class="prof-stat-lbl">\u00c9quip\u00e9s</div></div>'
    + '<div class="prof-stat-cell"><div class="prof-stat-val">1</div><div class="prof-stat-lbl">Conso.</div></div></div>';

  // ── Attributes (same pattern as profile page) ──
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
      + '<span class="dr-stat-label">' + s.key + '</span>'
      + '<div class="dr-stat-track"><div class="dr-stat-fill" style="width:' + s.val + '%;background:linear-gradient(90deg,' + s.color + ',' + s.color + '88)"></div></div>'
      + '<span class="dr-stat-val">' + s.val + '</span></div>';
  });
  h += '</div>';

  // ── Tabbed inventory ──
  h += '<div class="section-title">Inventaire</div>';
  h += '<div class="inv-tabs-section">';
  h += '<div class="inv-tabs">';
  h += '<button class="inv-tab active" data-tab="equipement">\u00C9quipement</button>';
  h += '<button class="inv-tab" data-tab="consommables">Consommables</button>';
  h += '<button class="inv-tab" data-tab="quetes">Qu\u00eates</button>';
  h += '<button class="inv-tab" data-tab="divers">Divers</button>';
  h += '</div>';

  // Tab content: Equipment
  h += '<div class="inv-tab-content active" id="inv-tc-equipement">';
  h += '<div class="inv-items-grid">';
  for(var e = 0; e < PRE_INV_EQUIP_SLOTS.length; e++){
    var sl = PRE_INV_EQUIP_SLOTS[e];
    var it = equip[sl.key];
    if(!it) continue;
    h += '<div class="inv-item">';
    h += '<div class="inv-item-icon">' + sl.icon + '</div>';
    h += '<div class="inv-item-info">';
    h += '<div class="inv-item-name">' + esc(it.name) + '</div>';
    h += '<div class="inv-item-type">' + esc(sl.label) + '</div>';
    h += '<div class="inv-item-desc">' + esc(it.desc) + '</div>';
    h += '</div></div>';
  }
  h += '</div></div>';

  // Tab content: Consumables
  h += '<div class="inv-tab-content" id="inv-tc-consommables">';
  h += '<div class="inv-items-grid">';
  h += '<div class="inv-item inv-item-consumable">';
  h += '<div class="inv-item-icon">\uD83D\uDC8A</div>';
  h += '<div class="inv-item-info">';
  h += '<div class="inv-item-name">' + esc(CONSUMABLE_ITEM.name) + '</div>';
  h += '<div class="inv-item-type">Consommable</div>';
  h += '<div class="inv-item-desc">' + esc(CONSUMABLE_ITEM.desc) + '</div>';
  h += '</div></div>';
  h += '</div></div>';

  // Tab content: Quests (empty for now)
  h += '<div class="inv-tab-content" id="inv-tc-quetes">';
  h += '<div class="inv-items-empty">Aucun objet de qu\u00eate pour l\'instant.</div>';
  h += '</div>';

  // Tab content: Misc (scenario documents)
  h += '<div class="inv-tab-content" id="inv-tc-divers">';
  h += '<div class="inv-items-grid">';
  for(var m = 0; m < misc.length; m++){
    h += '<div class="inv-item inv-item-misc">';
    h += '<div class="inv-item-icon">\uD83D\uDCC4</div>';
    h += '<div class="inv-item-info">';
    h += '<div class="inv-item-name">' + esc(misc[m].name) + '</div>';
    h += '<div class="inv-item-type">Document</div>';
    h += '<div class="inv-item-desc">' + esc(misc[m].desc) + '</div>';
    h += '</div></div>';
  }
  h += '</div></div>';

  h += '</div>'; // inv-tabs-section

  // ── Continue button (same style as profile save button) ──
  h += '<button class="prof-save-btn" id="pre-inv-continue-btn">Continuer</button>';

  h += '</div>'; // profile-page pre-inv-page

  p.innerHTML = h;
  wirePreInventoryPage();
}

/* ══════════ WIRE PRE-INVENTORY PAGE ══════════ */
function wirePreInventoryPage(){
  var p = document.getElementById("page-pre-inventory"); if(!p) return;

  // Tab switching
  var tabs = p.querySelectorAll(".inv-tab");
  for(var t = 0; t < tabs.length; t++){
    tabs[t].onclick = function(){
      var tabId = this.getAttribute("data-tab");
      p.querySelectorAll(".inv-tab").forEach(function(tb){ tb.classList.remove("active"); });
      p.querySelectorAll(".inv-tab-content").forEach(function(tc){ tc.classList.remove("active"); });
      this.classList.add("active");
      var content = document.getElementById("inv-tc-" + tabId);
      if(content) content.classList.add("active");
    };
  }

  // Continue button
  var continueBtn = document.getElementById("pre-inv-continue-btn");
  if(continueBtn) continueBtn.onclick = function(){
    if(_preInvOnClose) _preInvOnClose();
    _preInvOnClose = null;
  };
}

/* ══════════ SHOW INVENTORY OVERLAY (legacy wrapper) ══════════
   Keeps the same API for callers: showInventoryOverlay(onClose)
   Now renders as a page instead of a modal overlay.
   ═══════════════════════════════════════════════════════════ */
function showInventoryOverlay(onClose){
  buildPreInventoryPage(function(){
    showPage("accueil");
    if(onClose) onClose();
  });
  showPage("pre-inventory");
}
