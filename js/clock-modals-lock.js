"use strict";

/* ══════════ CLOCK + DAY/NIGHT CYCLE ══════════ */
function initClock(){
  var J = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
  var M = ["Janvier","F\u00e9vrier","Mars","Avril","Mai","Juin","Juillet","Ao\u00fbt","Septembre","Octobre","Novembre","D\u00e9cembre"];
  function u(){
    var n = new Date();
    var el = $("#header-time");
    if(el) el.textContent = String(n.getHours()).padStart(2,"0")+":"+String(n.getMinutes()).padStart(2,"0")+":"+String(n.getSeconds()).padStart(2,"0");
    var d = $("#header-date");
    if(d) d.textContent = J[n.getDay()]+" "+n.getDate()+" "+M[n.getMonth()]+" "+n.getFullYear();
    updateDayNight(n.getHours());
  }
  u(); setInterval(u, 1000);
}

function updateDayNight(hour){
  var jour = document.getElementById("bg-decor-jour");
  var nuit = document.getElementById("bg-decor-nuit");
  if(!jour || !nuit) return;
  // Jour: 7h–21h / Nuit: 21h–7h
  var isDay = (hour >= 7 && hour < 21);
  jour.classList.toggle("active", isDay);
  nuit.classList.toggle("active", !isDay);
}

/* ══════════ MODALS ══════════ */
function showModal(title, contentHtml){
  var ov = $("#modal-overlay"), box = $("#modal-content"), cl = $("#modal-close");
  if(!ov || !box) return;
  box.innerHTML = '<h3 style="font-family:var(--font-heading);font-size:14px;font-weight:700;margin-bottom:12px;text-align:center;color:var(--gold-light)">'+title+'</h3>'+contentHtml;
  ov.style.display = "flex";
  if(cl) cl.onclick = function(){ ov.style.display="none" };
  ov.onclick = function(e){ if(e.target===ov) ov.style.display="none" };
}

function showConfirm(txt, onY, onN){
  var ov = $("#confirm-overlay"), te = $("#confirm-text"), yb = $("#confirm-yes"), nb = $("#confirm-no");
  if(!ov) return; te.textContent = txt; ov.style.display = "flex";
  function cl(){ ov.style.display="none"; yb.onclick=null; nb.onclick=null }
  yb.onclick = function(){ cl(); if(onY) onY() };
  nb.onclick = function(){ cl(); if(onN) onN() };
}

/* ══════════ LOCK SCREEN ══════════ */
function initLock(){
  var lk = $("#lock-screen"), ho = $("#lock-hole"), gi = $("#lock-guide");
  if(!lk || !ho || !gi) return;

  // If already unlocked, skip
  if(acDB.get("ac_unlocked") === "1"){
    lk.remove();
    checkCharCreate();
    return;
  }

  // Set guide avatar image
  var guide = getGuidePersona();
  var giImg = document.getElementById("lock-guide-img");
  if(guide && guide.avatar && giImg) giImg.src = guide.avatar;

  // Place guide at random position (not in the circle)
  function randomizeGuidePos(){
    var lkRect = lk.getBoundingClientRect();
    var hoRect = ho.getBoundingClientRect();
    var hoCx = hoRect.left + hoRect.width/2 - lkRect.left;
    var hoCy = hoRect.top + hoRect.height/2 - lkRect.top;
    var gx, gy, attempts = 0;
    do {
      gx = 60 + Math.random() * (lkRect.width - 120);
      gy = 80 + Math.random() * (lkRect.height - 160);
      attempts++;
    } while(Math.hypot(gx - hoCx, gy - hoCy) < 120 && attempts < 50);
    gi.style.left = Math.round(gx) + "px";
    gi.style.top = Math.round(gy) + "px";
  }

  var unlocked = false, TOL = 45;

  function gc(el){ var r=el.getBoundingClientRect(); return{x:r.left+r.width/2,y:r.top+r.height/2} }
  function sp(x,y){
    var r=lk.getBoundingClientRect();
    var w=gi.offsetWidth, h=gi.offsetHeight;
    gi.style.left = Math.round(Math.max(w/2, Math.min(r.width-w/2, x-r.left)))+"px";
    gi.style.top = Math.round(Math.max(h/2, Math.min(r.height-h/2, y-r.top)))+"px";
    gi.style.transform = "translate(-50%,-50%)";
  }
  function aligned(){ var c=gc(gi),h=gc(ho); return Math.hypot(c.x-h.x,c.y-h.y)<=TOL }
  function tryUnlock(){
    if(unlocked || !aligned()) return; unlocked=true;
    var hc=gc(ho); sp(hc.x,hc.y);
    gi.classList.remove("dragging"); gi.classList.add("awakened");
    var label = gi.querySelector(".lock-guide-label");
    if(label) label.textContent = "Éveillé";

    // 1. Pulse
    var ring=document.createElement("div"); ring.className="pulse-ring"; gi.appendChild(ring); setTimeout(function(){ring.remove()},600);

    // Préparer : cacher portrait et titre du charcreate
    var ccPortrait = document.getElementById("cc-guide-portrait");
    var ccTitle = document.getElementById("cc-guide-title");
    if(ccPortrait) ccPortrait.style.visibility = "hidden";
    if(ccTitle) { ccTitle.style.opacity = "0"; ccTitle.style.transition = "none" }

    // 2. Guide image fills the hole
    setTimeout(function(){
      var rune = ho.querySelector(".hole-rune");
      if(rune) rune.style.display = "none";
    }, 400);

    // 3. Fade texts and logo
    var lockContent = document.getElementById("lock-content");
    var logoFixed = document.getElementById("lock-logo-fixed");
    if(lockContent) setTimeout(function(){ lockContent.style.transition = "opacity .4s"; lockContent.style.opacity = "0" }, 600);
    if(logoFixed) setTimeout(function(){ logoFixed.style.transition = "opacity .5s"; logoFixed.style.opacity = "0" }, 500);

    // 4. Extract hole, animate to char create
    setTimeout(function(){
      var hoRect = ho.getBoundingClientRect();
      var startX = hoRect.left + hoRect.width/2;
      var startY = hoRect.top + hoRect.height/2;
      var screenEl = document.querySelector(".screen");
      if(!screenEl) return;
      gi.remove(); // Remove guide drag element
      ho.remove();
      screenEl.appendChild(ho);
      ho.style.position = "fixed";
      ho.style.left = startX + "px";
      ho.style.top = startY + "px";
      ho.style.bottom = "auto";
      ho.style.transform = "translate(-50%,-50%)";
      ho.style.zIndex = "9999";
      ho.style.transition = "none";

      // Re-add guide avatar into hole
      if(guide && guide.avatar){
        var avImg = document.createElement("img");
        avImg.src = guide.avatar;
        avImg.style.cssText = "width:100px;height:100px;border-radius:50%;object-fit:cover;position:absolute";
        ho.appendChild(avImg);
      }

      lk.style.transition = "opacity .6s ease";
      lk.style.opacity = "0";
      var particles = lk.querySelector(".lock-particles");
      if(particles){ particles.style.transition = "opacity .3s"; particles.style.opacity = "0" }

      setTimeout(function(){
        if(ccPortrait){ ccPortrait.style.visibility = "visible"; ccPortrait.style.opacity = "0" }
        var targetRect = ccPortrait ? ccPortrait.getBoundingClientRect() : null;
        var targetX = targetRect ? targetRect.left + targetRect.width/2 : window.innerWidth/2;
        var targetY = targetRect ? targetRect.top + targetRect.height/2 : 90;
        if(ccPortrait) ccPortrait.style.visibility = "hidden";
        ho.style.transition = "left 1s cubic-bezier(.4,0,.2,1), top 1s cubic-bezier(.4,0,.2,1), box-shadow .8s ease";
        ho.style.left = targetX + "px";
        ho.style.top = targetY + "px";
      }, 100);

      setTimeout(function(){ lk.remove() }, 700);

      setTimeout(function(){
        acDB.set("ac_unlocked","1");
        if(ccPortrait){ ccPortrait.style.visibility = "visible"; ccPortrait.style.transition = "opacity .3s"; ccPortrait.style.opacity = "1" }
        ho.style.transition = "opacity .3s"; ho.style.opacity = "0";
        setTimeout(function(){ ho.remove() }, 350);
        if(ccTitle){ ccTitle.style.transition = "opacity .5s ease .15s"; ccTitle.style.opacity = "1" }
        checkCharCreate();
      }, 1200);
    }, 1200);
  }

  // Drag the guide icon
  (function(){
    var isDrag=false, isTouch=false, off={x:0,y:0};
    function gxy(e){ if(e.clientX!=null) return{x:e.clientX,y:e.clientY}; var t=(e.touches&&e.touches[0])||(e.changedTouches&&e.changedTouches[0]); return t?{x:t.clientX,y:t.clientY}:{x:0,y:0} }
    function onS(e,tp){
      e.preventDefault(); e.stopPropagation();
      if(tp==="mouse" && isTouch) return;
      var c=gc(gi),p=gxy(e); off.x=c.x-p.x; off.y=c.y-p.y;
      isDrag=true; gi.classList.add("dragging");
      var label = gi.querySelector(".lock-guide-label");
      if(label) label.textContent = "Réveillé !";
      var mv=tp==="pointer"?"pointermove":tp==="touch"?"touchmove":"mousemove";
      var ends=tp==="pointer"?["pointerup","pointercancel"]:tp==="touch"?["touchend","touchcancel"]:["mouseup"];
      function onM(e){ if(!isDrag) return; e.preventDefault(); var p=gxy(e); sp(p.x+off.x,p.y+off.y) }
      function onE(){
        if(!isDrag) return; isDrag=false; gi.classList.remove("dragging");
        var label = gi.querySelector(".lock-guide-label");
        if(label && !unlocked) label.textContent = "Endormi";
        tryUnlock();
        document.removeEventListener(mv,onM);
        ends.forEach(function(ev){ document.removeEventListener(ev,onE) });
        if(tp==="touch") setTimeout(function(){isTouch=false},0);
      }
      document.addEventListener(mv,onM,{passive:false});
      ends.forEach(function(ev){ document.addEventListener(ev,onE,{passive:true}) });
    }
    gi.addEventListener("pointerdown",function(e){onS(e,"pointer")},{passive:false});
    gi.addEventListener("touchstart",function(e){isTouch=true;onS(e,"touch")},{passive:false});
    gi.addEventListener("mousedown",function(e){onS(e,"mouse")},{passive:false});
  })();

  window.addEventListener("load",function(){ randomizeGuidePos() });
  // Also set immediately in case load already fired
  setTimeout(randomizeGuidePos, 100);
}

/* ══════════ CHARACTER CREATION GATE ══════════ */
function checkCharCreate(){
  // Always show the intro screen with New / Resume choices
  initCharCreate();
}
