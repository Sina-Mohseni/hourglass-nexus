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
  var choices   = document.getElementById("mm-menu-choices");
  var newBtn    = document.getElementById("mm-choice-new");
  var resumeBtn = document.getElementById("mm-choice-resume");
  var volBtn    = document.getElementById("mm-volume-btn");
  var volOn     = document.getElementById("mm-volume-icon-on");
  var volOff    = document.getElementById("mm-volume-icon-off");

  var hasSave = acDB.get("ac_saveExists") === "1" || acDB.get("ac_charCreated") === "1";
  if(resumeBtn && hasSave) resumeBtn.disabled = false;

  // Video + volume button hidden until "Entrer" is clicked
  if(video) video.style.display = "none";
  if(volBtn) volBtn.style.display = "none";

  /* ---- Play video + music (called on Entrer click) ---- */
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

  /* ---- Show choices ---- */
  function showChoices(){
    if(enterBtn){
      enterBtn.classList.add("hidden");
      setTimeout(function(){ enterBtn.style.display = "none"; }, 400);
    }
    if(choices){
      choices.style.display = "";
      choices.classList.add("visible");
    }
  }

  /* ---- "Entrer" = start everything ---- */
  if(enterBtn){
    enterBtn.onclick = function(){
      playAll();
      showChoices();
    };
  }

  /* ---- Video ends → show choices (fallback if Entrer not clicked) ---- */
  if(video){
    video.addEventListener("ended", function(){
      showChoices();
    });
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
  if(newBtn){
    newBtn.onclick = function(){
      closeMainMenu(function(){ onNewVoyage() });
    };
  }
  if(resumeBtn){
    resumeBtn.onclick = function(){
      if(resumeBtn.disabled) return;
      closeMainMenu(function(){ onResumeVoyage() });
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
