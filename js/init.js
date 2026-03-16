"use strict";

/* ══════════ INIT ══════════ */
document.addEventListener("DOMContentLoaded", async function(){
  await acDB.init();
  await loadAllData();
  try { teamIds = JSON.parse(acDB.get("ac_team") || "[]") } catch(e){ teamIds = [] }
  currentCityId = acDB.get("ac_city") || null;
  activeLocId = acDB.get("ac_activeLoc") || null;

  initClock();
  initNav();
  initDrawer();
  initFooterPanel();
  initCalendar();
  initWeather();

  // If character already created, remove creation screen immediately
  var ccScreen = document.getElementById("charcreate-screen");
  if(acDB.get("ac_charCreated") === "1" && ccScreen){
    ccScreen.remove();
  }

  // Hide all app content until char creation is done
  var contentArea = $(".content-area");
  var footer = $("#footer-assembly");
  if(contentArea) contentArea.style.visibility = "hidden";
  if(footer) footer.style.visibility = "hidden";

  initLock();
});
