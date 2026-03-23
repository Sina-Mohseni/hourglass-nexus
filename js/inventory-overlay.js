"use strict";

/* ══════════ INVENTORY OVERLAY — Diablo 4 style ══════════
   Shown after guide placement on lock screen (new voyage).
   Displays player portrait, stats, and scenario-based inventory.
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
var EQUIP_SLOTS = [
  {key:"decors",   icon:"\uD83C\uDFAD", label:"Décors"},
  {key:"epoque",   icon:"\u23F3",        label:"Époque"},
  {key:"theme",    icon:"\u2726",        label:"Thème"},
  {key:"capacite", icon:"\u26A1",        label:"Capacité"},
  {key:"scenario", icon:"\uD83D\uDCDC", label:"Scénario"},
  {key:"objectif", icon:"\uD83C\uDFAF", label:"Objectif"}
];

/* ══════════ SHOW INVENTORY OVERLAY ══════════ */
function showInventoryOverlay(onClose){
  var u = loadUser();
  var scenario = window._chosenScenario || "lambda";
  var equip = SCENARIO_EQUIPMENT[scenario] || SCENARIO_EQUIPMENT["lambda"];
  var misc = SCENARIO_MISC[scenario] || [];

  var overlay = document.createElement("div");
  overlay.className = "inv-overlay";
  overlay.id = "inv-overlay";

  // Build HTML
  var html = '<div class="inv-overlay-inner">';

  // ── Top section: portrait + stats ──
  html += '<div class="inv-top">';

  // Left: Portrait with equipment slots around it
  html += '<div class="inv-portrait-section">';
  html += '<div class="inv-portrait-frame">';
  if(u.avatar) html += '<img src="' + esc(u.avatar) + '" alt="" class="inv-portrait-img">';
  else html += '<div class="inv-portrait-empty">\uD83D\uDC64</div>';
  html += '</div>';

  // Equipment slots arranged around portrait
  html += '<div class="inv-equip-grid">';
  for(var i = 0; i < EQUIP_SLOTS.length; i++){
    var slot = EQUIP_SLOTS[i];
    var item = equip[slot.key];
    html += '<div class="inv-equip-slot" data-slot="' + slot.key + '" title="' + esc(slot.label) + '">';
    html += '<div class="inv-equip-slot-icon">' + slot.icon + '</div>';
    if(item){
      html += '<div class="inv-equip-slot-name">' + esc(item.name) + '</div>';
    }
    html += '</div>';
  }
  html += '</div>';
  html += '</div>'; // inv-portrait-section

  // Right: Name + stats
  html += '<div class="inv-stats-section">';
  html += '<div class="inv-char-name">' + esc(u.name || "Voyageur") + '</div>';
  html += '<div class="inv-char-role">' + esc(SCENARIO_LABELS[scenario] || "Voyageur") + ' \u2014 Niv. ' + u.level + '</div>';

  // Stats block
  var stats = [
    {key:"CRE", val:u.statCRE, color:"var(--gold-light)"},
    {key:"SAG", val:u.statSAG, color:"var(--mana-glow)"},
    {key:"CHA", val:u.statCHA, color:"var(--gold-pale)"},
    {key:"FOR", val:u.statFOR, color:"var(--blood-bright)"},
    {key:"AGI", val:u.statAGI, color:"var(--poison)"}
  ];
  html += '<div class="inv-stats-grid">';
  for(var s = 0; s < stats.length; s++){
    html += '<div class="inv-stat-row">';
    html += '<span class="inv-stat-label">' + stats[s].key + '</span>';
    html += '<span class="inv-stat-bar"><span class="inv-stat-fill" style="width:' + stats[s].val + '%;background:' + stats[s].color + '"></span></span>';
    html += '<span class="inv-stat-val">' + stats[s].val + '</span>';
    html += '</div>';
  }
  html += '</div>';

  // Gold
  html += '<div class="inv-gold-row"><span class="inv-gold-icon">\uD83D\uDCB0</span> ' + u.coins + ' Or</div>';
  html += '</div>'; // inv-stats-section
  html += '</div>'; // inv-top

  // ── Bottom section: Tabbed inventory ──
  html += '<div class="inv-tabs-section">';
  html += '<div class="inv-tabs">';
  html += '<button class="inv-tab active" data-tab="equipement">\u00C9quipement</button>';
  html += '<button class="inv-tab" data-tab="consommables">Consommables</button>';
  html += '<button class="inv-tab" data-tab="quetes">Qu\u00eates</button>';
  html += '<button class="inv-tab" data-tab="divers">Divers</button>';
  html += '</div>';

  // Tab content: Equipment
  html += '<div class="inv-tab-content active" id="inv-tc-equipement">';
  html += '<div class="inv-items-grid">';
  for(var e = 0; e < EQUIP_SLOTS.length; e++){
    var sl = EQUIP_SLOTS[e];
    var it = equip[sl.key];
    if(!it) continue;
    html += '<div class="inv-item">';
    html += '<div class="inv-item-icon">' + sl.icon + '</div>';
    html += '<div class="inv-item-info">';
    html += '<div class="inv-item-name">' + esc(it.name) + '</div>';
    html += '<div class="inv-item-type">' + esc(sl.label) + '</div>';
    html += '<div class="inv-item-desc">' + esc(it.desc) + '</div>';
    html += '</div></div>';
  }
  html += '</div></div>';

  // Tab content: Consumables
  html += '<div class="inv-tab-content" id="inv-tc-consommables">';
  html += '<div class="inv-items-grid">';
  html += '<div class="inv-item inv-item-consumable">';
  html += '<div class="inv-item-icon">\uD83D\uDC8A</div>';
  html += '<div class="inv-item-info">';
  html += '<div class="inv-item-name">' + esc(CONSUMABLE_ITEM.name) + '</div>';
  html += '<div class="inv-item-type">Consommable</div>';
  html += '<div class="inv-item-desc">' + esc(CONSUMABLE_ITEM.desc) + '</div>';
  html += '</div></div>';
  html += '</div></div>';

  // Tab content: Quests (empty for now)
  html += '<div class="inv-tab-content" id="inv-tc-quetes">';
  html += '<div class="inv-items-empty">Aucun objet de qu\u00eate pour l\'instant.</div>';
  html += '</div>';

  // Tab content: Misc (scenario documents)
  html += '<div class="inv-tab-content" id="inv-tc-divers">';
  html += '<div class="inv-items-grid">';
  for(var m = 0; m < misc.length; m++){
    html += '<div class="inv-item inv-item-misc">';
    html += '<div class="inv-item-icon">\uD83D\uDCC4</div>';
    html += '<div class="inv-item-info">';
    html += '<div class="inv-item-name">' + esc(misc[m].name) + '</div>';
    html += '<div class="inv-item-type">Document</div>';
    html += '<div class="inv-item-desc">' + esc(misc[m].desc) + '</div>';
    html += '</div></div>';
  }
  html += '</div></div>';

  html += '</div>'; // inv-tabs-section

  // Close button
  html += '<button class="inv-close-btn" id="inv-close-btn">Continuer</button>';

  html += '</div>'; // inv-overlay-inner
  overlay.innerHTML = html;

  var screenEl = document.querySelector(".screen");
  (screenEl || document.body).appendChild(overlay);

  // Fade in
  setTimeout(function(){ overlay.classList.add("visible"); }, 30);

  // Tab switching
  var tabs = overlay.querySelectorAll(".inv-tab");
  for(var t = 0; t < tabs.length; t++){
    tabs[t].onclick = function(){
      var tabId = this.getAttribute("data-tab");
      overlay.querySelectorAll(".inv-tab").forEach(function(tb){ tb.classList.remove("active"); });
      overlay.querySelectorAll(".inv-tab-content").forEach(function(tc){ tc.classList.remove("active"); });
      this.classList.add("active");
      var content = document.getElementById("inv-tc-" + tabId);
      if(content) content.classList.add("active");
    };
  }

  // Close
  document.getElementById("inv-close-btn").onclick = function(){
    overlay.classList.remove("visible");
    overlay.classList.add("closing");
    setTimeout(function(){
      overlay.remove();
      if(onClose) onClose();
    }, 500);
  };
}
