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

/* ══════════ LOCK SCREEN INFO (per-scenario) ══════════ */
var LOCK_INFOS = {
  "champion": [
    { title: "Briefing officiel — Champion désigné",
      sub: "Groupe Morkar — Communication",
      body: "Félicitations, Champion. Vous avez été désigné par votre planète pour la représenter lors de la 47e édition " +
        "du Tournoi d'Extelua. En tant que candidat officiel du Réseau Universel, vous bénéficiez du soutien logistique " +
        "complet du groupe Morkar : transport via les Routes Sillonnées, hébergement dans les quartiers réservés aux " +
        "champions, et accès aux centres d'entraînement pré-tournoi. Votre planète compte sur vous. Des milliards de " +
        "spectateurs suivront votre parcours en direct. Rappelez-vous : vous ne vous battez pas seulement pour vous, " +
        "mais pour l'honneur et l'avenir de votre monde. Le groupe Morkar vous souhaite bonne chance et reste à votre " +
        "disposition pour toute question relative au règlement et au déroulement des épreuves."
    },
    { title: "Dossier des adversaires — Aperçu",
      sub: "Groupe Morkar — Renseignement sportif",
      body: "Comme pour chaque édition, le groupe Morkar met à disposition des champions connectés un dossier préliminaire " +
        "sur les autres candidats. Cette année, 30 champions représentent les planètes du Réseau — parmi eux, plusieurs " +
        "athlètes de haut niveau, deux anciens finalistes du Cycle 45, et un scientifique de la planète Veruhn dont les " +
        "capacités analytiques sont jugées exceptionnelles. Les 10 isolés des planètes coupées du Réseau sont, comme d'habitude, " +
        "des profils inconnus. Morkar rappelle que malgré leur inexpérience, certains isolés ont atteint les phases " +
        "avancées lors des éditions précédentes. Ne sous-estimez personne. Les dossiers complets seront accessibles après " +
        "la cérémonie d'ouverture."
    }
  ],
  "lambda": [
    { title: "Message de bienvenue — Isolé",
      sub: "Groupe Morkar — Relations extérieures",
      body: "Bienvenue, Isolé. Vous avez été sélectionné par nos éclaireurs parmi les habitants de votre planète pour " +
        "participer à un événement qui dépasse tout ce que vous avez pu connaître jusqu'ici. Le Tournoi d'Extelua est " +
        "la plus grande compétition de l'univers connu. Pendant quinze lunes, vous affronterez d'autres candidats venus " +
        "de mondes très différents du vôtre. Nous comprenons que cette situation peut être déstabilisante. C'est pourquoi " +
        "le groupe Morkar a mis en place un programme d'accompagnement spécifique pour les isolés des planètes coupées du Réseau. " +
        "Un guide vous sera assigné pour vous aider à comprendre les règles, les technologies et les enjeux du Tournoi. " +
        "Votre monde mérite cette chance. Saisissez-la."
    },
    { title: "Note d'information — Ce qui vous attend",
      sub: "Groupe Morkar — Protocole isolé",
      body: "En tant qu'isolé d'une planète non connectée au Réseau Universel, vous découvrirez des technologies, " +
        "des civilisations et des modes de vie radicalement différents de ce que vous connaissez. Ne vous laissez pas " +
        "intimider. Les épreuves du Tournoi ne sont pas uniquement physiques — elles testent aussi l'intelligence, " +
        "l'adaptabilité et la capacité à forger des alliances. Ce sont des qualités que les habitants des mondes isolés " +
        "possèdent souvent en abondance. Sur les 46 éditions précédentes, des isolés ont régulièrement surpris les " +
        "pronostics en atteignant les phases intermédiaires. La récompense pour le vainqueur est l'intégration totale de " +
        "sa planète d'origine au Réseau Universel. Pour votre monde, cela signifierait l'accès aux Routes Sillonnées, " +
        "aux technologies médicales avancées et à un siège au Conseil des Mondes."
    }
  ],
  "apprenti-morkar": [
    { title: "Ordre de mission — Recrue",
      sub: "Groupe Morkar — Division interne",
      body: "Agent, votre intégration au programme Morkar est effective. Vous participez au Tournoi en tant que champion " +
        "officiel de votre planète, mais votre mission va au-delà de la compétition. Le renseignement interne de Morkar " +
        "a détecté des signaux indiquant qu'un ou plusieurs éléments dissidents pourraient tenter de s'infiltrer dans " +
        "cette édition, comme cela s'est produit lors des Cycles 39 et 44. Votre rôle est d'observer, d'écouter et de " +
        "repérer tout comportement suspect parmi les candidats — champions comme isolés. Vous devez maintenir votre " +
        "couverture de champion ordinaire en toutes circonstances. Si vous identifiez un dissident potentiel, transmettez " +
        "l'information via le canal sécurisé qui vous a été communiqué lors de votre briefing. En cas de succès, la " +
        "récompense d'intégration sera garantie pour votre monde, indépendamment de votre classement dans le Tournoi."
    },
    { title: "Profil des menaces — Dissidence",
      sub: "Groupe Morkar — Renseignement",
      body: "Les éléments dissidents sont des individus ou des réseaux organisés qui s'opposent au système mis en place " +
        "par le groupe Morkar. Leurs motivations sont variées : certains croient que le Tournoi est truqué, d'autres " +
        "remettent en question la légitimité de Morkar à organiser l'événement. Lors du Cycle 39, un dissident infiltré " +
        "parmi les champions a tenté de diffuser un message pirate pendant une retransmission en direct. L'incident a été " +
        "contenu. Lors du Cycle 44, deux agents présumés ont été identifiés parmi les isolés — l'un d'eux avait " +
        "falsifié son origine planétaire. Les dissidents sont généralement bien préparés et difficiles à détecter. " +
        "Méfiez-vous des candidats qui posent trop de questions sur le fonctionnement interne de Morkar, qui cherchent " +
        "à accéder à des zones restreintes, ou qui tissent des alliances inhabituelles. Tout détail peut être significatif."
    }
  ],
  "veteran-morkar": [
    { title: "Directive opérationnelle — Vétéran",
      sub: "Groupe Morkar — Commandement",
      body: "Agent confirmé, vous connaissez la procédure. Le Cycle 47 présente un niveau de menace élevé selon nos " +
        "analystes. Les réseaux dissidents ont été plus actifs que jamais ces derniers mois — communications interceptées, " +
        "mouvements suspects dans les secteurs non régulés, tentatives de contact avec d'anciens candidats. Nous pensons " +
        "qu'une infiltration est non seulement probable, mais planifiée à grande échelle. Votre expérience des éditions " +
        "précédentes est un atout majeur. Vous avez carte blanche pour mener vos investigations comme vous l'entendez, " +
        "dans les limites du règlement visible. Les candidats ne doivent pas soupçonner votre véritable rôle. En cas " +
        "d'identification formelle d'un dissident, vous êtes autorisé à prendre les mesures nécessaires pour neutraliser " +
        "la menace avant qu'elle ne compromette la retransmission."
    },
    { title: "Rapport classifié — Éditions précédentes",
      sub: "Groupe Morkar — Archives",
      body: "Pour mémoire : sur les 10 dernières éditions, 7 infiltrations dissidentes ont été confirmées. Dans 4 cas, " +
        "les agents se sont fait passer pour des champions ordinaires. Dans 2 cas, ils se sont infiltrés via le programme " +
        "isolé en falsifiant leur origine planétaire. Le dernier cas, lors du Cycle 44, impliquait un ancien employé " +
        "de Morkar retourné. Les méthodes évoluent. Les dissidents ne se contentent plus de saboter les épreuves — " +
        "ils cherchent désormais à collecter des preuves sur le fonctionnement interne du Tournoi pour les diffuser " +
        "publiquement. C'est cette menace informationnelle qui constitue le risque principal. La récompense promise aux " +
        "vainqueurs, les conditions d'intégration au Réseau, les critères de sélection des isolés — autant de sujets " +
        "sensibles que les dissidents cherchent à exposer. Votre mission est de vous assurer que cela n'arrive pas."
    }
  ]
};

function populateLockInfoZone(){
  var zone = document.getElementById("lock-info-zone");
  if(!zone) return;
  zone.innerHTML = "";

  var scenario = window._chosenScenario;
  if(!scenario) return;

  // Determine which infos to show
  var infos = [];
  var isDissident = (scenario === "rebelle");
  var origin = window._scOriginType; // "champion" or "isole"

  if(isDissident){
    // Dissident gets same infos as their cover identity + journal
    var coverKey = (origin === "isole") ? "lambda" : "champion";
    infos = (LOCK_INFOS[coverKey] || []).slice();
  } else {
    infos = (LOCK_INFOS[scenario] || []).slice();
  }

  if(infos.length === 0) return;

  // Label
  var label = document.createElement("div");
  label.className = "lock-info-label";
  label.textContent = "Informations envoyées par le groupe Morkar";
  zone.appendChild(label);

  // Buttons
  infos.forEach(function(info){
    var btn = document.createElement("button");
    btn.className = "lock-info-btn";
    btn.innerHTML =
      '<span class="lock-info-btn-title">' + info.title + '</span>' +
      '<span class="lock-info-btn-sub">' + info.sub + '</span>';
    btn.onclick = function(){ showLockInfoModal(info.title, info.body); };
    zone.appendChild(btn);
  });

  // Dissident gets the journal as 3rd info
  if(isDissident){
    var journalBtn = document.createElement("button");
    journalBtn.className = "lock-info-btn";
    journalBtn.innerHTML =
      '<span class="lock-info-btn-title">L\'Écho des Sillons — Édition spéciale</span>' +
      '<span class="lock-info-btn-sub">Journal indépendant — Diffusion restreinte</span>';
    journalBtn.onclick = function(){ showJournalArticle(); };
    zone.appendChild(journalBtn);
  }
}

function showLockInfoModal(title, body){
  var existing = document.getElementById("lock-info-modal");
  if(existing) existing.remove();

  var overlay = document.createElement("div");
  overlay.id = "lock-info-modal";
  overlay.className = "ic-modal-overlay";
  overlay.innerHTML =
    '<div class="ic-modal">' +
      '<div class="ic-modal-header">' +
        '<span class="ic-modal-logo">\u25C6</span>' +
        '<span class="ic-modal-title">' + title + '</span>' +
      '</div>' +
      '<div class="ic-modal-body"><p>' + body + '</p></div>' +
      '<button class="ic-modal-close" id="lock-info-close">Fermer</button>' +
    '</div>';

  var lk = document.getElementById("lock-screen");
  (lk || document.body).appendChild(overlay);
  setTimeout(function(){ overlay.classList.add("visible"); }, 20);

  document.getElementById("lock-info-close").onclick = function(){
    overlay.classList.remove("visible");
    setTimeout(function(){ overlay.remove(); }, 400);
  };
}

/* ══════════ LOCK SCREEN ══════════ */
function initLock(){
  var lk = $("#lock-screen"), ho = $("#lock-hole"), gi = $("#lock-guide");
  if(!lk || !ho || !gi) return;

  // Reset unlocked state so lock screen always plays
  acDB.set("ac_unlocked", "0");

  // Set guide avatar image
  var guide = getGuidePersona();
  var giImg = document.getElementById("lock-guide-img");
  if(guide && guide.avatar && giImg) giImg.src = guide.avatar;

  // Populate per-scenario info buttons
  populateLockInfoZone();

  // Fade out intro crawl music when arriving on lock screen
  var icAudio = document.getElementById("ic-music");
  if(icAudio && !icAudio.paused){
    audioFade(icAudio, 0, 1500, function(){ icAudio.pause(); icAudio.volume = 0.5; });
  }

  // Scenario music already started during scenario choice — keep it playing
  // Only start if not already playing (e.g. resume voyage with no scenario step)
  var _lockMusicStarted = false;
  function startExteluaMusic(){
    if(_lockMusicStarted) return;
    _lockMusicStarted = true;
    var extAudio = document.getElementById("extelua-music");
    if(!extAudio) return;
    // Already playing from scenario choice? Leave it.
    if(!extAudio.paused) return;
    var bgAudio = document.getElementById("bg-music");
    if(bgAudio && !bgAudio.paused){
      audioCrossfade(bgAudio, extAudio, 0.4, 2000, 0.4);
    } else {
      extAudio.currentTime = 0;
      extAudio.volume = 0;
      extAudio.play().catch(function(){});
      audioFade(extAudio, 0.4, 2000);
    }
  }

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
    if(label) label.textContent = "\u00c9veill\u00e9";

    // 1. Pulse
    var ring=document.createElement("div"); ring.className="pulse-ring"; gi.appendChild(ring); setTimeout(function(){ring.remove()},600);

    // Check intro mode
    var mode = window._introMode || "new";

    if(mode === "resume"){
      // Resume: shorter animation, then resume intro
      var lockContent = document.getElementById("lock-content");
      var logoFixed = document.getElementById("lock-logo-fixed");
      if(lockContent) setTimeout(function(){ lockContent.style.transition = "opacity .4s"; lockContent.style.opacity = "0" }, 400);
      if(logoFixed) setTimeout(function(){ logoFixed.style.transition = "opacity .4s"; logoFixed.style.opacity = "0" }, 300);

      setTimeout(function(){
        lk.style.transition = "opacity .6s ease";
        lk.style.opacity = "0";
        var particles = lk.querySelector(".lock-particles");
        if(particles){ particles.style.transition = "opacity .3s"; particles.style.opacity = "0" }
      }, 800);

      setTimeout(function(){ lk.remove() }, 1400);

      setTimeout(function(){
        acDB.set("ac_unlocked","1");
        showResumeIntro();
      }, 1500);
      return;
    }

    // New voyage: full animation to char create
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
      startExteluaMusic();
      var label = gi.querySelector(".lock-guide-label");
      if(label) label.textContent = "R\u00e9veill\u00e9 !";
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
  // For new voyage, always start fresh char creation (skip the choice phase)
  initCharCreateNewVoyage();
}
