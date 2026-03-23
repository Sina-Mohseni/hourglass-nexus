"use strict";

/* ══════════ EXTELUA CALENDAR SYSTEM ══════════
   1 année   = 15 mois   = 750 jours
   1 mois    = 5 semaines = 50 jours
   1 semaine = 10 jours
   1 jour    = 30 heures
   1 heure   = 100 minutes
   5 saisons = 3 mois chacune
   ═══════════════════════════════════════════════ */

var EXT_HOURS_PER_DAY = 30;
var EXT_MINUTES_PER_HOUR = 100;
var EXT_DAYS_PER_WEEK = 10;
var EXT_WEEKS_PER_MONTH = 5;
var EXT_DAYS_PER_MONTH = 50; // 10 * 5
var EXT_MONTHS_PER_YEAR = 15;
var EXT_DAYS_PER_YEAR = 750; // 50 * 15
var EXT_SEASONS_PER_YEAR = 5;
var EXT_MONTHS_PER_SEASON = 3;

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
  {name:"Éveil",        icon:"🌱", months:[0,1,2],   desc:"La nature s'éveille, les premiers soleils réchauffent les mondes."},
  {name:"Flamboiement", icon:"🔥", months:[3,4,5],   desc:"Les soleils jumeaux brûlent à leur apogée, les terres s'embrasent."},
  {name:"Zénith",       icon:"✦",  months:[6,7,8],   desc:"L'équilibre parfait, le cœur de l'année — temps des grandes alliances."},
  {name:"Crépuscule",   icon:"🌅", months:[9,10,11], desc:"Les ombres s'allongent, le froid s'installe, les tensions montent."},
  {name:"Silence",      icon:"❄️", months:[12,13,14],desc:"Le monde se tait sous le gel. Temps de recueillement et de survie."}
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

/* ── Formatage heure : "14:57" (heures 0-29, minutes 0-99) ── */
function extFormatTime(gameHour, gameMinute){
  var h = String(gameHour || 0).padStart(2, "0");
  var m = String(gameMinute || 0).padStart(2, "0");
  return h + ":" + m;
}

/* ── Formatage complet : "Solaris 50 Finalis — 25:80" ── */
function extFormatFull(gameDay, gameHour, gameMinute){
  return extFormatDate(gameDay) + " — " + extFormatTime(gameHour, gameMinute);
}

/* ── Jour/Nuit dans le système Extelua (30h) ── */
function extIsNight(gameHour){
  // Jour : heures 6-22 / Nuit : heures 22-29 et 0-5
  return gameHour < 6 || gameHour >= 22;
}

/* ── Avancer le temps de jeu (heures Extelua) ── */
function extAdvanceTime(hours){
  if(hours <= 0) return;
  var u = loadUser();
  u.gameHour += hours;
  while(u.gameHour >= EXT_HOURS_PER_DAY){
    u.gameHour -= EXT_HOURS_PER_DAY;
    u.gameDay++;
  }
  if(u.gameDay > EXT_DAYS_PER_YEAR) u.gameDay = EXT_DAYS_PER_YEAR;
  saveUser(u);
  extRefreshClock();
}

/* ── Rafraîchir l'horloge header ── */
function extRefreshClock(){
  var u = loadUser();
  var timeEl = document.getElementById("header-time");
  var dateEl = document.getElementById("header-date");
  if(timeEl) timeEl.textContent = extFormatTime(u.gameHour, u.gameMinute);
  if(dateEl) dateEl.textContent = extFormatDate(u.gameDay);
  updateDayNight(u.gameHour);
}

/* ── Pré-jeu : dernier soir de l'année (jour 750, 25h) ── */
var EXT_PREGAME_DAY = EXT_DAYS_PER_YEAR; // 750
var EXT_PREGAME_HOUR = 25;
var EXT_PREGAME_MINUTE = 0;

/* ── Début du jeu : jour 1, matin (8h) ── */
var EXT_START_DAY = 1;
var EXT_START_HOUR = 8;
var EXT_START_MINUTE = 0;
