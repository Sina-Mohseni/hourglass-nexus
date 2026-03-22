"use strict";

/* ══════════ DIAMOND IMAGE OVERLAY ══════════ */
/* ★ Le losange est dans le footer-assembly */
function setDiamondImage(imgSrc, emoji){
  var diamond = document.getElementById("footer-diamond");
  if(!diamond) return;
  var old = diamond.querySelector(".diamond-img-overlay");
  if(old) old.remove();
  if(!imgSrc && !emoji){ diamond.classList.remove("has-content"); return }
  var overlay = document.createElement("div");
  overlay.className = "diamond-img-overlay";
  if(imgSrc){
    overlay.innerHTML = '<img src="'+imgSrc+'">';
  } else if(emoji){
    overlay.innerHTML = '<div class="diamond-emoji">'+emoji+'</div>';
  }
  diamond.appendChild(overlay);
  diamond.classList.add("has-content");
}

function clearDiamondImage(){
  var diamond = document.getElementById("footer-diamond");
  if(!diamond) return;
  var old = diamond.querySelector(".diamond-img-overlay");
  if(old) old.remove();
  diamond.classList.remove("has-content");
}

/* ══════════ FOOTER PANEL (le footer-assembly bouge en bloc) ══════════ */
function setFooterPanelContent(html){
  var panel = document.getElementById("footer-panel");
  if(!panel) return;
  /* Hauteur = travel distance (tout l'espace entre header et footer) */
  var h = window._fpTravel || (window.innerHeight - 110);
  panel.style.height = h + "px";
  panel.innerHTML = '<div class="footer-panel-inner" id="fp-body">'+html+'</div>';
}

function closeFooterPanel(){
  var asm = document.getElementById("footer-assembly");
  if(!asm) return;
  asm.classList.add("snapping");
  var travel = window._fpTravel || (window.innerHeight - 100);
  asm.style.transform = "translateY(" + travel + "px)";
  window._fpOpen = false;
  setTimeout(function(){
    asm.classList.remove("snapping");
    asm.style.zIndex = "";
  }, 450);
}

/* ══════════ HEADER PANEL (le header-assembly bouge en bloc, miroir du footer) ══════════ */
function setHeaderPanelContent(html){
  var panel = document.getElementById("header-panel");
  if(!panel) return;
  var h = window._hpTravel || (window.innerHeight - 110);
  panel.style.height = h + "px";
  panel.innerHTML = '<div class="header-panel-inner" id="hp-body">'+html+'</div>';
}

function closeHeaderPanel(){
  var asm = document.getElementById("header-assembly");
  if(!asm) return;
  asm.classList.add("snapping");
  var travel = window._hpTravel || (window.innerHeight - 110);
  asm.style.transform = "translateY(" + (-travel) + "px)";
  window._hpOpen = false;
  setTimeout(function(){
    asm.classList.remove("snapping");
    asm.style.zIndex = "";
  }, 450);
}

/* ══════════ HEADER DIAMOND IMAGE OVERLAY ══════════ */
function setHeaderDiamondImage(imgSrc, emoji){
  var diamond = document.getElementById("header-diamond");
  if(!diamond) return;
  var old = diamond.querySelector(".diamond-img-overlay");
  if(old) old.remove();
  if(!imgSrc && !emoji){ diamond.classList.remove("has-content"); return }
  var overlay = document.createElement("div");
  overlay.className = "diamond-img-overlay";
  if(imgSrc){
    overlay.innerHTML = '<img src="'+imgSrc+'">';
  } else if(emoji){
    overlay.innerHTML = '<div class="diamond-emoji">'+emoji+'</div>';
  }
  diamond.appendChild(overlay);
  diamond.classList.add("has-content");
}

function clearHeaderDiamondImage(){
  var diamond = document.getElementById("header-diamond");
  if(!diamond) return;
  var old = diamond.querySelector(".diamond-img-overlay");
  if(old) old.remove();
  diamond.classList.remove("has-content");
}

/* ══════════ SHOW BG IMAGES (accueil.png / bgmap.png) ══════════ */
function showAppBackgrounds(){
  $$(".hidden-until-app").forEach(function(el){
    el.classList.add("app-visible");
  });
}
function hideAppBackgrounds(){
  $$(".hidden-until-app").forEach(function(el){
    el.classList.remove("app-visible");
  });
}

/* ══════════ AUDIO CROSSFADE UTILITIES ══════════ */

/**
 * Fade an audio element's volume from current to target over duration ms.
 * Returns the interval ID so it can be cancelled.
 */
function audioFade(audio, targetVol, duration, cb){
  if(!audio){ if(cb) cb(); return null; }
  var startVol = audio.volume;
  var steps = 25;
  var interval = duration / steps;
  var step = 0;
  var id = setInterval(function(){
    step++;
    var t = step / steps;
    audio.volume = Math.max(0, Math.min(1, startVol + (targetVol - startVol) * t));
    if(step >= steps){
      clearInterval(id);
      audio.volume = targetVol;
      if(targetVol === 0) audio.pause();
      if(cb) cb();
    }
  }, interval);
  return id;
}

/**
 * Crossfade: fade out outAudio while fading in inAudio over duration ms.
 * inAudio starts at volume 0 and ramps to inVol.
 * outAudio fades from current volume to 0, then pauses.
 * restoreOutVol: volume to restore on outAudio after pause (for reuse).
 */
function audioCrossfade(outAudio, inAudio, inVol, duration, restoreOutVol){
  duration = duration || 1200;
  // Fade out
  if(outAudio && !outAudio.paused){
    var savedVol = restoreOutVol !== undefined ? restoreOutVol : outAudio.volume;
    audioFade(outAudio, 0, duration, function(){
      outAudio.volume = savedVol;
    });
  }
  // Fade in
  if(inAudio){
    inAudio.volume = 0;
    inAudio.play().catch(function(){});
    audioFade(inAudio, inVol, duration);
  }
}

