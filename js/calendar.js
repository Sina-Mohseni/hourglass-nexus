"use strict";

/* ══════════ CALENDAR SYSTEM ══════════ */
var calView = "month"; // month | week | day
var calDate = new Date(); // date courante de navigation
var calSelectedEvent = null;

var CAL_JOURS = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];
var CAL_JOURS_FULL = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
var CAL_MOIS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

function getCalEvents(){ return (calendarData && calendarData.events) || [] }

function getEventsForDate(y, m, d){
  var ds = y+"-"+String(m+1).padStart(2,"0")+"-"+String(d).padStart(2,"0");
  return getCalEvents().filter(function(e){ return e.date === ds });
}

function initCalendar(){
  var btn = document.getElementById("orb-cal-btn");
  var wrap = document.getElementById("orb-cal-wrap");
  function doOpen(e){ e.stopPropagation(); calSelectedEvent=null; setDiamondImage(null,"⏳"); openCalendarPanel() }
  if(btn) btn.addEventListener("click", doOpen);
  if(wrap) wrap.addEventListener("click", doOpen);
}

function openCalendarPanel(){
  var html = buildCalendarHTML();
  setFooterPanelContent(html);
  wireCalendarActions();
  /* Toujours ouvrir le panel */
  var asm = document.getElementById("footer-assembly");
  if(asm){
    asm.classList.add("snapping");
    asm.style.transform = "translateY(0px)";
    window._fpOpen = true;
    setTimeout(function(){ asm.classList.remove("snapping") }, 450);
  }
  var calBtn = document.getElementById("orb-cal-wrap");
  if(calBtn) calBtn.classList.add("active");
  var wBtn = document.getElementById("orb-weather-wrap");
  if(wBtn) wBtn.classList.remove("active");
}

function buildCalendarHTML(){
  if(calSelectedEvent) return buildCalendarEventDetail(calSelectedEvent);
  var h = '<div class="cal-wrap">';
  /* Tabs */
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

/* ── MONTH VIEW ── */
function buildCalMonth(){
  var y = calDate.getFullYear(), m = calDate.getMonth();
  var today = new Date();
  var firstDay = new Date(y, m, 1);
  var lastDay = new Date(y, m+1, 0);
  var startDow = (firstDay.getDay()+6)%7; // Lun=0
  var daysInMonth = lastDay.getDate();
  var prevLast = new Date(y, m, 0).getDate();

  var h = '<div class="cal-nav">'
    + '<button class="cal-nav-btn" data-cn="prev">‹</button>'
    + '<div class="cal-nav-title">'+CAL_MOIS[m]+' '+y+'</div>'
    + '<button class="cal-nav-btn" data-cn="next">›</button></div>';
  h += '<div class="cal-weekdays">';
  CAL_JOURS.forEach(function(j){ h += '<div class="cal-wd">'+j+'</div>' });
  h += '</div><div class="cal-days">';

  // Jours mois précédent
  for(var i=startDow-1; i>=0; i--){
    var d = prevLast - i;
    h += '<div class="cal-day other-month" data-cd="'+(m===0?y-1:y)+'-'+String(m===0?12:m).padStart(2,'0')+'-'+String(d).padStart(2,'0')+'">'+d+'</div>';
  }
  // Jours courants
  for(var d=1; d<=daysInMonth; d++){
    var isToday = (d===today.getDate() && m===today.getMonth() && y===today.getFullYear());
    var evts = getEventsForDate(y, m, d);
    var cls = "cal-day"+(isToday?" today":"")+(evts.length?" has-events":"");
    h += '<div class="'+cls+'" data-cd="'+y+'-'+String(m+1).padStart(2,'0')+'-'+String(d).padStart(2,'0')+'">'+d+'</div>';
  }
  // Jours mois suivant
  var total = startDow + daysInMonth;
  var fill = total <= 35 ? 35 - total : 42 - total;
  for(var i=1; i<=fill; i++){
    h += '<div class="cal-day other-month" data-cd="'+(m===11?y+1:y)+'-'+String(m===11?1:m+2).padStart(2,'0')+'-'+String(i).padStart(2,'0')+'">'+i+'</div>';
  }
  h += '</div>';

  // Events du jour sélectionné (aujourd'hui par défaut)
  var selD = today.getMonth()===m && today.getFullYear()===y ? today.getDate() : 1;
  var selEvts = getEventsForDate(y, m, selD);
  h += '<div id="cal-month-events" style="margin-top:8px">';
  h += buildEventsListMini(selEvts, y+'-'+String(m+1).padStart(2,'0')+'-'+String(selD).padStart(2,'0'));
  h += '</div>';
  return h;
}

/* ── WEEK VIEW ── */
function buildCalWeek(){
  var today = new Date();
  // Trouver le lundi de la semaine de calDate
  var d = new Date(calDate);
  var dow = (d.getDay()+6)%7;
  d.setDate(d.getDate() - dow);
  var monday = new Date(d);

  var mStr = CAL_MOIS[monday.getMonth()]+' '+monday.getFullYear();
  var h = '<div class="cal-nav">'
    + '<button class="cal-nav-btn" data-cn="prev">‹</button>'
    + '<div class="cal-nav-title">Semaine du '+monday.getDate()+' '+mStr+'</div>'
    + '<button class="cal-nav-btn" data-cn="next">›</button></div>';
  h += '<div class="cal-week-grid">';
  for(var i=0; i<7; i++){
    var cur = new Date(monday);
    cur.setDate(monday.getDate()+i);
    var isToday = (cur.toDateString()===today.toDateString());
    var evts = getEventsForDate(cur.getFullYear(), cur.getMonth(), cur.getDate());
    var cls = "cal-week-day"+(isToday?" today":"");
    h += '<div class="'+cls+'" data-cd="'+cur.getFullYear()+'-'+String(cur.getMonth()+1).padStart(2,'0')+'-'+String(cur.getDate()).padStart(2,'0')+'">'
      + '<div class="cal-week-day-label"><div class="cal-week-day-name">'+CAL_JOURS[i]+'</div>'
      + '<div class="cal-week-day-num">'+cur.getDate()+'</div></div>'
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
    if(!evts.length) h += '<div style="font-size:9px;color:var(--bone-dim);opacity:.4;font-style:italic">—</div>';
    h += '</div></div>';
  }
  h += '</div>';
  return h;
}

/* ── DAY VIEW ── */
function buildCalDay(){
  var today = new Date();
  var d = calDate;
  var isToday = (d.toDateString()===today.toDateString());
  var dayName = CAL_JOURS_FULL[(d.getDay()+6)%7];
  var title = dayName+' '+d.getDate()+' '+CAL_MOIS[d.getMonth()]+' '+d.getFullYear();

  var h = '<div class="cal-nav">'
    + '<button class="cal-nav-btn" data-cn="prev">‹</button>'
    + '<div class="cal-nav-title">'+title+'</div>'
    + '<button class="cal-nav-btn" data-cn="next">›</button></div>';

  var evts = getEventsForDate(d.getFullYear(), d.getMonth(), d.getDate());
  var evtByHour = {};
  evts.forEach(function(e){
    var hr = parseInt((e.time||"0").split(":")[0]);
    if(!evtByHour[hr]) evtByHour[hr] = [];
    evtByHour[hr].push(e);
  });

  var nowHr = isToday ? today.getHours() : -1;
  h += '<div class="cal-day-hours">';
  for(var hr=0; hr<24; hr++){
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

/* ── Events mini list for month view ── */
function buildEventsListMini(evts, dateStr){
  var h = '';
  // Calendar events
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

  // Game day news — convert dateStr (YYYY-MM-DD) to game day number
  if(dateStr){
    var parts = dateStr.split("-");
    var y = parseInt(parts[0]), m = parseInt(parts[1]), d = parseInt(parts[2]);
    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    var gameDay = d;
    for(var i = 0; i < m - 1; i++) gameDay += daysInMonth[i];

    var u = loadUser();
    if(gameDay <= u.gameDay){
      // Past or current day — show news
      var news = generateDailyNews(gameDay);
      var maxHour = (gameDay === u.gameDay) ? u.gameHour : 24;
      var visible = news.filter(function(n){ return n.hour <= maxHour });
      if(visible.length){
        h += '<div style="font-size:9px;font-weight:600;color:var(--gold-light);padding:6px 0 3px;letter-spacing:.5px">📰 GAZETTE DU JOUR</div>';
        visible.forEach(function(n){
          h += '<div style="display:flex;gap:4px;padding:3px 0;font-size:9px;color:var(--bone-dim)">'
            + '<span>'+n.icon+'</span><span style="color:rgba(201,160,74,.5)">'+String(n.hour).padStart(2,"0")+'h</span>'
            + '<span>'+esc(n.text)+'</span></div>';
        });
      }
    } else {
      // Future day — not yet arrived
      h += '<div style="text-align:center;font-size:10px;color:var(--bone-dim);opacity:.4;padding:8px;font-style:italic">📅 Ce jour n\'est pas encore arrivé dans votre voyage.</div>';
    }
  }

  if(!h) h = '<div style="text-align:center;font-size:10px;color:var(--bone-dim);opacity:.5;padding:8px;font-style:italic">Aucun événement</div>';
  return h;
}

/* ── Event detail view ── */
function buildCalendarEventDetail(ev){
  var pe = getPersonaById(ev.persona);
  var d = ev.date ? ev.date.split("-") : ["","",""];
  var mIdx = parseInt(d[1])-1;
  var dateStr = d[2]+' '+(CAL_MOIS[mIdx]||"")+' '+d[0];
  var h = '<div class="cal-event-detail">';
  h += '<div class="cal-ev-detail-head">';
  if(pe && pe.avatar) h += '<img class="cal-ev-detail-avatar" src="'+esc(pe.avatar)+'" style="border-color:'+(ev.color||"var(--gold-dark)")+'">';
  else h += '<div class="cal-ev-detail-icon">'+ev.icon+'</div>';
  h += '<div class="cal-ev-detail-info">'
    + '<div class="cal-ev-detail-title" style="color:'+(ev.color||"var(--gold-light)")+'">'+esc(ev.title)+'</div>'
    + '<div class="cal-ev-detail-meta">'+ev.icon+' '+(ev.time||"")+' — '+dateStr
    + (pe ? ' — '+esc(pe.name) : '')+'</div></div></div>';
  h += '<div class="cal-ev-detail-desc">'+esc(ev.desc)+'</div>';
  if(pe){
    h += '<div style="margin-top:12px;padding:10px;background:var(--dark-stone);border:var(--border-stone);border-radius:var(--radius)">'
      + '<div style="font-family:var(--font-heading);font-size:11px;font-weight:600;color:'+(ev.color||"var(--gold-light)")+';margin-bottom:4px">'+esc(pe.name)+'</div>'
      + '<div style="font-size:10px;color:var(--bone-dim)">'+esc(pe.title)+'</div></div>';
  }
  h += '<button class="dr-team-btn" id="cal-back" style="margin-top:10px;background:var(--dark-stone);color:var(--bone-dim)">← Retour au calendrier</button>';
  h += '</div>';
  return h;
}

/* ── Wire calendar interactions ── */
function wireCalendarActions(){
  var body = document.getElementById("fp-body"); if(!body) return;

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
      if(calView === "month") calDate.setMonth(calDate.getMonth() + dir);
      else if(calView === "week") calDate.setDate(calDate.getDate() + 7 * dir);
      else calDate.setDate(calDate.getDate() + dir);
      calSelectedEvent = null;
      openCalendarPanel();
    };
  });

  // Day click in month view → show events
  body.querySelectorAll(".cal-day:not(.other-month)").forEach(function(cell){
    cell.onclick = function(){
      body.querySelectorAll(".cal-day").forEach(function(c){ c.classList.remove("selected") });
      cell.classList.add("selected");
      var parts = cell.getAttribute("data-cd").split("-");
      var evts = getEventsForDate(parseInt(parts[0]), parseInt(parts[1])-1, parseInt(parts[2]));
      var area = document.getElementById("cal-month-events");
      if(area) area.innerHTML = buildEventsListMini(evts, cell.getAttribute("data-cd"));
      // Re-wire event chips inside
      if(area) wireEventChips(area);
    };
  });

  // Day click in week view → switch to day view
  body.querySelectorAll(".cal-week-day").forEach(function(row){
    row.onclick = function(e){
      if(e.target.closest(".cal-event-chip")) return;
      var parts = row.getAttribute("data-cd").split("-");
      calDate = new Date(parseInt(parts[0]), parseInt(parts[1])-1, parseInt(parts[2]));
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

