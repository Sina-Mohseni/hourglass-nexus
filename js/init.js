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
  initHeaderPanel();
  initFooterPanel();
  initCalendar();
  initWeather();

  // Hide all app content until char creation / intro is done
  var contentArea = $(".content-area");
  var headerAsm = $("#header-assembly");
  var footer = $("#footer-assembly");
  if(contentArea) contentArea.style.visibility = "hidden";
  if(headerAsm) headerAsm.style.visibility = "hidden";
  if(footer) footer.style.visibility = "hidden";

  // New intro flow: Loading → Main Menu → Lock → CharCreate/Resume
  initLoadingScreen(function(){
    initMainMenu(
      // Nouveau Voyage
      function(){ showLockForNewVoyage() },
      // Reprendre le Voyage
      function(){ showLockForResume() }
    );
  });
});
