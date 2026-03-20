"use strict";

/* ══════════ INTRO FLOW ══════════
   Loading Screen → Main Menu → Lock Screen → CharCreate / Resume
   ═══════════════════════════════════════════════════════════════ */

var introMusicPlaying = false;
var introMusicMuted = false;

/* ── Loading Screen ── */
function initLoadingScreen(onDone){
  var screen = document.getElementById("loading-screen");
  var bar = document.getElementById("loading-bar-fill");
  var sub = document.getElementById("loading-subtitle");
  if(!screen){ onDone(); return }

  // 6-7s first visit, 2-3s on reload
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

  // Animate bar
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

/* ── Start music (called right after loading screen) ── */
function startMusic(){
  var audio = document.getElementById("bg-music");
  if(!audio) return;
  audio.volume = 0.4;
  audio.play().then(function(){
    introMusicPlaying = true;
  }).catch(function(){
    // Autoplay blocked — start on first user interaction
    function resumeOnInteraction(){
      audio.volume = introMusicMuted ? 0 : 0.4;
      audio.play().then(function(){
        introMusicPlaying = true;
      }).catch(function(){});
      document.removeEventListener("click", resumeOnInteraction);
      document.removeEventListener("touchstart", resumeOnInteraction);
    }
    document.addEventListener("click", resumeOnInteraction, {once: true});
    document.addEventListener("touchstart", resumeOnInteraction, {once: true});
  });
}

/* ── Volume Toggle ── */
function initVolumeToggle(){
  var btn = document.getElementById("mm-volume-btn");
  var iconOn = document.getElementById("mm-volume-icon-on");
  var iconOff = document.getElementById("mm-volume-icon-off");
  var audio = document.getElementById("bg-music");
  if(!btn || !audio) return;

  btn.onclick = function(e){
    e.stopPropagation();
    if(!introMusicMuted){
      // Mute: volume to 0 but keep playing
      audio.volume = 0;
      introMusicMuted = true;
      if(iconOn) iconOn.style.display = "none";
      if(iconOff) iconOff.style.display = "";
      btn.classList.add("muted");
    } else {
      // Unmute: restore volume
      audio.volume = 0.4;
      introMusicMuted = false;
      if(iconOn) iconOn.style.display = "";
      if(iconOff) iconOff.style.display = "none";
      btn.classList.remove("muted");
    }
  };
}

/* ── Main Menu ── */
function initMainMenu(onNewVoyage, onResumeVoyage){
  var menu = document.getElementById("main-menu");
  if(!menu) return;
  menu.style.display = "";

  var video = document.getElementById("mm-bg-video");
  var choices = document.getElementById("mm-menu-choices");
  var newBtn = document.getElementById("mm-choice-new");
  var resumeBtn = document.getElementById("mm-choice-resume");

  // Check if save exists
  var hasSave = acDB.get("ac_saveExists") === "1" || acDB.get("ac_charCreated") === "1";
  if(resumeBtn && hasSave) resumeBtn.disabled = false;

  // When video ends → show choices
  if(video){
    video.addEventListener("ended", function(){
      if(choices){
        choices.style.display = "";
        choices.classList.add("visible");
      }
    });
  }

  // Nouveau voyage
  if(newBtn){
    newBtn.onclick = function(){
      closeMainMenu(function(){ onNewVoyage() });
    };
  }

  // Reprendre le voyage
  if(resumeBtn){
    resumeBtn.onclick = function(){
      if(resumeBtn.disabled) return;
      closeMainMenu(function(){ onResumeVoyage() });
    };
  }

  // Start music right away and init volume toggle
  startMusic();
  initVolumeToggle();
}

function fadeOutMusic(duration, cb){
  var audio = document.getElementById("bg-music");
  if(!audio || audio.paused){
    if(cb) cb();
    return;
  }
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
      introMusicPlaying = false;
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
    if(cb) cb();
  }, 800);
}

/* ── Lock Screen for New Voyage ── */
function showLockForNewVoyage(){
  var lk = document.getElementById("lock-screen");
  if(!lk) return;
  lk.style.display = "";
  // Set mode so after unlock we go to char creation (new)
  window._introMode = "new";
  initLock();
}

/* ── Lock Screen for Resume Voyage ── */
function showLockForResume(){
  var lk = document.getElementById("lock-screen");
  if(!lk) return;
  lk.style.display = "";
  // Set mode so after unlock we go to resume flow
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

  // Auto-advance after 2.5s, or click to skip
  var dismissed = false;
  function dismiss(){
    if(dismissed) return;
    dismissed = true;
    overlay.classList.add("fading");
    setTimeout(function(){
      overlay.remove();
      // Load the saved game and enter
      loadGameSave();
    }, 600);
  }

  overlay.onclick = dismiss;
  setTimeout(dismiss, 2500);
}
