"use strict";

/* ══════════ WIRE PANEL ACTIONS (footer panel) ══════════ */
function wirePanelActions(){
  var body = document.getElementById("fp-body"); if(!body) return;

  var backBtn = document.getElementById("disc-back");
  if(backBtn) backBtn.onclick = function(){
    var codexSections = ["elements","personas","cites","jeux","rebelles"];
    if(codexSections.indexOf(userSection) >= 0 && !selectedPersona && !selectedGame && !selectedElement){
      userSection = "encyclopedie"; setDiamondImage(null,"\ud83d\udcd6"); updateDrawerContent();
    } else {
      selectedPersona=null; selectedGame=null; selectedElement=null; updateDrawerContent();
    }
  };

  var tcgBack = document.getElementById("tcg-back");
  if(tcgBack) tcgBack.onclick = function(){ selectedCard=null; updateDrawerContent() };

  // Elements
  body.querySelectorAll(".element-card").forEach(function(card){
    card.onclick = function(){
      var idx = parseInt(card.getAttribute("data-eidx"));
      if(isNaN(idx) || !elementsData[idx]) return;
      selectedElement = elementsData[idx]; updateDrawerContent();
    };
  });
  body.querySelectorAll(".ency-filter[data-etype]").forEach(function(btn){
    btn.onclick = function(){
      body.querySelectorAll(".ency-filter[data-etype]").forEach(function(x){ x.classList.remove("active") });
      btn.classList.add("active");
      var t = btn.getAttribute("data-etype");
      body.querySelectorAll(".element-card").forEach(function(c){
        var idx = parseInt(c.getAttribute("data-eidx"));
        c.style.display = (t==="all" || elementsData[idx].type===t) ? "" : "none";
      });
    };
  });

  // Games
  body.querySelectorAll(".game-card:not(.locked)").forEach(function(c){
    c.onclick = function(){
      var gid = c.getAttribute("data-gid"); if(!gid) return;
      var g = getGames().find(function(x){ return x.id===gid });
      if(!g) return;
      selectedGame = g;
      if(g.icon) setDiamondImage(g.icon, null);
      updateDrawerContent();
    };
  });
  var playBtn = document.getElementById("dr-game-play");
  if(playBtn && selectedGame && selectedGame.status !== "locked"){
    playBtn.onclick = function(){
      showConfirm("Lancer "+selectedGame.name+" ?", function(){
        if(selectedGame.link) window.location.href = selectedGame.link;
      });
    };
  }

  // Personas
  body.querySelectorAll(".persona-card").forEach(function(c){
    c.onclick = function(){
      var id = c.getAttribute("data-pid"); if(!id) return;
      if(userSection === "equipe"){
        // En mode équipe, clic = ajouter/retirer de l'équipe
        toggleTeam(id);
        return;
      }
      selectedPersona = getPersonaById(id);
      if(selectedPersona && selectedPersona.avatar) setDiamondImage(selectedPersona.avatar, null);
      updateDrawerContent();
    };
  });
  var tb = document.getElementById("dr-team-btn");
  if(tb && selectedPersona) tb.onclick = function(){ toggleTeam(selectedPersona.id) };
  body.querySelectorAll(".ts-slot[data-rm]").forEach(function(sl){
    sl.onclick = function(e){ e.stopPropagation(); var idx=parseInt(sl.getAttribute("data-rm")); teamIds.splice(idx,1); acDB.set("ac_team",JSON.stringify(teamIds)); renderAccueilTeam(); updateDrawerContent() };
  });
  var autoBtn = document.getElementById("ts-auto");
  if(autoBtn) autoBtn.onclick = function(){
    var available = getNonGuidePersonas().filter(function(pe){ return teamIds.indexOf(pe.id)<0 });
    while(teamIds.length<3 && available.length>0){ var r=Math.floor(Math.random()*available.length); teamIds.push(available[r].id); available.splice(r,1) }
    acDB.set("ac_team",JSON.stringify(teamIds)); renderAccueilTeam(); updateDrawerContent();
  };

  // TCG filters
  body.querySelectorAll(".ency-filter[data-cat]").forEach(function(btn){
    btn.onclick = function(){
      body.querySelectorAll(".ency-filter[data-cat]").forEach(function(x){ x.classList.remove("active") });
      btn.classList.add("active");
      var cat = btn.getAttribute("data-cat");
      body.querySelectorAll(".tcg-card").forEach(function(c){
        c.style.display = (cat==="all" || c.getAttribute("data-cat")===cat) ? "" : "none";
      });
    };
  });

  // TCG card clicks
  body.querySelectorAll(".tcg-card").forEach(function(c){
    c.onclick = function(){
      var idx = parseInt(c.getAttribute("data-cidx"));
      if(isNaN(idx) || !allTcgCards[idx]) return;
      selectedCard = allTcgCards[idx]; updateDrawerContent();
    };
  });

  // Campement sub-items → tout dans le tiroir
  body.querySelectorAll(".camp-item").forEach(function(c){
    c.onclick = function(){
      var target = c.getAttribute("data-camp");
      userSection = target;
      selectedCard = null; selectedPersona = null; selectedGame = null; selectedElement = null;
      // Diamond icon
      var iconEl = c.querySelector(".camp-item-icon");
      if(iconEl) setDiamondImage(null, iconEl.textContent.trim());
      updateDrawerContent();
    };
  });

  // Profil interactivity
  wirePanelProfile(body);

  // Inventaire filters + card clicks
  wirePanelInventory(body);

  // Back buttons (retour au campement depuis équipement/inventaire)
  var backEquip = body.querySelector("#equip-back-btn");
  if(backEquip) backEquip.onclick = function(){
    userSection="campement"; setDiamondImage(null,"\u26fa"); updateDrawerContent();
  };
  var backInv = body.querySelector("#inv-back-btn");
  if(backInv) backInv.onclick = function(){
    userSection="campement"; setDiamondImage(null,"\u26fa"); updateDrawerContent();
  };
  var backEquipe = body.querySelector("#equipe-back-btn");
  if(backEquipe) backEquipe.onclick = function(){ userSection="campement"; setDiamondImage(null,"\u26fa"); updateDrawerContent() };
  var backCodex = body.querySelector("#codex-back-btn");
  if(backCodex) backCodex.onclick = function(){ userSection="campement"; setDiamondImage(null,"\u26fa"); updateDrawerContent() };
  var backCampMetier = body.querySelector("#camp-metier-back");
  if(backCampMetier) backCampMetier.onclick = function(){
    userSection="metier";
    var _j = getJobById(loadUser().job);
    if(_j) setDiamondImage(null, _j.icon);
    updateDrawerContent();
  };

  // Profile navigation links
  var gotoInv = body.querySelector("#prof-goto-inv");
  if(gotoInv) gotoInv.onclick = function(){ userSection="equipement"; setDiamondImage(null,"\ud83d\udee1\ufe0f"); updateDrawerContent() };
  var gotoEncy = body.querySelector("#prof-goto-ency");
  if(gotoEncy) gotoEncy.onclick = function(){ userSection="encyclopedie"; setDiamondImage(null,"\ud83c\udccf"); updateDrawerContent() };

  // Reset btn
  var resetBtn = body.querySelector("#prof-reset-btn");
  if(resetBtn) resetBtn.onclick = function(){
    showConfirm("R\u00e9initialiser tout le personnage ? Cette action est irr\u00e9versible.", function(){
      acDB.clear(); location.reload();
    });
  };

  // Close panel buttons (Fermer)
  body.querySelectorAll("#fp-close-panel").forEach(function(btn){
    btn.onclick = function(){ closeFooterPanel(); };
  });

  // Job back → profil
  var backJob = body.querySelector("#job-back-btn");
  if(backJob) backJob.onclick = function(){
    userSection="profil";
    var u = loadUser();
    if(u.avatar) setDiamondImage(u.avatar, null); else setDiamondImage(null,"\ud83d\udc64");
    updateDrawerContent();
  };

  // Taverne back → campement
  var backTaverne = body.querySelector("#taverne-back-btn");
  if(backTaverne) backTaverne.onclick = function(){ userSection="campement"; setDiamondImage(null,"\u26fa"); updateDrawerContent() };

  // Musiques back → campement
  var backMusiques = body.querySelector("#musiques-back-btn");
  if(backMusiques) backMusiques.onclick = function(){ userSection="campement"; setDiamondImage(null,"\u26fa"); updateDrawerContent() };

  // Music player controls
  wireMusicPlayer(body);

  // Generic back → campement (for fusion, etc.)
  var backGeneric = body.querySelector("#generic-back-btn");
  if(backGeneric) backGeneric.onclick = function(){ userSection="campement"; setDiamondImage(null,"\u26fa"); updateDrawerContent() };

  // Taverne persona clicks
  body.querySelectorAll("[data-tavpid]").forEach(function(c){
    c.onclick = function(){
      var id = c.getAttribute("data-tavpid"); if(!id) return;
      selectedPersona = getPersonaById(id);
      if(selectedPersona && selectedPersona.avatar) setDiamondImage(selectedPersona.avatar, null);
      userSection = "personas";
      updateDrawerContent();
    };
  });

  // Region accordion toggle (Découvertes > Cités)
  body.querySelectorAll(".dr-region-header").forEach(function(hdr){
    hdr.onclick = function(){
      var rid = hdr.getAttribute("data-rid");
      var content = body.querySelector('.dr-region-content[data-rid="'+rid+'"]');
      var arrow = hdr.querySelector(".dr-region-arrow");
      if(!content) return;
      var isOpen = content.style.display !== "none";
      // Close all
      body.querySelectorAll(".dr-region-content").forEach(function(c){ c.style.display="none" });
      body.querySelectorAll(".dr-region-arrow").forEach(function(a){ a.style.transform="rotate(0deg)" });
      // Toggle
      if(!isOpen){
        content.style.display = "";
        if(arrow) arrow.style.transform = "rotate(90deg)";
      }
    };
  });

  // Buy border pass buttons (Découvertes > Contrées)
  body.querySelectorAll(".dr-buy-pass").forEach(function(btn){
    btn.onclick = function(e){
      e.stopPropagation();
      var rid = btn.getAttribute("data-buy-region");
      if(rid) buyRegionPass(rid);
    };
  });
}

/* ══════════ WIRE PANEL PROFILE ══════════ */
function wirePanelProfile(body){
  // Avatar upload
  var wrap = body.querySelector("#prof-avatar-wrap");
  var fileUp = body.querySelector("#prof-file-input");
  if(wrap && fileUp){
    wrap.onclick = function(){ fileUp.click() };
    fileUp.onchange = function(){
      var file = fileUp.files[0]; if(!file) return;
      var status = body.querySelector("#prof-save-status");
      if(status) status.innerHTML = '<span style="color:var(--frost)">Chargement\u2026</span>';
      var reader = new FileReader();
      reader.onload = async function(e){
        var ok = await saveAvatar(e.target.result);
        if(status) status.innerHTML = ok
          ? '<span style="color:var(--poison)">\u2714 Portrait sauvegard\u00e9</span>'
          : '<span style="color:var(--blood-glow)">\u2718 Erreur</span>';
        updateOrbLabels(); buildUserPage(); buildInventoryPage(); buildAccueil();
        // Rafraîchir le tiroir
        setTimeout(function(){ userSection="profil"; updateDrawerContent() }, 300);
      };
      reader.readAsDataURL(file);
    };
  }
  // Save button
  var saveBtn = body.querySelector("#prof-save-btn");
  if(saveBtn) saveBtn.onclick = function(){
    var u = loadUser();
    var ni = body.querySelector("#prof-edit-name");
    var ti = body.querySelector("#prof-edit-title");
    var qi = body.querySelector("#prof-edit-quote");
    if(ni) u.name = ni.value;
    if(ti) u.title = ti.value;
    if(qi) u.quote = qi.value;
    saveUser(u);
    var status = body.querySelector("#prof-save-status");
    if(status) status.innerHTML = '<span style="color:var(--poison)">\u2714 Profil sauvegard\u00e9 !</span>';
    buildUserPage(); buildInventoryPage(); buildAccueil();
    setTimeout(function(){ userSection="profil"; updateDrawerContent() }, 300);
    setTimeout(function(){ if(status) status.textContent = "" }, 2000);
  };
  // Color picker
  body.querySelectorAll(".prof-cc").forEach(function(el){
    el.onclick = function(){
      var u = loadUser();
      u.cardColor = el.getAttribute("data-cc");
      saveUser(u);
      body.querySelectorAll(".prof-cc").forEach(function(x){ x.classList.remove("selected") });
      el.classList.add("selected");
      buildUserPage(); buildAccueil();
      setTimeout(function(){ updateDrawerContent() }, 300);
    };
  });
}

/* ══════════ WIRE PANEL INVENTORY ══════════ */
function wirePanelInventory(body){
  // Rarity filters
  body.querySelectorAll(".loot-filter").forEach(function(btn){
    btn.onclick = function(){
      body.querySelectorAll(".loot-filter").forEach(function(x){ x.classList.remove("active") });
      btn.classList.add("active");
      var f = btn.getAttribute("data-lf");
      body.querySelectorAll(".loot-card").forEach(function(c){
        c.style.display = (f==="Tout" || c.getAttribute("data-lrar")===f) ? "" : "none";
      });
    };
  });
  // Card clicks
  body.querySelectorAll(".loot-card").forEach(function(c){
    c.onclick = function(){
      var idx = parseInt(c.getAttribute("data-lidx"));
      if(isNaN(idx) || !elementsData[idx]) return;
      var el = elementsData[idx];
      showModal(el.icon + " " + el.name,
        '<div style="text-align:center;margin-bottom:8px"><span style="font-size:42px">'+el.icon+'</span></div>'
        + '<p style="font-family:var(--font-ui);font-size:10px;color:var(--bone-dim);text-align:center">'+esc(el.type)+' \u2022 '+esc(el.rarity)+'</p>'
        + '<p style="font-size:12px;color:var(--bone-dim);line-height:1.5;margin-top:10px">'+esc(el.desc)+'</p>'
      );
    };
  });
}

/* ══════════ WIRE PANEL WORLDMAP ACTIONS ══════════ */
function wirePanelWorldmapActions(){
  var body = document.getElementById("fp-body"); if(!body) return;
  body.querySelectorAll(".dr-wm-city").forEach(function(el){
    el.onclick = function(){ selectCity(el.getAttribute("data-cid")) };
  });
  initPanelAvatarDrag();
}

/* ══════════ MUSIC PLAYER ══════════ */
function wireMusicPlayer(body){
  var audio = _getMpAudio();

  // Track clicks
  body.querySelectorAll(".mp-track").forEach(function(el){
    el.onclick = function(){
      var idx = parseInt(el.getAttribute("data-midx"));
      if(isNaN(idx) || !MUSIC_TRACKS[idx]) return;
      _mpPlayTrack(MUSIC_TRACKS[idx]);
    };
  });

  // Play/pause
  var playBtn = body.querySelector("#mp-play");
  if(playBtn) playBtn.onclick = function(){
    if(!_mpCurrentTrack){
      _mpPlayTrack(MUSIC_TRACKS[0]);
      return;
    }
    if(_mpPlaying){
      audio.pause();
      _mpPlaying = false;
    } else {
      audio.play().catch(function(){});
      _mpPlaying = true;
    }
    updateDrawerContent();
  };

  // Prev / Next
  var prevBtn = body.querySelector("#mp-prev");
  var nextBtn = body.querySelector("#mp-next");
  if(prevBtn) prevBtn.onclick = function(){ _mpSkip(-1); };
  if(nextBtn) nextBtn.onclick = function(){ _mpSkip(1); };

  // Progress bar seek
  var progWrap = body.querySelector("#mp-progress-wrap");
  if(progWrap) progWrap.onclick = function(e){
    if(!audio.duration) return;
    var rect = progWrap.getBoundingClientRect();
    var pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  };

  // Update progress bar
  _mpStartProgressUpdate();
}

function _mpPlayTrack(track){
  var audio = _getMpAudio();
  // Stop any other site audio
  ["bg-music","ic-music","guide-music"].forEach(function(id){
    var a = document.getElementById(id);
    if(a && !a.paused) a.pause();
  });
  _mpCurrentTrack = track;
  audio.src = track.src;
  audio.volume = 0.5;
  audio.loop = false;
  audio.play().catch(function(){});
  _mpPlaying = true;
  // Auto next on end
  audio.onended = function(){ _mpSkip(1); };
  updateDrawerContent();
}

function _mpSkip(dir){
  if(!_mpCurrentTrack) return;
  var idx = -1;
  MUSIC_TRACKS.forEach(function(t,i){ if(t.id === _mpCurrentTrack.id) idx = i; });
  idx += dir;
  if(idx < 0) idx = MUSIC_TRACKS.length - 1;
  if(idx >= MUSIC_TRACKS.length) idx = 0;
  _mpPlayTrack(MUSIC_TRACKS[idx]);
}

var _mpProgressTimer = null;
function _mpStartProgressUpdate(){
  if(_mpProgressTimer) clearInterval(_mpProgressTimer);
  _mpProgressTimer = setInterval(function(){
    var bar = document.getElementById("mp-progress-bar");
    var audio = _mpAudio;
    if(!bar || !audio || !audio.duration) return;
    var pct = (audio.currentTime / audio.duration) * 100;
    bar.style.width = pct + "%";
  }, 300);
}

