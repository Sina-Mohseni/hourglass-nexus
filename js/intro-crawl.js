"use strict";

/* ══════════ INTRO NARRATION + SCENARIO CHOICE ══════════ */

var IC_PARAGRAPHS = [
  {text: "LE TOURNOI D'EXTELUA", cls: "ic-title"},
  {text: "Extelua. Un univers de milliards d'étoiles reliées par les Routes Sillonnées — d'immenses corridors de voyage supraluminique qui connectent les civilisations les plus avancées entre elles."},
  {text: "Mais toutes les planètes ne sont pas connectées. Des centaines de mondes isolés, coupés des réseaux universels, vivent sans jamais savoir ce qui se passe au-delà de leur ciel."},
  {text: "Tous les deux cycles solaires, le groupe Morkar — la plus grande organisation médiatique et diplomatique d'Extelua — organise un événement retransmis dans tout l'univers connecté : le Tournoi d'Extelua."},
  {text: "Quarante participants sont sélectionnés. Vingt sont les champions officiels des planètes connectées — des figures publiques, des athlètes, des scientifiques, des célébrités déjà connues à travers les réseaux."},
  {text: "Les vingt autres viennent des planètes isolées. Des inconnus. Des gens ordinaires arrachés à leur quotidien par une invitation qu'ils ne comprennent pas toujours. Morkar appelle cela « la main tendue aux oubliés »."},
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
        '<p>Vingt candidats sont désignés par les planètes membres du Réseau des Routes Sillonnées. ' +
          'Chaque monde connecté envoie son représentant — élu, tiré au sort ou désigné selon les coutumes locales. ' +
          'Ils arrivent avec leur histoire, leurs sponsors et leurs millions de supporters.</p>' +

        '<h3 class="ic-modal-section">LES CANDIDATS — ÉMISSAIRES DES PLANÈTES ISOLÉES</h3>' +
        '<p>Vingt places sont réservées aux planètes non connectées aux réseaux universels. ' +
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

/* ══════════ SCENARIO CHOICE ══════════ */
function showScenarioChoice(onChosen){
  var overlay = document.getElementById("scenario-choice");
  if(!overlay){ onChosen("lambda"); return; }
  overlay.style.display = "";

  var audio = document.getElementById("ic-music");

  overlay.querySelectorAll(".sc-choice").forEach(function(btn){
    btn.onclick = function(){
      var scenario = btn.getAttribute("data-scenario");
      window._chosenScenario = scenario;

      // Intro music continues playing through char creation — crossfade happens in enterMainApp

      // Fade out overlay
      overlay.classList.add("fading-out");
      setTimeout(function(){
        overlay.style.display = "none";
        overlay.classList.remove("fading-out");
        onChosen(scenario);
      }, 800);
    };
  });
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
