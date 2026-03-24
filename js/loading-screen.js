"use strict";

/* ══════════ LOADING SCREEN — Génération des 40 candidats ══════════
   Génère dynamiquement 39 personas (joueur = le 40e) à partir des
   pools de quotidiens, univers et races définis dans tournament.json.
   Chaque persona reçoit un rôle scénario, un univers unique, un nom,
   une race aléatoire, un quotidien et une variante de stats.
   ═══════════════════════════════════════════════════════════════════ */

/* ── Distribution des 39 personas (joueur = le 40e) ──
   1  vétéran-morkar
   3  recrues (apprenti-morkar)
   5  dissidents (rebelle) — répartis entre champions et isolés
   10 isolés (lambda)  — moins dissidents placés ici
   26 champions        — moins dissidents placés ici
   Total = 1 + 3 + 5 + isolés + champions = 39
   ════════════════════════════════════════════════════ */

var LOADING_FLAVOR_TEXTS = [
  "Les Routes Sillonnées s'activent…",
  "Les candidats convergent vers Extelua…",
  "Le groupe Morkar finalise la sélection…",
  "Les mondes connectés envoient leurs champions…",
  "Les planètes isolées livrent leurs secrets…",
  "Les éclaireurs confirment les identités…",
  "Le Tournoi prend forme dans l'ombre…",
  "Les téléportations s'enchaînent…"
];

/* ── Palette de couleurs par classe de quotidien ── */
var CLASS_COLORS = {
  "Combattant":  "#e74c3c",
  "Arcaniste":   "#9b59b6",
  "Artisan":     "#e8a838",
  "Social":      "#3498db",
  "Ombre":       "#64748b",
  "Soigneur":    "#27ae60",
  "Survivant":   "#8b6914",
  "Artiste":     "#e91e8b",
  "Érudit":      "#5dade2",
  "Labeur":      "#8b4513",
  "Marchand":    "#d4aa42",
  "Singulier":   "#06b6d4"
};

/* ── Shuffle helper ── */
function _lsShuffle(arr){
  var a = arr.slice();
  for(var i = a.length - 1; i > 0; i--){
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

/**
 * Génère 39 personas dynamiques à partir des pools de données.
 * @param {string} playerScenario — scénario du joueur
 * @returns {Array} — tableau de 39 objets persona
 */
function selectTournamentParticipants(playerScenario){
  var quotidiens = getTournamentQuotidiens();
  var univers = getTournamentUnivers();
  var races = getTournamentRaces();

  if(quotidiens.length === 0 || univers.length === 0 || races.length === 0){
    console.warn("Tournament data not loaded, cannot generate participants");
    return [];
  }

  // ── 1. Distribuer les 39 rôles scénario ──
  var roles = [];
  // Exclure le rôle du joueur des quotas obligatoires
  var playerSc = playerScenario || "lambda";

  // Quotas : 1 vétéran, 3 recrues, 5 dissidents, ~10 isolés, ~20 champions
  if(playerSc !== "veteran-morkar") roles.push("veteran-morkar");
  var recrueCount = playerSc === "apprenti-morkar" ? 3 : 3;
  for(var i = 0; i < recrueCount; i++) roles.push("apprenti-morkar");
  var dissCount = playerSc === "rebelle" ? 5 : 5;
  for(var i = 0; i < dissCount; i++) roles.push("rebelle");

  // Remplir le reste avec champions et isolés
  var remaining = 39 - roles.length;
  var isoleCount = Math.min(10, remaining);
  if(playerSc === "lambda") isoleCount = Math.min(9, remaining);
  var champCount = remaining - isoleCount;

  for(var i = 0; i < isoleCount; i++) roles.push("lambda");
  for(var i = 0; i < champCount; i++) roles.push("champion");

  // S'assurer qu'on a exactement 39
  while(roles.length < 39) roles.push("champion");
  roles = _lsShuffle(roles).slice(0, 39);

  // ── 2. Assigner les 39 univers (1 univers = 1 persona, pas de doublon) ──
  // Le joueur prend 1 des 40 univers, les 39 autres vont aux NPCs
  var shuffledUnivers = _lsShuffle(univers).slice(0, 39);

  // ── 3. Assigner les races (peuvent se répéter) ──
  // Mélanger et piocher avec remise
  var racePool = races.slice();

  // ── 4. Assigner les quotidiens (peuvent se répéter, mais variantes différentes si même quotidien) ──
  // Mélanger et distribuer — un même quotidien peut revenir, mais avec une variante différente
  var shuffledQuotidiens = _lsShuffle(quotidiens);
  var quotidienUsedVariants = {}; // track used variants per quotidien id

  // ── 5. Générer les 39 personas ──
  var generated = [];

  for(var i = 0; i < 39; i++){
    var role = roles[i];
    var uni = shuffledUnivers[i];
    var race = racePool[Math.floor(Math.random() * racePool.length)];

    // Quotidien : distribuer cycliquement
    var quot = shuffledQuotidiens[i % shuffledQuotidiens.length];

    // Choisir une variante non utilisée pour ce quotidien
    if(!quotidienUsedVariants[quot.id]) quotidienUsedVariants[quot.id] = [];
    var usedV = quotidienUsedVariants[quot.id];
    var availableVariants = [];
    for(var v = 0; v < quot.variants.length; v++){
      if(usedV.indexOf(v) === -1) availableVariants.push(v);
    }
    if(availableVariants.length === 0) availableVariants = [0, 1, 2, 3, 4]; // reset if all used
    var variantIdx = availableVariants[Math.floor(Math.random() * availableVariants.length)];
    usedV.push(variantIdx);
    var stats = quot.variants[variantIdx];

    // Choisir un nom aléatoire parmi les 5 de cet univers
    var name = uni.noms[Math.floor(Math.random() * uni.noms.length)];

    // Générer un ID unique
    var personaId = "tp_" + i + "_" + quot.id;

    // Titre basé sur le quotidien
    var title = quot.name;

    // Couleur basée sur la classe
    var color = CLASS_COLORS[quot.classe] || "#c9a04a";

    var persona = {
      id: personaId,
      name: name,
      role: "Persona",
      title: title,
      avatar: "",
      color: color,
      difficulty: "—",
      element: quot.classe,
      bio: "",
      traits: [],
      stats: {
        CRE: stats.CRE,
        SAG: stats.SAG,
        CHA: stats.CHA,
        FOR: stats.FOR,
        AGI: stats.AGI,
        PER: stats.PER
      },
      affinities: {},
      quote: "",
      job: quot.id,
      scenario: role,
      race: race,
      monde: uni.name,
      profil: quot.classe,
      niveau: 1,
      sablons: 100,
      inventaire: 6,
      affinite_joueur: 0,
      affinites_dynamiques: {},
      background: null,
      // Extra tournament fields
      quotidien: quot.name,
      quotidienClasse: quot.classe,
      quotidienEpoque: quot.epoque,
      variantIndex: variantIdx
    };

    generated.push(persona);
  }

  return generated;
}

/**
 * Affiche l'écran de chargement, génère les 39 participants,
 * puis appelle onDone(selectedPersonas) quand c'est terminé.
 */
function showLoadingScreen(playerScenario, onDone){
  var overlay = document.createElement("div");
  overlay.className = "loading-overlay";
  overlay.id = "loading-overlay";

  // SVG arc circumference for a radius of ~110px
  var ARC_RADIUS = 110;
  var ARC_CIRCUMFERENCE = 2 * Math.PI * ARC_RADIUS; // ~691

  overlay.innerHTML =
    '<div class="loading-stars"></div>'
    + '<div class="loading-content">'
    +   '<div class="loading-arena">'
    +     '<div class="loading-ring-outer"></div>'
    +     '<div class="loading-ring-inner"></div>'
    +     '<svg class="loading-arc-svg" viewBox="0 0 228 228">'
    +       '<circle class="loading-arc-track" cx="114" cy="114" r="'+ARC_RADIUS+'"/>'
    +       '<circle class="loading-arc-fill" id="loading-arc" cx="114" cy="114" r="'+ARC_RADIUS+'" stroke-dasharray="'+ARC_CIRCUMFERENCE+'" stroke-dashoffset="'+ARC_CIRCUMFERENCE+'"/>'
    +     '</svg>'
    +     '<div class="loading-center-glow"></div>'
    +     '<div class="loading-hourglass">\u29D6</div>'
    +     '<div class="loading-counter"><span class="loading-counter-num" id="loading-count">0</span> / 40</div>'
    +     '<div class="loading-slots" id="loading-slots"></div>'
    +   '</div>'
    +   '<div class="loading-title">Pr\u00e9paration du Tournoi</div>'
    +   '<div class="loading-subtitle">S\u00e9lection des 40 candidats pour le Cycle 47\u2026</div>'
    +   '<div class="loading-flavor" id="loading-flavor"></div>'
    + '</div>';

  var screen = document.querySelector(".screen");
  (screen || document.body).appendChild(overlay);

  // Create 40 slot indicators placed in a circle
  var slotsEl = overlay.querySelector("#loading-slots");
  var arenaSize = 240;
  var orbitRadius = 102;
  for(var i = 0; i < 40; i++){
    var angle = (i / 40) * 2 * Math.PI - Math.PI / 2;
    var cx = arenaSize / 2 + Math.cos(angle) * orbitRadius;
    var cy = arenaSize / 2 + Math.sin(angle) * orbitRadius;
    var dot = document.createElement("div");
    dot.className = "loading-slot";
    var dotSize = (i === 0) ? 14 : 10;
    dot.style.left = (cx - dotSize / 2) + "px";
    dot.style.top = (cy - dotSize / 2) + "px";
    if(i === 0) dot.classList.add("is-player");
    slotsEl.appendChild(dot);
  }
  var dots = slotsEl.querySelectorAll(".loading-slot");

  var arcEl = overlay.querySelector("#loading-arc");
  var countEl = overlay.querySelector("#loading-count");
  var flavorEl = overlay.querySelector("#loading-flavor");

  // Fade in
  requestAnimationFrame(function(){
    overlay.classList.add("visible");
  });

  // Generate personas immediately
  var selected = selectTournamentParticipants(playerScenario);

  // Store globally for night dialogue and rest of game
  window._tournamentParticipants = selected;

  // Animate the counter over ~6 seconds
  var totalDuration = 6000;
  var count = 0;
  var totalSlots = 40;
  var interval = totalDuration / totalSlots;

  // Show player slot immediately
  setTimeout(function(){
    dots[0].classList.add("filled");
    count = 1;
    countEl.textContent = "1";
    arcEl.style.strokeDashoffset = ARC_CIRCUMFERENCE * (1 - 1 / totalSlots);
  }, 300);

  // Flavor text rotation
  var flavorIdx = 0;
  var shuffledFlavors = LOADING_FLAVOR_TEXTS.sort(function(){ return Math.random() - 0.5 });
  function showNextFlavor(){
    flavorEl.classList.remove("visible");
    setTimeout(function(){
      flavorEl.textContent = shuffledFlavors[flavorIdx % shuffledFlavors.length];
      flavorEl.classList.add("visible");
      flavorIdx++;
    }, 300);
  }
  showNextFlavor();
  var flavorTimer = setInterval(showNextFlavor, 2000);

  // Animate persona slots one by one
  var slotIdx = 1;
  var slotTimer = setInterval(function(){
    if(slotIdx >= totalSlots){
      clearInterval(slotTimer);
      clearInterval(flavorTimer);

      setTimeout(function(){
        flavorEl.classList.remove("visible");
        setTimeout(function(){
          flavorEl.textContent = "Tous les candidats sont pr\u00eats.";
          flavorEl.classList.add("visible");
        }, 200);

        setTimeout(function(){
          overlay.classList.add("fading-out");
          setTimeout(function(){
            overlay.remove();
            if(onDone) onDone(selected);
          }, 900);
        }, 1200);
      }, 400);
      return;
    }

    var dot = dots[slotIdx];
    if(dot){
      var persona = selected[slotIdx - 1];
      if(persona && persona.color){
        dot.style.background = persona.color;
        dot.style.borderColor = persona.color;
      } else {
        dot.style.background = "rgba(212,170,68,.5)";
      }
      dot.classList.add("filled");
    }

    slotIdx++;
    count = slotIdx;
    countEl.textContent = count;
    arcEl.style.strokeDashoffset = ARC_CIRCUMFERENCE * (1 - count / totalSlots);
  }, interval);
}
