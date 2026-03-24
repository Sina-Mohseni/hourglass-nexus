"use strict";

/* ══════════ LOADING SCREEN — Sélection des 40 candidats ══════════
   Affiche un écran de chargement de ~6 secondes pendant lequel
   39 personas sont tirés au sort parmi les 324 selon le scénario
   du joueur, puis lance la séquence de nuit.
   ═══════════════════════════════════════════════════════════════ */

/* ── Distribution des 39 personas (joueur = le 40e) ──
   1  vétéran-morkar
   3  recrues (apprenti-morkar)
   5  dissidents  — répartis aléatoirement entre les 2 groupes
   10 isolés max  — moins les dissidents qui y sont placés
   26 champions max — moins les dissidents qui y sont placés
   Total = 1 + 3 + 5 + (isolés) + (champions) = 39
   ════════════════════════════════════════════════════════════ */

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

/**
 * Sélectionne 39 personas au hasard selon la distribution requise.
 * @param {string} playerScenario — scénario du joueur (champion, lambda, rebelle, apprenti-morkar, veteran-morkar)
 * @returns {Array} — tableau de 39 objets persona
 */
function selectTournamentParticipants(playerScenario){
  var allPersonas = getNonGuidePersonas();

  // Pools par scénario
  var pools = {
    "veteran-morkar": [],
    "apprenti-morkar": [],
    "dissident": [],
    "lambda": [],
    "champion": []
  };

  allPersonas.forEach(function(p){
    // Map "rebelle" → "dissident" si nécessaire
    var sc = p.scenario === "rebelle" ? "dissident" : p.scenario;
    if(pools[sc]) pools[sc].push(p);
  });

  // Shuffle helper
  function shuffle(arr){
    var a = arr.slice();
    for(var i = a.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function pickN(pool, n){
    var shuffled = shuffle(pool);
    return shuffled.slice(0, Math.min(n, shuffled.length));
  }

  // Quotas fixes
  var veterans = pickN(pools["veteran-morkar"], 1);
  var recrues  = pickN(pools["apprenti-morkar"], 3);
  var dissidents = pickN(pools["dissident"], 5);

  // Les 5 dissidents sont répartis aléatoirement entre champions et isolés
  // (ils s'infiltrent dans ces groupes)
  var dissidentsAsChampions = [];
  var dissidentsAsIsolés = [];
  shuffle(dissidents).forEach(function(d){
    if(Math.random() < 0.5) dissidentsAsChampions.push(d);
    else dissidentsAsIsolés.push(d);
  });

  // Slots restants : 39 - 1(vet) - 3(rec) - 5(diss) = 30
  // isolés max = 10 - nombre de dissidents placés en isolés
  // champions max = 26 - nombre de dissidents placés en champions
  // Mais on a besoin de 30 au total entre isolés purs et champions purs
  var slotsRemaining = 30;
  var maxIsolePure = 10 - dissidentsAsIsolés.length;
  var maxChampionPure = 26 - dissidentsAsChampions.length;

  // S'assurer que les quotas sont cohérents
  if(maxIsolePure < 0) maxIsolePure = 0;
  if(maxChampionPure < 0) maxChampionPure = 0;

  // Ajuster pour que isolePure + championPure = 30
  var isolePure = Math.min(maxIsolePure, slotsRemaining);
  var championPure = slotsRemaining - isolePure;
  if(championPure > maxChampionPure){
    championPure = maxChampionPure;
    isolePure = slotsRemaining - championPure;
  }

  // Exclure les déjà choisis
  var usedIds = {};
  veterans.concat(recrues, dissidents).forEach(function(p){ usedIds[p.id] = true });

  var availIso = pools["lambda"].filter(function(p){ return !usedIds[p.id] });
  var availChamp = pools["champion"].filter(function(p){ return !usedIds[p.id] });

  var isolés = pickN(availIso, isolePure);
  var champions = pickN(availChamp, championPure);

  // Résultat final : 39 personas
  var selected = [].concat(veterans, recrues, dissidents, isolés, champions);

  // Si on n'a pas assez (pool trop petit), compléter avec ce qui reste
  if(selected.length < 39){
    var allUsed = {};
    selected.forEach(function(p){ allUsed[p.id] = true });
    var remaining = allPersonas.filter(function(p){ return !allUsed[p.id] });
    var extra = pickN(remaining, 39 - selected.length);
    selected = selected.concat(extra);
  }

  return shuffle(selected).slice(0, 39);
}

/**
 * Affiche l'écran de chargement, sélectionne les 39 participants,
 * puis appelle onDone(selectedPersonas) quand c'est terminé.
 */
function showLoadingScreen(playerScenario, onDone){
  var overlay = document.createElement("div");
  overlay.className = "loading-overlay";
  overlay.id = "loading-overlay";

  overlay.innerHTML =
    '<div class="loading-stars"></div>'
    + '<div class="loading-content">'
    +   '<div class="loading-hourglass">\u29D6</div>'
    +   '<div class="loading-title">Préparation du Tournoi</div>'
    +   '<div class="loading-subtitle">Sélection des 40 candidats pour le Cycle 47…</div>'
    +   '<div class="loading-bar-wrap"><div class="loading-bar-fill" id="loading-bar-fill"></div></div>'
    +   '<div class="loading-counter"><span class="loading-counter-num" id="loading-count">0</span> / 40</div>'
    +   '<div class="loading-slots" id="loading-slots"></div>'
    +   '<div class="loading-flavor" id="loading-flavor"></div>'
    + '</div>';

  var screen = document.querySelector(".screen");
  (screen || document.body).appendChild(overlay);

  // Create 40 slot indicators
  var slotsEl = overlay.querySelector("#loading-slots");
  for(var i = 0; i < 40; i++){
    var dot = document.createElement("div");
    dot.className = "loading-slot";
    if(i === 0) dot.classList.add("is-player");
    slotsEl.appendChild(dot);
  }
  var dots = slotsEl.querySelectorAll(".loading-slot");

  var barFill = overlay.querySelector("#loading-bar-fill");
  var countEl = overlay.querySelector("#loading-count");
  var flavorEl = overlay.querySelector("#loading-flavor");

  // Fade in
  requestAnimationFrame(function(){
    overlay.classList.add("visible");
  });

  // Select personas immediately (fast computation)
  var selected = selectTournamentParticipants(playerScenario);

  // Store globally for night dialogue
  window._tournamentParticipants = selected;

  // Animate the counter over ~6 seconds
  var totalDuration = 6000; // ms
  var count = 0;
  var totalSlots = 40; // 39 personas + 1 player
  var interval = totalDuration / totalSlots;

  // Show player slot immediately
  setTimeout(function(){
    dots[0].classList.add("filled");
    count = 1;
    countEl.textContent = "1";
    barFill.style.width = (1 / totalSlots * 100) + "%";
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
  var slotIdx = 1; // slot 0 = player, already filled
  var slotTimer = setInterval(function(){
    if(slotIdx >= totalSlots){
      clearInterval(slotTimer);
      clearInterval(flavorTimer);

      // All done — brief pause then transition
      setTimeout(function(){
        flavorEl.classList.remove("visible");
        setTimeout(function(){
          flavorEl.textContent = "Tous les candidats sont prêts.";
          flavorEl.classList.add("visible");
        }, 200);

        // Fade out after a beat
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

    // Fill next dot with slight randomness in timing
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
    barFill.style.width = (count / totalSlots * 100) + "%";
  }, interval);
}
