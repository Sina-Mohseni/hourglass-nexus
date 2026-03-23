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
  var misc = SCENARIO_MISC[scenario] || [];

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
    openInventoryModal(misc);
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

/* ══════════ INVENTORY MODAL (consommables, quêtes, divers) ══════════ */
function openInventoryModal(misc){
  var modal = document.createElement("div");
  modal.className = "inv-modal-backdrop";

  var h = '<div class="inv-modal">';
  h += '<button class="inv-modal-close" id="inv-modal-close-btn">\u2715</button>';

  h += '<div class="inv-modal-title">Inventaire</div>';

  h += '<div class="inv-tabs-section">';
  h += '<div class="inv-tabs">';
  h += '<button class="inv-tab active" data-tab="m-consommables">Consommables</button>';
  h += '<button class="inv-tab" data-tab="m-quetes">Qu\u00eates</button>';
  h += '<button class="inv-tab" data-tab="m-divers">Divers</button>';
  h += '</div>';

  // Consumables
  h += '<div class="inv-tab-content active" id="inv-tc-m-consommables">';
  h += '<div class="inv-items-grid">';
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
    h += '<button class="eq-btn-equip inv-btn-use" data-inv-type="misc" data-inv-i="' + m + '" title="Utiliser">\u25B6</button>';
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
      var item, slotDef;
      if(type === "conso"){
        item = {name: CONSUMABLE_ITEM.name, desc: CONSUMABLE_ITEM.desc, icon: "\uD83D\uDC8A"};
        slotDef = {label: "Consommable", color: "#228844"};
      } else {
        item = misc[idx];
        if(!item) return;
        item = {name: item.name, desc: item.desc, icon: "\uD83D\uDCC4"};
        slotDef = {label: "Document", color: "#a8842a"};
      }
      showItemDetailModal(item, slotDef);
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

  function closeModal(){
    modal.classList.remove("visible");
    setTimeout(function(){ modal.remove(); }, 300);
  }
  document.getElementById("inv-modal-close-btn").onclick = closeModal;
  modal.onclick = function(ev){ if(ev.target === modal) closeModal(); };
}

/* ══════════ EQUIPMENT MODAL (portrait + 6 drawers + drag & drop) ══════════ */
function openEquipmentModal(u, scenario, equip){
  var equipped = {}; // { slotKey: true }

  var modal = document.createElement("div");
  modal.className = "inv-modal-backdrop";

  var h = '<div class="inv-modal">';
  h += '<button class="inv-modal-close" id="eq-modal-close-btn">\u2715</button>';

  // ── Portrait with 6 transparent overlay slots (2x3 grid) ──
  h += '<div class="eq-portrait-zone">';
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
  h += '</div>'; // eq-slots-grid
  h += '<div class="eq-portrait-name">' + esc(u.name || "Voyageur") + '</div>';
  h += '</div>'; // eq-portrait-zone

  // ── 6 drawers, one per equipment type ──
  h += '<div class="eq-drawers">';
  for(var d = 0; d < PRE_INV_EQUIP_SLOTS.length; d++){
    var slot = PRE_INV_EQUIP_SLOTS[d];
    var item = equip[slot.key];
    if(!item) continue;

    h += '<div class="eq-drawer" data-drawer="' + slot.key + '">';
    // Drawer header (click to toggle)
    h += '<button class="eq-drawer-header" data-drawer-key="' + slot.key + '">'
      + '<span class="eq-drawer-icon" style="color:' + slot.color + '">' + slot.icon + '</span>'
      + '<span class="eq-drawer-title">' + esc(slot.label) + '</span>'
      + '<span class="eq-drawer-arrow">\u25BE</span>'
      + '</button>';
    // Drawer content (items of this type)
    h += '<div class="eq-drawer-content" id="eq-dc-' + slot.key + '">';
    h += '<div class="eq-item" data-item-key="' + slot.key + '">'
      + '<div class="eq-item-icon" data-icon="' + item.icon + '">' + item.icon + '</div>'
      + '<div class="eq-item-info">'
      + '<div class="eq-item-name">' + esc(item.name) + '</div>'
      + '<div class="eq-item-type">' + esc(slot.label) + '</div>'
      + '</div>'
      + '<div class="eq-item-actions">'
      + '<button class="eq-btn-equip" data-key="' + slot.key + '" title="\u00c9quiper">\u2714</button>'
      + '<button class="eq-btn-view" data-key="' + slot.key + '" title="Voir">\uD83D\uDD0D</button>'
      + '</div>'
      + '</div>';
    h += '</div>'; // eq-drawer-content
    h += '</div>'; // eq-drawer
  }
  h += '</div>'; // eq-drawers

  h += '</div>'; // inv-modal
  modal.innerHTML = h;

  var screenEl = document.querySelector(".screen");
  (screenEl || document.body).appendChild(modal);
  setTimeout(function(){ modal.classList.add("visible"); }, 20);

  // ── Wire: drawer toggles ──
  modal.querySelectorAll(".eq-drawer-header").forEach(function(hdr){
    hdr.onclick = function(){
      var drawer = hdr.closest(".eq-drawer");
      drawer.classList.toggle("open");
    };
  });

  // ── Wire: equip buttons (click) ──
  modal.querySelectorAll(".eq-btn-equip").forEach(function(btn){
    btn.onclick = function(ev){
      ev.stopPropagation();
      var key = btn.getAttribute("data-key");
      doEquip(key);
    };
  });

  // ── Wire: view buttons (click) ──
  modal.querySelectorAll(".eq-btn-view").forEach(function(btn){
    btn.onclick = function(ev){
      ev.stopPropagation();
      var key = btn.getAttribute("data-key");
      var item = equip[key];
      var slotDef = PRE_INV_EQUIP_SLOTS.filter(function(s){ return s.key === key; })[0];
      if(item && slotDef) showItemDetailModal(item, slotDef);
    };
  });

  function doEquip(key){
    if(equipped[key]) return;
    equipped[key] = true;
    // Fill the slot
    var slotEl = modal.querySelector('.eq-slot[data-slot="' + key + '"]');
    if(slotEl){
      slotEl.classList.add("filled");
      var slotDef = PRE_INV_EQUIP_SLOTS.filter(function(s){ return s.key === key; })[0];
      var item = equip[key];
      if(item){
        var iconEl = slotEl.querySelector(".eq-slot-icon");
        if(iconEl) iconEl.textContent = item.icon;
      }
    }
    // Gray out the item in the drawer
    var itemEl = modal.querySelector('.eq-item[data-item-key="' + key + '"]');
    if(itemEl) itemEl.classList.add("eq-item-equipped");
  }

  // Close
  function closeModal(){
    modal.classList.remove("visible");
    setTimeout(function(){ modal.remove(); }, 300);
  }
  document.getElementById("eq-modal-close-btn").onclick = closeModal;
  modal.onclick = function(ev){ if(ev.target === modal) closeModal(); };
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
