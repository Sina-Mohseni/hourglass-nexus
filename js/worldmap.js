"use strict";

/* ══════════ WORLD MAP ══════════ */

/* Adjacency removed — free movement. Stub for backward compat */
function getAdjacentCityIds(fromId){
  // Return all cities (no restriction)
  return getCities().filter(function(c){ return c.id !== fromId }).map(function(c){ return c.id });
}

/* ═══ BORDER PASS SYSTEM ═══ */
function hasRegionPass(regionId){
  var u = loadUser();
  if(u.region === regionId) return true;
  return u.borderPasses.indexOf(regionId) >= 0;
}

function getJobBorderCost(baseCost){
  var u = loadUser();
  var job = getJobById(u.job);
  if(!job || !job.perks) return baseCost;
  var discount = job.perks.borderDiscount || 0;
  return Math.max(0, Math.round(baseCost * (100 - discount) / 100));
}

function grantRegionPass(regionId){
  var u = loadUser();
  if(u.borderPasses.indexOf(regionId) < 0){
    u.borderPasses.push(regionId);
    saveUser(u);
  }
}

function buyRegionPass(regionId){
  var region = getRegionById(regionId);
  if(!region) return;
  var u = loadUser();
  var cost = getJobBorderCost(region.passCost);
  var job = getJobById(u.job);
  var hasDiscount = job && job.perks && job.perks.borderDiscount > 0;
  if(u.coins < cost){
    showModal(region.passIcon + " " + region.passName,
      '<div style="text-align:center;padding:8px 0">'
      + '<div style="font-size:36px;margin-bottom:8px">'+region.passIcon+'</div>'
      + '<p style="font-size:12px;color:var(--bone-dim);margin-bottom:10px">Vous n\u2019avez pas assez de <b>Sablons</b> pour acquérir ce passe-frontière.</p>'
      + '<div style="display:flex;justify-content:center;gap:16px;font-size:12px">'
      + '<span style="color:#ef4444">Vous : '+getCurrency().icon+' '+u.coins+'</span>'
      + '<span style="color:#22c55e">Prix : '+getCurrency().icon+' '+cost+(hasDiscount?' <s style="opacity:.5">'+region.passCost+'</s>':'')+'</span></div></div>'
    );
    return;
  }
  var confirmMsg = "Acquérir le " + region.passIcon + " " + region.passName + " pour " + getCurrency().icon + " " + cost + " Sablons ?";
  if(hasDiscount) confirmMsg += " (réduction " + job.icon + " " + job.name + " : -" + job.perks.borderDiscount + "%)";
  showConfirm(confirmMsg, function(){
    var u2 = loadUser();
    u2.coins -= cost;
    if(u2.borderPasses.indexOf(regionId) < 0) u2.borderPasses.push(regionId);
    saveUser(u2);
    buildUserPage();
    showModal("\u2714 Passe acquis !",
      '<div style="text-align:center;padding:10px 0">'
      + '<div style="font-size:42px;margin-bottom:8px">'+region.passIcon+'</div>'
      + '<div style="font-size:13px;font-weight:700;color:'+esc(region.color)+'">'+esc(region.passName)+'</div>'
      + '<p style="font-size:11px;color:var(--bone-dim);margin-top:6px">Vous pouvez désormais entrer dans la contrée <b>'+esc(region.name)+'</b>.</p></div>'
    );
  });
}

function showBorderBlockedModal(regionId){
  var region = getRegionById(regionId);
  if(!region) return;
  var u = loadUser();
  var cost = getJobBorderCost(region.passCost);
  var job = getJobById(u.job);
  var hasDiscount = job && job.perks && job.perks.borderDiscount > 0;
  var canAfford = u.coins >= cost;
  var ov = document.getElementById("modal-overlay");
  var box = document.getElementById("modal-content");
  var cl = document.getElementById("modal-close");
  if(!ov || !box) return;
  box.innerHTML = '<h3 style="font-family:var(--font-heading);font-size:14px;font-weight:700;margin-bottom:12px;text-align:center;color:'+esc(region.color)+'">🚫 Frontière Verrouillée</h3>'
    + '<div style="text-align:center;padding:4px 0">'
    + '<div style="font-size:42px;margin-bottom:8px">'+region.passIcon+'</div>'
    + '<div style="font-size:13px;font-weight:700;color:var(--gold-light)">'+esc(region.passName)+'</div>'
    + '<p style="font-size:11px;color:var(--bone-dim);margin:8px 0;line-height:1.5">Pour entrer dans la contrée <span style="color:'+esc(region.color)+';font-weight:600">'+esc(region.name)+'</span>, vous devez posséder le passe-frontière requis.</p>'
    + '<div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:10px;margin:10px 0">'
    + '<div style="font-size:10px;color:var(--bone-dim);margin-bottom:6px">Prix d\u2019acquisition</div>'
    + '<div style="font-size:16px;font-weight:700;color:'+(canAfford?'#22c55e':'#ef4444')+'">'+getCurrency().icon+' '+cost+' Sablons'
    + (hasDiscount ? ' <s style="font-size:11px;opacity:.4">'+region.passCost+'</s>' : '')+'</div>'
    + (hasDiscount ? '<div style="font-size:9px;color:#22c55e;margin-top:3px">'+job.icon+' '+esc(job.name)+' : -'+job.perks.borderDiscount+'%</div>' : '')
    + '<div style="font-size:10px;color:var(--bone-dim);margin-top:4px">Solde : '+getCurrency().icon+' '+u.coins+'</div></div>'
    + '<button id="modal-buy-pass" style="width:100%;padding:10px;border:none;border-radius:8px;font-weight:700;font-size:12px;cursor:pointer;margin-top:4px;'
    + (canAfford
      ? 'background:linear-gradient(145deg,#22c55e,#16a34a);color:#fff'
      : 'background:rgba(255,255,255,.06);color:var(--bone-dim);cursor:not-allowed')
    + '">'+(canAfford ? region.passIcon+' Acquérir le passe' : '💰 Sablons insuffisants')+'</button></div>';
  ov.style.display = "flex";
  if(cl) cl.onclick = function(){ ov.style.display="none" };
  ov.onclick = function(e){ if(e.target===ov) ov.style.display="none" };
  var buyBtn = document.getElementById("modal-buy-pass");
  if(buyBtn && canAfford){
    buyBtn.onclick = function(){
      ov.style.display = "none";
      buyRegionPass(regionId);
    };
  }
}

/* Generate a sinuous SVG path string between two % coords */
function makeSinuousPath(sx, sy, ex, ey){
  var dx = ex - sx, dy = ey - sy;
  var dist = Math.sqrt(dx*dx + dy*dy);
  // Perpendicular direction
  var px = -dy / (dist||1), py = dx / (dist||1);
  // Seed from coords for determinism
  var seed = Math.abs(sx * 7 + sy * 13 + ex * 17 + ey * 23);
  function prand(i){ return ((Math.sin(seed + i * 127.1) * 43758.5453) % 1 + 1) % 1 }
  // 3-4 intermediate points with perpendicular offsets
  var nPts = 3 + Math.floor(prand(0) * 2); // 3 or 4
  var pts = [{x:sx, y:sy}];
  for(var i = 1; i <= nPts; i++){
    var t = i / (nPts + 1);
    var amp = dist * 0.08 * (prand(i) - 0.5) * 2; // ±8% of distance
    pts.push({
      x: sx + dx * t + px * amp,
      y: sy + dy * t + py * amp
    });
  }
  pts.push({x:ex, y:ey});
  // Build smooth cubic bezier through points (Catmull-Rom → Bezier)
  var d = "M" + pts[0].x + "," + pts[0].y;
  for(var i = 0; i < pts.length - 1; i++){
    var p0 = pts[Math.max(0, i-1)];
    var p1 = pts[i];
    var p2 = pts[i+1];
    var p3 = pts[Math.min(pts.length-1, i+2)];
    var cp1x = p1.x + (p2.x - p0.x) / 6;
    var cp1y = p1.y + (p2.y - p0.y) / 6;
    var cp2x = p2.x - (p3.x - p1.x) / 6;
    var cp2y = p2.y - (p3.y - p1.y) / 6;
    d += " C" + cp1x + "," + cp1y + " " + cp2x + "," + cp2y + " " + p2.x + "," + p2.y;
  }
  return d;
}

function updateWorldmapAvatar(){
  var el = document.getElementById("wm-avatar"); if(!el) return;
  var u = loadUser();
  if(u.avatar) el.innerHTML = '<img src="'+esc(u.avatar)+'">';
  else el.innerHTML = '<div class="wma-emoji">\ud83d\udc64</div>';
}

function buildWorldmapPage(){
  var p = $("#page-worldmap"); if(!p) return;
  var cities = getCities(), u = loadUser(), avSrc = u.avatar || "";

  var h = '<div class="worldmap-wrap">'
    + '<div class="worldmap-page" id="worldmap-page"><div class="worldmap-inner" id="worldmap-inner"><img src="assets/worldmap.jpg" alt="World Map" id="worldmap-img">';
  cities.forEach(function(c){
    var isActive = (currentCityId === c.id);
    var cls = "wm-city" + (isActive ? " active" : "");
    h += '<div class="'+cls+'" data-cid="'+esc(c.id)+'" data-region="'+esc(c.region)+'" style="left:'+c.wx+'%;top:'+c.wy+'%">'
      + '<div class="wm-city-dot" style="background:'+esc(c.color)+'"></div>'
      + '<div class="wm-city-name">'+esc(c.name)+'</div></div>';
  });
  // Avatar position: use mapX/mapY if set, else current city
  var avX = u.mapX || 50, avY = u.mapY || 50;
  if(currentCityId && !u.mapX){
    var cc = cities.find(function(c){ return c.id===currentCityId });
    if(cc){ avX = cc.wx; avY = cc.wy }
  }
  h += '<div class="wm-avatar visible" id="wm-avatar" style="left:'+avX+'%;top:'+avY+'%">';
  if(avSrc) h += '<img src="'+esc(avSrc)+'">';
  else h += '<div class="wma-emoji">\ud83d\udc64</div>';
  h += '</div>';
  h += '</div></div>';
  h += '<div class="wm-minimap" id="wm-minimap"><img src="assets/worldmap.jpg">'
    + '<div class="wm-minimap-view" id="wm-minimap-view"></div>'
    + '<div class="wm-minimap-label">'+getGameDateShort(u.gameDay, u.gameHour)+'</div></div></div>';
  p.innerHTML = h;

  var wmImg = document.getElementById("worldmap-img");
  if(wmImg){
    function setupMap(){
      initWorldmapZoom();
      initMinimapDrag();
      var cx = avX / 100, cy = avY / 100;
      if(window._wmState){
        var s = window._wmState;
        s.x = -(cx * s.imgW * s.scale - s.vpW/2);
        s.y = -(cy * s.imgH * s.scale - s.vpH/2);
        s.clamp();
        s.apply();
      }
    }
    if(wmImg.complete) setTimeout(setupMap, 50);
    else wmImg.onload = function(){ setTimeout(setupMap, 50) };
  }

  initWorldmapAvatarDrag();
}


/* ══════════ WORLDMAP FREE DRAG + TRAIL + TIME ══════════ */
function getGameDate(day, hour){
  // Standard calendar, 1 year = 365 days, starts Jan 1
  var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
  var monthNames = ["Janvier","Février","Mars","Avril","Mai","Juin",
                    "Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
  var d = ((day - 1) % 365) + 1;
  var m = 0;
  var rem = d;
  while(m < 12 && rem > daysInMonth[m]){ rem -= daysInMonth[m]; m++ }
  if(m >= 12) m = 11;
  var hh = (typeof hour === "number") ? String(hour).padStart(2,"0") + "h" : "";
  return rem + " " + monthNames[m] + (hh ? " — " + hh : "");
}

function getGameDateShort(day, hour){
  var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
  var monthShort = ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"];
  var d = ((day - 1) % 365) + 1;
  var m = 0, rem = d;
  while(m < 12 && rem > daysInMonth[m]){ rem -= daysInMonth[m]; m++ }
  if(m >= 12) m = 11;
  return rem + " " + monthShort[m] + " " + String(hour).padStart(2,"0") + "h";
}

function advanceGameTime(hours){
  if(hours <= 0) return;
  var u = loadUser();
  u.gameHour += hours;
  while(u.gameHour >= 24){
    u.gameHour -= 24;
    u.gameDay++;
  }
  // Cap at 365 days
  if(u.gameDay > 365) u.gameDay = 365;
  saveUser(u);
  updateTimeLabelOnMap();
}

function updateTimeLabelOnMap(){
  var u = loadUser();
  var label = document.querySelector(".wm-minimap-label");
  if(label) label.textContent = getGameDateShort(u.gameDay, u.gameHour);
}

function calcTravelTime(dist){
  // Short distance (< 3 map-units, within city cluster) = 1-4 hours
  // Medium distance (3-15) = 6h to 2 days
  // Long distance (15+) = 2-7 days
  if(dist < 0.5) return {days:0, hours:0, totalHours:0};
  var hours = Math.max(1, Math.round(dist * 1.5));
  return {
    days: Math.floor(hours / 24),
    hours: hours % 24,
    totalHours: hours
  };
}

function formatTravelTime(tt){
  if(tt.totalHours === 0) return "instantané";
  if(tt.days === 0) return tt.hours + "h de trajet";
  if(tt.hours === 0) return tt.days + " jour" + (tt.days > 1 ? "s" : "") + " de trajet";
  return tt.days + "j " + tt.hours + "h de trajet";
}

function findCityAt(x, y, radius){
  var cities = getCities();
  var best = null, bestD = Infinity;
  cities.forEach(function(c){
    var d = Math.hypot(x - c.wx, y - c.wy);
    if(d < radius && d < bestD){ bestD = d; best = c }
  });
  return best;
}

function findRegionAt(x, y){
  // Find which region this point is closest to (by nearest city)
  var cities = getCities();
  var best = null, bestD = Infinity;
  cities.forEach(function(c){
    var d = Math.hypot(x - c.wx, y - c.wy);
    if(d < bestD){ bestD = d; best = c }
  });
  return best ? best.region : "";
}

function initWorldmapAvatarDrag(){
  var inner = document.getElementById("worldmap-inner");
  var avatar = document.getElementById("wm-avatar");
  if(!inner || !avatar) return;

  var isDrag = false, startPxX = 0, startPxY = 0, origLeft = 0, origTop = 0;
  var trailSvg = null, trailLine = null;

  function getTouch(e){ var t = e.touches ? e.touches[0] : e; return {x:t.clientX, y:t.clientY} }

  function toPercent(pxX, pxY){
    var s = window._wmState;
    if(!s) return {x:50, y:50};
    return {
      x: Math.max(5, Math.min(95, ((pxX - startPxX) / (s.imgW * s.scale)) * 100 + origLeft)),
      y: Math.max(5, Math.min(95, ((pxY - startPxY) / (s.imgH * s.scale)) * 100 + origTop))
    };
  }

  function createTrail(){
    if(trailSvg) trailSvg.remove();
    trailSvg = document.createElementNS("http://www.w3.org/2000/svg","svg");
    trailSvg.setAttribute("viewBox","0 0 100 100");
    trailSvg.setAttribute("preserveAspectRatio","none");
    trailSvg.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;z-index:5;pointer-events:none;overflow:visible";
    trailLine = document.createElementNS("http://www.w3.org/2000/svg","line");
    var u = loadUser();
    var col = u.cardColor || "#c9a04a";
    trailLine.setAttribute("stroke", col);
    trailLine.setAttribute("stroke-width","0.3");
    trailLine.setAttribute("stroke-dasharray","0.6 0.4");
    trailLine.setAttribute("stroke-linecap","round");
    trailLine.setAttribute("opacity","0.8");
    trailLine.setAttribute("x1", origLeft + "%");
    trailLine.setAttribute("y1", origTop + "%");
    trailLine.setAttribute("x2", origLeft + "%");
    trailLine.setAttribute("y2", origTop + "%");
    trailSvg.appendChild(trailLine);
    inner.appendChild(trailSvg);
  }

  function onStart(e){
    e.preventDefault(); e.stopPropagation();
    isDrag = true;
    avatar.classList.add("dragging");
    var t = getTouch(e);
    startPxX = t.x; startPxY = t.y;
    origLeft = parseFloat(avatar.style.left);
    origTop = parseFloat(avatar.style.top);
    createTrail();
  }

  function onMove(e){
    if(!isDrag) return;
    e.preventDefault(); e.stopPropagation();
    var t = getTouch(e);
    var pos = toPercent(t.x, t.y);
    avatar.style.left = pos.x + "%";
    avatar.style.top = pos.y + "%";
    // Update trail endpoint
    if(trailLine){
      trailLine.setAttribute("x2", pos.x + "%");
      trailLine.setAttribute("y2", pos.y + "%");
    }
  }

  function onEnd(e){
    if(!isDrag) return;
    isDrag = false;
    avatar.classList.remove("dragging");

    var fx = parseFloat(avatar.style.left), fy = parseFloat(avatar.style.top);
    var dist = Math.hypot(fx - origLeft, fy - origTop);

    // If barely moved, cancel silently
    if(dist < 0.5){
      if(trailSvg) trailSvg.remove();
      avatar.style.left = origLeft + "%";
      avatar.style.top = origTop + "%";
      return;
    }

    var travelTime = calcTravelTime(dist);
    var u = loadUser();
    var nearCity = findCityAt(fx, fy, 3.5);
    var destRegion = findRegionAt(fx, fy);
    var curRegion = u.region || "";

    // No time cost if staying within same city area
    var fromCity = findCityAt(origLeft, origTop, 3.5);
    if(fromCity && nearCity && fromCity.id === nearCity.id){
      // Same city — no time passes, just update position
      if(trailSvg) trailSvg.remove();
      var u2 = loadUser();
      u2.mapX = fx; u2.mapY = fy;
      saveUser(u2);
      return;
    }

    // Check border crossing (invisible — narrative driven)
    if(destRegion && destRegion !== curRegion){
      var fromRegion = findRegionAt(origLeft, origTop);
      if(fromRegion !== destRegion && !hasRegionPass(destRegion)){
        showBorderStoryModal(destRegion, origLeft, origTop);
        avatar.style.transition = "left .3s ease, top .3s ease";
        avatar.style.left = origLeft + "%";
        avatar.style.top = origTop + "%";
        setTimeout(function(){ avatar.style.transition = "" }, 350);
        if(trailSvg){ trailSvg.style.transition = "opacity .3s"; trailSvg.style.opacity = "0"; setTimeout(function(){ if(trailSvg) trailSvg.remove() }, 350) }
        return;
      }
    }

    // Confirmation dialog
    var destLabel = nearCity ? nearCity.name : "cette position";
    var timeLabel = formatTravelTime(travelTime);
    var futureDay = u.gameDay, futureHour = u.gameHour + travelTime.totalHours;
    while(futureHour >= 24){ futureHour -= 24; futureDay++ }
    if(futureDay > 365) futureDay = 365;
    var dateAfter = getGameDate(futureDay, futureHour);

    showConfirm(
      "Voyager vers " + destLabel + " ?\n" + timeLabel + " (→ " + dateAfter + ")",
      function(){
        var u2 = loadUser();
        u2.mapX = fx;
        u2.mapY = fy;

        if(nearCity){
          currentCityId = nearCity.id;
          acDB.set("ac_city", nearCity.id);
        }

        advanceGameTime(travelTime.totalHours);
        saveUser(u2);

        // Fade trail
        if(trailSvg){
          trailSvg.style.transition = "opacity 2s ease";
          trailSvg.style.opacity = "0";
          setTimeout(function(){ if(trailSvg) trailSvg.remove() }, 2100);
        }

        updateDrawerContent();
      },
      function(){
        // CANCEL — snap back to trail origin
        avatar.style.transition = "left .4s ease, top .4s ease";
        avatar.style.left = origLeft + "%";
        avatar.style.top = origTop + "%";
        setTimeout(function(){ avatar.style.transition = "" }, 450);
        if(trailSvg) trailSvg.remove();
      }
    );
  }

  avatar.addEventListener("touchstart", onStart, {passive:false});
  avatar.addEventListener("mousedown", onStart);
  document.addEventListener("touchmove", function(e){ if(isDrag) onMove(e) }, {passive:false});
  document.addEventListener("mousemove", function(e){ if(isDrag) onMove(e) });
  document.addEventListener("touchend", function(e){ if(isDrag) onEnd(e) }, {passive:true});
  document.addEventListener("mouseup", function(e){ if(isDrag) onEnd(e) });
}

function showBorderStoryModal(regionId, fromX, fromY){
  var region = getRegionById(regionId);
  if(!region) return;
  showModal("\u26a0 Frontière de " + region.name,
    '<div style="text-align:center;padding:8px 0">'
    + '<div style="font-size:36px;margin-bottom:8px">' + region.passIcon + '</div>'
    + '<p style="font-size:12px;color:var(--bone-dim);line-height:1.6;margin-bottom:10px">'
    + "Vous approchez des terres de <strong style=\"color:" + esc(region.color) + "\">" + esc(region.name) + "</strong>. "
    + "Un sentiment étrange vous envahit\u2026 comme si une force invisible vous empêchait d\u2019avancer. "
    + "Peut-être qu\u2019un habitant de la région pourrait vous aider à franchir cette frontière.</p>"
    + '<div style="font-size:10px;color:var(--gold-light);opacity:.6">L\u2019histoire révélera le chemin.</div></div>'
  );
}

/* ══════════ WORLDMAP ZOOM/PAN ENGINE ══════════ */
function initWorldmapZoom(){
  var page = document.getElementById("worldmap-page");
  var inner = document.getElementById("worldmap-inner");
  var img = document.getElementById("worldmap-img");
  if(!page || !inner || !img) return;

  var vpW = window.innerWidth, vpH = window.innerHeight;
  var imgW = img.naturalWidth || img.width || 1600;
  var imgH = img.naturalHeight || img.height || 900;

  /* Calcul du scale min pour couvrir tout le viewport */
  var minScale = Math.max(vpW/imgW, vpH/imgH);
  var maxScale = minScale * 6;
  var scale = minScale * 2; /* Démarrer zoomé pour voir les détails */

  /* Positionner l'image à taille réelle, puis scale via transform */
  img.style.width = imgW + "px";
  img.style.height = imgH + "px";

  var x = -(imgW * scale - vpW) / 2;
  var y = -(imgH * scale - vpH) / 2;

  var state = {
    x: x, y: y, scale: scale,
    imgW: imgW, imgH: imgH, vpW: vpW, vpH: vpH,
    minScale: minScale, maxScale: maxScale,
    clamp: function(){
      var sw = this.imgW * this.scale, sh = this.imgH * this.scale;
      if(sw <= this.vpW) this.x = (this.vpW - sw)/2;
      else this.x = Math.min(0, Math.max(this.vpW - sw, this.x));
      if(sh <= this.vpH) this.y = (this.vpH - sh)/2;
      else this.y = Math.min(0, Math.max(this.vpH - sh, this.y));
    },
    apply: function(){
      inner.style.transform = "translate("+this.x+"px,"+this.y+"px) scale("+this.scale+")";
      updateMinimap();
    }
  };
  window._wmState = state;
  state.clamp();
  state.apply();

  /* ── Touch: pan + pinch-zoom ── */
  var touching = false, lastTouches = null, lastDist = 0, lastMid = null;
  var touchStartPos = null, touchMoved = false, touchStartTarget = null;
  var TAP_THRESHOLD = 8; // px movement before it's a drag, not a tap

  function dist(t){ return Math.hypot(t[1].clientX-t[0].clientX, t[1].clientY-t[0].clientY) }
  function mid(t){ return{x:(t[0].clientX+t[1].clientX)/2, y:(t[0].clientY+t[1].clientY)/2} }

  page.addEventListener("touchstart", function(e){
    touchMoved = false;
    touchStartTarget = e.target;
    if(e.touches.length === 1){
      touching = true;
      touchStartPos = {x:e.touches[0].clientX, y:e.touches[0].clientY};
      lastTouches = [{clientX:e.touches[0].clientX, clientY:e.touches[0].clientY}];
    } else if(e.touches.length >= 2){
      touching = true;
      touchStartPos = null; // multi-touch = never a tap
      lastTouches = [{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY},{clientX:e.touches[1].clientX,clientY:e.touches[1].clientY}];
      lastDist = dist(lastTouches);
      lastMid = mid(lastTouches);
    }
    e.preventDefault();
  }, {passive:false});

  page.addEventListener("touchmove", function(e){
    if(!touching) return;
    e.preventDefault();
    if(e.touches.length === 1 && lastTouches && lastTouches.length === 1){
      /* Detect significant movement */
      if(touchStartPos && !touchMoved){
        var dm = Math.hypot(e.touches[0].clientX - touchStartPos.x, e.touches[0].clientY - touchStartPos.y);
        if(dm > TAP_THRESHOLD) touchMoved = true;
      }
      /* Pan */
      var dx = e.touches[0].clientX - lastTouches[0].clientX;
      var dy = e.touches[0].clientY - lastTouches[0].clientY;
      state.x += dx; state.y += dy;
      lastTouches = [{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY}];
      state.clamp(); state.apply();
    } else if(e.touches.length >= 2){
      /* Pinch zoom + pan */
      var cur = [{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY},{clientX:e.touches[1].clientX,clientY:e.touches[1].clientY}];
      var curDist = dist(cur), curMid = mid(cur);
      if(lastDist > 0){
        var ratio = curDist / lastDist;
        var newScale = Math.max(state.minScale, Math.min(state.maxScale, state.scale * ratio));
        /* Zoom vers le point milieu */
        var pr = page.getBoundingClientRect();
        var mx = curMid.x - pr.left, my = curMid.y - pr.top;
        state.x = mx - (mx - state.x) * (newScale / state.scale);
        state.y = my - (my - state.y) * (newScale / state.scale);
        state.scale = newScale;
      }
      /* Pan */
      if(lastMid){
        state.x += curMid.x - lastMid.x;
        state.y += curMid.y - lastMid.y;
      }
      lastDist = curDist; lastMid = curMid; lastTouches = cur;
      state.clamp(); state.apply();
    }
  }, {passive:false});

  page.addEventListener("touchend", function(e){
    if(e.touches.length === 0){
      touching = false; lastTouches = null; lastDist = 0; lastMid = null;
      touchStartPos = null; touchMoved = false; touchStartTarget = null;
    }
    else if(e.touches.length === 1){
      lastTouches = [{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY}];
      lastDist = 0; lastMid = null;
    }
  }, {passive:true});

  /* ── Mouse: drag + wheel zoom ── */
  var mouseDown = false, mx0 = 0, my0 = 0;
  var mouseStartPos = null, mouseMoved = false, mouseStartTarget = null;
  page.addEventListener("mousedown", function(e){
    mouseDown = true; mx0 = e.clientX; my0 = e.clientY;
    mouseStartPos = {x:e.clientX, y:e.clientY};
    mouseMoved = false;
    mouseStartTarget = e.target;
    page.style.cursor = "grabbing";
    e.preventDefault();
  });
  document.addEventListener("mousemove", function(e){
    if(!mouseDown) return;
    if(mouseStartPos && !mouseMoved){
      var dm = Math.hypot(e.clientX - mouseStartPos.x, e.clientY - mouseStartPos.y);
      if(dm > TAP_THRESHOLD) mouseMoved = true;
    }
    state.x += e.clientX - mx0; state.y += e.clientY - my0;
    mx0 = e.clientX; my0 = e.clientY;
    state.clamp(); state.apply();
  });
  document.addEventListener("mouseup", function(){
    mouseDown = false; page.style.cursor = "";
    mouseStartPos = null; mouseMoved = false; mouseStartTarget = null;
  });
  page.addEventListener("wheel", function(e){
    e.preventDefault();
    var delta = e.deltaY > 0 ? 0.9 : 1.1;
    var newScale = Math.max(state.minScale, Math.min(state.maxScale, state.scale * delta));
    var pr = page.getBoundingClientRect();
    var mx = e.clientX - pr.left, my = e.clientY - pr.top;
    state.x = mx - (mx - state.x) * (newScale / state.scale);
    state.y = my - (my - state.y) * (newScale / state.scale);
    state.scale = newScale;
    state.clamp(); state.apply();
  }, {passive:false});

  /* Resize */
  window.addEventListener("resize", function(){
    state.vpW = window.innerWidth; state.vpH = window.innerHeight;
    state.minScale = Math.max(state.vpW/state.imgW, state.vpH/state.imgH);
    state.maxScale = state.minScale * 6;
    if(state.scale < state.minScale) state.scale = state.minScale;
    state.clamp(); state.apply();
  });
}

function updateMinimap(){
  var mv = document.getElementById("wm-minimap-view"), mm = document.getElementById("wm-minimap");
  if(!mv || !mm || !window._wmState) return;
  var s = window._wmState;
  var mw = mm.offsetWidth, mh = mm.offsetHeight;
  var sw = s.imgW * s.scale, sh = s.imgH * s.scale;
  if(!sw || !sh) return;
  /* Viewport rect relative to full scaled image */
  var vl = -s.x / sw, vt = -s.y / sh;
  var vw = s.vpW / sw, vh = s.vpH / sh;
  mv.style.left = Math.round(vl * mw) + "px";
  mv.style.top = Math.round(vt * mh) + "px";
  mv.style.width = Math.round(Math.max(6, vw * mw)) + "px";
  mv.style.height = Math.round(Math.max(6, vh * mh)) + "px";
}

function scrollMapToMinimapPos(rx, ry){
  if(!window._wmState) return;
  var s = window._wmState;
  s.x = -(rx * s.imgW * s.scale - s.vpW / 2);
  s.y = -(ry * s.imgH * s.scale - s.vpH / 2);
  s.clamp(); s.apply();
}

function initMinimapDrag(){
  var mm = document.getElementById("wm-minimap"); if(!mm) return;
  var isDrag = false;
  function getRatio(e){ var r=mm.getBoundingClientRect(); var t=e.touches?e.touches[0]:e; return{rx:Math.max(0,Math.min(1,(t.clientX-r.left)/r.width)),ry:Math.max(0,Math.min(1,(t.clientY-r.top)/r.height))} }
  function onStart(e){ e.preventDefault(); e.stopPropagation(); isDrag=true; scrollMapToMinimapPos(getRatio(e).rx, getRatio(e).ry) }
  function onMove(e){ if(!isDrag) return; e.preventDefault(); e.stopPropagation(); scrollMapToMinimapPos(getRatio(e).rx, getRatio(e).ry) }
  function onEnd(){ isDrag=false }
  mm.addEventListener("touchstart", onStart, {passive:false});
  mm.addEventListener("mousedown", onStart);
  document.addEventListener("touchmove", function(e){ if(isDrag) onMove(e) }, {passive:false});
  document.addEventListener("mousemove", function(e){ if(isDrag) onMove(e) });
  document.addEventListener("touchend", onEnd, {passive:true});
  document.addEventListener("mouseup", onEnd);
}

function selectCity(cid){
  var oldCityId = currentCityId;
  var cities = getCities();
  var oldCity = oldCityId ? cities.find(function(c){ return c.id === oldCityId }) : null;
  var newCity = cities.find(function(c){ return c.id === cid });
  if(!newCity) return;

  // Border check is handled during drag (showBorderStoryModal)
  // No adjacency restriction — free movement

  currentCityId = cid; acDB.set("ac_city", cid); activeLocId = null; acDB.set("ac_activeLoc","");

  // Afficher l'image de la ville dans le losange
  if(newCity.mapBg) setDiamondImage(newCity.mapBg, null);
  else setDiamondImage(null, "\ud83c\udfd9\ufe0f");

  // Si même ville → rebuild direct
  if(oldCity && oldCity.id === cid){
    buildWorldmapPage();
    updateDrawerContent();
    return;
  }

  // ★ ANIMATION : déplacer l'avatar le long d'un chemin sinueux avec pointillés
  var inner = document.getElementById("worldmap-inner");
  var avatar = document.getElementById("wm-avatar");
  if(!inner || !avatar){
    buildWorldmapPage();
    updateDrawerContent();
    return;
  }

  // Disable city clicks during travel
  inner.querySelectorAll(".wm-city").forEach(function(d){ d.style.pointerEvents = "none" });

  // Rendre l'avatar visible si premier voyage
  if(!avatar.classList.contains("visible")) avatar.classList.add("visible");

  // Point de départ
  var sx = oldCity ? oldCity.wx : 50;
  var sy = oldCity ? oldCity.wy : 50;
  avatar.style.left = sx + "%";
  avatar.style.top = sy + "%";
  avatar.classList.add("traveling");

  // User's chosen card color for path
  var u = loadUser();
  var pathColor = u.cardColor || "#c9a04a";
  var ex = newCity.wx, ey = newCity.wy;

  // Generate sinuous path data (in %)
  var pathD = makeSinuousPath(sx, sy, ex, ey);

  // Create SVG with viewBox matching percent coordinates
  var trail = document.createElementNS("http://www.w3.org/2000/svg","svg");
  trail.setAttribute("viewBox", "0 0 100 100");
  trail.setAttribute("preserveAspectRatio", "none");
  trail.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;z-index:5;pointer-events:none;overflow:visible";

  // Full path (hidden, used for length measurement & avatar position)
  var fullPath = document.createElementNS("http://www.w3.org/2000/svg","path");
  fullPath.setAttribute("d", pathD);
  fullPath.setAttribute("fill", "none");
  fullPath.setAttribute("stroke", "none");
  trail.appendChild(fullPath);

  // Visible dashed trail (drawn progressively)
  var visPath = document.createElementNS("http://www.w3.org/2000/svg","path");
  visPath.setAttribute("d", pathD);
  visPath.setAttribute("fill", "none");
  visPath.setAttribute("stroke", pathColor);
  visPath.setAttribute("stroke-width", "0.35");
  visPath.setAttribute("stroke-dasharray", "0.8 0.5");
  visPath.setAttribute("stroke-linecap", "round");
  visPath.setAttribute("opacity", "0.85");
  trail.appendChild(visPath);
  inner.appendChild(trail);

  // Get total path length for progressive reveal
  var totalLen = fullPath.getTotalLength();
  // Hide the trail initially, reveal progressively
  visPath.setAttribute("stroke-dashoffset", "0");
  // Use a clip path approach: overlay a mask that reveals
  visPath.style.strokeDasharray = "0.8 0.5";

  // Marquer la ville destination active
  inner.querySelectorAll(".wm-city").forEach(function(d){
    var dcid = d.getAttribute("data-cid");
    d.classList.remove("active","adjacent","locked");
    if(dcid === cid) d.classList.add("active");
  });

  // Animer l'avatar le long du chemin SVG
  var dur = 1400 + Math.min(800, Math.hypot(ex - sx, ey - sy) * 12);
  var startTime = null;

  // Create a second invisible "progress" path for reveal
  var revealPath = document.createElementNS("http://www.w3.org/2000/svg","path");
  revealPath.setAttribute("d", pathD);
  revealPath.setAttribute("fill", "none");
  revealPath.setAttribute("stroke", pathColor);
  revealPath.setAttribute("stroke-width", "0.35");
  revealPath.setAttribute("stroke-linecap", "round");
  revealPath.setAttribute("opacity", "0");
  trail.appendChild(revealPath);

  // We'll animate using dashoffset on the visible path
  var dashStr = totalLen + " " + totalLen;
  visPath.style.strokeDasharray = dashStr;
  visPath.style.strokeDashoffset = String(totalLen);

  function animStep(ts){
    if(!startTime) startTime = ts;
    var t = Math.min(1, (ts - startTime) / dur);
    var ease = t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2;

    // Reveal trail up to current progress
    var currentLen = ease * totalLen;
    visPath.style.strokeDashoffset = String(totalLen - currentLen);

    // Position avatar at current point on path
    try {
      var pt = fullPath.getPointAtLength(currentLen);
      avatar.style.left = pt.x + "%";
      avatar.style.top = pt.y + "%";
    } catch(e){
      // Fallback linear
      avatar.style.left = (sx + (ex - sx) * ease) + "%";
      avatar.style.top = (sy + (ey - sy) * ease) + "%";
    }

    if(t < 1){
      requestAnimationFrame(animStep);
    } else {
      avatar.classList.remove("traveling");

      // Restore dashed look on the completed trail
      visPath.style.strokeDasharray = "0.8 0.5";
      visPath.style.strokeDashoffset = "0";

      // Fade out trail
      trail.style.transition = "opacity 2s ease";
      trail.style.opacity = "0";
      setTimeout(function(){
        if(trail.parentNode) trail.parentNode.removeChild(trail);
      }, 2100);

      // Scroll vers destination
      var wmp = document.getElementById("worldmap-page");
      if(wmp && inner){
        var targetScroll = (inner.scrollWidth * (ex/100)) - (wmp.offsetWidth / 2);
        wmp.scrollTo({left: targetScroll, behavior: "smooth"});
        setTimeout(updateMinimap, 400);
      }

      // Rebuild to refresh adjacency classes
      setTimeout(function(){
        buildWorldmapPage();
        updateDrawerContent();
      }, 200);
    }
  }

  // Scroll vers le milieu du trajet
  var wmp = document.getElementById("worldmap-page");
  if(wmp && inner){
    var midX = (sx + ex) / 2 / 100;
    var targetScroll = (inner.scrollWidth * midX) - (wmp.offsetWidth / 2);
    wmp.scrollTo({left: targetScroll, behavior: "smooth"});
  }
  requestAnimationFrame(animStep);
}

