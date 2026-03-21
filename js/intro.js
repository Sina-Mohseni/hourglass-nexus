"use strict";

/* ══════════ INTRO FLOW ══════════
   Loading Screen → Title Screen (Entrer) → Main Menu → Lock Screen
   ═══════════════════════════════════════════════════════════════ */

var _musicMuted = false;

/* ── Loading Screen ── */
function initLoadingScreen(onDone){
  var screen = document.getElementById("loading-screen");
  var bar = document.getElementById("loading-bar-fill");
  var sub = document.getElementById("loading-subtitle");
  if(!screen){ onDone(); return }

  var hasVisited = acDB.get("ac_hasVisited") === "1";
  var duration = hasVisited ? (2000 + Math.random() * 1000) : (6000 + Math.random() * 1000);

  var messages = hasVisited
    ? ["Reconnexion au Nexus…", "Restauration des portails…"]
    : ["Initialisation du Nexus…", "Invocation des portails…", "Chargement des chroniques…", "Préparation du sanctuaire…", "Éveil des runes ancestrales…", "Synchronisation temporelle…"];

  var msgIdx = 0;
  var msgInterval = duration / messages.length;
  var msgTimer = setInterval(function(){
    msgIdx++;
    if(msgIdx < messages.length && sub){
      sub.style.animation = "none";
      sub.offsetHeight;
      sub.textContent = messages[msgIdx];
      sub.style.animation = "loadSubIn .4s ease-out forwards";
    }
  }, msgInterval);

  var start = Date.now();
  function tick(){
    var elapsed = Date.now() - start;
    var pct = Math.min(100, (elapsed / duration) * 100);
    if(bar) bar.style.width = pct + "%";
    if(elapsed < duration){
      requestAnimationFrame(tick);
    } else {
      clearInterval(msgTimer);
      acDB.set("ac_hasVisited", "1");
      screen.classList.add("fading");
      setTimeout(function(){
        screen.remove();
        onDone();
      }, 800);
    }
  }
  requestAnimationFrame(tick);
}

/* ── Main Menu ── */
function initMainMenu(onNewVoyage, onResumeVoyage){
  var menu    = document.getElementById("main-menu");
  if(!menu) return;
  menu.style.display = "";

  var video     = document.getElementById("mm-bg-video");
  var audio     = document.getElementById("bg-music");
  var enterBtn  = document.getElementById("mm-enter-btn");
  var circles   = document.getElementById("mm-menu-circles");
  var mainCirc  = document.getElementById("mm-main-circles");
  var volBtn    = document.getElementById("mm-volume-btn");
  var volOn     = document.getElementById("mm-volume-icon-on");
  var volOff    = document.getElementById("mm-volume-icon-off");
  var mmLogo    = menu.querySelector(".mm-logo");
  var mmTitle   = menu.querySelector(".mm-title");
  var mmTagline = menu.querySelector(".mm-tagline");

  // Level 1 buttons
  var nouvelleBtn = document.getElementById("mm-circle-nouvelle");
  var chargerBtn  = document.getElementById("mm-circle-charger");

  // Level 2 buttons
  var subGame   = document.getElementById("mm-sub-game");
  var departBtn = document.getElementById("mm-circle-depart");
  var retourBtn = document.getElementById("mm-circle-retour");
  var codexBtn  = document.getElementById("mm-circle-codex");
  var tournoisBtn = document.getElementById("mm-circle-tournois");
  var backGame  = document.getElementById("mm-sub-game-back");

  var hasSave = acDB.get("ac_saveExists") === "1" || acDB.get("ac_charCreated") === "1";
  if(chargerBtn && hasSave) chargerBtn.disabled = false;
  if(retourBtn && hasSave) retourBtn.disabled = false;

  // Video + volume button hidden until "Entrer" is clicked
  if(video) video.style.display = "none";
  if(volBtn) volBtn.style.display = "none";

  /* ---- Play video + music ---- */
  function playAll(){
    if(video){
      video.style.display = "";
      video.currentTime = 0;
      video.play();
    }
    if(audio){
      audio.currentTime = 0;
      audio.volume = 0.4;
      audio.play();
    }
    if(volBtn) volBtn.style.display = "";
  }

  /* ---- Replay animations on buttons ---- */
  function replayAnimations(container){
    var btns = container.querySelectorAll(".mm-circle-btn");
    for(var i = 0; i < btns.length; i++){
      btns[i].style.animation = "none";
      btns[i].offsetHeight;
      btns[i].style.animation = "";
    }
  }

  /* ---- Show main circles ---- */
  function showCircles(){
    if(enterBtn){
      enterBtn.classList.add("hidden");
      setTimeout(function(){ enterBtn.style.display = "none"; }, 400);
    }
    if(circles){
      circles.style.display = "";
      circles.classList.add("visible");
      replayAnimations(mainCirc);
    }
  }

  /* ---- Switch between circle levels ---- */
  function switchTo(hideEl, showEl){
    hideEl.classList.add("fading-out");
    setTimeout(function(){
      hideEl.style.display = "none";
      hideEl.classList.remove("fading-out");
      showEl.style.display = "";
      showEl.classList.add("fading-in");
      replayAnimations(showEl);
      setTimeout(function(){ showEl.classList.remove("fading-in"); }, 600);
    }, 350);
  }

  /* ---- "Entrer" = start everything ---- */
  if(enterBtn){
    enterBtn.onclick = function(){
      playAll();
      showCircles();
    };
  }

  /* ---- Level 1 actions ---- */
  if(nouvelleBtn){
    nouvelleBtn.onclick = function(){
      closeMainMenu(function(){ onNewVoyage() });
    };
  }
  if(chargerBtn){
    chargerBtn.onclick = function(){
      if(chargerBtn.disabled) return;
      // Populate player portrait + name in sub-menu header
      var u = loadUser();
      var portraitEl = document.getElementById("mm-player-portrait");
      var nameEl = document.getElementById("mm-player-name");
      if(portraitEl){
        if(u.avatar){
          portraitEl.innerHTML = '<img src="' + u.avatar + '" alt="">';
        } else {
          portraitEl.textContent = "\uD83D\uDC64";
        }
      }
      if(nameEl) nameEl.textContent = u.name || "Voyageur";
      if(mmLogo) mmLogo.style.display = "none";
      if(mmTitle) mmTitle.style.display = "none";
      if(mmTagline) mmTagline.style.display = "none";
      switchTo(mainCirc, subGame);
    };
  }

  /* ---- Back to Level 1 ---- */
  if(backGame){
    backGame.onclick = function(){
      if(mmLogo) mmLogo.style.display = "";
      if(mmTitle) mmTitle.style.display = "";
      if(mmTagline) mmTagline.style.display = "";
      switchTo(subGame, mainCirc);
    };
  }

  /* ---- Volume toggle ---- */
  function updateVolIcon(){
    if(volOn)  volOn.style.display  = _musicMuted ? "none" : "";
    if(volOff) volOff.style.display = _musicMuted ? "" : "none";
    if(volBtn) volBtn.classList.toggle("muted", _musicMuted);
  }

  if(volBtn){
    volBtn.onclick = function(){
      _musicMuted = !_musicMuted;
      if(audio) audio.volume = _musicMuted ? 0 : 0.4;
      updateVolIcon();
    };
  }

  /* ---- Navigation ---- */
  if(departBtn){
    departBtn.onclick = function(){
      closeMainMenu(function(){ onNewVoyage() });
    };
  }
  if(retourBtn){
    retourBtn.onclick = function(){
      if(retourBtn.disabled) return;
      closeMainMenu(function(){ onResumeVoyage() });
    };
  }
  if(codexBtn){
    codexBtn.onclick = function(){
      // TODO: open Codex
    };
  }
  if(tournoisBtn){
    tournoisBtn.onclick = function(){
      // TODO: open Tournois Précédents
    };
  }
}

/* ── Fade out music + close menu ── */
function fadeOutMusic(duration, cb){
  var audio = document.getElementById("bg-music");
  if(!audio || audio.paused){ if(cb) cb(); return }
  var startVol = audio.volume;
  var steps = 20;
  var interval = duration / steps;
  var step = 0;
  var fade = setInterval(function(){
    step++;
    audio.volume = Math.max(0, startVol * (1 - step / steps));
    if(step >= steps){
      clearInterval(fade);
      audio.pause();
      audio.volume = startVol;
      if(cb) cb();
    }
  }, interval);
}

function closeMainMenu(cb){
  var menu = document.getElementById("main-menu");
  if(!menu){ if(cb) cb(); return }
  menu.classList.add("fading");
  fadeOutMusic(800, function(){});
  setTimeout(function(){
    menu.remove();
    document.body.classList.remove("intro-active");
    if(cb) cb();
  }, 800);
}

/* ── Lock Screen for New Voyage ── */
function showLockForNewVoyage(){
  var lk = document.getElementById("lock-screen");
  if(!lk) return;
  lk.style.display = "";
  window._introMode = "new";
  initLock();
}

/* ── Lock Screen for Resume Voyage ── */
function showLockForResume(){
  var lk = document.getElementById("lock-screen");
  if(!lk) return;
  lk.style.display = "";
  window._introMode = "resume";
  initLock();
}

/* ── Resume Intro (short text after lock) ── */
function showResumeIntro(){
  var u = loadUser();
  var name = u.name || "Voyageur";

  var overlay = document.createElement("div");
  overlay.className = "resume-intro-overlay";
  overlay.innerHTML = '<div class="ri-vignette"></div>'
    + '<div class="resume-intro-content">'
    + '<p class="resume-intro-text">Les runes s\'illuminent à nouveau…<br>Le Nexus te reconnaît, <span class="hl">' + esc(name) + '</span>.</p>'
    + '</div>';

  var screen = document.querySelector(".screen");
  if(screen) screen.appendChild(overlay);

  var dismissed = false;
  function dismiss(){
    if(dismissed) return;
    dismissed = true;
    overlay.classList.add("fading");
    setTimeout(function(){
      overlay.remove();
      loadGameSave();
    }, 600);
  }

  overlay.onclick = dismiss;
  setTimeout(dismiss, 2500);
}
