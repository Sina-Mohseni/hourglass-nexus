"use strict";

/* ══════════ CALENDAR SYSTEM (Extelua) ══════════
   Navigation par jour de jeu (1-750).
   Mois = 50 jours, Semaine = 10 jours, Jour = 30 heures.
   ════════════════════════════════════════════════ */
var calView = "month"; // month | week | day
var calNavDay = 1;      // jour de jeu courant pour la navigation
var calSelectedEvent = null;

function getCalEvents(){ return (calendarData && calendarData.events) || [] }

function getEventsForDay(gameDay){
  return getCalEvents().filter(function(e){ return e.gameDay === gameDay });
}

function initCalendar(){
  var u = loadUser();
  calNavDay = u.gameDay || 1;
}

function openCalendarPanel(){
  var html = buildCalendarHTML();
  setHeaderPanelContent(html);
  wireCalendarActions();
  var asm = document.getElementById("header-assembly");
  if(asm){
    asm.classList.add("snapping");
    asm.style.zIndex = "510";
    asm.style.transform = "translateY(0px)";
    window._hpOpen = true;
    setTimeout(function(){ asm.classList.remove("snapping") }, 450);
  }
}

function buildCalendarHTML(){
  if(calSelectedEvent) return buildCalendarEventDetail(calSelectedEvent);
  var h = '<div class="cal-wrap">';
  h += '<div class="cal-tabs">'
    + '<div class="cal-tab'+(calView==="month"?" active":"")+'" data-cv="month">Mois</div>'
    + '<div class="cal-tab'+(calView==="week"?" active":"")+'" data-cv="week">Semaine</div>'
    + '<div class="cal-tab'+(calView==="day"?" active":"")+'" data-cv="day">Jour</div>'
    + '</div>';
  if(calView === "month") h += buildCalMonth();
  else if(calView === "week") h += buildCalWeek();
  else h += buildCalDay();
  h += '</div>';
  return h;
}

/* ── MONTH VIEW (50 jours = 5 semaines × 10 jours) ── */
function buildCalMonth(){
  var u = loadUser();
  var todayDay = u.gameDay;
  var ed = extDateFromDay(calNavDay);
  var monthIdx = ed.month; // 0-14
  var monthStart = monthIdx * EXT_DAYS_PER_MONTH + 1; // premier jour du mois (game day)
  var season = EXT_SAISONS[ed.season];

  var h = '<div class="cal-nav">'
    + '<button class="cal-nav-btn" data-cn="prev">\u2039</button>'
    + '<div class="cal-nav-title">' + EXT_MOIS[monthIdx] + ' <span style="font-size:9px;opacity:.5">(' + season.icon + ' ' + season.name + ')</span></div>'
    + '<button class="cal-nav-btn" data-cn="next">\u203a</button></div>';

  // En-têtes des jours de la semaine (10 colonnes)
  h += '<div class="cal-weekdays cal-weekdays-ext">';
  EXT_JOURS_SHORT.forEach(function(j){ h += '<div class="cal-wd">'+j+'</div>' });
  h += '</div><div class="cal-days cal-days-ext">';

  // 50 jours dans le mois (5 semaines × 10 jours)
  for(var d=1; d<=EXT_DAYS_PER_MONTH; d++){
    var gd = monthStart + d - 1; // game day absolu
    var isToday = (gd === todayDay);
    var evts = getEventsForDay(gd);
    var cls = "cal-day"+(isToday?" today":"")+(evts.length?" has-events":"");
    if(gd > todayDay) cls += " future";
    h += '<div class="'+cls+'" data-gd="'+gd+'">'+d+'</div>';
  }
  h += '</div>';

  // Events du jour sélectionné (aujourd'hui par défaut si dans ce mois)
  var selDay = (todayDay >= monthStart && todayDay < monthStart + EXT_DAYS_PER_MONTH) ? todayDay : monthStart;
  h += '<div id="cal-month-events" style="margin-top:8px">';
  h += buildEventsListMini(getEventsForDay(selDay), selDay);
  h += '</div>';
  return h;
}

/* ── WEEK VIEW (10 jours) ── */
function buildCalWeek(){
  var u = loadUser();
  var todayDay = u.gameDay;
  var ed = extDateFromDay(calNavDay);
  // Premier jour de la semaine courante
  var dayInMonth = ed.dayInMonth;
  var weekStart = ed.day - ed.dayInWeek; // game day du premier jour de cette semaine

  var edStart = extDateFromDay(weekStart);
  var h = '<div class="cal-nav">'
    + '<button class="cal-nav-btn" data-cn="prev">\u2039</button>'
    + '<div class="cal-nav-title">Semaine ' + edStart.week + ' \u2014 ' + edStart.monthName + '</div>'
    + '<button class="cal-nav-btn" data-cn="next">\u203a</button></div>';

  h += '<div class="cal-week-grid">';
  for(var i=0; i<EXT_DAYS_PER_WEEK; i++){
    var gd = weekStart + i;
    if(gd < 1) gd = 1;
    if(gd > EXT_DAYS_PER_YEAR) gd = EXT_DAYS_PER_YEAR;
    var isToday = (gd === todayDay);
    var edCur = extDateFromDay(gd);
    var evts = getEventsForDay(gd);
    var cls = "cal-week-day"+(isToday?" today":"");
    h += '<div class="'+cls+'" data-gd="'+gd+'">'
      + '<div class="cal-week-day-label"><div class="cal-week-day-name">'+edCur.dayShort+'</div>'
      + '<div class="cal-week-day-num">'+edCur.dayInMonth+'</div></div>'
      + '<div class="cal-week-events">';
    evts.forEach(function(ev){
      var pe = getPersonaById(ev.persona);
      h += '<div class="cal-event-chip" style="background:'+(ev.color||"#c9a04a")+'25;border-left:3px solid '+(ev.color||"#c9a04a")+'" data-evid="'+esc(ev.id)+'">'
        + '<span class="cal-ev-icon">'+ev.icon+'</span>'
        + '<span class="cal-ev-time">'+(ev.time||"")+'</span>'
        + '<span class="cal-ev-title">'+esc(ev.title)+'</span>'
        + (pe && pe.avatar ? '<img class="cal-ev-avatar" src="'+esc(pe.avatar)+'">' : '')
        + '</div>';
    });
    if(!evts.length) h += '<div style="font-size:9px;color:var(--bone-dim);opacity:.4;font-style:italic">\u2014</div>';
    h += '</div></div>';
  }
  h += '</div>';
  return h;
}

/* ── DAY VIEW (30 heures) ── */
function buildCalDay(){
  var u = loadUser();
  var todayDay = u.gameDay;
  var isToday = (calNavDay === todayDay);
  var ed = extDateFromDay(calNavDay);
  var title = ed.dayName + ' ' + ed.dayInMonth + ' ' + ed.monthName;

  var h = '<div class="cal-nav">'
    + '<button class="cal-nav-btn" data-cn="prev">\u2039</button>'
    + '<div class="cal-nav-title">'+title+'</div>'
    + '<button class="cal-nav-btn" data-cn="next">\u203a</button></div>';

  var evts = getEventsForDay(calNavDay);
  var evtByHour = {};
  evts.forEach(function(e){
    var hr = parseInt((e.time||"0").split(":")[0]);
    if(!evtByHour[hr]) evtByHour[hr] = [];
    evtByHour[hr].push(e);
  });

  var nowHr = isToday ? u.gameHour : -1;
  h += '<div class="cal-day-hours">';
  for(var hr=0; hr<EXT_HOURS_PER_DAY; hr++){
    var hrEvts = evtByHour[hr] || [];
    var cls = "cal-hour-row"+(hrEvts.length?" has-event":"")+(hr===nowHr?" current-hour":"");
    h += '<div class="'+cls+'">'
      + '<div class="cal-hour-label">'+String(hr).padStart(2,"0")+':00</div>'
      + '<div class="cal-hour-content">';
    hrEvts.forEach(function(ev){
      var pe = getPersonaById(ev.persona);
      h += '<div class="cal-event-chip" style="background:'+(ev.color||"#c9a04a")+'25;border-left:3px solid '+(ev.color||"#c9a04a")+'" data-evid="'+esc(ev.id)+'">'
        + '<span class="cal-ev-icon">'+ev.icon+'</span>'
        + '<span class="cal-ev-title">'+esc(ev.title)+'</span>'
        + (pe && pe.avatar ? '<img class="cal-ev-avatar" src="'+esc(pe.avatar)+'">' : '')
        + '</div>';
    });
    h += '</div></div>';
  }
  h += '</div>';
  return h;
}

/* ── Events mini list ── */
function buildEventsListMini(evts, gameDay){
  var h = '';
  if(evts.length){
    evts.forEach(function(ev){
      var pe = getPersonaById(ev.persona);
      h += '<div class="cal-event-chip" style="background:'+(ev.color||"#c9a04a")+'25;border-left:3px solid '+(ev.color||"#c9a04a")+';margin-bottom:4px" data-evid="'+esc(ev.id)+'">'
        + '<span class="cal-ev-icon">'+ev.icon+'</span>'
        + '<span class="cal-ev-time">'+(ev.time||"")+'</span>'
        + '<span class="cal-ev-title">'+esc(ev.title)+'</span>'
        + (pe && pe.avatar ? '<img class="cal-ev-avatar" src="'+esc(pe.avatar)+'">' : '')
        + '</div>';
    });
  }

  // Gazette du jour (news)
  if(gameDay){
    var u = loadUser();
    if(gameDay <= u.gameDay){
      var news = generateDailyNews(gameDay);
      var maxHour = (gameDay === u.gameDay) ? u.gameHour : EXT_HOURS_PER_DAY;
      var visible = news.filter(function(n){ return n.hour <= maxHour });
      if(visible.length){
        h += '<div style="font-size:9px;font-weight:600;color:var(--gold-light);padding:6px 0 3px;letter-spacing:.5px">\uD83D\uDCF0 GAZETTE DU JOUR</div>';
        visible.forEach(function(n){
          h += '<div style="display:flex;gap:4px;padding:3px 0;font-size:9px;color:var(--bone-dim)">'
            + '<span>'+n.icon+'</span><span style="color:rgba(201,160,74,.5)">'+String(n.hour).padStart(2,"0")+'h</span>'
            + '<span>'+esc(n.text)+'</span></div>';
        });
      }
    } else {
      h += '<div style="text-align:center;font-size:10px;color:var(--bone-dim);opacity:.4;padding:8px;font-style:italic">\uD83D\uDCC5 Ce jour n\'est pas encore arriv\u00e9 dans votre voyage.</div>';
    }
  }

  if(!h) h = '<div style="text-align:center;font-size:10px;color:var(--bone-dim);opacity:.5;padding:8px;font-style:italic">Aucun \u00e9v\u00e9nement</div>';
  return h;
}

/* ── Event detail view ── */
function buildCalendarEventDetail(ev){
  var pe = getPersonaById(ev.persona);
  var ed = extDateFromDay(ev.gameDay || 1);
  var dateStr = ed.dayInMonth + ' ' + ed.monthName;
  var h = '<div class="cal-event-detail">';
  h += '<div class="cal-ev-detail-head">';
  if(pe && pe.avatar) h += '<img class="cal-ev-detail-avatar" src="'+esc(pe.avatar)+'" style="border-color:'+(ev.color||"var(--gold-dark)")+'">';
  else h += '<div class="cal-ev-detail-icon">'+ev.icon+'</div>';
  h += '<div class="cal-ev-detail-info">'
    + '<div class="cal-ev-detail-title" style="color:'+(ev.color||"var(--gold-light)")+'">'+esc(ev.title)+'</div>'
    + '<div class="cal-ev-detail-meta">'+ev.icon+' '+(ev.time||"")+' \u2014 '+dateStr
    + (pe ? ' \u2014 '+esc(pe.name) : '')+'</div></div></div>';
  h += '<div class="cal-ev-detail-desc">'+esc(ev.desc)+'</div>';
  if(pe){
    h += '<div style="margin-top:12px;padding:10px;background:var(--dark-stone);border:var(--border-stone);border-radius:var(--radius)">'
      + '<div style="font-family:var(--font-heading);font-size:11px;font-weight:600;color:'+(ev.color||"var(--gold-light)")+';margin-bottom:4px">'+esc(pe.name)+'</div>'
      + '<div style="font-size:10px;color:var(--bone-dim)">'+esc(pe.title)+'</div></div>';
  }
  h += '<button class="dr-team-btn" id="cal-back" style="margin-top:10px;background:var(--dark-stone);color:var(--bone-dim)">\u2190 Retour au calendrier</button>';
  h += '</div>';
  return h;
}

/* ── Wire calendar interactions ── */
function wireCalendarActions(){
  var body = document.getElementById("hp-body") || document.getElementById("fp-body"); if(!body) return;

  // View tabs
  body.querySelectorAll(".cal-tab").forEach(function(tab){
    tab.onclick = function(){
      calView = tab.getAttribute("data-cv");
      calSelectedEvent = null;
      openCalendarPanel();
    };
  });

  // Navigation prev/next
  body.querySelectorAll(".cal-nav-btn").forEach(function(btn){
    btn.onclick = function(){
      var dir = btn.getAttribute("data-cn") === "prev" ? -1 : 1;
      if(calView === "month"){
        // Naviguer par mois (±50 jours)
        calNavDay += dir * EXT_DAYS_PER_MONTH;
      } else if(calView === "week"){
        // Naviguer par semaine (±10 jours)
        calNavDay += dir * EXT_DAYS_PER_WEEK;
      } else {
        // Naviguer par jour
        calNavDay += dir;
      }
      // Borner entre 1 et 750
      if(calNavDay < 1) calNavDay = 1;
      if(calNavDay > EXT_DAYS_PER_YEAR) calNavDay = EXT_DAYS_PER_YEAR;
      calSelectedEvent = null;
      openCalendarPanel();
    };
  });

  // Day click in month view → show events
  body.querySelectorAll(".cal-day").forEach(function(cell){
    cell.onclick = function(){
      body.querySelectorAll(".cal-day").forEach(function(c){ c.classList.remove("selected") });
      cell.classList.add("selected");
      var gd = parseInt(cell.getAttribute("data-gd"));
      var evts = getEventsForDay(gd);
      var area = document.getElementById("cal-month-events");
      if(area) area.innerHTML = buildEventsListMini(evts, gd);
      if(area) wireEventChips(area);
    };
  });

  // Day click in week view → switch to day view
  body.querySelectorAll(".cal-week-day").forEach(function(row){
    row.onclick = function(e){
      if(e.target.closest(".cal-event-chip")) return;
      calNavDay = parseInt(row.getAttribute("data-gd"));
      calView = "day";
      calSelectedEvent = null;
      openCalendarPanel();
    };
  });

  // Event chips → detail
  wireEventChips(body);

  // Back from detail
  var backBtn = document.getElementById("cal-back");
  if(backBtn) backBtn.onclick = function(){
    calSelectedEvent = null;
    openCalendarPanel();
  };
}

function wireEventChips(container){
  container.querySelectorAll(".cal-event-chip").forEach(function(chip){
    chip.onclick = function(e){
      e.stopPropagation();
      var evid = chip.getAttribute("data-evid");
      var ev = getCalEvents().find(function(e){ return e.id === evid });
      if(ev){
        calSelectedEvent = ev;
        if(ev.persona){
          var pe = getPersonaById(ev.persona);
          if(pe && pe.avatar) setDiamondImage(pe.avatar, null);
          else setDiamondImage(null, ev.icon);
        }
        openCalendarPanel();
      }
    };
  });
}
