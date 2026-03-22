"use strict";

/* ══════════ INTRO NARRATION + SCENARIO CHOICE ══════════ */

var IC_PARAGRAPHS = [
  {text: "LE TOURNOI D'EXTELUA", cls: "ic-title"},
  {text: "Depuis des temps immémoriaux, le monde d'Extelua organise le plus grand tournoi que les terres aient jamais connu."},
  {text: "Tous les deux ans, quarante participants sont choisis parmi les peuples des contrées — guerriers, mages, artisans, rebelles et vagabonds — pour s'affronter dans une épreuve qui dure une année entière."},
  {text: "Pendant douze lunes, les champions traversent les cités, affrontent des créatures légendaires, résolvent des énigmes ancestrales et forgent des alliances fragiles."},
  {text: "Le tournoi est bien plus qu'une compétition. C'est un rite sacré, un héritage que chaque génération préserve avec ferveur. Les vainqueurs entrent dans la légende. Les vaincus repartent transformés."},
  {text: "Nul ne sait exactement comment les quarante sont choisis. Certains reçoivent un sceau marqué du symbole du Nexus. D'autres sont convoqués en rêve. Mais tous ressentent l'appel — une vibration dans les os, un murmure dans le vent."},
  {text: "Cette année, l'appel résonne à nouveau. Les portes du Nexus s'ouvrent. Le sablier se retourne."},
  {text: "Et toi, voyageur… tu as été choisi.", cls: "ic-final"}
];

var _icMuted = false;

function showIntroCrawl(onDone){
  var overlay = document.getElementById("intro-crawl");
  if(!overlay){ onDone(); return; }
  overlay.style.display = "";

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
    var p = document.createElement("div");
    p.className = "ic-paragraph" + (data.cls ? " " + data.cls : "");
    p.textContent = data.text;
    textZone.innerHTML = "";
    textZone.appendChild(p);

    // Update button text on last paragraph
    if(idx >= IC_PARAGRAPHS.length - 1 && nextBtn){
      nextBtn.textContent = "Continuer \u25BA";
    }
  }

  // Go to next paragraph
  function nextParagraph(){
    if(transitioning) return;
    var currentP = textZone ? textZone.querySelector(".ic-paragraph") : null;

    if(paraIdx >= IC_PARAGRAPHS.length - 1){
      // Last paragraph was showing → end
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

      // Fade out music (crossfade with guide music will happen in checkCharCreate)
      if(audio && !audio.paused){
        audioFade(audio, 0, 1200, function(){ audio.volume = 0.5; });
      }

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
