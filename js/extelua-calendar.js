"use strict";

/* ══════════ EXTELUA CALENDAR SYSTEM ══════════
   1 année   = 15 mois   = 750 jours
   1 mois    = 5 semaines = 50 jours
   1 semaine = 10 jours
   1 jour    = 30 heures
   1 heure   = 100 minutes
   1 minute  = 100 secondes
   5 saisons = 3 mois chacune

   Système solaire : 3 soleils (Solah, Veyra, Tinor)
   Satellites : 2 lunes (Oëlys — orbite ovale horizontale,
                          Nythir — orbite ovale verticale)
   ═══════════════════════════════════════════════ */

var EXT_HOURS_PER_DAY = 30;
var EXT_MINUTES_PER_HOUR = 100;
var EXT_SECONDS_PER_MINUTE = 100;
var EXT_DAYS_PER_WEEK = 10;
var EXT_WEEKS_PER_MONTH = 5;
var EXT_DAYS_PER_MONTH = 50; // 10 * 5
var EXT_MONTHS_PER_YEAR = 15;
var EXT_DAYS_PER_YEAR = 750; // 50 * 15
var EXT_SEASONS_PER_YEAR = 5;
var EXT_MONTHS_PER_SEASON = 3;

/* ── Astronomie d'Extelua ── */
var EXT_SOLEILS = [
  {name:"Solah",  desc:"L'astre principal, doré et massif — source de la majeure partie de la lumière.", color:"#e8a838"},
  {name:"Veyra",  desc:"Le soleil blanc-bleu, plus petit, dont l'éclat traverse les brumes.", color:"#a8d0e6"},
  {name:"Tinor",  desc:"Le soleil rouge nain, lointain, visible surtout à l'aube et au crépuscule.", color:"#c45c4a"}
];
var EXT_SATELLITES = [
  {name:"Oëlys",  desc:"La lune pâle à l'orbite ovale horizontale. Elle glisse lentement d'est en ouest.", color:"#c9c0b0", orbit:"horizontal"},
  {name:"Nythir", desc:"La lune sombre à l'orbite ovale verticale. Elle monte et plonge dans le ciel comme un pendule.", color:"#6a7b8b", orbit:"vertical"}
];

/* ── Noms des 15 mois ── */
var EXT_MOIS = [
  "Auroris",    // 1  – Éveil
  "Floréal",    // 2
  "Verdance",   // 3
  "Solstaris",  // 4  – Flamboiement
  "Ignaris",    // 5
  "Fulgure",    // 6
  "Célestine",  // 7  – Zénith
  "Nexalis",    // 8
  "Orbitale",   // 9
  "Ombrais",    // 10 – Crépuscule
  "Brumal",     // 11
  "Cendris",    // 12
  "Noctalis",   // 13 – Silence
  "Glacine",    // 14
  "Finalis"     // 15
];

var EXT_MOIS_SHORT = [
  "Aur","Flo","Ver","Sol","Ign","Ful",
  "Cél","Nex","Orb","Omb","Bru","Cen",
  "Noc","Gla","Fin"
];

/* ── 5 Saisons (3 mois chacune) ── */
var EXT_SAISONS = [
  {name:"Éveil",        icon:"\uD83C\uDF31", months:[0,1,2],   desc:"La nature s'éveille, les premiers soleils réchauffent les mondes."},
  {name:"Flamboiement", icon:"\uD83D\uDD25", months:[3,4,5],   desc:"Les trois soleils s'alignent au zénith — les terres s'embrasent."},
  {name:"Zénith",       icon:"\u2726",  months:[6,7,8],   desc:"L'équilibre parfait, le cœur de l'année — temps des grandes alliances."},
  {name:"Crépuscule",   icon:"\uD83C\uDF05", months:[9,10,11], desc:"Tinor domine l'horizon, les ombres s'allongent, Nythir brille seule."},
  {name:"Silence",      icon:"\u2744\uFE0F", months:[12,13,14],desc:"Le monde se tait sous le gel. Seule Oëlys éclaire les nuits interminables."}
];

/* ── Noms des 10 jours de la semaine ── */
var EXT_JOURS = [
  "Lunaris",   // 1
  "Terralis",  // 2
  "Aquaris",   // 3
  "Ventis",    // 4
  "Flamis",    // 5
  "Boisar",    // 6
  "Ferralis",  // 7
  "Crystar",   // 8
  "Ombris",    // 9
  "Solaris"    // 10
];

var EXT_JOURS_SHORT = [
  "Lun","Ter","Aqu","Ven","Fla",
  "Boi","Fer","Cry","Omb","Sol"
];

/* ── Conversion : gameDay (1-750) → date structurée ── */
function extDateFromDay(gameDay){
  var d = ((gameDay - 1) % EXT_DAYS_PER_YEAR); // 0-based day index
  var month = Math.floor(d / EXT_DAYS_PER_MONTH); // 0-14
  var dayInMonth = (d % EXT_DAYS_PER_MONTH) + 1;  // 1-50
  var week = Math.floor((dayInMonth - 1) / EXT_DAYS_PER_WEEK); // 0-4
  var dayInWeek = ((dayInMonth - 1) % EXT_DAYS_PER_WEEK); // 0-9
  var season = Math.floor(month / EXT_MONTHS_PER_SEASON); // 0-4
  return {
    day: gameDay,
    dayInMonth: dayInMonth,
    dayInWeek: dayInWeek,
    week: week + 1,
    month: month,
    season: season,
    monthName: EXT_MOIS[month],
    monthShort: EXT_MOIS_SHORT[month],
    dayName: EXT_JOURS[dayInWeek],
    dayShort: EXT_JOURS_SHORT[dayInWeek],
    seasonName: EXT_SAISONS[season].name,
    seasonIcon: EXT_SAISONS[season].icon
  };
}

/* ── Formatage date longue : "Solaris 50 Finalis" ── */
function extFormatDate(gameDay){
  var ed = extDateFromDay(gameDay);
  return ed.dayName + " " + ed.dayInMonth + " " + ed.monthName;
}

/* ── Formatage date courte : "50 Fin" ── */
function extFormatDateShort(gameDay){
  var ed = extDateFromDay(gameDay);
  return ed.dayInMonth + " " + ed.monthShort;
}

/* ── Formatage heure avec secondes : "25:00:00" ── */
function extFormatTime(gameHour, gameMinute, gameSecond){
  var h = String(gameHour  || 0).padStart(2, "0");
  var m = String(gameMinute || 0).padStart(2, "0");
  var s = String(gameSecond || 0).padStart(2, "0");
  return h + ":" + m + ":" + s;
}

/* ── Formatage complet ── */
function extFormatFull(gameDay, gameHour, gameMinute, gameSecond){
  return extFormatDate(gameDay) + " \u2014 " + extFormatTime(gameHour, gameMinute, gameSecond);
}

/* ── Jour/Nuit dans le système Extelua (30h, 3 soleils) ── */
/*   Aube  : 4h-6h  (Tinor apparaît d'abord, puis Solah)
     Jour  : 6h-22h (les 3 soleils se relaient)
     Crép. : 22h-24h (Solah se couche, Tinor reste)
     Nuit  : 24h-29h & 0h-3h (Oëlys et Nythir éclairent)     */
function extIsNight(gameHour){
  return gameHour < 6 || gameHour >= 22;
}

/* ── Phase de la journée (pour météo/ambiance) ── */
function extDayPhase(gameHour){
  if(gameHour >= 4 && gameHour < 6)  return "aube";
  if(gameHour >= 6 && gameHour < 12) return "matin";
  if(gameHour >= 12 && gameHour < 18) return "apres-midi";
  if(gameHour >= 18 && gameHour < 22) return "soir";
  if(gameHour >= 22 && gameHour < 24) return "crepuscule";
  return "nuit"; // 24-29 & 0-3
}

/* ── Quels soleils sont visibles ? ── */
function extVisibleSuns(gameHour){
  var suns = [];
  if(gameHour >= 4  && gameHour < 24) suns.push(EXT_SOLEILS[2]); // Tinor (rouge, aube→crép)
  if(gameHour >= 6  && gameHour < 22) suns.push(EXT_SOLEILS[0]); // Solah (principal)
  if(gameHour >= 8  && gameHour < 20) suns.push(EXT_SOLEILS[1]); // Veyra (blanc-bleu, milieu)
  return suns;
}

/* ── Quels satellites sont visibles ? ── */
function extVisibleMoons(gameHour){
  var moons = [];
  // Oëlys (horizontale) — visible principalement la nuit et en soirée
  if(gameHour >= 20 || gameHour < 8) moons.push(EXT_SATELLITES[0]);
  // Nythir (verticale) — visible durant la nuit profonde
  if(gameHour >= 23 || gameHour < 5) moons.push(EXT_SATELLITES[1]);
  return moons;
}

/* ══════════ HORLOGE EN TEMPS RÉEL ══════════
   1 seconde réelle = 1 seconde Extelua.
   Le tick fait avancer gameSecond et propage les retenues.
   ═══════════════════════════════════════════ */
var _extClockInterval = null;
var _extClockSaveCounter = 0;

function extStartClock(){
  if(_extClockInterval) clearInterval(_extClockInterval);
  _extClockInterval = setInterval(extTick, 1000);
  extRenderClock(); // affichage immédiat
}

function extStopClock(){
  if(_extClockInterval){ clearInterval(_extClockInterval); _extClockInterval = null; }
}

function extTick(){
  var u = loadUser();
  u.gameSecond = (u.gameSecond || 0) + 1;

  // Propagation des retenues
  if(u.gameSecond >= EXT_SECONDS_PER_MINUTE){
    u.gameSecond = 0;
    u.gameMinute = (u.gameMinute || 0) + 1;
  }
  if(u.gameMinute >= EXT_MINUTES_PER_HOUR){
    u.gameMinute = 0;
    u.gameHour = (u.gameHour || 0) + 1;
  }
  if(u.gameHour >= EXT_HOURS_PER_DAY){
    u.gameHour = 0;
    u.gameDay = (u.gameDay || 1) + 1;
    // Passage à la nouvelle année
    if(u.gameDay > EXT_DAYS_PER_YEAR){
      u.gameDay = 1;
    }
  }

  // Sauvegarder toutes les 10 secondes (perf)
  _extClockSaveCounter++;
  if(_extClockSaveCounter >= 10){
    _extClockSaveCounter = 0;
    saveUser(u);
  } else {
    // Sauvegarde rapide via acDB directement pour les secondes
    acDB.set(USER_KEYS.gameSecond, String(u.gameSecond));
    acDB.set(USER_KEYS.gameMinute, String(u.gameMinute));
    acDB.set(USER_KEYS.gameHour, String(u.gameHour));
    acDB.set(USER_KEYS.gameDay, String(u.gameDay));
  }

  extRenderClock();

  // Auto-start : si on est sur l'overlay pré-jeu et qu'on atteint le matin
  if(window._pgOverlayActive && u.gameDay === EXT_START_DAY && u.gameHour >= EXT_START_HOUR){
    _extTriggerAutoStart();
  }
}

function extRenderClock(){
  var u = loadUser();
  var timeEl = document.getElementById("header-time");
  var dateEl = document.getElementById("header-date");
  if(timeEl) timeEl.textContent = extFormatTime(u.gameHour, u.gameMinute, u.gameSecond);
  if(dateEl) dateEl.textContent = extFormatDate(u.gameDay);
  updateDayNight(u.gameHour);
}

/* ── Ancien nom conservé pour compatibilité ── */
function extRefreshClock(){ extRenderClock(); }

/* ── Auto-déclenchement du début de jeu ── */
function _extTriggerAutoStart(){
  var closeBtn = document.getElementById("inv-close-btn");
  if(closeBtn) closeBtn.click();
}

/* ── Avancer le temps de jeu (heures Extelua, pour actions) ── */
function extAdvanceTime(hours){
  if(hours <= 0) return;
  var u = loadUser();
  u.gameHour += hours;
  u.gameMinute = 0;
  u.gameSecond = 0;
  while(u.gameHour >= EXT_HOURS_PER_DAY){
    u.gameHour -= EXT_HOURS_PER_DAY;
    u.gameDay++;
  }
  if(u.gameDay > EXT_DAYS_PER_YEAR) u.gameDay = EXT_DAYS_PER_YEAR;
  saveUser(u);
  extRenderClock();
}

/* ── Pré-jeu : dernier soir de l'année (jour 750, 25h) ── */
var EXT_PREGAME_DAY = EXT_DAYS_PER_YEAR; // 750
var EXT_PREGAME_HOUR = 25;
var EXT_PREGAME_MINUTE = 0;
var EXT_PREGAME_SECOND = 0;

/* ── Début du jeu : jour 1, matin (8h) ── */
var EXT_START_DAY = 1;
var EXT_START_HOUR = 8;
var EXT_START_MINUTE = 0;
var EXT_START_SECOND = 0;
