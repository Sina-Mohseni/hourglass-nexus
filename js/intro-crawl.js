"use strict";

/* ══════════ INTRO NARRATION + SCENARIO CHOICE ══════════ */

var IC_PARAGRAPHS = [
  {text: "LE TOURNOI D'EXTELUA", cls: "ic-title"},
  {text: "Extelua. Un univers de milliards d'étoiles reliées par les Routes Sillonnées — d'immenses corridors de voyage supraluminique qui connectent les civilisations les plus avancées entre elles."},
  {text: "Mais toutes les planètes ne sont pas connectées. Des centaines de mondes isolés, coupés des réseaux universels, vivent sans jamais savoir ce qui se passe au-delà de leur ciel."},
  {text: "Tous les deux cycles solaires, le groupe Morkar — la plus grande organisation médiatique et diplomatique d'Extelua — organise un événement retransmis dans tout l'univers connecté : le Tournoi d'Extelua."},
  {text: "Quarante participants sont sélectionnés. Trente sont les champions officiels des planètes connectées — des figures publiques, des athlètes, des scientifiques, des célébrités déjà connues à travers les réseaux."},
  {text: "Les dix autres viennent des planètes isolées. Des inconnus. Des gens ordinaires arrachés à leur quotidien par une invitation qu'ils ne comprennent pas toujours. Morkar appelle cela « la main tendue aux oubliés »."},
  {text: "Pendant quinze lunes — une année complète d'Extelua — les quarante candidats traversent des mondes, affrontent des épreuves physiques et mentales, forgent des alliances et se trahissent."},
  {text: "Le tournoi est diffusé en direct sur tous les écrans de l'univers connecté. C'est le plus grand spectacle jamais créé. Des milliards de spectateurs suivent chaque élimination, chaque victoire, chaque drame."},
  {text: "Morkar présente le tournoi comme un symbole d'unité et de justice — une chance égale offerte à tous les peuples, connectés ou non, de prouver leur valeur et de changer leur destin."},
  {text: "La récompense promise au vainqueur est légendaire : la citoyenneté universelle pour toute sa planète d'origine, l'accès aux Routes Sillonnées, et une place au Conseil des Mondes."},
  {text: "Cette année, le sablier se retourne à nouveau. Les invitations ont été envoyées. Les caméras sont prêtes. L'univers entier retient son souffle."},
  {text: "Et toi… tu as reçu l'appel.", cls: "ic-final"},
  {text: "", cls: "ic-choices"}
];

var _icMuted = false;

function showIntroCrawl(onDone){
  var overlay = document.getElementById("intro-crawl");
  if(!overlay){ onDone(); return; }
  overlay.style.display = "";

  // Start background video
  var video = document.getElementById("ic-bg-video");
  if(video){ video.currentTime = 0; video.play().catch(function(){}); }

  var audio = document.getElementById("ic-music");
  var nextBtn = document.getElementById("ic-next-btn");
  var skipBtn = document.getElementById("ic-skip-btn");
  var volBtn = document.getElementById("ic-volume-btn");
  var volOn = document.getElementById("ic-vol-on");
  var volOff = document.getElementById("ic-vol-off");
  var textZone = document.getElementById("ic-text-zone");

  var paraIdx = 0;
  var transitioning = false;

  // Start music with fade-in (crossfade from any playing menu music)
  if(audio){
    audio.currentTime = 0;
    _icMuted = false;
    var bgMusic = document.getElementById("bg-music");
    if(bgMusic && !bgMusic.paused){
      audioCrossfade(bgMusic, audio, 0.5, 1200, 0.4);
    } else {
      audio.volume = 0;
      audio.play().catch(function(){});
      audioFade(audio, 0.5, 1000);
    }
  }

  // Volume toggle
  if(volBtn) volBtn.onclick = function(){
    _icMuted = !_icMuted;
    if(audio) audio.muted = _icMuted;
    if(volOn) volOn.style.display = _icMuted ? "none" : "";
    if(volOff) volOff.style.display = _icMuted ? "" : "none";
  };

  // Show a paragraph
  function showParagraph(idx){
    if(!textZone) return;
    var data = IC_PARAGRAPHS[idx];
    textZone.innerHTML = "";

    // Special choices screen at the end
    if(data.cls === "ic-choices"){
      var wrap = document.createElement("div");
      wrap.className = "ic-paragraph ic-choices-zone";
      wrap.innerHTML =
        '<div class="ic-choices-label">Informations facultatives</div>' +
        '<button class="ic-info-btn" id="ic-btn-morkar">' +
          '<span class="ic-info-icon">\u25B6</span>' +
          '<span class="ic-info-text">Présentation officielle Morkar</span>' +
          '<span class="ic-info-sub">Retransmission universelle</span>' +
        '</button>' +
        '<button class="ic-info-btn" id="ic-btn-journal">' +
          '<span class="ic-info-icon">\u2756</span>' +
          '<span class="ic-info-text">L\'Écho des Sillons — Édition spéciale</span>' +
          '<span class="ic-info-sub">Journal indépendant</span>' +
        '</button>';
      textZone.appendChild(wrap);

      // Wire buttons
      var btnMorkar = document.getElementById("ic-btn-morkar");
      var btnJournal = document.getElementById("ic-btn-journal");
      if(btnMorkar) btnMorkar.onclick = function(e){ e.stopPropagation(); showMorkarPresentation(); };
      if(btnJournal) btnJournal.onclick = function(e){ e.stopPropagation(); showJournalArticle(); };

      if(nextBtn) nextBtn.textContent = "Continuer \u25BA";
      return;
    }

    var p = document.createElement("div");
    p.className = "ic-paragraph" + (data.cls ? " " + data.cls : "");
    p.textContent = data.text;
    textZone.appendChild(p);

    // Update button text on the "Et toi…" paragraph (second to last)
    if(data.cls === "ic-final" && nextBtn){
      nextBtn.textContent = "Suivant \u25BC";
    }
  }

  // Go to next paragraph
  function nextParagraph(){
    if(transitioning) return;
    var currentP = textZone ? textZone.querySelector(".ic-paragraph") : null;

    if(paraIdx >= IC_PARAGRAPHS.length - 1){
      endIntro();
      return;
    }

    if(currentP){
      transitioning = true;
      currentP.classList.add("fading-out");
      setTimeout(function(){
        paraIdx++;
        showParagraph(paraIdx);
        transitioning = false;
      }, 500);
    } else {
      paraIdx++;
      showParagraph(paraIdx);
    }
  }

  var dismissed = false;
  function endIntro(){
    if(dismissed) return;
    dismissed = true;
    overlay.classList.add("fading-out");
    setTimeout(function(){
      overlay.style.display = "none";
      overlay.classList.remove("fading-out");
      if(textZone) textZone.innerHTML = "";
      // Reset button
      if(nextBtn) nextBtn.textContent = "Suivant \u25BC";
      onDone();
    }, 800);
  }

  // Wire buttons
  if(nextBtn) nextBtn.onclick = nextParagraph;
  if(skipBtn) skipBtn.onclick = endIntro;

  // Also allow tapping the text zone
  if(textZone) textZone.onclick = nextParagraph;

  // Show first paragraph
  showParagraph(0);
}

/* ══════════ MORKAR PRESENTATION MODAL ══════════ */
function showMorkarPresentation(){
  var existing = document.getElementById("ic-modal-overlay");
  if(existing) existing.remove();

  var overlay = document.createElement("div");
  overlay.id = "ic-modal-overlay";
  overlay.className = "ic-modal-overlay";

  overlay.innerHTML =
    '<div class="ic-modal">' +
      '<div class="ic-modal-header">' +
        '<span class="ic-modal-logo">\u25C6</span>' +
        '<span class="ic-modal-title">GROUPE MORKAR — RETRANSMISSION OFFICIELLE</span>' +
      '</div>' +
      '<div class="ic-modal-body">' +
        '<p class="ic-modal-intro">' +
          '« Peuples d\'Extelua, le moment est venu. Le Tournoi ouvre ses portes pour sa 47e édition. »' +
        '</p>' +

        '<h3 class="ic-modal-section">LE TOURNOI</h3>' +
        '<p>Créé il y a près d\'un siècle par le Conseil Fondateur, le Tournoi d\'Extelua est ' +
          'le plus grand événement compétitif de l\'univers connu. Pendant quinze lunes, quarante candidats ' +
          'venus de tous les horizons s\'affrontent dans des épreuves qui testent le corps, l\'esprit et la volonté.</p>' +
        '<p>Le groupe Morkar, garant de la transparence et de la paix entre les mondes, assure ' +
          'l\'organisation, la retransmission et l\'arbitrage du Tournoi depuis sa 12e édition.</p>' +

        '<h3 class="ic-modal-section">LES CANDIDATS — CHAMPIONS DES PLANÈTES CONNECTÉES</h3>' +
        '<p>Trente candidats sont désignés par les planètes membres du Réseau des Routes Sillonnées. ' +
          'Chaque monde connecté envoie son représentant — élu, tiré au sort ou désigné selon les coutumes locales. ' +
          'Ils arrivent avec leur histoire, leurs sponsors et leurs millions de supporters.</p>' +

        '<h3 class="ic-modal-section">LES CANDIDATS — ÉMISSAIRES DES PLANÈTES ISOLÉES</h3>' +
        '<p>Dix places sont réservées aux planètes non connectées aux réseaux universels. ' +
          'Des mondes qui n\'ont parfois jamais eu de contact avec l\'extérieur. Morkar envoie des éclaireurs ' +
          'pour identifier et inviter des individus au potentiel remarquable.</p>' +
        '<p>C\'est la promesse fondatrice du Tournoi : offrir une chance égale à ceux que l\'univers a oubliés. ' +
          'Une main tendue vers l\'inconnu.</p>' +

        '<h3 class="ic-modal-section">LA RÉCOMPENSE</h3>' +
        '<p>Le vainqueur obtient pour sa planète d\'origine l\'intégration au Réseau Universel — ' +
          'accès aux Routes Sillonnées, siège au Conseil des Mondes, et les technologies qui en découlent. ' +
          'Un monde entier transformé par la victoire d\'un seul être.</p>' +

        '<p class="ic-modal-closing">« Que le Sablier guide vos pas. Morkar veille. »</p>' +

        '<p class="ic-modal-footnote">' +
          'Note : Le groupe Morkar condamne fermement les actes de sabotage perpétrés ' +
          'par des éléments dissidents lors des précédentes éditions. Des mesures de sécurité ' +
          'renforcées ont été mises en place pour garantir le bon déroulement du Tournoi. ' +
          'Toute tentative de perturbation sera traitée avec la plus grande fermeté.' +
        '</p>' +
      '</div>' +
      '<button class="ic-modal-close" id="ic-modal-close">Fermer</button>' +
    '</div>';

  var crawl = document.getElementById("intro-crawl");
  (crawl || document.body).appendChild(overlay);

  setTimeout(function(){ overlay.classList.add("visible"); }, 20);

  document.getElementById("ic-modal-close").onclick = function(){
    overlay.classList.remove("visible");
    setTimeout(function(){ overlay.remove(); }, 400);
  };
}

/* ══════════ JOURNAL ARTICLE MODAL ══════════ */
function showJournalArticle(){
  var existing = document.getElementById("ic-modal-overlay");
  if(existing) existing.remove();

  var overlay = document.createElement("div");
  overlay.id = "ic-modal-overlay";
  overlay.className = "ic-modal-overlay";

  overlay.innerHTML =
    '<div class="ic-modal ic-modal-journal">' +
      '<div class="ic-modal-header ic-journal-header">' +
        '<span class="ic-journal-name">L\'ÉCHO DES SILLONS</span>' +
        '<span class="ic-journal-edition">Édition spéciale — Cycle 47</span>' +
      '</div>' +
      '<div class="ic-modal-body">' +
        '<h3 class="ic-journal-headline">TOURNOI D\'EXTELUA : CE QU\'ON NE VOUS DIT PAS</h3>' +

        '<p class="ic-journal-lead">' +
          'Alors que le groupe Morkar lance sa campagne de communication pour la 47e édition, ' +
          'notre rédaction revient sur les zones d\'ombre qui entourent le plus grand spectacle de l\'univers.' +
        '</p>' +

        '<h4 class="ic-journal-sub">Des candidats isolés vraiment « choisis au hasard » ?</h4>' +
        '<p>Morkar affirme que ses éclaireurs sélectionnent les candidats des planètes isolées ' +
          'sur la base de « leur potentiel et leur détermination ». Pourtant, sur les 20 dernières éditions, ' +
          'aucun candidat d\'une planète isolée n\'a jamais remporté le Tournoi. Pas un seul. ' +
          'La plupart sont éliminés avant la cinquième lune.</p>' +

        '<h4 class="ic-journal-sub">La récompense : un rêve accessible ?</h4>' +
        '<p>L\'intégration au Réseau Universel est présentée comme le prix ultime. ' +
          'Mais les archives du Conseil des Mondes — que notre rédaction a pu consulter — ' +
          'montrent que les conditions d\'intégration comportent des clauses que Morkar ne mentionne jamais ' +
          'dans ses retransmissions. Le détail de ces clauses reste classifié.</p>' +

        '<h4 class="ic-journal-sub">Les audiences au plus haut</h4>' +
        '<p>Avec 4,2 milliards de spectateurs lors de la finale du Cycle 46, le Tournoi ' +
          'reste de loin le programme le plus regardé de l\'univers connecté. Les revenus publicitaires ' +
          'du groupe Morkar ont augmenté de 340% depuis qu\'il a pris le contrôle de l\'organisation.</p>' +

        '<h4 class="ic-journal-sub">Les « éléments dissidents »</h4>' +
        '<p>Morkar mentionne régulièrement des « actes de sabotage » sans jamais nommer ' +
          'de groupe ni préciser la nature des incidents. Nos sources indiquent que certains anciens ' +
          'candidats auraient tenté de rendre publiques des informations sur le fonctionnement interne ' +
          'du Tournoi. Aucun d\'entre eux n\'a donné suite à nos demandes d\'interview.</p>' +

        '<p class="ic-journal-footer">' +
          'L\'Écho des Sillons — Indépendant depuis le Cycle 11. ' +
          'Diffusion restreinte aux secteurs non régulés.' +
        '</p>' +
      '</div>' +
      '<button class="ic-modal-close" id="ic-modal-close">Fermer</button>' +
    '</div>';

  var crawl = document.getElementById("intro-crawl");
  (crawl || document.body).appendChild(overlay);

  setTimeout(function(){ overlay.classList.add("visible"); }, 20);

  document.getElementById("ic-modal-close").onclick = function(){
    overlay.classList.remove("visible");
    setTimeout(function(){ overlay.remove(); }, 400);
  };
}

/* ══════════ IDENTITY SCREEN (portrait + name) ══════════ */
function showIdentityScreen(onDone){
  var overlay = document.getElementById("identity-screen");
  if(!overlay){ onDone(); return; }
  overlay.style.display = "";

  var ring = document.getElementById("id-avatar-ring");
  var preview = document.getElementById("id-avatar-preview");
  var label = document.getElementById("id-avatar-label");
  var fileInput = document.getElementById("id-file-input");
  var nameInput = document.getElementById("id-name-input");
  var confirmBtn = document.getElementById("id-confirm-btn");

  var avatarData = "";

  // Avatar pick
  function openFilePicker(){ if(fileInput) fileInput.click(); }
  if(ring) ring.onclick = openFilePicker;
  if(label) label.onclick = openFilePicker;
  if(fileInput) fileInput.onchange = function(){
    var file = fileInput.files[0]; if(!file) return;
    var reader = new FileReader();
    reader.onload = function(e){
      avatarData = e.target.result;
      if(preview) preview.innerHTML = '<img src="'+avatarData+'">';
    };
    reader.readAsDataURL(file);
  };

  // Confirm
  if(confirmBtn) confirmBtn.onclick = function(){
    var name = nameInput ? nameInput.value.trim() : "";
    if(name.length < 2){ if(nameInput) nameInput.focus(); return; }

    // Save name + avatar immediately
    var u = loadUser();
    u.name = name;
    saveUser(u);
    if(avatarData) saveAvatar(avatarData);
    window._idAvatarData = avatarData;
    window._idName = name;

    overlay.classList.add("fading-out");
    setTimeout(function(){
      overlay.style.display = "none";
      overlay.classList.remove("fading-out");
      // Reset for potential replay
      if(preview) preview.innerHTML = '<span class="id-avatar-plus">+</span>';
      if(nameInput) nameInput.value = "";
      onDone();
    }, 800);
  };
}

/* ══════════ SCENARIO MUSIC MAP ══════════ */
var SC_MUSIC = {
  "champion":       "assets/music/champion.mp3",
  "lambda":         "assets/music/emissaire.mp3",
  "rebelle":        "assets/music/dissident.mp3",
  "apprenti-morkar":"assets/music/recrue.mp3",
  "veteran-morkar": "assets/music/veteran.mp3"
};

/* ══════════ SCENARIO CHOICE (2-step: type → sub-scenario) ══════════ */
function showScenarioChoice(onChosen){
  var overlay = document.getElementById("scenario-choice");
  if(!overlay){ onChosen("lambda"); return; }
  overlay.style.display = "";

  var step1 = document.getElementById("sc-step1");
  var step2 = document.getElementById("sc-step2");
  var step2Title = document.getElementById("sc-step2-title");
  var arena = document.getElementById("sc-arena");
  var guide = document.getElementById("sc-guide");
  var guideLabel = document.getElementById("sc-guide-label");
  var guideImg = document.getElementById("sc-guide-img");

  // Set guide avatar
  var persona = getGuidePersona();
  if(persona && persona.avatar && guideImg){
    guideImg.innerHTML = '<img src="' + persona.avatar + '" alt="">';
  }

  // Show step 1, hide step 2
  if(step1) step1.style.display = "";
  if(step2) step2.style.display = "none";

  // Sub-scenario definitions per type
  var SUB_CHAMPION = [
    {scenario:"champion",       icon:"\u2B50",     name:"Champion",       desc:"Représentant officiel de ta planète connectée"},
    {scenario:"rebelle",        icon:"\u26A1",     name:"Dissident",      desc:"Opposant infiltré parmi les champions"},
    {scenario:"apprenti-morkar",icon:"\uD83D\uDCE1",name:"Recrue Morkar", desc:"Nouvel agent du groupe Morkar"},
    {scenario:"veteran-morkar", icon:"\uD83D\uDEE1\uFE0F",name:"Vétéran Morkar",desc:"Membre expérimenté de l'organisation"}
  ];
  var SUB_EMISSAIRE = [
    {scenario:"lambda",   icon:"\uD83C\uDF10", name:"Émissaire isolé", desc:"Candidat ordinaire d'une planète coupée des réseaux"},
    {scenario:"rebelle",  icon:"\u26A1",        name:"Dissident",       desc:"Faux émissaire — infiltré depuis une planète connectée"}
  ];

  /* ── STEP 1: pick type (click) ── */
  var btnChampion = document.getElementById("sc-pick-champion");
  var btnEmissaire = document.getElementById("sc-pick-emissaire");

  function goToStep2(type){
    var subs = (type === "champion") ? SUB_CHAMPION : SUB_EMISSAIRE;
    window._scOriginType = type; // "champion" or "emissaire"

    // Set title
    if(step2Title){
      step2Title.textContent = (type === "champion")
        ? "Quel champion es-tu ?"
        : "Quel émissaire es-tu ?";
    }

    // Inject circles into arena
    var existingCircles = arena.querySelectorAll(".sc-circle");
    existingCircles.forEach(function(c){ c.remove(); });

    // Layout positions depending on count
    var positions;
    if(subs.length === 4){
      positions = [
        {left:"25%", top:"20%"},
        {left:"75%", top:"20%"},
        {left:"25%", top:"55%"},
        {left:"75%", top:"55%"}
      ];
    } else {
      positions = [
        {left:"30%", top:"35%"},
        {left:"70%", top:"35%"}
      ];
    }

    subs.forEach(function(s, i){
      var div = document.createElement("div");
      div.className = "sc-circle";
      div.setAttribute("data-scenario", s.scenario);
      div.style.left = positions[i].left;
      div.style.top = positions[i].top;
      div.innerHTML =
        '<span class="sc-circle-icon">' + s.icon + '</span>' +
        '<span class="sc-circle-name">' + s.name + '</span>' +
        '<span class="sc-circle-desc">' + s.desc + '</span>';
      arena.insertBefore(div, guide);
    });

    // Reset guide
    guide.style.left = "50%";
    guide.style.top = "82%";
    guide.classList.remove("sc-guide-awake");
    if(guideLabel) guideLabel.textContent = "Endormi";

    // Transition
    if(step1){
      step1.classList.add("fading-out");
      setTimeout(function(){
        step1.style.display = "none";
        step1.classList.remove("fading-out");
        if(step2) step2.style.display = "";
        initStep2Drag();
      }, 500);
    }
  }

  if(btnChampion) btnChampion.onclick = function(){ goToStep2("champion"); };
  if(btnEmissaire) btnEmissaire.onclick = function(){ goToStep2("emissaire"); };

  /* ── STEP 2: drag guide to circle ── */
  function initStep2Drag(){
    var circles = arena.querySelectorAll(".sc-circle");
    var SNAP = 55;
    var isDrag = false, offX = 0, offY = 0;
    var chosen = false;

    function gxy(e){
      if(e.clientX != null) return {x: e.clientX, y: e.clientY};
      var t = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]);
      return t ? {x: t.clientX, y: t.clientY} : {x: 0, y: 0};
    }

    function guideCenter(){
      var r = guide.getBoundingClientRect();
      return {x: r.left + r.width / 2, y: r.top + r.height / 2};
    }

    function nearestCircle(){
      var gc = guideCenter();
      var best = null, bestDist = Infinity;
      circles.forEach(function(c){
        var r = c.getBoundingClientRect();
        var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        var d = Math.hypot(gc.x - cx, gc.y - cy);
        if(d < bestDist){ bestDist = d; best = c; }
      });
      return (best && bestDist < SNAP) ? best : null;
    }

    function clearHighlights(){
      circles.forEach(function(c){ c.classList.remove("sc-circle-hover"); });
    }

    function onStart(e){
      if(chosen) return;
      e.preventDefault(); e.stopPropagation();
      isDrag = true;
      guide.classList.add("dragging");
      if(guideLabel) guideLabel.textContent = "Réveillé !";
      var p = gxy(e);
      var r = guide.getBoundingClientRect();
      offX = (r.left + r.width / 2) - p.x;
      offY = (r.top + r.height / 2) - p.y;
    }

    function onMove(e){
      if(!isDrag) return;
      e.preventDefault();
      var p = gxy(e);
      var ar = arena.getBoundingClientRect();
      var nx = p.x + offX - ar.left;
      var ny = p.y + offY - ar.top;
      guide.style.left = (nx / ar.width * 100) + "%";
      guide.style.top = (ny / ar.height * 100) + "%";

      clearHighlights();
      var hit = nearestCircle();
      if(hit) hit.classList.add("sc-circle-hover");
    }

    function cleanup(){
      guide.removeEventListener("pointerdown", onStart);
      guide.removeEventListener("touchstart", onStartTouch);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("pointerup", onEnd);
      document.removeEventListener("touchend", onEnd);
    }

    function startScenarioMusic(scenario){
      var src = SC_MUSIC[scenario] || SC_MUSIC["champion"];
      var extAudio = document.getElementById("extelua-music");
      var extSrc = document.getElementById("extelua-music-src");
      if(!extAudio) return;
      // Set the right track
      if(extSrc) extSrc.src = src;
      extAudio.load();
      extAudio.currentTime = 0;
      extAudio.volume = 0;
      extAudio.play().catch(function(){});
      audioFade(extAudio, 0.4, 2000);
    }

    function onEnd(){
      if(!isDrag) return;
      isDrag = false;
      guide.classList.remove("dragging");

      clearHighlights();
      var hit = nearestCircle();

      if(hit){
        chosen = true;
        var scenario = hit.getAttribute("data-scenario");
        window._chosenScenario = scenario;

        // Snap guide into circle
        var ar = arena.getBoundingClientRect();
        var cr = hit.getBoundingClientRect();
        var cx = (cr.left + cr.width / 2 - ar.left) / ar.width * 100;
        var cy = (cr.top + cr.height / 2 - ar.top) / ar.height * 100;
        guide.style.left = cx + "%";
        guide.style.top = cy + "%";
        guide.classList.add("sc-guide-awake");
        hit.classList.add("sc-circle-chosen");
        if(guideLabel) guideLabel.textContent = persona ? persona.name : "Prêt";

        // Start scenario music
        startScenarioMusic(scenario);

        // Fade out ic-music if still playing
        var icAudio = document.getElementById("ic-music");
        if(icAudio && !icAudio.paused){
          audioFade(icAudio, 0, 1200, function(){ icAudio.pause(); icAudio.volume = 0.5; });
        }

        // Transition out after a beat
        setTimeout(function(){
          overlay.classList.add("fading-out");
          setTimeout(function(){
            overlay.style.display = "none";
            overlay.classList.remove("fading-out");
            // Reset state for potential replay
            guide.classList.remove("sc-guide-awake");
            hit.classList.remove("sc-circle-chosen");
            cleanup();
            onChosen(scenario);
          }, 800);
        }, 1200);
      } else {
        // Snap back
        if(guideLabel) guideLabel.textContent = "Endormi";
        guide.style.left = "50%";
        guide.style.top = "82%";
      }
    }

    function onStartTouch(e){ onStart(e); }

    guide.addEventListener("pointerdown", onStart, {passive: false});
    guide.addEventListener("touchstart", onStartTouch, {passive: false});
    document.addEventListener("pointermove", onMove, {passive: false});
    document.addEventListener("touchmove", onMove, {passive: false});
    document.addEventListener("pointerup", onEnd);
    document.addEventListener("touchend", onEnd);
  }
}

/* Full intro sequence
   mode "new" : crawl → identity → scenario → lock → guide (region/city/job)
   mode "participation" : crawl → scenario → lock → guide (region/city/job) */
function startIntroSequence(onNewVoyage, mode){
  var isNew = (mode !== "participation");
  showIntroCrawl(function(){
    if(isNew){
      showIdentityScreen(function(){
        showScenarioChoice(function(){ onNewVoyage(); });
      });
    } else {
      showScenarioChoice(function(){ onNewVoyage(); });
    }
  });
}
