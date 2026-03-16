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
  panel.innerHTML = '<button class="fp-close-btn" id="fp-close-btn">\u2715</button>'
    + '<div class="footer-panel-inner" id="fp-body">'+html+'</div>';
  var closeBtn = document.getElementById("fp-close-btn");
  if(closeBtn) closeBtn.onclick = function(e){
    e.stopPropagation();
    closeFooterPanel();
  };
}

function closeFooterPanel(){
  var asm = document.getElementById("footer-assembly");
  if(!asm) return;
  asm.classList.add("snapping");
  var travel = window._fpTravel || (window.innerHeight - 100);
  asm.style.transform = "translateY(" + travel + "px)";
  window._fpOpen = false;
  setTimeout(function(){ asm.classList.remove("snapping") }, 450);
  var calBtn = document.getElementById("orb-cal-wrap");
  var wBtn = document.getElementById("orb-weather-wrap");
  if(calBtn) calBtn.classList.remove("active");
  if(wBtn) wBtn.classList.remove("active");
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

