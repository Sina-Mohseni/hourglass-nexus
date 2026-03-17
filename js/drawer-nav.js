"use strict";

/* ══════════ DRAWER ══════════ */
function initDrawer(){
  var handle = document.getElementById("drawer-handle");
  var bk = document.getElementById("drawer-backdrop");
  if(handle) handle.onclick = function(){ closeDrawerPanel() };
  if(bk) bk.onclick = function(){ closeDrawerPanel() };
}

function openDrawerPanel(){
  var drawer = document.getElementById("drawer"); if(!drawer) return;
  var bk = document.getElementById("drawer-backdrop");
  drawer.classList.add("open");
  if(bk) bk.classList.add("visible");
  drawerOpen = true;
  updateDrawerContent();
}

function closeDrawerPanel(){
  var drawer = document.getElementById("drawer"); if(!drawer) return;
  var bk = document.getElementById("drawer-backdrop");
  drawer.classList.remove("open");
  if(bk) bk.classList.remove("visible");
  drawerOpen = false;
}

function updateDrawerContent(){
  /* Tout le contenu va dans le bloc tiroir du footer (fp-body) */
  var html = '';
  if(curPage === "accueil") html = buildDrawerAccueil();
  else if(curPage === "user") html = buildDrawerUserSection();
  else if(curPage === "worldmap") html = buildDrawerWorldmap();
  else if(curPage === "inventory") html = '<div class="dr-concept"><h3>🎒 Inventaire</h3><p>G\u00e9rez votre \u00e9quipement depuis la page inventaire.</p></div>';
  else if(curPage === "profile") html = '<div class="dr-concept"><h3>👤 Profil</h3><p>Modifiez votre personnage directement sur cette page.</p></div>';
  else if(curPage === "guild") html = '<div class="dr-concept"><h3>🏰 Guilde</h3><p>Gérez votre guilde, consultez les personas et visitez la taverne.</p></div>';

  // Set dans le footer panel (pas d'ouverture auto)
  setFooterPanelContent(html);

  // Wire toutes les actions interactives dans le fp-body
  wirePanelActions();
  if(curPage === "worldmap") wirePanelWorldmapActions();
}

function buildDrawerAccueil(){
  return '<div class="dr-concept">'
    + '<h3>\u2726 Le Sanctuaire</h3>'
    + '<p><strong>Hourglass Nexus</strong> est un portail immersif qui r\u00e9unit des exp\u00e9riences narratives et ludiques au sein d\'un univers partag\u00e9.</p>'
    + '<p>Explorez l\'<strong>Encyclop\u00e9die TCG</strong>, affrontez des personas dans les <strong>Jeux du Nexus</strong>, et parcourez la <strong>Carte du Monde</strong>.</p>'
    + '<p style="color:var(--gold-light);font-weight:600;margin-top:8px">Forg\u00e9 dans les abysses de Kael-Norath par Elrand Avicenna.</p>'
    + '</div>';
}

function buildDrawerWorldmap(){
  var cities = getCities();

  if(!currentCityId){
    var h = '<div class="dr-wm-desc"><h3>🌍 Extelua</h3>'
      + '<p>La carte du monde s\'\u00e9tend devant vous. S\u00e9lectionnez une cit\u00e9 pour vous y rendre.</p>'
      + '<div class="dr-wm-cities">';
    cities.forEach(function(c){
      h += '<div class="dr-wm-city" data-cid="'+esc(c.id)+'">'
        + '<div class="dr-wm-city-dot" style="background:'+esc(c.color)+'">🏙️</div>'
        + '<div class="dr-wm-city-info"><div class="dr-wm-city-name">'+esc(c.name)+'</div>'
        + '<div class="dr-wm-city-desc">'+esc(c.desc)+'</div></div></div>';
    });
    h += '</div></div>'; return h;
  }

  var city = cities.find(function(c){ return c.id === currentCityId });
  if(!city) return '';
  var region = getRegionById(city.region);
  var locs = getLocations().filter(function(l){ return l.city === city.id });
  var u = loadUser(), avSrc = u.avatar || "";
  var mapBg = city.mapBg || "assets/map.jpg";

  var h = '<div class="dr-wm-desc"><h3 style="color:'+esc(city.color)+'">'+esc(city.name)+'</h3>'
    + (region ? '<div style="font-size:9px;color:'+esc(region.color)+';margin:-4px 0 6px;opacity:.7">🌍 '+esc(region.name)+' — '+esc(region.desc)+'</div>' : '')
    + '<p>'+esc(city.desc)+'</p></div>';
  h += '<div class="dr-citymap" id="dr-citymap">'
    + '<img class="map-bg-img" src="'+esc(mapBg)+'">'
    + '<div class="map-overlay"></div>';
  locs.forEach(function(l){
    h += '<div class="dr-map-loc" data-lid="'+esc(l.id)+'" style="left:'+l.x+'%;top:'+l.y+'%">'
      + '<div class="dr-map-loc-icon" style="background:'+esc(l.color)+'">'+l.icon+'</div>'
      + '<div class="dr-map-loc-name">'+esc(l.name)+'</div></div>';
  });
  var posKey = "ac_map_"+city.id;
  var savedPos = acDB.get(posKey), ux, uy;
  if(savedPos){ try{var sp=JSON.parse(savedPos);ux=sp.x;uy=sp.y}catch(e){ux=50;uy=50} }
  else { ux=locs.length>0?locs[0].x:50; uy=locs.length>0?locs[0].y:50 }
  h += '<div class="dr-map-avatar" id="dr-map-avatar" style="left:'+ux+'%;top:'+uy+'%">';
  if(avSrc) h += '<img src="'+esc(avSrc)+'">'; else h += '<div class="ma-emoji">👤</div>';
  h += '</div></div>';
  h += '<div id="dr-loc-banner-area"></div>';
  return h;
}

function wireDrawerWorldmapActions(){
  /* Legacy — redirigé vers wirePanelWorldmapActions */
  wirePanelWorldmapActions();
}

var SNAP_DIST = 12;
function initPanelAvatarDrag(){
  var body = document.getElementById("fp-body"); if(!body) return;
  var avatar = body.querySelector(".dr-map-avatar");
  var mapEl = body.querySelector(".dr-citymap");
  if(!avatar || !mapEl) return;
  var isDrag=false, startX=0, startY=0, origLeft=0, origTop=0;

  function getTouch(e){ var t=e.touches?e.touches[0]:e; return{x:t.clientX,y:t.clientY} }
  function onStart(e){
    e.preventDefault(); e.stopPropagation(); isDrag=true; avatar.classList.add("dragging");
    var t=getTouch(e); startX=t.x; startY=t.y;
    origLeft=parseFloat(avatar.style.left); origTop=parseFloat(avatar.style.top);
    activeLocId=null; acDB.set("ac_activeLoc","");
    var ba = document.getElementById("dr-loc-banner-area"); if(ba) ba.innerHTML="";
    document.addEventListener("touchmove",onMove,{passive:false});
    document.addEventListener("touchend",onEnd,{passive:true});
    document.addEventListener("mousemove",onMove);
    document.addEventListener("mouseup",onEnd);
  }
  function onMove(e){
    if(!isDrag) return; e.preventDefault();
    var t=getTouch(e), rect=mapEl.getBoundingClientRect();
    var dx=((t.x-startX)/rect.width)*100, dy=((t.y-startY)/rect.height)*100;
    avatar.style.left=Math.max(5,Math.min(95,origLeft+dx))+"%";
    avatar.style.top=Math.max(5,Math.min(95,origTop+dy))+"%";
  }
  function onEnd(){
    if(!isDrag) return; isDrag=false; avatar.classList.remove("dragging");
    var fx=parseFloat(avatar.style.left), fy=parseFloat(avatar.style.top);
    var locs=getLocations().filter(function(l){return l.city===currentCityId});
    var nearest=null, minDist=Infinity;
    locs.forEach(function(l){ var d=Math.hypot(fx-l.x,fy-l.y); if(d<minDist){minDist=d;nearest=l} });
    if(nearest && minDist<SNAP_DIST){
      avatar.style.left=nearest.x+"%"; avatar.style.top=nearest.y+"%";
      fx=nearest.x; fy=nearest.y;
      activeLocId=nearest.id; acDB.set("ac_activeLoc",nearest.id);
      showLocBanner(nearest);
    }
    if(currentCityId) acDB.set("ac_map_"+currentCityId,JSON.stringify({x:fx,y:fy}));
    document.removeEventListener("touchmove",onMove);
    document.removeEventListener("touchend",onEnd);
    document.removeEventListener("mousemove",onMove);
    document.removeEventListener("mouseup",onEnd);
  }

  avatar.addEventListener("touchstart",onStart,{passive:false});
  avatar.addEventListener("mousedown",onStart);

  var fx=parseFloat(avatar.style.left), fy=parseFloat(avatar.style.top);
  var locs=getLocations().filter(function(l){return l.city===currentCityId});
  locs.forEach(function(l){ if(Math.hypot(fx-l.x,fy-l.y)<SNAP_DIST){ activeLocId=l.id; acDB.set("ac_activeLoc",l.id); showLocBanner(l) } });
}

function showLocBanner(loc){
  var body = document.getElementById("fp-body");
  var area = body ? body.querySelector("#dr-loc-banner-area") : document.getElementById("dr-loc-banner-area");
  if(!area) return;
  area.innerHTML = '<div class="dr-loc-banner" id="dr-loc-enter">'
    + '<div class="dr-loc-banner-icon" style="background:'+esc(loc.color)+'">'+loc.icon+'</div>'
    + '<div class="dr-loc-banner-info"><div class="dr-loc-banner-name">'+esc(loc.name)+'</div>'
    + '<div class="dr-loc-banner-desc">'+esc((loc.features||[]).join(" \u2022 "))+'</div></div>'
    + '<span class="dr-loc-banner-arrow">\u203a</span></div>';
  var enterBtn = document.getElementById("dr-loc-enter");
  if(enterBtn) enterBtn.onclick = function(){
    showConfirm("Entrer dans "+loc.name+" ?", function(){});
  };
  if(body) body.querySelectorAll(".dr-map-loc").forEach(function(el){ el.classList.toggle("active", el.getAttribute("data-lid")===loc.id) });
  // Afficher l'icone du lieu dans le losange
  setDiamondImage(null, loc.icon);
}

/* ══════════ NAVIGATION ══════════ */
function showPage(pid){
  $$(".page").forEach(function(pg){ pg.classList.remove("active") });
  var tgt = $("#page-"+pid); if(tgt) tgt.classList.add("active");
  var changed = (curPage !== pid);
  curPage = pid;
  acDB.set("ac_page", pid);

  if(changed){
    selectedPersona=null; selectedCard=null; selectedGame=null; selectedElement=null;
    userSection=null;
    if(pid !== "worldmap"){ activeLocId=null; acDB.set("ac_activeLoc","") }
    closeDrawerPanel();
    clearDiamondImage();
    closeFooterPanel();
    closeHeaderPanel();
    // ★ Sur la page user, activer profil par défaut avec l'avatar dans le losange
    if(pid === "user"){
      userSection = "profil";
      var _u = loadUser();
      if(_u.avatar) setTimeout(function(){ setDiamondImage(_u.avatar, null) }, 460);
      else setTimeout(function(){ setDiamondImage(null, "\ud83d\udc64") }, 460);
      setTimeout(function(){ syncUserPageActive("profil") }, 460);
    }
    // Préparer le contenu par défaut pour la nouvelle page (après fermeture)
    setTimeout(function(){ updateDrawerContent() }, 450);
  }

  // ★ Logo du site dans le losange sur la page d'accueil
  if(pid === "accueil") setDiamondImage("assets/ealogo.png", null);
  // ★ Worldmap dans le losange sur la page carte
  if(pid === "worldmap") setDiamondImage("assets/worldmap.jpg", null);

  // ★ Guild page — construire le contenu
  if(pid === "guild"){
    setDiamondImage(null, "🏰");
    setTimeout(function(){ buildGuildPage() }, 10);
  }

  $$(".header-btn").forEach(function(b){ var bp=b.getAttribute("data-page"); if(bp) b.classList.toggle("active",bp===pid) });
  var ac = document.getElementById("accueil-corner");
  if(ac) ac.classList.toggle("active", pid==="accueil");
  var fp = document.getElementById("footer-portrait");
  var or_ = document.getElementById("orb-right");
  var orbMauveWrap = document.getElementById("orb-topright-mauve");
  if(fp) fp.classList.toggle("active-page", pid==="user" || pid==="profile");
  if(or_) or_.classList.toggle("active", pid==="worldmap");
  if(orbMauveWrap) orbMauveWrap.classList.toggle("active", pid==="guild");
  updateOrbLabels();
}

/* ══════════ HEADER PANEL DRAG (miroir exact du footer — translateY négatif) ══════════ */
function initHeaderPanel(){
  var diamond = document.getElementById("header-diamond");
  var asm = document.getElementById("header-assembly");
  var panel = document.getElementById("header-panel");
  if(!diamond || !asm || !panel) return;

  var isDrag = false, startY = 0, hasMoved = false, startTranslate = 0;

  /*
   * Géométrie (miroir du footer) :
   * - Assembly = [panel (height=travel)] + [header bar (50px)] + [diamond (absolute)]
   * - Fermé : translateY(-travel) → panel hors écran au-dessus, header bar en top:0
   * - Ouvert : translateY(0) → panel visible, header bar descend à y=travel
   * - Travel = vh - 110 (même que le footer)
   */
  function calcTravel(){
    window._hpTravel = window.innerHeight - 110;
    if(window._hpTravel < 100) window._hpTravel = 100;
    panel.style.height = window._hpTravel + "px";
  }
  calcTravel();

  /* Démarrer fermé */
  window._hpOpen = false;
  asm.style.transform = "translateY(" + (-window._hpTravel) + "px)";

  function getY(e){ return (e.touches ? e.touches[0] : e).clientY }
  function currentT(){
    var st = asm.style.transform;
    var m = st.match(/translateY\(([^)]+)px\)/);
    return m ? parseFloat(m[1]) : -window._hpTravel;
  }

  function onStart(e){
    e.preventDefault(); e.stopPropagation();
    isDrag = true; hasMoved = false;
    startY = getY(e);
    startTranslate = currentT();
    asm.classList.remove("snapping");
    /* Fermer le footer-panel et mettre le header au-dessus */
    if(window._fpOpen) closeFooterPanel();
    asm.style.zIndex = "510";
    document.addEventListener("touchmove", onMove, {passive:false});
    document.addEventListener("touchend", onEnd, {passive:true});
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onEnd);
  }

  function onMove(e){
    if(!isDrag) return; e.preventDefault();
    var delta = getY(e) - startY;
    if(Math.abs(delta) > 5) hasMoved = true;
    /* Clamp entre -travel (fermé) et 0 (ouvert) */
    var newT = Math.max(-window._hpTravel, Math.min(0, startTranslate + delta));
    asm.style.transform = "translateY(" + newT + "px)";
  }

  function onEnd(e){
    if(!isDrag) return; isDrag = false;
    var endT = currentT();
    asm.classList.add("snapping");

    if(!hasMoved){
      /* Tap = toggle */
      if(window._hpOpen){
        asm.style.transform = "translateY(" + (-window._hpTravel) + "px)";
        window._hpOpen = false;
      } else {
        asm.style.transform = "translateY(0px)";
        window._hpOpen = true;
      }
    } else {
      /* Snap : si plus de la moitié tirée → ouvrir */
      if(endT > -window._hpTravel * 0.5){
        asm.style.transform = "translateY(0px)";
        window._hpOpen = true;
      } else {
        asm.style.transform = "translateY(" + (-window._hpTravel) + "px)";
        window._hpOpen = false;
      }
    }

    setTimeout(function(){
      asm.classList.remove("snapping");
      if(!window._hpOpen) asm.style.zIndex = "";
    }, 450);
    document.removeEventListener("touchmove", onMove);
    document.removeEventListener("touchend", onEnd);
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onEnd);
  }

  diamond.addEventListener("touchstart", onStart, {passive:false});
  diamond.addEventListener("mousedown", onStart);

  window.addEventListener("resize", function(){
    calcTravel();
    if(!window._hpOpen) asm.style.transform = "translateY(" + (-window._hpTravel) + "px)";
    else asm.style.transform = "translateY(0px)";
  });
}

/* ══════════ FOOTER PANEL DRAG (tout l'assembly bouge via translateY) ══════════ */
function initFooterPanel(){
  var diamond = document.getElementById("footer-diamond");
  var asm = document.getElementById("footer-assembly");
  var panel = document.getElementById("footer-panel");
  if(!diamond || !asm || !panel) return;

  var isDrag = false, startY = 0, hasMoved = false, startTranslate = 0;

  /*
   * Géométrie :
   * - Header 50px, creux 35px → pointe du creux header = 15px du haut de l'écran
   * - Footer 50px, creux 35px → pointe du creux footer = 35px du haut du footer
   * - Losange 70px, pointe haute à ~7% = 5px, pointe basse à ~93% = 65px
   * - On veut 10px de gap entre pointe du creux et pointe du losange
   *
   * Fermé : pointe basse du losange = creux footer tip - 10px
   * Ouvert : pointe haute du losange = creux header tip + 10px
   * Travel = distance entre les deux positions = vh - 110
   */
  function calcTravel(){
    window._fpTravel = window.innerHeight - 110;
    if(window._fpTravel < 100) window._fpTravel = 100;
    panel.style.height = window._fpTravel + "px";
  }
  calcTravel();

  /* Démarrer fermé */
  window._fpOpen = false;
  asm.style.transform = "translateY(" + window._fpTravel + "px)";

  function getY(e){ return (e.touches ? e.touches[0] : e).clientY }
  function currentT(){
    var st = asm.style.transform;
    var m = st.match(/translateY\(([^)]+)px\)/);
    return m ? parseFloat(m[1]) : window._fpTravel;
  }

  function onStart(e){
    e.preventDefault(); e.stopPropagation();
    isDrag = true; hasMoved = false;
    startY = getY(e);
    startTranslate = currentT();
    asm.classList.remove("snapping");
    /* Fermer le header-panel et mettre le footer au-dessus */
    if(window._hpOpen) closeHeaderPanel();
    asm.style.zIndex = "510";
    document.addEventListener("touchmove", onMove, {passive:false});
    document.addEventListener("touchend", onEnd, {passive:true});
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onEnd);
  }

  function onMove(e){
    if(!isDrag) return; e.preventDefault();
    var delta = getY(e) - startY;
    if(Math.abs(delta) > 5) hasMoved = true;
    var newT = Math.max(0, Math.min(window._fpTravel, startTranslate + delta));
    asm.style.transform = "translateY(" + newT + "px)";
  }

  function onEnd(e){
    if(!isDrag) return; isDrag = false;
    var endT = currentT();
    asm.classList.add("snapping");

    if(!hasMoved){
      if(window._fpOpen){
        asm.style.transform = "translateY(" + window._fpTravel + "px)";
        window._fpOpen = false;
      } else {
        asm.style.transform = "translateY(0px)";
        window._fpOpen = true;
      }
    } else {
      if(endT < window._fpTravel * 0.5){
        asm.style.transform = "translateY(0px)";
        window._fpOpen = true;
      } else {
        asm.style.transform = "translateY(" + window._fpTravel + "px)";
        window._fpOpen = false;
      }
    }

    setTimeout(function(){
      asm.classList.remove("snapping");
      if(!window._fpOpen) asm.style.zIndex = "";
    }, 450);
    document.removeEventListener("touchmove", onMove);
    document.removeEventListener("touchend", onEnd);
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onEnd);
  }

  diamond.addEventListener("touchstart", onStart, {passive:false});
  diamond.addEventListener("mousedown", onStart);

  window.addEventListener("resize", function(){
    calcTravel();
    if(!window._fpOpen) asm.style.transform = "translateY(" + window._fpTravel + "px)";
    else asm.style.transform = "translateY(0px)";
  });
}

var goldSection = "calendrier"; // calendrier | actu | meteo

function initNav(){
  $$(".header-btn").forEach(function(b){
    var pg = b.getAttribute("data-page");
    if(pg) b.onclick = function(){ showPage(pg) };
  });
  var accueilCorner = document.getElementById("accueil-corner");
  if(accueilCorner) accueilCorner.onclick = function(){ showPage("accueil") };
  // Red orb → user page
  var orbHealth = document.getElementById("orb-health");
  if(orbHealth) orbHealth.onclick = function(){ showPage("user") };
  // Blue orb → worldmap
  var orbMana = document.getElementById("orb-mana");
  if(orbMana) orbMana.onclick = function(){ showPage("worldmap") };
  // Gold orb → cycle calendrier / actu / météo dans le header panel
  var orbGold = document.getElementById("orb-gold");
  if(orbGold) orbGold.onclick = function(){ openGoldOrbPanel() };
  // Mauve orb → guild page
  var orbMauve = document.getElementById("orb-mauve");
  if(orbMauve) orbMauve.onclick = function(){ showPage("guild") };
}

function openGoldOrbPanel(){
  // Si le header panel est ouvert, cycler entre les sections
  if(window._hpOpen){
    if(goldSection === "calendrier"){ goldSection = "actu"; openDailyInfoPanel(); }
    else if(goldSection === "actu"){ goldSection = "meteo"; openWeatherPanel(); }
    else { goldSection = "calendrier"; calSelectedEvent=null; openCalendarPanel(); }
  } else {
    goldSection = "calendrier";
    calSelectedEvent = null;
    setHeaderDiamondImage(null, "⏳");
    openCalendarPanel();
  }
}

function openWeatherPanel(){
  var w = getTodayWeather();
  var night = isNightInGame();
  var wIcon = night && w.night_variant ? w.night_variant.icon : w.icon;
  var wName = night && w.night_variant ? w.night_variant.name : w.name;
  var wDesc = night && w.night_variant ? w.night_variant.desc : w.desc;
  var wCol = w.color || "#c9a04a";
  var h = '<div class="daily-info-wrap">'
    + '<div class="di-weather-card">'
    + '<div class="di-weather-icon" style="color:'+esc(wCol)+'">'+wIcon+'</div>'
    + '<div class="di-weather-name" style="color:'+esc(wCol)+'">'+esc(wName)+'</div>'
    + '<div class="di-weather-desc">'+esc(wDesc)+'</div>'
    + '</div></div>';
  setHeaderPanelContent(h);
  var asm = document.getElementById("header-assembly");
  if(asm){
    asm.classList.add("snapping");
    asm.style.zIndex = "510";
    asm.style.transform = "translateY(0px)";
    window._hpOpen = true;
    setTimeout(function(){ asm.classList.remove("snapping") }, 450);
  }
  setHeaderDiamondImage(null, wIcon);
}

