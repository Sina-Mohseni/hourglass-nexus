"use strict";

/* ══════════ INTRO FLOW ══════════
   Loading Screen → Main Menu → Lock Screen → CharCreate / Resume
   ═══════════════════════════════════════════════════════════════ */

var introMusicPlaying = false;

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

/* ── Main Menu ── */
function initMainMenu(onNewVoyage, onResumeVoyage){
  var menu = document.getElementById("main-menu");
  if(!menu) return;
  menu.style.display = "";

  var startBtn = document.getElementById("mm-start-btn");
  var choices = document.getElementById("mm-menu-choices");
  var newBtn = document.getElementById("mm-choice-new");
  var resumeBtn = document.getElementById("mm-choice-resume");
  var musicBtn = document.getElementById("mm-music-btn");

  // Check if save exists
  var hasSave = acDB.get("ac_saveExists") === "1" || acDB.get("ac_charCreated") === "1";
  if(resumeBtn && hasSave) resumeBtn.disabled = false;

  // "Appuyer pour commencer"
  if(startBtn){
    startBtn.onclick = function(){
      startBtn.classList.add("hidden");
      setTimeout(function(){
        startBtn.style.display = "none";
        if(choices){
          choices.style.display = "";
          choices.classList.add("visible");
        }
      }, 400);
    };
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

  // Music: autoplay + toggle
  initMusicToggle(musicBtn, true);
}

function closeMainMenu(cb){
  var menu = document.getElementById("main-menu");
  if(!menu){ if(cb) cb(); return }
  menu.classList.add("fading");
  setTimeout(function(){
    menu.remove();
    if(cb) cb();
  }, 800);
}

/* ── Music Toggle ── */
function initMusicToggle(btn, autoplay){
  if(!btn) return;
  var audio = document.getElementById("bg-music");
  if(!audio) return;

  function playMusic(){
    audio.volume = 0.4;
    audio.play().then(function(){
      introMusicPlaying = true;
      btn.classList.add("active");
    }).catch(function(){
      // Autoplay blocked by browser — start on first user interaction
      introMusicPlaying = false;
      btn.classList.remove("active");
      function resumeOnClick(){
        audio.volume = 0.4;
        audio.play().then(function(){
          introMusicPlaying = true;
          btn.classList.add("active");
        }).catch(function(){});
        document.removeEventListener("click", resumeOnClick);
        document.removeEventListener("touchstart", resumeOnClick);
      }
      document.addEventListener("click", resumeOnClick, {once: true});
      document.addEventListener("touchstart", resumeOnClick, {once: true});
    });
  }

  // Autoplay on init
  if(autoplay) playMusic();

  btn.onclick = function(e){
    e.stopPropagation();
    if(introMusicPlaying){
      audio.pause();
      introMusicPlaying = false;
      btn.classList.remove("active");
    } else {
      playMusic();
    }
  };
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
