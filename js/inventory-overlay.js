"use strict";

/* ══════════ PRE-GAME OVERLAY ══════════
   Profile page: vertical portrait, editable fields,
   two action buttons (Inventaire + Équipement),
   save & continue at the bottom.
   ═══════════════════════════════════════ */

var SCENARIO_LABELS = {
  "champion":"Champion", "lambda":"Isolé", "rebelle":"Dissident",
  "apprenti-morkar":"Recrue Morkar", "veteran-morkar":"Vétéran Morkar"
};

/* ── Equipment items per scenario (6 slots) ── */
var SCENARIO_EQUIPMENT = {
  "champion": {
    decors:   {name:"Arène Impériale",  desc:"Décors officiels du tournoi, tribunes monumentales et drapeaux planétaires.", icon:"\uD83C\uDFAD"},
    epoque:   {name:"Ère Connectée",    desc:"Époque de prospérité technologique et d'échanges inter-mondes.", icon:"\u23F3"},
    theme:    {name:"Gloire & Honneur",  desc:"Le champion porte les espoirs de son peuple sous les projecteurs.", icon:"\u2726"},
    capacite: {name:"Charisme Médiatique",desc:"Capacité à galvaniser les foules et attirer les sponsors.", icon:"\u26A1"},
    scenario: {name:"Épreuve Officielle", desc:"Scénario sanctionné par le groupe Morkar, retransmis en direct.", icon:"\uD83D\uDCDC"},
    objectif: {name:"Victoire Totale",   desc:"Remporter le tournoi et obtenir l'intégration au Réseau Universel.", icon:"\uD83C\uDFAF"}
  },
  "lambda": {
    decors:   {name:"Terres Inconnues",  desc:"Paysages étranges et technologies jamais vues par ton peuple.", icon:"\uD83C\uDFAD"},
    epoque:   {name:"Ère Primitive",     desc:"Ton monde vit en autarcie, sans contact avec le Réseau.", icon:"\u23F3"},
    theme:    {name:"Découverte & Survie",desc:"Tout est nouveau, tout est dangereux, tout est fascinant.", icon:"\u2726"},
    capacite: {name:"Instinct Brut",     desc:"Capacité d'adaptation forgée par une vie sans technologie.", icon:"\u26A1"},
    scenario: {name:"Candidat Isolé",    desc:"Sélectionné par les éclaireurs de Morkar sur une planète coupée.", icon:"\uD83D\uDCDC"},
    objectif: {name:"Transformation",    desc:"Gagner pour offrir l'accès au Réseau à ton monde entier.", icon:"\uD83C\uDFAF"}
  },
  "rebelle": {
    decors:   {name:"Coulisses du Tournoi",desc:"Les zones d'ombre que les caméras ne montrent jamais.", icon:"\uD83C\uDFAD"},
    epoque:   {name:"Ère du Soupçon",   desc:"Les dissidents s'organisent dans l'ombre depuis des décennies.", icon:"\u23F3"},
    theme:    {name:"Infiltration",      desc:"Chaque geste est calculé, chaque sourire est un masque.", icon:"\u2726"},
    capacite: {name:"Double Jeu",        desc:"Capacité à maintenir une couverture parfaite sous pression.", icon:"\u26A1"},
    scenario: {name:"Mission Secrète",   desc:"Rassembler des preuves de la corruption du groupe Morkar.", icon:"\uD83D\uDCDC"},
    objectif: {name:"Révélation",        desc:"Faire éclater la vérité sur les mensonges de Morkar.", icon:"\uD83C\uDFAF"}
  },
  "apprenti-morkar": {
    decors:   {name:"Quartier Général",  desc:"Les installations secrètes du groupe Morkar, sous le tournoi.", icon:"\uD83C\uDFAD"},
    epoque:   {name:"Ère de Contrôle",   desc:"Morkar étend son influence sur chaque monde connecté.", icon:"\u23F3"},
    theme:    {name:"Loyauté & Ambition", desc:"Servir Morkar est un honneur — et une voie vers le pouvoir.", icon:"\u2726"},
    capacite: {name:"Observation Tactique",desc:"Capacité à détecter les comportements suspects et les infiltrés.", icon:"\u26A1"},
    scenario: {name:"Recrutement Actif", desc:"Ta première mission de terrain pour le groupe Morkar.", icon:"\uD83D\uDCDC"},
    objectif: {name:"Débusquer les Dissidents",desc:"Identifier et signaler tout agent de la résistance.", icon:"\uD83C\uDFAF"}
  },
  "veteran-morkar": {
    decors:   {name:"Salle des Archives",desc:"Accès aux dossiers classifiés des éditions précédentes.", icon:"\uD83C\uDFAD"},
    epoque:   {name:"Ère de Domination", desc:"Morkar contrôle le Tournoi depuis sa création.", icon:"\u23F3"},
    theme:    {name:"Ordre & Terreur",   desc:"Ceux qui défient Morkar disparaissent sans laisser de traces.", icon:"\u2726"},
    capacite: {name:"Maîtrise du Terrain",desc:"Années d'expérience à traquer les dissidents en mission.", icon:"\u26A1"},
    scenario: {name:"Opération Nettoyage",desc:"Éliminer toute menace dissidente avant qu'elle ne grandisse.", icon:"\uD83D\uDCDC"},
    objectif: {name:"Neutralisation Totale",desc:"Aucun dissident ne doit quitter le tournoi libre.", icon:"\uD83C\uDFAF"}
  }
};

var CONSUMABLE_ITEM = {
  name: "Pilule de Compréhension",
  desc: "Permet de comprendre tous les langages de l'univers — à l'oral, à l'écrit et au parler. Effet permanent."
};

var SCENARIO_MISC = {
  "champion": [
    {name:"Briefing Officiel", desc:"Document du groupe Morkar détaillant les règles et attentes du tournoi.",
     body:"Félicitations, Champion. Vous avez été désigné par votre planète pour la représenter lors de la 47e édition du Tournoi d'Extelua. En tant que candidat officiel du Réseau Universel, vous bénéficiez du soutien logistique complet du groupe Morkar : transport via les Routes Sillonnées, hébergement dans les quartiers réservés aux champions, et accès aux centres d'entraînement pré-tournoi. Votre planète compte sur vous. Des milliards de spectateurs suivront votre parcours en direct. Rappelez-vous : vous ne vous battez pas seulement pour vous, mais pour l'honneur et l'avenir de votre monde. Le groupe Morkar vous souhaite bonne chance et reste à votre disposition pour toute question relative au règlement et au déroulement des épreuves."},
    {name:"Dossier des Adversaires", desc:"Aperçu des autres compétiteurs et de leurs mondes d'origine.",
     body:"Comme pour chaque édition, le groupe Morkar met à disposition des champions connectés un dossier préliminaire sur les autres candidats. Cette année, 30 champions représentent les planètes du Réseau — parmi eux, plusieurs athlètes de haut niveau, deux anciens finalistes du Cycle 45, et un scientifique de la planète Veruhn dont les capacités analytiques sont jugées exceptionnelles. Les 10 isolés des planètes coupées du Réseau sont, comme d'habitude, des profils inconnus. Morkar rappelle que malgré leur inexpérience, certains isolés ont atteint les phases avancées lors des éditions précédentes. Ne sous-estimez personne. Les dossiers complets seront accessibles après la cérémonie d'ouverture."}
  ],
  "lambda": [
    {name:"Message de Bienvenue", desc:"Note d'accueil adressée aux candidats des mondes isolés.",
     body:"Bienvenue, Isolé. Vous avez été sélectionné par nos éclaireurs parmi les habitants de votre planète pour participer à un événement qui dépasse tout ce que vous avez pu connaître jusqu'ici. Le Tournoi d'Extelua est la plus grande compétition de l'univers connu. Pendant quinze lunes, vous affronterez d'autres candidats venus de mondes très différents du vôtre. Nous comprenons que cette situation peut être déstabilisante. C'est pourquoi le groupe Morkar a mis en place un programme d'accompagnement spécifique pour les isolés des planètes coupées du Réseau. Un guide vous sera assigné pour vous aider à comprendre les règles, les technologies et les enjeux du Tournoi. Votre monde mérite cette chance. Saisissez-la."},
    {name:"Guide de Survie", desc:"Ce qui vous attend dans le tournoi — l'essentiel à savoir.",
     body:"En tant qu'isolé d'une planète non connectée au Réseau Universel, vous découvrirez des technologies, des civilisations et des modes de vie radicalement différents de ce que vous connaissez. Ne vous laissez pas intimider. Les épreuves du Tournoi ne sont pas uniquement physiques — elles testent aussi l'intelligence, l'adaptabilité et la capacité à forger des alliances. Ce sont des qualités que les habitants des mondes isolés possèdent souvent en abondance. Sur les 46 éditions précédentes, des isolés ont régulièrement surpris les pronostics en atteignant les phases intermédiaires. La récompense pour le vainqueur est l'intégration totale de sa planète d'origine au Réseau Universel. Pour votre monde, cela signifierait l'accès aux Routes Sillonnées, aux technologies médicales avancées et à un siège au Conseil des Mondes."}
  ],
  "rebelle": [
    {name:"Identité de Couverture", desc:"Dossier falsifié pour maintenir ta couverture dans le tournoi.",
     body:"Ce dossier contient l'identité complète qui te servira de couverture pendant toute la durée du Tournoi. Chaque détail a été soigneusement construit pour résister aux vérifications de Morkar. Ton histoire personnelle, ton monde d'origine officiel, tes motivations déclarées — tout est cohérent. Apprends-le par cœur. Le moindre faux pas pourrait te trahir. Les agents de Morkar sont entraînés à repérer les incohérences dans les récits des candidats. Ne te contredis jamais. Ne révèle jamais ta véritable identité, même à ceux qui te semblent dignes de confiance. La mission prime sur tout."},
    {name:"Contacts du Réseau", desc:"Liste codée des alliés potentiels et points de rendez-vous.",
     body:"Cette liste contient les points de contact et les signaux de reconnaissance établis par le réseau dissident pour cette édition. Les informations sont codées — tu connais la méthode de déchiffrement. Certains contacts sont des agents infiltrés comme toi, d'autres sont des sympathisants placés dans l'organisation de Morkar. Ne tente jamais de les identifier ouvertement. Attends qu'ils se manifestent selon le protocole convenu. Les points de rendez-vous changent selon un calendrier que tu as mémorisé avant ton départ. En cas de compromission, détruis ce document et coupe tout contact. Tu es seul."},
    {name:"L'Écho des Sillons", desc:"Article du journal indépendant sur les disparitions suspectes.", journal:true}
  ],
  "apprenti-morkar": [
    {name:"Ordre de Mission", desc:"Briefing confidentiel de Morkar — détecter les éléments dissidents.",
     body:"Agent, votre intégration au programme Morkar est effective. Vous participez au Tournoi en tant que champion officiel de votre planète, mais votre mission va au-delà de la compétition. Le renseignement interne de Morkar a détecté des signaux indiquant qu'un ou plusieurs éléments dissidents pourraient tenter de s'infiltrer dans cette édition, comme cela s'est produit lors des Cycles 39 et 44. Votre rôle est d'observer, d'écouter et de repérer tout comportement suspect parmi les candidats — champions comme isolés. Vous devez maintenir votre couverture de champion ordinaire en toutes circonstances. Si vous identifiez un dissident potentiel, transmettez l'information via le canal sécurisé qui vous a été communiqué lors de votre briefing. En cas de succès, la récompense d'intégration sera garantie pour votre monde, indépendamment de votre classement dans le Tournoi."},
    {name:"Profil des Menaces", desc:"Informations sur les méthodes et signes de reconnaissance des dissidents.",
     body:"Les éléments dissidents sont des individus ou des réseaux organisés qui s'opposent au système mis en place par le groupe Morkar. Leurs motivations sont variées : certains croient que le Tournoi est truqué, d'autres remettent en question la légitimité de Morkar à organiser l'événement. Lors du Cycle 39, un dissident infiltré parmi les champions a tenté de diffuser un message pirate pendant une retransmission en direct. L'incident a été contenu. Lors du Cycle 44, deux agents présumés ont été identifiés parmi les isolés — l'un d'eux avait falsifié son origine planétaire. Les dissidents sont généralement bien préparés et difficiles à détecter. Méfiez-vous des candidats qui posent trop de questions sur le fonctionnement interne de Morkar, qui cherchent à accéder à des zones restreintes, ou qui tissent des alliances inhabituelles. Tout détail peut être significatif."}
  ],
  "veteran-morkar": [
    {name:"Directive Opérationnelle", desc:"Instructions de haut niveau pour la sécurité du tournoi.",
     body:"Agent confirmé, vous connaissez la procédure. Le Cycle 47 présente un niveau de menace élevé selon nos analystes. Les réseaux dissidents ont été plus actifs que jamais ces derniers mois — communications interceptées, mouvements suspects dans les secteurs non régulés, tentatives de contact avec d'anciens candidats. Nous pensons qu'une infiltration est non seulement probable, mais planifiée à grande échelle. Votre expérience des éditions précédentes est un atout majeur. Vous avez carte blanche pour mener vos investigations comme vous l'entendez, dans les limites du règlement visible. Les candidats ne doivent pas soupçonner votre véritable rôle. En cas d'identification formelle d'un dissident, vous êtes autorisé à prendre les mesures nécessaires pour neutraliser la menace avant qu'elle ne compromette la retransmission."},
    {name:"Rapport Classifié", desc:"Dossier sur les infiltrations des éditions précédentes.",
     body:"Pour mémoire : sur les 10 dernières éditions, 7 infiltrations dissidentes ont été confirmées. Dans 4 cas, les agents se sont fait passer pour des champions ordinaires. Dans 2 cas, ils se sont infiltrés via le programme isolé en falsifiant leur origine planétaire. Le dernier cas, lors du Cycle 44, impliquait un ancien employé de Morkar retourné. Les méthodes évoluent. Les dissidents ne se contentent plus de saboter les épreuves — ils cherchent désormais à collecter des preuves sur le fonctionnement interne du Tournoi pour les diffuser publiquement. C'est cette menace informationnelle qui constitue le risque principal. La récompense promise aux vainqueurs, les conditions d'intégration au Réseau, les critères de sélection des isolés — autant de sujets sensibles que les dissidents cherchent à exposer. Votre mission est de vous assurer que cela n'arrive pas."},
    {name:"Protocole d'Extraction", desc:"Procédures d'urgence si un dissident est identifié.",
     body:"En cas d'identification formelle d'un élément dissident, le protocole suivant doit être appliqué sans délai. Phase 1 : Confirmation — obtenir au moins deux éléments de preuve indépendants avant toute action. Un comportement suspect ne suffit pas. Phase 2 : Isolement — éloigner la cible des autres candidats sous un prétexte crédible lié au Tournoi. Phase 3 : Extraction — contacter le poste de commandement via le canal sécurisé pour déclencher l'intervention d'une équipe spécialisée. À aucun moment vous ne devez agir seul pour neutraliser physiquement la cible. Les incidents des Cycles précédents ont montré que les confrontations directes attirent l'attention et compromettent la couverture de l'ensemble du dispositif de sécurité. Discrétion absolue."}
  ]
};

/* ── Equipment slot definitions ── */
var PRE_INV_EQUIP_SLOTS = [
  {key:"decors",   icon:"\uD83C\uDFAD", label:"D\u00e9cors",   color:"#9b59b6"},
  {key:"epoque",   icon:"\u23F3",        label:"\u00c9poque",   color:"#5dade2"},
  {key:"theme",    icon:"\u2726",        label:"Th\u00e8me",    color:"#e8a838"},
  {key:"capacite", icon:"\u26A1",        label:"Capacit\u00e9", color:"#e74c3c"},
  {key:"scenario", icon:"\uD83D\uDCDC", label:"Sc\u00e9nario", color:"#27ae60"},
  {key:"objectif", icon:"\uD83C\uDFAF", label:"Objectif",      color:"#e67e22"}
];

/* ══════════ MAIN OVERLAY (pre-game profile page) ══════════ */
function showInventoryOverlay(onClose){
  var u = loadUser();
  var scenario = window._chosenScenario || "lambda";
  var equip = SCENARIO_EQUIPMENT[scenario] || SCENARIO_EQUIPMENT["lambda"];
  var misc = (SCENARIO_MISC[scenario] || []).slice(); // clone

  // Add signed contract if available
  if(window._contractSigned){
    var cType = window._contractType || "isole";
    var cData = (typeof CONTRACT_CONTENT !== "undefined") ? CONTRACT_CONTENT[cType] : null;
    if(cData){
      misc.unshift({
        name: cData.title,
        desc: "Contrat signé lors de votre inscription au tournoi.",
        body: cData.paragraphs.join("\n\n")
      });
    }
  }

  var overlay = document.createElement("div");
  overlay.className = "inv-overlay";
  overlay.id = "inv-overlay";

  var h = '<div class="inv-overlay-inner profile-page">';

  // ── Vertical portrait (clickable to change) ──
  h += '<div class="prof-header inv-header-portrait">'
    + '<div class="prof-header-glow" style="background:linear-gradient(90deg,transparent,var(--gold-dark),transparent)"></div>'
    + '<div class="inv-avatar-wrap" id="inv-avatar-wrap">';
  if(u.avatar) h += '<img src="' + esc(u.avatar) + '" id="inv-avatar-img">';
  else h += '<div class="prof-avatar-empty" id="inv-avatar-img">\uD83D\uDC64</div>';
  h += '<div class="inv-avatar-change-hint">Changer le portrait</div>';
  h += '</div>'
    + '<span class="prof-rarity" style="background:var(--gold-dark)">' + esc(SCENARIO_LABELS[scenario] || "Voyageur") + '</span>'
    + '<div class="prof-info-overlay">'
    + '<div class="prof-name" style="color:var(--gold-light)" id="inv-display-name">' + esc(u.name || "Voyageur") + '</div>'
    + '<div class="prof-subtitle">' + esc(SCENARIO_LABELS[scenario] || "Voyageur") + ' \u2022 Niv. ' + u.level + '</div>'
    + '</div></div>';
  h += '<input type="file" accept="image/*" id="inv-file-input" style="position:absolute;width:0;height:0;opacity:0;pointer-events:none">';

  // ── Editable fields ──
  h += '<div class="section-title">Identit\u00e9</div>';
  h += '<div class="inv-edit-form">';
  h += '<div><label class="prof-field-label">Nom</label>'
    + '<input type="text" class="prof-input" id="inv-edit-name" value="' + esc(u.name) + '" placeholder="Ton nom\u2026" maxlength="40"></div>';
  h += '<div><label class="prof-field-label">Slogan</label>'
    + '<input type="text" class="prof-input" id="inv-edit-quote" value="' + esc(u.quote) + '" placeholder="Ton slogan\u2026" maxlength="80"></div>';
  h += '<div><label class="prof-field-label">Nom du monde</label>'
    + '<input type="text" class="prof-input" id="inv-edit-world" value="' + esc(u.worldName) + '" placeholder="D\u2019o\u00f9 viens-tu ?" maxlength="40"></div>';
  h += '<div><label class="prof-field-label">Classe / M\u00e9tier</label>'
    + '<input type="text" class="prof-input" id="inv-edit-class" value="' + esc(u.className) + '" placeholder="Ton r\u00f4le\u2026" maxlength="40"></div>';
  h += '<div><label class="prof-field-label">Sc\u00e9nario</label>'
    + '<div class="inv-readonly-field">' + esc(SCENARIO_LABELS[scenario] || "Voyageur") + '</div></div>';
  h += '</div>';

  // ── Two action buttons: Inventaire + Équipement ──
  h += '<div class="section-title">Actions</div>';
  h += '<div class="inv-actions-grid">';
  h += '<div class="prof-section-card" id="inv-open-inventory-btn">'
    + '<div class="prof-section-icon">\uD83C\uDF92</div>'
    + '<div class="prof-section-info"><div class="prof-section-name">Inventaire</div>'
    + '<div class="prof-section-desc">Consommables & documents</div></div>'
    + '<span class="prof-section-arrow">\u203a</span></div>';
  h += '<div class="prof-section-card" id="inv-open-equip-btn">'
    + '<div class="prof-section-icon">\uD83D\uDEE1\uFE0F</div>'
    + '<div class="prof-section-info"><div class="prof-section-name">\u00c9quipement</div>'
    + '<div class="prof-section-desc">Portrait & objets \u00e9quip\u00e9s</div></div>'
    + '<span class="prof-section-arrow">\u203a</span></div>';
  h += '</div>';

  // ── Bottom buttons: Save + Continue ──
  h += '<div class="inv-bottom-actions">';
  h += '<button class="inv-action-icon-btn" id="inv-save-btn" title="Sauvegarder">\uD83D\uDCBE</button>';
  h += '<button class="inv-action-icon-btn inv-continue-icon" id="inv-close-btn" title="Continuer">\u25B6</button>';
  h += '</div>';

  h += '</div>';
  overlay.innerHTML = h;

  var screenEl = document.querySelector(".screen");
  (screenEl || document.body).appendChild(overlay);
  setTimeout(function(){ overlay.classList.add("visible"); }, 30);

  // ── Wire: Avatar change ──
  var avatarWrap = document.getElementById("inv-avatar-wrap");
  var fileInput = document.getElementById("inv-file-input");
  if(avatarWrap && fileInput){
    avatarWrap.onclick = function(){ fileInput.click(); };
    fileInput.onchange = function(){
      var file = fileInput.files[0]; if(!file) return;
      var reader = new FileReader();
      reader.onload = async function(ev){
        var ok = await saveAvatar(ev.target.result);
        if(ok){
          var u2 = loadUser();
          var imgEl = document.getElementById("inv-avatar-img");
          if(imgEl){
            if(imgEl.tagName === "IMG"){ imgEl.src = u2.avatar; }
            else {
              var img = document.createElement("img");
              img.id = "inv-avatar-img"; img.src = u2.avatar;
              imgEl.parentNode.replaceChild(img, imgEl);
            }
          }
        }
      };
      reader.readAsDataURL(file);
    };
  }

  // ── Wire: Auto-save fields ──
  function saveFields(){
    var cu = loadUser();
    var ni = document.getElementById("inv-edit-name");
    var qi = document.getElementById("inv-edit-quote");
    var wi = document.getElementById("inv-edit-world");
    var ci = document.getElementById("inv-edit-class");
    if(ni) cu.name = ni.value;
    if(qi) cu.quote = qi.value;
    if(wi) cu.worldName = wi.value;
    if(ci) cu.className = ci.value;
    saveUser(cu);
    var dn = document.getElementById("inv-display-name");
    if(dn && ni) dn.textContent = ni.value || "Voyageur";
  }
  ["inv-edit-name","inv-edit-quote","inv-edit-world","inv-edit-class"].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.addEventListener("input", saveFields);
  });

  // ── Wire: Inventory modal ──
  document.getElementById("inv-open-inventory-btn").onclick = function(){
    openInventoryModal(misc, equip);
  };

  // ── Wire: Equipment modal ──
  document.getElementById("inv-open-equip-btn").onclick = function(){
    openEquipmentModal(loadUser(), scenario, equip);
  };

  // ── Wire: Save button ──
  var saveBtn = document.getElementById("inv-save-btn");
  if(saveBtn) saveBtn.onclick = function(){
    showSaveDialog(function(save){
      if(!save) return;
      acDB.set("ac_saveTimestamp", save.date);
      saveBtn.textContent = "\u2714";
      saveBtn.style.background = "linear-gradient(145deg, var(--poison), #1a6b3a)";
      saveBtn.style.borderColor = "var(--poison)";
    });
  };

  // ── Wire: Continue button ──
  document.getElementById("inv-close-btn").onclick = function(){
    overlay.classList.remove("visible");
    overlay.classList.add("closing");
    setTimeout(function(){
      overlay.remove();
      if(onClose) onClose();
    }, 500);
  };
}

/* ══════════ INVENTORY MODAL ══════════ */
function openInventoryModal(misc, equip){
  var modal = document.createElement("div");
  modal.className = "inv-modal-backdrop";

  var h = '<div class="inv-modal">';
  h += '<button class="inv-modal-close" id="inv-modal-close-btn">\u2715</button>';

  h += '<div class="inv-modal-title">Inventaire</div>';

  h += '<div class="inv-tabs-section">';
  h += '<div class="inv-tabs">';
  h += '<button class="inv-tab active" data-tab="m-equipement">\u00c9quipement</button>';
  h += '<button class="inv-tab" data-tab="m-consommables">Consommables</button>';
  h += '<button class="inv-tab" data-tab="m-quetes">Qu\u00eates</button>';
  h += '<button class="inv-tab" data-tab="m-divers">Divers</button>';
  h += '</div>';

  // Equipment tab — accordion per slot type
  h += '<div class="inv-tab-content active" id="inv-tc-m-equipement">';
  h += '<div class="eq-drawers">';
  for(var e = 0; e < PRE_INV_EQUIP_SLOTS.length; e++){
    var sl = PRE_INV_EQUIP_SLOTS[e];
    var it = equip[sl.key];
    if(!it) continue;
    h += '<div class="eq-drawer" data-drawer="' + sl.key + '">';
    h += '<button class="eq-drawer-header">'
      + '<span class="eq-drawer-icon" style="color:' + sl.color + '">' + sl.icon + '</span>'
      + '<span class="eq-drawer-title">' + esc(sl.label) + '</span>'
      + '<span class="eq-drawer-arrow">\u25BE</span>'
      + '</button>';
    h += '<div class="eq-drawer-content">';
    h += '<div class="eq-item">'
      + '<div class="eq-item-icon">' + it.icon + '</div>'
      + '<div class="eq-item-info">'
      + '<div class="eq-item-name">' + esc(it.name) + '</div>'
      + '<div class="eq-item-type">' + esc(sl.label) + '</div>'
      + '</div>'
      + '<div class="eq-item-actions">'
      + '<button class="eq-btn-equip inv-eq-equip" data-eq-key="' + sl.key + '" title="\u00c9quiper">\u2714</button>'
      + '<button class="eq-btn-view inv-eq-view" data-eq-key="' + sl.key + '" title="Voir">\uD83D\uDD0D</button>'
      + '</div>'
      + '</div>';
    h += '</div></div>';
  }
  h += '</div></div>';

  // Consumables — pill only appears if NOT consumed during contract signing
  h += '<div class="inv-tab-content" id="inv-tc-m-consommables">';
  h += '<div class="inv-items-grid">';
  if(!window._pillConsumed){
    h += '<div class="inv-item inv-item-consumable" data-inv-idx="conso-0">';
    h += '<div class="inv-item-icon">\uD83D\uDC8A</div>';
    h += '<div class="inv-item-info">';
    h += '<div class="inv-item-name">' + esc(CONSUMABLE_ITEM.name) + '</div>';
    h += '<div class="inv-item-type">Consommable</div>';
    h += '</div>';
    h += '<div class="eq-item-actions">';
    h += '<button class="eq-btn-equip inv-btn-use" data-inv-type="conso" data-inv-i="0" title="Utiliser">\u25B6</button>';
    h += '<button class="eq-btn-view inv-btn-view" data-inv-type="conso" data-inv-i="0" title="Voir">\uD83D\uDD0D</button>';
    h += '</div></div>';
  } else {
    h += '<div class="inv-items-empty">Aucun consommable.</div>';
  }
  h += '</div></div>';

  // Quests
  h += '<div class="inv-tab-content" id="inv-tc-m-quetes">';
  h += '<div class="inv-items-empty">Aucun objet de qu\u00eate pour l\'instant.</div>';
  h += '</div>';

  // Misc
  h += '<div class="inv-tab-content" id="inv-tc-m-divers">';
  h += '<div class="inv-items-grid">';
  for(var m = 0; m < misc.length; m++){
    h += '<div class="inv-item inv-item-misc" data-inv-idx="misc-' + m + '">';
    h += '<div class="inv-item-icon">\uD83D\uDCC4</div>';
    h += '<div class="inv-item-info">';
    h += '<div class="inv-item-name">' + esc(misc[m].name) + '</div>';
    h += '<div class="inv-item-type">Document</div>';
    h += '</div>';
    h += '<div class="eq-item-actions">';
    h += '<button class="eq-btn-view inv-btn-view" data-inv-type="misc" data-inv-i="' + m + '" title="Voir">\uD83D\uDD0D</button>';
    h += '</div></div>';
  }
  h += '</div></div>';

  h += '</div>'; // inv-tabs-section
  h += '</div>'; // inv-modal
  modal.innerHTML = h;

  var screenEl = document.querySelector(".screen");
  (screenEl || document.body).appendChild(modal);
  setTimeout(function(){ modal.classList.add("visible"); }, 20);

  // Tab switching
  modal.querySelectorAll(".inv-tab").forEach(function(tab){
    tab.onclick = function(){
      var tabId = this.getAttribute("data-tab");
      modal.querySelectorAll(".inv-tab").forEach(function(tb){ tb.classList.remove("active"); });
      modal.querySelectorAll(".inv-tab-content").forEach(function(tc){ tc.classList.remove("active"); });
      this.classList.add("active");
      var content = document.getElementById("inv-tc-" + tabId);
      if(content) content.classList.add("active");
    };
  });

  // ── Wire: Voir buttons ──
  modal.querySelectorAll(".inv-btn-view").forEach(function(btn){
    btn.onclick = function(ev){
      ev.stopPropagation();
      var type = btn.getAttribute("data-inv-type");
      var idx = parseInt(btn.getAttribute("data-inv-i"));
      if(type === "conso"){
        showItemDetailModal(
          {name: CONSUMABLE_ITEM.name, desc: CONSUMABLE_ITEM.desc, icon: "\uD83D\uDC8A"},
          {label: "Consommable", color: "#228844"}
        );
      } else {
        var doc = misc[idx];
        if(!doc) return;
        // Journal article (rebel scenario) — open dedicated journal modal
        if(doc.journal){
          showJournalArticle();
          return;
        }
        showItemDetailModal(
          {name: doc.name, desc: doc.body || doc.desc, icon: "\uD83D\uDCC4"},
          {label: "Document", color: "#a8842a"}
        );
      }
    };
  });

  // ── Wire: Utiliser buttons ──
  modal.querySelectorAll(".inv-btn-use").forEach(function(btn){
    btn.onclick = function(ev){
      ev.stopPropagation();
      var itemEl = btn.closest(".inv-item");
      if(itemEl) itemEl.classList.add("eq-item-equipped");
    };
  });

  // ── Wire: Equipment accordion toggles ──
  modal.querySelectorAll(".eq-drawer-header").forEach(function(hdr){
    hdr.onclick = function(){
      hdr.closest(".eq-drawer").classList.toggle("open");
    };
  });

  // ── Wire: Equipment equip buttons ──
  modal.querySelectorAll(".inv-eq-equip").forEach(function(btn){
    btn.onclick = function(ev){
      ev.stopPropagation();
      var itemEl = btn.closest(".eq-item");
      if(itemEl) itemEl.classList.add("eq-item-equipped");
    };
  });

  // ── Wire: Equipment view buttons ──
  modal.querySelectorAll(".inv-eq-view").forEach(function(btn){
    btn.onclick = function(ev){
      ev.stopPropagation();
      var key = btn.getAttribute("data-eq-key");
      var item = equip[key];
      var slotDef = PRE_INV_EQUIP_SLOTS.filter(function(s){ return s.key === key; })[0];
      if(item && slotDef) showItemDetailModal(item, slotDef);
    };
  });

  function closeModal(){
    modal.classList.remove("visible");
    setTimeout(function(){ modal.remove(); }, 300);
  }
  document.getElementById("inv-modal-close-btn").onclick = closeModal;
  modal.onclick = function(ev){ if(ev.target === modal) closeModal(); };
}

/* ══════════ EQUIPMENT MODAL (fullscreen portrait + slot interaction) ══════════ */
function openEquipmentModal(u, scenario, equip){
  var equipped = {}; // { slotKey: itemObj } or empty

  var modal = document.createElement("div");
  modal.className = "inv-modal-backdrop";

  var h = '<div class="eq-fullscreen">';
  h += '<button class="inv-modal-close eq-fs-close" id="eq-modal-close-btn">\u2715</button>';

  // ── Fullscreen portrait with 6 overlay slots ──
  h += '<div class="eq-portrait-zone eq-portrait-fullscreen">';
  h += '<div class="eq-portrait-bg">';
  if(u.avatar) h += '<img src="' + esc(u.avatar) + '">';
  else h += '<div class="inv-character-empty">\uD83D\uDC64</div>';
  h += '</div>';
  h += '<div class="eq-slots-grid">';
  for(var i = 0; i < PRE_INV_EQUIP_SLOTS.length; i++){
    var sl = PRE_INV_EQUIP_SLOTS[i];
    h += '<div class="eq-slot" data-slot="' + sl.key + '" style="--slot-color:' + sl.color + '">'
      + '<span class="eq-slot-icon">' + sl.icon + '</span>'
      + '<span class="eq-slot-label">' + esc(sl.label) + '</span></div>';
  }
  h += '</div>';
  h += '</div>';

  h += '</div>';
  modal.innerHTML = h;

  var screenEl = document.querySelector(".screen");
  (screenEl || document.body).appendChild(modal);
  setTimeout(function(){ modal.classList.add("visible"); }, 20);

  // ── Wire: slot clicks ──
  modal.querySelectorAll(".eq-slot").forEach(function(slotEl){
    slotEl.onclick = function(){
      var key = slotEl.getAttribute("data-slot");
      if(equipped[key]){
        showSlotFilledPopup(key);
      } else {
        showSlotItemsPopup(key);
      }
    };
  });

  // Show popup with available items for an empty slot
  function showSlotItemsPopup(key){
    var slotDef = PRE_INV_EQUIP_SLOTS.filter(function(s){ return s.key === key; })[0];
    var item = equip[key];
    if(!slotDef || !item) return;

    var pop = document.createElement("div");
    pop.className = "inv-modal-backdrop eq-slot-popup-backdrop";

    var ph = '<div class="eq-slot-popup">';
    ph += '<div class="eq-slot-popup-title">' + esc(slotDef.label) + '</div>';
    ph += '<div class="eq-slot-popup-items">';
    ph += '<div class="eq-item" data-item-key="' + key + '">'
      + '<div class="eq-item-icon">' + item.icon + '</div>'
      + '<div class="eq-item-info">'
      + '<div class="eq-item-name">' + esc(item.name) + '</div>'
      + '<div class="eq-item-type">' + esc(slotDef.label) + '</div>'
      + '</div>'
      + '<div class="eq-item-actions">'
      + '<button class="eq-btn-equip eq-pop-equip" title="\u00c9quiper">\u2714</button>'
      + '<button class="eq-btn-view eq-pop-view" title="Voir">\uD83D\uDD0D</button>'
      + '</div>'
      + '</div>';
    ph += '</div>';
    ph += '<button class="eq-detail-close eq-pop-cancel">Fermer</button>';
    ph += '</div>';

    pop.innerHTML = ph;
    (screenEl || document.body).appendChild(pop);
    setTimeout(function(){ pop.classList.add("visible"); }, 20);

    function closePop(){
      pop.classList.remove("visible");
      setTimeout(function(){ pop.remove(); }, 300);
    }

    pop.querySelector(".eq-pop-equip").onclick = function(){
      doEquip(key, item);
      closePop();
    };
    pop.querySelector(".eq-pop-view").onclick = function(){
      showItemDetailModal(item, slotDef);
    };
    pop.querySelector(".eq-pop-cancel").onclick = closePop;
    pop.onclick = function(ev){ if(ev.target === pop) closePop(); };
  }

  // Show popup with options for a filled slot
  function showSlotFilledPopup(key){
    var slotDef = PRE_INV_EQUIP_SLOTS.filter(function(s){ return s.key === key; })[0];
    var item = equipped[key];
    if(!slotDef || !item) return;

    var pop = document.createElement("div");
    pop.className = "inv-modal-backdrop eq-slot-popup-backdrop";

    var ph = '<div class="eq-slot-popup">';
    ph += '<div class="eq-slot-popup-title">' + esc(slotDef.label) + ' \u2014 \u00c9quip\u00e9</div>';
    ph += '<div class="eq-slot-popup-equipped">';
    ph += '<div class="eq-item">'
      + '<div class="eq-item-icon">' + item.icon + '</div>'
      + '<div class="eq-item-info">'
      + '<div class="eq-item-name">' + esc(item.name) + '</div>'
      + '<div class="eq-item-type">' + esc(slotDef.label) + '</div>'
      + '</div></div>';
    ph += '</div>';
    ph += '<div class="eq-slot-popup-actions">';
    ph += '<button class="eq-pop-action eq-pop-action-view">\uD83D\uDD0D Voir</button>';
    ph += '<button class="eq-pop-action eq-pop-action-replace">\u21C4 Remplacer</button>';
    ph += '<button class="eq-pop-action eq-pop-action-remove">\u2716 Enlever</button>';
    ph += '</div>';
    ph += '<button class="eq-detail-close eq-pop-cancel">Fermer</button>';
    ph += '</div>';

    pop.innerHTML = ph;
    (screenEl || document.body).appendChild(pop);
    setTimeout(function(){ pop.classList.add("visible"); }, 20);

    function closePop(){
      pop.classList.remove("visible");
      setTimeout(function(){ pop.remove(); }, 300);
    }

    pop.querySelector(".eq-pop-action-view").onclick = function(){
      showItemDetailModal(item, slotDef);
    };
    pop.querySelector(".eq-pop-action-replace").onclick = function(){
      doUnequip(key);
      closePop();
      setTimeout(function(){ showSlotItemsPopup(key); }, 350);
    };
    pop.querySelector(".eq-pop-action-remove").onclick = function(){
      doUnequip(key);
      closePop();
    };
    pop.querySelector(".eq-pop-cancel").onclick = closePop;
    pop.onclick = function(ev){ if(ev.target === pop) closePop(); };
  }

  function doEquip(key, item){
    equipped[key] = item;
    var slotEl = modal.querySelector('.eq-slot[data-slot="' + key + '"]');
    if(slotEl){
      slotEl.classList.add("filled");
      var iconEl = slotEl.querySelector(".eq-slot-icon");
      if(iconEl) iconEl.textContent = item.icon;
    }
  }

  function doUnequip(key){
    delete equipped[key];
    var slotEl = modal.querySelector('.eq-slot[data-slot="' + key + '"]');
    var slotDef = PRE_INV_EQUIP_SLOTS.filter(function(s){ return s.key === key; })[0];
    if(slotEl){
      slotEl.classList.remove("filled");
      var iconEl = slotEl.querySelector(".eq-slot-icon");
      if(iconEl && slotDef) iconEl.textContent = slotDef.icon;
    }
  }

  // Close
  function closeModal(){
    modal.classList.remove("visible");
    setTimeout(function(){ modal.remove(); }, 300);
  }
  document.getElementById("eq-modal-close-btn").onclick = closeModal;
}

/* ══════════ ITEM DETAIL MODAL ══════════ */
function showItemDetailModal(item, slotDef){
  var detail = document.createElement("div");
  detail.className = "inv-modal-backdrop eq-detail-backdrop";

  var h = '<div class="eq-detail-modal">';
  h += '<div class="eq-detail-icon" style="color:' + slotDef.color + '">' + item.icon + '</div>';
  h += '<div class="eq-detail-name">' + esc(item.name) + '</div>';
  h += '<div class="eq-detail-type">' + esc(slotDef.label) + '</div>';
  h += '<div class="eq-detail-desc">' + esc(item.desc) + '</div>';
  h += '<button class="eq-detail-close" id="eq-detail-close-btn">Fermer</button>';
  h += '</div>';

  detail.innerHTML = h;
  var screenEl = document.querySelector(".screen");
  (screenEl || document.body).appendChild(detail);
  setTimeout(function(){ detail.classList.add("visible"); }, 20);

  function closeDetail(){
    detail.classList.remove("visible");
    setTimeout(function(){ detail.remove(); }, 300);
  }
  document.getElementById("eq-detail-close-btn").onclick = closeDetail;
  detail.onclick = function(ev){ if(ev.target === detail) closeDetail(); };
}
