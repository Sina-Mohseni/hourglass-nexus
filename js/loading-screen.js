"use strict";

/* ══════════ LOADING SCREEN — Tournament Preparation ══════════
   Displayed for ~6 seconds while selecting 39 personas from 324.
   Cinematic loading with progress, flavor text, and particle FX.
   ═════════════════════════════════════════════════════════════ */

var LOADING_FLAVOR_TEXTS = [
  "Connexion aux Routes Sillonnées…",
  "Synchronisation des portails dimensionnels…",
  "Vérification des candidats inscrits…",
  "Cartographie des zones de repos…",
  "Analyse des profils de combat…",
  "Calibration des champs de téléportation…",
  "Sélection aléatoire des zones d'assignation…",
  "Chargement des protocoles du Tournoi…",
  "Activation des balises de suivi Morkar…",
  "Finalisation des contingents planétaires…"
];

/* ── Fisher-Yates shuffle ── */
function _lsShuffle(arr){
  var a = arr.slice();
  for(var i = a.length - 1; i > 0; i--){
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

/* ══════════ PERSONA SELECTION ALGORITHM ══════════
   Tournament composition (40 total = 39 NPCs + player):
   - 1 Vétéran Morkar
   - 3 Recrues Morkar (apprenti-morkar)
   - 5 Dissidents (répartis aléatoirement entre groupes champion/isolé)
   - ~26 Champions (moins les dissidents déguisés en champions)
   - ~10 Isolés (moins les dissidents déguisés en isolés)
   Player occupies one slot in their own category.
   ═══════════════════════════════════════════════ */

function selectTournamentParticipants(){
  var playerScenario = window._chosenScenario || "lambda";
  var allPersonas = getNonGuidePersonas();

  /* Categorize all personas by scenario field */
  var pools = {
    champion:         _lsShuffle(allPersonas.filter(function(p){ return p.scenario === "champion" })),
    lambda:           _lsShuffle(allPersonas.filter(function(p){ return p.scenario === "lambda" })),
    dissident:        _lsShuffle(allPersonas.filter(function(p){ return p.scenario === "dissident" })),
    "apprenti-morkar":_lsShuffle(allPersonas.filter(function(p){ return p.scenario === "apprenti-morkar" })),
    "veteran-morkar": _lsShuffle(allPersonas.filter(function(p){ return p.scenario === "veteran-morkar" }))
  };

  /* Random split: 5 dissidents among champion & isolé groups */
  var dissInChampions = Math.floor(Math.random() * 6); // 0–5
  var dissInIsoles = 5 - dissInChampions;

  /* Base needs */
  var needVeterans  = 1;
  var needRecrues   = 3;
  var needDissidents = 5;
  var needChampions = 26 - dissInChampions;
  var needIsoles    = 10 - dissInIsoles;

  /* Player takes one slot from their own category */
  if(playerScenario === "champion")        needChampions--;
  else if(playerScenario === "lambda")     needIsoles--;
  else if(playerScenario === "rebelle")    needDissidents--;
  else if(playerScenario === "apprenti-morkar") needRecrues--;
  else if(playerScenario === "veteran-morkar")  needVeterans--;

  /* Ensure non-negative */
  needVeterans   = Math.max(0, needVeterans);
  needRecrues    = Math.max(0, needRecrues);
  needDissidents = Math.max(0, needDissidents);
  needChampions  = Math.max(0, needChampions);
  needIsoles     = Math.max(0, needIsoles);

  /* Pick from each pool */
  var selected = [];
  selected = selected.concat(pools["veteran-morkar"].slice(0, needVeterans));
  selected = selected.concat(pools["apprenti-morkar"].slice(0, needRecrues));
  selected = selected.concat(pools["dissident"].slice(0, needDissidents));
  selected = selected.concat(pools["champion"].slice(0, needChampions));
  selected = selected.concat(pools["lambda"].slice(0, needIsoles));

  /* Fill any shortfall from the largest pool (champions) */
  if(selected.length < 39){
    var usedIds = {};
    selected.forEach(function(p){ usedIds[p.id] = true });
    var remaining = _lsShuffle(allPersonas.filter(function(p){ return !usedIds[p.id] }));
    while(selected.length < 39 && remaining.length > 0){
      selected.push(remaining.pop());
    }
  }

  /* Trim to exactly 39 */
  selected = selected.slice(0, 39);

  /* Store participant metadata */
  selected.forEach(function(p){
    /* Dissidents get a cover assignment */
    if(p.scenario === "dissident"){
      p._coverGroup = Math.random() < 0.5 ? "champion" : "isolé";
    }
  });

  return _lsShuffle(selected);
}

/* ══════════ LOADING SCREEN OVERLAY ══════════ */
function showLoadingScreen(onComplete){
  var overlay = document.createElement("div");
  overlay.id = "loading-screen";
  overlay.className = "ls-overlay";

  overlay.innerHTML =
    '<div class="ls-particles" id="ls-particles"></div>'
    + '<div class="ls-content">'
    +   '<div class="ls-hourglass-wrap">'
    +     '<div class="ls-hourglass">\u29D6</div>'
    +     '<div class="ls-hourglass-ring"></div>'
    +   '</div>'
    +   '<div class="ls-title">TOURNOI D\u2019EXTELUA</div>'
    +   '<div class="ls-subtitle">Pr\u00e9paration du Cycle 47</div>'
    +   '<div class="ls-progress-wrap">'
    +     '<div class="ls-progress-bar" id="ls-progress-bar"></div>'
    +   '</div>'
    +   '<div class="ls-flavor" id="ls-flavor"></div>'
    +   '<div class="ls-count" id="ls-count">Candidats s\u00e9lectionn\u00e9s : 0 / 39</div>'
    + '</div>';

  var screen = document.querySelector(".screen");
  (screen || document.body).appendChild(overlay);

  /* Particles */
  var particlesEl = overlay.querySelector("#ls-particles");
  for(var i = 0; i < 30; i++){
    var dot = document.createElement("div");
    dot.className = "ls-particle";
    dot.style.left = (Math.random() * 100) + "%";
    dot.style.animationDelay = (Math.random() * 5) + "s";
    dot.style.animationDuration = (3 + Math.random() * 4) + "s";
    particlesEl.appendChild(dot);
  }

  requestAnimationFrame(function(){ overlay.classList.add("visible") });

  /* Run selection algorithm immediately */
  var participants = selectTournamentParticipants();
  window._tournamentParticipants = participants;

  /* Animate progress over 6 seconds */
  var progressBar = overlay.querySelector("#ls-progress-bar");
  var flavorEl    = overlay.querySelector("#ls-flavor");
  var countEl     = overlay.querySelector("#ls-count");
  var duration    = 6000;
  var startTime   = Date.now();
  var flavorIdx   = 0;

  /* Cycle flavor text */
  if(flavorEl) flavorEl.textContent = LOADING_FLAVOR_TEXTS[0];
  var flavorInterval = setInterval(function(){
    flavorIdx = (flavorIdx + 1) % LOADING_FLAVOR_TEXTS.length;
    if(flavorEl){
      flavorEl.style.opacity = "0";
      setTimeout(function(){
        flavorEl.textContent = LOADING_FLAVOR_TEXTS[flavorIdx];
        flavorEl.style.opacity = "1";
      }, 200);
    }
  }, 800);

  /* Progress animation */
  var progressInterval = setInterval(function(){
    var elapsed = Date.now() - startTime;
    var progress = Math.min(elapsed / duration, 1);

    if(progressBar) progressBar.style.width = (progress * 100) + "%";

    var count = Math.min(Math.floor(progress * 42), 39); // slightly overshoot then clamp
    if(countEl) countEl.textContent = "Candidats s\u00e9lectionn\u00e9s : " + count + " / 39";

    if(progress >= 1){
      clearInterval(progressInterval);
      clearInterval(flavorInterval);
      if(countEl) countEl.textContent = "Candidats s\u00e9lectionn\u00e9s : 39 / 39";
      if(flavorEl){
        flavorEl.style.opacity = "0";
        setTimeout(function(){
          flavorEl.textContent = "T\u00e9l\u00e9portation en cours\u2026";
          flavorEl.style.opacity = "1";
        }, 200);
      }

      /* Transition out */
      setTimeout(function(){
        overlay.classList.add("ls-fading");
        setTimeout(function(){
          overlay.remove();
          if(onComplete) onComplete();
        }, 800);
      }, 700);
    }
  }, 50);
}
